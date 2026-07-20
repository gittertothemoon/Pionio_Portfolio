import { m } from 'framer-motion';
import { Globe, ArrowDown, ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { useIsRestrictedWebView } from '../lib/ua';
import { track } from '../lib/analytics';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { MagneticButton } from './MagneticButton';
import AuroraBackground from './AuroraBackground';
import { Hero3D } from './Hero3D';
import { Pionio3DInfo } from './Pionio3DInfo';

export function Hero() {
    const { t, locale, setLocale } = useLanguage();
    // Instagram/Facebook/Threads/TikTok in-app browsers: skip the WebGL
    // pieces (aurora + 3D). 100svh instead of 100dvh stabilizes the hero
    // height against the in-app browser's collapsing nav bar.
    const restricted = useIsRestrictedWebView();

    const toggleLanguage = () => {
        const next = locale === 'en' ? 'it' : 'en';
        track('lang_switch', { from: locale, to: next, location: 'hero' });
        setLocale(next);
    };

    return (
        <section className="relative min-h-[100svh] md:min-h-[100dvh] w-full bg-background overflow-hidden flex flex-col md:flex-row">
            {/* Background: animated WebGL aurora, or a static CSS gradient
                fallback when running inside a social in-app browser. */}
            <div
                className="absolute inset-0 z-0"
                style={{ transform: 'translateZ(0)', willChange: 'transform', contain: 'paint' }}
            >
                {restricted ? (
                    <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(48,107,77,0.35), transparent 70%), #09090b',
                        }}
                    />
                ) : (
                    <AuroraBackground />
                )}
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
            <div className="pointer-events-none flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-36 md:pt-40 md:pb-20 lg:pt-32 lg:pb-28 z-10">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="xl:hidden inline-flex items-center gap-2 px-3 py-1 mt-6 mb-4 rounded-full border border-forest-500/50 bg-forest-900/40 text-forest-200 text-sm font-mono tracking-tight"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
                        </span>
                        {t('hero_availability')}
                    </m.div>

                    <h1 className="text-[2.5rem] sm:text-5xl md:text-[clamp(4rem,6.2vw,6rem)] font-sans tracking-tighter leading-[0.95] md:leading-[0.9] font-medium text-foreground mb-5 md:mb-6 whitespace-pre-line">
                        {t('hero_title')}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-[45ch] leading-relaxed mb-8 md:mb-10 font-sans">
                        {t('hero_subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
                        <m.a
                            href={getWhatsAppUrl(locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('whatsapp_click', { source: 'hero', locale })}
                            whileTap={{ scale: 0.97 }}
                            className="pointer-events-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-forest-400/50 bg-forest-600 text-white hover:bg-forest-500 hover:border-forest-300/60 transition-colors font-sans text-sm font-medium shadow-[0_14px_40px_-18px_rgba(74,222,128,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400"
                        >
                            <WhatsappLogo size={19} weight="fill" />
                            {t('hero_cta_whatsapp')}
                            <ArrowUpRight size={16} weight="bold" />
                        </m.a>

                        <MagneticButton
                            onClick={(e) => {
                                e.preventDefault();
                                track('nav_click', { target: 'works', locale });
                                document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="pointer-events-auto px-6 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/10"
                        >
                            <span className="flex items-center gap-2">
                                {t('hero_cta_works')}
                                <ArrowDown size={18} weight="bold" />
                            </span>
                        </MagneticButton>
                    </div>
                </m.div>
            </div>

            {/* Desktop: the P owns the right half of the hero. Its size is
                bounded by both viewport width and height, while the slight
                right shift preserves a safe gap from the max-w-2xl copy.
                Below xl it moves to the dedicated section after the hero. */}
            <div
                className={`${restricted ? 'hidden' : 'hidden xl:flex'} absolute inset-y-0 left-1/2 right-0 translate-x-[3vw] items-center justify-center pointer-events-none z-10`}
            >
                <div
                    className="pointer-events-auto aspect-square relative"
                    style={{ width: 'clamp(390px, min(34vw, 64vh), 560px)' }}
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-[22%] rounded-full bg-forest-400/15 blur-[70px] pointer-events-none"
                    />
                    <Hero3D
                        className="relative z-10 w-full h-full"
                        interactive
                        tilt
                        float
                    />
                    {/* Easter egg build-in-public: scopri il peso del P 3D */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <Pionio3DInfo variant="pill" />
                    </div>
                </div>
            </div>
        </section>
    );
}
