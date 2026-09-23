import { m } from 'framer-motion';

/**
 * Uno studio legale finto è la cosa che più facilmente viene presa per vera:
 * questa targhetta resta visibile a ogni altezza di pagina.
 */
export default function NotaDemo() {
    return (
        <m.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="fixed bottom-4 left-4 z-[55] max-w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-inchiostro/15 bg-carta/85 px-4 py-2.5 text-[0.72rem] leading-snug text-tenue backdrop-blur-md"
        >
            <span className="text-inchiostro">Demo.</span> Lo studio non esiste —{' '}
            <a href="https://pionio.it" className="text-ottone underline underline-offset-2">
                l'ha fatto Pionio
            </a>
        </m.aside>
    );
}
