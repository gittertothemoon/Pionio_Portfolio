// Capture clean viewport-only screenshots from live project sites for mockup
// composition. Each capture targets the exact aspect ratio of its target
// device frame, so the Pillow generator can drop them in without distortion.
//
// Usage: node scripts/mockups/screenshots.mjs

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'public', 'mockups', 'src');
mkdirSync(OUT_DIR, { recursive: true });

// Each entry has multiple URL fallbacks: the user-provided live URL first,
// then the URLs we already know respond from the projects.ts config.
const targets = [
    {
        name: 'where2beach',
        urls: ['https://where2beach.com', 'https://www.where2beach.com'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        wait: 5000,
    },
    {
        // The user's portfolio project, not the unrelated flowpilates.it studio.
        name: 'flow',
        urls: ['https://flow-pilates-studio-bo.vercel.app'],
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        wait: 4500,
    },
    {
        name: 'smoky',
        urls: ['https://smoky-candle.vercel.app'],
        viewport: { width: 820, height: 1180 },
        deviceScaleFactor: 2,
        wait: 4000,
    },
    {
        name: 'antonela',
        urls: ['https://sito-arte.vercel.app'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        wait: 4000,
    },
];

async function captureOne(browser, t) {
    const context = await browser.newContext({
        viewport: t.viewport,
        deviceScaleFactor: t.deviceScaleFactor,
        // Some mobile-only sites rely on a touch-capable UA.
        hasTouch: t.viewport.width <= 500,
        isMobile: t.viewport.width <= 500,
        userAgent: t.viewport.width <= 500
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            : undefined,
        // Make the screenshot render exactly like a real visit — no playwright UA flag.
    });

    const page = await context.newPage();

    // Hide scrollbars across the board, just in case.
    await page.addInitScript(() => {
        const css = '::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}';
        const s = document.createElement('style');
        s.textContent = css;
        document.head ? document.head.appendChild(s) : document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s));
    });

    let lastErr;
    for (const url of t.urls) {
        try {
            console.log(`  → ${t.name}: ${url}`);
            await page.goto(url, { waitUntil: 'load', timeout: 45000 });
            // Best-effort: wait for network idle, but don't fail if a site keeps
            // long-lived connections open (analytics, websockets).
            await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});

            // Try common cookie/consent banner accept buttons. Click one if found.
            const consentSelectors = [
                'button:has-text("Accetta tutti")',
                'button:has-text("Accetta tutto")',
                'button:has-text("Accept all")',
                'button:has-text("Accetta")',
                'button:has-text("Accept")',
                'button:has-text("Ho capito")',
                'button:has-text("OK")',
                '.iubenda-cs-accept-btn',
                '#onetrust-accept-btn-handler',
                '[aria-label="Accept all"]',
                '[aria-label*="ccetta"]',
            ];
            for (const sel of consentSelectors) {
                try {
                    const btn = await page.$(sel);
                    if (btn) {
                        await btn.click({ timeout: 1500 }).catch(() => {});
                        await page.waitForTimeout(600);
                        break;
                    }
                } catch { /* keep trying */ }
            }

            // Hard-hide any leftover consent / chat overlays as a fallback.
            await page.addStyleTag({
                content: `
                    [class*="iubenda"], [id*="iubenda"],
                    [class*="onetrust"], [id*="onetrust"],
                    [class*="cookie"], [id*="cookie"],
                    [class*="consent"], [id*="consent"],
                    [class*="cmp-"], [id*="cmp-"],
                    [class*="intercom"], [class*="hs-chat"],
                    iframe[src*="iubenda"]
                    { display: none !important; visibility: hidden !important; }
                `,
            }).catch(() => {});

            await page.waitForTimeout(500);
            // Hard wait for splash / preloader / fonts.
            await page.waitForTimeout(t.wait);
            // Force scroll to top to avoid hash-anchored landings.
            await page.evaluate(() => window.scrollTo(0, 0));
            const out = path.join(OUT_DIR, `${t.name}.png`);
            await page.screenshot({ path: out, fullPage: false, animations: 'disabled' });
            console.log(`     saved ${path.relative(ROOT, out)} (${t.viewport.width}x${t.viewport.height} @${t.deviceScaleFactor}x)`);
            await context.close();
            return;
        } catch (err) {
            lastErr = err;
            console.warn(`     failed: ${err.message?.split('\n')[0]}`);
        }
    }
    await context.close();
    throw lastErr ?? new Error(`Could not capture ${t.name}`);
}

(async () => {
    const browser = await chromium.launch();
    try {
        for (const t of targets) {
            await captureOne(browser, t);
        }
    } finally {
        await browser.close();
    }
    console.log('Done.');
})();
