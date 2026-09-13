import type { Locale } from './i18n';
import { SITE_URL } from './facts';

// Every page that exists in both languages, as a pair. The Italian addresses are the ones Google already
// knows and never change; the English ones live under /en. `en: null` means the page is Italian only.
const PAGES = {
    home: { it: '/', en: '/en' },
    services: { it: '/servizi', en: '/en/services' },
    contact: { it: '/contatti', en: '/en/contact' },
    privacy: { it: '/privacy', en: '/en/privacy' },
    blog: { it: '/blog', en: null },
} as const;

export type PageKey = keyof typeof PAGES;

// Italian service slug -> English slug, for the services that have an English page.
// Must match the `slug` fields in services-en.ts.
export const SERVICE_EN_SLUG: Record<string, string> = {
    'web-design': 'web-design',
    ecommerce: 'shopify-store',
    'applicazioni-web': 'web-apps',
    'rifacimento-sito-bologna': 'website-redesign',
};

export const localeFromPath = (pathname: string): Locale =>
    pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it';

const clean = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

/** The page in that language; a page with no English twin falls back to its Italian address. */
export const pagePath = (key: PageKey, locale: Locale): string => (locale === 'en' && PAGES[key].en) || PAGES[key].it;

export function servicePath(itSlug: string, locale: Locale): string {
    if (locale === 'en') {
        const en = SERVICE_EN_SLUG[itSlug];
        return en ? `/en/services/${en}` : PAGES.services.en;
    }
    return `/servizi/${itSlug}`;
}

export const itServiceSlug = (enSlug: string): string | undefined =>
    Object.keys(SERVICE_EN_SLUG).find((it) => SERVICE_EN_SLUG[it] === enSlug);

export const projectPath = (slug: string, locale: Locale): string =>
    locale === 'en' ? `/en/projects/${slug}` : `/projects/${slug}`;

/** A section of the home page: "/#crafts" in Italian, "/en#crafts" in English. */
export const homeAnchor = (hash: string, locale: Locale): string => `${pagePath('home', locale)}#${hash}`;

export const absoluteUrl = (pathname: string): string => {
    const p = clean(pathname);
    return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`;
};

/** The Italian and English addresses of the page at `pathname`, when they exist. */
export function alternatesFor(pathname: string): { it?: string; en?: string } {
    const p = clean(pathname);
    for (const pair of Object.values(PAGES)) {
        if (pair.it === p || pair.en === p) return { it: pair.it, en: pair.en ?? undefined };
    }
    const itService = p.match(/^\/servizi\/([^/]+)$/);
    if (itService) {
        const en = SERVICE_EN_SLUG[itService[1]];
        return { it: p, en: en ? `/en/services/${en}` : undefined };
    }
    const enService = p.match(/^\/en\/services\/([^/]+)$/);
    if (enService) {
        const it = itServiceSlug(enService[1]);
        return { it: it ? `/servizi/${it}` : undefined, en: p };
    }
    const project = p.match(/^\/(?:en\/)?projects\/([^/]+)$/);
    if (project) return { it: `/projects/${project[1]}`, en: `/en/projects/${project[1]}` };
    return localeFromPath(p) === 'en' ? { en: p } : { it: p };
}
