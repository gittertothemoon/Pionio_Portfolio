import { useEffect, useRef } from 'react';

type Bracia = { x: number; y: number; r: number; vy: number; vx: number; vita: number; durata: number };

/**
 * Le braci che salgono dalla bocca del forno. Canvas e non video: pesa nulla,
 * si adatta a qualsiasi formato e non chiede il permesso per partire.
 */
export default function Braci({ className = '' }: { className?: string }) {
    const rif = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const tela = rif.current;
        const ctx = tela?.getContext('2d');
        if (!tela || !ctx) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let larghezza = 0;
        let altezza = 0;
        let frame = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const braci: Bracia[] = [];

        const misura = () => {
            const r = tela.getBoundingClientRect();
            larghezza = r.width;
            altezza = r.height;
            tela.width = Math.round(larghezza * dpr);
            tela.height = Math.round(altezza * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const nuova = (): Bracia => ({
            // Escono da una fascia centrale, come da una bocca larga.
            x: larghezza * (0.5 + (Math.random() - 0.5) * 0.66),
            y: altezza + Math.random() * 40,
            r: 0.6 + Math.random() * 2.1,
            vy: -(0.22 + Math.random() * 0.62),
            vx: (Math.random() - 0.5) * 0.28,
            vita: 0,
            durata: 260 + Math.random() * 340,
        });

        const disegna = () => {
            ctx.clearRect(0, 0, larghezza, altezza);

            const quante = larghezza < 640 ? 46 : 96;
            while (braci.length < quante) braci.push(nuova());

            for (let i = 0; i < braci.length; i++) {
                const b = braci[i];
                b.vita += 1;
                b.y += b.vy;
                b.x += b.vx + Math.sin((b.vita + i * 30) / 46) * 0.24;
                b.vy -= 0.0016;

                const q = b.vita / b.durata;
                if (q >= 1 || b.y < -20) {
                    braci[i] = nuova();
                    continue;
                }

                // Nasce gialla, muore rossa, poi si spegne.
                const opacita = Math.sin(Math.PI * q) * 0.85;
                const caldo = 1 - q;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${230 + caldo * 20}, ${110 + caldo * 85}, ${40 + caldo * 20}, ${opacita})`;
                ctx.fill();
            }

            frame = requestAnimationFrame(disegna);
        };

        misura();
        frame = requestAnimationFrame(disegna);
        window.addEventListener('resize', misura);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', misura);
        };
    }, []);

    return <canvas ref={rif} aria-hidden="true" className={className} />;
}
