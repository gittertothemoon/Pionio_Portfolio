import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { services } from '../lib/services';

const url = 'https://pionio.it/servizi';
const title = 'Servizi — Web Design, Sviluppo Web, E-commerce, Web App, SEO | PIONIO';
const description =
    'Servizi PIONIO: web design su misura, sviluppo web in React/TypeScript, e-commerce, applicazioni web e ottimizzazione SEO tecnica. Per brand, PMI e startup italiane.';

const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name: 'Servizi PIONIO',
    itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${url}/${s.slug}`,
        name: s.title,
    })),
};

const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pionio.it/' },
        { '@type': 'ListItem', position: 2, name: 'Servizi', item: url },
    ],
};

export default function ServicesIndex() {
    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="servizi web design, sviluppo web freelance, ecommerce su misura, sviluppo applicazioni web, ottimizzazione SEO, consulenza frontend Italia"
                />
                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="it" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://pionio.it/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
                    <m.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-8 max-w-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                Servizi
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            Cinque modi per lavorare insieme.
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light">
                            Web design, sviluppo, e-commerce, web app e SEO tecnica. Ogni servizio è pensato per chi
                            vuole un partner unico dal concept al lancio, senza intermediari e senza scuse.
                        </p>
                    </m.section>

                    <section className="grid md:grid-cols-2 gap-6">
                        {services.map((s, i) => (
                            <m.div
                                key={s.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/servizi/${s.slug}`}
                                    className="group h-full flex flex-col justify-between gap-8 p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-forest-500/20 transition-all"
                                >
                                    <div className="flex flex-col gap-4">
                                        <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                            0{i + 1} — {s.title}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-sans tracking-tight text-white group-hover:text-forest-100 transition-colors">
                                            {s.h1}
                                        </h2>
                                        <p className="text-zinc-400 leading-relaxed">{s.intro}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                            Scopri il servizio
                                        </span>
                                        <ArrowUpRight
                                            className="text-zinc-500 group-hover:text-forest-400 transition-colors"
                                            weight="bold"
                                            size={24}
                                        />
                                    </div>
                                </Link>
                            </m.div>
                        ))}
                    </section>

                    <section className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] border border-forest-500/20 bg-forest-500/5">
                        <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                            Hai un progetto in mente?
                        </span>
                        <h2 className="text-3xl md:text-4xl font-sans tracking-tight text-white">
                            Iniziamo da una conversazione, non da un preventivo standard.
                        </h2>
                        <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                            Raccontami il tuo brand, gli obiettivi e i tempi. Ti rispondo entro 48 ore con una
                            stima realistica e i prossimi passi — anche se la risposta giusta è “non sono io la
                            persona giusta per questo progetto”.
                        </p>
                        <Link
                            to="/contatti"
                            className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/20 border border-forest-500/40 text-forest-100 hover:bg-forest-500/30 font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            Parliamone <ArrowUpRight weight="bold" />
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
