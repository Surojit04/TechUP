import { spawn } from 'child_process';
import fs from 'fs';

async function captureAll() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--window-size=1280,1000',
    'http://localhost:3005?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9555/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3005'));
    if (!pageTab) {
      console.error('Page tab not found');
      return;
    }

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

    // 1. Desktop Header (1280px)
    console.log('1. Capturing Desktop Header (1280x800)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise(r => setTimeout(r, 600));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/desktop-header.png', Buffer.from(shot.data, 'base64'));

    // 2. Desktop Footer (1280px)
    console.log('2. Capturing Desktop Footer (1280x800)...');
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, document.body.scrollHeight);` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/desktop-footer.png', Buffer.from(shot.data, 'base64'));

    // 3. Mobile Header (360px)
    console.log('3. Capturing Mobile Header (360x780)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
      fitWindow: false
    });
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise(r => setTimeout(r, 800));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/mobile-header.png', Buffer.from(shot.data, 'base64'));

    // 4. Mobile Footer (360px)
    console.log('4. Capturing Mobile Footer (360x780)...');
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, document.body.scrollHeight);` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/mobile-footer.png', Buffer.from(shot.data, 'base64'));

    // 5. Mobile Menu Open
    console.log('5. Capturing Mobile Open Menu (360x780)...');
    await send('Runtime.evaluate', { expression: `
      window.scrollTo(0, 0);
      const btn = document.querySelector('button[aria-label="Open navigation menu"]');
      if (btn) btn.click();
    ` });
    await new Promise(r => setTimeout(r, 800));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/mobile-menu-open.png', Buffer.from(shot.data, 'base64'));

    console.log('All captures complete!');
    ws.close();
  } finally {
    edge.kill();
  }
}

captureAll().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
