import { useRef, type ReactNode } from 'react';
import { m, useInView } from 'framer-motion';

const morbida = [0.22, 1, 0.36, 1] as const;

/**
 * Tutte le entrate del sito passano di qui. Usiamo `useInView` con un ref
 * esplicito invece di `whileInView`: quest'ultimo, sugli elementi già a schermo
 * al primo disegno, può non far scattare mai l'osservatore e lasciare un titolo
 * invisibile per sempre — un rischio che non vale la riga risparmiata.
 */
function useDentro(soglia = 0.15) {
    const rif = useRef<HTMLDivElement>(null);
    const dentro = useInView(rif, { once: true, amount: soglia });
    return { rif, dentro };
}

export function Rivela({
    children,
    ritardo = 0,
    y = 26,
    className = '',
}: {
    children: ReactNode;
    ritardo?: number;
    y?: number;
    className?: string;
}) {
    const { rif, dentro } = useDentro();

    return (
        <m.div
            ref={rif}
            className={className}
            initial={{ opacity: 0, y }}
            animate={dentro ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: ritardo, ease: morbida }}
        >
            {children}
        </m.div>
    );
}

/**
 * Il titolo entra una riga alla volta, da sotto una maschera: è il motivo per
 * cui i titoli di questo sito sembrano stampati e non incollati.
 */
export function RigheSvelate({
    righe,
    className = '',
    ritardo = 0,
}: {
    righe: ReactNode[];
    className?: string;
    ritardo?: number;
}) {
    const { rif, dentro } = useDentro(0.1);

    return (
        <m.span ref={rif as never} className={`block ${className}`}>
            {righe.map((riga, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <m.span
                        className="block"
                        initial={{ y: '112%' }}
                        animate={dentro ? { y: '0%' } : undefined}
                        transition={{ duration: 1.05, delay: ritardo + i * 0.085, ease: morbida }}
                    >
                        {riga}
                    </m.span>
                </span>
            ))}
        </m.span>
    );
}

/**
 * Parole che si accendono una dopo l'altra mentre il paragrafo attraversa lo
 * schermo. Vale solo per il manifesto: usarlo ovunque lo renderebbe un tic.
 */
export function ParoleAccese({ testo, className = '' }: { testo: string; className?: string }) {
    const { rif, dentro } = useDentro(0.3);
    const parole = testo.split(' ');

    return (
        <m.p ref={rif as never} className={className}>
            {parole.map((p, i) => (
                <m.span
                    key={`${p}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0.14 }}
                    animate={dentro ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.5, delay: i * 0.026, ease: 'easeOut' }}
                >
                    {p}
                    {i < parole.length - 1 ? ' ' : ''}
                </m.span>
            ))}
        </m.p>
    );
}
