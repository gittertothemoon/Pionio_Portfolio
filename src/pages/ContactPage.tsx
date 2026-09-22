import { m } from 'framer-motion';
import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { ContactCTA } from '../components/ContactCTA';
import { track } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../lib/whatsapp';
import { FACTS } from '../lib/facts';
import { breadcrumbs, IDS } from '../lib/graph';
import { absoluteUrl, pagePath } from '../lib/paths';

const COPY = {
    it: {
        title: `Contatti: rispondo entro ${FACTS.replyWithinHours} ore | Pionio`,
        description: `Scrivimi su WhatsApp, via email o dal modulo: bastano due righe sul progetto. Rispondo io, entro ${FACTS.replyWithinHours} ore, con tempi e prezzo. Base Bologna.`,
        label: 'Contatti',
        h1: 'Iniziamo da una conversazione.',
        intro: `Raccontami il progetto, anche solo per linee generali. Ti rispondo io entro ${FACTS.replyWithinHours} ore, con tempi realistici, i prossimi passi e un prezzo chiaro.`,
        skip: 'Vai al contenuto',
    },
    en: {
        title: `Contact Ivan Pantò: reply within ${FACTS.replyWithinHours} hours | Pionio`,
        description: `Message me on WhatsApp, by email or through the form: two lines about your project are enough. I reply myself within ${FACTS.replyWithinHours} hours, with timing and a price.`,
        label: 'Contact',
        h1: "Let's start with a conversation.",
        intro: `Tell me about the project, even roughly. I reply myself within ${FACTS.replyWithinHours} hours, with realistic timing, next steps and a clear price. The first call can be in English.`,
        skip: 'Skip to content',
    },
};

export default function ContactPage() {
    const { locale } = useLanguage();
    const c = COPY[locale];
    const path = pagePath('contact', locale);
    const url = absoluteUrl(path);

    const contactPage = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        inLanguage: locale,
        isPartOf: { '@id': IDS.website },
        mainEntity: { '@id': IDS.org },
    };
    const crumbs = breadcrumbs([
        { name: 'Home', path: pagePath('home', locale) },
        { name: c.label, path },
    ]);

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={c.title} description={c.description}>
                <script type="application/ld+json">{JSON.stringify(contactPage)}</script>
                <script type="application/ld+json">{JSON.stringify(crumbs)}</script>
            </Seo>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {c.skip}
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-12 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
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

                    <section className="grid md:grid-cols-3 gap-4">
                        <a
                            href={getWhatsAppUrl(locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('whatsapp_click', { source: 'contact_page', locale })}
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-forest-500/20 bg-forest-950/50 hover:bg-forest-900/60 hover:border-forest-400/40 transition-all"
                        >
                            <WhatsappLogo weight="fill" className="text-forest-400" size={28} />
                            <span className="text-forest-300 font-mono text-xs uppercase tracking-widest">WhatsApp</span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">{WHATSAPP_DISPLAY_NUMBER}</span>
                        </a>
                        <a
                            href={`mailto:${FACTS.email}`}
                            onClick={() => track('email_click', { source: 'contact_page', locale })}
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                        >
                            <EnvelopeSimple weight="duotone" className="text-forest-400" size={28} />
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Email</span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">{FACTS.email}</span>
                        </a>
                        <a
                            href="https://www.instagram.com/pionio_dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('social_click', { network: 'instagram', locale })}
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                        >
                            <InstagramLogo weight="duotone" className="text-forest-400" size={28} />
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Instagram</span>
                            <span className="text-white font-sans text-lg group-hover:text-forest-100 transition-colors">@pionio_dev</span>
                        </a>
                    </section>

                    <ContactCTA />
                </div>
            </main>

            <Footer />
        </div>
    );
}
