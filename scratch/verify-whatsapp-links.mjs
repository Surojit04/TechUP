import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

const EXPECTED_PHONE = "919831710140";
const EXPECTED_DISPLAY = "+91 98317 10140";

async function run() {
  console.log("=== STARTING WHATSAPP NUMBER AUDIT & VERIFICATION ===");
  console.log(`Expected number in wa.me URLs: ${EXPECTED_PHONE}`);
  console.log(`Expected display phone:        ${EXPECTED_DISPLAY}\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const pagesToTest = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  let totalLinksChecked = 0;
  let allPassed = true;

  for (const p of pagesToTest) {
    console.log(`--- Testing Page: ${p.name} (${p.path}) ---`);
    await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle0" });

    // Collect all links on the page containing "wa.me"
    const waLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
      return links.map((a) => ({
        href: a.href,
        text: a.innerText.trim(),
        ariaLabel: a.getAttribute("aria-label"),
      }));
    });

    console.log(`  Found ${waLinks.length} WhatsApp link(s):`);

    for (const link of waLinks) {
      totalLinksChecked++;
      const hasCorrectNumber = link.href.includes(`wa.me/${EXPECTED_PHONE}`);
      const hasOldNumber = link.href.includes("14104");

      if (hasCorrectNumber && !hasOldNumber) {
        console.log(`  ✓ [PASSED] ${link.ariaLabel || link.text || "Link"}: ${link.href}`);
      } else {
        allPassed = false;
        console.error(`  ✗ [FAILED] Expected ${EXPECTED_PHONE} in URL: ${link.href}`);
      }
    }

    // Special check on /contact for phone display text & placeholder
    if (p.path === "/contact") {
      const contactPageDetails = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        const phoneInput = document.querySelector("#inquiry-phone");
        return {
          hasDisplayNumber: bodyText.includes("+91 98317 10140"),
          hasOldDisplay: bodyText.includes("14104"),
          placeholder: phoneInput ? phoneInput.getAttribute("placeholder") : null,
        };
      });

      console.log(`  • Contact Page Display Number (+91 98317 10140): ${contactPageDetails.hasDisplayNumber ? "✓ FOUND" : "✗ MISSING"}`);
      console.log(`  • Contact Page Old Number (14104): ${contactPageDetails.hasOldDisplay ? "✗ DETECTED OLD NUMBER" : "✓ NOT FOUND"}`);
      console.log(`  • Inquiry Phone Placeholder: ${contactPageDetails.placeholder === EXPECTED_DISPLAY ? "✓ MATCHES (" + contactPageDetails.placeholder + ")" : "✗ MISMATCH"}`);

      if (!contactPageDetails.hasDisplayNumber || contactPageDetails.hasOldDisplay || contactPageDetails.placeholder !== EXPECTED_DISPLAY) {
        allPassed = false;
      }
    }

    // Check JSON-LD telephone on page
    const structuredDataTelephone = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      for (const s of scripts) {
        try {
          const json = JSON.parse(s.innerHTML);
          if (json.telephone) return json.telephone;
        } catch {
          // ignore
        }
      }
      return null;
    });

    if (structuredDataTelephone) {
      console.log(`  • Structured Data Telephone: ${structuredDataTelephone} ${structuredDataTelephone === "+919831710140" ? "✓ PASSED" : "✗ MISMATCH"}`);
    }
  }

  // Mobile menu check at 390px
  console.log("\n--- Testing Mobile Menu WhatsApp Link (390px) ---");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });

  // Open mobile menu
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label="Open mobile menu"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  const mobileWaLink = await page.evaluate(() => {
    const link = document.querySelector('a[href*="wa.me"]');
    return link ? link.href : null;
  });

  if (mobileWaLink && mobileWaLink.includes(`wa.me/${EXPECTED_PHONE}`)) {
    console.log(`  ✓ [PASSED] Mobile Menu WhatsApp Link: ${mobileWaLink}`);
  } else {
    allPassed = false;
    console.error(`  ✗ [FAILED] Mobile menu link: ${mobileWaLink}`);
  }

  console.log("\n==========================================");
  console.log(`Total WhatsApp links verified: ${totalLinksChecked}`);
  console.log(`Status: ${allPassed ? "ALL WHATSAPP CHECKS PASSED!" : "FAILED"}`);
  console.log("==========================================\n");

  await browser.close();

  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
