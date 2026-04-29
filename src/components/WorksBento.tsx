import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, X } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Project = {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    description: string;
    span: string;
    url?: string;
    imageFit?: 'contain' | 'cover';
    theme?: 'dark' | 'light';
};

export function WorksBento() {
    const { t } = useLanguage();
    const projects: Project[] = [
        {
            id: 'w2b',
            title: 'Where2Beach',
            category: t('work_w2b_cat'),
            year: '2025',
            image: '/images/w2b-logo.png',
            description: t('work_w2b_desc'),
            url: 'https://www.where2beach.com',
            imageFit: 'contain',
            span: 'md:col-span-2',
        },
        {
            id: 'flow',
            title: 'FLOW Pilates Studio',
            category: t('work_flow_cat'),
            year: '2026',
            image: '/images/flow-logo.png',
            description: t('work_flow_desc'),
            url: 'https://flow-pilates-studio-bo.vercel.app',
            imageFit: 'contain',
            theme: 'light',
            span: 'md:col-span-1'
        },
        {
            id: 'antonela',
            title: "Antonela's Paintings",
            category: t('work_antonela_cat'),
            year: '2024',
            image: '/images/antonela.jpg',
            description: t('work_antonela_desc'),
            span: 'md:col-span-1'
        },
        {
            id: 'smoky',
            title: 'Smoky Candle',
            category: t('work_smoky_cat'),
            year: '2024',
            image: '/images/smokycandle.jpg',
            description: t('work_smoky_desc'),
            span: 'md:col-span-1'
        },
        {
            id: 'arena',
            title: 'Arena Barbershop',
            category: t('work_arena_cat'),
            year: '2024',
            image: '/images/arena.png',
            description: t('work_arena_desc'),
            span: 'md:col-span-1'
        }
    ];

    const [activeWork, setActiveWork] = useState<Project | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeWork) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [activeWork]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-zinc-950">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6 w-full md:w-1/3"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('works_label')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white leading-none">
                        {t('works_headline')}
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]"
                >
                    {/* Main Hero Card */}
                    <motion.article
                        layoutId={`card-${projects[0].id}`}
                        onClick={() => setActiveWork(projects[0])}
                        variants={itemVariants}
                        className="md:col-span-2 relative rounded-[2.5rem] bg-zinc-800 border border-white/5 overflow-hidden group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    >
                        <motion.div layoutId={`image-${projects[0].id}`} className="absolute inset-0 bg-zinc-700">
                            <img src={projects[0].image} alt={projects[0].title} className={`w-full h-full ${projects[0].imageFit === 'contain' ? 'object-contain p-12 md:p-16' : 'object-cover'} opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out will-change-transform`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/80 via-zinc-800/20 to-transparent" />
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-br from-forest-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay pointer-events-none" />

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start">
                                <motion.span layoutId={`category-${projects[0].id}`} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 font-mono text-xs uppercase tracking-widest">
                                    {projects[0].category}
                                </motion.span>
                            </div>

                            <div className="flex flex-col gap-2 relative z-10">
                                <motion.h3 layoutId={`title-${projects[0].id}`} className="text-3xl md:text-5xl font-sans tracking-tight text-white">
                                    {projects[0].title}
                                </motion.h3>
                                <div className="flex items-center gap-4 text-zinc-400 font-mono text-sm">
                                    <span>{projects[0].year}</span>
                                </div>
                            </div>
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-forest-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <span className="px-6 py-3 bg-white text-zinc-950 rounded-full font-mono text-xs tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                {t('works_view_case')} <ArrowUpRight weight="bold" />
                            </span>
                        </div>
                    </motion.article>

                    {/* Secondary Cards */}
                    {projects.slice(1).map((work) => {
                        const isLight = work.theme === 'light';
                        const isContain = work.imageFit === 'contain';
                        return (
                        <motion.article
                            key={work.id}
                            layoutId={`card-${work.id}`}
                            onClick={() => setActiveWork(work)}
                            variants={itemVariants}
                            className={`${work.span ? work.span : ''} relative rounded-[2.5rem] ${isLight ? 'bg-[#FAF7F2] border-zinc-200/60' : 'bg-zinc-900 border-white/5'} border overflow-hidden group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}
                        >
                            <motion.div layoutId={`image-${work.id}`} className={`absolute inset-0 ${isLight ? 'bg-[#FAF7F2]' : 'bg-zinc-800'}`}>
                                <img src={work.image} alt={work.title} className={`w-full h-full ${isContain ? 'object-contain p-10' : 'object-cover'} ${isLight ? 'opacity-100' : 'opacity-80'} group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out will-change-transform`} />
                                {!isLight && <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />}
                            </motion.div>

                            <div className={`absolute inset-0 bg-gradient-to-br bg-forest-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-1000 pointer-events-none`} />

                            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <motion.span layoutId={`category-${work.id}`} className={`${isLight ? 'text-forest-700' : 'text-forest-400'} font-mono text-xs uppercase tracking-widest`}>
                                        {work.category}
                                    </motion.span>
                                    <ArrowUpRight className={`${isLight ? 'text-zinc-500 group-hover:text-zinc-900' : 'text-white/50 group-hover:text-white'} transition-colors duration-300`} size={24} />
                                </div>

                                <div className="flex flex-col gap-1 relative z-10">
                                    <motion.h3 layoutId={`title-${work.id}`} className={`text-2xl font-sans tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'} mb-1`}>
                                        {work.title}
                                    </motion.h3>
                                    <span className={`${isLight ? 'text-zinc-600' : 'text-zinc-500'} font-mono text-xs`}>{work.year}</span>
                                </div>
                            </div>
                        </motion.article>
                        );
                    })}
                </motion.div>
            </div>

            {/* Morphing Modal Overlay */}
            <AnimatePresence>
                {activeWork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-zinc-950/80 backdrop-blur-xl"
                        onClick={() => setActiveWork(null)}
                    >
                        <motion.article
                            layoutId={`card-${activeWork.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1000px] h-full max-h-[800px] bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative"
                        >
                            <button
                                onClick={() => setActiveWork(null)}
                                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-forest-500/20 transition-colors duration-300"
                            >
                                <X size={24} />
                            </button>

                            <motion.div layoutId={`image-${activeWork.id}`} className={`w-full h-[40vh] md:h-[50vh] relative ${activeWork.theme === 'light' ? 'bg-[#FAF7F2]' : 'bg-zinc-900'} shrink-0`}>
                                <img src={activeWork.image} alt={activeWork.title} className={`w-full h-full ${activeWork.imageFit === 'contain' ? 'object-contain p-12' : 'object-cover'}`} />
                                {activeWork.theme !== 'light' && <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />}
                            </motion.div>

                            <div className="p-8 md:p-12 overflow-y-auto flex flex-col gap-8">
                                <div className="flex flex-col gap-4">
                                    <motion.span layoutId={`category-${activeWork.id}`} className="text-forest-400 font-mono text-sm uppercase tracking-widest">
                                        {activeWork.category} — {activeWork.year}
                                    </motion.span>
                                    <motion.h3 layoutId={`title-${activeWork.id}`} className="text-4xl md:text-6xl font-sans tracking-tight text-white mb-2">
                                        {activeWork.title}
                                    </motion.h3>
                                </div>

                                <div className="w-full h-[1px] bg-white/10" />

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light"
                                >
                                    {activeWork.description}
                                </motion.p>

                                {activeWork.url && (
                                    <motion.a
                                        href={activeWork.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-forest-500/20 hover:border-forest-500/30 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                                    >
                                        {t('works_visit_site')} <ArrowUpRight weight="bold" />
                                    </motion.a>
                                )}
                            </div>
                        </motion.article>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
