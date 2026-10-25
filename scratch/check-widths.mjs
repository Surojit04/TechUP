import http from 'http';

// Let's create a temporary test route or use Edge DevTools
import { spawn } from 'child_process';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9444',
  '--window-size=360,780',
  'http://localhost:3005?no-loader'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://localhost:9444/json');
    const tabs = await listRes.json();
    console.log('Tabs available:', tabs.length);
    // Find the page tab (not the background page)
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3005'));
    console.log('Page tab:', pageTab?.url);

    if (!pageTab) {
      console.log('All tabs:', tabs);
      edge.kill();
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
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
      fitWindow: false
    });

    const res = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        innerWidth: window.innerWidth,
        outerWidth: window.outerWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyClientWidth: document.body.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        headerWidth: document.querySelector('header')?.getBoundingClientRect(),
        buttonPos: document.querySelector('button[aria-label="Open navigation menu"]')?.getBoundingClientRect()
      })`,
      returnByValue: true
    });

    console.log('PAGE DIMS WITH EMULATION:', JSON.parse(res.result.value));

    // Capture mobile header screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const fs = await import('fs');
    fs.writeFileSync('screenshots/mobile-header.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshots/mobile-header.png');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}, 3000);
