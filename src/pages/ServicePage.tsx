import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { getService, services } from '../lib/services';
import { projectCategory, getProject } from '../lib/projects';
import { useLanguage } from '../context/LanguageContext';

export function getStaticPaths() {
    return services.map((s) => `servizi/${s.slug}`);
}

export function Component() {
    return <ServicePage />;
}

export default function ServicePage() {
    const { slug } = useParams<{ slug: string }>();
    const { locale } = useLanguage();
    const service = slug ? getService(slug) : undefined;

    if (!service) {
        return (
            <div className="min-h-[100dvh] bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
                <Head>
                    <title>Servizio non trovato — PIONIO</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className="text-center flex flex-col gap-6 max-w-md">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</span>
                    <h1 className="text-4xl md:text-5xl font-sans tracking-tight">Servizio non trovato</h1>
                    <Link
                        to="/servizi"
                        className="self-center inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-forest-500/20 text-white font-mono text-xs uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft weight="bold" /> Tutti i servizi
                    </Link>
                </div>
            </div>
        );
    }

    const url = `https://pionio.it/servizi/${service.slug}`;

    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        url,
        provider: { '@id': 'https://pionio.it/#person' },
        areaServed: { '@type': 'Country', name: 'Italy' },
        serviceType: service.title,
        description: service.seoDescription,
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            description: service.pricingNote,
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: service.title,
            itemListElement: service.includes.map((i) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: i.title, description: i.description },
            })),
        },
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pionio.it/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://pionio.it/servizi' },
            { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    const relatedProjects = service.relatedProjectSlugs
        .map((s) => getProject(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{service.seoTitle}</title>
                <meta name="description" content={service.seoDescription} />
                <meta name="keywords" content={service.keywords.join(', ')} />
                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="it" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={service.seoTitle} />
                <meta property="og:description" content={service.seoDescription} />
                <meta property="og:image" content="https://pionio.it/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={service.seoTitle} />
                <meta name="twitter:description" content={service.seoDescription} />
                <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/servizi"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            <ArrowLeft weight="bold" /> Tutti i servizi
                        </Link>
                    </motion.div>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                {service.title}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            {service.h1}
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light max-w-3xl">
                            {service.intro}
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 max-w-3xl"
                    >
                        {service.paragraphs.map((p, i) => (
                            <p key={i} className="text-zinc-400 text-lg leading-relaxed font-light">
                                {p}
                            </p>
                        ))}
                    </motion.section>

                    <section className="flex flex-col gap-10">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                Cosa è incluso
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">
                            Tutto quello che serve, niente di superfluo.
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-6">
                            {service.includes.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="flex flex-col gap-3 p-6 rounded-3xl border border-white/5 bg-white/[0.02]"
                                >
                                    <Check weight="bold" className="text-forest-400" size={20} />
                                    <h3 className="text-white font-sans text-xl">{item.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </section>

                    <section className="flex flex-col gap-10">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                Processo
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">
                            Come lavoriamo insieme.
                        </h2>
                        <ol className="flex flex-col gap-6">
                            {service.process.map((step, i) => (
                                <motion.li
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
                                        <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </section>

                    <section className="flex flex-col gap-6">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Stack</span>
                        <ul className="flex flex-wrap gap-2">
                            {service.tech.map((t) => (
                                <li
                                    key={t}
                                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs"
                                >
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {relatedProjects.length > 0 && (
                        <section className="flex flex-col gap-10">
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                Progetti recenti
                            </span>
                            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">
                                Cosa è uscito da questo lavoro.
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {relatedProjects.map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={`/projects/${p.slug}`}
                                        className="group flex flex-col gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                                    >
                                        <div
                                            className={`aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center ${
                                                p.bgClass ?? 'bg-zinc-900'
                                            }`}
                                        >
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                loading="lazy"
                                                decoding="async"
                                                className={`w-[60%] h-auto object-contain ${
                                                    p.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''
                                                }`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-sans text-sm group-hover:text-forest-100 transition-colors">
                                                {p.title}
                                            </span>
                                            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                                {projectCategory(p, locale)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="flex flex-col gap-10">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">FAQ</span>
                        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white">
                            Domande frequenti.
                        </h2>
                        <div className="flex flex-col gap-4">
                            {service.faq.map((f, i) => (
                                <motion.details
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    className="group p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] open:bg-white/[0.04]"
                                >
                                    <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                                        <h3 className="text-white font-sans text-lg md:text-xl">{f.q}</h3>
                                        <span className="text-forest-400 font-mono text-xl shrink-0 group-open:rotate-45 transition-transform">
                                            +
                                        </span>
                                    </summary>
                                    <p className="text-zinc-400 leading-relaxed mt-4">{f.a}</p>
                                </motion.details>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] border border-forest-500/20 bg-forest-500/5">
                        <div className="flex flex-col gap-4">
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                Prossimi passi
                            </span>
                            <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-white">
                                {service.ctaTitle}
                            </h2>
                            <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">{service.ctaCopy}</p>
                            <p className="text-zinc-500 font-mono text-sm">{service.pricingNote}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/contatti"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/20 border border-forest-500/40 text-forest-100 hover:bg-forest-500/30 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                Richiedi un preventivo <ArrowUpRight weight="bold" />
                            </Link>
                            <Link
                                to="/servizi"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                Tutti i servizi
                            </Link>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
