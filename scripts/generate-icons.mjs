// Every icon the site hands out, from one source: brand/p-mark.svg.
//
// What the old set got wrong: it rasterised the full lockup — wordmark plus the "WEB DESIGN STUDIO"
// line — into 16 and 32 pixels, where it became a grey smudge, and into the home-screen icon, where
// the second line was unreadable. One letter, drawn as facets, survives both.
//
// Two paddings, because the two crops are different: iOS rounds the corners of apple-touch-icon
// (the mark can breathe at 74%), Android may cut a circle out of a maskable icon, so there the mark
// stays inside the middle 60% and nothing important reaches the corners.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'brand/p-mark.svg');
const outDir = resolve(root, 'public');

const PLATE = { r: 9, g: 9, b: 11, alpha: 1 }; // #09090b, the background of the site

const mark = await readFile(source);

async function icon(size, coverage) {
    const inner = Math.round(size * coverage);
    const offset = Math.round((size - inner) / 2);
    // density high enough that the facets stay clean even for the 512 plates
    const scaled = await sharp(mark, { density: 1200 })
        .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: PLATE } })
        .composite([{ input: scaled, top: offset, left: offset }])
        .png({ compressionLevel: 9 })
        .toBuffer();
}

const targets = [
    { name: 'favicon-16x16.png', size: 16, coverage: 0.92 },
    { name: 'favicon-32x32.png', size: 32, coverage: 0.88 },
    { name: 'favicon-48x48.png', size: 48, coverage: 0.86 },
    { name: 'apple-touch-icon.png', size: 180, coverage: 0.74 },
    { name: 'icon-192.png', size: 192, coverage: 0.74 },
    { name: 'icon-512.png', size: 512, coverage: 0.74 },
    { name: 'icon-maskable-512.png', size: 512, coverage: 0.6 },
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

const ico = await pngToIco([await icon(16, 0.92), await icon(32, 0.88), await icon(48, 0.86)]);
await writeFile(resolve(outDir, 'favicon.ico'), ico);
console.log('wrote favicon.ico (16 + 32 + 48)');
