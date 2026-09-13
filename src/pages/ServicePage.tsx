/* eslint-disable react-refresh/only-export-components -- route module exports loader data alongside the page */
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { AuditInlineCTA } from '../components/AuditInlineCTA';
import NotFound from './NotFound';
import { getService, services } from '../lib/services';
import { servicesEn } from '../lib/services-en';
import { projectCategory, getProject } from '../lib/projects';
import { useLanguage } from '../context/LanguageContext';
import { breadcrumbs, IDS } from '../lib/graph';
import { absoluteUrl, itServiceSlug, pagePath, projectPath, servicePath } from '../lib/paths';
import { PRICES, withPrices } from '../lib/prices';

export function getStaticPaths() {
    return services.map((s) => `servizi/${s.slug}`);
}

export function Component() {
    return <ServicePage />;
}

const LABELS = {
    it: {
        home: 'Home',
        services: 'Servizi',
        all: 'Tutti i servizi',
        included: 'Cosa è incluso',
        includedTitle: 'Tutto quello che serve, niente di superfluo.',
        process: 'Processo',
        processTitle: 'Come lavoriamo insieme.',
        recent: 'Progetti recenti',
        recentTitle: 'Cosa è uscito da questo lavoro.',
        faqTitle: 'Domande frequenti.',
        next: 'Prossimi passi',
        quote: 'Richiedi un preventivo',
        skip: 'Vai al contenuto',
    },
    en: {
        home: 'Home',
        services: 'Services',
        all: 'All services',
        included: "What's included",
        includedTitle: 'What it takes, and nothing more.',
        process: 'Process',
        processTitle: 'How we work together.',
        recent: 'Recent work',
        recentTitle: 'What came out of this kind of work.',
        faqTitle: 'Frequently asked questions.',
        next: 'Next steps',
        quote: 'Ask for a quote',
        skip: 'Skip to content',
    },
};

export default function ServicePage() {
    const { slug = '' } = useParams<{ slug: string }>();
    const { locale } = useLanguage();
    const itSlug = locale === 'en' ? itServiceSlug(slug) : slug;
    const base = itSlug ? getService(itSlug) : undefined;
    const copy = base && (locale === 'en' ? servicesEn[base.slug] : base);

    if (!base || !copy) return <NotFound />;

    const L = LABELS[locale];
    // Italian copy writes prices as {site}, {tool}…; English copy has them written out. Both go through here.
    const fill = (text: string) => withPrices(text, locale);
    const path = servicePath(base.slug, locale);
    const url = absoluteUrl(path);

    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: copy.title,
        serviceType: copy.title,
        description: fill(copy.seoDescription),
        url,
        provider: { '@id': IDS.org },
        areaServed: locale === 'it' ? { '@type': 'Country', name: 'Italy' } : 'Worldwide',
        availableLanguage: [locale],
        offers: {
            '@type': 'Offer',
            url,
            priceCurrency: 'EUR',
            priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: PRICES[base.priceKey][locale],
                priceCurrency: 'EUR',
            },
            // Each page marks only the list it shows: Italian prices for Italy, English ones for everyone else.
            ...(locale === 'it'
                ? { eligibleRegion: { '@type': 'Country', name: 'IT' } }
                : { ineligibleRegion: { '@type': 'Country', name: 'IT' } }),
            description: fill(copy.pricingNote),
        },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: copy.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: fill(f.a) },
        })),
    };

    const crumbs = breadcrumbs([
        { name: L.home, path: pagePath('home', locale) },
        { name: L.services, path: pagePath('services', locale) },
        { name: copy.title, path },
    ]);

    const relatedProjects = base.relatedProjectSlugs
        .map((s) => getProject(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={fill(copy.seoTitle)} description={fill(copy.seoDescription)}>
                <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(crumbs)}</script>
            </Seo>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {L.skip}
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-20">
                    <div>
                        <Link
                            to={pagePath('services', locale)}
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            <ArrowLeft weight="bold" /> {L.all}
                        </Link>
                    </div>

                    {/* Visible in the pre-rendered page: only the movement is animated, never the opacity. */}
                    <m.section
                        initial={{ y: 24 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{copy.title}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            {copy.h1}
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light max-w-3xl">{fill(copy.intro)}</p>
                        <p className="text-zinc-500 font-mono text-sm">{fill(copy.pricingNote)}</p>
                    </m.section>

                    <m.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 max-w-3xl"
                    >
                        {copy.paragraphs.map((p, i) => (
                            <p key={i} className="text-zinc-400 text-lg leading-relaxed font-light">
                                {fill(p)}
                            </p>
                        ))}
                    </m.section>

                    <section className="flex flex-col gap-10">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{L.included}</span>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">{L.includedTitle}</h2>
                        <ul className="grid md:grid-cols-2 gap-6">
                            {copy.includes.map((item, i) => (
                                <m.li
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="flex flex-col gap-3 p-6 rounded-3xl border border-white/5 bg-white/[0.02]"
                                >
                                    <Check weight="bold" className="text-forest-400" size={20} />
                                    <h3 className="text-white font-sans text-xl">{item.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{fill(item.description)}</p>
                                </m.li>
                            ))}
                        </ul>
                    </section>

                    <AuditInlineCTA source="service_page" />

                    <section className="flex flex-col gap-10">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{L.process}</span>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">{L.processTitle}</h2>
                        <ol className="flex flex-col gap-6">
                            {copy.process.map((step, i) => (
                                <m.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="flex gap-6 md:gap-10 p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02]"
                                >
                                    <span className="text-forest-400 font-mono text-sm md:text-base">{step.step}</span>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="text-white font-sans text-xl md:text-2xl">{step.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed">{fill(step.description)}</p>
                                    </div>
                                </m.li>
                            ))}
                        </ol>
                    </section>

                    <section className="flex flex-col gap-6">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Stack</span>
                        <ul className="flex flex-wrap gap-2">
                            {base.tech.map((t) => (
                                <li key={t} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {relatedProjects.length > 0 && (
                        <section className="flex flex-col gap-10">
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{L.recent}</span>
                            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">{L.recentTitle}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {relatedProjects.map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={projectPath(p.slug, locale)}
                                        className="group flex flex-col gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                                    >
                                        <div className={`aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center ${p.bgClass ?? 'bg-zinc-900'}`}>
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                loading="lazy"
                                                decoding="async"
                                                className={`w-[60%] h-auto object-contain ${p.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''}`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-sans text-sm group-hover:text-forest-100 transition-colors">{p.title}</span>
                                            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{projectCategory(p, locale)}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="flex flex-col gap-10">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">FAQ</span>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">{L.faqTitle}</h2>
                        <div className="flex flex-col gap-4">
                            {copy.faq.map((f, i) => (
                                <m.details
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    className="group p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] open:bg-white/[0.04]"
                                >
                                    <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                                        <h3 className="text-white font-sans text-lg md:text-xl">{f.q}</h3>
                                        <span className="text-forest-400 font-mono text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-zinc-400 leading-relaxed mt-4">{fill(f.a)}</p>
                                </m.details>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] border border-forest-500/20 bg-forest-500/5">
                        <div className="flex flex-col gap-4">
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{L.next}</span>
                            <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-white">{copy.ctaTitle}</h2>
                            <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">{fill(copy.ctaCopy)}</p>
                            <p className="text-zinc-500 font-mono text-sm">{fill(copy.pricingNote)}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to={pagePath('contact', locale)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/20 border border-forest-500/40 text-forest-100 hover:bg-forest-500/30 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                {L.quote} <ArrowUpRight weight="bold" />
                            </Link>
                            <Link
                                to={pagePath('services', locale)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                {L.all}
                            </Link>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
