/**
 * Site-wide constants and contact information.
 * All contact details MUST originate from this file only.
 */

export const SITE_NAME = "TechUP Digital";
export const SITE_TAGLINE = "Your Vision, Our Precision";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://techupdigital.in";

// Contact constants
export const CONTACT_EMAIL = "tchup.official@gmail.com";
export const WA_NUMBER = "919831710140";
export const PHONE_DISPLAY = "+91 98317 10140";
export const INSTAGRAM_HANDLE = "@techup.digital";
export const INSTAGRAM_URL = "https://instagram.com/techup.digital";
export const LOCATION = "Kolkata, India";

/**
 * Builds a direct WhatsApp chat URL with an optional pre-filled message.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    "Hi TechUP Digital, I want to know more about your services.";
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

export interface WhatsAppInquiryPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  services: string[];
  budget?: string;
  details: string;
}

/**
 * Formats contact form inquiry details into a professional, readable WhatsApp message.
 * Only includes fields that contain submitted values and preserves line breaks.
 */
export function buildWhatsAppContactMessage(data: WhatsAppInquiryPayload): string {
  const lines: string[] = [
    "Hello TechUp Digital! I'd like to discuss a project.",
    "",
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
  ];

  if (data.company?.trim()) {
    lines.push(`Company: ${data.company.trim()}`);
  }

  if (data.phone?.trim()) {
    lines.push(`Phone: ${data.phone.trim()}`);
  }

  if (data.services && data.services.length > 0) {
    lines.push(`Service Interested In: ${data.services.join(", ")}`);
  }

  if (data.budget?.trim()) {
    lines.push(`Estimated Budget: ${data.budget.trim()}`);
  }

  lines.push(
    "",
    "Project Details:",
    data.details.trim(),
    "",
    "Please let me know the next steps. Thank you!"
  );

  return lines.join("\n");
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Content & Video", href: "/services#content-video" },
    { label: "Branding & Design", href: "/services#branding-design" },
    { label: "Web & Digital Presence", href: "/services#web-digital" },
    { label: "Growth Support", href: "/services#growth-support" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
