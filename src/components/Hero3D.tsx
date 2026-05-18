import { useEffect, useRef, useState } from 'react';

type Props = {
    className?: string;
    interactive?: boolean;
    tilt?: boolean;
    float?: boolean;
};

// Lazy-load @google/model-viewer on the client (importing at module level
// breaks vite-react-ssg because customElements isn't defined during build).
export function Hero3D({ className = '', interactive = false, tilt = false, float = false }: Props) {
    const [ready, setReady] = useState(false);
    const tiltRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let mounted = true;
        import('@google/model-viewer').then(() => {
            if (mounted) setReady(true);
        });
        return () => {
            mounted = false;
        };
    }, []);

    // Magnetic cursor-tilt: when the cursor moves anywhere on the page, ease
    // the wrapper's rotation toward the cursor. Damped via a RAF loop.
    useEffect(() => {
        if (!tilt || !ready) return;
        let raf = 0;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        const MAX = 9; // degrees

        function onMove(e: MouseEvent) {
            const el = tiltRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            // -1..1 across half a viewport from the wrapper center.
            const dx = (e.clientX - cx) / (window.innerWidth / 2);
            const dy = (e.clientY - cy) / (window.innerHeight / 2);
            targetX = Math.max(-1, Math.min(1, dx));
            targetY = Math.max(-1, Math.min(1, dy));
        }
        function tick() {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            const el = tiltRef.current;
            if (el) {
                el.style.transform = `perspective(1400px) rotateY(${currentX * MAX}deg) rotateX(${-currentY * MAX}deg)`;
            }
            raf = requestAnimationFrame(tick);
        }
        window.addEventListener('mousemove', onMove);
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, [tilt, ready]);

    if (!ready) {
        return <div className={className} aria-hidden />;
    }

    const interactiveProps = interactive
        ? { 'camera-controls': true as const, 'disable-zoom': true as const, 'disable-pan': true as const }
        : { 'interaction-prompt': 'none' as const };

    return (
        <div ref={tiltRef} className={`${className} ${tilt ? 'transition-transform duration-100 ease-out' : ''}`}>
            <div className={`w-full h-full ${float ? 'animate-hero-float' : ''}`}>
                <model-viewer
                    src="/models/pionio-3d.glb?v=3"
                    alt="Pionio — P mark in 3D"
                    auto-rotate
                    auto-rotate-delay="0"
                    rotation-per-second="14deg"
                    shadow-intensity="0"
                    exposure="1.5"
                    environment-image="neutral"
                    tone-mapping="commerce"
                    field-of-view="22deg"
                    loading="lazy"
                    reveal="auto"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        ['--poster-color' as string]: 'transparent',
                    }}
                    {...interactiveProps}
                />
            </div>
        </div>
    );
}
