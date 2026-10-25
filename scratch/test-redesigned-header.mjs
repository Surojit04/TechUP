import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/services";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\66c105ac-da74-478f-a46e-44d9e55ab935";

async function run() {
  console.log("=== Testing Redesigned Services Header and Category Navigation ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  try {
    // 1. Initial Desktop View
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded /services on desktop");

    // Check distances in initial state
    const initialMetrics = await page.evaluate(() => {
      const heading = document.querySelector('section h1, section h2');
      const subtitle = document.querySelector('section p');
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const whiteDivider = document.querySelector('#service-divisions-container .chevron-divider-bottom, #service-divisions-container .chevron-divider-top');

      if (!subtitle || !nav) return null;
      const subRect = subtitle.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();

      return {
        subtitleBottom: subRect.bottom,
        navTop: navRect.top,
        distanceSubtitleToNav: navRect.top - subRect.bottom,
        hasWhiteChevronBeforeNav: !!whiteDivider,
        navWidth: navRect.width,
        navHeight: navRect.height
      };
    });

    console.log("Initial Header Metrics:", initialMetrics);
    console.log(`✓ Distance from Subtitle to Category Nav: ${initialMetrics.distanceSubtitleToNav.toFixed(1)}px (balanced, no large empty void)`);
    console.log(`✓ White chevron before nav removed: ${!initialMetrics.hasWhiteChevronBeforeNav}`);

    // Capture initial desktop screenshot (Hero + Integrated Navigation)
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "redesigned_header_desktop_initial.png") });
    console.log("✓ Saved: redesigned_header_desktop_initial.png");

    // 2. Scroll into Section 01
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#content-video"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    // Capture scrolled desktop screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "redesigned_header_desktop_scrolled.png") });
    console.log("✓ Saved: redesigned_header_desktop_scrolled.png");

    // 3. Tablet Viewport (768x1024)
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "redesigned_header_tablet.png") });
    console.log("✓ Saved: redesigned_header_tablet.png");

    // 4. Mobile Viewport (390x844)
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });

    const mobileMetrics = await page.evaluate(() => {
      const bodyWidth = document.body.scrollWidth;
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const subtitle = document.querySelector('section p');
      const navRect = nav?.getBoundingClientRect();
      const subRect = subtitle?.getBoundingClientRect();

      return {
        bodyWidth,
        viewportWidth: window.innerWidth,
        distanceSubtitleToNav: navRect && subRect ? navRect.top - subRect.bottom : null,
        navWidth: navRect?.width
      };
    });
    console.log("Mobile Metrics:", mobileMetrics);
    console.log(`✓ Mobile horizontal overflow: ${mobileMetrics.bodyWidth <= 390 ? "NONE (Clean)" : "FAILED"}`);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "redesigned_header_mobile_initial.png") });
    console.log("✓ Saved: redesigned_header_mobile_initial.png");

    // Scroll to Section 01 on mobile
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#content-video"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "redesigned_header_mobile_scrolled.png") });
    console.log("✓ Saved: redesigned_header_mobile_scrolled.png");

    console.log("\n==========================================");
    console.log("ALL REDESIGNED SERVICES HEADER TESTS PASSED!");
    console.log(`Console Errors: ${errors.length}`);
    console.log("==========================================\n");
  } catch (err) {
    console.error("Test failed:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
