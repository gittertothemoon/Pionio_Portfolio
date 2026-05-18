import { motion } from 'framer-motion';
import { Globe, ArrowDown } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';
import AuroraBackground from './AuroraBackground';

export function Hero() {
    const { t, locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'it' : 'en');
    };

    return (
        <section className="relative min-h-[100dvh] w-full bg-background overflow-hidden flex flex-col md:flex-row">
            {/* Animated WebGL shader background */}
            <div
                className="absolute inset-0 z-0"
                style={{ transform: 'translateZ(0)', willChange: 'transform', contain: 'paint' }}
            >
                <AuroraBackground />
                {/* Readability overlay: keep text crisp on the left half while
                    letting more plasma bleed through on the right. */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent md:via-background/45" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/25" />
            </div>

            {/* Language Selector Toggle */}
            <div className="pointer-events-none absolute top-6 right-6 md:top-8 md:right-12 z-50">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                    <Globe size={16} weight="duotone" />
                    <span className="font-mono text-xs font-medium tracking-widest">{locale.toUpperCase()}</span>
                </button>
            </div>

            {/* Left Content Half */}
            <div className="pointer-events-none flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-36 md:pt-40 md:pb-20 lg:pt-48 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="md:hidden inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-forest-500/30 bg-forest-900/20 text-forest-300 text-sm font-mono tracking-tight"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
                        </span>
                        {t('hero_availability')}
                    </motion.div>

                    <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter leading-[0.95] md:leading-[0.9] font-medium text-foreground mb-5 md:mb-6 whitespace-pre-line">
                        {t('hero_title')}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-[45ch] leading-relaxed mb-8 md:mb-10 font-sans">
                        {t('hero_subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <MagneticButton
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="pointer-events-auto bg-forest-600 hover:bg-forest-500 text-white border border-forest-500/50"
                        >
                            <span className="flex items-center gap-2">
                                {t('hero_cta_works')}
                                <ArrowDown size={18} weight="bold" />
                            </span>
                        </MagneticButton>

                        <MagneticButton
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="pointer-events-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10"
                        >
                            {t('hero_cta_contact')}
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            {/* Spacer to preserve the asymmetric layout (shader fills full hero) */}
            <div className="flex-1 hidden md:block pointer-events-none" />
        </section>
    );
}
