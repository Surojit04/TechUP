import { spawn } from 'child_process';
import fs from 'fs';

const viewports = [
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 2 },
  { name: '768px', width: 768, height: 1024, mobile: false, dsf: 1 },
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '1920px', width: 1920, height: 1080, mobile: false, dsf: 1 },
];

async function captureSections() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9999',
    '--window-size=1920,1080',
    'http://localhost:3005/?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9999/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3005'));
    if (!pageTab) return;

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

    if (!fs.existsSync('screenshots/home')) {
      fs.mkdirSync('screenshots/home', { recursive: true });
    }

    // List sections
    const countRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const sections = Array.from(document.querySelectorAll('section'));
        return sections.map((s, i) => ({
          idx: i,
          heading: s.querySelector('h1, h2, h3')?.innerText?.slice(0, 30) || 'no-heading',
          top: s.getBoundingClientRect().top + window.scrollY
        }));
      })()`,
      returnByValue: true
    });

    console.log('Detected sections on Home page:', countRes.result.value);

    for (const vp of viewports) {
      console.log(`\nCapturing for ${vp.name}...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      // 1. Hero
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
      await new Promise(r => setTimeout(r, 800));
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-01-hero.png`, Buffer.from(shot.data, 'base64'));

      // 2. Services Grid
      await send('Runtime.evaluate', { expression: `
        const s = document.querySelectorAll('section')[3];
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      ` });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-04-services.png`, Buffer.from(shot.data, 'base64'));

      // 3. Featured Work
      await send('Runtime.evaluate', { expression: `
        const s = document.querySelectorAll('section')[4];
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      ` });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-05-work.png`, Buffer.from(shot.data, 'base64'));

      // 4. Process
      await send('Runtime.evaluate', { expression: `
        const s = document.querySelectorAll('section')[6];
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      ` });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-07-process.png`, Buffer.from(shot.data, 'base64'));

      // 5. Team
      await send('Runtime.evaluate', { expression: `
        const s = document.querySelectorAll('section')[9];
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      ` });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-10-team.png`, Buffer.from(shot.data, 'base64'));

      // 6. CTA Band
      await send('Runtime.evaluate', { expression: `
        const s = document.querySelectorAll('section')[11];
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'center' });
      ` });
      await new Promise(r => setTimeout(r, 800));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`screenshots/home/${vp.name}-12-ctaband.png`, Buffer.from(shot.data, 'base64'));
    }

    console.log('All responsive screenshots saved cleanly!');
    ws.close();
  } finally {
    edge.kill();
  }
}

captureSections().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
