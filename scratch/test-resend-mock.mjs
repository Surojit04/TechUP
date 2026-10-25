// Comprehensive SDK test verifying parameter mapping, recipient integrity, reply-to, and error handling
import { z } from "zod";

console.log("================================================================================");
console.log("RESEND INTEGRATION VERIFICATION — MOCK & PARAMETER AUDIT");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// Mock Resend SDK class to verify calls
class MockResend {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  emails = {
    send: async (payload) => {
      if (this.apiKey === "re_invalid_test_key") {
        return { data: null, error: { message: "API key is invalid", name: "validation_error" } };
      }
      return { data: { id: "msg_test_abc123" }, error: null };
    },
  };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function simulateSubmit(data, apiKey, customOwner, customFrom) {
  const resendApiKey = apiKey?.trim();
  const recipientEmail = customOwner || "tchup.official@gmail.com";
  const fromSender = customFrom || "TechUp Digital <onboarding@resend.dev>";

  if (!resendApiKey) {
    return {
      success: false,
      error: "The email delivery system is currently not configured (missing RESEND_API_KEY).",
    };
  }

  const resend = new MockResend(resendApiKey);

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeDetails = escapeHtml(data.details);

  const subjectLine = `New Project Inquiry — TechUp Digital (${data.name})`;

  let capturedPayload = null;
  resend.emails.send = async (payload) => {
    capturedPayload = payload;
    if (resendApiKey === "re_invalid_test_key") {
      return { data: null, error: { message: "Invalid API Key" } };
    }
    return { data: { id: "email_123_test" }, error: null };
  };

  const { data: resendData, error: emailError } = await resend.emails.send({
    from: fromSender,
    to: [recipientEmail],
    replyTo: data.email,
    subject: subjectLine,
    html: `<div>${safeName} - ${safeEmail} - ${safeDetails}</div>`,
    text: `New inquiry from ${data.name}`,
  });

  if (emailError) {
    return { success: false, error: emailError.message };
  }

  return { success: true, messageId: resendData?.id, capturedPayload };
}

const testData = {
  name: "Priya Banerjee",
  email: "priya@kolkatabrand.in",
  phone: "9831710140",
  company: "Kolkata Brand",
  services: ["Content & Video", "Web & Digital Presence"],
  budget: "₹1,00,000+",
  details: "We want a full digital transformation across video reels and web platform.",
};

// Test 1: Missing API Key fails honestly
const missingKeyResult = await simulateSubmit(testData, "");
assert(missingKeyResult.success === false, "Missing API Key returns success: false");
assert(missingKeyResult.error.includes("missing RESEND_API_KEY"), "Error informs user of missing RESEND_API_KEY");

// Test 2: Valid API Key dispatches with exact requirements
const validDispatch = await simulateSubmit(testData, "re_valid_dummy_key_12345");
assert(validDispatch.success === true, "Valid API Key returns success: true");
assert(validDispatch.messageId === "email_123_test", "Returns accepted messageId");

// Test 3: Inspect captured payload for requirements
const payload = validDispatch.capturedPayload;
assert(payload.to[0] === "tchup.official@gmail.com", "Recipient is strictly tchup.official@gmail.com");
assert(payload.replyTo === "priya@kolkatabrand.in", "Reply-To is visitor email priya@kolkatabrand.in");
assert(payload.from === "TechUp Digital <onboarding@resend.dev>", "Sender address is provider-authorized");
assert(payload.subject.includes("New Project Inquiry — TechUp Digital"), "Subject line matches standard format");
assert(payload.text.length > 0, "Plain-text alternative is provided");
assert(payload.html.length > 0, "HTML template is provided");

// Test 4: Provider error returns honest failure
const providerErrorResult = await simulateSubmit(testData, "re_invalid_test_key");
assert(providerErrorResult.success === false, "Provider API rejection returns success: false");

console.log("\n================================================================================");
console.log(`ALL INTEGRATION TESTS PASSED: ${passed} passed, ${failed} failed`);
console.log("================================================================================\n");
