import { spawn } from 'child_process';

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=360,780',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true
    });

    await send('Page.navigate', { url: 'http://localhost:3005?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > 360 + 2) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              right: rect.right,
              width: rect.width
            });
          }
        });
        const menuBtn = document.querySelector('button[aria-label="Open navigation menu"]');
        const menuRect = menuBtn ? menuBtn.getBoundingClientRect() : null;
        const header = document.querySelector('header');
        const headerRect = header ? header.getBoundingClientRect() : null;

        return { docWidth, bodyWidth, winWidth, overflowing: overflowing.slice(0, 10), menuRect, headerRect };
      })()`,
      returnByValue: true
    });

    console.log('Result:', JSON.stringify(evalResult.result.value, null, 2));

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const fs = await import('fs');
    fs.writeFileSync('screenshots/mobile-header-cdp.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshots/mobile-header-cdp.png');

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
  }
}

run().catch(console.error);
