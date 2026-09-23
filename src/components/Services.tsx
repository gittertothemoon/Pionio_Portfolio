import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';
import { getProject } from '../lib/projects';
import { projectPath } from '../lib/paths';
import { PRICES, eur, withPrices, type PriceKey } from '../lib/prices';
import { MagneticButton } from './MagneticButton';

type CommissionId = 'site' | 'shop' | 'redo' | 'tool';
type Tone = 'type' | 'line' | 'img' | 'accent' | 'field' | 'panel' | 'warn' | 'old' | 'old2' | 'oldtext';
type Radius = 'none' | 'sm' | 'md' | 'full';
// One rectangle of the page drawn in the frame: position and size in % of the page, rotation in
// degrees, o: 0 when a layout doesn't use it (it fades out where it stands).
type Block = { x: number; y: number; w: number; h: number; tone: Tone; rad: Radius; r?: number; o?: 0 };

// What you can ask me for. The starting price comes from prices.ts in the language of the page (the
// English list is for clients outside Italy); every commission now has its timing written down.
const COMMISSIONS: {
    id: CommissionId;
    priceKey: PriceKey;
    tipo: 'web' | 'ecommerce' | 'redo' | 'tool';
    example?: string;
}[] = [
    { id: 'site', priceKey: 'site', tipo: 'web' },
    { id: 'shop', priceKey: 'shopify', tipo: 'ecommerce', example: 'smoky-candle' },
    { id: 'redo', priceKey: 'redesign', tipo: 'redo' },
    { id: 'tool', priceKey: 'tool', tipo: 'tool', example: 'where2beach' },
];

const TONE: Record<Tone, string> = {
    type: 'bg-zinc-300/80',
    line: 'bg-white/[0.1]',
    img: 'bg-zinc-800 border-white/[0.06]',
    accent: 'bg-forest-500/85',
    field: 'bg-zinc-950/50 border-white/20',
    panel: 'bg-white/[0.035] border-white/[0.05]',
    warn: 'bg-amber-300/75',
    old: 'bg-amber-200/35',
    old2: 'bg-sky-300/25',
    oldtext: 'bg-white/25',
};
const RADIUS: Record<Radius, string> = { none: 'rounded-none', sm: 'rounded-[3px]', md: 'rounded-md', full: 'rounded-full' };

// A new site: menu, a big title, a picture, three blocks under the fold.
const SITE: Block[] = [
    { x: 5, y: 7, w: 11, h: 4, tone: 'type', rad: 'sm' },
    { x: 64, y: 8, w: 31, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 5, y: 21, w: 50, h: 8, tone: 'type', rad: 'sm' },
    { x: 5, y: 32, w: 38, h: 8, tone: 'type', rad: 'sm' },
    { x: 5, y: 46, w: 40, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 5, y: 51.5, w: 31, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 5, y: 60, w: 15, h: 7, tone: 'accent', rad: 'full' },
    { x: 60, y: 19, w: 35, h: 50, tone: 'img', rad: 'md' },
    { x: 5, y: 78, w: 27, h: 18, tone: 'panel', rad: 'md' },
    { x: 36.5, y: 78, w: 27, h: 18, tone: 'panel', rad: 'md' },
    { x: 68, y: 78, w: 27, h: 18, tone: 'panel', rad: 'md' },
    // not used by this page: parked, invisible, where the shop needs them
    { x: 87, y: 6, w: 8, h: 6, tone: 'accent', rad: 'full', o: 0 },
    { x: 67, y: 56, w: 20, h: 2.8, tone: 'type', rad: 'sm', o: 0 },
    { x: 67, y: 61.5, w: 9, h: 2.4, tone: 'line', rad: 'sm', o: 0 },
    { x: 36, y: 80, w: 28, h: 30, tone: 'img', rad: 'md', o: 0 },
    { x: 67, y: 80, w: 28, h: 30, tone: 'img', rad: 'md', o: 0 },
];

// A shop: cart in the corner, a grid of products with names and prices, the next row below the fold.
const SHOP: Block[] = [
    { x: 5, y: 7, w: 11, h: 4, tone: 'type', rad: 'sm' },
    { x: 40, y: 8, w: 30, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 5, y: 56, w: 18, h: 2.8, tone: 'type', rad: 'sm' },
    { x: 36, y: 56, w: 14, h: 2.8, tone: 'type', rad: 'sm' },
    { x: 5, y: 61.5, w: 9, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 36, y: 61.5, w: 9, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 67, y: 67, w: 16, h: 6.5, tone: 'accent', rad: 'full' },
    { x: 5, y: 19, w: 28, h: 34, tone: 'img', rad: 'md' },
    { x: 36, y: 19, w: 28, h: 34, tone: 'img', rad: 'md' },
    { x: 67, y: 19, w: 28, h: 34, tone: 'img', rad: 'md' },
    { x: 5, y: 80, w: 28, h: 30, tone: 'img', rad: 'md' },
    { x: 87, y: 6, w: 8, h: 6, tone: 'accent', rad: 'full' },
    { x: 67, y: 56, w: 20, h: 2.8, tone: 'type', rad: 'sm' },
    { x: 67, y: 61.5, w: 9, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 36, y: 80, w: 28, h: 30, tone: 'img', rad: 'md' },
    { x: 67, y: 80, w: 28, h: 30, tone: 'img', rad: 'md' },
];

// The site you have today: a giant logo, a banner, a slider, badges, nothing lined up.
const MESS: Block[] = [
    { x: 27, y: 3, w: 46, h: 10, tone: 'old', rad: 'none', r: -1 },
    { x: 2, y: 16, w: 96, h: 5, tone: 'old2', rad: 'none' },
    { x: 8, y: 25, w: 62, h: 6, tone: 'oldtext', rad: 'none', r: 2 },
    { x: 16, y: 33, w: 68, h: 6, tone: 'oldtext', rad: 'none', r: -1.5 },
    { x: 4, y: 44, w: 30, h: 3, tone: 'line', rad: 'none' },
    { x: 40, y: 45, w: 22, h: 3, tone: 'line', rad: 'none', r: 3 },
    { x: 71, y: 40, w: 24, h: 12, tone: 'old', rad: 'none', r: 5 },
    { x: 6, y: 52, w: 44, h: 28, tone: 'img', rad: 'none', r: -2 },
    { x: 54, y: 56, w: 40, h: 10, tone: 'old2', rad: 'none' },
    { x: 56, y: 69, w: 18, h: 18, tone: 'img', rad: 'none', r: 6 },
    { x: 78, y: 70, w: 18, h: 22, tone: 'oldtext', rad: 'none', r: -3 },
    { x: 2, y: 84, w: 30, h: 8, tone: 'old', rad: 'none' },
    { x: 34, y: 88, w: 34, h: 6, tone: 'line', rad: 'none', r: 1 },
    { x: 72, y: 26, w: 22, h: 8, tone: 'old2', rad: 'none', r: -6 },
    { x: 3, y: 94, w: 94, h: 5, tone: 'old2', rad: 'none' },
    { x: 45, y: 12, w: 9, h: 3.4, tone: 'accent', rad: 'none', r: 12 },
];

// The same site, redone: what's worth keeping, lined up; the clutter fades where it stood.
const REDO: Block[] = [
    { x: 5, y: 7, w: 11, h: 4, tone: 'type', rad: 'sm' },
    { x: 64, y: 8, w: 31, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 17, y: 21, w: 66, h: 8, tone: 'type', rad: 'sm' },
    { x: 27, y: 32, w: 46, h: 8, tone: 'type', rad: 'sm' },
    { x: 28, y: 46, w: 44, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 34, y: 51.5, w: 32, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 42.5, y: 60, w: 15, h: 7, tone: 'accent', rad: 'full' },
    { x: 5, y: 76, w: 44, h: 26, tone: 'img', rad: 'md' },
    { x: 51, y: 76, w: 44, h: 26, tone: 'img', rad: 'md' },
    ...MESS.slice(9).map((b) => ({ ...b, o: 0 as const })),
];

// A tool: one field, one button, and what it found, row by row.
const TOOL: Block[] = [
    { x: 5, y: 7, w: 9, h: 4, tone: 'type', rad: 'sm' },
    { x: 72, y: 8, w: 23, h: 2.4, tone: 'line', rad: 'sm' },
    { x: 5, y: 18, w: 44, h: 6, tone: 'type', rad: 'sm' },
    { x: 5, y: 29, w: 64, h: 9, tone: 'field', rad: 'md' },
    { x: 12, y: 49, w: 40, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 12, y: 62, w: 30, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 71, y: 29, w: 24, h: 9, tone: 'accent', rad: 'md' },
    { x: 5, y: 45, w: 90, h: 10.5, tone: 'panel', rad: 'md' },
    { x: 5, y: 58, w: 90, h: 10.5, tone: 'panel', rad: 'md' },
    { x: 5, y: 71, w: 90, h: 10.5, tone: 'panel', rad: 'md' },
    { x: 5, y: 84, w: 90, h: 10.5, tone: 'panel', rad: 'md' },
    { x: 8, y: 48.5, w: 2.2, h: 3.6, tone: 'accent', rad: 'full' },
    { x: 8, y: 61.5, w: 2.2, h: 3.6, tone: 'warn', rad: 'full' },
    { x: 8, y: 74.5, w: 2.2, h: 3.6, tone: 'accent', rad: 'full' },
    { x: 12, y: 75, w: 46, h: 2.6, tone: 'line', rad: 'sm' },
    { x: 12, y: 88, w: 36, h: 2.6, tone: 'line', rad: 'sm' },
];

const LAYOUTS: Record<CommissionId, Block[]> = { site: SITE, shop: SHOP, redo: REDO, tool: TOOL };
// Before the frame first comes into view: every block at zero width, so the page draws itself in.
const BLANK: Block[] = SITE.map((b) => ({ ...b, w: 0, o: 0 as const }));
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// The price rolls to the new figure like a mechanical counter, one wheel per digit. Always five wheels,
// because the tool starts at five digits; the leading ones fold away when the figure is shorter, so
// switching from 10.000 to 2.500 still rolls instead of jumping.
function Odometer({ value, sep }: { value: number; sep: string }) {
    const digits = String(value).padStart(5, '0').split('').map(Number);
    const lead = 5 - String(value).length;
    return (
        <>
            {digits.map((d, i) => (
                <Fragment key={i}>
                    {i === 2 && <span>{sep}</span>}
                    <span
                        className={`inline-block h-[1.1em] overflow-hidden transition-[max-width] duration-500 ${
                            i < lead ? 'max-w-0' : 'max-w-[1ch]'
                        }`}
                    >
                        <span className="odo-col block" style={{ transform: `translateY(-${d * 10}%)`, transitionDelay: `${i * 70}ms` }}>
                            {DIGITS.map((n) => (
                                <span key={n} className="block h-[1.1em]">
                                    {n}
                                </span>
                            ))}
                        </span>
                    </span>
                </Fragment>
            ))}
        </>
    );
}

// 04. Pick what you need on the left; on the right a page of that kind reshapes itself in the frame,
// the starting price rolls to its figure, and the button carries the choice into the contact form.
export function Services() {
    const { t, locale } = useLanguage();
    const [active, setActive] = useState<CommissionId>('site');
    const [phase, setPhase] = useState<'drawn' | 'blank' | 'mess'>('drawn');
    const activeRef = useRef<CommissionId>('site');
    const reduced = useRef(false);
    const redoTimer = useRef<number | undefined>(undefined);
    const hoverTimer = useRef<number | undefined>(undefined);
    const stageRef = useRef<HTMLDivElement>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    // The frame draws its page the first time it comes into view (not if it's already on screen,
    // or if the visitor prefers less motion).
    useEffect(() => {
        reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const el = stageRef.current;
        if (!el || reduced.current || el.getBoundingClientRect().top < window.innerHeight) return;
        // la prima risposta dell'osservatore arriva subito: fuori schermo la pagina si cancella, e si disegna entrando
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setPhase('blank');
                    return;
                }
                setPhase('drawn');
                io.disconnect();
            },
            { threshold: 0.35 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(
        () => () => {
            window.clearTimeout(redoTimer.current);
            window.clearTimeout(hoverTimer.current);
        },
        [],
    );

    const choose = (id: CommissionId) => {
        if (id === activeRef.current) return;
        activeRef.current = id;
        setActive(id);
        window.clearTimeout(redoTimer.current);
        // Redoing a site is shown, not told: the old page turns up first, cluttered, then sorts itself out.
        if (id === 'redo' && !reduced.current) {
            setPhase('mess');
            redoTimer.current = window.setTimeout(() => setPhase('drawn'), 700);
        } else {
            setPhase('drawn');
        }
    };

    // With a mouse, pointing is enough; a short pause keeps a diagonal pass from switching.
    const point = (id: CommissionId) => (e: PointerEvent<HTMLButtonElement>) => {
        if (e.pointerType !== 'mouse') return;
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => choose(id), 120);
    };
    const unpoint = () => window.clearTimeout(hoverTimer.current);

    const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
        const n = COMMISSIONS.length;
        let j = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + n) % n;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = n - 1;
        if (j < 0) return;
        e.preventDefault();
        choose(COMMISSIONS[j].id);
        tabs.current[j]?.focus();
    };

    const c = COMMISSIONS.find((x) => x.id === active) ?? COMMISSIONS[0];
    const sep = locale === 'it' ? '.' : ',';
    const amount = PRICES[c.priceKey][locale];
    const priceLabel = `${t('cm_from')} ${eur(amount, locale)}`;
    const example = c.example ? getProject(c.example) : undefined;
    const layout = phase === 'blank' ? BLANK : phase === 'mess' && active === 'redo' ? MESS : LAYOUTS[active];

    const talk = () => {
        track('cta_contact_click', { source: `services_${c.id}`, locale });
        window.dispatchEvent(
            new CustomEvent('pionio:commission', {
                detail: { tipo: t(`contact_tipo_${c.tipo}`), message: t(`cm_${c.id}_msg`) },
            }),
        );
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className="relative w-full overflow-hidden border-t border-white/5 bg-zinc-950 px-6 py-24 md:px-12 md:py-36"
            aria-labelledby="services-title"
        >
            <div className="mx-auto max-w-[1400px]">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-sm tracking-widest text-forest-500">{t('section_num_services')}</span>
                    <div className="h-[1px] w-8 bg-forest-500/50" />
                    <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">{t('services_label')}</span>
                </div>
                <h2 id="services-title" className="mt-7 text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                    {t('services_title')}
                </h2>
                <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-zinc-400 md:text-lg">{t('services_intro')}</p>

                <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div
                            role="tablist"
                            aria-orientation="vertical"
                            aria-label={t('services_tabs_label')}
                            className="flex flex-col lg:sticky lg:top-28"
                        >
                            {COMMISSIONS.map((item, i) => {
                                const on = item.id === active;
                                return (
                                    <button
                                        key={item.id}
                                        ref={(el) => {
                                            tabs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`cm-tab-${item.id}`}
                                        aria-selected={on}
                                        aria-controls="cm-panel"
                                        tabIndex={on ? 0 : -1}
                                        onClick={() => choose(item.id)}
                                        onPointerEnter={point(item.id)}
                                        onPointerLeave={unpoint}
                                        onKeyDown={(e) => onKey(e, i)}
                                        className={`relative py-3 pl-6 text-left text-balance text-3xl leading-[1.08] tracking-tight transition-colors duration-500 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-500/60 md:py-4 md:text-4xl xl:text-5xl ${
                                            on ? 'text-white' : 'text-zinc-600 hover:text-zinc-300'
                                        }`}
                                    >
                                        <span
                                            aria-hidden
                                            className={`absolute left-0 top-1/2 h-[0.9em] w-[2px] -translate-y-1/2 bg-forest-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                on ? 'scale-y-100' : 'scale-y-0'
                                            }`}
                                        />
                                        {t(`cm_${item.id}_name`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div ref={stageRef} className="relative">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-x-12 -bottom-20 top-12 bg-[radial-gradient(ellipse_at_center,rgba(48,107,77,0.2),transparent_65%)]"
                            />
                            <div
                                aria-hidden
                                className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                            >
                                <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-zinc-800/80 px-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span key={active} className="cm-in ml-3 truncate font-mono text-[11px] text-zinc-500">
                                        {t(`cm_${active}_url`)}
                                    </span>
                                </div>
                                <div className={`relative aspect-[16/10] ${phase === 'mess' ? 'wf-fast' : ''}`}>
                                    {layout.map((b, i) => (
                                        <div
                                            key={i}
                                            className={`wf-block ${TONE[b.tone]} ${RADIUS[b.rad]}`}
                                            style={{
                                                left: `${b.x}%`,
                                                top: `${b.y}%`,
                                                width: `${b.w}%`,
                                                height: `${b.h}%`,
                                                opacity: b.o ?? 1,
                                                transform: `rotate(${b.r ?? 0}deg)`,
                                                transitionDelay: `${i * 26}ms`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div id="cm-panel" role="tabpanel" aria-labelledby={`cm-tab-${active}`} className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
                            <div>
                                <div className="flex items-end gap-3">
                                    <span className="pb-[0.55rem] text-sm text-zinc-500">{t('cm_from')}</span>
                                    <span
                                        aria-hidden
                                        className="inline-flex text-5xl font-medium leading-[1.1em] tracking-tight text-white tabular-nums md:text-6xl"
                                    >
                                        {locale === 'en' && <span>€</span>}
                                        <Odometer value={amount} sep={sep} />
                                        {locale === 'it' && <span className="ml-[0.2em]">€</span>}
                                    </span>
                                    <span className="sr-only">{priceLabel}</span>
                                </div>
                                <p key={`note-${active}`} className="cm-in mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                                    {withPrices(t(`cm_${active}_note`), locale)}
                                </p>
                                <div key={`time-${active}`} className="cm-in mt-6">
                                    <p className="text-sm text-zinc-500">{t('cm_time_label')}</p>
                                    <p className="mt-1 text-lg text-zinc-200">{t(`cm_${active}_time`)}</p>
                                </div>
                            </div>
                            <div key={`in-${active}`} className="cm-in">
                                <p className="text-sm text-zinc-500">{t('cm_in_label')}</p>
                                <ul className="mt-3 flex flex-col gap-2.5 text-base leading-snug text-zinc-300">
                                    {[1, 2, 3].map((n) => (
                                        <li key={n} className="flex gap-3">
                                            <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                                            {t(`cm_${active}_in_${n}`)}
                                        </li>
                                    ))}
                                </ul>
                                {(example || active === 'site') && (
                                    <p className="mt-5 text-sm text-zinc-500">
                                        {t('cm_example_label')}{' '}
                                        {example ? (
                                            <Link
                                                to={projectPath(example.slug, locale)}
                                                onClick={() => track('nav_click', { target: `project_${example.slug}`, locale })}
                                                className="text-zinc-200 underline decoration-forest-500/60 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400"
                                            >
                                                {example.title}
                                            </Link>
                                        ) : (
                                            <span className="text-zinc-300">{t('cm_site_example')}</span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col items-start gap-6">
                            <MagneticButton onClick={talk}>
                                {t(`cm_${active}_cta`)} <ArrowRight size={18} weight="bold" />
                            </MagneticButton>
                            <p className="max-w-md text-sm leading-relaxed text-zinc-500">{t('services_fine')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
