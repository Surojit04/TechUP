import { spawn } from 'child_process';
import fs from 'fs';

async function captureDev() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9666',
    '--window-size=1280,1200',
    'http://localhost:3005/dev/components?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9666/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('/dev/components'));
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. Dev page Dark section (top)
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise(r => setTimeout(r, 1000));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-dark-1.png', Buffer.from(shot.data, 'base64'));

    // 2. Dev page Dark section (cards & counters)
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 700);` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-dark-2.png', Buffer.from(shot.data, 'base64'));

    // 3. Dev page Light section (divider + cards + marquee)
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 1600);` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-light.png', Buffer.from(shot.data, 'base64'));

    // 4. Dev page CTA band & bottom
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 2600);` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-cta.png', Buffer.from(shot.data, 'base64'));

    console.log('Dev screenshots captured successfully!');
    ws.close();
  } finally {
    edge.kill();
  }
}

captureDev().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
