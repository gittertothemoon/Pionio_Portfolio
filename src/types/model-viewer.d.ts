import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    src?: string;
    alt?: string;
    'auto-rotate'?: boolean | '';
    'rotation-per-second'?: string;
    'auto-rotate-delay'?: string;
    'camera-controls'?: boolean | '';
    'disable-zoom'?: boolean | '';
    'disable-pan'?: boolean | '';
    'disable-tap'?: boolean | '';
    'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
    'shadow-intensity'?: string;
    'shadow-softness'?: string;
    exposure?: string;
    'environment-image'?: string;
    'tone-mapping'?: 'neutral' | 'aces' | 'commerce' | 'agx' | 'none';
    'camera-orbit'?: string;
    'min-camera-orbit'?: string;
    'max-camera-orbit'?: string;
    'field-of-view'?: string;
    loading?: 'auto' | 'lazy' | 'eager';
    reveal?: 'auto' | 'interaction' | 'manual';
    poster?: string;
};

// React 19 keeps JSX inside the `react` module. Augment it there.
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': ModelViewerAttributes;
        }
    }
}

// Also keep a global JSX augment for older React tooling / IDE TS servers
// that still resolve IntrinsicElements via the global namespace.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': ModelViewerAttributes;
        }
    }
}
