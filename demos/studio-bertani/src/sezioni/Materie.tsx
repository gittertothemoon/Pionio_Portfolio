import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Guilloche from '../sistema/Guilloche';
import { aree } from '../data';

/**
 * L'indice delle materie: una riga per voce, come su un frontespizio. Col
 * mouse sopra la riga si accende e il sigillo dietro cambia trama; col clic si
 * apre e mostra cosa c'è dentro. Sul telefono resta un elenco a fisarmonica,
 * che è poi la stessa cosa senza il passaggio del mouse.
 */
export default function Materie() {
    const [aperta, setAperta] = useState<number | null>(0);
    const [sopra, setSopra] = useState<number | null>(null);
    const mostrata = sopra ?? aperta ?? 0;

    return (
        <section id="materie" className="relative scroll-mt-20 overflow-hidden py-24 md:py-36">
            {/* Il sigillo di fondo cambia con la riga guardata. */}
            <div className="pointer-events-none absolute -right-[20%] bottom-[2%] hidden w-[44vw] max-w-[36rem] text-inchiostro/14 lg:block">
                <AnimatePresence mode="wait">
                    <m.div
                        key={mostrata}
                        initial={{ opacity: 0, rotate: -8, scale: 0.94 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 8, scale: 0.94 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Guilloche seme={mostrata * 5 + 3} className="h-full w-full" />
                    </m.div>
                </AnimatePresence>
            </div>

            <div className="bordo relative">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="rubrica">02 — Materie</span>
                        <h2 className="titolone mt-5 text-[clamp(2.2rem,5.4vw,4.2rem)]">Sei, seguite davvero</h2>
                    </div>
                    <p className="max-w-xs pb-2 text-sm leading-relaxed text-tenue">
                        Fuori da queste vi indirizziamo a un collega che le fa tutti i giorni. È più
                        onesto e costa meno anche a voi.
                    </p>
                </div>

                <ul className="mt-14 border-t border-inchiostro/15">
                    {aree.map((a, i) => {
                        const attiva = aperta === i;
                        return (
                            <li key={a.titolo} className="border-b border-inchiostro/15">
                                <button
                                    type="button"
                                    onClick={() => setAperta(attiva ? null : i)}
                                    onPointerEnter={() => setSopra(i)}
                                    onPointerLeave={() => setSopra(null)}
                                    aria-expanded={attiva}
                                    className="group flex w-full items-baseline gap-5 py-6 text-left md:gap-8 md:py-8"
                                >
                                    <span className="w-8 shrink-0 text-xs text-ottone tabular-nums">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className={`font-display flex-1 text-[clamp(1.5rem,3.6vw,2.6rem)] leading-tight tracking-tight transition-colors duration-400 ${
                                            attiva || sopra === i ? 'text-inchiostro' : 'text-inchiostro/55'
                                        }`}
                                    >
                                        {a.titolo}
                                    </span>
                                    <span className="hidden max-w-[22rem] flex-1 text-sm leading-relaxed text-tenue lg:block">
                                        {a.sommario}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`shrink-0 text-ottone transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
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
                                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid gap-6 pb-9 md:grid-cols-2 md:pl-[3.25rem] lg:grid-cols-[1fr_1.4fr]">
                                                <p className="max-w-sm text-sm leading-relaxed text-tenue lg:hidden">
                                                    {a.sommario}
                                                </p>
                                                <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2 lg:col-start-2">
                                                    {a.voci.map((v) => (
                                                        <li key={v} className="flex gap-3 text-sm text-tenue">
                                                            <span className="mt-2.5 h-px w-4 shrink-0 bg-ottone" aria-hidden="true" />
                                                            {v}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
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
