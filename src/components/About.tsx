import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function About() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-32 md:py-48 bg-zinc-950 px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">

                {/* Left Column - Minimal Label */}
                <div className="md:col-span-4 flex flex-col justify-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-forest-500/50" />
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
                        className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 text-lg md:text-xl leading-relaxed font-light max-w-3xl"
                    >
                        <p>{t('about_p1')}</p>
                        <p>{t('about_p2')}</p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
