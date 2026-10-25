import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\suroj\\.gemini\\antigravity\\brain\\0efb76c7-cd7f-4f8f-8167-5af9db1bbca6';
const viewports = [
  { name: '1280px', width: 1280, height: 900, mobile: false, dsf: 1 },
  { name: '360px', width: 360, height: 780, mobile: true, dsf: 1 }
];

async function runContactTests() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9666',
    '--window-size=1920,1080',
    'http://localhost:3005/contact?no-loader'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://localhost:9666/json');
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

    if (!fs.existsSync('screenshots/contact')) {
      fs.mkdirSync('screenshots/contact', { recursive: true });
    }

    console.log('=== PART 1: TESTING CONTACT VIEWPORTS & OVERFLOW ===');
    for (const vp of viewports) {
      console.log(`\n--- Testing /contact on ${vp.name} ---`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dsf,
        mobile: vp.mobile,
        fitWindow: false,
      });

      await send('Page.navigate', { url: 'http://localhost:3005/contact?no-loader' });
      await new Promise(r => setTimeout(r, 2000));

      const { result: pageEval } = await send('Runtime.evaluate', {
        expression: `(() => {
          const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
          const schemas = scripts.map(s => {
            try { return JSON.parse(s.textContent); } catch(e) { return null; }
          }).filter(Boolean);

          const faqSchema = schemas.find(s => s['@type'] === 'FAQPage');
          const breadcrumbSchema = schemas.find(s => s['@type'] === 'BreadcrumbList');

          // Strict budget check
          const hasBudgetField = document.body.textContent.toLowerCase().includes('budget');

          // Three-way cards
          const hasWhatsAppCard = document.body.textContent.includes('Chat on WhatsApp');
          const hasQuoteCard = document.body.textContent.includes('Get a Quote');
          const hasBookingCard = document.body.textContent.includes('Book a Call');

          // Check if CTA band is present (spec says NO CTA band on /contact)
          const hasCTABand = document.body.textContent.includes('READY TO LEVEL UP YOUR BRAND?');

          return {
            docW: document.documentElement.scrollWidth,
            winW: window.innerWidth,
            hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
            title: document.title,
            hasFaqSchema: !!faqSchema,
            faqCount: faqSchema?.mainEntity?.length,
            hasBreadcrumbSchema: !!breadcrumbSchema,
            hasBudgetField,
            hasWhatsAppCard,
            hasQuoteCard,
            hasBookingCard,
            hasCTABand
          };
        })()`,
        returnByValue: true
      });

      console.log(`[contact] ${vp.name} evaluation:`, pageEval.value);

      // Hero screenshot
      const heroShot = await send('Page.captureScreenshot', { format: 'png' });
      const heroPath = `screenshots/contact/contact-${vp.name}-hero.png`;
      fs.writeFileSync(heroPath, Buffer.from(heroShot.data, 'base64'));
      fs.copyFileSync(heroPath, path.join(ARTIFACT_DIR, `contact-${vp.name}-hero.png`));

      // Full page screenshot
      const fullShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });
      const fullPath = `screenshots/contact/contact-${vp.name}-full.png`;
      fs.writeFileSync(fullPath, Buffer.from(fullShot.data, 'base64'));
      fs.copyFileSync(fullPath, path.join(ARTIFACT_DIR, `contact-${vp.name}-full.png`));
    }


    console.log('\n=== PART 2: TESTING SERVICE PRE-SELECTION (?service=video) ===');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
      fitWindow: false,
    });
    await send('Page.navigate', { url: 'http://localhost:3005/contact?service=video&no-loader' });
    await new Promise(r => setTimeout(r, 2000));

    const { result: preselectCheck } = await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('#quote-form button'));
        const contentVideoBtn = buttons.find(b => b.textContent && b.textContent.includes('Content & Video'));
        const isSelected = contentVideoBtn?.className.includes('bg-brand-orange') || false;
        return {
          foundBtn: !!contentVideoBtn,
          isSelected,
          btnText: contentVideoBtn?.textContent?.trim()
        };
      })()`,
      returnByValue: true
    });
    console.log('[pre-select check]:', preselectCheck.value);


    console.log('\n=== PART 3: TESTING CAL.COM BOOKING MODAL ===');
    const { result: openModalResult } = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('div[role="button"]'));
        const bookingCard = cards.find(c => c.textContent && c.textContent.includes('Book a Call'));
        if (bookingCard) {
          bookingCard.click();
          return { clicked: true };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Book a call clicked:', openModalResult.value);
    await new Promise(r => setTimeout(r, 1000));

    const modalShot = await send('Page.captureScreenshot', { format: 'png' });
    const modalPath = 'screenshots/contact/contact-modal-open.png';
    fs.writeFileSync(modalPath, Buffer.from(modalShot.data, 'base64'));
    fs.copyFileSync(modalPath, path.join(ARTIFACT_DIR, 'contact-modal-open.png'));

    // Close modal via Escape
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', windowsVirtualKeyCode: 27 });
    await new Promise(r => setTimeout(r, 800));


    console.log('\n=== PART 4: TESTING FORM VALIDATION & SUBMISSION ===');
    // 1. Submit empty form to trigger validation errors
    await send('Runtime.evaluate', {
      expression: `(() => {
        const submitBtn = document.querySelector('#quote-form button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const { result: validationCheck } = await send('Runtime.evaluate', {
      expression: `(() => {
        const errorPs = Array.from(document.querySelectorAll('#quote-form p.text-red-600'));
        return {
          errorCount: errorPs.length,
          messages: errorPs.map(p => p.textContent.trim())
        };
      })()`,
      returnByValue: true
    });
    console.log('[validation errors triggered]:', validationCheck.value);

    // 2. Fill valid form fields
    await send('Runtime.evaluate', {
      expression: `(() => {
        function setInputValue(id, val) {
          const el = document.getElementById(id);
          if (!el) return;
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        function setTextareaValue(id, val) {
          const el = document.getElementById(id);
          if (!el) return;
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        setInputValue('contact-name', 'Rajesh Sharma');
        setInputValue('contact-email', 'rajesh.sharma@example.com');
        setInputValue('contact-phone', '9831714104');
        setInputValue('contact-company', 'Sharma Media');
        setTextareaValue('contact-details', 'Looking for high-impact vertical reel editing for a 3-month personal brand campaign.');

        // Consent checkbox
        const consentBox = document.getElementById('contact-consent');
        if (consentBox && !consentBox.checked) {
          consentBox.click();
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Submit valid form
    console.log('Submitting valid form...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const submitBtn = document.querySelector('#quote-form button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 2500));

    // Evaluate success state
    const { result: successStateCheck } = await send('Runtime.evaluate', {
      expression: `(() => {
        const formEl = document.getElementById('quote-form');
        const text = formEl ? formEl.textContent : '';
        const hasThankYou = text.includes('Thank You!') || text.includes('Enquiry Received');
        const hasWhatsAppNow = text.includes('Chat on WhatsApp Now');
        return {
          hasThankYou,
          hasWhatsAppNow,
          snippet: text.slice(0, 180)
        };
      })()`,
      returnByValue: true
    });
    console.log('[success state check]:', successStateCheck.value);

    // Scroll quote-form into center view before capturing success screenshot
    await send('Runtime.evaluate', {
      expression: `document.getElementById('quote-form')?.scrollIntoView({ behavior: 'instant', block: 'center' });`
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture success state screenshot
    const successShot = await send('Page.captureScreenshot', { format: 'png' });
    const successPath = 'screenshots/contact/contact-success-state.png';
    fs.writeFileSync(successPath, Buffer.from(successShot.data, 'base64'));
    fs.copyFileSync(successPath, path.join(ARTIFACT_DIR, 'contact-success-state.png'));

    console.log('\n--- ALL CONTACT TESTS COMPLETED SUCCESSFULLY ---');
    ws.close();
    edge.kill();
  } catch (err) {
    console.error('Error during contact testing:', err);
    edge.kill();
    process.exit(1);
  }
}

runContactTests();
