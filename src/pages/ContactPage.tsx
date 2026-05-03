import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { EnvelopeSimple, InstagramLogo, GithubLogo } from '@phosphor-icons/react';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { ContactCTA } from '../components/ContactCTA';

const url = 'https://pionio.it/contatti';
const title = 'Contatti — Richiedi un Preventivo o una Consulenza | PIONIO';
const description =
    'Contatta PIONIO per un preventivo o una consulenza su web design, sviluppo web, e-commerce, web app o SEO. Risposta entro 48 ore. Sede in Italia, lavoro da remoto.';

const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://pionio.it/#localbusiness',
    name: 'PIONIO',
    image: 'https://pionio.it/og-image.png',
    url: 'https://pionio.it/',
    email: 'mailto:hello@pionio.it',
    description:
        'Studio digitale freelance specializzato in web design, sviluppo web, e-commerce, applicazioni web e ottimizzazione SEO per il mercato italiano.',
    priceRange: '€€-€€€',
    address: { '@type': 'PostalAddress', addressCountry: 'IT' },
    areaServed: [
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
    serviceType: [
        'Web Design',
        'Sviluppo Web',
        'E-commerce',
        'Applicazioni Web',
        'SEO Tecnica',
    ],
    sameAs: ['https://github.com/gittertothemoon', 'https://www.instagram.com/pionio_dev'],
    founder: { '@id': 'https://pionio.it/#person' },
    knowsLanguage: ['it', 'en'],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@pionio.it',
        availableLanguage: ['Italian', 'English'],
        areaServed: 'IT',
    },
};

const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pionio.it/' },
        { '@type': 'ListItem', position: 2, name: 'Contatti', item: url },
    ],
};

export default function ContactPage() {
    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="contatti pionio, preventivo sito web, consulenza web design, contatto sviluppatore web freelance, contatto seo italia"
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
                <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-12 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-8 max-w-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                Contatti
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            Iniziamo da una conversazione.
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light">
                            Raccontami il tuo progetto, anche solo per linee generali. Ti rispondo entro 48 ore con
                            una valutazione realistica, i prossimi passi e una stima trasparente.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid md:grid-cols-3 gap-4"
                    >
                        <a
                            href="mailto:hello@pionio.it"
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                        >
                            <EnvelopeSimple weight="duotone" className="text-forest-400" size={28} />
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Email</span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">
                                hello@pionio.it
                            </span>
                        </a>
                        <a
                            href="https://www.instagram.com/pionio_dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                        >
                            <InstagramLogo weight="duotone" className="text-forest-400" size={28} />
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                Instagram
                            </span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">
                                @pionio_dev
                            </span>
                        </a>
                        <a
                            href="https://github.com/gittertothemoon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                        >
                            <GithubLogo weight="duotone" className="text-forest-400" size={28} />
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">GitHub</span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">
                                gittertothemoon
                            </span>
                        </a>
                    </motion.section>

                    <ContactCTA />
                </div>
            </main>

            <Footer />
        </div>
    );
}
