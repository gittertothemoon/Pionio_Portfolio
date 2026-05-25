import { m } from 'framer-motion';
import { ArrowUpRight, Gauge } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';

const AUDIT_URL = 'https://audit.pionio.it/?from=site_cta';

/** Compact, contextual audit CTA — meant to sit inside a page's content column. */
export function AuditInlineCTA({ source }: { source: string }) {
    const { t, locale } = useLanguage();

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 md:p-9 rounded-3xl border border-forest-500/20 bg-forest-500/5"
        >
            <div className="flex items-start gap-4 text-center sm:text-left">
                <Gauge
                    weight="duotone"
                    size={28}
                    className="text-forest-400 shrink-0 hidden sm:block mt-1"
                />
                <div className="flex flex-col gap-1.5">
                    <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                        {t('audit_cta_label')}
                    </span>
                    <p className="text-white font-sans text-xl md:text-2xl tracking-tight">
                        {t('audit_cta_headline')}
                    </p>
                </div>
            </div>
            <m.a
                href={AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('audit_click', { source, locale })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-zinc-950 font-medium rounded-full hover:bg-forest-50 transition-colors whitespace-nowrap"
            >
                {t('audit_cta_button')}
                <ArrowUpRight weight="bold" />
            </m.a>
        </m.div>
    );
}
