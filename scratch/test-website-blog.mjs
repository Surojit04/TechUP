import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\06581989-c1fc-43f1-b7b1-921b98d8d511';

async function run() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9822',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://localhost:9822/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab) throw new Error('No page tab found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = Math.floor(Math.random() * 1000000);
        const timeout = setTimeout(() => {
          ws.removeEventListener('message', handler);
          reject(new Error(`Timeout waiting for ${method}`));
        }, 15000);

        const handler = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === id) {
            clearTimeout(timeout);
            ws.removeEventListener('message', handler);
            if (d.error) reject(new Error(JSON.stringify(d.error)));
            else resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return res.result?.value;
    }

    async function captureScreenshot(filepath) {
      const { data } = await send('Page.captureScreenshot', { format: 'png' });
      const buf = Buffer.from(data, 'base64');
      fs.writeFileSync(filepath, buf);
      console.log(`Saved screenshot: ${filepath}`);
    }

    if (!fs.existsSync(ARTIFACT_DIR)) {
      fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
    }

    // --- 1. Testing /blog ---
    console.log('--- 1. Testing /blog ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/blog?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    const blogCards = await evaluate(`
      (() => {
        return Array.from(document.querySelectorAll('a[href*="/blog/"]')).map(a => {
          const title = a.querySelector('h2, h3, h4')?.textContent?.trim();
          const img = a.querySelector('img');
          return {
            title,
            href: a.getAttribute('href'),
            imgSrc: img?.src,
            imgAlt: img?.alt,
            naturalWidth: img?.naturalWidth,
            naturalHeight: img?.naturalHeight,
            complete: img?.complete
          };
        }).filter(c => c.title);
      })()
    `);
    console.log('Blog cards on /blog:', JSON.stringify(blogCards, null, 2));

    // Scroll to the website post in grid
    await evaluate(`
      (() => {
        const webCard = Array.from(document.querySelectorAll('a[href*="/blog/5-signs-your-business-needs-a-proper-website"]')).pop();
        if (webCard) webCard.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_grid_card_desktop.png'));

    // --- 2. Testing Websites Category Filter on /blog ---
    console.log('--- 2. Testing Websites Filter on /blog ---');
    await evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const webBtn = buttons.find(b => b.textContent.includes('Websites'));
        if (webBtn) webBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await evaluate(`window.scrollTo(0, 400)`);
    await new Promise(r => setTimeout(r, 500));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_category_filter.png'));

    // --- 3. Testing Homepage Blog Teaser ---
    console.log('--- 3. Testing Homepage Blog Teaser (/) ---');
    await send('Page.navigate', { url: 'http://localhost:3000/?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    await evaluate(`
      (() => {
        const blogSec = document.getElementById('blog');
        if (blogSec) blogSec.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));

    const homeCards = await evaluate(`
      (() => {
        const blogSec = document.getElementById('blog');
        if (!blogSec) return [];
        return Array.from(blogSec.querySelectorAll('a[href*="/blog/"]')).map(a => {
          const title = a.querySelector('h3')?.textContent?.trim();
          const img = a.querySelector('img');
          return {
            title,
            href: a.getAttribute('href'),
            imgSrc: img?.src,
            imgAlt: img?.alt,
            naturalWidth: img?.naturalWidth,
            naturalHeight: img?.naturalHeight,
            complete: img?.complete
          };
        });
      })()
    `);
    console.log('Homepage cards:', JSON.stringify(homeCards, null, 2));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_homepage_teaser.png'));

    // --- 4. Testing Individual Article Page (/blog/5-signs-your-business-needs-a-proper-website) ---
    console.log('--- 4. Testing Individual Article Page ---');
    await send('Page.navigate', { url: 'http://localhost:3000/blog/5-signs-your-business-needs-a-proper-website?no-loader' });
    await new Promise(r => setTimeout(r, 2500));

    const articleInfo = await evaluate(`
      (() => {
        const h1 = document.querySelector('h1')?.textContent?.trim();
        const imgs = Array.from(document.querySelectorAll('article img')).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          width: img.clientWidth,
          height: img.clientHeight
        }));
        return { h1, imgs };
      })()
    `);
    console.log('Article details page info:', JSON.stringify(articleInfo, null, 2));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_article_desktop_header.png'));

    // --- 5. Checking Related Articles Section on /blog/how-often-should-a-creator-post-reels ---
    console.log('--- 5. Checking Related Posts on /blog/how-often-should-a-creator-post-reels ---');
    await send('Page.navigate', { url: 'http://localhost:3000/blog/how-often-should-a-creator-post-reels?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    await evaluate(`
      (() => {
        const relatedH3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Related Articles'));
        if (relatedH3) relatedH3.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_related_on_reels.png'));

    // --- 6. Mobile Viewport Testing (390x844) ---
    console.log('--- 6. Mobile Viewport Testing (390x844) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/blog/5-signs-your-business-needs-a-proper-website?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_article_mobile_header.png'));

    await send('Page.navigate', { url: 'http://localhost:3000/blog?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    await evaluate(`
      (() => {
        const webCard = Array.from(document.querySelectorAll('a[href*="/blog/5-signs-your-business-needs-a-proper-website"]')).pop();
        if (webCard) webCard.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'website_blog_listing_mobile.png'));

    console.log('\n=== ALL TESTS AND CAPTURES COMPLETED SUCCESSFULLY! ===');
    ws.close();
  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    edge.kill();
  }
}

run();
