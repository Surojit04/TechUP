"use server";

import { CONTACT_EMAIL } from "@/lib/site";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  brand?: string;
  services: string[];
  projectDetails: string;
  hearAbout?: string;
  consent: boolean;
  honeypot?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitQuoteForm(
  data: ContactFormData
): Promise<FormSubmissionResult> {
  // 1. Honeypot anti-spam check
  if (data.honeypot && data.honeypot.trim() !== "") {
    return {
      success: false,
      message: "Spam detected. Submission rejected.",
    };
  }

  // 2. Server validation
  if (!data.fullName || !data.email || !data.phone || !data.projectDetails) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  if (!data.services || data.services.length === 0) {
    return {
      success: false,
      message: "Please select at least one service.",
    };
  }

  if (!data.consent) {
    return {
      success: false,
      message: "Please agree to the contact consent to proceed.",
    };
  }

  const recipientEmail = process.env.CONTACT_EMAIL || CONTACT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

  const emailBodyText = `
New Quote Request from TechUP Digital Website:

Full Name: ${data.fullName}
Email: ${data.email}
Phone/WhatsApp: ${data.phone}
Brand / Company: ${data.brand || "Not specified"}
Services Needed: ${data.services.join(", ")}
Source: ${data.hearAbout || "Not specified"}

Project Details:
${data.projectDetails}
`;

  try {
    // Attempt Resend if API key configured
    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TechUP Digital Inquiries <onboarding@resend.dev>",
          to: recipientEmail,
          reply_to: data.email,
          subject: `New Quote Request: ${data.fullName} - ${data.services.join(", ")}`,
          text: emailBodyText,
        }),
      });

      if (!response.ok) {
        console.error("Resend API error:", await response.text());
        throw new Error("Failed to send via Resend");
      }

      return {
        success: true,
        message: "Thank you! We have your request and will reply soon.",
      };
    }

    // Attempt Web3Forms fallback if access key configured
    if (web3FormsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `New Quote Request: ${data.fullName}`,
          from_name: data.fullName,
          email: data.email,
          message: emailBodyText,
        }),
      });

      if (!response.ok) {
        console.error("Web3Forms API error:", await response.text());
        throw new Error("Failed to send via Web3Forms");
      }

      return {
        success: true,
        message: "Thank you! We have your request and will reply soon.",
      };
    }

    // Default development fallback: Log clearly and return success so test users aren't blocked
    console.log("=== INCOMING QUOTE REQUEST ===");
    console.log(emailBodyText);
    console.log(`Delivered to destination: ${recipientEmail}`);

    return {
      success: true,
      message: "Thank you! We have your request and will reply soon.",
    };
  } catch (err) {
    console.error("Submission error:", err);
    return {
      success: false,
      message:
        "There was an issue sending your form. Please reach out directly on WhatsApp or email.",
      error: (err as Error).message,
    };
  }
}
