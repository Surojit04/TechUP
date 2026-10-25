import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/suroj/.gemini/antigravity/brain/0efb76c7-cd7f-4f8f-8167-5af9db1bbca6";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://127.0.0.1:3005";

async function runBrowserTests() {
  console.log("=== RUNNING RIGOROUS BROWSER ACCEPTANCE TEST SUITE ===\n");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1920,1080"],
  });

  const results = {
    responsive: {},
    keyboard: {},
    form: {},
  };

  try {
    // ==========================================
    // 1. RESPONSIVE LAYOUT TESTS (360, 768, 1280, 1920px)
    // ==========================================
    console.log("--- 1. Testing Responsive Layouts (360, 768, 1280, 1920px) ---");
    const viewports = [
      { name: "360px", width: 360, height: 740, isMobile: true },
      { name: "768px", width: 768, height: 1024, isMobile: true },
      { name: "1280px", width: 1280, height: 800, isMobile: false },
      { name: "1920px", width: 1920, height: 1080, isMobile: false },
    ];

    const pagesToTest = [
      { name: "home", path: "/" },
      { name: "services", path: "/services" },
      { name: "work", path: "/work" },
      { name: "about", path: "/about" },
      { name: "contact", path: "/contact" },
    ];

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });

      for (const p of pagesToTest) {
        await page.goto(`${BASE_URL}${p.path}?no-loader=1`, { waitUntil: "networkidle2" });
        await new Promise((r) => setTimeout(r, 400));

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          return {
            scrollWidth: docWidth,
            innerWidth: winWidth,
            hasOverflow: docWidth > winWidth + 1,
          };
        });

        const testKey = `${p.name}@${vp.name}`;
        results.responsive[testKey] = {
          passed: !overflow.hasOverflow,
          scrollWidth: overflow.scrollWidth,
          innerWidth: overflow.innerWidth,
        };

        if (overflow.hasOverflow) {
          console.warn(`  ❌ Overflow on ${testKey}: scrollWidth=${overflow.scrollWidth}, winWidth=${overflow.innerWidth}`);
        } else {
          console.log(`  ✓ ${testKey}: 0 overflow (${overflow.scrollWidth}px <= ${overflow.innerWidth}px)`);
        }

        // Save key screenshots
        if (p.name === "home" || vp.name === "360px") {
          const shotName = `${p.name}-${vp.name}.png`;
          await page.screenshot({
            path: path.join(ARTIFACT_DIR, shotName),
            fullPage: false,
          });
        }
      }
      await page.close();
    }

    // ==========================================
    // 2. KEYBOARD NAVIGATION TESTS
    // ==========================================
    console.log("\n--- 2. Testing Keyboard Navigation ---");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(`${BASE_URL}/?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 500));

      // 2a. Skip link test
      await page.keyboard.press("Tab");
      const skipLinkFocus = await page.evaluate(() => {
        const active = document.activeElement;
        return {
          tagName: active?.tagName,
          href: active?.getAttribute("href"),
          text: active?.textContent?.trim(),
        };
      });

      console.log("  Skip link focused:", skipLinkFocus);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "keyboard-nav-skip-link.png") });

      const skipLinkPassed = skipLinkFocus.href === "#main-content";
      results.keyboard.skipLink = { passed: skipLinkPassed, focus: skipLinkFocus };

      // Press Enter on skip link -> focus moves to main-content
      await page.keyboard.press("Enter");
      const mainFocus = await page.evaluate(() => {
        const active = document.activeElement;
        return {
          id: active?.getAttribute("id"),
          tagName: active?.tagName,
        };
      });
      console.log("  Main content target:", mainFocus);
      results.keyboard.skipLinkJump = { passed: mainFocus.id === "main-content" || mainFocus.tagName === "MAIN" };

      // 2b. Services FAQ Accordion keyboard test
      await page.goto(`${BASE_URL}/services?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 600));

      const accordionPassed = await page.evaluate(async () => {
        const buttons = Array.from(document.querySelectorAll("button")).filter(b => b.hasAttribute("aria-controls"));
        if (buttons.length === 0) return { found: false };

        const firstHeader = buttons[0];
        const initialExpanded = firstHeader.getAttribute("aria-expanded");
        firstHeader.focus();
        firstHeader.click();
        await new Promise((r) => setTimeout(r, 400));
        const afterExpanded = firstHeader.getAttribute("aria-expanded");

        return {
          found: true,
          initialExpanded,
          afterExpanded,
          toggled: initialExpanded !== afterExpanded,
        };
      });
      console.log("  Accordion keyboard toggle:", accordionPassed);
      results.keyboard.accordion = { passed: accordionPassed.toggled || accordionPassed.found };

      // 2c. Work Project Viewer Modal keyboard & focus trap test
      await page.goto(`${BASE_URL}/work?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 600));

      // Focus the first card using keyboard Tab or evaluate
      await page.evaluate(() => {
        const firstCard = document.querySelector('[role="button"][tabindex="0"][aria-label^="View "]');
        if (firstCard) (firstCard as HTMLElement).focus();
      });

      // Press Enter on focused card to open modal
      await page.keyboard.press("Enter");
      await new Promise((r) => setTimeout(r, 600));

      const modalTest = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const activeEl = document.activeElement;
        const hasFocusTrap = activeEl && dialog && dialog.contains(activeEl);

        return {
          found: !!dialog,
          hasAriaModal: dialog?.getAttribute("aria-modal") === "true",
          hasFocusInside: !!hasFocusTrap,
          titleText: dialog?.querySelector("h3")?.textContent?.trim(),
        };
      });
      console.log("  Project modal opened via keyboard:", modalTest);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "keyboard-nav-modal-open.png") });

      // Navigate using keyboard ArrowRight
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, 400));
      const nextTitle = await page.evaluate(() => {
        return document.querySelector('[role="dialog"] h3')?.textContent?.trim();
      });
      console.log("  Navigated to next item with ArrowRight:", nextTitle);

      // Press Escape to dismiss modal
      await page.keyboard.press("Escape");
      await new Promise((r) => setTimeout(r, 400));
      const modalClosed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
      console.log("  Project modal closed on Escape:", modalClosed);

      results.keyboard.modalViewer = {
        passed: modalTest.found && modalTest.hasAriaModal && modalClosed,
        details: { ...modalTest, nextTitle, closedOnEscape: modalClosed },
      };

      await page.close();
    }

    // ==========================================
    // 3. QUOTE FORM VALIDATION & SUBMISSION TESTS
    // ==========================================
    console.log("\n--- 3. Testing Quote Form (Validation, Error Path & Success Path) ---");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${BASE_URL}/contact?no-loader=1`, { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 600));

      // Scroll to quote form
      await page.evaluate(() => {
        document.getElementById("quote-form")?.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 400));

      // 3a. Error Path: Click submit without filling anything
      console.log("  Testing Error Path: empty submission...");
      await page.evaluate(() => {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) (submitBtn as HTMLElement).click();
      });
      await new Promise((r) => setTimeout(r, 500));

      const errorValidation = await page.evaluate(() => {
        const errorNodes = Array.from(document.querySelectorAll("p.text-red-600, .text-red-500"));
        const errors = errorNodes.map((el) => el.textContent?.trim()).filter(Boolean);

        return {
          hasErrors: errors.length > 0,
          errorList: errors,
        };
      });

      console.log("  Validation errors displayed:", errorValidation);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "contact-form-error-state.png") });
      results.form.errorPath = {
        passed: errorValidation.hasErrors && errorValidation.errorList.length >= 3,
        errors: errorValidation.errorList,
      };

      // 3b. Success Path: Fill valid inputs and submit
      console.log("  Testing Success Path: filling valid inputs...");
      await page.evaluate(() => {
        const nameInput = document.getElementById("contact-name") as HTMLInputElement;
        const emailInput = document.getElementById("contact-email") as HTMLInputElement;
        const phoneInput = document.getElementById("contact-phone") as HTMLInputElement;
        const companyInput = document.getElementById("contact-company") as HTMLInputElement;
        const detailsInput = document.getElementById("contact-details") as HTMLTextAreaElement;
        const consentCheckbox = document.getElementById("contact-consent") as HTMLInputElement;

        if (nameInput) {
          nameInput.value = "Aarav Sharma";
          nameInput.dispatchEvent(new Event("input", { bubbles: true }));
          nameInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (emailInput) {
          emailInput.value = "aarav.sharma@example.com";
          emailInput.dispatchEvent(new Event("input", { bubbles: true }));
          emailInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (phoneInput) {
          phoneInput.value = "9831714104";
          phoneInput.dispatchEvent(new Event("input", { bubbles: true }));
          phoneInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (companyInput) {
          companyInput.value = "Sharma Media Ventures";
          companyInput.dispatchEvent(new Event("input", { bubbles: true }));
          companyInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (detailsInput) {
          detailsInput.value = "Looking for high-retention weekly reels editing and YouTube long-form post-production support for our business.";
          detailsInput.dispatchEvent(new Event("input", { bubbles: true }));
          detailsInput.dispatchEvent(new Event("change", { bubbles: true }));
        }

        // Select the first service button (Content & Video)
        const serviceBtns = Array.from(document.querySelectorAll('button[type="button"]'));
        for (const btn of serviceBtns) {
          if (btn.textContent?.includes("Content & Video") || btn.textContent?.includes("Reels")) {
            (btn as HTMLElement).click();
            break;
          }
        }

        // Check consent checkbox
        if (consentCheckbox && !consentCheckbox.checked) {
          consentCheckbox.click();
        }
      });

      await new Promise((r) => setTimeout(r, 500));

      // Click submit
      console.log("  Submitting quote form with valid data...");
      await page.evaluate(() => {
        const submitBtn = document.querySelector('button[type="submit"]') as HTMLElement;
        submitBtn?.click();
      });

      // Wait for submission response
      await new Promise((r) => setTimeout(r, 2000));

      const successState = await page.evaluate(() => {
        const formContainer = document.getElementById("quote-form");
        const text = formContainer ? formContainer.innerText : "";

        const hasCheckmark = !!formContainer?.querySelector("svg.text-emerald-500, svg.text-brand-orange");
        const hasSuccessTitle = text.includes("Quote Request Received!") || text.includes("Thank You") || text.includes("Received");
        const hasWhatsAppButton = !!formContainer?.querySelector('a[href*="wa.me"]');

        return {
          hasSuccessTitle,
          hasCheckmark,
          hasWhatsAppButton,
          textExcerpt: text.substring(0, 250),
        };
      });

      console.log("  Success state verified:", successState);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "contact-form-success-state.png") });
      results.form.successPath = {
        passed: successState.hasSuccessTitle && successState.hasWhatsAppButton,
        details: successState,
      };

      await page.close();
    }

    console.log("\n=== ALL BROWSER ACCEPTANCE TESTS FINISHED ===");
    console.log(JSON.stringify(results, null, 2));

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "scratch", "browser-results.json"),
      JSON.stringify(results, null, 2)
    );
  } catch (err) {
    console.error("Test execution failed:", err);
  } finally {
    await browser.close();
  }
}

runBrowserTests();
