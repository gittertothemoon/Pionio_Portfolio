// Renders the social card from scripts/og/pionio-og.html.
// Chromium instead of sharp's SVG rasterizer: the card uses the real Geist woff2 and the
// faceted mark, and librsvg loads neither properly. Rendered at 2x and scaled down, so the type keeps its
// edges in the small previews WhatsApp and LinkedIn actually show.
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const page_html = resolve(__dirname, 'social/pionio-og.html');
const out = resolve(root, 'public/og-cover.png');

const W = 1200;
const H = 630;

const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(page_html).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png' });
await browser.close();

await sharp(shot).resize(W, H, { fit: 'fill' }).png({ compressionLevel: 9 }).toFile(out);
console.log(`wrote ${out} (${W}x${H})`);
