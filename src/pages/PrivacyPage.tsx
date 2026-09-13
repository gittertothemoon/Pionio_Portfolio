import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const mail = (
    <a className="text-forest-400 hover:text-forest-300 underline" href="mailto:pionio.dev@gmail.com">
        pionio.dev@gmail.com
    </a>
);

const garante = (label: string) => (
    <a className="text-forest-400 hover:text-forest-300 underline" href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
        {label}
    </a>
);

// Last revision of the notice (update when the content changes). 13/09/2026: the language preference is no
// longer stored; the only thing kept in the browser is whether the language hint was closed.
const PAGE = {
    it: {
        title: 'Informativa privacy | Pionio',
        description:
            'Come pionio.it tratta i dati personali: chi li tratta, quali dati, perché, per quanto tempo e i tuoi diritti. Nessun cookie di profilazione.',
        label: 'Privacy & Cookie',
        h1: 'Informativa privacy',
        updated: 'Ultimo aggiornamento: 13 settembre 2026',
        skip: 'Vai al contenuto',
        intro:
            'Questa pagina spiega in modo chiaro come tratto i dati personali di chi visita pionio.it o mi scrive tramite il sito. In sintesi: raccolgo solo i dati che mi mandi tu per rispondere alle tue richieste e qualche statistica di traffico anonima. Niente cookie di profilazione, niente vendita di dati a terzi.',
        sections: [
            {
                title: '1. Chi tratta i tuoi dati (titolare)',
                body: (
                    <p>
                        Il titolare del trattamento è <strong>Ivan Pantò</strong>, persona fisica che opera con il marchio <strong>Pionio</strong>. Per
                        qualsiasi questione relativa alla privacy puoi scrivere a {mail}.
                    </p>
                ),
            },
            {
                title: '2. Quali dati raccolgo e perché',
                body: (
                    <>
                        <p>Tratto i tuoi dati personali in due soli casi:</p>
                        <ul className="flex flex-col gap-4 mt-2">
                            <li>
                                <strong className="text-white">Modulo di contatto.</strong> Quando mi scrivi dal form del sito raccolgo i dati che inserisci:
                                nome, email, messaggio e, se li compili, il tipo di progetto, il budget indicativo e come mi hai trovato. Li uso solo per
                                leggere e rispondere alla tua richiesta. Base giuridica: il riscontro alla tua richiesta e l'eventuale avvio di un rapporto
                                su tua iniziativa (art. 6.1.b GDPR).
                            </li>
                            <li>
                                <strong className="text-white">Statistiche di traffico anonime.</strong> Uso Vercel Analytics e Vercel Speed Insights per
                                capire quante persone visitano il sito e quanto è veloce. Sono strumenti <strong>senza cookie</strong>, che non ti
                                identificano e non ti seguono su altri siti: trattano dati in forma aggregata e anonima. Base giuridica: il mio legittimo
                                interesse a mantenere il sito funzionante e migliorarlo (art. 6.1.f GDPR).
                            </li>
                        </ul>
                        <p className="mt-4">
                            Per ragioni tecniche e di sicurezza (protezione anti-spam del modulo) il sistema legge temporaneamente il tuo indirizzo IP,
                            senza conservarlo in modo stabile.
                        </p>
                    </>
                ),
            },
            {
                title: '3. Cookie',
                body: (
                    <p>
                        Il sito <strong>non usa cookie di profilazione né di marketing</strong> e non installa tracciatori pubblicitari di terze parti. Per
                        questo non vedi un banner di consenso: non c'è nulla da consentire. L'unica cosa che il sito salva nel tuo browser è se hai chiuso
                        l'avviso sulla lingua: è una memoria tecnica e non richiede consenso.
                    </p>
                ),
            },
            {
                title: '4. A chi comunico i dati',
                body: (
                    <>
                        <p>Non vendo e non cedo i tuoi dati. Mi appoggio solo a fornitori che agiscono come responsabili del trattamento per far funzionare il sito:</p>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li>
                                <strong className="text-white">Resend</strong>: recapita l'email del modulo di contatto alla mia casella.
                            </li>
                            <li>
                                <strong className="text-white">Vercel</strong>: ospita il sito e fornisce le statistiche anonime.
                            </li>
                        </ul>
                        <p className="mt-4">
                            Questi fornitori hanno sede negli Stati Uniti: l'eventuale trasferimento di dati fuori dall'Unione Europea avviene sulla base
                            delle garanzie previste dal GDPR (clausole contrattuali standard e meccanismi equivalenti).
                        </p>
                    </>
                ),
            },
            {
                title: '5. Per quanto tempo conservo i dati',
                body: (
                    <p>
                        I messaggi che mi mandi restano nella mia casella di posta per il tempo necessario a gestire la tua richiesta ed eventuali contatti
                        successivi; non finiscono in alcun database. Se vuoi che cancelli la nostra conversazione, basta chiedermelo. Le statistiche di
                        traffico sono anonime e aggregate, quindi non riferibili a te.
                    </p>
                ),
            },
            {
                title: '6. I tuoi diritti',
                body: (
                    <p>
                        In ogni momento puoi chiedermi di <strong>accedere</strong> ai tuoi dati, <strong>correggerli</strong>, <strong>cancellarli</strong>,
                        limitarne il trattamento od opporti, e ricevere una copia dei dati che mi hai fornito. Scrivimi a {mail} e ti rispondo. Se ritieni
                        che il trattamento violi la normativa, hai diritto di proporre reclamo al {garante('Garante per la protezione dei dati personali')}.
                    </p>
                ),
            },
            {
                title: '7. Aggiornamenti',
                body: (
                    <p>
                        Se cambierò gli strumenti o il modo in cui tratto i dati, aggiornerò questa pagina e la data di revisione in alto.
                    </p>
                ),
            },
        ],
    },
    en: {
        title: 'Privacy policy | Pionio',
        description:
            'How pionio.it handles personal data: who handles it, what is collected, why, for how long, and your rights. No profiling cookies.',
        label: 'Privacy & Cookies',
        h1: 'Privacy policy',
        updated: 'Last updated: 13 September 2026',
        skip: 'Skip to content',
        intro:
            'This page explains, in plain words, how I handle the personal data of people who visit pionio.it or write to me through it. In short: I collect only what you send me, to answer you, plus some anonymous traffic statistics. No profiling cookies, and no data sold to anyone.',
        sections: [
            {
                title: '1. Who handles your data (controller)',
                body: (
                    <p>
                        The data controller is <strong>Ivan Pantò</strong>, a private individual who works under the name <strong>Pionio</strong>. For
                        anything about privacy, write to {mail}.
                    </p>
                ),
            },
            {
                title: '2. What I collect and why',
                body: (
                    <>
                        <p>I handle your personal data in two cases only:</p>
                        <ul className="flex flex-col gap-4 mt-2">
                            <li>
                                <strong className="text-white">The contact form.</strong> When you write to me through the form I receive what you enter:
                                name, email, message and, if you fill them in, the project type, the budget and how you found me. I use them only to read
                                and answer your request. Legal basis: replying to your request and any work you ask to start (art. 6.1.b GDPR).
                            </li>
                            <li>
                                <strong className="text-white">Anonymous traffic statistics.</strong> I use Vercel Analytics and Vercel Speed Insights to see
                                how many people visit the site and how fast it is. They use <strong>no cookies</strong>, don't identify you and don't follow
                                you to other sites: the data is aggregated and anonymous. Legal basis: my legitimate interest in keeping the site working
                                and improving it (art. 6.1.f GDPR).
                            </li>
                        </ul>
                        <p className="mt-4">
                            For technical and security reasons (spam protection on the form) the system reads your IP address for a moment, without
                            keeping it.
                        </p>
                    </>
                ),
            },
            {
                title: '3. Cookies',
                body: (
                    <p>
                        The site uses <strong>no profiling or marketing cookies</strong> and installs no third-party advertising trackers, which is why
                        there is no consent banner: there is nothing to consent to. The only thing the site stores in your browser is whether you closed
                        the note about the other language. It is technical and needs no consent.
                    </p>
                ),
            },
            {
                title: '4. Who receives the data',
                body: (
                    <>
                        <p>I don't sell or hand over your data. I rely only on providers who act as data processors to make the site work:</p>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li>
                                <strong className="text-white">Resend</strong>: delivers the contact form email to my inbox.
                            </li>
                            <li>
                                <strong className="text-white">Vercel</strong>: hosts the site and provides the anonymous statistics.
                            </li>
                        </ul>
                        <p className="mt-4">
                            These providers are based in the United States: any transfer of data outside the European Union relies on the safeguards the
                            GDPR provides for (standard contractual clauses and equivalent mechanisms).
                        </p>
                    </>
                ),
            },
            {
                title: '5. How long I keep it',
                body: (
                    <p>
                        The messages you send stay in my inbox for as long as it takes to handle your request and any follow-up; they don't go into any
                        database. If you want me to delete our conversation, just ask. Traffic statistics are anonymous and aggregated, so they can't be
                        traced back to you.
                    </p>
                ),
            },
            {
                title: '6. Your rights',
                body: (
                    <p>
                        At any time you can ask me to <strong>access</strong> your data, <strong>correct</strong> it, <strong>delete</strong> it, restrict
                        or object to its use, and receive a copy of what you gave me. Write to {mail} and I will reply. If you believe the handling breaks
                        the law, you can lodge a complaint with the Italian data protection authority, the{' '}
                        {garante('Garante per la protezione dei dati personali')}.
                    </p>
                ),
            },
            {
                title: '7. Changes',
                body: <p>If I change the tools or the way I handle data, I will update this page and the date at the top.</p>,
            },
        ],
    },
};

export default function PrivacyPage() {
    const { locale } = useLanguage();
    const c = PAGE[locale];

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={c.title} description={c.description} />

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {c.skip}
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <m.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto flex flex-col gap-10"
                >
                    <header className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">{c.label}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]">{c.h1}</h1>
                        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">{c.updated}</p>
                        <p className="text-zinc-300 text-lg leading-relaxed font-light">{c.intro}</p>
                    </header>

                    {c.sections.map((s) => (
                        <Section key={s.title} title={s.title}>
                            {s.body}
                        </Section>
                    ))}
                </m.div>
            </main>

            <Footer />
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-sans tracking-tight text-white">{title}</h2>
            <div className="text-zinc-300 text-base leading-relaxed font-light [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-zinc-300">{children}</div>
        </section>
    );
}
