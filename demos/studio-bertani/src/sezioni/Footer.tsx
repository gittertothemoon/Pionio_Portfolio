import { studio } from '../data';

export default function Footer() {
    return (
        <footer data-scuro className="relative overflow-hidden bg-inchiostro pt-20 text-carta/65">
            <div className="bordo grid gap-12 pb-20 md:grid-cols-3">
                <div>
                    <p className="font-display text-xl tracking-tight text-carta">{studio.nomeEsteso}</p>
                    <p className="mt-4 max-w-xs leading-relaxed">{studio.claim}</p>
                    <p className="mt-5 text-xs leading-relaxed text-carta/40">
                        P. IVA 00000000000 (fittizia) · Ordine degli Avvocati di Bologna
                    </p>
                </div>

                <div>
                    <p className="rubrica text-ottone-vivo">Recapiti</p>
                    <p className="mt-5">{studio.indirizzo}</p>
                    <p>
                        <a href={studio.telefonoHref} className="hover:text-ottone-vivo">
                            {studio.telefono}
                        </a>
                    </p>
                    <p>{studio.email}</p>
                    <p>{studio.pec}</p>
                </div>

                <div>
                    <p className="rubrica text-ottone-vivo">Questo sito</p>
                    <p className="mt-5 max-w-xs leading-relaxed">
                        È una dimostrazione. Lo studio, i professionisti, i recapiti e i casi sono
                        inventati.
                    </p>
                    <a href="https://pionio.it" className="group mt-6 inline-flex items-center gap-3 text-carta">
                        <span className="underline underline-offset-8 group-hover:text-ottone-vivo">
                            Ne vuoi uno così? Pionio
                        </span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            {/* Il marchio grande quanto la pagina, tagliato dal bordo inferiore. */}
            <div className="bordo" aria-hidden="true">
                <span className="titolone block translate-y-[0.16em] text-[17vw] whitespace-nowrap text-carta/8 select-none">
                    Bertani
                </span>
            </div>
        </footer>
    );
}
