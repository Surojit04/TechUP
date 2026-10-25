import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\suroj\\.gemini\\antigravity-ide\\brain\\06581989-c1fc-43f1-b7b1-921b98d8d511';

async function run() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9777',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://localhost:9777/json');
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

    console.log('--- 1. Testing /blog ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/blog?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    // Verify blog listing cards
    const blogListingInfo = await evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('a[href*="/blog/"]')).map(a => {
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
        return cards;
      })()
    `);
    console.log('Blog listing cards found:', JSON.stringify(blogListingInfo, null, 2));

    await captureScreenshot(path.join(ARTIFACT_DIR, 'blog_listing_desktop.png'));

    // Click "Video Editing" filter
    console.log('\n--- Clicking Video Editing Filter on /blog ---');
    await evaluate(`
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const veBtn = btns.find(b => b.textContent.includes('Video Editing'));
        if (veBtn) veBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'blog_listing_video_editing_filter.png'));

    console.log('\n--- 2. Testing Homepage Blog Teaser (/) ---');
    await send('Page.navigate', { url: 'http://localhost:3000/?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    await evaluate(`
      (() => {
        const blogSec = document.querySelector('#blog') || Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('LATEST FROM THE BLOG') || s.textContent.includes('Insights & Articles'));
        if (blogSec) blogSec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));

    const homeTeaserInfo = await evaluate(`
      (() => {
        const blogSec = document.querySelector('#blog') || document.body;
        const cards = Array.from(blogSec.querySelectorAll('a[href*="/blog/"]')).map(a => {
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
        return cards;
      })()
    `);
    console.log('Homepage teaser cards found:', JSON.stringify(homeTeaserInfo, null, 2));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_blog_teaser.png'));

    console.log('\n--- 3. Testing Individual Article Page (/blog/short-form-vs-long-form-video) ---');
    await send('Page.navigate', { url: 'http://localhost:3000/blog/short-form-vs-long-form-video?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    const articleInfo = await evaluate(`
      (() => {
        const h1 = document.querySelector('h1')?.textContent?.trim();
        const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          width: img.offsetWidth,
          height: img.offsetHeight
        }));
        return { h1, imgs };
      })()
    `);
    console.log('Article page info:', JSON.stringify(articleInfo, null, 2));

    await captureScreenshot(path.join(ARTIFACT_DIR, 'article_desktop_header.png'));

    // Scroll to bottom to check related articles
    console.log('\n--- Checking Related Articles Section ---');
    await evaluate(`
      (() => {
        window.scrollTo(0, document.body.scrollHeight);
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'article_desktop_related.png'));

    // Mobile testing
    console.log('\n--- 4. Mobile Viewport Testing (390x844) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Page.navigate', { url: 'http://localhost:3000/blog/short-form-vs-long-form-video?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'article_mobile_header.png'));

    // Mobile blog listing
    await send('Page.navigate', { url: 'http://localhost:3000/blog?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'blog_listing_mobile.png'));

    // Mobile homepage teaser
    await send('Page.navigate', { url: 'http://localhost:3000/?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    await evaluate(`
      (() => {
        const blogSec = document.querySelector('#blog') || Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('LATEST FROM THE BLOG') || s.textContent.includes('Insights & Articles'));
        if (blogSec) blogSec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_teaser_mobile.png'));

    console.log('\n=== ALL TESTS AND CAPTURES COMPLETED SUCCESSFULLY! ===');
    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    edge.kill();
  }
}

run();
