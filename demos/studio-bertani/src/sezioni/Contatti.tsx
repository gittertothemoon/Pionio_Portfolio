import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { RigheSvelate } from '../sistema/Rivela';
import { aree, studio } from '../data';

export default function Contatti() {
    const [nome, setNome] = useState<string | null>(null);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        // Demo: nessuna chiamata di rete. Nel sito vero da qui parte l'email alla
        // segreteria e la ricevuta a chi ha compilato.
        setNome(String(d.get('nome') ?? ''));
    }

    return (
        <section id="contatti" className="bordo scroll-mt-20 py-24 md:py-36">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
                <div>
                    <span className="rubrica">06 — Contatti</span>
                    <h2 className="titolone mt-5 text-[clamp(2.2rem,5.4vw,4rem)]">
                        <RigheSvelate righe={['Prima', <em key="e" className="text-tenue">consulenza</em>]} />
                    </h2>
                    <p className="mt-7 max-w-sm leading-relaxed text-tenue">
                        Quarantacinque minuti, in studio o in videochiamata, senza costo. Scrivete in
                        due righe di cosa si tratta: vi richiamiamo entro un giorno lavorativo.
                    </p>

                    <dl className="mt-10 space-y-5 border-t border-inchiostro/15 pt-8 text-sm">
                        {[
                            { t: 'Sede', v: studio.indirizzo },
                            { t: 'Telefono', v: studio.telefono, href: studio.telefonoHref },
                            { t: 'Email', v: studio.email },
                            { t: 'PEC', v: studio.pec },
                            { t: 'Segreteria', v: studio.orari },
                        ].map((r) => (
                            <div key={r.t} className="flex gap-6">
                                <dt className="w-24 shrink-0 text-xs tracking-[0.14em] text-ottone uppercase">{r.t}</dt>
                                <dd className="text-tenue">
                                    {r.href ? (
                                        <a href={r.href} className="text-inchiostro underline underline-offset-4">
                                            {r.v}
                                        </a>
                                    ) : (
                                        r.v
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <AnimatePresence mode="wait">
                    {nome !== null ? (
                        <m.div
                            key="fatto"
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col justify-center border-t border-ottone pt-10"
                        >
                            <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight">
                                Richiesta ricevuta{nome ? `, ${nome}` : ''}.
                            </h3>
                            <p className="mt-4 max-w-md leading-relaxed text-tenue">
                                La segreteria vi richiama entro un giorno lavorativo per fissare
                                l'appuntamento.
                            </p>
                            <p className="mt-8 max-w-md border-l border-inchiostro/20 pl-5 text-sm leading-relaxed text-tenue">
                                <strong className="font-semibold text-inchiostro">Questa è una demo:</strong>{' '}
                                non è partita nessuna email e non è stato salvato niente. Nel sito vero
                                il modulo scrive alla segreteria e manda la ricevuta a chi ha compilato.
                            </p>
                            <button
                                type="button"
                                onClick={() => setNome(null)}
                                className="mt-8 self-start text-sm text-tenue underline underline-offset-8 hover:text-inchiostro"
                            >
                                Provalo di nuovo
                            </button>
                        </m.div>
                    ) : (
                        <m.form
                            key="modulo"
                            onSubmit={onSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
                        >
                            <Campo label="Nome e cognome" name="nome" autoComplete="name" required />
                            <Campo label="Telefono" name="telefono" type="tel" autoComplete="tel" required />
                            <Campo label="Email" name="email" type="email" autoComplete="email" required className="sm:col-span-2" />

                            <div className="flex flex-col gap-2.5 sm:col-span-2">
                                <label htmlFor="materia" className="text-xs tracking-[0.14em] text-ottone uppercase">
                                    Di cosa si tratta
                                </label>
                                <select id="materia" name="materia" defaultValue={aree[0].titolo} className={stileCampo}>
                                    {aree.map((a) => (
                                        <option key={a.titolo}>{a.titolo}</option>
                                    ))}
                                    <option>Altro / non saprei</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2.5 sm:col-span-2">
                                <label htmlFor="messaggio" className="text-xs tracking-[0.14em] text-ottone uppercase">
                                    Due righe sulla situazione
                                </label>
                                <textarea
                                    id="messaggio"
                                    name="messaggio"
                                    rows={3}
                                    className={stileCampo}
                                    placeholder="Bastano l'oggetto e, se c'è, una scadenza."
                                />
                            </div>

                            <label className="flex items-start gap-3 text-sm leading-relaxed text-tenue sm:col-span-2">
                                <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#14243a]" />
                                <span>
                                    Ho letto l'informativa privacy e acconsento al trattamento dei dati per
                                    essere ricontattato.
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="group relative overflow-hidden border border-inchiostro px-8 py-4 text-left font-medium sm:col-span-2"
                            >
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-carta">
                                    Richiedi il primo incontro →
                                </span>
                                <span className="absolute inset-0 origin-left scale-x-0 bg-inchiostro transition-transform duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                            </button>
                            <p className="text-xs text-tenue/80 sm:col-span-2">
                                Demo: il modulo non invia nulla, i dati restano nel browser.
                            </p>
                        </m.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

const stileCampo =
    'w-full border-0 border-b border-inchiostro/25 bg-transparent pb-3 text-lg text-inchiostro transition-colors focus:border-ottone focus:outline-none placeholder:text-tenue/50';

function Campo({
    label,
    name,
    className = '',
    ...resto
}: { label: string; name: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={`flex flex-col gap-2.5 ${className}`}>
            <label htmlFor={name} className="text-xs tracking-[0.14em] text-ottone uppercase">
                {label}
            </label>
            <input id={name} name={name} className={stileCampo} {...resto} />
        </div>
    );
}
