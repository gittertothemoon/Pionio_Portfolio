import { m } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';
import { MagneticButton } from './MagneticButton';

export function Experience() {
    const { t, locale } = useLanguage();

    const timeline = [
        { role: t('exp_1_role'), description: t('exp_1_desc') },
        { role: t('exp_2_role'), description: t('exp_2_desc') },
        { role: t('exp_3_role'), description: t('exp_3_desc') },
    ];

    return (
        <section className="relative w-full py-24 md:py-32 bg-zinc-950 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10">

                {/* Left Column - Minimal Label */}
                <div className="md:col-span-4 flex flex-col justify-start mb-4 md:mb-0">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 sticky top-32"
                    >
                        <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_experience')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('exp_label')}</span>
                    </m.div>
                </div>

                {/* Right Column - Timeline */}
                <div className="md:col-span-8 md:col-start-5 flex flex-col gap-12 md:gap-16">
                    {timeline.map((exp, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col gap-6"
                        >
                            {/* Step title */}
                            <div className="border-b border-white/5 pb-6">
                                <h3 className="text-2xl md:text-4xl font-sans tracking-tight text-white group-hover:text-forest-400 transition-colors duration-500">
                                    {exp.role}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                                {exp.description}
                            </p>
                        </m.div>
                    ))}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-8"
                    >
                        <MagneticButton
                            onClick={() => {
                                track('cta_contact_click', { source: 'experience', locale });
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-transparent border border-forest-500/30 hover:border-forest-500 hover:bg-forest-500/10 text-forest-400"
                        >
                            {t('exp_cta')} <ArrowRight size={18} weight="bold" />
                        </MagneticButton>
                    </m.div>
                </div>

            </div>
        </section>
    );
}
