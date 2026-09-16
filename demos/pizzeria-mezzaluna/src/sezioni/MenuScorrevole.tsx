import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { menu } from '../data';

/**
 * Il menu non si scorre in verticale come una lista della spesa: la sezione si
 * inchioda e le schede passano di lato, una alla volta, come le pizze sul
 * bancone. La corsa è misurata sul contenuto vero, non stimata in percentuale,
 * così funziona con qualsiasi numero di voci e a qualsiasi larghezza.
 */
export default function MenuScorrevole() {
    const sezione = useRef<HTMLElement>(null);
    const nastro = useRef<HTMLDivElement>(null);
    const [corsa, setCorsa] = useState(0);

    useEffect(() => {
        const misura = () => {
            const n = nastro.current;
            if (!n) return;
            setCorsa(Math.max(0, n.scrollWidth - window.innerWidth));
        };
        misura();
        window.addEventListener('resize', misura);
        return () => window.removeEventListener('resize', misura);
    }, []);

    const { scrollYProgress } = useScroll({ target: sezione, offset: ['start start', 'end end'] });
    const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -corsa]), {
        stiffness: 260,
        damping: 40,
        mass: 0.4,
    });
    const avanzamento = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section
            id="menu"
            ref={sezione}
            className="relative scroll-mt-0"
            style={{ height: `calc(100vh + ${corsa}px)` }}
        >
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <div className="bordo flex items-end justify-between gap-6 pb-10">
                    <div>
                        <span className="etichetta">02 — Il menu</span>
                        <h2 className="titolone mt-4 text-[clamp(2.4rem,7vw,5.5rem)]">Quello che c'è</h2>
                    </div>
                    <p className="hidden max-w-xs pb-2 text-sm leading-relaxed text-crema-fioca md:block">
                        Cambia ogni mese, quando cambia il banco del mercato. Se una cosa finisce, è
                        finita davvero.
                    </p>
                </div>

                <m.div ref={nastro} style={{ x }} className="flex w-max gap-5 px-6 md:gap-7 md:px-12">
                    {menu.map((p, i) => (
                        <article
                            key={p.nome}
                            className="group relative flex w-[74vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-crema/12 bg-cenere p-7 transition-colors duration-500 hover:border-oro/40 sm:w-[24rem] md:p-9"
                            style={{ height: 'min(28rem, 52vh)' }}
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                                style={{ background: 'radial-gradient(circle, rgb(228 98 47 / .55), transparent 70%)' }}
                            />

                            <div className="relative flex flex-1 flex-col">
                                <span className="etichetta text-crema/40">{String(i + 1).padStart(2, '0')}</span>
                                <Disco seme={i} />
                            </div>

                            <div className="relative">
                                <h3 className="font-display text-[1.7rem] leading-[1.05] tracking-tight">{p.nome}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-crema-fioca">{p.descrizione}</p>

                                <div className="mt-6 flex items-end justify-between gap-4 border-t border-crema/10 pt-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {p.etichette?.map((e) => (
                                            <span
                                                key={e}
                                                className="rounded-full border border-crema/15 px-2.5 py-1 text-[0.68rem] text-crema-fioca"
                                            >
                                                {e}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="font-display text-2xl leading-none text-oro tabular-nums">
                                        {p.prezzo}
                                        <span className="text-base">,00 €</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </m.div>

                <div className="bordo mt-10">
                    <div className="relative h-px w-full bg-crema/12">
                        <m.span style={{ width: avanzamento }} className="absolute inset-y-0 left-0 bg-oro" />
                    </div>
                    <p className="mt-4 text-xs text-crema-fioca">
                        Per allergeni e intolleranze chiedete in sala: il quaderno degli ingredienti sta
                        accanto alla cassa.
                    </p>
                </div>
            </div>
        </section>
    );
}

/**
 * Un disco diverso per ogni scheda, seminato dall'indice: la disposizione dei
 * condimenti segue l'angolo aureo, che è il motivo per cui non se ne trovano
 * due uguali e nessuno sembra messo a caso.
 */
function Disco({ seme }: { seme: number }) {
    const punti = Array.from({ length: 7 + (seme % 5) }, (_, i) => {
        const a = ((i * 137.5 + seme * 41) * Math.PI) / 180;
        const r = 14 + ((i * 11 + seme * 7) % 38);
        return { x: 100 + Math.cos(a) * r, y: 100 + Math.sin(a) * r, s: 4.5 + ((i + seme) % 4) * 1.6 };
    });

    return (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-[56%] justify-center">
            <svg
                viewBox="0 0 200 200"
                className="w-[78%] max-w-[15rem] opacity-80 transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-100"
                aria-hidden="true"
            >
                <circle cx="100" cy="100" r="92" fill="var(--color-fuligg)" />
                <circle cx="100" cy="100" r="92" fill="none" stroke="var(--color-oro)" strokeOpacity="0.28" />
                <circle cx="100" cy="100" r="76" fill="var(--color-brace)" fillOpacity="0.32" />
                {/* Le bolle del cornicione. */}
                {Array.from({ length: 12 }, (_, k) => {
                    const a = ((k * 30 + seme * 13) * Math.PI) / 180;
                    return (
                        <circle
                            key={k}
                            cx={100 + Math.cos(a) * 84}
                            cy={100 + Math.sin(a) * 84}
                            r={k % 3 === 0 ? 4.5 : 3}
                            fill="var(--color-oro)"
                            fillOpacity="0.32"
                        />
                    );
                })}
                {punti.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={p.s} fill="var(--color-crema)" fillOpacity={0.62 + (i % 3) * 0.12} />
                ))}
            </svg>
        </div>
    );
}
