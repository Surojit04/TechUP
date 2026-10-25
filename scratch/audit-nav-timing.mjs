import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  console.log("Loading initial Home page...");
  const t0 = Date.now();
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });
  console.log(`Initial Home loaded in ${Date.now() - t0}ms\n`);

  const forwardPath = [
    { from: "Home", to: "Services", href: "/services", heading: "h1, h2" },
    { from: "Services", to: "Work", href: "/work", heading: "h1, h2" },
    { from: "Work", to: "Blog", href: "/blog", heading: "h1, h2" },
    { from: "Blog", to: "Contact", href: "/contact", heading: "h1, h2" },
    { from: "Contact", to: "Home", href: "/", heading: "h1" },
  ];

  console.log("=== MEASURING FORWARD NAVIGATION (Prefetched) ===");
  for (const step of forwardPath) {
    // Wait brief moment for prefetch idle window
    await new Promise((r) => setTimeout(r, 400));

    const selector = `nav[aria-label="Main Navigation"] a[href="${step.href}"]`;
    await page.waitForSelector(selector);

    const clickTime = Date.now();
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error("Nav element not found: " + sel);
      el.click();
    }, selector);

    await page.waitForFunction((expected) => window.location.pathname === expected, {}, step.href);
    const pathTime = Date.now() - clickTime;

    await page.waitForSelector(step.heading, { visible: true });
    const visibleTime = Date.now() - clickTime;

    const scrollY = await page.evaluate(() => window.scrollY);

    console.log(`  ${step.from} -> ${step.to} (${step.href}):`);
    console.log(`    • Click-to-route-start: ${pathTime}ms`);
    console.log(`    • Click-to-visible-destination: ${visibleTime}ms`);
    console.log(`    • Scroll top: ${scrollY}px`);
  }

  const reversePath = [
    { from: "Home", to: "Contact", href: "/contact", heading: "h1, h2" },
    { from: "Contact", to: "Blog", href: "/blog", heading: "h1, h2" },
    { from: "Blog", to: "Work", href: "/work", heading: "h1, h2" },
    { from: "Work", to: "Services", href: "/services", heading: "h1, h2" },
    { from: "Services", to: "Home", href: "/", heading: "h1" },
  ];

  console.log("\n=== MEASURING REVERSE NAVIGATION (Warm/Cached) ===");
  for (const step of reversePath) {
    await new Promise((r) => setTimeout(r, 200));

    const selector = `nav[aria-label="Main Navigation"] a[href="${step.href}"]`;
    await page.waitForSelector(selector);

    const clickTime = Date.now();
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error("Nav element not found: " + sel);
      el.click();
    }, selector);

    await page.waitForFunction((expected) => window.location.pathname === expected, {}, step.href);
    const pathTime = Date.now() - clickTime;

    await page.waitForSelector(step.heading, { visible: true });
    const visibleTime = Date.now() - clickTime;

    const scrollY = await page.evaluate(() => window.scrollY);

    console.log(`  ${step.from} -> ${step.to} (${step.href}):`);
    console.log(`    • Click-to-route-start: ${pathTime}ms`);
    console.log(`    • Click-to-visible-destination: ${visibleTime}ms`);
    console.log(`    • Scroll top: ${scrollY}px`);
  }

  // Rapid click stress test
  console.log("\n=== RAPID CLICK STRESS TEST ===");
  const rapidLinks = ["/services", "/work", "/blog", "/contact", "/"];
  let rapidSuccess = true;
  for (const href of rapidLinks) {
    const sel = `nav[aria-label="Main Navigation"] a[href="${href}"]`;
    await page.evaluate((s) => {
      document.querySelector(s)?.click();
    }, sel);
    await new Promise((r) => setTimeout(r, 60)); // rapidly trigger within 60ms
  }
  await page.waitForFunction(() => window.location.pathname === "/");
  console.log("  Rapid click sequence successfully settled on destination without crashes!");

  console.log("\n=== CONSOLE AUDIT ===");
  if (consoleErrors.length === 0) {
    console.log("  0 runtime or console errors encountered across all tests.");
  } else {
    console.log("  Errors encountered:", consoleErrors);
  }

  await browser.close();
}

run().catch(console.error);
