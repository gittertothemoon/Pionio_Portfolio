import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { track } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { FACTS } from '../lib/facts';
import { breadcrumbs, IDS } from '../lib/graph';
import { absoluteUrl, pagePath } from '../lib/paths';

// The page an engine opens to answer "who is Pionio" (plan D8): who Ivan is, where he works, the three
// crafts, how he uses AI, the tools, the profiles. Short on purpose, and every fact comes from facts.ts or
// from copy already on the site. Nothing here that Ivan hasn't confirmed (no founding year: D11).

const UPDATED = '2026-09-22';

const STACK = ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'WebGL', 'Shopify'];

const PROFILES = [
    { name: 'Instagram', href: FACTS.profiles[0] },
    { name: 'GitHub', href: FACTS.profiles[1] },
    { name: 'LinkedIn', href: FACTS.profiles[2] },
];

const COPY = {
    it: {
        title: `Chi è ${FACTS.founder.name}, la persona dietro Pionio | Pionio`,
        description: `${FACTS.founder.name}, base Bologna: disegna e costruisce siti web, firma il lavoro generativo con Sintetico e costruisce piccoli strumenti. Come lavora e con cosa.`,
        label: 'Chi sono',
        h1: 'Pionio sono io.',
        intro: `Mi chiamo ${FACTS.founder.name} e lavoro da Bologna. Pionio è il nome sotto cui faccio tre mestieri: siti web, immagini sintetiche e piccoli strumenti per il web. Dal primo disegno all'ultima riga di codice, trovi sempre la stessa persona.`,
        role: FACTS.founder.role.it,
        photoAlt: `${FACTS.founder.name}, la persona dietro Pionio`,
        craftsTitle: 'Cosa faccio',
        crafts: [
            {
                name: 'Siti web',
                body: "Disegno il sito e poi lo costruisco, fino all'ultima riga. Siti, negozi online e rifacimenti, per chi lavora in Italia e all'estero.",
                link: 'Servizi e prezzi',
                href: pagePath('services', 'it'),
            },
            {
                name: 'Sintetico',
                body: "La mia etichetta generativa. Costruisco volti che non esistono, dall'osso alla pelle, e li tengo identici da un'immagine all'altra.",
                link: 'sintetico.pionio.it',
                href: FACTS.sintetico.url,
            },
            {
                name: 'Strumenti',
                body: 'Piccoli attrezzi che mi sono serviti e che lascio usare a tutti. Il primo controlla un sito in una ventina di secondi e ti dice cosa lo rallenta. Gratis, senza email.',
                link: 'audit.pionio.it',
                href: FACTS.audit.url,
            },
        ],
        howTitle: 'Come lavoro',
        how: [
            'Lavoro su un sito alla volta, e parli sempre con me. Nessun commerciale in mezzo, nessun passaggio di mano: chi ti risponde è chi la cosa la fa.',
            "Uso l'AI ogni giorno, ma le decisioni le prendo io. Lei esegue, io scelgo dove portare il lavoro e cosa tenere.",
            `Prezzo e data li fissiamo prima di iniziare, e non si spostano. Dopo la messa online restano ${FACTS.supportDays} giorni di assistenza. Codice, dominio e account sono tuoi.`,
        ],
        factsTitle: 'In breve',
        facts: {
            base: 'Base',
            baseValue: 'Bologna, Italia. Lavoro da remoto.',
            languages: 'Lingue',
            languagesValue: 'Italiano e inglese',
            reply: 'Risposta',
            replyValue: `Entro ${FACTS.replyWithinHours} ore, scrivo io`,
            stack: 'Con cosa costruisco',
            profiles: 'Dove trovarmi',
        },
        updated: 'Aggiornata il 22 settembre 2026',
        ctaTitle: 'Parliamone.',
        ctaBody: 'Bastano due righe sul progetto. Ti rispondo con tempi e prezzo.',
        cta: 'Vai ai contatti',
        skip: 'Vai al contenuto',
    },
    en: {
        title: `About ${FACTS.founder.name}, the one person behind Pionio | Pionio`,
        description: `${FACTS.founder.name}, based in Bologna, Italy: designs and builds websites, signs generative work as Sintetico and makes small web tools. How he works and with what.`,
        label: 'About',
        h1: 'I am Pionio.',
        intro: `My name is ${FACTS.founder.name} and I work from Bologna, Italy. Pionio is the name I use for three crafts: websites, synthetic images and small tools for the web. From the first drawing to the last line of code, you deal with the same person.`,
        role: FACTS.founder.role.en,
        photoAlt: `${FACTS.founder.name}, the person behind Pionio`,
        craftsTitle: 'What I do',
        crafts: [
            {
                name: 'Websites',
                body: 'I design the site, then I build it, down to the last line. Websites, online shops and redesigns, for clients in Italy and abroad.',
                link: 'Services and prices',
                href: pagePath('services', 'en'),
            },
            {
                name: 'Sintetico',
                body: "My generative label. I build faces that don't exist, from the bone out, and keep them the same from one image to the next.",
                link: 'sintetico.pionio.it',
                href: FACTS.sintetico.url,
            },
            {
                name: 'Tools',
                body: "Small tools I needed and leave open for anyone. The first one checks a site in about twenty seconds and tells you what slows it down. Free, no email. It's in Italian for now.",
                link: 'audit.pionio.it',
                href: FACTS.audit.url,
            },
        ],
        howTitle: 'How I work',
        how: [
            'I work on one site at a time, and you always talk to me. No salesperson in between, no hand-offs: whoever answers you is whoever makes the thing.',
            'I use AI every day, but I make the calls. It executes; I decide where the work goes and what stays.',
            `We fix the price and the date before we start, and they don't move. After launch you get ${FACTS.supportDays} days of support. The code, the domain and the accounts are yours.`,
        ],
        factsTitle: 'In short',
        facts: {
            base: 'Based in',
            baseValue: 'Bologna, Italy. I work remotely.',
            languages: 'Languages',
            languagesValue: 'Italian and English',
            reply: 'Reply',
            replyValue: `Within ${FACTS.replyWithinHours} hours, from me`,
            stack: 'What I build with',
            profiles: 'Find me',
        },
        updated: 'Updated 22 September 2026',
        ctaTitle: "Let's talk.",
        ctaBody: 'Two lines about the project are enough. I reply with timing and a price.',
        cta: 'Go to contact',
        skip: 'Skip to content',
    },
};

export default function AboutPage() {
    const { locale } = useLanguage();
    const c = COPY[locale];
    const path = pagePath('about', locale);
    const url = absoluteUrl(path);

    const profilePage = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        inLanguage: locale,
        dateModified: UPDATED,
        isPartOf: { '@id': IDS.website },
        mainEntity: { '@id': IDS.person },
    };
    const crumbs = breadcrumbs([
        { name: 'Home', path: pagePath('home', locale) },
        { name: c.label, path },
    ]);

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={c.title} description={c.description}>
                <script type="application/ld+json">{JSON.stringify(profilePage)}</script>
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
                <div className="max-w-[1200px] mx-auto flex flex-col gap-24 md:gap-32">
                    {/* The one moment of motion on the page: the name arrives, the face follows. */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-end">
                        <m.div
                            initial={{ y: 24 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-8 flex flex-col gap-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-forest-500/50" />
                                <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{c.label}</span>
                            </div>
                            <h1 className="text-[clamp(3.25rem,8.5vw,7.5rem)] font-sans tracking-tighter text-white leading-[0.95] text-balance">
                                {c.h1}
                            </h1>
                            <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light max-w-[36ch]">{c.intro}</p>
                        </m.div>

                        <m.figure
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="md:col-span-4 md:col-start-9 flex flex-col gap-4 max-w-sm w-full"
                        >
                            <div className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900">
                                <img
                                    src={FACTS.founder.photo}
                                    alt={c.photoAlt}
                                    width={1000}
                                    height={1000}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-[filter] duration-700"
                                />
                            </div>
                            <figcaption className="flex flex-col gap-1">
                                <span className="text-white text-lg tracking-tight">{FACTS.founder.name}</span>
                                <span className="text-zinc-500 text-sm">{c.role}</span>
                            </figcaption>
                        </m.figure>
                    </section>

                    <section aria-labelledby="about-crafts" className="flex flex-col gap-10">
                        <h2 id="about-crafts" className="text-3xl md:text-5xl tracking-tight text-white">
                            {c.craftsTitle}
                        </h2>
                        <ul className="flex flex-col">
                            {c.crafts.map((craft) => {
                                const external = craft.href.startsWith('http');
                                const linkClass =
                                    'text-forest-400 hover:text-forest-300 underline decoration-forest-500/40 underline-offset-4 hover:decoration-forest-300 transition-colors';
                                return (
                                    <li
                                        key={craft.name}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 py-8 border-t border-white/10 last:border-b"
                                    >
                                        <h3 className="md:col-span-3 text-xl md:text-2xl text-white tracking-tight">{craft.name}</h3>
                                        <p className="md:col-span-6 text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-[60ch]">
                                            {craft.body}
                                        </p>
                                        <div className="md:col-span-3 md:text-right text-base">
                                            {external ? (
                                                <a
                                                    href={craft.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => track('nav_click', { target: `about_${craft.link}`, locale })}
                                                    className={linkClass}
                                                >
                                                    {craft.link}
                                                </a>
                                            ) : (
                                                <Link to={craft.href} className={linkClass}>
                                                    {craft.link}
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section aria-labelledby="about-how" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                        <h2 id="about-how" className="md:col-span-3 text-3xl md:text-5xl tracking-tight text-white">
                            {c.howTitle}
                        </h2>
                        <div className="md:col-span-7 md:col-start-5 flex flex-col gap-6 text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
                            {c.how.map((p) => (
                                <p key={p} className="max-w-[58ch]">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* The facts an engine can quote, as a real definition list. */}
                    <section aria-labelledby="about-facts" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                        <div className="md:col-span-3 flex flex-col gap-3">
                            <h2 id="about-facts" className="text-3xl md:text-5xl tracking-tight text-white">
                                {c.factsTitle}
                            </h2>
                            <p className="text-zinc-500 text-sm">{c.updated}</p>
                        </div>
                        <dl className="md:col-span-7 md:col-start-5 grid grid-cols-1 sm:grid-cols-[minmax(0,12rem)_1fr] gap-x-8 text-base md:text-lg">
                            <dt className="pt-5 sm:pb-5 text-zinc-500 border-t border-white/10">{c.facts.base}</dt>
                            <dd className="pb-5 sm:pt-5 text-white sm:border-t border-white/10">{c.facts.baseValue}</dd>
                            <dt className="pt-5 sm:pb-5 text-zinc-500 border-t border-white/10">{c.facts.languages}</dt>
                            <dd className="pb-5 sm:pt-5 text-white sm:border-t border-white/10">{c.facts.languagesValue}</dd>
                            <dt className="pt-5 sm:pb-5 text-zinc-500 border-t border-white/10">{c.facts.reply}</dt>
                            <dd className="pb-5 sm:pt-5 text-white sm:border-t border-white/10">
                                {c.facts.replyValue},{' '}
                                <a href={`mailto:${FACTS.email}`} className="text-forest-400 hover:text-forest-300 transition-colors">
                                    {FACTS.email}
                                </a>
                            </dd>
                            <dt className="pt-5 sm:pb-5 text-zinc-500 border-t border-white/10">{c.facts.stack}</dt>
                            <dd className="pb-5 sm:pt-5 text-white sm:border-t border-white/10">{STACK.join(', ')}</dd>
                            <dt className="pt-5 sm:pb-5 text-zinc-500 border-t border-white/10">{c.facts.profiles}</dt>
                            <dd className="pb-5 sm:pt-5 text-white sm:border-t border-white/10 flex flex-wrap gap-x-5 gap-y-2">
                                {PROFILES.map((p) => (
                                    <a
                                        key={p.name}
                                        href={p.href}
                                        target="_blank"
                                        rel="noopener noreferrer me"
                                        onClick={() => track('social_click', { network: p.name.toLowerCase(), locale })}
                                        className="text-forest-400 hover:text-forest-300 transition-colors"
                                    >
                                        {p.name}
                                    </a>
                                ))}
                            </dd>
                        </dl>
                    </section>

                    <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-white/10 pt-16">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl md:text-6xl tracking-tight text-white">{c.ctaTitle}</h2>
                            <p className="text-zinc-300 text-lg md:text-xl font-light max-w-[44ch]">{c.ctaBody}</p>
                        </div>
                        <Link
                            to={pagePath('contact', locale)}
                            onClick={() => track('cta_contact_click', { source: 'about_page', locale })}
                            className="self-start md:self-auto inline-flex items-center px-7 py-4 rounded-full bg-forest-600 hover:bg-forest-500 text-white text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-400"
                        >
                            {c.cta}
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
