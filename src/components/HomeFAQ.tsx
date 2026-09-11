import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type QA = { q: string; a: string };

// Entity-anchoring FAQ for the home page: the exact natural-language questions search and AI engines
// receive about Pionio. The Italian list is also the source of the FAQPage JSON-LD (built from this same
// array in Home.tsx), so the page and the structured data never drift. Figures must match the rest of the
// page: prices from section 04, times from 06, the 24 hours from the contact form.
// eslint-disable-next-line react-refresh/only-export-components
export const homeFaq: QA[] = [
    {
        q: 'Chi è Pionio?',
        a: "Pionio è lo studio di Ivan Panto: siti web, immagini sintetiche e piccoli strumenti per il web. Una persona sola, dal disegno all'ultima riga di codice. La base è Bologna.",
    },
    {
        q: 'Quanto costa un sito con Pionio?',
        a: 'Un sito vetrina parte da 2.500 €, un progetto con più pagine o funzioni particolari da 5.000 €, un negozio online da 4.000 €. Sono prezzi di partenza: quello vero lo fissiamo prima di iniziare, e resta quello.',
    },
    {
        q: 'Quanto ci vuole per andare online?',
        a: 'Dalla prima chiamata al lancio, di solito 2–4 settimane per un sito. La variabile più grande sei tu: quanto in fretta arrivano contenuti e risposte.',
    },
    {
        q: 'In quanto tempo rispondi a una richiesta?',
        a: 'Entro 24 ore, con una risposta chiara: tempi realistici, preventivo trasparente, zero pressioni commerciali.',
    },
    {
        q: 'Lavori da remoto?',
        a: 'Sempre. La base è Bologna, i clienti non devono esserlo.',
    },
    {
        q: 'Cos’è Sintetico?',
        a: "È l'etichetta con cui firmo il lavoro generativo di Pionio: volti e persone che non esistono, costruiti a strati, con i prompt e gli strumenti per farlo. Apre presto.",
    },
];

const homeFaqEn: QA[] = [
    {
        q: 'What is Pionio?',
        a: "Pionio is Ivan Panto's studio: websites, synthetic images and small tools for the web. One person, from the drawing to the last line of code. The base is Bologna, Italy.",
    },
    {
        q: 'What does a website cost with Pionio?',
        a: 'A showcase site starts at €2,500, a project with more pages or custom features at €5,000, an online shop at €4,000. These are starting prices: we fix the real one before we start, and it stays put.',
    },
    {
        q: 'How long does it take to go live?',
        a: 'From the first call to launch, usually 2–4 weeks for a website. The biggest variable is you: how fast content and answers come back.',
    },
    {
        q: 'How quickly do you reply?',
        a: 'Within 24 hours, with a clear answer: realistic timing, a transparent quote, no hard sell.',
    },
    {
        q: 'Do you work remotely?',
        a: 'Always. The base is Bologna; clients do not have to be.',
    },
    {
        q: 'What is Sintetico?',
        a: "It's the label I sign Pionio's generative work with: faces and people who don't exist, built in layers, with the prompts and tools to make them. Opening soon.",
    },
];

export function HomeFAQ() {
    const { locale } = useLanguage();
    const faq = locale === 'it' ? homeFaq : homeFaqEn;

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
