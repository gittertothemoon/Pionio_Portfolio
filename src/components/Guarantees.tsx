import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Eye, ArrowClockwise, CurrencyEur, Lifebuoy, Key, Calendar } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const ICONS = [Eye, ArrowClockwise, CurrencyEur, Lifebuoy, Key, Calendar];

export function Guarantees() {
    const { t } = useLanguage();

    const guarantees = [
        { id: '01', title: t('garanzie_1_title'), desc: t('garanzie_1_desc') },
        { id: '02', title: t('garanzie_2_title'), desc: t('garanzie_2_desc') },
        { id: '03', title: t('garanzie_3_title'), desc: t('garanzie_3_desc') },
        { id: '04', title: t('garanzie_4_title'), desc: t('garanzie_4_desc') },
        { id: '05', title: t('garanzie_5_title'), desc: t('garanzie_5_desc') },
        { id: '06', title: t('garanzie_6_title'), desc: t('garanzie_6_desc') },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };

    return (
        <section className="relative w-full py-40 md:py-56 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-24">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-10"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_garanzie')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('garanzie_label')}</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter text-white leading-[1.05] max-w-5xl">
                        {t('garanzie_headline_1')}
                        <span className="text-forest-500 italic font-serif">{t('garanzie_headline_highlight')}</span>
                        {t('garanzie_headline_3')}
                    </h2>

                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                        {t('garanzie_intro')}
                    </p>
                </m.div>

                {/* Cards Grid */}
                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {guarantees.map((g, idx) => {
                        const Icon = ICONS[idx % ICONS.length];
                        return (
                            <m.div
                                key={g.id}
                                variants={itemVariants}
                                className="group relative flex flex-col gap-8 p-10 rounded-[2rem] bg-zinc-900/60 border border-white/5 hover:border-forest-500/40 hover:bg-zinc-900 transition-all duration-500 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-forest-500/10 border border-forest-500/20 flex items-center justify-center group-hover:bg-forest-500/20 group-hover:border-forest-500/40 transition-colors duration-500">
                                        <Icon size={26} weight="duotone" className="text-forest-400" />
                                    </div>
                                    <span className="text-zinc-700 group-hover:text-forest-500/60 font-mono text-sm tracking-widest transition-colors duration-500">
                                        {g.id}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl md:text-2xl font-sans tracking-tight text-white leading-tight">
                                        {g.title}
                                    </h3>
                                    <p className="text-zinc-400 text-base leading-relaxed font-light">
                                        {g.desc}
                                    </p>
                                </div>
                            </m.div>
                        );
                    })}
                </m.div>

                {/* Trust seal footer */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center gap-3 pt-8 text-zinc-600"
                >
                    <ShieldCheck size={20} weight="duotone" className="text-forest-500/70" />
                    <span className="font-mono text-xs uppercase tracking-widest">PIONIO — {t('garanzie_label')}</span>
                </m.div>
            </div>
        </section>
    );
}
