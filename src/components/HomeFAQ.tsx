import { m } from 'framer-motion';

// Entity-anchoring FAQ for the home page: the exact natural-language questions
// search and AI engines receive about Pionio. Visible on the page AND emitted as
// FAQPage JSON-LD (built from this same array in Home.tsx) so the two never drift.
export const homeFaq: { q: string; a: string }[] = [
    {
        q: 'Chi è Pionio?',
        a: "Pionio è lo studio di web design di Ivan Panto, un freelance con sede a Bologna. Progetto e sviluppo siti, e-commerce e applicazioni web su misura — un progetto alla volta, codice mio, AI dove ha senso.",
    },
    {
        q: 'Dove ha sede Pionio?',
        a: 'A Bologna, in Italia. Lavoro con clienti in tutta Italia e da remoto.',
    },
    {
        q: 'Quanto costa un sito con Pionio?',
        a: 'Un sito vetrina ben fatto parte da circa 2.500€; un progetto più articolato, con più pagine e funzionalità su misura, da 5.000€ in su. Dipende da contenuti, complessità e tempi.',
    },
    {
        q: 'In quanto tempo rispondete a una richiesta?',
        a: 'Entro 24 ore, con una valutazione realistica del progetto e una stima trasparente dei prossimi passi.',
    },
    {
        q: 'Lavorate da remoto?',
        a: 'Sì. Lavoro da remoto con clienti in tutta Italia, e di persona quando ha senso nella zona di Bologna.',
    },
];

export function HomeFAQ() {
    return (
        <section id="faq" className="w-full bg-zinc-950 px-6 md:px-12 lg:px-24 py-24 md:py-32">
            <div className="max-w-[900px] mx-auto flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                    <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">FAQ</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white leading-[1.05]">
                    Domande frequenti.
                </h2>
                <div className="flex flex-col gap-4">
                    {homeFaq.map((f, i) => (
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
