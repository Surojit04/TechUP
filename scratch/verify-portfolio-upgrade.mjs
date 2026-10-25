import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/work";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\66c105ac-da74-478f-a46e-44d9e55ab935";

async function run() {
  console.log("=== Testing Upgraded Creative Portfolio Work Section ===");
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
    // 1. Initial Load: /work
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded /work");

    // Take screenshot of hero + top grid
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_desktop_overview.png") });
    console.log("✓ Saved screenshot: portfolio_desktop_overview.png");

    // Check filters
    const filterData = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('section button[type="button"]'));
      return buttons.map((b) => b.textContent?.trim()).filter(Boolean);
    });
    console.log("Found Filter Categories:", filterData);

    // Initial card count
    const initialCardCount = await page.evaluate(() => {
      return document.querySelectorAll('[data-work-card-id]').length;
    });
    console.log(`✓ "All" Category card count: ${initialCardCount}`);

    // Check that card images (Next.js Image) rendered
    const imagesLoaded = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('[data-work-card-id] img'));
      return imgs.map((img) => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
      }));
    });
    console.log(`✓ Number of card images loaded: ${imagesLoaded.length}`);
    const brokenImages = imagesLoaded.filter((img) => !img.complete || img.naturalWidth === 0);
    if (brokenImages.length > 0) {
      console.warn("Broken images detected:", brokenImages);
    } else {
      console.log("✓ All card images loaded with valid natural dimensions!");
    }

    // 2. Filter: Reels & Short-form
    console.log("\n--- Testing Filter: Reels & Short-form ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Reels & Short-form")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));

    const reelsCheck = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-work-card-id]'));
      const badges = cards.map((c) => c.querySelector('span')?.textContent?.trim());
      return { count: cards.length, badges };
    });
    console.log(`✓ Reels cards count: ${reelsCheck.count}`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_filter_reels_upgraded.png") });
    console.log("✓ Saved screenshot: portfolio_filter_reels_upgraded.png");

    // 3. Test Opening Project Modal on a Reel
    console.log("\n--- Testing Project Modal on Reel ---");
    await page.evaluate(() => {
      const firstCard = document.querySelector('[data-work-card-id]');
      if (firstCard) firstCard.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const modalState = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return { open: false };
      const title = dialog.querySelector('#project-modal-title')?.textContent?.trim();
      const hasImage = !!dialog.querySelector('img');
      const hasAudioControls = !!dialog.querySelector('button[aria-label*="audio"]');
      return { open: true, title, hasImage, hasAudioControls };
    });
    console.log("Modal state:", modalState);
    if (!modalState.open) throw new Error("Modal failed to open!");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_modal_reel.png") });
    console.log("✓ Saved screenshot: portfolio_modal_reel.png");

    // Close modal via Escape
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));
    const modalClosed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
    console.log(`✓ Modal closed successfully via Escape: ${modalClosed}`);

    // 4. Filter: Branding & Design
    console.log("\n--- Testing Filter: Branding & Design ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Branding & Design")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_filter_branding_upgraded.png") });
    console.log("✓ Saved screenshot: portfolio_filter_branding_upgraded.png");

    // Open Branding Modal
    await page.evaluate(() => {
      const firstCard = document.querySelector('[data-work-card-id]');
      if (firstCard) firstCard.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_modal_branding.png") });
    console.log("✓ Saved screenshot: portfolio_modal_branding.png");
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));

    // 5. Tablet Viewport (768x1024)
    console.log("\n--- Testing Tablet Viewport (768x1024) ---");
    await page.setViewport({ width: 768, height: 1024 });
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("All")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_tablet_overview.png") });
    console.log("✓ Saved screenshot: portfolio_tablet_overview.png");

    // 6. Mobile Viewport (390x844)
    console.log("\n--- Testing Mobile Viewport (390x844) ---");
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await new Promise((r) => setTimeout(r, 400));

    const mobileMetrics = await page.evaluate(() => {
      return {
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        cardsCount: document.querySelectorAll('[data-work-card-id]').length,
      };
    });
    console.log("Mobile Metrics:", mobileMetrics);
    if (mobileMetrics.bodyWidth > 390) {
      console.warn(`Mobile horizontal overflow: ${mobileMetrics.bodyWidth} > 390`);
    } else {
      console.log("✓ Zero horizontal page overflow on mobile!");
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_mobile_overview.png") });
    console.log("✓ Saved screenshot: portfolio_mobile_overview.png");

    console.log("\n==========================================");
    console.log("PORTFOLIO UPGRADE TEST COMPLETED!");
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
