import { ParoleAccese, Rivela } from '../sistema/Rivela';
import Contatore from '../sistema/Contatore';
import { manifesto, numeri } from '../data';

export default function Manifesto() {
    return (
        <section className="border-t border-inchiostro/12 bg-carta-cupa/60 py-24 md:py-36">
            <div className="bordo">
                <Rivela>
                    <span className="rubrica">01 — Lo studio</span>
                </Rivela>

                <ParoleAccese
                    className="font-display mt-10 max-w-5xl text-[clamp(1.5rem,3.7vw,2.9rem)] leading-[1.24] tracking-[-0.018em]"
                    testo={manifesto}
                />

                <dl className="mt-20 grid gap-x-8 gap-y-12 border-t border-inchiostro/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
                    {numeri.map((n, i) => (
                        <Rivela key={n.etichetta} ritardo={i * 0.07}>
                            <dt className="font-display text-[clamp(2.8rem,5.5vw,4.2rem)] leading-none">
                                <Contatore a={n.a} suffisso={n.suffisso} />
                            </dt>
                            <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-tenue">{n.etichetta}</dd>
                        </Rivela>
                    ))}
                </dl>
            </div>
        </section>
    );
}
