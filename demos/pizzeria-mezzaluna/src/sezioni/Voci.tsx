import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { recensioni } from '../data';

/**
 * Una citazione alla volta, grande come merita. Tre card affiancate le
 * trasformerebbero in arredamento; da sole si leggono.
 */
export default function Voci() {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((v) => (v + 1) % recensioni.length), 6200);
        return () => clearInterval(t);
    }, []);

    const r = recensioni[i];

    return (
        <section id="voci" className="scroll-mt-24 border-y border-crema/10 bg-cenere py-28 md:py-40">
            <div className="bordo">
                <span className="etichetta">04 — Voci</span>

                <div className="mt-12 min-h-[15rem] md:min-h-[13rem]">
                    <AnimatePresence mode="wait">
                        <m.figure
                            key={r.autore}
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <blockquote className="font-display max-w-4xl text-[clamp(1.5rem,3.8vw,2.9rem)] leading-[1.22] tracking-[-0.02em] text-balance">
                                «{r.testo}»
                            </blockquote>
                            <figcaption className="mt-8 flex items-center gap-4 text-sm text-crema-fioca">
                                <span className="h-px w-10 bg-oro" />
                                <span className="text-crema">{r.autore}</span>
                                <span>{r.contesto}</span>
                            </figcaption>
                        </m.figure>
                    </AnimatePresence>
                </div>

                <div className="mt-10 flex gap-2.5">
                    {recensioni.map((rec, k) => (
                        <button
                            key={rec.autore}
                            type="button"
                            onClick={() => setI(k)}
                            aria-label={`Vai alla recensione di ${rec.autore}`}
                            aria-current={k === i}
                            className="group py-3"
                        >
                            <span
                                className={`block h-px w-14 transition-colors duration-500 ${
                                    k === i ? 'bg-oro' : 'bg-crema/25 group-hover:bg-crema/60'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
