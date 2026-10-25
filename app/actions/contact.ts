"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

// Clean Indian phone regex: expects 10 digits starting with 6, 7, 8, or 9
const cleanPhone = (val: string): string => {
  return val.replace(/[\s\-\(\)\+]/g, "").replace(/^91|^0/, "");
};

// HTML entity escaping utility to prevent email content injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name (at least 2 characters)." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address." })
    .max(255, { message: "Email cannot exceed 255 characters." }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone number cannot exceed 30 characters." })
    .optional()
    .default("")
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        const cleaned = cleanPhone(val);
        return cleaned.length >= 8 && cleaned.length <= 15;
      },
      { message: "Please enter a valid contact phone number." }
    ),
  company: z
    .string()
    .trim()
    .max(120, { message: "Company name cannot exceed 120 characters." })
    .optional()
    .default(""),
  services: z
    .array(z.string().trim().max(100))
    .min(1, { message: "Please select at least one service." })
    .max(10, { message: "Too many services selected." }),
  budget: z
    .string()
    .trim()
    .max(50, { message: "Budget description is too long." })
    .optional()
    .default("Not sure yet"),
  details: z
    .string()
    .trim()
    .min(10, { message: "Please provide a few details about your project (at least 10 characters)." })
    .max(5000, { message: "Project details cannot exceed 5000 characters." }),
  referral: z.string().trim().max(100).optional().default(""),
  consent: z.boolean().optional().default(true),
  website_hp: z.string().optional().default(""), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  messageId?: string;
}

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

export async function submitContactQuote(
  rawData: unknown
): Promise<ContactActionResult> {
  try {
    // 1. IP extraction & Abuse prevention
    const headerList = headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const realIp = headerList.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        error:
          "Too many inquiries submitted from this network. Please wait a few minutes before trying again, or reach out directly on WhatsApp.",
      };
    }

    // 2. Validate input with Zod
    const validationResult = contactFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      return {
        success: false,
        error: "Please correct the highlighted fields.",
        fieldErrors,
      };
    }

    const data = validationResult.data;

    // 3. Honeypot check (if filled by bot, silently return success without dispatching email or logging PII)
    if (data.website_hp && data.website_hp.length > 0) {
      console.warn(`[CONTACT SPAM] Honeypot triggered by client IP.`);
      return {
        success: true,
      };
    }

    // 4. Server-Side Email Configuration
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    // Mandatory owner destination email: tchup.official@gmail.com
    const recipientEmail =
      process.env.CONTACT_OWNER_EMAIL?.trim() ||
      process.env.CONTACT_EMAIL?.trim() ||
      CONTACT_EMAIL ||
      "tchup.official@gmail.com";
    const fromSender =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "TechUp Digital <onboarding@resend.dev>";

    // Strict configuration check: Never pretend the system is operational if missing
    if (!resendApiKey) {
      console.warn(
        `[CONTACT ERROR] Submission failed: RESEND_API_KEY is not configured in server environment.`
      );
      return {
        success: false,
        error:
          "The email delivery system is currently not configured (missing RESEND_API_KEY). Please contact us directly at tchup.official@gmail.com or via WhatsApp.",
      };
    }

    // 5. Construct Escaped Content & Plain-Text Alternative
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = data.company ? escapeHtml(data.company) : "";
    const safePhone = data.phone ? escapeHtml(cleanPhone(data.phone)) : "";
    const safeBudget = data.budget ? escapeHtml(data.budget) : "Not sure yet";
    const safeDetails = escapeHtml(data.details);
    const safeReferral = data.referral ? escapeHtml(data.referral) : "";
    const safeServices = data.services.map((s) => escapeHtml(s));

    const submissionDate = new Date();
    const formattedDate = submissionDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });
    const utcDate = submissionDate.toUTCString();

    const subjectLine = `New Project Inquiry — TechUp Digital (${data.name})`;

    // Plain-Text Alternative
    const textEmail = [
      "NEW PROJECT INQUIRY — TECHUP DIGITAL",
      "====================================",
      "",
      "CLIENT DETAILS:",
      `• Full Name: ${data.name}`,
      `• Work Email: ${data.email}`,
      data.phone ? `• Phone / WhatsApp: +91 ${cleanPhone(data.phone)}` : null,
      data.company ? `• Company / Brand: ${data.company}` : null,
      "",
      "PROJECT SCOPE:",
      `• Services Requested: ${data.services.join(", ")}`,
      `• Estimated Budget: ${data.budget || "Not sure yet"}`,
      data.referral ? `• Referral Source: ${data.referral}` : null,
      "",
      "PROJECT DETAILS:",
      data.details,
      "",
      "METADATA:",
      `• Submitted At: ${formattedDate} (${utcDate})`,
      `• Destination: ${recipientEmail}`,
      "",
      `To reply to this inquiry, reply directly to this email or write to ${data.email}.`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    // Clean, high-contrast HTML Email for TechUp Digital Leadership
    const htmlEmail = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subjectLine}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0B0F; color: #FFFFFF; padding: 24px 16px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #17171D; border: 1px solid #2E2E38; border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #E04A00 0%, #FF6B2B 100%); padding: 30px 24px; text-align: center; }
            .badge { display: inline-block; background-color: rgba(0, 0, 0, 0.25); color: #FFFFFF; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 4px 12px; border-radius: 9999px; font-weight: bold; margin-bottom: 8px; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #FFFFFF; }
            .content { padding: 28px 24px; color: #EDEDED; line-height: 1.6; }
            .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #FF6B2B; font-weight: 700; margin: 20px 0 10px 0; border-bottom: 1px solid #2A2A35; padding-bottom: 6px; }
            .field-row { margin-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; color: #9E9EA8; font-weight: 600; margin-bottom: 3px; }
            .value { font-size: 15px; color: #FFFFFF; font-weight: 500; }
            .services-list { margin-top: 6px; }
            .service-chip { background-color: #E04A00; color: #FFFFFF; font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 9999px; display: inline-block; margin-right: 6px; margin-bottom: 6px; }
            .details-box { background-color: #0E0E14; border: 1px solid #2A2A35; border-radius: 10px; padding: 16px; font-size: 14px; white-space: pre-wrap; color: #F0F0F5; margin-top: 6px; line-height: 1.6; }
            .action-row { margin-top: 26px; text-align: center; }
            .reply-btn { display: inline-block; background: linear-gradient(135deg, #E04A00 0%, #FF6B2B 100%); color: #FFFFFF !important; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; }
            .footer { padding: 18px 24px; font-size: 11px; color: #737380; text-align: center; background-color: #111117; border-top: 1px solid #22222B; }
            .footer p { margin: 4px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="badge">TechUp Digital • New Lead</div>
              <h1>New Project Inquiry</h1>
            </div>
            <div class="content">
              <div class="section-title">Client Information</div>
              <div class="field-row">
                <div class="label">Full Name</div>
                <div class="value"><strong>${safeName}</strong></div>
              </div>
              <div class="field-row">
                <div class="label">Work Email</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #FF6B2B; text-decoration: none;">${safeEmail}</a></div>
              </div>
              ${
                safePhone
                  ? `<div class="field-row">
                      <div class="label">Phone / WhatsApp</div>
                      <div class="value"><a href="https://wa.me/91${safePhone}" style="color: #FF6B2B; text-decoration: none;">+91 ${safePhone}</a></div>
                    </div>`
                  : ""
              }
              ${
                safeCompany
                  ? `<div class="field-row">
                      <div class="label">Company / Brand</div>
                      <div class="value">${safeCompany}</div>
                    </div>`
                  : ""
              }

              <div class="section-title">Project Scope</div>
              <div class="field-row">
                <div class="label">Services Requested</div>
                <div class="services-list">
                  ${safeServices.map((s) => `<span class="service-chip">${s}</span>`).join(" ")}
                </div>
              </div>
              <div class="field-row">
                <div class="label">Estimated Budget</div>
                <div class="value">${safeBudget}</div>
              </div>
              ${
                safeReferral
                  ? `<div class="field-row">
                      <div class="label">Referral Source</div>
                      <div class="value">${safeReferral}</div>
                    </div>`
                  : ""
              }

              <div class="section-title">Project Brief</div>
              <div class="field-row">
                <div class="details-box">${safeDetails}</div>
              </div>

              <div class="action-row">
                <a href="mailto:${safeEmail}?subject=Re:%20TechUp%20Digital%20Project%20Inquiry" class="reply-btn">Reply to ${safeName}</a>
              </div>
            </div>
            <div class="footer">
              <p>Submitted on ${formattedDate} (${utcDate})</p>
              <p>Delivered securely to ${recipientEmail} from TechUp Digital website.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 6. Send Email Notification via Resend SDK
    const resend = new Resend(resendApiKey);

    const { data: resendData, error: emailError } = await resend.emails.send({
      from: fromSender,
      to: [recipientEmail],
      replyTo: data.email,
      subject: subjectLine,
      html: htmlEmail,
      text: textEmail,
    });

    if (emailError) {
      console.error("[CONTACT RESEND ERROR]", emailError.message || emailError);
      return {
        success: false,
        error:
          "Unable to deliver inquiry via email provider at this moment. Please reach out to tchup.official@gmail.com directly or message us on WhatsApp.",
      };
    }

    // Telemetry without logging sensitive customer PII
    console.log(
      `[CONTACT SUCCESS] Inquiry accepted by email provider (Message ID: ${resendData?.id}) for delivery to ${recipientEmail}`
    );

    return {
      success: true,
      messageId: resendData?.id,
    };
  } catch (err: unknown) {
    console.error("[CONTACT ACTION UNHANDLED ERROR]", err);
    return {
      success: false,
      error:
        "An unexpected error occurred while processing your request. Please contact tchup.official@gmail.com directly or chat with us on WhatsApp.",
    };
  }
}
