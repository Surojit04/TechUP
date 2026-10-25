import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE CONSOLE:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle0" });

  await page.type("#inquiry-name", "Priya Sharma");
  await page.type("#inquiry-email", "priya@elevatebrand.co");
  await page.type("#inquiry-details", "Looking for high retention video editing and modern web design.");

  // Click first service
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-pressed]');
    if (btn) btn.click();
  });

  await new Promise((r) => setTimeout(r, 200));

  // Click submit
  await page.evaluate(() => {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.click();
  });

  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: "scratch/debug_submit.png" });

  const hasSuccess = await page.evaluate(() => document.body.innerText.includes("Inquiry Received!"));
  console.log("Has success screen:", hasSuccess);

  const errors = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".text-red-400")).map((el) => el.textContent);
  });
  console.log("Errors on page:", errors);

  await browser.close();
}

run().catch(console.error);
