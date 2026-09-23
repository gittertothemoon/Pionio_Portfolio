import { useEffect, useState } from 'react';

/**
 * La barra in alto non può restare chiara quando ci passa sotto una sezione di
 * inchiostro: diventerebbe una macchia. Qui guardiamo cosa c'è all'altezza
 * della barra e, se è una sezione marcata `data-scuro`, la invertiamo.
 */
export function useSopraIlScuro(altezza = 34) {
    const [scuro, setScuro] = useState(false);

    useEffect(() => {
        const guarda = () => {
            const sezioni = document.querySelectorAll<HTMLElement>('[data-scuro]');
            let dentro = false;
            for (const s of sezioni) {
                const r = s.getBoundingClientRect();
                if (r.top <= altezza && r.bottom >= altezza) {
                    dentro = true;
                    break;
                }
            }
            setScuro(dentro);
        };

        guarda();
        window.addEventListener('scroll', guarda, { passive: true });
        window.addEventListener('resize', guarda);
        return () => {
            window.removeEventListener('scroll', guarda);
            window.removeEventListener('resize', guarda);
        };
    }, [altezza]);

    return scuro;
}
