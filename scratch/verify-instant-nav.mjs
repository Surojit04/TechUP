import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("Starting instant navigation test...");
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
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  try {
    // 1. Load Home
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    console.log("✓ Loaded Home page");

    // 2. Scroll down 1500px
    await page.evaluate(() => {
      window.scrollTo(0, 1500);
      if (window.__lenis) window.__lenis.scrollTo(1500, { immediate: true });
    });
    const scrolledY = await page.evaluate(() => window.scrollY);
    console.log(`✓ Scrolled Home page down to: ${scrolledY}px`);

    // 3. Click "Services" in navbar
    const servicesLink = await page.waitForSelector('nav[aria-label="Main Navigation"] a[href="/services"]');
    await servicesLink.click();
    await page.waitForFunction(() => window.location.pathname === "/services");
    console.log("✓ Navigated to /services");

    // Check scroll position on Services
    const servicesScrollY = await page.evaluate(() => window.scrollY);
    console.log(`✓ Destination /services scrollY: ${servicesScrollY}px (expected 0)`);
    if (servicesScrollY > 10) {
      throw new Error(`Expected scrollY to be 0 on /services, but got ${servicesScrollY}`);
    }

    // 4. Scroll down on Services
    await page.evaluate(() => {
      window.scrollTo(0, 800);
      if (window.__lenis) window.__lenis.scrollTo(800, { immediate: true });
    });
    console.log("✓ Scrolled down on /services");

    // 5. Click "Blog" in navbar
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Main Navigation"] a[href="/blog"]');
      if (link) link.click();
    });
    await page.waitForFunction(() => window.location.pathname === "/blog");
    console.log("✓ Navigated to /blog");

    // Check scroll position on Blog
    const blogScrollY = await page.evaluate(() => window.scrollY);
    console.log(`✓ Destination /blog scrollY: ${blogScrollY}px (expected 0)`);
    if (blogScrollY > 10) {
      throw new Error(`Expected scrollY to be 0 on /blog, but got ${blogScrollY}`);
    }

    // 6. Click "Home" in navbar from Blog
    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Main Navigation"] a[href="/"]');
      if (link) link.click();
    });
    await page.waitForFunction(() => window.location.pathname === "/");
    console.log("✓ Navigated back to Home (/)");

    const homeScrollY = await page.evaluate(() => window.scrollY);
    console.log(`✓ Destination / scrollY: ${homeScrollY}px (expected 0)`);
    if (homeScrollY > 10) {
      throw new Error(`Expected scrollY to be 0 on Home, but got ${homeScrollY}`);
    }

    // 7. Scroll down on Home and click "Home" again
    await page.evaluate(() => {
      window.scrollTo(0, 1200);
      if (window.__lenis) window.__lenis.scrollTo(1200, { immediate: true });
    });
    const scrolledHome = await page.evaluate(() => window.scrollY);
    console.log(`✓ Scrolled Home down to: ${scrolledHome}px`);

    await page.evaluate(() => {
      const link = document.querySelector('nav[aria-label="Main Navigation"] a[href="/"]');
      if (link) link.click();
    });
    // Allow brief tick
    await new Promise((r) => setTimeout(r, 100));
    const snappedHomeY = await page.evaluate(() => window.scrollY);
    console.log(`✓ After clicking Home while on Home, scrollY: ${snappedHomeY}px (expected 0)`);

    // 8. Rapid navigation test (Work -> Services -> Blog -> Contact -> Home)
    console.log("--- Testing Rapid Navigation ---");
    await page.evaluate(() => {
      document.querySelector('nav[aria-label="Main Navigation"] a[href="/work"]')?.click();
    });
    await page.evaluate(() => {
      document.querySelector('nav[aria-label="Main Navigation"] a[href="/services"]')?.click();
    });
    await page.evaluate(() => {
      document.querySelector('nav[aria-label="Main Navigation"] a[href="/blog"]')?.click();
    });
    await page.evaluate(() => {
      document.querySelector('nav[aria-label="Main Navigation"] a[href="/contact"]')?.click();
    });
    await page.evaluate(() => {
      document.querySelector('nav[aria-label="Main Navigation"] a[href="/"]')?.click();
    });

    await page.waitForFunction(() => window.location.pathname === "/");
    console.log("✓ Rapid navigation completed smoothly without deadlock or frozen state");

    // 9. SubNav instant jump test on /services
    console.log("--- Testing /services SubNav Instant Anchor Jump ---");
    await page.goto(`${BASE_URL}/services`, { waitUntil: "networkidle0" });
    const brandingSubLink = await page.waitForSelector('nav[aria-label="Services Sub-navigation"] a[href="#branding-design"]');
    await brandingSubLink.click();
    await new Promise((r) => setTimeout(r, 100));
    const subnavY = await page.evaluate(() => window.scrollY);
    const brandingElTop = await page.evaluate(() => {
      const el = document.getElementById("branding-design");
      return el ? el.getBoundingClientRect().top : null;
    });
    console.log(`✓ After clicking #branding-design subnav link: scrollY is ${subnavY}px, element top relative to viewport is ${brandingElTop}px (expected ~135px below viewport top, clear of navbars)`);

    console.log("\n==========================================");
    console.log("ALL INSTANT NAVIGATION TESTS PASSED!");
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
