import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Guilloche from '../sistema/Guilloche';
import Magnetico from '../sistema/Magnetico';
import { RigheSvelate } from '../sistema/Rivela';
import { studio } from '../data';

export default function Hero() {
    const rif = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: rif, offset: ['start start', 'end start'] });
    const rotazione = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const yTesto = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

    return (
        <section ref={rif} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-7">
            {/* La gabbia a vista: dodici colonne, come su un foglio impaginato. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(90deg, transparent 0 calc(8.333% - 1px), rgb(20 36 58 / 0.055) calc(8.333% - 1px) 8.333%)',
                }}
            />

            {/* Il sigillo esce dal margine destro: è il fermacarte della pagina. */}
            <m.div
                style={{ rotate: rotazione }}
                className="pointer-events-none absolute -top-[6%] -right-[22%] hidden w-[58vw] max-w-[46rem] text-inchiostro/30 lg:block"
            >
                <Guilloche seme={7} className="h-full w-full" />
            </m.div>

            <m.div style={{ y: yTesto }} className="bordo relative flex flex-1 flex-col justify-center">
                <span className="rubrica">Bologna · dal 1994</span>

                <h1 className="titolone mt-8 max-w-[15ch] text-[clamp(2.7rem,7.4vw,6.4rem)]">
                    <RigheSvelate
                        righe={[
                            'Vi diciamo subito',
                            'se avete un caso.',
                            <span key="i" className="text-tenue italic">
                                Anche quando è no.
                            </span>,
                        ]}
                    />
                </h1>

                <m.div
                    className="mt-12 grid max-w-4xl gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <p className="max-w-lg leading-relaxed text-tenue">
                        Tre avvocati, una segreteria e trent'anni di cause in Emilia-Romagna.
                        Preventivo scritto prima di cominciare, un aggiornamento al mese anche
                        quando non succede niente.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <Magnetico
                            href="#contatti"
                            className="group relative overflow-hidden bg-inchiostro px-8 py-4 font-medium text-carta"
                        >
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-inchiostro">
                                Prima consulenza
                            </span>
                            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ottone-vivo transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                        </Magnetico>
                        <a href="#materie" className="text-sm text-tenue underline underline-offset-8 hover:text-inchiostro">
                            Di cosa ci occupiamo
                        </a>
                    </div>
                </m.div>
            </m.div>

            <div className="bordo relative hidden md:block">
                <div className="h-px w-full bg-inchiostro/12" />
                <dl className="flex flex-wrap items-center justify-end gap-x-12 gap-y-2 pt-5 text-sm text-tenue">
                    <div className="flex gap-2">
                        <dt className="sr-only">Sede</dt>
                        <dd>{studio.indirizzo}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="sr-only">Telefono</dt>
                        <dd>
                            <a href={studio.telefonoHref} className="hover:text-inchiostro">
                                {studio.telefono}
                            </a>
                        </dd>
                    </div>
                    <div className="hidden gap-2 lg:flex">
                        <dt className="sr-only">Orari</dt>
                        <dd>{studio.orari}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
