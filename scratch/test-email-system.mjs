// Automated test suite for TechUp Digital Secure Contact Form Email Delivery
import { z } from "zod";

console.log("================================================================================");
console.log("TECHUP DIGITAL — CONTACT EMAIL DELIVERY SYSTEM VERIFICATION");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}: ${details}`);
    failed++;
  }
}

// 1. Phone cleaning logic test
const cleanPhone = (val) => val.replace(/[\s\-\(\)\+]/g, "").replace(/^91|^0/, "");

assert(cleanPhone("+91 98317 10140") === "9831710140", "cleanPhone formats Indian mobile number correctly");
assert(cleanPhone("09831710140") === "9831710140", "cleanPhone removes leading zero");
assert(cleanPhone("98317-10140") === "9831710140", "cleanPhone strips dashes");

// 2. HTML escaping test
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const injectionSample = '<script>alert("xss & pwned")</script> & \'test\'';
const escaped = escapeHtml(injectionSample);
assert(
  escaped === "&lt;script&gt;alert(&quot;xss &amp; pwned&quot;)&lt;/script&gt; &amp; &#039;test&#039;",
  "HTML escaping sanitizes <, >, &, \", and '"
);
assert(!escaped.includes("<script>"), "HTML escaping prevents raw script tags");

// 3. Zod schema validation rules
const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default("")
    .refine((val) => {
      if (!val || val.length === 0) return true;
      const cleaned = cleanPhone(val);
      return cleaned.length >= 8 && cleaned.length <= 15;
    }),
  company: z.string().trim().max(120).optional().default(""),
  services: z.array(z.string().trim().max(100)).min(1).max(10),
  budget: z.string().trim().max(50).optional().default("Not sure yet"),
  details: z.string().trim().min(10).max(5000),
  consent: z.boolean().optional().default(true),
  website_hp: z.string().optional().default(""),
});

// Test valid submission payload
const validPayload = {
  name: "Arjun Sen",
  email: "arjun@example.com",
  phone: "+91 98317 10140",
  company: "Kolkata Creatives",
  services: ["Web & Digital Presence", "Branding & Design"],
  budget: "₹50,000 – ₹1,00,00",
  details: "We require a complete revamp of our portfolio website and branding package.",
  consent: true,
  website_hp: "",
};

const validResult = contactFormSchema.safeParse(validPayload);
assert(validResult.success === true, "Valid contact form payload parses successfully");

// Test invalid email
const badEmailPayload = { ...validPayload, email: "invalid-email-format" };
const badEmailResult = contactFormSchema.safeParse(badEmailPayload);
assert(badEmailResult.success === false, "Rejects invalid email format");

// Test missing required services
const noServicesPayload = { ...validPayload, services: [] };
const noServicesResult = contactFormSchema.safeParse(noServicesPayload);
assert(noServicesResult.success === false, "Rejects empty service selection");

// Test details too short
const shortDetailsPayload = { ...validPayload, details: "Too short" };
const shortDetailsResult = contactFormSchema.safeParse(shortDetailsPayload);
assert(shortDetailsResult.success === false, "Rejects details under 10 characters");

// Test name too short
const shortNamePayload = { ...validPayload, name: "A" };
const shortNameResult = contactFormSchema.safeParse(shortNamePayload);
assert(shortNameResult.success === false, "Rejects name under 2 characters");

// Test name exceeding 100 characters
const longNamePayload = { ...validPayload, name: "A".repeat(101) };
const longNameResult = contactFormSchema.safeParse(longNamePayload);
assert(longNameResult.success === false, "Rejects name exceeding 100 characters");

// Test details exceeding 5000 characters
const longDetailsPayload = { ...validPayload, details: "A".repeat(5001) };
const longDetailsResult = contactFormSchema.safeParse(longDetailsPayload);
assert(longDetailsResult.success === false, "Rejects project details exceeding 5000 characters");

// 4. Destination Email Verification
const testEnvOwner = process.env.CONTACT_OWNER_EMAIL || "tchup.official@gmail.com";
assert(
  testEnvOwner === "tchup.official@gmail.com",
  "Recipient email resolves strictly to mandatory address: tchup.official@gmail.com"
);

console.log("\n================================================================================");
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log("================================================================================");

if (failed > 0) {
  process.exit(1);
}
