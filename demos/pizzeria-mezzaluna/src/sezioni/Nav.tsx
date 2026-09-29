import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { locale } from '../data';

const voci = [
    { href: '#manifesto', label: 'La casa' },
    { href: '#menu', label: 'Menu' },
    { href: '#lievito', label: 'Le 48 ore' },
    { href: '#voci', label: 'Voci' },
    { href: '#trovarci', label: 'Trovarci' },
];

export default function Nav() {
    const [aperto, setAperto] = useState(false);
    const [giu, setGiu] = useState(false);

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
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    giu && !aperto ? 'bg-pece/90 backdrop-blur-xl' : ''
                }`}
            >
                <div className="bordo flex items-center justify-between gap-6 py-5">
                    <a href="#" className="font-display text-[1.35rem] leading-none tracking-tight">
                        Mezzaluna
                    </a>

                    <nav className="hidden items-center gap-9 lg:flex" aria-label="Principale">
                        {voci.map((v) => (
                            <a key={v.href} href={v.href} className="group relative text-sm text-crema-fioca">
                                <span className="transition-colors group-hover:text-crema">{v.label}</span>
                                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-oro transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a
                            href="#prenota"
                            className="hidden rounded-full border border-crema/25 px-6 py-2.5 text-sm transition-colors hover:border-oro hover:text-oro sm:block"
                        >
                            Prenota
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
                                    className={`absolute inset-x-0 h-px bg-crema transition-all duration-400 ${
                                        aperto ? 'top-1.5 rotate-45' : 'top-0'
                                    }`}
                                />
                                <span
                                    className={`absolute inset-x-0 h-px bg-crema transition-all duration-400 ${
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
                        className="fixed inset-0 z-[65] flex flex-col justify-center bg-cenere px-6"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <nav className="flex flex-col gap-1" aria-label="Principale, mobile">
                            {voci.map((v, i) => (
                                <m.a
                                    key={v.href}
                                    href={v.href}
                                    onClick={() => setAperto(false)}
                                    className="titolone py-2 text-[clamp(2.4rem,11vw,4.5rem)]"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22 + i * 0.06, duration: 0.6 }}
                                >
                                    {v.label}
                                </m.a>
                            ))}
                        </nav>
                        <div className="filetto my-9" />
                        <a href={locale.telefonoHref} className="etichetta text-oro">
                            {locale.telefono}
                        </a>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
