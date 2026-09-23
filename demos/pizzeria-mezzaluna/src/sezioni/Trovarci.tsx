import { Rivela } from '../sistema/Rivela';
import { locale, orari } from '../data';

const oggiIndice = (new Date().getDay() + 6) % 7;

export default function Trovarci() {
    return (
        <section id="trovarci" className="scroll-mt-24 border-t border-crema/10 py-28 md:py-40">
            <div className="bordo grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
                <div>
                    <span className="etichetta">06 — Trovarci</span>
                    <h2 className="titolone mt-5 text-[clamp(2.2rem,6vw,4.4rem)]">
                        Via delle
                        <br />
                        Fornaci 12
                    </h2>

                    <div className="mt-10 max-w-md space-y-1 text-crema-fioca">
                        <p>{locale.indirizzo}</p>
                        <p>
                            <a href={locale.telefonoHref} className="text-crema underline underline-offset-8">
                                {locale.telefono}
                            </a>
                        </p>
                        <p>{locale.email}</p>
                    </div>

                    <p className="mt-8 max-w-sm text-sm leading-relaxed text-crema-fioca">
                        Autobus 13 e 19, fermata Fornaci. Parcheggio libero nel cortile sul retro dopo
                        le 19.
                    </p>

                    <a
                        href={locale.mappa}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-block text-sm text-oro underline underline-offset-8 hover:opacity-70"
                    >
                        Apri le indicazioni →
                    </a>
                </div>

                <div>
                    <ul>
                        {orari.map((o, i) => {
                            const oggi = i === oggiIndice;
                            return (
                                <Rivela key={o.giorno} ritardo={i * 0.05}>
                                    <li
                                        className={`flex items-baseline justify-between gap-6 border-b py-5 transition-colors ${
                                            oggi ? 'border-oro/50 text-crema' : 'border-crema/10 text-crema-fioca'
                                        }`}
                                    >
                                        <span className="font-display text-xl tracking-tight">
                                            {o.giorno}
                                            {oggi && <span className="etichetta ml-3 text-oro">oggi</span>}
                                        </span>
                                        <span className="text-right text-sm tabular-nums">{o.apertura}</span>
                                    </li>
                                </Rivela>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
