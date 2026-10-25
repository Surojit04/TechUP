import { spawn } from 'child_process';
import fs from 'fs';

async function captureMore() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9777',
    '--window-size=1280,1000',
    'http://localhost:3005/dev/components?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9777/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('/dev/components'));
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

    // Scroll to Marquee & Light Accordion
    await send('Runtime.evaluate', { expression: `
      const el = document.evaluate("//h3[contains(text(),'03. Infinite Marquee')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    ` });
    await new Promise(r => setTimeout(r, 1000));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-marquee.png', Buffer.from(shot.data, 'base64'));

    // Scroll to CTABand
    await send('Runtime.evaluate', { expression: `
      const cta = document.querySelector('section.bg-brand-gradient');
      if (cta) cta.scrollIntoView({ behavior: 'instant', block: 'center' });
    ` });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/dev-components-ctaband.png', Buffer.from(shot.data, 'base64'));

    ws.close();
  } finally {
    edge.kill();
  }
}

captureMore().then(() => process.exit(0)).catch(console.error);
