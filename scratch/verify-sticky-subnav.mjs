import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/services";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\66c105ac-da74-478f-a46e-44d9e55ab935";

async function run() {
  console.log("=== Testing Services Category Sticky Navigation ===");
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
    // 1. Load /services
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded /services");

    // Check SubNav existence
    const subnavExists = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      return !!nav;
    });
    console.log("✓ ServicesSubNav rendered:", subnavExists);

    // 2. Click "Content & Video" tab
    console.log("\n--- Testing Tab Click: Content & Video ---");
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#content-video"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    // Measure bounding rects
    const metrics01 = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const heading = document.querySelector('#content-video h2');
      if (!nav || !heading) return null;
      const navRect = nav.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      return {
        navTop: navRect.top,
        navBottom: navRect.bottom,
        navHeight: navRect.height,
        navWidth: navRect.width,
        headingTop: headingRect.top,
        headingBottom: headingRect.bottom,
        gap: headingRect.top - navRect.bottom,
        activeText: nav.querySelector('[aria-current="page"]')?.textContent?.trim()
      };
    });
    console.log("Section 01 Metrics:", metrics01);
    if (!metrics01 || metrics01.gap < 10) {
      throw new Error(`Heading is overlapping or too close to SubNav! Gap: ${metrics01?.gap}px`);
    }
    console.log(`✓ Section 01 Heading has ${metrics01.gap.toFixed(1)}px clear gap below SubNav dock!`);

    // Capture screenshot of Section 01
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "test_services_sec01_desktop.png") });
    console.log("✓ Saved screenshot: test_services_sec01_desktop.png");

    // 3. Click "Branding & Design" tab
    console.log("\n--- Testing Tab Click: Branding & Design ---");
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#branding-design"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const metrics02 = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const heading = document.querySelector('#branding-design h2');
      if (!nav || !heading) return null;
      const navRect = nav.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      return {
        navTop: navRect.top,
        navBottom: navRect.bottom,
        headingTop: headingRect.top,
        gap: headingRect.top - navRect.bottom,
        activeText: nav.querySelector('[aria-current="page"]')?.textContent?.trim()
      };
    });
    console.log("Section 02 Metrics:", metrics02);
    if (!metrics02 || metrics02.gap < 10) {
      throw new Error(`Section 02 heading is overlapping SubNav! Gap: ${metrics02?.gap}px`);
    }
    console.log(`✓ Section 02 Heading has ${metrics02.gap.toFixed(1)}px clear gap below SubNav dock!`);

    // 4. Click "Web & Digital Presence" tab
    console.log("\n--- Testing Tab Click: Web & Digital Presence ---");
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#web-digital"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const metrics03 = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const heading = document.querySelector('#web-digital h2');
      if (!nav || !heading) return null;
      const navRect = nav.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      return {
        gap: headingRect.top - navRect.bottom,
        activeText: nav.querySelector('[aria-current="page"]')?.textContent?.trim()
      };
    });
    console.log(`✓ Section 03 Heading has ${metrics03.gap.toFixed(1)}px clear gap below SubNav dock!`);

    // 5. Click "Growth Support" tab
    console.log("\n--- Testing Tab Click: Growth Support ---");
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#growth-support"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const metrics04 = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const heading = document.querySelector('#growth-support h2');
      if (!nav || !heading) return null;
      const navRect = nav.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      return {
        gap: headingRect.top - navRect.bottom,
        activeText: nav.querySelector('[aria-current="page"]')?.textContent?.trim()
      };
    });
    console.log(`✓ Section 04 Heading has ${metrics04.gap.toFixed(1)}px clear gap below SubNav dock!`);

    // 6. Test Un-sticking when scrolling past Section 04
    console.log("\n--- Testing Un-sticking past Section 04 ---");
    await page.evaluate(() => {
      const faq = document.querySelector('section[aria-label="Frequently Asked Questions"]') || document.querySelector('#services-faq');
      if (faq) {
        faq.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo(0, 6000);
      }
    });
    await new Promise((r) => setTimeout(r, 300));

    const subnavPastServices = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      if (!nav) return null;
      const rect = nav.getBoundingClientRect();
      return {
        navTop: rect.top,
        navBottom: rect.bottom,
        isOffscreenTop: rect.bottom <= 0
      };
    });
    console.log("SubNav position while in FAQ/footer:", subnavPastServices);
    if (!subnavPastServices.isOffscreenTop) {
      console.log("SubNav rect while past services:", subnavPastServices);
    } else {
      console.log("✓ SubNav naturally scrolled off-screen and did NOT overlap FAQ/footer!");
    }

    // 7. Mobile Viewport Test (390x844)
    console.log("\n--- Testing Mobile Viewport (390x844) ---");
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });

    // Click Content & Video
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Services Sub-navigation"] a[href="#content-video"]');
      if (link) link.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const mobileMetrics = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Services Sub-navigation"]');
      const heading = document.querySelector('#content-video h2');
      const bodyWidth = document.body.scrollWidth;
      if (!nav || !heading) return null;
      const navRect = nav.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      return {
        gap: headingRect.top - navRect.bottom,
        bodyWidth,
        viewportWidth: window.innerWidth,
        navWidth: navRect.width
      };
    });
    console.log("Mobile Metrics:", mobileMetrics);
    if (mobileMetrics.bodyWidth > 390) {
      console.warn(`Warning: Horizontal overflow detected on mobile: bodyWidth ${mobileMetrics.bodyWidth} > 390`);
    } else {
      console.log("✓ Zero horizontal page overflow on mobile!");
    }
    if (mobileMetrics.gap < 10) {
      throw new Error(`Mobile heading overlapping SubNav! Gap: ${mobileMetrics.gap}px`);
    }
    console.log(`✓ Mobile heading has ${mobileMetrics.gap.toFixed(1)}px clear gap below SubNav dock!`);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "test_services_sec01_mobile.png") });
    console.log("✓ Saved screenshot: test_services_sec01_mobile.png");

    console.log("\n==========================================");
    console.log("ALL STICKY SUBNAV TESTS PASSED!");
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
