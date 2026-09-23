import { FACTS, SITE_URL } from './facts';
import { eur, PRICES, type PriceKey } from './prices';
import { services } from './services';
import { servicesEn } from './services-en';
import { posts } from './blog';
import { postsEn } from './blog-en';
import { projects } from './projects';
import { absoluteUrl, SERVICE_EN_SLUG } from './paths';

// The sitemap and llms.txt, generated at the end of the build (vite.config.ts) from the same data the pages
// use. The hand-written ones had stopped at July and still described a web design studio for Italian SMEs.

const UPDATED = '2026-09-13';
const ABOUT_UPDATED = '2026-09-22';

// If a service's English slug in paths.ts and in services-en.ts ever disagree, the build stops here
// instead of shipping hreflang pairs that point at pages that don't exist.
for (const [it, en] of Object.entries(SERVICE_EN_SLUG)) {
    if (servicesEn[it]?.slug !== en) throw new Error(`English slug mismatch for "${it}": paths.ts says "${en}", services-en.ts says "${servicesEn[it]?.slug}"`);
}

type Entry = { it?: string; en?: string; lastmod: string };

function entries(): Entry[] {
    const latestPost = [...posts].map((p) => p.dateModified).sort().at(-1) ?? UPDATED;
    return [
        { it: '/', en: '/en', lastmod: UPDATED },
        { it: '/servizi', en: '/en/services', lastmod: UPDATED },
        ...services.map((s) => ({
            it: `/servizi/${s.slug}`,
            en: SERVICE_EN_SLUG[s.slug] ? `/en/services/${SERVICE_EN_SLUG[s.slug]}` : undefined,
            lastmod: UPDATED,
        })),
        { it: '/chi-sono', en: '/en/about', lastmod: ABOUT_UPDATED },
        { it: '/contatti', en: '/en/contact', lastmod: UPDATED },
        ...projects.map((p) => ({ it: `/projects/${p.slug}`, en: `/en/projects/${p.slug}`, lastmod: p.aggiornato ?? UPDATED })),
        { it: '/blog', en: '/en/blog', lastmod: [latestPost, ...postsEn.map((p) => p.dateModified)].sort().at(-1) ?? latestPost },
        ...posts.map((p) => ({ it: `/blog/${p.slug}`, lastmod: p.dateModified })),
        ...postsEn.map((p) => ({ en: `/en/blog/${p.slug}`, lastmod: p.dateModified })),
        { it: '/privacy', en: '/en/privacy', lastmod: UPDATED },
    ];
}

export function sitemapXml(): string {
    const urls: string[] = [];
    for (const e of entries()) {
        const pair = e.it && e.en;
        const alternates = pair
            ? [
                  `    <xhtml:link rel="alternate" hreflang="it" href="${absoluteUrl(e.it!)}"/>`,
                  `    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(e.en!)}"/>`,
                  `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(e.en!)}"/>`,
              ]
            : [];
        for (const loc of [e.it, e.en]) {
            if (!loc) continue;
            urls.push(['  <url>', `    <loc>${absoluteUrl(loc)}</loc>`, `    <lastmod>${e.lastmod}</lastmod>`, ...alternates, '  </url>'].join('\n'));
        }
    }
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n');
}

const EN_NAME: Record<PriceKey, string> = {
    site: 'Website',
    largeSite: 'Website with many pages or custom features',
    shopify: 'Shopify store',
    shopScratch: 'Online shop built from scratch',
    redesign: 'Redesign with content migration and redirects',
    tool: 'Custom web tool, first version',
    seoAudit: 'Technical SEO audit',
};

const priceLines = (locale: 'it' | 'en') =>
    (Object.keys(PRICES) as PriceKey[]).map((key) => `- ${EN_NAME[key]}: ${eur(PRICES[key][locale], 'en')}`);

// In English, because agents of every language read it; every Italian and English address is listed.
export function llmsTxt(): string {
    const w = FACTS.weeks;
    const serviceLines = services.map((s) => {
        const en = SERVICE_EN_SLUG[s.slug];
        const english = en ? ` · [English](${SITE_URL}/en/services/${en})` : '';
        return `- [${s.title}, Italian](${SITE_URL}/servizi/${s.slug})${english}`;
    });
    return [
        '# Pionio',
        '',
        `> ${FACTS.oneLiner.en} AI does the execution; Ivan makes the decisions. Works remotely with clients in Italy and abroad, in Italian and English.`,
        '',
        `Facts (updated ${UPDATED}):`,
        `- One person: ${FACTS.founder.name}, ${FACTS.founder.role.en.toLowerCase()}, ${FACTS.base.city}, Italy`,
        `- Contact: ${FACTS.email}, reply within ${FACTS.replyWithinHours} hours`,
        '- Languages: Italian, English (calls in English too)',
        `- Timing from first call to launch: website ${w.site} weeks; Shopify store ${w.shop} weeks and redesign ${w.redesign} weeks, depending on complexity; custom tool ${w.tool} weeks`,
        '- Prices below are starting prices in euro; the final price is fixed before work starts and does not move',
        `- ${FACTS.supportDays} days of support after launch; code, domain and accounts belong to the client`,
        '',
        '## Prices for clients in Italy (EUR, starting from)',
        ...priceLines('it'),
        '',
        '## Prices for clients outside Italy (EUR, starting from)',
        ...priceLines('en'),
        '',
        '## Services',
        `- [All services and prices, Italian](${SITE_URL}/servizi) · [English](${SITE_URL}/en/services)`,
        ...serviceLines,
        '',
        '## Work',
        ...projects.map((p) => `- [${p.title}](${SITE_URL}/en/projects/${p.slug}): ${p.description.en} (${p.year})`),
        '',
        '## Sintetico',
        `- [Sintetico](${FACTS.sintetico.url}): Pionio's generative label. Prompt systems and small tools to build realistic, consistent people who don't exist. Instagram: @sintetico.lab`,
        '',
        '## Tools',
        `- [Pionio Audit](${FACTS.audit.url}): free website check in about twenty seconds, in Italian, no email required`,
        '',
        '## Articles (Italian)',
        ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})`),
        ...postsEn.map((p) => `- [${p.title}](${SITE_URL}/en/blog/${p.slug}) (English)`),
        '',
        '## Profiles',
        ...FACTS.profiles.map((url) => `- ${url}`),
        '',
        '## About',
        `- [Who Ivan is, Italian](${SITE_URL}/chi-sono) · [English](${SITE_URL}/en/about)`,
        '',
        '## Optional',
        `- [Contact, Italian](${SITE_URL}/contatti) · [English](${SITE_URL}/en/contact)`,
        `- [Privacy, Italian](${SITE_URL}/privacy) · [English](${SITE_URL}/en/privacy)`,
        '',
    ].join('\n');
}
