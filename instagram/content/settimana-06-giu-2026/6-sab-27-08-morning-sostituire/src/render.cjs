const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ASSET = path.resolve(__dirname, '..', 'assets', 'morning-raw.png');
if (!fs.existsSync(ASSET)) {{
  console.warn('⚠️  Manca assets/morning-raw.png — vedi brief-prompt.md');
}}

(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'slides.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, '..', 'out', 'morning.png'), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  console.log('OK morning.png');
  await browser.close();
})();
