import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects, projectCategory } from '../lib/projects';

export function WorksBento() {
    const { t, locale } = useLanguage();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    };

    const hero = projects[0];
    const heroLight = hero.theme === 'light';
    const heroContain = hero.imageFit === 'contain';

    return (
        <section className="w-full py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-zinc-950">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8 w-full md:w-1/3"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_works')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                            {t('works_label')}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white leading-none">
                        {t('works_headline')}
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px] md:auto-rows-[400px]"
                >
                    <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                        <Link
                            to={`/projects/${hero.slug}`}
                            aria-label={`${hero.title} — ${projectCategory(hero, locale)}`}
                            className={`block relative rounded-[2.5rem] ${
                                heroLight ? 'bg-[#E8F4FD] border-sky-200/60' : 'bg-zinc-800 border-white/5'
                            } border overflow-hidden group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_-15px_rgba(0,0,0,0.5)] h-full`}
                        >
                            <div
                                className={`absolute inset-0 ${
                                    heroLight ? 'bg-[#E8F4FD]' : 'bg-zinc-700'
                                } ${
                                    heroContain
                                        ? 'flex items-center justify-center p-6 min-h-[140px] md:min-h-[160px]'
                                        : ''
                                }`}
                            >
                                {heroContain ? (
                                    <img
                                        src={hero.image}
                                        alt={`${hero.title} — ${projectCategory(hero, locale)} project by PIONIO`}
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="600"
                                        className={`w-[40%] h-auto object-contain ${
                                            heroLight ? 'opacity-100' : 'opacity-90'
                                        } group-hover:scale-105 transition-all duration-1000 ease-out will-change-transform`}
                                    />
                                ) : (
                                    <img
                                        src={hero.image}
                                        alt={`${hero.title} — ${projectCategory(hero, locale)} project by PIONIO`}
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="600"
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out will-change-transform"
                                    />
                                )}
                                {!heroLight && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/80 via-zinc-800/20 to-transparent" />
                                )}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-br from-forest-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay pointer-events-none" />

                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <span
                                        className={`px-4 py-2 rounded-full backdrop-blur-md font-mono text-xs uppercase tracking-widest ${
                                            heroLight
                                                ? 'border border-zinc-300/70 bg-white/50 text-zinc-700'
                                                : 'border border-white/10 bg-white/5 text-zinc-300'
                                        }`}
                                    >
                                        {projectCategory(hero, locale)}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 relative z-10">
                                    <h3
                                        className={`text-3xl md:text-5xl font-sans tracking-tight ${
                                            heroLight ? 'text-zinc-900' : 'text-white'
                                        }`}
                                    >
                                        {hero.title}
                                    </h3>
                                    <div
                                        className={`flex items-center gap-4 font-mono text-sm ${
                                            heroLight ? 'text-zinc-600' : 'text-zinc-400'
                                        }`}
                                    >
                                        <span>{hero.year}</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`absolute inset-0 ${
                                    heroLight ? 'bg-sky-900/40' : 'bg-forest-900/60'
                                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none`}
                            >
                                <span className="px-6 py-3 bg-white text-zinc-950 rounded-full font-mono text-xs tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                    {t('works_view_case')} <ArrowUpRight weight="bold" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {projects.slice(1).map((work) => {
                        const isLight = work.theme === 'light';
                        const isContain = work.imageFit === 'contain';
                        const lightBg = work.bgClass ?? 'bg-[#FAF7F2]';
                        return (
                            <motion.div
                                key={work.slug}
                                variants={itemVariants}
                                className={work.span ? `${work.span} h-full` : 'h-full'}
                            >
                                <Link
                                    to={`/projects/${work.slug}`}
                                    aria-label={`${work.title} — ${projectCategory(work, locale)}`}
                                    className={`block relative rounded-[2.5rem] ${
                                        isLight ? `${lightBg} border-zinc-200/60` : 'bg-zinc-900 border-white/5'
                                    } border overflow-hidden group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] h-full`}
                                >
                                    <div
                                        className={`absolute inset-0 ${
                                            isLight ? lightBg : 'bg-zinc-800'
                                        } ${
                                            isContain
                                                ? 'flex items-center justify-center p-6 min-h-[140px] md:min-h-[160px]'
                                                : ''
                                        }`}
                                    >
                                        {isContain ? (
                                            <img
                                                src={work.image}
                                                alt={`${work.title} — ${projectCategory(work, locale)} project by PIONIO`}
                                                loading="lazy"
                                                decoding="async"
                                                width="600"
                                                height="600"
                                                className={`w-[60%] h-auto object-contain ${
                                                    isLight ? 'opacity-100' : 'opacity-80'
                                                } group-hover:scale-105 transition-all duration-1000 ease-out will-change-transform`}
                                            />
                                        ) : (
                                            <img
                                                src={work.image}
                                                alt={`${work.title} — ${projectCategory(work, locale)} project by PIONIO`}
                                                loading="lazy"
                                                decoding="async"
                                                width="600"
                                                height="600"
                                                className={`w-full h-full object-cover ${
                                                    isLight ? 'opacity-100' : 'opacity-80'
                                                } group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out will-change-transform`}
                                            />
                                        )}
                                        {!isLight && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                                        )}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-br bg-forest-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-1000 pointer-events-none" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                                        <div className="flex justify-between items-start">
                                            <span
                                                className={`${
                                                    isLight ? 'text-forest-700' : 'text-forest-400'
                                                } font-mono text-xs uppercase tracking-widest`}
                                            >
                                                {projectCategory(work, locale)}
                                            </span>
                                            <ArrowUpRight
                                                className={`${
                                                    isLight
                                                        ? 'text-zinc-500 group-hover:text-zinc-900'
                                                        : 'text-white/50 group-hover:text-white'
                                                } transition-colors duration-300`}
                                                size={24}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 relative z-10">
                                            <h3
                                                className={`text-2xl font-sans tracking-tight ${
                                                    isLight ? 'text-zinc-900' : 'text-white'
                                                } mb-1`}
                                            >
                                                {work.title}
                                            </h3>
                                            <span
                                                className={`${
                                                    isLight ? 'text-zinc-600' : 'text-zinc-500'
                                                } font-mono text-xs`}
                                            >
                                                {work.year}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
