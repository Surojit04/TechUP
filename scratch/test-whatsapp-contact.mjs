// Direct ESM Unit test verifying WhatsApp message formatting, URL structure, and encoding
console.log("================================================================================");
console.log("TECHUP DIGITAL — WHATSAPP CONTACT SUBMISSION VERIFICATION");
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

const WA_NUMBER = "919831710140";
const PHONE_DISPLAY = "+91 98317 10140";

function getWhatsAppUrl(customMessage) {
  const defaultMessage = "Hi TechUP Digital, I want to know more about your services.";
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

function buildWhatsAppContactMessage(data) {
  const lines = [
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

// 1. Verify Destination Number & Constants
assert(WA_NUMBER === "919831710140", "WA_NUMBER is exactly '919831710140' without spaces or '+'");
assert(PHONE_DISPLAY === "+91 98317 10140", "PHONE_DISPLAY is '+91 98317 10140'");

// 2. Test Message Construction with All Fields Provided
const fullPayload = {
  name: "Aarav Sharma",
  email: "aarav@example.com",
  company: "Aarav Design Studio",
  phone: "+91 98317 10140",
  services: ["Web & Digital Presence", "Branding & Design"],
  budget: "₹50,000 – ₹1,00,000",
  details: "We are looking for a complete revamp of our portfolio website with interactive animations.",
};

const fullMessage = buildWhatsAppContactMessage(fullPayload);

assert(
  fullMessage.startsWith("Hello TechUp Digital! I'd like to discuss a project."),
  "Greeting starts with 'Hello TechUp Digital! I'd like to discuss a project.'"
);
assert(fullMessage.includes("Name: Aarav Sharma"), "Includes visitor's Name");
assert(fullMessage.includes("Email: aarav@example.com"), "Includes visitor's Email");
assert(fullMessage.includes("Company: Aarav Design Studio"), "Includes Company when provided");
assert(fullMessage.includes("Phone: +91 98317 10140"), "Includes Phone when provided");
assert(
  fullMessage.includes("Service Interested In: Web & Digital Presence, Branding & Design"),
  "Includes selected services joined by comma"
);
assert(fullMessage.includes("Estimated Budget: ₹50,000 – ₹1,00,000"), "Includes Estimated Budget");
assert(
  fullMessage.includes("Project Details:\nWe are looking for a complete revamp of our portfolio website with interactive animations."),
  "Includes Project Details section with preserved line breaks"
);
assert(
  fullMessage.endsWith("Please let me know the next steps. Thank you!"),
  "Concludes with 'Please let me know the next steps. Thank you!'"
);

// 3. Test Message Construction with Optional Fields Omitted
const minimalPayload = {
  name: "Riya Sen",
  email: "riya@brand.com",
  services: ["Content & Video"],
  details: "Need 10 high-retention reel edits per month for our fashion label.",
};

const minimalMessage = buildWhatsAppContactMessage(minimalPayload);

assert(!minimalMessage.includes("Company:"), "Omits Company line when not provided");
assert(!minimalMessage.includes("Phone:"), "Omits Phone line when not provided");
assert(!minimalMessage.includes("Estimated Budget:"), "Omits Budget line when not provided");
assert(minimalMessage.includes("Name: Riya Sen"), "Includes Name in minimal message");
assert(minimalMessage.includes("Email: riya@brand.com"), "Includes Email in minimal message");
assert(minimalMessage.includes("Service Interested In: Content & Video"), "Includes selected service");
assert(minimalMessage.includes("Project Details:\nNeed 10 high-retention reel edits"), "Includes Project Details");

// 4. Test URL Construction & Encoding
const generatedUrl = getWhatsAppUrl(fullMessage);

assert(
  generatedUrl.startsWith("https://wa.me/919831710140?text="),
  "URL starts with https://wa.me/919831710140?text="
);
assert(!generatedUrl.includes(" "), "URL contains no unencoded spaces");
assert(!generatedUrl.includes("\n"), "URL contains no unencoded newlines");

// Decode the URL parameter and verify lossless round-trip
const urlObj = new URL(generatedUrl);
assert(urlObj.hostname === "wa.me", "Hostname is wa.me");
assert(urlObj.pathname === "/919831710140", "Pathname is /919831710140");
const decodedText = urlObj.searchParams.get("text");
assert(decodedText === fullMessage, "Decoded URL text perfectly matches original multi-line message");

console.log("\n================================================================================");
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log("================================================================================\n");

if (failed > 0) process.exit(1);
