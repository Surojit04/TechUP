import { spawn } from 'child_process';
import fs from 'fs';

const viewports = [
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 1 }
];

async function runWorkTests() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--window-size=1920,1080',
    'http://localhost:3005/work?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9444/json');
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

    if (!fs.existsSync('screenshots/work')) {
      fs.mkdirSync('screenshots/work', { recursive: true });
    }

    for (const vp of viewports) {
      console.log(`\n--- Testing WORK on ${vp.name} ---`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      await send('Page.navigate', { url: 'http://localhost:3005/work?no-loader' });
      await new Promise(r => setTimeout(r, 2000));

      // Overflow check
      const { result: overflowCheck } = await send('Runtime.evaluate', {
        expression: `({
          docW: document.documentElement.scrollWidth,
          winW: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          title: document.title,
          cardsCount: document.querySelectorAll('[data-work-card-id]').length
        })`,
        returnByValue: true
      });

      console.log(`[work] ${vp.name} status:`, overflowCheck.value);

      // Hero screenshot
      const heroShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(
        `screenshots/work/work-${vp.name}-hero.png`,
        Buffer.from(heroShot.data, 'base64')
      );

      // Full page screenshot
      const { result: scrollH } = await send('Runtime.evaluate', {
        expression: 'document.body.scrollHeight'
      });
      console.log(`[work] ${vp.name} scrollHeight:`, scrollH.value);

      const fullShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });
      fs.writeFileSync(
        `screenshots/work/work-${vp.name}-full.png`,
        Buffer.from(fullShot.data, 'base64')
      );
    }

    // Modal Test on 1280px
    console.log('\n--- Testing Project Modal on Desktop ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3005/work?no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    // Click the first card
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-work-card-id]').click()`
    });
    await new Promise(r => setTimeout(r, 600));

    const { result: modalCheck } = await send('Runtime.evaluate', {
      expression: `({
        hasModal: !!document.querySelector('[role="dialog"]'),
        modalTitle: document.getElementById('project-modal-title')?.textContent,
        hasCtaButton: !!document.querySelector('button, a:has-text("Want something like this? Get a Quote")')
      })`,
      returnByValue: true
    });
    console.log('[work] Modal Check:', modalCheck.value);

    // Capture modal screenshot
    const modalShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      'screenshots/work/work-modal-open.png',
      Buffer.from(modalShot.data, 'base64')
    );
    console.log('Saved screenshots/work/work-modal-open.png');

    // Test Escape to close
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', windowsVirtualKeyCode: 27 });
    await new Promise(r => setTimeout(r, 400));

    const { result: closedCheck } = await send('Runtime.evaluate', {
      expression: `!document.querySelector('[role="dialog"]')`,
      returnByValue: true
    });
    console.log('[work] Modal closed via Escape:', closedCheck.value);

    // Results strip check (must be hidden)
    const { result: resultsStripCheck } = await send('Runtime.evaluate', {
      expression: `document.body.textContent.includes('Videos Delivered')`,
      returnByValue: true
    });
    console.log('[work] Results strip hidden (should be false):', resultsStripCheck.value);

    ws.close();
  } finally {
    edge.kill();
  }
}

runWorkTests().then(() => {
  console.log('Work tests completed successfully!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
