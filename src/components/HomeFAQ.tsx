import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { Locale } from '../lib/i18n';
import { FACTS } from '../lib/facts';
import { eur, PRICES, type PriceKey } from '../lib/prices';

type QA = { q: string; a: string };

// Entity-anchoring FAQ for the home page: the plain questions search and AI engines receive about Pionio.
// The answers are built from facts.ts and prices.ts, so they can't disagree with the rest of the site, and
// the same list, in the language of the page, is the FAQPage structured data (Home.tsx).
// eslint-disable-next-line react-refresh/only-export-components
export function homeFaq(locale: Locale): QA[] {
    const p = (key: PriceKey) => eur(PRICES[key][locale], locale);
    const w = FACTS.weeks;
    const h = FACTS.replyWithinHours;

    if (locale === 'it') {
        return [
            {
                q: 'Chi è Pionio?',
                a: "Pionio è lo studio di Ivan Pantò: siti web, immagini sintetiche e piccoli strumenti per il web. Una persona sola, dal disegno all'ultima riga di codice. La base è Bologna.",
            },
            {
                q: 'Quanto costa un sito con Pionio?',
                a: `Un sito parte da ${p('site')}, uno con molte pagine o funzioni particolari da ${p('largeSite')}. Un negozio su Shopify parte da ${p('shopify')}, costruito da zero da ${p('shopScratch')}. Sono prezzi di partenza: quello vero lo fissiamo prima di iniziare, e resta quello.`,
            },
            {
                q: 'Quanto costa rifare un sito o costruire uno strumento?',
                a: `Rifare un sito esistente, con migrazione dei contenuti e redirect, parte da ${p('redesign')}. Uno strumento costruito sul tuo lavoro parte da ${p('tool')} per una prima versione che si usa davvero. Un audit SEO tecnico parte da ${p('seoAudit')}.`,
            },
            {
                q: 'Quanto ci vuole per andare online?',
                a: `Dalla prima chiamata al lancio: ${w.site} settimane per un sito, ${w.shop} per un negozio su Shopify, ${w.redesign} per rifare un sito esistente, ${w.tool} per uno strumento. Negozio e rifacimento dipendono da quanto è complesso il lavoro. La variabile più grande sei tu: quanto in fretta arrivano contenuti e risposte.`,
            },
            {
                q: 'In quanto tempo rispondi a una richiesta?',
                a: `Entro ${h} ore, con una risposta chiara: tempi realistici, prezzo trasparente, zero pressioni commerciali.`,
            },
            {
                q: 'Lavori da remoto?',
                a: 'Sempre. La base è Bologna, i clienti non devono esserlo.',
            },
            {
                q: 'Cos’è Sintetico?',
                a: "È l'etichetta con cui firmo il lavoro generativo di Pionio: volti e persone che non esistono, costruiti a strati, con i prompt e gli strumenti per farlo. Lo trovi su sintetico.pionio.it.",
            },
        ];
    }

    return [
        {
            q: 'What is Pionio?',
            a: "Pionio is Ivan Pantò's studio: websites, synthetic images and small tools for the web. One person, from the drawing to the last line of code, based in Bologna, Italy.",
        },
        {
            q: 'What does a website cost with Pionio?',
            a: `For clients outside Italy, a website starts at ${p('site')}, one with many pages or custom features at ${p('largeSite')}. A Shopify store starts at ${p('shopify')}, a shop built from scratch at ${p('shopScratch')}. These are starting prices in euro: we fix the real one before we start, and it stays put.`,
        },
        {
            q: 'What does a redesign or a custom tool cost?',
            a: `Redoing an existing site, with content migration and redirects, starts at ${p('redesign')}. A tool built around your work starts at ${p('tool')} for a first version people actually use. A technical SEO audit starts at ${p('seoAudit')}.`,
        },
        {
            q: 'How long does it take to go live?',
            a: `From the first call to launch: ${w.site} weeks for a website, ${w.shop} for a Shopify store, ${w.redesign} for a redesign, ${w.tool} for a tool. Store and redesign depend on how complex the job is. The biggest variable is you: how fast content and answers come back.`,
        },
        {
            q: 'How quickly do you reply?',
            a: `Within ${h} hours, with a clear answer: realistic timing, a transparent price, no hard sell.`,
        },
        {
            q: 'Can we work in English?',
            a: 'Yes. The first call, the work and the handover can all be in English, at hours that work for Europe. I work remotely; the base is Bologna.',
        },
        {
            q: 'What is Sintetico?',
            a: "It's the label I sign Pionio's generative work with: faces and people who don't exist, built in layers, with the prompts and tools to make them. You can see it at sintetico.pionio.it.",
        },
    ];
}

export function HomeFAQ() {
    const { locale } = useLanguage();
    const faq = homeFaq(locale);

    return (
        <section id="faq" className="w-full bg-zinc-950 px-6 md:px-12 lg:px-24 py-20 md:py-24">
            <div className="max-w-[900px] mx-auto flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                    <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">FAQ</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white leading-[1.05]">
                    {locale === 'it' ? 'Domande frequenti.' : 'Frequently asked questions.'}
                </h2>
                <div className="flex flex-col gap-3">
                    {faq.map((f, i) => (
                        <m.details
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className="group p-5 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] open:bg-white/[0.04]"
                        >
                            <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                                <h3 className="text-white font-sans text-lg md:text-xl">{f.q}</h3>
                                <span className="text-forest-400 font-mono text-xl shrink-0 group-open:rotate-45 transition-transform">
                                    +
                                </span>
                            </summary>
                            <p className="text-zinc-400 leading-relaxed mt-4">{f.a}</p>
                        </m.details>
                    ))}
                </div>
            </div>
        </section>
    );
}
