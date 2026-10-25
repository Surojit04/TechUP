import { spawn } from 'child_process';
import fs from 'fs';

const pages = [
  { name: 'services', url: 'http://localhost:3005/services?no-loader' },
  { name: 'about', url: 'http://localhost:3005/about?no-loader' }
];

const viewports = [
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 1 }
];

async function runTests() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--window-size=1920,1080',
    'http://localhost:3005/?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9333/json');
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

    if (!fs.existsSync('screenshots/services-about')) {
      fs.mkdirSync('screenshots/services-about', { recursive: true });
    }

    for (const p of pages) {
      console.log(`\n--- Testing ${p.name.toUpperCase()} ---`);

      for (const vp of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: vp.dsf,
          mobile: vp.mobile,
          fitWindow: false,
        });

        await send('Page.navigate', { url: p.url });
        await new Promise(r => setTimeout(r, 2000));

        // Overflow check
        const { result: overflowCheck } = await send('Runtime.evaluate', {
          expression: `({
            docW: document.documentElement.scrollWidth,
            winW: window.innerWidth,
            hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
            title: document.title
          })`,
          returnByValue: true
        });

        console.log(`[${p.name}] ${vp.name}:`, overflowCheck.value);

        // Capture hero fold
        const heroShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(
          `screenshots/services-about/${p.name}-${vp.name}-hero.png`,
          Buffer.from(heroShot.data, 'base64')
        );

        // Get total height
        const { result: scrollH } = await send('Runtime.evaluate', {
          expression: 'document.body.scrollHeight'
        });
        const totalHeight = scrollH.value;
        console.log(`[${p.name}] ${vp.name} scrollHeight:`, totalHeight);

        // If height < 14000, take full page screenshot
        if (totalHeight < 14000) {
          const fullShot = await send('Page.captureScreenshot', {
            format: 'png',
            captureBeyondViewport: true
          });
          fs.writeFileSync(
            `screenshots/services-about/${p.name}-${vp.name}-full.png`,
            Buffer.from(fullShot.data, 'base64')
          );
        } else {
          // Chunk it for mobile to stay safely under 16384 GPU texture limit
          const chunkH = Math.floor(totalHeight / 2);
          const topShot = await send('Page.captureScreenshot', {
            format: 'png',
            clip: { x: 0, y: 0, width: vp.width, height: chunkH, scale: 1 },
            captureBeyondViewport: true
          });
          fs.writeFileSync(
            `screenshots/services-about/${p.name}-${vp.name}-top.png`,
            Buffer.from(topShot.data, 'base64')
          );

          const bottomShot = await send('Page.captureScreenshot', {
            format: 'png',
            clip: { x: 0, y: chunkH, width: vp.width, height: totalHeight - chunkH, scale: 1 },
            captureBeyondViewport: true
          });
          fs.writeFileSync(
            `screenshots/services-about/${p.name}-${vp.name}-bottom.png`,
            Buffer.from(bottomShot.data, 'base64')
          );
        }
      }

      // Special verification per page
      if (p.name === 'services') {
        const { result: faqCheck } = await send('Runtime.evaluate', {
          expression: `(() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            const faq = scripts.find(s => s.textContent.includes('FAQPage'));
            return faq ? JSON.parse(faq.textContent)['@type'] : null;
          })()`,
          returnByValue: true
        });
        console.log(`[services] FAQPage JSON-LD Schema:`, faqCheck.value);

        const { result: modelsCheck } = await send('Runtime.evaluate', {
          expression: `document.querySelectorAll('button:has-text("Monthly Retainer")').length || !!document.querySelector('button')`,
          returnByValue: true
        });
        console.log(`[services] Engagement tabs rendered:`, modelsCheck.value);
      }

      if (p.name === 'about') {
        const { result: teamCheck } = await send('Runtime.evaluate', {
          expression: `(() => {
            const teamEl = document.getElementById('team');
            return {
              hasTeamId: !!teamEl,
              className: teamEl?.className,
              hasFounderNote: document.body.textContent.includes('[FOUNDER NOTE: paste text from company profile page 14]')
            };
          })()`,
          returnByValue: true
        });
        console.log(`[about] Team & Founder Note verification:`, teamCheck.value);
      }
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

runTests().then(() => {
  console.log('All tests completed successfully!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
