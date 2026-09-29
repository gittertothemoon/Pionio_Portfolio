import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

/**
 * Su carta non serve un contatore che urla: basta una regola d'ottone che si
 * tira da sinistra a destra, e quando arriva in fondo la pagina è pronta.
 */
export default function Sipario({ onFine }: { onFine: () => void }) {
    const [via, setVia] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setVia(true);
            setTimeout(onFine, 900);
        }, 1500);
        return () => clearTimeout(t);
    }, [onFine]);

    return (
        <AnimatePresence>
            {!via && (
                <m.div
                    className="fixed inset-0 z-[80] flex flex-col justify-between bg-carta px-6 py-8 md:px-12"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <span className="rubrica">Studio legale · Bologna</span>

                    <div>
                        <m.span
                            className="titolone block text-[clamp(2.6rem,10vw,7rem)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            Bertani <span className="text-tenue">&amp; Associati</span>
                        </m.span>
                        <m.span
                            className="mt-7 block h-px origin-left bg-ottone"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                        />
                    </div>

                    <span className="text-xs text-tenue">Sito dimostrativo · studio inventato</span>
                </m.div>
            )}
        </AnimatePresence>
    );
}
