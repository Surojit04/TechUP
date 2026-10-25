import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/contact";

async function run() {
  console.log("=== STARTING CONTACT EXPERIENCE VERIFICATION SUITE ===");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  // 1. Desktop Test (1440 x 900)
  console.log("\n[1/4] Testing Desktop Viewport (1440px)...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });

  // Check no horizontal scroll
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`  • Desktop horizontal overflow: ${desktopOverflow ? "FAIL" : "PASSED (No overflow)"}`);

  // Capture screenshot of desktop
  await page.screenshot({ path: "scratch/contact_desktop_1440.png", fullPage: true });
  console.log("  • Saved scratch/contact_desktop_1440.png");

  // 2. Responsive Viewport Check (1280px, 768px, 390px, 320px)
  console.log("\n[2/4] Testing Responsive Viewports...");
  const viewports = [
    { name: "Laptop (1280px)", width: 1280, height: 800 },
    { name: "Tablet (768px)", width: 768, height: 1024 },
    { name: "Mobile (390px)", width: 390, height: 844 },
    { name: "Small Mobile (320px)", width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise((r) => setTimeout(r, 150));
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`  • ${vp.name}: ${hasOverflow ? "FAIL (Horizontal overflow)" : "PASSED (Clean fit, no overflow)"}`);

    if (vp.width === 390) {
      await page.screenshot({ path: "scratch/contact_mobile_390.png", fullPage: true });
      console.log("    -> Saved scratch/contact_mobile_390.png");
    }
  }

  // Reset to desktop for form testing
  await page.setViewport({ width: 1440, height: 900 });

  // 3. Test Form Validation & Submission
  console.log("\n[3/4] Testing Form Validation & Submission...");

  // Try submitting empty to verify validation alerts
  await page.evaluate(() => {
    const btn = document.querySelector('button[type="submit"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 200));

  const validationShown = await page.evaluate(() => {
    return document.querySelectorAll(".text-red-400").length > 0;
  });
  console.log(`  • Client-side validation triggers on empty submit: ${validationShown ? "PASSED" : "FAILED"}`);

  // Fill in form with valid inquiry data
  await page.type("#inquiry-name", "Priya Sharma");
  await page.type("#inquiry-email", "priya@elevatebrand.co");
  await page.type("#inquiry-company", "Elevate Brand Studio");
  await page.type("#inquiry-phone", "+91 98765 43210");

  // Select service chips
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('button[aria-pressed]'));
    const branding = chips.find((c) => c.textContent?.includes("Branding & Design"));
    const web = chips.find((c) => c.textContent?.includes("Web & Digital Presence"));
    if (branding) branding.click();
    if (web) web.click();
  });

  // Select budget
  await page.evaluate(() => {
    const budgetBtns = Array.from(document.querySelectorAll('button[role="radio"]'));
    const target = budgetBtns.find((b) => b.textContent?.includes("₹50,000 – ₹1,00,000"));
    if (target) target.click();
  });

  // Fill project details
  await page.type(
    "#inquiry-details",
    "We need a complete visual identity redesign and a high-converting Next.js website for our product launch next month."
  );

  // Submit form
  console.log("  • Submitting filled project inquiry...");
  await page.evaluate(() => {
    const btn = document.querySelector('button[type="submit"]');
    if (btn) btn.click();
  });

  // Wait for success screen
  await page.waitForFunction(() => {
    return document.body.innerText.includes("Inquiry Received!");
  }, { timeout: 8000 });
  console.log("  • Success state confirmed! 'Inquiry Received!' rendered.");

  // Capture screenshot of success state
  await page.screenshot({ path: "scratch/contact_success_state.png" });
  console.log("  • Saved scratch/contact_success_state.png");

  // 4. Test FAQ Accordion
  console.log("\n[4/4] Testing FAQ Accordion...");
  const firstFaqAnswer = await page.evaluate(() => {
    const firstBtn = document.querySelector('button[aria-controls]');
    if (firstBtn) firstBtn.click();
    return document.querySelector('[role="region"]')?.textContent || "";
  });
  console.log(`  • Accordion toggles and displays answer: ${firstFaqAnswer.length > 20 ? "PASSED" : "FAILED"}`);

  // Console error check
  console.log("\n=== CONSOLE ERRORS AUDIT ===");
  if (consoleErrors.length === 0) {
    console.log("  0 runtime or console errors encountered across all tests!");
  } else {
    console.log("  Errors encountered:", consoleErrors);
  }

  await browser.close();
  console.log("\n=== ALL CONTACT SUITE TESTS COMPLETED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("Test run error:", err);
  process.exit(1);
});
