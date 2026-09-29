import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { faq } from '../data';

export default function Domande() {
    const [aperta, setAperta] = useState<number | null>(null);

    return (
        <section id="domande" className="scroll-mt-20 border-y border-inchiostro/12 bg-carta-cupa/60 py-24 md:py-36">
            <div className="bordo grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <span className="rubrica">05 — Domande</span>
                    <h2 className="titolone mt-5 text-[clamp(2.2rem,5.4vw,3.8rem)]">
                        Quelle che ci fanno al telefono
                    </h2>
                    <p className="mt-6 max-w-sm leading-relaxed text-tenue">
                        Se la vostra non è qui, chiamate pure: rispondere a una domanda non è
                        un'attività che fatturiamo.
                    </p>
                </div>

                <ul className="border-t border-inchiostro/15">
                    {faq.map((f, i) => {
                        const attiva = aperta === i;
                        return (
                            <li key={f.domanda} className="border-b border-inchiostro/15">
                                <button
                                    type="button"
                                    onClick={() => setAperta(attiva ? null : i)}
                                    aria-expanded={attiva}
                                    className="flex w-full items-start justify-between gap-8 py-6 text-left"
                                >
                                    <h3 className="font-display text-[clamp(1.15rem,2.1vw,1.55rem)] leading-snug tracking-tight">
                                        {f.domanda}
                                    </h3>
                                    <span
                                        aria-hidden="true"
                                        className={`mt-1 shrink-0 text-ottone transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                                            attiva ? 'rotate-45' : ''
                                        }`}
                                    >
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {attiva && (
                                        <m.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-7 leading-relaxed text-tenue">{f.risposta}</p>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
