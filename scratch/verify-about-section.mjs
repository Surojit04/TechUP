import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/about";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\66c105ac-da74-478f-a46e-44d9e55ab935";

async function run() {
  console.log("=== Testing Refined About Section Layout ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1080"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  try {
    // 1. Initial Load: /about
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded /about");

    // Capture Hero screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "about_upgraded_hero.png") });
    console.log("✓ Saved screenshot: about_upgraded_hero.png");

    // Scroll to WhoWeAre section
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section')).find((s) =>
        s.textContent?.includes("WHO WE ARE")
      );
      if (section) section.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Capture WhoWeAre screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "about_upgraded_whoweare.png") });
    console.log("✓ Saved screenshot: about_upgraded_whoweare.png");

    // Check highlights grid structure
    const highlightsCheck = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('h3')).map((h) => h.textContent?.trim());
      const hasStudio = document.body.innerText.includes("TECHUP STUDIO");
      const hasActiveCapacity = document.body.innerText.includes("ACTIVE CAPACITY");
      const hasDisciplines =
        document.body.innerText.includes("VIDEO & REELS") &&
        document.body.innerText.includes("BRANDING") &&
        document.body.innerText.includes("WEBSITES");

      return {
        titles,
        hasStudio,
        hasActiveCapacity,
        hasDisciplines,
      };
    });
    console.log("Highlights Check:", highlightsCheck);

    // 2. Tablet Viewport (768x1024)
    console.log("\n--- Testing Tablet Viewport (768x1024) ---");
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "about_tablet_whoweare.png") });
    console.log("✓ Saved screenshot: about_tablet_whoweare.png");

    // 3. Mobile Viewport (390x844)
    console.log("\n--- Testing Mobile Viewport (390x844) ---");
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await new Promise((r) => setTimeout(r, 400));

    const mobileMetrics = await page.evaluate(() => {
      return {
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });
    console.log("Mobile Metrics:", mobileMetrics);
    if (mobileMetrics.bodyWidth > 390) {
      console.warn(`Mobile horizontal overflow detected: ${mobileMetrics.bodyWidth} > 390`);
    } else {
      console.log("✓ Zero horizontal page overflow on mobile!");
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "about_mobile_whoweare.png") });
    console.log("✓ Saved screenshot: about_mobile_whoweare.png");

    console.log("\n==========================================");
    console.log("ABOUT SECTION VERIFICATION COMPLETE!");
    console.log(`Console Errors: ${errors.length}`);
    if (errors.length > 0) {
      console.log("Errors logged:", errors);
    }
    console.log("==========================================\n");

  } catch (err) {
    console.error("Test failed:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
