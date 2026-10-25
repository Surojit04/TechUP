import { spawn } from 'child_process';
import fs from 'fs';

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://localhost:9222/json');
    const tabs = await listRes.json();
    const targetWs = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(targetWs);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');

    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots', { recursive: true });
    }

    // 1. Desktop Header
    console.log('Capturing Desktop Header (1280x800)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Page.navigate', { url: 'http://localhost:3005?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/desktop-header.png', Buffer.from(shot.data, 'base64'));

    // 2. Desktop Footer
    console.log('Capturing Desktop Footer...');
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, document.body.scrollHeight);`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/desktop-footer.png', Buffer.from(shot.data, 'base64'));

    // 3. Mobile Header
    console.log('Capturing Mobile Header (360x780)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Page.navigate', { url: 'http://localhost:3005?no-loader' });
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/mobile-header.png', Buffer.from(shot.data, 'base64'));

    // 4. Mobile Footer
    console.log('Capturing Mobile Footer (360x780)...');
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, document.body.scrollHeight);`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/mobile-footer.png', Buffer.from(shot.data, 'base64'));

    console.log('All screenshots captured successfully!');
    ws.close();
  } finally {
    edgeProc.kill();
  }
}

capture().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
