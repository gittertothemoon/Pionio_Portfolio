import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Info, X } from '@phosphor-icons/react';

type Props = {
    /** Variante del trigger:
     *  - 'pill': pulsante pillola con icona + label (per desktop sotto il 3D)
     *  - 'inline': solo "ⓘ peso" testuale (per mobile, accanto al caption "Trascina per ruotare")
     */
    variant?: 'pill' | 'inline';
    className?: string;
};

/**
 * Trigger + modal "Quanto pesa la P 3D?".
 * Easter egg di build-in-public: l'utente clicca, scopre 780 KB e i dettagli
 * tecnici delle ottimizzazioni. Coerente con il filone Shorts YouTube.
 */
export function Pionio3DInfo({ variant = 'pill', className = '' }: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    // Mount flag to defer client-only 3D UI past SSG hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        // Lock body scroll
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    return (
        <>
            {/* TRIGGER */}
            {variant === 'pill' ? (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-500/30 bg-forest-500/[0.06] hover:bg-forest-500/15 hover:border-forest-500/60 text-forest-300 hover:text-forest-100 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 cursor-pointer ${className}`}
                    aria-label="Scopri il peso della P 3D"
                >
                    <Info size={14} weight="duotone" />
                    Quanto pesa?
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-forest-400 hover:text-forest-200 font-mono text-xs uppercase tracking-widest transition-colors duration-300 cursor-pointer ${className}`}
                    aria-label="Scopri il peso della P 3D"
                >
                    <Info size={12} weight="duotone" />
                    Quanto pesa?
                </button>
            )}

            {/* MODAL — Portal su document.body per uscire dal containing block del Hero3D (will-change: transform) */}
            {mounted && createPortal(
            <AnimatePresence>
                {open && (
                    <m.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setOpen(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Peso della P 3D — dettagli tecnici"
                    >
                        {/* Backdrop blur scuro */}
                        <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md" />

                        {/* Card */}
                        <m.div
                            className="relative z-10 w-full max-w-xl bg-zinc-950/80 border border-forest-500/15 rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
                            initial={{ opacity: 0, scale: 0.92, y: 18 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Glow forest discreto in background */}
                            <div
                                className="absolute -top-32 -right-32 w-72 h-72 rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(48,107,77,0.35), transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                                aria-hidden
                            />

                            {/* Close */}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                                aria-label="Chiudi"
                            >
                                <X size={20} weight="bold" />
                            </button>

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-8">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-forest-400">
                                    P 3D
                                </span>
                                <div className="h-px flex-1 bg-forest-500/20" />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    pionio.it
                                </span>
                            </div>

                            {/* Numerone */}
                            <div className="text-center mb-2">
                                <p className="font-sans font-bold text-[88px] md:text-[112px] leading-none tracking-[-0.04em] text-forest-200 tabular-nums">
                                    780
                                    <span className="text-forest-400 ml-3 text-[48px] md:text-[64px] font-medium">
                                        KB
                                    </span>
                                </p>
                            </div>

                            {/* Diff */}
                            <p className="text-center text-zinc-400 font-sans text-base mb-10">
                                Da <span className="line-through decoration-zinc-600">8.4 MB</span>{' '}
                                <span className="text-forest-300 font-medium">−90%</span>
                            </p>

                            {/* Dettagli */}
                            <div className="space-y-3">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                                    Come ci sono arrivato
                                </p>
                                <ul className="space-y-2.5 text-zinc-300 font-sans text-[15px] leading-relaxed">
                                    <li className="flex gap-3">
                                        <span className="text-forest-500 mt-1">·</span>
                                        glTF binary + <span className="font-mono text-forest-200">Draco</span> compression
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-forest-500 mt-1">·</span>
                                        <span>
                                            Mesh simplification con{' '}
                                            <span className="font-mono text-forest-200">meshoptimizer</span>
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-forest-500 mt-1">·</span>
                                        Texture esterna JPEG (per iOS Safari)
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-forest-500 mt-1">·</span>
                                        Lazy-load via <span className="font-mono text-forest-200">requestIdleCallback</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Footer */}
                            <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    @pionio_dev · build in public
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="font-mono text-[11px] uppercase tracking-widest text-forest-300 hover:text-forest-100 transition-colors cursor-pointer"
                                >
                                    Chiudi
                                </button>
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>,
            document.body
            )}
        </>
    );
}
