import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useSopraIlScuro } from '../sistema/tema';
import { studio } from '../data';

const voci = [
    { href: '#materie', label: 'Materie' },
    { href: '#metodo', label: 'Metodo' },
    { href: '#studio', label: 'Studio' },
    { href: '#domande', label: 'Domande' },
];

export default function Nav() {
    const [aperto, setAperto] = useState(false);
    const [giu, setGiu] = useState(false);
    const scuro = useSopraIlScuro();

    useEffect(() => {
        const s = () => setGiu(window.scrollY > 40);
        s();
        window.addEventListener('scroll', s, { passive: true });
        return () => window.removeEventListener('scroll', s);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = aperto ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [aperto]);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
                    scuro && !aperto ? 'text-carta' : ''
                } ${
                    giu && !aperto
                        ? scuro
                            ? 'border-b border-carta/12 bg-inchiostro/85 backdrop-blur-xl'
                            : 'border-b border-inchiostro/10 bg-carta/90 backdrop-blur-xl'
                        : ''
                }`}
            >
                <div className="bordo flex items-center justify-between gap-6 py-4">
                    <a href="#" className="flex items-baseline gap-2.5">
                        <span className="font-display text-[1.3rem] leading-none tracking-tight">Bertani</span>
                        <span className={`text-[0.68rem] tracking-[0.18em] uppercase ${scuro ? 'text-carta/55' : 'text-tenue'}`}>
                            &amp; Associati
                        </span>
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Principale">
                        {voci.map((v) => (
                            <a key={v.href} href={v.href} className={`group relative text-sm ${scuro ? 'text-carta/65' : 'text-tenue'}`}>
                                <span className={`transition-colors ${scuro ? 'group-hover:text-carta' : 'group-hover:text-inchiostro'}`}>
                                    {v.label}
                                </span>
                                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-ottone transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a
                            href={studio.telefonoHref}
                            className={`hidden text-sm md:block ${scuro ? 'text-carta/65 hover:text-carta' : 'text-tenue hover:text-inchiostro'}`}
                        >
                            {studio.telefono}
                        </a>
                        <a
                            href="#contatti"
                            className={`group relative hidden overflow-hidden border px-5 py-2.5 text-sm sm:block ${
                                scuro ? 'border-carta/35' : 'border-inchiostro/25'
                            }`}
                        >
                            <span
                                className={`relative z-10 transition-colors duration-500 ${
                                    scuro ? 'group-hover:text-inchiostro' : 'group-hover:text-carta'
                                }`}
                            >
                                Prima consulenza
                            </span>
                            <span
                                className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100 ${
                                    scuro ? 'bg-carta' : 'bg-inchiostro'
                                }`}
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setAperto((a) => !a)}
                            aria-expanded={aperto}
                            className="relative z-[75] flex h-10 w-10 items-center justify-center lg:hidden"
                        >
                            <span className="sr-only">{aperto ? 'Chiudi' : 'Menu'}</span>
                            <span className="relative block h-3 w-7">
                                <span
                                    className={`absolute inset-x-0 h-px bg-current transition-all duration-400 ${
                                        aperto ? 'top-1.5 rotate-45' : 'top-0'
                                    }`}
                                />
                                <span
                                    className={`absolute inset-x-0 h-px bg-current transition-all duration-400 ${
                                        aperto ? 'top-1.5 -rotate-45' : 'top-3'
                                    }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {aperto && (
                    <m.div
                        className="fixed inset-0 z-[65] flex flex-col justify-center bg-carta-cupa px-6"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <nav className="flex flex-col" aria-label="Principale, mobile">
                            {voci.map((v, i) => (
                                <m.a
                                    key={v.href}
                                    href={v.href}
                                    onClick={() => setAperto(false)}
                                    className="titolone border-b border-inchiostro/10 py-4 text-[clamp(2rem,9vw,3.6rem)]"
                                    initial={{ opacity: 0, y: 26 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22 + i * 0.06, duration: 0.6 }}
                                >
                                    {v.label}
                                </m.a>
                            ))}
                        </nav>
                        <a href={studio.telefonoHref} className="rubrica mt-10 text-ottone">
                            {studio.telefono}
                        </a>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
