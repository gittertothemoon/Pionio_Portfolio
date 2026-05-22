const { chromium } = require('playwright');
const path = require('path');

const HTML_PATH = path.resolve(__dirname, 'slides.html');
const OUT_DIR = path.resolve(__dirname, '..', 'out');

(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('file://' + HTML_PATH, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: path.join(OUT_DIR, 'brief.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1350 },
    omitBackground: false,
  });
  console.log('OK brief.png');
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
