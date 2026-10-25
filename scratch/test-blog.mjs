import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\suroj\\.gemini\\antigravity\\brain\\0efb76c7-cd7f-4f8f-8167-5af9db1bbca6';
const viewports = [
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 1 }
];

async function runBlogTests() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--window-size=1920,1080',
    'http://localhost:3005/blog?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9555/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab) throw new Error('No page tab found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    function send(method, params = {}) {
      return new Promise(resolve => {
        const id = Math.floor(Math.random() * 100000);
        const handler = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === id) {
            ws.removeEventListener('message', handler);
            resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    if (!fs.existsSync('screenshots/blog')) {
      fs.mkdirSync('screenshots/blog', { recursive: true });
    }

    console.log('=== PART 1: TESTING BLOG LISTING PAGE (/blog) ===');
    for (const vp of viewports) {
      console.log(`\n--- Testing /blog on ${vp.name} ---`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      await send('Page.navigate', { url: 'http://localhost:3005/blog?no-loader' });
      await new Promise(r => setTimeout(r, 2000));

      // Overflow check & listing checks
      const { result: listingCheck } = await send('Runtime.evaluate', {
        expression: `({
          docW: document.documentElement.scrollWidth,
          winW: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          title: document.title,
          filterChipsCount: document.querySelectorAll('button').length,
          featuredArticleTitle: document.querySelector('h3, h2')?.textContent?.trim() || 'none'
        })`,
        returnByValue: true
      });

      console.log(`[blog] ${vp.name} check:`, listingCheck.value);

      // Hero screenshot
      const heroShot = await send('Page.captureScreenshot', { format: 'png' });
      const heroPath = `screenshots/blog/blog-${vp.name}-hero.png`;
      fs.writeFileSync(heroPath, Buffer.from(heroShot.data, 'base64'));
      fs.copyFileSync(heroPath, path.join(ARTIFACT_DIR, `blog-${vp.name}-hero.png`));

      // Full screenshot
      const fullShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });
      const fullPath = `screenshots/blog/blog-${vp.name}-full.png`;
      fs.writeFileSync(fullPath, Buffer.from(fullShot.data, 'base64'));
      fs.copyFileSync(fullPath, path.join(ARTIFACT_DIR, `blog-${vp.name}-full.png`));
    }

    // Test Category Filter Interaction on Desktop
    console.log('\n--- Testing Filter Chips on /blog ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
      fitWindow: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3005/blog?no-loader' });
    await new Promise(r => setTimeout(r, 1500));

    // Click "Video Editing" filter chip
    const { result: filterClickRes } = await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Video Editing'));
        if (btn) {
          btn.click();
          return { clicked: true, text: btn.textContent.trim() };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Filter click result:', filterClickRes.value);
    await new Promise(r => setTimeout(r, 1000));

    const filteredShot = await send('Page.captureScreenshot', { format: 'png' });
    const filteredPath = 'screenshots/blog/blog-filtered-video-editing.png';
    fs.writeFileSync(filteredPath, Buffer.from(filteredShot.data, 'base64'));
    fs.copyFileSync(filteredPath, path.join(ARTIFACT_DIR, 'blog-filtered-video-editing.png'));


    console.log('\n=== PART 2: TESTING BLOG POST PAGE (/blog/how-often-should-a-creator-post-reels) ===');
    const postSlug = 'how-often-should-a-creator-post-reels';
    for (const vp of viewports) {
      console.log(`\n--- Testing /blog/${postSlug} on ${vp.name} ---`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      await send('Page.navigate', { url: `http://localhost:3005/blog/${postSlug}?no-loader` });
      await new Promise(r => setTimeout(r, 2000));

      // Comprehensive DOM inspection: JSON-LD schemas, TOC, author box, CTA, related posts, overflow
      const { result: postDomCheck } = await send('Runtime.evaluate', {
        expression: `(() => {
          const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
          const schemas = scripts.map(s => {
            try { return JSON.parse(s.textContent); } catch(e) { return null; }
          }).filter(Boolean);

          const articleSchema = schemas.find(s => s['@type'] === 'Article');
          const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');

          const tocLinks = Array.from(document.querySelectorAll('a[href^="#"]')).map(a => a.textContent.trim());
          const hasProgressBar = !!document.querySelector('.fixed.top-0');
          const hasShareButtons = Array.from(document.querySelectorAll('button, a')).some(el => 
            el.getAttribute('aria-label')?.includes('Share') || el.textContent?.includes('Copy Link') || el.textContent?.includes('Share')
          );
          const hasAuthorBox = document.body.textContent.includes('TechUP Digital Team') || document.body.textContent.includes('Editorial Team');
          const hasMidCTA = document.body.textContent.includes('Ready to Scale Your Brand?') || document.body.textContent.includes('Need Help With This?');
          const hasRelatedPosts = document.body.textContent.includes('Related Articles');

          return {
            docW: document.documentElement.scrollWidth,
            winW: window.innerWidth,
            hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
            title: document.title,
            hasArticleSchema: !!articleSchema,
            articleSchemaHeadline: articleSchema?.headline,
            hasBreadcrumbSchema: !!breadcrumbSchema,
            breadcrumbCount: breadcrumbSchema?.itemListElement?.length,
            tocHeadingsCount: tocLinks.length,
            tocLinksSample: tocLinks.slice(0, 4),
            hasProgressBar,
            hasShareButtons,
            hasAuthorBox,
            hasMidCTA,
            hasRelatedPosts
          };
        })()`,
        returnByValue: true
      });

      console.log(`[post] ${vp.name} evaluation:`, postDomCheck.value);

      // Hero view screenshot
      const postHeroShot = await send('Page.captureScreenshot', { format: 'png' });
      const postHeroPath = `screenshots/blog/post-${vp.name}-hero.png`;
      fs.writeFileSync(postHeroPath, Buffer.from(postHeroShot.data, 'base64'));
      fs.copyFileSync(postHeroPath, path.join(ARTIFACT_DIR, `post-${vp.name}-hero.png`));

      // Scroll down 1200px to test TOC sticky position and progress bar
      await send('Runtime.evaluate', {
        expression: 'window.scrollTo({ top: 1200, behavior: "instant" })'
      });
      await new Promise(r => setTimeout(r, 1000));

      const postScrolledShot = await send('Page.captureScreenshot', { format: 'png' });
      const postScrolledPath = `screenshots/blog/post-${vp.name}-scrolled.png`;
      fs.writeFileSync(postScrolledPath, Buffer.from(postScrolledShot.data, 'base64'));
      fs.copyFileSync(postScrolledPath, path.join(ARTIFACT_DIR, `post-${vp.name}-scrolled.png`));

      // Full page screenshot
      const postFullShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });
      const postFullPath = `screenshots/blog/post-${vp.name}-full.png`;
      fs.writeFileSync(postFullPath, Buffer.from(postFullShot.data, 'base64'));
      fs.copyFileSync(postFullPath, path.join(ARTIFACT_DIR, `post-${vp.name}-full.png`));
    }

    console.log('\n--- ALL BLOG TESTS COMPLETED SUCCESSFULLY ---');
    ws.close();
    edge.kill();
  } catch (err) {
    console.error('Error during testing:', err);
    edge.kill();
    process.exit(1);
  }
}

runBlogTests();
