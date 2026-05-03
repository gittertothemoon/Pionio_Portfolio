import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        // Simulate loading progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                // Short delay at 100% before finishing
                setTimeout(() => {
                    setLoading(false);
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }, 800);
            }
            setProgress(currentProgress);
        }, 150); // Speed of the counter

        return () => {
            clearInterval(interval);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Custom cubic bezier curve for a snappy exit
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white"
                >
                    {/* Noise overlay for texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                    {/* Central content */}
                    <div className="flex flex-col items-center gap-8 relative z-10">
                        {/* Morphing Number Counter */}
                        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Loading" className="text-8xl md:text-[10rem] font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tabular-nums">
                            {progress}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
                                {t('preloader_init')}
                            </span>

                            {/* Progress Bar Container */}
                            <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative mt-2">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-forest-400"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "circOut", duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
