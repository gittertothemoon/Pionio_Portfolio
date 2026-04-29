import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'public/logo.svg');
const outDir = resolve(root, 'public');

const background = { r: 9, g: 9, b: 11, alpha: 1 };

async function rasterize(size, padding = 0.12) {
  const inner = Math.round(size * (1 - padding * 2));
  const offset = Math.round((size - inner) / 2);
  const logo = await sharp(await readFile(source), { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toBuffer();
}

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of targets) {
  const buf = await rasterize(size);
  await writeFile(resolve(outDir, name), buf);
  console.log(`wrote ${name} (${size}x${size})`);
}

const ico32 = await rasterize(32);
const icoBuf = await pngToIco([ico32]);
await writeFile(resolve(outDir, 'favicon.ico'), icoBuf);
console.log('wrote favicon.ico (32x32)');
