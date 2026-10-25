const puppeteer = require('puppeteer-core');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Clear sessionStorage before load
  await page.evaluateOnNewDocument(() => {
    sessionStorage.clear();
  });

  // Navigate
  page.goto('http://localhost:3000/');
  // Wait 150ms during active loader display
  await new Promise(r => setTimeout(r, 150));
  
  await page.screenshot({ path: 'scratch/loader-live-capture.png' });
  console.log('Saved scratch/loader-live-capture.png');
  await browser.close();
})();
