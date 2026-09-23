import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Braci from '../sistema/Braci';
import Sigillo from '../sistema/Sigillo';
import Magnetico from '../sistema/Magnetico';
import { locale, orarioDiOggi } from '../data';

export default function Hero() {
    const rif = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: rif, offset: ['start start', 'end start'] });
    // Il titolo resta indietro rispetto alla pagina: dà profondità senza
    // muovere niente di leggibile.
    const yTitolo = useTransform(scrollYProgress, [0, 1], ['0%', '34%']);
    const opacita = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const oggi = orarioDiOggi();

    return (
        <section ref={rif} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-7">
            {/* La bocca del forno: il calore entra dal basso e tinge mezza pagina. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(78% 52% at 50% 108%, rgb(228 98 47 / 0.42) 0%, rgb(198 71 42 / 0.18) 34%, transparent 68%)',
                }}
            />
            {/* Le colonne della gabbia: struttura appena percepibile, come in stampa. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(90deg, transparent 0 calc(12.5% - 1px), rgb(243 233 218 / 0.05) calc(12.5% - 1px) 12.5%)',
                }}
            />
            <Braci className="pointer-events-none absolute inset-0 h-full w-full" />

            <m.div style={{ opacity: opacita }} className="relative flex flex-1 flex-col justify-end gap-12 md:justify-between md:gap-0">
                <div className="bordo flex items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-oro/70" />
                            <span className="etichetta">Pizzeria a legna · Bologna</span>
                        </div>
                        <p className="mt-4 flex items-center gap-2.5 text-sm text-crema-fioca">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${oggi.chiuso ? 'bg-crema/25' : 'animate-pulse bg-oro'}`}
                            />
                            {oggi.chiuso ? 'Oggi siamo chiusi' : `Aperto oggi, ${oggi.apertura}`}
                        </p>
                    </div>

                    <Sigillo className="h-20 w-20 shrink-0 text-crema md:h-28 md:w-28" />
                </div>

                <m.div style={{ y: yTitolo }} className="bordo">
                    <h1 className="titolone text-[clamp(3.6rem,17vw,17rem)]">
                        <span className="block overflow-hidden pb-[0.05em]">
                            <m.span
                                className="block"
                                initial={{ y: '112%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.25, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Mezzaluna
                            </m.span>
                        </span>
                    </h1>

                    <div className="mt-7 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
                        <m.p
                            className="max-w-md text-[1.05rem] leading-relaxed text-crema-fioca"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            Quarantotto ore di attesa, quattro minuti di forno. Un menu che sta in una
                            pagina e finisce quando finisce l'impasto.
                        </m.p>

                        <m.div
                            className="flex flex-wrap items-center gap-5 md:justify-end"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.85 }}
                        >
                            <Magnetico
                                href="#prenota"
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-crema px-8 py-4 font-medium text-pece"
                            >
                                <span className="relative z-10">Prenota un tavolo</span>
                                <span className="absolute inset-0 origin-bottom scale-y-0 bg-oro transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                            </Magnetico>
                            <a href="#menu" className="text-sm text-crema-fioca underline underline-offset-8 hover:text-crema">
                                Guarda il menu
                            </a>
                        </m.div>
                    </div>
                </m.div>
            </m.div>

            <div className="bordo relative hidden pt-7 md:block">
                <div className="filetto" />
                <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-3 pt-5 text-sm text-crema-fioca">
                    <span className="hidden md:block">{locale.indirizzo}</span>
                    <a href={locale.telefonoHref} className="hover:text-crema">
                        {locale.telefono}
                    </a>
                    <span className="hidden items-center gap-2 lg:flex">
                        Scorri
                        <m.span
                            className="inline-block"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ↓
                        </m.span>
                    </span>
                </div>
            </div>
        </section>
    );
}
