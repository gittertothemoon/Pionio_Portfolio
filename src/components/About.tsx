import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLanguage } from '../context/LanguageContext';

// The six defaults that get decided, in order (texts: spec_<id>, spec_<id>_from, spec_<id>_to).
const STEPS = ['bg', 'type', 'title', 'margin', 'colour', 'buttons'] as const;

type Flags = { step: number; type: boolean; wrap: boolean; pill: boolean };
const DONE: Flags = { step: STEPS.length, type: true, wrap: true, pill: true };

// 02. A page left to the browser's defaults turns into this site's hero, one decision per stretch of
// scroll: background, typeface, title, margins, colour, buttons. The section is tall and its stage stays
// pinned, so scrolling is what takes the decisions. Each decision has its own slice of the scroll and is
// applied continuously (--p1…--p6 written straight onto the stage, no React render per frame) with a
// little damping, so the page follows the scroll instead of snapping from one state to the next. The
// frame is decorative: the list on the left says the same thing in words.
export function About() {
    const { t } = useLanguage();
    const secRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const target = useRef(1);
    const value = useRef(1);
    const frame = useRef(0);
    // In the static HTML the page is already decided; once the page runs, the scroll position sets it.
    const [flags, setFlags] = useState<Flags>(DONE);

    useEffect(() => {
        const sec = secRef.current;
        const stage = stageRef.current;
        if (!sec || !stage) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const write = (v: number) => {
            const span = STEPS.length + 1;
            for (let i = 0; i < STEPS.length; i++) {
                const p = Math.min(1, Math.max(0, v * span - i));
                stage.style.setProperty(`--p${i + 1}`, p.toFixed(3));
            }
            const next: Flags = {
                step: Math.min(STEPS.length, Math.floor(v * span)),
                type: v * span - 1 >= 0.5,
                // the title breaks into its three rows early on, before it fills the page
                wrap: v * span - 2 >= 0.3,
                pill: v * span - 5 >= 0.5,
            };
            setFlags((prev) =>
                prev.step === next.step && prev.type === next.type && prev.wrap === next.wrap && prev.pill === next.pill ? prev : next,
            );
        };

        const measure = () => {
            const r = sec.getBoundingClientRect();
            const run = r.height - window.innerHeight;
            target.current = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 1;
        };

        const tick = () => {
            const diff = target.current - value.current;
            if (Math.abs(diff) < 0.0006) {
                value.current = target.current;
                write(value.current);
                frame.current = 0;
                return;
            }
            value.current += diff * 0.2;
            write(value.current);
            frame.current = requestAnimationFrame(tick);
        };

        const onScroll = () => {
            measure();
            if (reduced) {
                value.current = target.current;
                write(value.current);
                return;
            }
            if (!frame.current) frame.current = requestAnimationFrame(tick);
        };

        measure();
        value.current = target.current;
        write(value.current);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame.current);
        };
    }, []);

    const taken = (i: number) => flags.step > i;
    // On phones only one row of the list shows: the last decision taken (the first one, before any).
    const shown = Math.max(flags.step, 1) - 1;
    const decided = [flags.type && 'd-type', flags.wrap && 'd-wrap', flags.pill && 'd-pill'].filter(Boolean).join(' ');

    return (
        <section ref={secRef} className="relative h-[260vh] w-full border-t border-white/5 bg-zinc-950 px-6 md:px-12 lg:h-[320vh]" aria-labelledby="about-title">
            <div ref={stageRef} className="sticky top-0 flex h-[100svh] items-center">
                <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-sm tracking-widest text-forest-500">{t('section_num_about')}</span>
                            <div className="h-[1px] w-8 bg-forest-500/50" />
                            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">{t('about_label')}</span>
                        </div>
                        <h2 id="about-title" className="mt-6 text-3xl leading-[1.05] tracking-tight text-white md:text-5xl lg:mt-8 lg:text-6xl">
                            {t('about_title')}
                        </h2>
                        <p className="mt-5 max-w-md text-base font-light leading-relaxed text-zinc-400 md:text-lg lg:mt-6">{t('about_body')}</p>
                        <ol className="mt-6 lg:mt-10 lg:border-t lg:border-white/10">
                            {STEPS.map((s, i) => (
                                <li
                                    key={s}
                                    aria-current={i === flags.step - 1 ? 'step' : undefined}
                                    style={{ '--p': `var(--p${i + 1}, 1)` } as CSSProperties}
                                    className={`dec-row ${i === shown ? 'flex' : 'hidden lg:flex'} items-baseline justify-between gap-4 py-2.5 lg:border-b lg:border-white/10`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span aria-hidden className="dec-dot h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span className="dec-name">{t(`spec_${s}`)}</span>
                                    </span>
                                    <span className="text-right font-mono text-xs md:text-sm">
                                        <span className={taken(i) ? 'text-zinc-500 line-through decoration-zinc-600' : 'text-zinc-600'}>{t(`spec_${s}_from`)}</span>
                                        <span aria-hidden className="mx-2 text-zinc-600">→</span>
                                        <span className="dec-to">{t(`spec_${s}_to`)}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="lg:col-span-7">
                        <div aria-hidden className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                            <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-zinc-800/80 px-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                <span className="ml-3 font-mono text-[11px] text-zinc-500">pionio.it</span>
                                <span className="ml-auto font-mono text-[11px] tabular-nums text-zinc-500">
                                    {flags.step} / {STEPS.length}
                                </span>
                            </div>
                            <div className="spec-frame aspect-[4/3] lg:aspect-[16/10]">
                                <div className={`spec ${decided}`}>
                                    <p className="spec-title">{t('hero_title').replace(/\|/g, ' ')}</p>
                                    <div className="spec-actions">
                                        <span className="spec-btn">{flags.pill ? t('hero_cta_whatsapp') : t('spec_btn_default')}</span>
                                        <span className="spec-link">{flags.pill ? t('hero_cta_works') : t('spec_link_default')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
