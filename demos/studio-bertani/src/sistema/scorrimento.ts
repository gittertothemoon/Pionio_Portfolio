import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Scorrimento smorzato. È la differenza fra una pagina che "salta" e una che
 * si muove: tutto il resto del movimento è agganciato a questo.
 */
export function useScorrimentoFluido() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
        let frame = 0;

        const loop = (t: number) => {
            lenis.raf(t);
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);

        const versoAncora = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
            const id = a?.getAttribute('href');
            if (!a || !id || id === '#') return;
            const meta = document.querySelector(id);
            if (!meta) return;
            e.preventDefault();
            lenis.scrollTo(meta as HTMLElement, { offset: -20, duration: 1.4 });
        };

        document.addEventListener('click', versoAncora);
        return () => {
            document.removeEventListener('click', versoAncora);
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);
}
