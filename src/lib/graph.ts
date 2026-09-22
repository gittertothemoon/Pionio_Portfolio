import type { Locale } from './i18n';
import { FACTS, SITE_URL } from './facts';
import { absoluteUrl, pagePath } from './paths';

// The structured data every page carries: one graph per language, one Pionio. Before this there were
// four differently named Pionios in five separate scripts, and an engine that finds facts that disagree
// quotes nobody. Page-level nodes (a Service, an FAQ, a breadcrumb) point back here by @id.

export const IDS = {
    website: `${SITE_URL}/#website`,
    org: `${SITE_URL}/#org`,
    person: `${SITE_URL}/#person`,
    sintetico: 'https://sintetico.pionio.it/#org',
    audit: 'https://audit.pionio.it/#app',
} as const;

const SLOGAN = { it: 'Disegno quello che poi costruisco.', en: 'I draw it first. Then I build it.' };

const KNOWS_ABOUT = {
    it: ['Web design', 'Sviluppo web', 'React', 'TypeScript', 'Shopify', 'SEO tecnica', 'Immagini generative'],
    en: ['Web design', 'Web development', 'React', 'TypeScript', 'Shopify', 'Technical SEO', 'Generative images'],
};

const SINTETICO = {
    it: "L'etichetta generativa di Pionio: sistemi di prompt e piccoli strumenti per costruire persone realistiche e coerenti che non esistono.",
    en: "Pionio's generative label: prompt systems and small tools for building realistic, consistent people who don't exist.",
};

const AUDIT = {
    it: 'Controlla un sito in una ventina di secondi e dice, a parole semplici, cosa lo rallenta e cosa gli manca. Gratis, senza email.',
    en: 'Checks a website in about twenty seconds and says, in plain words, what slows it down and what it is missing. Free, no email.',
};

const PLACE = { it: 'Bologna, Italia', en: 'Bologna, Italy' };

export function siteGraph(locale: Locale) {
    const profiles = [...FACTS.profiles];
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': IDS.website,
                url: `${SITE_URL}/`,
                name: FACTS.name,
                inLanguage: [...FACTS.languages],
                publisher: { '@id': IDS.org },
            },
            {
                '@type': 'ProfessionalService',
                '@id': IDS.org,
                name: FACTS.name,
                url: `${SITE_URL}/`,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
                image: `${SITE_URL}/og-cover.png`,
                slogan: SLOGAN[locale],
                description: FACTS.oneLiner[locale],
                founder: { '@id': IDS.person },
                employee: { '@id': IDS.person },
                email: FACTS.email,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: FACTS.base.city,
                    addressRegion: FACTS.base.region,
                    addressCountry: FACTS.base.country,
                },
                areaServed: 'Worldwide',
                knowsLanguage: [...FACTS.languages],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    email: FACTS.email,
                    availableLanguage: ['Italian', 'English'],
                    url: absoluteUrl(pagePath('contact', locale)),
                },
                sameAs: profiles,
                subOrganization: { '@id': IDS.sintetico },
                hasOfferCatalog: { '@id': `${absoluteUrl(pagePath('services', locale))}#catalog` },
            },
            {
                '@type': 'Person',
                '@id': IDS.person,
                name: FACTS.founder.name,
                url: absoluteUrl(pagePath('about', locale)),
                image: `${SITE_URL}${FACTS.founder.photo}`,
                jobTitle: FACTS.founder.role[locale],
                worksFor: { '@id': IDS.org },
                homeLocation: { '@type': 'Place', name: PLACE[locale] },
                knowsLanguage: [...FACTS.languages],
                knowsAbout: KNOWS_ABOUT[locale],
                sameAs: profiles,
            },
            {
                '@type': 'Organization',
                '@id': IDS.sintetico,
                name: 'Sintetico',
                url: FACTS.sintetico.url,
                description: SINTETICO[locale],
                parentOrganization: { '@id': IDS.org },
                sameAs: [FACTS.sintetico.instagram],
            },
            {
                '@type': 'WebApplication',
                '@id': IDS.audit,
                name: 'Pionio Audit',
                url: FACTS.audit.url,
                description: AUDIT[locale],
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                inLanguage: 'it',
                isAccessibleForFree: true,
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
                provider: { '@id': IDS.org },
            },
        ],
    };
}

/** A BreadcrumbList from (name, path) pairs, home first. */
export function breadcrumbs(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}
