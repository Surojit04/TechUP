import { spawn } from 'child_process';
import fs from 'fs';

const viewports = [
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 2 },
  { name: '768px', width: 768, height: 1024, mobile: false, dsf: 1 },
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '1920px', width: 1920, height: 1080, mobile: false, dsf: 1 },
];

async function captureFullPages() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9111',
    '--window-size=1920,1080',
    'http://localhost:3005/?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9111/json');
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

    if (!fs.existsSync('screenshots/responsive')) {
      fs.mkdirSync('screenshots/responsive', { recursive: true });
    }

    for (const vp of viewports) {
      console.log(`Setting device metrics for ${vp.name}...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      // Scroll to trigger any scroll reveals
      await send('Runtime.evaluate', { expression: `
        window.scrollTo(0, document.body.scrollHeight / 2);
      ` });
      await new Promise(r => setTimeout(r, 600));

      await send('Runtime.evaluate', { expression: `
        window.scrollTo(0, 0);
      ` });
      await new Promise(r => setTimeout(r, 600));

      // Capture full page
      console.log(`Capturing full page for ${vp.name}...`);
      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      fs.writeFileSync(`screenshots/responsive/home-${vp.name}-full.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshots/responsive/home-${vp.name}-full.png`);

      // Also capture Hero fold
      const heroShot = await send('Page.captureScreenshot', {
        format: 'png',
      });
      fs.writeFileSync(`screenshots/responsive/home-${vp.name}-hero.png`, Buffer.from(heroShot.data, 'base64'));
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

captureFullPages().then(() => process.exit(0)).catch(console.error);
