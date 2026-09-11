import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';
import { MagneticButton } from './MagneticButton';

const STEPS = [1, 2, 3] as const;
// Where each step sits along the line: the last third is the dashed tail, the 30 days after launch.
const AT = [0, 1 / 3, 2 / 3];

// 06. The process as a line you can read at a glance: three stops (the call, design and build, live), the
// real durations written on the segments, and a dashed tail for the support after launch. The line fills
// as the section goes past, and each stop lights up when the fill reaches it.
export function Experience() {
    const { t, locale } = useLanguage();
    const secRef = useRef<HTMLElement>(null);
    // In the static HTML, and with reduced motion, the line is already drawn.
    const [done, setDone] = useState(1);

    useEffect(() => {
        const el = secRef.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const start = window.innerHeight * 0.85;
            const end = window.innerHeight * 0.3;
            const span = r.height + (start - end);
            setDone(Math.min(1, Math.max(0, (start - r.top) / span)));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const lit = (i: number) => done >= AT[i] - 0.001;
    // The fill stops at the launch: the dashed tail, the 30 days after, stays dashed.
    const pct = `${Math.round(Math.min(done, AT[2]) * 1000) / 10}%`;
    const pctDown = `${Math.round(done * 1000) / 10}%`;

    const talk = () => {
        track('cta_contact_click', { source: 'experience', locale });
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={secRef} className="relative w-full border-t border-white/5 bg-zinc-950 px-6 py-24 md:px-12 md:py-32" aria-labelledby="exp-title">
            <div className="mx-auto max-w-[1400px]">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-sm tracking-widest text-forest-500">{t('section_num_experience')}</span>
                    <div className="h-[1px] w-8 bg-forest-500/50" />
                    <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">{t('exp_label')}</span>
                </div>
                <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
                    <h2 id="exp-title" className="max-w-2xl text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
                        {t('exp_title')}
                    </h2>
                    <MagneticButton
                        onClick={talk}
                        className="shrink-0 self-start border border-forest-500/30 bg-transparent text-forest-400 hover:border-forest-500 hover:bg-forest-500/10 md:self-auto"
                    >
                        {t('exp_cta')} <ArrowRight size={18} weight="bold" />
                    </MagneticButton>
                </div>

                {/* The line, lying down on wide screens */}
                <div className="mt-20 hidden md:block">
                    <div className="relative">
                        {/* durations, above the line */}
                        <div aria-hidden className="relative h-6">
                            {[
                                { at: '0%', key: 1, translate: '' },
                                { at: '50%', key: 2, translate: '-translate-x-1/2' },
                                { at: '83.3%', key: 3, translate: '-translate-x-1/2' },
                            ].map((m) => (
                                <span
                                    key={m.key}
                                    style={{ left: m.at }}
                                    className={`absolute bottom-0 whitespace-nowrap font-mono text-xs transition-colors duration-500 ${m.translate} ${
                                        lit(m.key - 1) ? 'text-forest-300' : 'text-zinc-600'
                                    }`}
                                >
                                    {t(`exp_${m.key}_meta`)}
                                </span>
                            ))}
                        </div>
                        {/* the line: solid up to the launch, dashed for the 30 days after */}
                        <div className="relative mt-3 h-4">
                            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" style={{ right: '33.3%' }} />
                            <div className="absolute top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/15" style={{ left: '66.6%', right: 0 }} />
                            <div className="absolute top-1/2 h-px -translate-y-1/2 bg-forest-500/80 transition-[width] duration-300 ease-out" style={{ left: 0, width: pct }} />
                            {STEPS.map((n, i) => (
                                <span
                                    key={n}
                                    style={{ left: AT[i] === 0 ? '0%' : `${AT[i] * 100}%` }}
                                    className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                                        lit(i) ? 'border-forest-400 bg-forest-500' : 'border-zinc-700 bg-zinc-950'
                                    }`}
                                />
                            ))}
                        </div>
                        {/* the three stops */}
                        <div className="mt-8 grid grid-cols-3 gap-8">
                            {STEPS.map((n, i) => (
                                <div key={n} className="transition-opacity duration-500" style={{ opacity: lit(i) ? 1 : 0.45 }}>
                                    <p className="font-mono text-xs text-zinc-500">0{n}</p>
                                    <h3 className={`mt-2 text-xl tracking-tight transition-colors duration-500 lg:text-2xl ${lit(i) ? 'text-white' : 'text-zinc-500'}`}>
                                        {t(`exp_${n}_name`)}
                                    </h3>
                                    <p className="mt-3 max-w-sm text-base font-light leading-relaxed text-zinc-400">{t(`exp_${n}_body`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* The same line, standing up on phones */}
                <div className="relative mt-12 md:hidden">
                    <div aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-white/10" />
                    <div aria-hidden className="absolute left-[5px] top-2 w-px bg-forest-500/80 transition-[height] duration-300 ease-out" style={{ height: `calc(${pctDown} * 0.92)` }} />
                    <ol className="flex flex-col gap-10">
                        {STEPS.map((n, i) => (
                            <li key={n} className="relative pl-8 transition-opacity duration-500" style={{ opacity: lit(i) ? 1 : 0.45 }}>
                                <span
                                    aria-hidden
                                    className={`absolute left-0 top-2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                                        lit(i) ? 'border-forest-400 bg-forest-500' : 'border-zinc-700 bg-zinc-950'
                                    }`}
                                />
                                <p className={`font-mono text-xs transition-colors duration-500 ${lit(i) ? 'text-forest-300' : 'text-zinc-600'}`}>{t(`exp_${n}_meta`)}</p>
                                <h3 className={`mt-1 text-xl tracking-tight transition-colors duration-500 ${lit(i) ? 'text-white' : 'text-zinc-500'}`}>{t(`exp_${n}_name`)}</h3>
                                <p className="mt-2 text-base font-light leading-relaxed text-zinc-400">{t(`exp_${n}_body`)}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
