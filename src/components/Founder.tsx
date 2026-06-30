import { m, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Subtle film grain so the portrait reads as atmosphere, not a flat cutout.
const NOISE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Founder() {
    const { t } = useLanguage();

    // Light 3D tilt on the portrait — same mechanic as the service cards.
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="relative w-full py-40 md:py-56 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10 items-center">

                {/* Left — Portrait: greyscale at rest, colour on hover (the person comes to life) */}
                <div className="md:col-span-5 flex flex-col gap-6 items-center md:items-start" style={{ perspective: 1000 }}>
                    <m.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative w-full max-w-sm md:max-w-none aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 will-change-transform"
                    >
                        {/* Forest glow that wakes up on hover */}
                        <div className="pointer-events-none absolute -inset-10 bg-forest-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <img
                            src="/images/ivan.webp"
                            alt={t('chisono_photo_alt')}
                            width={1000}
                            height={1000}
                            loading="lazy"
                            decoding="async"
                            className="relative z-10 w-full h-full object-cover object-top grayscale-0 md:grayscale md:group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-[filter,transform] duration-700 ease-[0.16,1,0.3,1]"
                        />

                        {/* Grain + depth */}
                        <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-[0.12]" style={{ backgroundImage: NOISE }} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-1 items-center md:items-start"
                    >
                        <span className="text-white text-lg font-sans tracking-tight">{t('chisono_name')}</span>
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{t('chisono_role')}</span>
                    </m.div>
                </div>

                {/* Right — Text */}
                <div className="md:col-span-6 md:col-start-7 flex flex-col">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-forest-500 font-mono text-sm tracking-widest">IP</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('chisono_label')}</span>
                    </m.div>

                    <m.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight text-white leading-[1.1]"
                    >
                        {t('chisono_headline_1')}<span className="text-forest-500 italic font-serif">{t('chisono_headline_highlight')}</span>{t('chisono_headline_3')}
                    </m.h2>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-400 text-base md:text-lg leading-relaxed font-light"
                    >
                        <p>{t('chisono_p1')}</p>
                        <p>
                            {t('chisono_p2_1')}
                            <a
                                href="#vespero"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('vespero')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="whitespace-nowrap font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e0a96d] to-[#c97a54] decoration-[#c97a54]/60 underline-offset-4 hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a96d]/60"
                            >
                                Vespero
                            </a>
                            {t('chisono_p2_2')}
                        </p>
                    </m.div>
                </div>

            </div>
        </section>
    );
}
