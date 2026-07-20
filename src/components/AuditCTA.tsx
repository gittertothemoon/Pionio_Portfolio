import { m } from 'framer-motion';
import { ArrowUpRight, Gauge } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';

const AUDIT_URL = 'https://audit.pionio.it/?from=site_cta';

export function AuditCTA() {
    const { t, locale } = useLanguage();

    return (
        <section className="w-full px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-zinc-950">
            <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-forest-500/20 bg-zinc-900/40 backdrop-blur-sm px-8 md:px-14 py-12 md:py-16"
            >
                {/* Soft forest glow */}
                <div
                    aria-hidden="true"
                    className="absolute -top-1/3 right-[-10%] w-[55%] h-[120%] bg-forest-700/20 rounded-full blur-[110px] pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <span className="inline-flex items-center gap-2 text-forest-400 font-mono text-xs uppercase tracking-widest">
                        <Gauge weight="duotone" size={16} />
                        {t('audit_cta_label')}
                    </span>

                    <h2 className="text-3xl md:text-5xl font-sans tracking-tighter text-white leading-[1.1] max-w-2xl">
                        {t('audit_cta_headline')}
                    </h2>

                    <p className="text-zinc-400 text-base md:text-lg max-w-xl font-sans leading-relaxed">
                        {t('audit_cta_description')}
                    </p>

                    <m.a
                        href={AUDIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('audit_click', { source: 'home_cta', locale })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 inline-flex items-center gap-2 px-7 py-4 bg-white text-zinc-950 font-medium rounded-full hover:bg-forest-50 transition-colors"
                    >
                        {t('audit_cta_button')}
                        <ArrowUpRight weight="bold" />
                    </m.a>
                </div>
            </m.div>
        </section>
    );
}
