import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Eye, Key, Calendar } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export function Guarantees() {
    const { t, locale } = useLanguage();

    const guarantees =
        locale === 'it'
            ? [
                  {
                      id: '01',
                      Icon: Eye,
                      title: 'Vedi prima, decidi poi',
                      desc: 'Ti mostro un mockup reale prima di chiederti di confermare. Poi lo rifiniamo insieme finché ti rappresenta.',
                  },
                  {
                      id: '02',
                      Icon: Calendar,
                      title: 'Prezzo e data sono chiari',
                      desc: 'Preventivo e consegna vengono concordati prima di iniziare. Niente costi nascosti o scadenze vaghe.',
                  },
                  {
                      id: '03',
                      Icon: Key,
                      title: 'Tutto tuo, con supporto',
                      desc: 'Codice, dominio e account restano a te. Dopo il lancio hai 30 giorni di assistenza inclusa.',
                  },
              ]
            : [
                  {
                      id: '01',
                      Icon: Eye,
                      title: 'See it before you decide',
                      desc: 'I show you a real mockup before asking you to commit. Then we refine it together until it feels right.',
                  },
                  {
                      id: '02',
                      Icon: Calendar,
                      title: 'A clear price and date',
                      desc: 'Budget and delivery are agreed before work starts. No hidden costs or vague deadlines.',
                  },
                  {
                      id: '03',
                      Icon: Key,
                      title: 'Yours, with support',
                      desc: 'Code, domain and accounts stay yours. After launch, 30 days of support are included.',
                  },
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
        <section className="relative w-full py-24 md:py-36 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-14 md:gap-20">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-7"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_garanzie')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('garanzie_label')}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans tracking-tighter text-white leading-[1.05] max-w-5xl">
                        {t('garanzie_headline_1')}
                        <span className="text-forest-500 italic font-serif">{t('garanzie_headline_highlight')}</span>
                        {t('garanzie_headline_3')}
                    </h2>

                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                        {t('garanzie_intro')}
                    </p>
                </m.div>

                {/* Three clear commitments, presented as a single editorial list. */}
                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10"
                >
                    {guarantees.map((g) => {
                        const Icon = g.Icon;
                        return (
                            <m.div
                                key={g.id}
                                variants={itemVariants}
                                className="group relative flex flex-col gap-7 py-8 md:px-8 first:md:pl-0 last:md:pr-0"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-full bg-forest-500/10 border border-forest-500/20 flex items-center justify-center group-hover:bg-forest-500/20 transition-colors duration-500">
                                        <Icon size={26} weight="duotone" className="text-forest-400" />
                                    </div>
                                    <span className="text-zinc-600 group-hover:text-forest-500/70 font-mono text-sm tracking-widest transition-colors duration-500">
                                        {g.id}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl md:text-2xl font-sans tracking-tight text-white leading-tight">
                                        {g.title}
                                    </h3>
                                    <p className="text-zinc-300 text-base leading-relaxed font-light">
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
                    className="flex items-center justify-center gap-3 text-zinc-500"
                >
                    <ShieldCheck size={20} weight="duotone" className="text-forest-500/70" />
                    <span className="font-mono text-xs uppercase tracking-widest">PIONIO — {t('garanzie_label')}</span>
                </m.div>
            </div>
        </section>
    );
}
