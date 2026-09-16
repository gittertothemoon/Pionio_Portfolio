import { useRef } from 'react';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { Rivela } from '../sistema/Rivela';
import { lievitazione } from '../data';

export default function Lievitazione() {
    const rif = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: rif, offset: ['start 62%', 'end 82%'] });
    const linea = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
    // Il titolo laterale respira mentre la colonna scorre: si sposta appena.
    const yTitolo = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section id="lievito" ref={rif} className="scroll-mt-24 border-t border-crema/10 py-28 md:py-40">
            <div className="bordo grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <m.div style={{ y: yTitolo }}>
                        <span className="etichetta">03 — Il tempo</span>
                        <h2 className="titolone mt-5 text-[clamp(2.6rem,8vw,6rem)]">
                            48 ore
                            <span className="block text-brace italic">di niente</span>
                        </h2>
                        <p className="mt-7 max-w-sm leading-relaxed text-crema-fioca">
                            La parte difficile di questo mestiere non è fare le cose. È aspettare
                            senza toccarle. Ecco cosa succede fra l'impasto e il tavolo.
                        </p>
                    </m.div>
                </div>

                <ol className="relative pl-10 md:pl-14">
                    {/* Il binario e la parte già percorsa. */}
                    <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-crema/12 md:left-[9px]" />
                    <m.span
                        aria-hidden="true"
                        style={{ scaleY: linea }}
                        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-oro md:left-[9px]"
                    />

                    {lievitazione.map((t, i) => (
                        <li key={t.ora} className="relative pb-14 last:pb-0">
                            <Rivela ritardo={0.04 * i}>
                                <span
                                    aria-hidden="true"
                                    className="absolute top-2 -left-10 h-[11px] w-[11px] rounded-full border border-oro bg-pece md:-left-14 md:h-[19px] md:w-[19px]"
                                />
                                <span className="etichetta text-oro">{t.ora}</span>
                                <h3 className="font-display mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight tracking-tight">
                                    {t.titolo}
                                </h3>
                                <p className="mt-3 max-w-xl leading-relaxed text-crema-fioca">{t.testo}</p>
                            </Rivela>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
