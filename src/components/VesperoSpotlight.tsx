import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';

const points = ['vespero_point_1', 'vespero_point_2', 'vespero_point_3', 'vespero_point_4'];
const tech = ['Next.js 15', 'TypeScript', 'Supabase', 'Claude AI', 'WhatsApp API', 'Stripe'];

export function VesperoSpotlight() {
    const { t, locale } = useLanguage();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    };

    return (
        <section className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden">
            {/* Ambient warmth — a quiet nod to Vespero's identity, "a warm voice in the night",
                without leaving the portfolio's forest-green palette. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-[#c97a54]/10 blur-[130px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-1/4 left-0 h-[460px] w-[460px] rounded-full bg-forest-600/10 blur-[130px]"
            />

            <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* LEFT — copy */}
                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex flex-col gap-8"
                >
                    <m.div variants={itemVariants} className="flex items-center gap-4">
                        <span className="text-forest-500 font-mono text-sm tracking-widest">
                            {t('section_num_vespero')}
                        </span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                            {t('vespero_label')}
                        </span>
                    </m.div>

                    <m.div variants={itemVariants} className="flex flex-col gap-4">
                        <h2 className="flex items-center gap-3 md:gap-4 text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight text-white leading-none">
                            <img
                                src="/images/vespero-logo.png"
                                alt=""
                                aria-hidden="true"
                                width="80"
                                height="80"
                                decoding="async"
                                className="h-[1.15em] w-auto shrink-0"
                            />
                            Vespero
                        </h2>
                        <p className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e0a96d] to-[#c97a54]">
                            {t('vespero_tagline')}
                        </p>
                    </m.div>

                    <m.p
                        variants={itemVariants}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl"
                    >
                        {t('vespero_body')}
                    </m.p>

                    <m.ul variants={itemVariants} className="flex flex-col gap-3">
                        {points.map((k) => (
                            <li key={k} className="flex items-start gap-3 text-zinc-300">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest-400 shrink-0" />
                                <span className="text-sm md:text-base leading-relaxed">{t(k)}</span>
                            </li>
                        ))}
                    </m.ul>

                    <m.ul variants={itemVariants} className="flex flex-wrap gap-2">
                        {tech.map((x) => (
                            <li
                                key={x}
                                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 font-mono text-xs"
                            >
                                {x}
                            </li>
                        ))}
                    </m.ul>

                    <m.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
                        <a
                            href="https://vespero.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('project_visit_external', { slug: 'vespero', locale })}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/15 border border-forest-500/30 hover:bg-forest-500/25 hover:border-forest-500/50 text-forest-100 font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                        >
                            {t('vespero_cta_visit')} <ArrowUpRight weight="bold" />
                        </a>
                        <Link
                            to="/projects/vespero"
                            onClick={() => track('project_click', { slug: 'vespero', position: 'spotlight', locale })}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                        >
                            {t('vespero_cta_more')} <ArrowRight weight="bold" />
                        </Link>
                    </m.div>
                </m.div>

                {/* RIGHT — chat mock: how Vespero answers a client, in the freelancer's voice */}
                <m.div
                    initial={{ opacity: 0, scale: 0.96, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="relative mx-auto w-full max-w-md rounded-[2.5rem] border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
                        {/* header */}
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5 bg-zinc-900/60">
                            <span className="flex items-center justify-center h-11 w-11 rounded-full bg-zinc-950 border border-white/10">
                                <img
                                    src="/images/vespero-logo.png"
                                    alt="Vespero"
                                    width="44"
                                    height="44"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-7 w-7 object-contain"
                                />
                            </span>
                            <div className="flex flex-col">
                                <span className="text-white font-sans text-sm">{t('vespero_chat_name')}</span>
                                <span className="inline-flex items-center gap-1.5 text-forest-400 font-mono text-[11px]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
                                    {t('vespero_chat_status')}
                                </span>
                            </div>
                        </div>

                        {/* messages */}
                        <div className="flex flex-col gap-3 px-5 py-6">
                            <div className="self-start max-w-[80%] rounded-2xl rounded-tl-sm bg-zinc-800 px-4 py-2.5">
                                <p className="text-zinc-200 text-sm leading-relaxed">{t('vespero_chat_in')}</p>
                            </div>
                            <div className="self-end max-w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#c97a54]/25 to-[#e0a96d]/15 border border-[#e0a96d]/25 px-4 py-2.5">
                                <p className="text-[#f5e7d6] text-sm leading-relaxed">{t('vespero_chat_out')}</p>
                                <span className="block mt-1 text-right text-[#e0a96d]/70 font-mono text-[10px]">23:58</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-5 text-center text-zinc-500 font-mono text-xs tracking-wide">
                        {t('vespero_chat_caption')}
                    </p>
                </m.div>
            </div>
        </section>
    );
}
