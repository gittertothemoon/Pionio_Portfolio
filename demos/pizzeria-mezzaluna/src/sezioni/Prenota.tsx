import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { RigheSvelate } from '../sistema/Rivela';
import { locale } from '../data';

const oggi = new Date().toISOString().slice(0, 10);
const fasce = ['12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

export default function Prenota() {
    const [esito, setEsito] = useState<{ nome: string; data: string; ora: string } | null>(null);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        // Demo: nessuna chiamata di rete. Nel sito vero da qui parte l'email al
        // locale e l'SMS di conferma al cliente.
        setEsito({ nome: String(d.get('nome') ?? ''), data: String(d.get('data') ?? ''), ora: String(d.get('ora') ?? '') });
    }

    return (
        <section id="prenota" className="bordo scroll-mt-24 py-28 md:py-40">
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
                <div>
                    <span className="etichetta">05 — Il tavolo</span>
                    <h2 className="titolone mt-5 text-[clamp(2.6rem,8vw,6rem)]">
                        <RigheSvelate righe={['Tenete', <em key="e" className="text-brace">il tavolo</em>]} />
                    </h2>
                    <p className="mt-7 max-w-sm leading-relaxed text-crema-fioca">
                        Rispondiamo entro un'ora negli orari di apertura. Per più di otto persone, o
                        per la sala grande, è meglio una telefonata.
                    </p>
                    <a
                        href={locale.telefonoHref}
                        className="font-display mt-8 inline-block text-[clamp(1.6rem,3.5vw,2.4rem)] text-oro transition-opacity hover:opacity-70"
                    >
                        {locale.telefono}
                    </a>
                </div>

                <AnimatePresence mode="wait">
                    {esito ? (
                        <m.div
                            key="fatto"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col justify-center border-t border-oro/40 pt-10"
                        >
                            <h3 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight">
                                Ci siamo{esito.nome ? `, ${esito.nome}` : ''}.
                            </h3>
                            <p className="mt-4 max-w-md leading-relaxed text-crema-fioca">
                                Tavolo segnato per il {esito.data || 'giorno scelto'} alle {esito.ora}. Vi
                                arriva una conferma via SMS.
                            </p>
                            <p className="mt-8 max-w-md border-l border-crema/20 pl-5 text-sm leading-relaxed text-crema-fioca">
                                <strong className="font-semibold text-crema">Questa è una demo:</strong> non è
                                partita nessuna email e non è stato salvato niente. Nel sito vero questo
                                modulo scrive al locale e manda l'SMS al cliente.
                            </p>
                            <button
                                type="button"
                                onClick={() => setEsito(null)}
                                className="mt-8 self-start text-sm text-crema-fioca underline underline-offset-8 hover:text-crema"
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
                            className="grid gap-x-10 gap-y-7 sm:grid-cols-2"
                        >
                            <Campo label="Nome e cognome" name="nome" autoComplete="name" required />
                            <Campo label="Telefono" name="telefono" type="tel" autoComplete="tel" required />
                            <Campo label="Giorno" name="data" type="date" min={oggi} defaultValue={oggi} required />

                            <Scelta label="Ora" name="ora" valori={fasce} predefinito="20:00" />
                            <Scelta
                                label="Quanti siete"
                                name="persone"
                                valori={['1', '2', '3', '4', '5', '6', '7', '8 o più']}
                                predefinito="2"
                            />
                            <Campo label="Note (allergie, seggiolone, cane…)" name="note" />

                            <button
                                type="submit"
                                className="group relative mt-4 overflow-hidden rounded-full border border-crema/25 px-8 py-4 text-left font-medium sm:col-span-2"
                            >
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-pece">
                                    Manda la richiesta →
                                </span>
                                <span className="absolute inset-0 origin-left scale-x-0 bg-oro transition-transform duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                            </button>
                            <p className="text-xs text-crema-fioca/70 sm:col-span-2">
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
    'border-0 border-b border-crema/20 bg-transparent pb-3 text-lg text-crema transition-colors focus:border-oro focus:outline-none';

function Campo({ label, name, ...resto }: { label: string; name: string } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-2.5">
            <label htmlFor={name} className="etichetta">
                {label}
            </label>
            <input id={name} name={name} className={`${stileCampo} [color-scheme:dark]`} {...resto} />
        </div>
    );
}

function Scelta({
    label,
    name,
    valori,
    predefinito,
}: {
    label: string;
    name: string;
    valori: string[];
    predefinito: string;
}) {
    return (
        <div className="flex flex-col gap-2.5">
            <label htmlFor={name} className="etichetta">
                {label}
            </label>
            <select id={name} name={name} defaultValue={predefinito} className={stileCampo}>
                {valori.map((v) => (
                    <option key={v} className="bg-cenere">
                        {v}
                    </option>
                ))}
            </select>
        </div>
    );
}
