import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';

export function About() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-40 md:py-56 bg-zinc-950 px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10">

                {/* Left Column - Minimal Label */}
                <div className="md:col-span-4 flex flex-col justify-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_about')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('about_label')}</span>
                    </motion.div>
                </div>

                {/* Right Column - Oversized Asymmetric Text */}
                <div className="md:col-span-8 md:col-start-5">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white leading-[1.1]"
                    >
                        {t('about_headline_1')}<span className="text-zinc-500 italic">{t('about_headline_highlight')}</span>{t('about_headline_3')}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 text-zinc-400 text-lg md:text-xl leading-relaxed font-light max-w-3xl"
                    >
                        <p>{t('about_p1')}</p>
                        <p>{t('about_p2')}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-20"
                    >
                        <MagneticButton
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-transparent border border-white/10 hover:border-forest-500/50 hover:bg-forest-500/10 text-white"
                        >
                            {t('about_cta')} <ArrowRight size={18} weight="bold" />
                        </MagneticButton>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
