import Guilloche from '../sistema/Guilloche';
import { Rivela } from '../sistema/Rivela';
import { professionisti } from '../data';

export default function Professionisti() {
    return (
        <section id="studio" className="scroll-mt-20 py-24 md:py-36">
            <div className="bordo">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="rubrica">04 — Chi siamo</span>
                        <h2 className="titolone mt-5 text-[clamp(2.2rem,5.4vw,4.2rem)]">
                            Chi seguirà la pratica
                        </h2>
                    </div>
                    <p className="max-w-xs pb-2 text-sm leading-relaxed text-tenue">
                        Al posto delle foto, un sigillo disegnato apposta per ciascuno: nel sito di
                        uno studio vero qui ci sono i ritratti.
                    </p>
                </div>

                <div className="mt-14 grid gap-px bg-inchiostro/12 md:grid-cols-3">
                    {professionisti.map((p, i) => (
                        <Rivela key={p.nome} ritardo={i * 0.09} className="bg-carta">
                            <article className="group flex h-full flex-col p-8 md:p-10">
                                <div className="relative mb-8 aspect-square w-full max-w-[13rem] text-inchiostro/45">
                                    <Guilloche
                                        seme={i * 11 + 2}
                                        className="h-full w-full transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-[24deg]"
                                    />
                                    <span className="font-display absolute inset-0 flex items-center justify-center text-3xl tracking-tight text-inchiostro">
                                        {p.iniziali}
                                    </span>
                                </div>

                                <h3 className="font-display text-2xl leading-tight tracking-tight">{p.nome}</h3>
                                <p className="mt-2 text-sm text-ottone">{p.ruolo}</p>
                                <p className="text-sm text-tenue">{p.aree}</p>
                                <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-tenue">{p.bio}</p>
                            </article>
                        </Rivela>
                    ))}
                </div>

                <p className="mt-8 max-w-2xl text-sm leading-relaxed text-tenue">
                    Tutti iscritti all'Ordine degli Avvocati di Bologna. Lo studio è coperto da
                    polizza professionale come previsto dalla legge 247/2012.
                </p>
            </div>
        </section>
    );
}
