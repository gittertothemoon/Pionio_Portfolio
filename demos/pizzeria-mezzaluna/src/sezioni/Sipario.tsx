import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

/**
 * Il sipario: conta fino a cento e si apre in due. Non è decorazione, è il
 * tempo che serve ai font di caricarsi — meglio riempirlo che subirlo.
 */
export default function Sipario({ onFine }: { onFine: () => void }) {
    const [n, setN] = useState(0);
    const [via, setVia] = useState(false);

    useEffect(() => {
        let annullato = false;
        const parti = (v: number) => {
            if (annullato) return;
            setN(v);
            if (v >= 100) {
                setTimeout(() => {
                    if (annullato) return;
                    setVia(true);
                    setTimeout(onFine, 900);
                }, 240);
                return;
            }
            // Avanza a scatti irregolari: un caricamento vero non è lineare.
            setTimeout(() => parti(Math.min(100, v + 2 + Math.floor(Math.random() * 9))), 40 + Math.random() * 70);
        };
        parti(0);
        return () => {
            annullato = true;
        };
    }, [onFine]);

    return (
        <AnimatePresence>
            {!via && (
                <m.div
                    className="fixed inset-0 z-[80] flex flex-col justify-between bg-pece px-6 py-8 md:px-12"
                    exit={{ y: '-101%' }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    <span className="etichetta">Bologna · dal 1978</span>

                    <div className="flex items-end justify-between gap-6">
                        <span className="titolone text-[clamp(3.5rem,15vw,13rem)] text-crema">
                            Mezzaluna
                        </span>
                        <span className="font-display shrink-0 text-[clamp(2rem,6vw,4.5rem)] leading-none text-brace tabular-nums">
                            {String(n).padStart(3, '0')}
                        </span>
                    </div>

                    <div className="filetto" />
                </m.div>
            )}
        </AnimatePresence>
    );
}
