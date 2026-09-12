// Every icon the site hands out, from one source: brand/p-mark-3d.png — the real faceted mark, the
// same one that signs the Instagram posts. A flat vector redraw was tried first and Ivan turned it
// down (12/09): the mark has depth, and a flat green P is not it.
//
// What the older set got wrong: it rasterised the full lockup — wordmark plus the "WEB DESIGN STUDIO"
// line — into 16 and 32 pixels, where it became a grey smudge, and into the home-screen icon, where
// the second line was unreadable. One letter survives both; a lockup never does.
//
// The mark is trimmed of its transparent margin first, so the percentages below mean what they say:
// without the trim the viewBox padding stacks on top of the padding here and the letter lands at 49%
// of an icon that should read as a solid mark on a home screen.
//
// Two paddings, because the two crops differ: iOS only rounds the corners of apple-touch-icon, so the
// mark can fill 68% of the height; Android may cut a circle out of the maskable one, so there it stays
// at 62% — a letter that tall and this narrow keeps its diagonal inside the 80% safe circle.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'brand/p-mark-3d.png');
const silhouetteSource = resolve(root, 'brand/p-mark.svg'); // flat outline, only for Safari's pinned tab
const outDir = resolve(root, 'public');

const PLATE = { r: 9, g: 9, b: 11, alpha: 1 }; // #09090b, the background of the site

const mark = await readFile(source);

async function icon(size, coverage) {
    const inner = Math.round(size * coverage);
    const offset = Math.round((size - inner) / 2);
    const scaled = await sharp(mark)
        .trim()
        .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: PLATE } })
        .composite([{ input: scaled, top: offset, left: offset }])
        .png({ compressionLevel: 9 })
        .toBuffer();
}

const targets = [
    { name: 'favicon-16x16.png', size: 16, coverage: 0.86 },
    { name: 'favicon-32x32.png', size: 32, coverage: 0.84 },
    { name: 'favicon-48x48.png', size: 48, coverage: 0.82 },
    { name: 'apple-touch-icon.png', size: 180, coverage: 0.68 },
    { name: 'icon-192.png', size: 192, coverage: 0.68 },
    { name: 'icon-512.png', size: 512, coverage: 0.68 },
    { name: 'icon-maskable-512.png', size: 512, coverage: 0.62 },
];

for (const { name, size, coverage } of targets) {
    await writeFile(resolve(outDir, name), await icon(size, coverage));
    console.log(`wrote ${name} (${size}px, mark at ${Math.round(coverage * 100)}%)`);
}

// Safari's pinned tab wants one flat silhouette it can recolour itself.
const silhouette = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <path fill="black" fill-rule="evenodd" d="M 146 86 L 302 86 L 368 136 L 368 228 L 302 278 L 222 278 L 222 426 L 146 426 Z M 222 140 L 292 140 L 322 172 L 322 192 L 292 224 L 222 224 Z" />
</svg>
`;
await writeFile(resolve(outDir, 'mask-icon.svg'), silhouette);
console.log('wrote mask-icon.svg (flat silhouette for Safari)');

const ico = await pngToIco([await icon(16, 0.86), await icon(32, 0.84), await icon(48, 0.82)]);
await writeFile(resolve(outDir, 'favicon.ico'), ico);
console.log('wrote favicon.ico (16 + 32 + 48)');
