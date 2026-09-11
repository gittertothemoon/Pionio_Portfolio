import { Fragment, type CSSProperties } from 'react';
import { m } from 'framer-motion';
import { Globe, ArrowDown, ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { useIsRestrictedWebView } from '../lib/ua';
import { track } from '../lib/analytics';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { MagneticButton } from './MagneticButton';
import AuroraBackground from './AuroraBackground';

// The whole hero is the aurora: a field you can stir with the mouse or a finger. One line sits low
// and wide, so the light keeps the upper half of the screen to itself. The line does what it says:
// it is drawn first, in outline, then built, row by row (see .hero-row in index.css). The words are in
// the page once, as the outline; the fill and the green edge are drawn from data-text by CSS.
export function Hero() {
    const { t, locale, setLocale } = useLanguage();
    // Instagram/Facebook/Threads/TikTok in-app browsers: skip the WebGL aurora.
    // 100svh instead of 100dvh stabilizes the hero against the collapsing nav bar.
    const restricted = useIsRestrictedWebView();
    const title = t('hero_title');

    const toggleLanguage = () => {
        const next = locale === 'en' ? 'it' : 'en';
        track('lang_switch', { from: locale, to: next, location: 'hero' });
        setLocale(next);
    };

    return (
        <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background md:min-h-[100dvh]">
            <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)', contain: 'paint' }}>
                {restricted ? (
                    <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(48,107,77,0.35), transparent 70%), #09090b',
                        }}
                    />
                ) : (
                    <AuroraBackground />
                )}
                {/* Dark only where the words are, bottom and left: the top right stays pure light. */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-transparent" />
            </div>

            <div className="pointer-events-none absolute top-6 right-6 md:top-8 md:right-12 lg:right-24 z-50 flex flex-col items-end gap-5">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                    <Globe size={16} weight="duotone" />
                    <span className="font-mono text-xs font-medium tracking-widest">{locale.toUpperCase()}</span>
                </button>
            </div>

            <div className="pointer-events-none relative z-10 flex flex-1 flex-col justify-end px-6 pt-24 pb-28 md:px-12 md:pt-36 md:pb-24 lg:px-24">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-1 flex-col md:block"
                >
                    <div className="flex flex-1 items-center md:block">
                    <h1 className="hero-title font-sans font-medium tracking-[-0.04em] text-foreground">
                        {title.split('\n').map((line, i) => (
                            <Fragment key={i}>
                                {i > 0 && ' '}
                                <span className="block">
                                    <span className="hero-row" data-text={line.replace('|', '\n')} style={{ '--d': `${0.5 + i * 0.55}s` } as CSSProperties}>
                                        {line.split('|').map((part, j) => (
                                            <Fragment key={j}>
                                                {j > 0 && <span className="hidden md:inline"> </span>}
                                                <span className="block md:inline">{part}</span>
                                            </Fragment>
                                        ))}
                                    </span>
                                </span>
                            </Fragment>
                        ))}
                    </h1>
                    </div>

                    <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-12">
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
                                track('nav_click', { target: 'crafts', locale });
                                document.getElementById('crafts')?.scrollIntoView({ behavior: 'smooth' });
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
        </section>
    );
}
