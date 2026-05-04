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

            // Hard-hide any leftover consent / chat / floating overlays. Cast a
            // wide net — chat widgets, banners and "powered by" footers love to
            // float over the bottom of the viewport.
            await page.addStyleTag({
                content: `
                    [class*="iubenda"], [id*="iubenda"],
                    [class*="onetrust"], [id*="onetrust"],
                    [class*="cookie"], [id*="cookie"],
                    [class*="consent"], [id*="consent"],
                    [class*="cmp-"], [id*="cmp-"],
                    [class*="intercom"], [id*="intercom"],
                    [class*="crisp"], [id*="crisp"],
                    [class*="hs-chat"], [id*="hubspot-messages"],
                    [class*="tidio"], [id*="tidio"],
                    [class*="drift"], [id*="drift"],
                    [class*="zopim"], [class*="zendesk"],
                    [class*="freshchat"], [id*="freshchat"],
                    [class*="livechat"], [id*="livechat"],
                    [class*="Toaster"], [class*="toast"],
                    [class*="badge"][class*="vercel"], [data-nextjs-toast],
                    [class*="banner"][class*="bottom"],
                    [aria-label*="chat"], [aria-label*="Chat"],
                    iframe[src*="iubenda"], iframe[src*="onetrust"],
                    iframe[src*="usercentrics"], iframe[src*="cookie"],
                    iframe[title*="hat"], iframe[title*="essag"],
                    iframe[id*="webpack-dev-server"], iframe[title*="vercel"]
                    { display: none !important; visibility: hidden !important; pointer-events: none !important; }
                `,
            }).catch(() => {});

            // Strip any element fixed/sticky to the bottom of the viewport that
            // sneaks past the class/id allowlist (chat bubbles, "Built with…"
            // footers, language pickers).
            await page.evaluate(() => {
                const vh = window.innerHeight;
                document.querySelectorAll('body *').forEach((el) => {
                    const cs = window.getComputedStyle(el);
                    if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
                    const r = el.getBoundingClientRect();
                    // Hide things anchored near the bottom (last 30% of viewport)
                    // unless they span the full width — those are likely real
                    // fixed headers/footers and we leave them alone.
                    if (r.bottom > vh * 0.7 && r.width < window.innerWidth * 0.85) {
                        el.style.setProperty('display', 'none', 'important');
                    }
                });
            }).catch(() => {});

            // Force scroll back to top after any DOM mutation.
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(800);
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
