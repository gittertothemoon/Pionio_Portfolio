import { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

/**
 * Un disco che insegue il mouse con un filo di ritardo e si allarga sugli
 * elementi marcati `data-cursore`. In `difference` sta bene sia sul nero sia
 * sulla crema, senza doverlo ricolorare sezione per sezione.
 */
export default function Cursore() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
    const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });
    const [grande, setGrande] = useState(false);
    const [attivo, setAttivo] = useState(false);

    useEffect(() => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        document.body.dataset.cursore = 'on';
        setAttivo(true);

        const muovi = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const sopra = (e.target as Element | null)?.closest('a, button, [data-cursore]');
            setGrande(Boolean(sopra));
        };
        const esci = () => x.set(-100);

        window.addEventListener('pointermove', muovi);
        window.addEventListener('pointerleave', esci);
        return () => {
            window.removeEventListener('pointermove', muovi);
            window.removeEventListener('pointerleave', esci);
            delete document.body.dataset.cursore;
        };
    }, [x, y]);

    if (!attivo) return null;

    return (
        <m.div
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
            style={{ x: sx, y: sy }}
        >
            <m.span
                className="block rounded-full bg-crema"
                animate={{ width: grande ? 54 : 11, height: grande ? 54 : 11, margin: grande ? -27 : -5.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
        </m.div>
    );
}
