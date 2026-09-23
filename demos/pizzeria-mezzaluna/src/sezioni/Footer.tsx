import { locale } from '../data';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-crema/10 pt-20">
            <div className="bordo grid gap-12 pb-20 md:grid-cols-3">
                <div>
                    <p className="etichetta">Pizzeria Mezzaluna</p>
                    <p className="mt-4 max-w-xs leading-relaxed text-crema-fioca">{locale.claim}</p>
                </div>

                <div className="text-crema-fioca">
                    <p className="etichetta text-crema">Contatti</p>
                    <p className="mt-4">{locale.indirizzo}</p>
                    <p>
                        <a href={locale.telefonoHref} className="hover:text-oro">
                            {locale.telefono}
                        </a>
                    </p>
                    <p>{locale.email}</p>
                </div>

                <div>
                    <p className="etichetta text-crema">Questo sito</p>
                    <p className="mt-4 max-w-xs leading-relaxed text-crema-fioca">
                        È una dimostrazione. Il locale, le persone, i prezzi e le recensioni sono
                        inventati.
                    </p>
                    <a
                        href="https://pionio.it"
                        className="group mt-6 inline-flex items-center gap-3 text-crema"
                    >
                        <span className="underline underline-offset-8 group-hover:text-oro">
                            Ne vuoi uno così? Pionio
                        </span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            {/* Il marchio grande quanto la pagina, tagliato dal bordo inferiore. */}
            <div className="bordo" aria-hidden="true">
                <span className="titolone block translate-y-[0.14em] text-[19vw] text-crema/8 select-none">
                    Mezzaluna
                </span>
            </div>
        </footer>
    );
}
