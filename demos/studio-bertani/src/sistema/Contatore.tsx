import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Il numero sale quando entra in campo. Tiene il suffisso fuori dal conteggio,
 * così "24 h" e "45′" restano leggibili mentre la cifra corre.
 */
export default function Contatore({ a, suffisso = '' }: { a: number; suffisso?: string }) {
    const rif = useRef<HTMLSpanElement>(null);
    const dentro = useInView(rif, { once: true, amount: 0.4 });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!dentro) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setN(a);
            return;
        }

        const durata = 1200;
        const inizio = performance.now();
        let frame = 0;

        const passo = (ora: number) => {
            const q = Math.min(1, (ora - inizio) / durata);
            // Frenata finale: parte veloce e si posa, invece di arrivare di colpo.
            setN(Math.round(a * (1 - Math.pow(1 - q, 3))));
            if (q < 1) frame = requestAnimationFrame(passo);
        };
        frame = requestAnimationFrame(passo);
        return () => cancelAnimationFrame(frame);
    }, [dentro, a]);

    return (
        <span ref={rif} className="tabular-nums">
            {n}
            {suffisso}
        </span>
    );
}
