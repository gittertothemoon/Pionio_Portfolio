import { m } from 'framer-motion';

/**
 * Una pizzeria che non esiste non deve poter essere scambiata per una che
 * esiste. Questa targhetta resta visibile a ogni altezza di pagina: discreta
 * quanto basta per non rovinare l'impaginato, esplicita quanto serve.
 */
export default function NotaDemo() {
    return (
        <m.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="fixed bottom-4 left-4 z-[55] max-w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-crema/15 bg-pece/75 px-4 py-2.5 text-[0.72rem] leading-snug text-crema-fioca backdrop-blur-md"
        >
            <span className="text-crema">Demo.</span> La Mezzaluna non esiste —{' '}
            <a href="https://pionio.it" className="text-oro underline underline-offset-2">
                l'ha fatta Pionio
            </a>
        </m.aside>
    );
}
