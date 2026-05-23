const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'slides.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const ids = ['s1','s2','s3','s4','s5','s6','s7'];
  for (let i = 0; i < ids.length; i++) {
    await page.evaluate((id) => {
      document.querySelectorAll('.slide').forEach((el) => { el.classList.toggle('is-hidden', el.id !== id); });
      window.scrollTo(0, 0);
    }, ids[i]);
    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({ path: path.join(__dirname, '..', 'out', filename), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    console.log('OK', filename);
  }
  await browser.close();
})();
