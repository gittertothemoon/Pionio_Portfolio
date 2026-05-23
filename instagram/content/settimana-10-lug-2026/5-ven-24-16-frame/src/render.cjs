const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ASSET = path.resolve(__dirname, '..', 'assets', 'frame-raw.png');
if (!fs.existsSync(ASSET)) { console.error('Missing asset: ' + ASSET); process.exit(1); }
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'slides.html'), { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(__dirname, '..', 'out', 'frame.png'), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('OK frame.png');
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
