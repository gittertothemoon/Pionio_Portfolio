import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { metodo } from '../data';

/**
 * Tre fogli che si accatastano. Ognuno si ferma un po' più in basso del
 * precedente e quello sotto si rimpicciolisce appena: la pila si legge come una
 * pratica sulla scrivania, non come tre riquadri affiancati.
 */
export default function Metodo() {
    return (
        <section id="metodo" data-scuro className="scroll-mt-20 bg-inchiostro py-24 text-carta md:py-36">
            <div className="bordo">
                <span className="rubrica text-ottone-vivo">03 — Metodo</span>
                <h2 className="titolone mt-5 max-w-[16ch] text-[clamp(2.2rem,5.4vw,4.2rem)]">
                    Tre cose che mettiamo per iscritto
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-carta/60">
                    La parte peggiore di avere un avvocato, per la maggior parte delle persone, non è
                    il costo: è non sapere mai a che punto si è.
                </p>
            </div>

            <div className="bordo mt-16">
                {metodo.map((m, i) => (
                    <Foglio key={m.passo} indice={i} totale={metodo.length}>
                        <div className="grid gap-6 border-t border-carta/25 bg-inchiostro pt-8 md:grid-cols-[auto_1fr] md:gap-14">
                            <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-ottone-vivo">
                                {m.passo}
                            </span>
                            <div>
                                <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight tracking-tight">
                                    {m.titolo}
                                </h3>
                                <p className="mt-4 max-w-2xl leading-relaxed text-carta/60">{m.testo}</p>
                            </div>
                        </div>
                    </Foglio>
                ))}
            </div>
        </section>
    );
}

function Foglio({
    indice,
    totale,
    children,
}: {
    indice: number;
    totale: number;
    children: React.ReactNode;
}) {
    const rif = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: rif, offset: ['start 22%', 'end 42%'] });
    const scala = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
    const opacita = useTransform(scrollYProgress, [0, 1], [1, indice === totale - 1 ? 1 : 0.45]);

    return (
        <div ref={rif} className="sticky pb-10 md:pb-14" style={{ top: `${7 + indice * 4.5}rem` }}>
            <m.div style={{ scale: scala, opacity: opacita, transformOrigin: 'top center' }}>
                {children}
            </m.div>
        </div>
    );
}
