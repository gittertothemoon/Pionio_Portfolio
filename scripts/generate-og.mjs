import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'public/og-image.png');

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g1" cx="18%" cy="28%" r="65%">
      <stop offset="0%" stop-color="#1a3a2e" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#0a1410" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="88%" cy="82%" r="55%">
      <stop offset="0%" stop-color="#22513f" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#a1a1aa"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#09090b"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <!-- top bar: status pill -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" rx="22" ry="22" width="320" height="44" fill="#0f1f17" stroke="#34d39955" stroke-width="1"/>
    <circle cx="24" cy="22" r="6" fill="#34d399"/>
    <text x="42" y="29" fill="#86efac" font-family="ui-monospace, 'Geist Mono', Menlo, monospace" font-size="16" font-weight="500" letter-spacing="2">AVAILABLE FOR FREELANCE</text>
  </g>

  <!-- top right: domain -->
  <text x="${W - 80}" y="108" text-anchor="end" fill="#a1a1aa" font-family="ui-monospace, 'Geist Mono', Menlo, monospace" font-size="20" letter-spacing="3">PIONIO.IT</text>

  <!-- main wordmark -->
  <text x="80" y="380" fill="url(#grad)" font-family="'Geist', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="200" font-weight="700" letter-spacing="-8">PIONIO</text>

  <!-- subtitle -->
  <text x="84" y="445" fill="#d4d4d8" font-family="'Geist', Inter, system-ui, sans-serif" font-size="38" font-weight="500" letter-spacing="-1">Senior UI/UX Engineer &#x2022; Frontend Architect</text>

  <!-- description -->
  <text x="84" y="500" fill="#71717a" font-family="'Geist', Inter, system-ui, sans-serif" font-size="26" font-weight="400">Design senza compromessi. Architettura frontend robusta.</text>

  <!-- bottom rule -->
  <line x1="80" y1="${H - 60}" x2="${W - 80}" y2="${H - 60}" stroke="#27272a" stroke-width="1"/>
  <text x="80" y="${H - 28}" fill="#52525b" font-family="ui-monospace, 'Geist Mono', Menlo, monospace" font-size="16" letter-spacing="3">REACT &#x2022; TYPESCRIPT &#x2022; TAILWIND &#x2022; FRAMER MOTION</text>
  <text x="${W - 80}" y="${H - 28}" text-anchor="end" fill="#52525b" font-family="ui-monospace, 'Geist Mono', Menlo, monospace" font-size="16" letter-spacing="3">PORTFOLIO &#x2014; 2026</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(out);

console.log(`wrote ${out} (${W}x${H})`);
