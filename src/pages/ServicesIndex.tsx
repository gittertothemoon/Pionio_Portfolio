import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { AuditInlineCTA } from '../components/AuditInlineCTA';
import { useLanguage } from '../context/LanguageContext';
import type { Locale } from '../lib/i18n';
import { services } from '../lib/services';
import { servicesEn } from '../lib/services-en';
import { FACTS } from '../lib/facts';
import { breadcrumbs, IDS } from '../lib/graph';
import { absoluteUrl, pagePath, SERVICE_EN_SLUG, servicePath } from '../lib/paths';
import { eur, PRICES, withPrices, type PriceKey } from '../lib/prices';

const UPDATED = { iso: '2026-09-13', it: '13 settembre 2026', en: '13 September 2026' };

// The price list, one row per thing you can ask for. It is a real <table> on purpose: it's the page an
// engine opens to answer "how much does a site cost with Pionio", and a table is what it can quote.
type Row = {
    key: PriceKey;
    service: string; // the Italian slug of the page that explains it
    weeks?: keyof typeof FACTS.weeks;
    name: Record<Locale, string>;
    what: Record<Locale, string>;
};

const ROWS: Row[] = [
    {
        key: 'site',
        service: 'web-design',
        weeks: 'site',
        name: { it: 'Sito web', en: 'Website' },
        what: {
            it: 'Design e codice miei. Pensato prima per il telefono, leggibile da Google dal lancio.',
            en: 'Design and code, both mine. Phone first, readable by Google from launch day.',
        },
    },
    {
        key: 'largeSite',
        service: 'web-design',
        name: { it: 'Sito con molte pagine o funzioni particolari', en: 'Site with many pages or custom features' },
        what: {
            it: 'Lo stesso metodo, con più pagine da disegnare e più cose da far funzionare.',
            en: 'The same method, with more pages to design and more things to make work.',
        },
    },
    {
        key: 'shopify',
        service: 'ecommerce',
        weeks: 'shop',
        name: { it: 'Negozio su Shopify', en: 'Shopify store' },
        what: {
            it: 'Schede prodotto chiare; carta, Apple Pay, Google Pay e PayPal; veloce da telefono.',
            en: 'Clear product pages; cards, Apple Pay, Google Pay and PayPal; fast on a phone.',
        },
    },
    {
        key: 'shopScratch',
        service: 'ecommerce',
        name: { it: 'Negozio costruito da zero', en: 'Online shop built from scratch' },
        what: {
            it: 'Quando un tema di Shopify non basta: codice mio, dal catalogo al pagamento.',
            en: "When a Shopify theme isn't enough: my own code, from catalogue to checkout.",
        },
    },
    {
        key: 'redesign',
        service: 'rifacimento-sito-bologna',
        weeks: 'redesign',
        name: { it: 'Rifare il sito che hai', en: 'Redesign of the site you have' },
        what: {
            it: 'Tengo le pagine che Google conosce già: migrazione, redirect, dominio ed email in ordine.',
            en: 'I keep the pages Google already knows: migration, redirects, domain and email sorted.',
        },
    },
    {
        key: 'tool',
        service: 'applicazioni-web',
        weeks: 'tool',
        name: { it: 'Strumento o web app', en: 'Web tool or app' },
        what: {
            it: 'Prima un prototipo da provare, poi il codice. Accessi, database e backup compresi.',
            en: 'A prototype to try first, then the code. Logins, database and backups included.',
        },
    },
    {
        key: 'seoAudit',
        service: 'seo-ottimizzazione',
        name: { it: 'Audit SEO tecnico', en: 'Technical SEO audit' },
        what: {
            it: 'Velocità, indicizzazione, dati strutturati: cosa sistemare, e in che ordine.',
            en: 'Speed, indexing, structured data: what to fix, and in what order.',
        },
    },
];

const copyFor = (locale: Locale) => {
    const p = (key: PriceKey) => eur(PRICES[key][locale], locale);
    return locale === 'it'
        ? {
              title: 'Servizi e prezzi: siti, negozi online, strumenti | Pionio',
              description: `Da quanto si parte: sito da ${p('site')}, negozio Shopify da ${p('shopify')}, rifacimento da ${p('redesign')}, strumento da ${p('tool')}. Il prezzo vero lo fissiamo prima di iniziare.`,
              label: 'Servizi e prezzi',
              h1: 'Da quanto si parte, e quanto ci vuole.',
              intro: 'Sono prezzi di partenza. Quello vero lo fissiamo prima di iniziare, dopo una chiamata di 30 minuti, e resta quello.',
              updated: `Aggiornato il ${UPDATED.it}`,
              cols: ['Servizio', 'Da', 'Tempi', 'Cosa c’è dentro'],
              weeks: 'settimane',
              agreed: 'Da fissare insieme',
              note: 'Negozio e rifacimento dipendono da quanto è complesso il lavoro.',
              pages: 'Le pagine dei servizi',
              read: 'Scopri il servizio',
              ctaLabel: 'Hai un progetto in mente?',
              ctaTitle: 'Iniziamo da una conversazione.',
              ctaBody:
                  'Raccontami cosa ti serve e i tempi che hai. Ti rispondo entro 24 ore con una stima realistica e i prossimi passi, anche quando la risposta onesta è che non sono io la persona giusta.',
              cta: 'Parliamone',
              skip: 'Vai al contenuto',
          }
        : {
              title: 'Services and prices: websites, shops, web tools | Pionio',
              description: `Starting prices in euro for clients outside Italy: website from ${p('site')}, Shopify store from ${p('shopify')}, redesign from ${p('redesign')}, custom tool from ${p('tool')}.`,
              label: 'Services and prices',
              h1: 'Where each job starts, and how long it takes.',
              intro: 'Starting prices in euro, for clients outside Italy. We fix the real price before we start, after a 30-minute call, and it stays put.',
              updated: `Updated ${UPDATED.en}`,
              cols: ['Service', 'From', 'Time', 'What’s in it'],
              weeks: 'weeks',
              agreed: 'Set together',
              note: 'Store and redesign timing depends on how complex the job is.',
              pages: 'Service pages',
              read: 'Read more',
              ctaLabel: 'Got a project in mind?',
              ctaTitle: "Let's start with a conversation.",
              ctaBody:
                  'Tell me what you need and when. I reply within 24 hours with a realistic estimate and next steps, even when the honest answer is that I am not the right person for the job.',
              cta: "Let's talk",
              skip: 'Skip to content',
          };
};

export default function ServicesIndex() {
    const { locale } = useLanguage();
    const c = copyFor(locale);
    const path = pagePath('services', locale);
    const url = absoluteUrl(path);
    const linkFor = (row: Row) => (locale === 'it' || SERVICE_EN_SLUG[row.service] ? servicePath(row.service, locale) : undefined);

    const cards =
        locale === 'it'
            ? services.map((s) => ({ slug: s.slug, title: s.title, h1: s.h1, intro: withPrices(s.intro, 'it') }))
            : services
                  .filter((s) => servicesEn[s.slug])
                  .map((s) => ({ slug: s.slug, title: servicesEn[s.slug].title, h1: servicesEn[s.slug].h1, intro: servicesEn[s.slug].intro }));

    const catalog = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        '@id': `${url}#catalog`,
        name: c.label,
        url,
        itemListElement: ROWS.map((row) => {
            const link = linkFor(row);
            return {
                '@type': 'Offer',
                name: row.name[locale],
                url: link ? absoluteUrl(link) : url,
                priceCurrency: 'EUR',
                priceSpecification: { '@type': 'PriceSpecification', minPrice: PRICES[row.key][locale], priceCurrency: 'EUR' },
                ...(locale === 'it'
                    ? { eligibleRegion: { '@type': 'Country', name: 'IT' } }
                    : { ineligibleRegion: { '@type': 'Country', name: 'IT' } }),
                itemOffered: { '@type': 'Service', name: row.name[locale], description: row.what[locale], provider: { '@id': IDS.org } },
            };
        }),
    };
    const page = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        inLanguage: locale,
        dateModified: UPDATED.iso,
        isPartOf: { '@id': IDS.website },
        mainEntity: { '@id': `${url}#catalog` },
    };
    const crumbs = breadcrumbs([
        { name: 'Home', path: pagePath('home', locale) },
        { name: c.label, path },
    ]);

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={c.title} description={c.description}>
                <script type="application/ld+json">{JSON.stringify(page)}</script>
                <script type="application/ld+json">{JSON.stringify(catalog)}</script>
                <script type="application/ld+json">{JSON.stringify(crumbs)}</script>
            </Seo>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {c.skip}
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
                    <m.section
                        initial={{ y: 24 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-8 max-w-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{c.label}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05]">{c.h1}</h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light">{c.intro}</p>
                    </m.section>

                    <section aria-label={c.label} className="flex flex-col gap-5">
                        <table className="w-full border-collapse text-left">
                            <caption className="sr-only">{c.label}</caption>
                            <thead className="hidden md:table-header-group">
                                <tr className="border-b border-white/10">
                                    <th scope="col" className="pb-4 pr-6 font-mono text-xs font-normal uppercase tracking-widest text-zinc-500">
                                        {c.cols[0]}
                                    </th>
                                    <th scope="col" className="pb-4 pr-10 text-right font-mono text-xs font-normal uppercase tracking-widest text-zinc-500">
                                        {c.cols[1]}
                                    </th>
                                    <th scope="col" className="pb-4 pr-8 font-mono text-xs font-normal uppercase tracking-widest text-zinc-500">
                                        {c.cols[2]}
                                    </th>
                                    <th scope="col" className="pb-4 font-mono text-xs font-normal uppercase tracking-widest text-zinc-500">
                                        {c.cols[3]}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ROWS.map((row) => {
                                    const link = linkFor(row);
                                    return (
                                        <tr
                                            key={row.key}
                                            className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-white/5 py-7 md:table-row md:py-0 md:transition-colors md:hover:bg-white/[0.02]"
                                        >
                                            <th scope="row" className="font-normal md:py-8 md:pr-6 md:align-baseline">
                                                {link ? (
                                                    <Link
                                                        to={link}
                                                        className="text-xl leading-snug tracking-tight text-white underline decoration-white/15 underline-offset-[6px] transition-colors hover:decoration-forest-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 md:text-2xl"
                                                    >
                                                        {row.name[locale]}
                                                    </Link>
                                                ) : (
                                                    <span className="text-xl leading-snug tracking-tight text-white md:text-2xl">{row.name[locale]}</span>
                                                )}
                                            </th>
                                            <td className="text-right md:py-8 md:pr-10 md:align-baseline">
                                                <span className="whitespace-nowrap text-2xl font-medium tracking-tight text-white tabular-nums md:text-4xl">
                                                    {eur(PRICES[row.key][locale], locale)}
                                                </span>
                                            </td>
                                            <td className="col-span-2 text-sm text-zinc-300 md:whitespace-nowrap md:py-8 md:pr-8 md:align-baseline md:text-base">
                                                {row.weeks ? `${FACTS.weeks[row.weeks]} ${c.weeks}` : <span className="text-zinc-500">{c.agreed}</span>}
                                            </td>
                                            <td className="col-span-2 max-w-md leading-relaxed text-zinc-400 md:py-8 md:align-baseline">{row.what[locale]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <p className="text-sm leading-relaxed text-zinc-500">
                            {c.note} <span className="whitespace-nowrap">{c.updated}.</span>
                        </p>
                    </section>

                    <section className="flex flex-col gap-8">
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">{c.pages}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {cards.map((s) => (
                                <Link
                                    key={s.slug}
                                    to={servicePath(s.slug, locale)}
                                    className="group h-full flex flex-col justify-between gap-8 p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-forest-500/20 transition-all"
                                >
                                    <div className="flex flex-col gap-4">
                                        <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{s.title}</span>
                                        <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-white group-hover:text-forest-100 transition-colors">
                                            {s.h1}
                                        </h3>
                                        <p className="text-zinc-400 leading-relaxed">{s.intro}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{c.read}</span>
                                        <ArrowUpRight className="text-zinc-500 group-hover:text-forest-400 transition-colors" weight="bold" size={24} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <AuditInlineCTA source="services_index" />

                    <section className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] border border-forest-500/20 bg-forest-500/5">
                        <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{c.ctaLabel}</span>
                        <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-white">{c.ctaTitle}</h2>
                        <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">{c.ctaBody}</p>
                        <Link
                            to={pagePath('contact', locale)}
                            className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/20 border border-forest-500/40 text-forest-100 hover:bg-forest-500/30 font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            {c.cta} <ArrowUpRight weight="bold" />
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
