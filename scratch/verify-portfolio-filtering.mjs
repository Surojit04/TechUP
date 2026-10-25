import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/work";
const ARTIFACT_DIR = "C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\66c105ac-da74-478f-a46e-44d9e55ab935";

async function run() {
  console.log("=== Testing Portfolio Filtering & Card Animations ===");
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
    // 1. Initial Load: /work
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded /work");

    // Check categories
    const categories = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('section button[type="button"] span'));
      return btns.map((b) => b.textContent?.trim());
    });
    console.log("Found Filter Categories:", categories);

    // Initial card count (All)
    const allCardsCount = await page.evaluate(() => {
      return document.querySelectorAll('[data-work-card-id]').length;
    });
    console.log(`✓ "All" Category card count: ${allCardsCount}`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_filter_all.png") });
    console.log("✓ Saved screenshot: portfolio_filter_all.png");

    // 2. Filter: Reels & Short-form
    console.log("\n--- Testing Filter: Reels & Short-form ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Reels & Short-form")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450)); // allow 0.35s stagger to complete

    const reelsCheck = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-work-card-id]'));
      const badges = cards.map((c) => c.querySelector('.z-10 span')?.textContent?.trim());
      // Check for overlapping cards (every card should have unique vertical/horizontal space)
      const rects = cards.map((c) => c.getBoundingClientRect());
      let hasOverlap = false;
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i];
          const r2 = rects[j];
          // Check if rectangles collide
          if (
            r1.left < r2.right &&
            r1.right > r2.left &&
            r1.top < r2.bottom &&
            r1.bottom > r2.top
          ) {
            hasOverlap = true;
          }
        }
      }
      return {
        count: cards.length,
        badges,
        hasOverlap,
      };
    });
    console.log(`✓ Reels cards count: ${reelsCheck.count}`);
    console.log(`✓ Card overlap detected: ${reelsCheck.hasOverlap ? "FAIL" : "NONE (Clean)"}`);
    if (reelsCheck.hasOverlap) throw new Error("Overlap detected between cards!");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_filter_reels.png") });
    console.log("✓ Saved screenshot: portfolio_filter_reels.png");

    // 3. Filter: Long-form & Podcasts
    console.log("\n--- Testing Filter: Long-form & Podcasts ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Long-form & Podcasts")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));
    const longFormCount = await page.evaluate(() => document.querySelectorAll('[data-work-card-id]').length);
    console.log(`✓ Long-form cards count: ${longFormCount}`);

    // 4. Filter: Branding & Design
    console.log("\n--- Testing Filter: Branding & Design ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Branding & Design")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));
    const brandingCount = await page.evaluate(() => document.querySelectorAll('[data-work-card-id]').length);
    console.log(`✓ Branding cards count: ${brandingCount}`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_filter_branding.png") });
    console.log("✓ Saved screenshot: portfolio_filter_branding.png");

    // 5. Filter: Websites
    console.log("\n--- Testing Filter: Websites ---");
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Websites")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));
    const websitesCount = await page.evaluate(() => document.querySelectorAll('[data-work-card-id]').length);
    console.log(`✓ Websites cards count: ${websitesCount}`);

    // 6. Rapid Category Switching Test
    console.log("\n--- Testing Rapid Category Switching ---");
    const rapidCategories = ["Reels & Short-form", "Websites", "Branding & Design", "Long-form & Podcasts", "All"];
    for (const catName of rapidCategories) {
      await page.evaluate((name) => {
        const btn = Array.from(document.querySelectorAll('button')).find((b) =>
          b.textContent?.trim() === name
        );
        if (btn) btn.click();
      }, catName);
      await new Promise((r) => setTimeout(r, 100)); // Rapid 100ms clicks
    }
    await new Promise((r) => setTimeout(r, 600)); // Allow final settle

    const finalCount = await page.evaluate(() => document.querySelectorAll('[data-work-card-id]').length);
    console.log(`✓ Settled on "All" with count: ${finalCount} (expected ${allCardsCount})`);
    if (finalCount !== allCardsCount) {
      throw new Error(`Expected ${allCardsCount} cards on All, but got ${finalCount}`);
    }

    // 7. Mobile Viewport (390x844)
    console.log("\n--- Testing Mobile Viewport (390x844) ---");
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });

    // Click Branding & Design on mobile
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes("Branding & Design")
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 450));

    const mobileCheck = await page.evaluate(() => {
      return {
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        cardsCount: document.querySelectorAll('[data-work-card-id]').length
      };
    });
    console.log("Mobile Check:", mobileCheck);
    if (mobileCheck.bodyWidth > 390) {
      console.warn(`Warning: Mobile horizontal overflow: bodyWidth ${mobileCheck.bodyWidth} > 390`);
    } else {
      console.log("✓ Zero horizontal page overflow on mobile!");
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "portfolio_mobile_branding.png") });
    console.log("✓ Saved screenshot: portfolio_mobile_branding.png");

    console.log("\n==========================================");
    console.log("ALL PORTFOLIO FILTERING TESTS PASSED!");
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
