import { ParoleAccese, Rivela } from '../sistema/Rivela';
import { numeri } from '../data';

export default function Manifesto() {
    return (
        <section id="manifesto" className="bordo scroll-mt-24 py-24 md:py-36">
            <Rivela>
                <span className="etichetta">01 — La casa</span>
            </Rivela>

            <ParoleAccese
                className="font-display mt-10 max-w-5xl text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.18] tracking-[-0.02em]"
                testo="Nerina ha acceso questo forno nel 1978, quando via delle Fornaci era ancora mezza campagna. Faceva una pizza sola, con il pomodoro dell'orto, e chiudeva quando finiva l'impasto. Oggi in cucina c'è suo nipote Matteo, che ha cambiato quasi tutto tranne le due cose che contavano."
            />

            <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
                <Rivela className="max-w-md text-[1.02rem] leading-relaxed text-crema-fioca">
                    <p>
                        Il quaderno delle prove sta ancora appeso vicino alla cella. Ogni riga
                        cancellata è una lievitazione andata storta, e sono parecchie. Quello che
                        arriva al tavolo è il risultato di quelle cancellature, non di una ricetta
                        trovata da qualche parte.
                    </p>
                </Rivela>

                <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                    {numeri.map((n, i) => (
                        <Rivela key={n.valore} ritardo={i * 0.08}>
                            <dt className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-oro">
                                {n.valore}
                            </dt>
                            <dd className="mt-3 text-sm leading-relaxed text-crema-fioca">{n.etichetta}</dd>
                        </Rivela>
                    ))}
                </dl>
            </div>
        </section>
    );
}
