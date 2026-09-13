import type { Locale } from './i18n';

// Starting prices in euro. The Italian pages show the `it` list; the English pages, written for clients
// outside Italy, show the `en` one. Figures from the market research of 13/09/2026
// (MERCATO-prezzi-2026-09-13.md, chapter 6). Change a number here and the home, the FAQ, the service
// pages, the structured data and llms.txt all follow.
export const PRICES = {
    site: { it: 2500, en: 4000 },
    largeSite: { it: 5000, en: 7500 },
    shopify: { it: 4000, en: 5000 },
    shopScratch: { it: 12000, en: 18000 },
    redesign: { it: 3000, en: 5000 },
    tool: { it: 10000, en: 15000 },
    seoAudit: { it: 800, en: 1200 },
} as const;

export type PriceKey = keyof typeof PRICES;

export const priceOf = (key: PriceKey, locale: Locale): number => PRICES[key][locale];

/** "2.500 €" in Italian, "€4,000" in English. Grouped by hand: it-IT leaves four-digit numbers ungrouped. */
export function eur(amount: number, locale: Locale): string {
    const grouped = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'it' ? '.' : ',');
    return locale === 'it' ? `${grouped} €` : `€${grouped}`;
}

/** Fills {site}, {shopScratch}… in a sentence with that price, formatted for the locale. */
export function withPrices(text: string, locale: Locale): string {
    return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
        key in PRICES ? eur(PRICES[key as PriceKey][locale], locale) : whole,
    );
}
