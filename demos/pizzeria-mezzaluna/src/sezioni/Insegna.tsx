import { m } from 'framer-motion';
import { ingredienti } from '../data';

/**
 * La fascia che scorre. Due copie identiche affiancate e una traslazione del
 * 50%: quando la prima esce, la seconda è già al suo posto e il giro non si
 * vede mai ricominciare.
 */
export default function Insegna() {
    const riga = [...ingredienti, ...ingredienti];

    return (
        <div className="relative border-y border-crema/10 py-6 overflow-hidden">
            <m.div
                className="flex w-max gap-10 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            >
                {riga.map((i, k) => (
                    <span key={`${i}-${k}`} className="flex items-center gap-10 text-crema-fioca">
                        <span className="font-display text-[clamp(1.1rem,2.4vw,1.9rem)] italic">{i}</span>
                        <span className="text-oro/70" aria-hidden="true">
                            ✳
                        </span>
                    </span>
                ))}
            </m.div>
        </div>
    );
}
