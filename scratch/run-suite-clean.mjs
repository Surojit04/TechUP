import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://127.0.0.1:3005";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity\\brain\\0efb76c7-cd7f-4f8f-8167-5af9db1bbca6";

async function runCleanSuite() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const results = {
    modalViewer: {},
    formErrorPath: {},
    formSuccessPath: {},
  };

  try {
    // 1. Work Project Viewer Modal keyboard & focus trap test
    console.log("1. Testing Work modal keyboard navigation...");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${BASE_URL}/work?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 800));

      // Find first work card and focus it
      const cardFocused = await page.evaluate(() => {
        const firstCard = document.querySelector('[role="button"][tabindex="0"][aria-label^="View "]');
        if (firstCard) {
          firstCard.focus();
          return true;
        }
        return false;
      });

      console.log("  First card found & focused:", cardFocused);

      // Press Enter to open modal
      await page.keyboard.press("Enter");
      await new Promise((r) => setTimeout(r, 600));

      const modalInfo = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const activeEl = document.activeElement;
        const hasFocusTrap = activeEl && dialog && dialog.contains(activeEl);
        const titleEl = dialog ? dialog.querySelector("h3") : null;

        return {
          found: !!dialog,
          hasAriaModal: dialog ? dialog.getAttribute("aria-modal") === "true" : false,
          hasFocusInside: !!hasFocusTrap,
          title: titleEl ? titleEl.textContent.trim() : null,
        };
      });

      console.log("  Modal info after Enter:", modalInfo);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "keyboard-nav-modal-open.png") });

      // Navigate with ArrowRight
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, 500));

      const nextTitle = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const titleEl = dialog ? dialog.querySelector("h3") : null;
        return titleEl ? titleEl.textContent.trim() : null;
      });
      console.log("  Next modal title after ArrowRight:", nextTitle);

      // Press Escape to close modal
      await page.keyboard.press("Escape");
      await new Promise((r) => setTimeout(r, 500));

      const closed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
      console.log("  Modal closed after Escape:", closed);

      results.modalViewer = {
        passed: modalInfo.found && modalInfo.hasAriaModal && closed,
        initialTitle: modalInfo.title,
        nextTitle,
        closedOnEscape: closed,
        hasFocusTrap: modalInfo.hasFocusInside,
      };

      await page.close();
    }

    // 2. Contact form error path
    console.log("\n2. Testing Contact Form Error Path...");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${BASE_URL}/contact?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 800));

      await page.evaluate(() => {
        const formEl = document.getElementById("quote-form");
        if (formEl) formEl.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 300));

      // Click submit without filling required fields
      await page.evaluate(() => {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      });
      await new Promise((r) => setTimeout(r, 500));

      const errors = await page.evaluate(() => {
        const errorNodes = Array.from(document.querySelectorAll("p.text-red-500, p.text-red-600, .text-red-500"));
        return errorNodes.map((n) => n.textContent.trim()).filter(Boolean);
      });

      console.log("  Errors detected:", errors);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "contact-form-error-state.png") });

      results.formErrorPath = {
        passed: errors.length >= 3,
        errors,
      };

      // 3. Contact form success path
      console.log("\n3. Testing Contact Form Success Path...");
      // Fill fields using page.type
      await page.type("#contact-name", "Aarav Sharma");
      await page.type("#contact-email", "aarav.sharma@example.com");
      await page.type("#contact-phone", "9831714104");
      await page.type("#contact-company", "Sharma Media Ventures");
      await page.type(
        "#contact-details",
        "Looking for high-retention weekly reels editing and YouTube long-form post-production support for our business."
      );

      // Select service button and consent checkbox
      await page.evaluate(() => {
        const serviceBtns = Array.from(document.querySelectorAll('button[type="button"]'));
        for (const btn of serviceBtns) {
          if (btn.textContent && (btn.textContent.includes("Content & Video") || btn.textContent.includes("Reels"))) {
            btn.click();
            break;
          }
        }
        const consentBox = document.getElementById("contact-consent");
        if (consentBox && !consentBox.checked) {
          consentBox.click();
        }
      });
      await new Promise((r) => setTimeout(r, 400));

      // Submit form
      await page.evaluate(() => {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      });

      // Wait for success screen
      await new Promise((r) => setTimeout(r, 2500));

      const successData = await page.evaluate(() => {
        const container = document.getElementById("quote-form");
        const text = container ? container.innerText : "";
        const waLink = container ? container.querySelector('a[href*="wa.me"]') : null;
        const checkSvg = container ? container.querySelector("svg.text-emerald-500, svg.text-brand-orange") : null;

        return {
          hasSuccessText: text.includes("Quote Request Received!") || text.includes("Received") || text.includes("Thank You"),
          hasWhatsApp: !!waLink,
          waHref: waLink ? waLink.getAttribute("href") : null,
          hasCheckmark: !!checkSvg,
          innerTextExcerpt: text.substring(0, 300),
        };
      });

      console.log("  Success state data:", successData);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "contact-form-success-state.png") });

      results.formSuccessPath = {
        passed: successData.hasSuccessText && successData.hasWhatsApp,
        data: successData,
      };

      await page.close();
    }

    console.log("\n=== TEST RUN COMPLETED ===");
    console.log(JSON.stringify(results, null, 2));

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "scratch", "clean-suite-results.json"),
      JSON.stringify(results, null, 2)
    );
  } catch (err) {
    console.error("Test execution error:", err);
  } finally {
    await browser.close();
  }
}

runCleanSuite();
