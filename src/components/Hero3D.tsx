import { useEffect, useState } from 'react';

type Props = {
    className?: string;
    interactive?: boolean;
};

// Lazy-load the @google/model-viewer web component on the client. Importing
// it at module level would break vite-react-ssg, which executes during build
// without a DOM.
export function Hero3D({ className = '', interactive = false }: Props) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        import('@google/model-viewer').then(() => {
            if (mounted) setReady(true);
        });
        return () => {
            mounted = false;
        };
    }, []);

    if (!ready) {
        // Reserve the same box so the layout doesn't reflow when the model
        // becomes interactive.
        return <div className={className} aria-hidden />;
    }

    const interactiveProps = interactive
        ? { 'camera-controls': true as const, 'disable-zoom': true as const, 'disable-pan': true as const }
        : { 'interaction-prompt': 'none' as const };

    return (
        <model-viewer
            src="/models/pionio-3d.glb"
            alt="Pionio — P mark in 3D"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="18deg"
            shadow-intensity="0"
            exposure="1.4"
            environment-image="neutral"
            tone-mapping="commerce"
            field-of-view="22deg"
            loading="lazy"
            reveal="auto"
            className={className}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                ['--poster-color' as string]: 'transparent',
            }}
            {...interactiveProps}
        />
    );
}
