import { useEffect, useRef, useState } from 'react';

type Props = {
    className?: string;
    interactive?: boolean;
    tilt?: boolean;
    float?: boolean;
    src?: string;
};

// Lazy-load @google/model-viewer on the client (importing at module level
// breaks vite-react-ssg because customElements isn't defined during build).
export function Hero3D({
    className = '',
    interactive = false,
    tilt = false,
    float = false,
    src = '/models/pionio-3d.glb?v=4',
}: Props) {
    const [ready, setReady] = useState(false);
    // Tilt is applied to an INNER wrapper so the outer `className`
    // (translate-x, size, max-w, …) is never clobbered by our JS transform.
    const tiltRef = useRef<HTMLDivElement | null>(null);
    const slotRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let mounted = true;
        let handle = 0;
        // Defer the (~1 MB) @google/model-viewer chunk until the browser
        // is idle so it never competes with first paint / hydration.
        const startImport = () => {
            import('@google/model-viewer').then(() => {
                if (mounted) setReady(true);
            });
        };
        type IdleWin = typeof window & {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
            cancelIdleCallback?: (h: number) => void;
        };
        const w = window as IdleWin;
        const whenIdle = () => {
            handle =
                typeof w.requestIdleCallback === 'function'
                    ? w.requestIdleCallback(startImport, { timeout: 2500 })
                    : window.setTimeout(startImport, 200);
        };
        // ...and only once the slot is near the screen. A copy that is display:none
        // (the desktop model on a phone) never intersects, so it never costs the download.
        const slot = slotRef.current;
        const io =
            slot && 'IntersectionObserver' in window
                ? new IntersectionObserver(
                      (entries) => {
                          if (!entries.some((e) => e.isIntersecting)) return;
                          io?.disconnect();
                          whenIdle();
                      },
                      { rootMargin: '800px 0px' },
                  )
                : null;
        if (io && slot) io.observe(slot);
        else whenIdle();
        return () => {
            mounted = false;
            io?.disconnect();
            if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(handle);
            else window.clearTimeout(handle);
        };
    }, []);

    useEffect(() => {
        if (!tilt || !ready) return;
        let raf = 0;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        const MAX = 10; // degrees

        function onMove(e: MouseEvent) {
            const el = tiltRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = (e.clientX - cx) / (window.innerWidth / 2);
            const dy = (e.clientY - cy) / (window.innerHeight / 2);
            targetX = Math.max(-1, Math.min(1, dx));
            targetY = Math.max(-1, Math.min(1, dy));
        }
        function tick() {
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;
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
        return <div ref={slotRef} className={className} aria-hidden />;
    }

    const interactiveProps = interactive
        ? { 'camera-controls': true as const, 'disable-zoom': true as const, 'disable-pan': true as const }
        : { 'interaction-prompt': 'none' as const };

    return (
        <div className={className}>
            <div
                ref={tiltRef}
                className="w-full h-full"
                style={tilt ? { transition: 'transform 80ms linear', willChange: 'transform' } : undefined}
            >
                <div className={`w-full h-full ${float ? 'animate-hero-float' : ''}`}>
                    <model-viewer
                        src={src}
                        alt="Pionio — P mark in 3D"
                        auto-rotate
                        auto-rotate-delay="5000"
                        rotation-per-second="3deg"
                        shadow-intensity="0.35"
                        shadow-softness="0.9"
                        exposure="1.55"
                        environment-image="neutral"
                        tone-mapping="neutral"
                        camera-orbit="90deg 75deg 105%"
                        field-of-view="22deg"
                        loading="lazy"
                        reveal="auto"
                        touch-action="pan-y"
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            ['--poster-color' as string]: 'transparent',
                        }}
                        {...interactiveProps}
                    />
                    {/* (progress-bar hidden via CSS in index.css) */}
                </div>
            </div>
        </div>
    );
}
