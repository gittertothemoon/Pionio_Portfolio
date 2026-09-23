import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { AUDIT_URL, SINTETICO_URL } from '../lib/links';
import { getProject, projectCategory, type Project } from '../lib/projects';
import { projectPath } from '../lib/paths';
import { track } from '../lib/analytics';

type CraftId = 'web' | 'synth' | 'tools';

// The two works that stay in the portfolio, linked under the Web panel.
const works = ['smoky-candle', 'where2beach'].map(getProject).filter((p): p is Project => Boolean(p));

// Same head, same pose, two layers of the Sintetico anatomy: skin on top, skull underneath.
const SKIN = '/images/sintetico/anatomy-skin.webp';
const BONE = '/images/sintetico/anatomy-bone.webp';
const MATTE = '/images/sintetico/anatomy-matte.webp';
const glassMask: CSSProperties = {
    WebkitMaskImage: `url(${MATTE})`,
    maskImage: `url(${MATTE})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
};

// A real report for the receipt: the audit run on where2beach.com, from a phone, on 11/09/2026 at 22:51.
const RECEIPT = { host: 'where2beach.com', time: '22:51', fcp: '0.3 s', lcp: '0.3 s', cls: '0', weight: '406 KB', alt: '0 / 9', score: '100 / 100' };

// A closed panel shows only its title: the text below collapses to zero height (not just
// transparent), so it never pushes the title up into the picture.
function Reveal({ open, children }: { open: boolean; children: ReactNode }) {
    return (
        <div
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0'
            }`}
        >
            <div className="min-h-0 overflow-hidden">{children}</div>
        </div>
    );
}

// On desktop a closed panel reads like the spine of a book on a shelf: its name runs up the edge.
function Spine({ open, children }: { open: boolean; children: ReactNode }) {
    return (
        <span
            aria-hidden
            className={`pointer-events-none absolute bottom-9 left-7 z-10 hidden rotate-180 whitespace-nowrap [writing-mode:vertical-rl] transition-opacity duration-500 md:block ${
                open ? 'opacity-0' : 'opacity-100 delay-300'
            }`}
        >
            {children}
        </span>
    );
}

// The drawing under the Smoky Candle home page: blocks, text lines and measures of the live page
// (smokycandle.com at 1440x900, measured on 23/09/2026 with the candle lit), in the same coordinates as the screenshot above it.
const INK = 'rgba(145, 196, 168, 0.85)';
const GUIDE = 'rgba(145, 196, 168, 0.28)';
const ink = { stroke: INK, strokeWidth: 1.4, fill: 'none', vectorEffect: 'non-scaling-stroke' } as const;
const guide = { stroke: GUIDE, strokeWidth: 1, fill: 'none', vectorEffect: 'non-scaling-stroke', strokeDasharray: '6 6' } as const;
const label = { style: { fill: 'rgba(190, 221, 203, 0.95)', fontFamily: 'var(--font-mono)', fontSize: 22 } } as const;

function DimH({ x1, x2, y, text }: { x1: number; x2: number; y: number; text: string }) {
    return (
        <g>
            <path d={`M${x1} ${y}H${x2}M${x1} ${y - 8}V${y + 8}M${x2} ${y - 8}V${y + 8}`} {...ink} />
            <text x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" {...label}>
                {text}
            </text>
        </g>
    );
}

function DimV({ x, y1, y2, text }: { x: number; y1: number; y2: number; text: string }) {
    return (
        <g>
            <path d={`M${x} ${y1}V${y2}M${x - 8} ${y1}H${x + 8}M${x - 8} ${y2}H${x + 8}`} {...ink} />
            <text x={x - 14} y={(y1 + y2) / 2 + 8} textAnchor="end" {...label}>
                {text}
            </text>
        </g>
    );
}

function SmokyDrawing() {
    return (
        <svg viewBox="0 0 1440 900" className="h-full w-full" aria-hidden>
            <defs>
                <pattern id="drawing-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1.2" fill="rgba(145, 196, 168, 0.16)" />
                </pattern>
            </defs>
            {/* Drawing paper: dark green with a dot grid, so the lens reads as another sheet, not the photo */}
            <rect width="1440" height="900" fill="#0d1813" />
            <rect width="1440" height="900" fill="url(#drawing-dots)" />
            {/* Margins and header line */}
            <path d="M100 0V900M1340 0V900M0 96H1440" {...guide} />
            <text x="1340" y="126" textAnchor="end" {...label}>header · 96</text>

            {/* Header: logo, menu, cart */}
            <rect x="100" y="18" width="88" height="60" {...ink} />
            <path d="M100 18L188 78M188 18L100 78" {...ink} strokeOpacity={0.45} />
            <text x="204" y="54" {...label}>logo · 60</text>
            <rect x="605" y="40" width="68" height="16" rx="2" {...ink} />
            <rect x="705" y="40" width="63" height="16" rx="2" {...ink} />
            <rect x="800" y="40" width="80" height="16" rx="2" {...ink} />
            <text x="896" y="54" {...label}>nav · 15px</text>
            <rect x="1296" y="26" width="44" height="44" rx="22" {...ink} />

            {/* Hero copy: the three lines of the h1, the paragraph, the buttons, the scent switch */}
            <rect x="100" y="104" width="372" height="66" {...ink} />
            <rect x="100" y="191" width="405" height="66" {...ink} />
            <rect x="100" y="279" width="350" height="66" {...ink} />
            <text x="520" y="148" {...label}>h1 · 92/87</text>
            <rect x="100" y="394" width="405" height="13" {...ink} />
            <rect x="100" y="423" width="409" height="13" {...ink} />
            <rect x="100" y="453" width="326" height="13" {...ink} />
            <text x="524" y="410" {...label}>p · 18/29</text>
            <rect x="100" y="510" width="183" height="48" rx="24" {...ink} />
            <path d="M307 544H428" {...ink} />
            <text x="444" y="541" {...label}>183 × 48</text>
            <rect x="100" y="585" width="22" height="22" rx="4" {...ink} />
            <rect x="134" y="590" width="216" height="12" {...ink} />
            {/* the burn counter and the hint, shown while the candle is lit */}
            <rect x="100" y="636" width="70" height="11" {...ink} />
            <rect x="100" y="659" width="344" height="11" {...ink} />
            <rect x="100" y="681" width="176" height="11" {...ink} />
            <rect x="100" y="727" width="112" height="10" {...ink} />
            <rect x="100" y="754" width="214" height="54" rx="27" {...ink} />
            <text x="330" y="788" {...label}>214 × 54</text>
            <rect x="100" y="827" width="333" height="14" {...ink} />

            {/* The arch of the logo, and the 3D candle drawn on a canvas inside it */}
            <rect x="732" y="183" width="608" height="575" {...guide} />
            <path d="M852 758V470A184 184 0 0 1 1220 470V758" {...ink} strokeOpacity={0.6} />
            <text x="1340" y="782" textAnchor="end" {...label}>portone · 608 × 575</text>
            <rect x="946" y="410" width="180" height="290" rx="22" {...ink} />
            <path d="M946 410L1126 700M1126 410L946 700" {...ink} strokeOpacity={0.45} />
            <text x="1036" y="394" textAnchor="middle" {...label}>canvas 3D</text>

            {/* The measures: space between the blocks, the column, the margin */}
            <DimV x={80} y1={466} y2={510} text="44" />
            <DimV x={80} y1={558} y2={574} text="16" />
            <DimH x1={100} x2={603} y={886} text="503" />
            <DimH x1={0} x2={100} y={886} text="100" />
        </svg>
    );
}

// The audit's report, printed. The paper unrolls from the slot in steps, header first, like a till
// roll, every time the panel opens (on phones, the first time it scrolls into view).
function Receipt({ run, armed }: { run: number; armed: boolean }) {
    const { t, locale } = useLanguage();
    const num = (v: string) => (locale === 'it' ? v.replace('.', ',') : v);
    const rows: [string, string][] = [
        [t('rc_fcp'), num(RECEIPT.fcp)],
        [t('rc_lcp'), num(RECEIPT.lcp)],
        [t('rc_cls'), RECEIPT.cls],
        [t('rc_weight'), RECEIPT.weight],
        [t('rc_alt'), RECEIPT.alt],
    ];
    const state = run > 0 ? 'is-printing' : armed ? 'is-waiting' : '';
    return (
        <div className="relative w-full max-w-[320px]">
            <div aria-hidden className="relative z-10 h-3.5 rounded-full bg-zinc-800 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] ring-1 ring-white/10" />
            <div className="-mt-2 overflow-hidden px-3 pb-4">
                <div key={run} className={`receipt ${state}`}>
                    <p className="text-center font-bold tracking-[0.2em]">PIONIO AUDIT</p>
                    <p className="text-center text-[11px] text-zinc-500">audit.pionio.it</p>
                    <hr className="receipt-rule" />
                    <p>{RECEIPT.host}</p>
                    <p className="flex justify-between">
                        <span>{t('rc_date')}</span>
                        <span>{RECEIPT.time}</span>
                    </p>
                    <p>{t('rc_phone')}</p>
                    <hr className="receipt-rule" />
                    {rows.map(([k, v]) => (
                        <p key={k} className="flex justify-between gap-4">
                            <span>{k}</span>
                            <span>{v}</span>
                        </p>
                    ))}
                    <hr className="receipt-rule" />
                    <p className="flex justify-between font-bold">
                        <span>{t('rc_total')}</span>
                        <span>{RECEIPT.score}</span>
                    </p>
                    <p className="text-right font-bold">{t('rc_grade')}</p>
                    <hr className="receipt-rule" />
                    <p>{t('rc_verdict')}</p>
                </div>
            </div>
        </div>
    );
}

// Where you point, the lens follows: its position is written on the element as % of its size.
const follow = (ref: RefObject<HTMLDivElement | null>) => (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--ly', `${((e.clientY - r.top) / r.height) * 100}%`);
    el.classList.add('is-looking');
};
const leave = (ref: RefObject<HTMLDivElement | null>) => () => ref.current?.classList.remove('is-looking');

// Three crafts, one person. On desktop the panel you point at opens up and the section's light moves
// under it; the others close into spines. Each craft shows what lies under its surface: Web a real page
// with its drawing underneath, Sintetico a glass head with the skull under the skin, Tools the audit's
// real report printed on a receipt.
export function Crafts() {
    const { t, locale } = useLanguage();
    const [active, setActive] = useState<CraftId>('web');
    const [site, setSite] = useState('');
    const [printRun, setPrintRun] = useState(0);
    const [armed, setArmed] = useState(false);
    const toolsRef = useRef<HTMLElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    // Once the page runs, the receipt waits inside the printer until its first print.
    useEffect(() => setArmed(true), []);

    // Phones have no hover: the receipt prints once when the tools panel scrolls into view.
    useEffect(() => {
        const el = toolsRef.current;
        if (!el || !window.matchMedia('(max-width: 767px)').matches) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setPrintRun((n) => n + 1);
                    io.disconnect();
                }
            },
            { threshold: 0.5 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const checkSite = (e: FormEvent) => {
        e.preventDefault();
        const url = new URL(AUDIT_URL);
        const raw = site.trim();
        if (raw) url.searchParams.set('url', raw);
        url.searchParams.set('from', 'site_crafts');
        track('audit_click', { source: 'crafts', locale });
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
    };

    const open = (id: CraftId) => active === id;
    const enter = (id: CraftId) => {
        if (id === 'tools' && active !== 'tools') setPrintRun((n) => n + 1);
        setActive(id);
    };
    const panelProps = (id: CraftId) => ({
        onMouseEnter: () => enter(id),
        onFocus: () => enter(id),
        style: { flexGrow: open(id) ? 3 : 1 } as CSSProperties,
    });
    const panelBase =
        'group relative shrink-0 overflow-hidden md:shrink md:basis-0 rounded-[2rem] border outline-none transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-forest-400 md:h-auto';
    const titleFade = (id: CraftId) => `transition-opacity duration-500 ${open(id) ? 'opacity-100 delay-200' : 'opacity-100 md:opacity-0'}`;

    return (
        <section className="relative w-full overflow-hidden bg-zinc-950 px-6 py-24 md:px-12 md:py-32" aria-labelledby="crafts-title">
            {/* The section's light sits under whichever craft is open. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className={`craft-glow craft-glow-web ${open('web') ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`craft-glow craft-glow-synth ${open('synth') ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`craft-glow craft-glow-tools ${open('tools') ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <div className="relative mx-auto max-w-[1400px]">
                <div className="flex items-center gap-4">
                    <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_crafts')}</span>
                    <div className="h-[1px] w-8 bg-forest-500/50" />
                    <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('crafts_label')}</span>
                </div>
                <h2
                    id="crafts-title"
                    className="mt-8 max-w-4xl text-4xl md:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.02] text-white"
                >
                    {t('crafts_headline')}
                </h2>

                <div className="mt-14 flex flex-col gap-4 md:mt-20 md:h-[74vh] md:min-h-[580px] md:max-h-[780px] md:flex-row">
                    {/* Web */}
                    <article
                        tabIndex={0}
                        {...panelProps('web')}
                        className={`${panelBase} h-[620px] bg-zinc-900/70 ${open('web') ? 'border-forest-500/40' : 'border-white/10'}`}
                    >
                        <Spine open={open('web')}>
                            <span className="text-5xl font-sans tracking-tight text-white">{t('craft_web_title')}</span>
                        </Spine>
                        <div
                            className={`absolute inset-x-0 top-6 bottom-[250px] flex items-center justify-center px-6 transition-opacity duration-700 md:bottom-36 md:px-10 ${
                                open('web') ? 'opacity-100' : 'opacity-100 md:opacity-40'
                            }`}
                        >
                            <Link
                                to={projectPath('smoky-candle', locale)}
                                onClick={() => track('nav_click', { target: 'project_smoky-candle', locale })}
                                className={`relative block w-full max-w-[680px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 ${
                                    open('web') ? 'scale-100' : 'scale-90'
                                }`}
                            >
                                <div className="flex h-6 items-center gap-1.5 bg-zinc-800 px-2.5" aria-hidden>
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                    <span className="ml-2 truncate font-mono text-[10px] text-zinc-500">smokycandle.com</span>
                                </div>
                                <div ref={pageRef} onPointerMove={follow(pageRef)} onPointerLeave={leave(pageRef)} className="page-xray relative aspect-[16/10]">
                                    <img
                                        src="/images/crafts/smoky-home.webp"
                                        srcSet="/images/crafts/smoky-home-800.webp 800w, /images/crafts/smoky-home.webp 1440w"
                                        sizes="(min-width: 768px) 680px, 90vw"
                                        alt={t('craft_web_alt')}
                                        width={1440}
                                        height={900}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="page-drawing absolute inset-0">
                                        <SmokyDrawing />
                                    </div>
                                    <span aria-hidden className="page-lens-ring" />
                                </div>
                            </Link>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent p-7 pt-16 md:p-9 md:pt-20">
                            <h3 className={`text-3xl md:text-5xl font-sans tracking-tight text-white ${titleFade('web')}`}>{t('craft_web_title')}</h3>
                            <Reveal open={open('web')}>
                                <p className="mt-3 max-w-lg text-zinc-400 leading-relaxed">{t('craft_web_line')}</p>
                                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                                    {works.map((p) => (
                                        <li key={p.slug} className="flex items-baseline gap-2">
                                            <Link to={projectPath(p.slug, locale)} className="text-sm font-medium text-forest-300 underline decoration-forest-500/40 underline-offset-4 hover:text-white">
                                                {p.title}
                                            </Link>
                                            <span className="text-xs text-zinc-500">{projectCategory(p, locale)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>
                    </article>

                    {/* Sintetico */}
                    <article
                        tabIndex={0}
                        {...panelProps('synth')}
                        className={`${panelBase} h-[620px] bg-black ${open('synth') ? 'border-[#9fb3c8]/40' : 'border-white/10'}`}
                    >
                        <span
                            aria-hidden
                            className={`craft-prism absolute inset-x-0 top-0 h-px origin-left transition-transform duration-700 ${open('synth') ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                        <Spine open={open('synth')}>
                            <span className="font-bodoni text-6xl tracking-[-0.01em] text-[#ede6da]">Sintetico</span>
                        </Spine>
                        <div
                            onPointerMove={follow(headRef)}
                            onPointerLeave={leave(headRef)}
                            className="absolute inset-x-0 top-6 bottom-[250px] flex items-center justify-center md:bottom-28"
                        >
                            <div
                                ref={headRef}
                                className={`synth-stage xray relative aspect-square h-full max-w-full ${
                                    open('synth') ? 'scale-100' : 'scale-90'
                                }`}
                            >
                                <img src={SKIN} alt={t('craft_synth_alt')} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                                <img src={BONE} alt="" aria-hidden loading="lazy" decoding="async" className="xray-bone absolute inset-0 h-full w-full object-contain" />
                                <div className="synth-light" aria-hidden style={glassMask} />
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-7 pt-16 md:p-9 md:pt-20">
                            <h3 className={`font-bodoni text-4xl md:text-6xl tracking-[-0.01em] text-[#ede6da] ${titleFade('synth')}`}>Sintetico</h3>
                            <Reveal open={open('synth')}>
                                <p className="mt-3 max-w-md text-zinc-400 leading-relaxed">{t('craft_synth_line')}</p>
                                {SINTETICO_URL ? (
                                    <a
                                        href={SINTETICO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#ede6da] hover:text-white"
                                    >
                                        {t('craft_synth_cta')} <ArrowUpRight size={15} weight="bold" />
                                    </a>
                                ) : (
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#ede6da]/60">{t('sintetico_soon')}</span>
                                )}
                            </Reveal>
                        </div>
                    </article>

                    {/* Tools */}
                    <article
                        ref={toolsRef}
                        tabIndex={0}
                        {...panelProps('tools')}
                        className={`${panelBase} h-[720px] bg-zinc-900/70 ${open('tools') ? 'border-forest-500/40' : 'border-white/10'}`}
                    >
                        <Spine open={open('tools')}>
                            <span className="text-5xl font-sans tracking-tight text-white">{t('craft_tools_title')}</span>
                        </Spine>
                        <div
                            className={`absolute inset-x-0 top-6 bottom-[330px] flex justify-center px-6 transition-opacity duration-700 md:bottom-[270px] md:justify-end md:px-14 ${
                                open('tools') ? 'opacity-100' : 'opacity-100 md:opacity-0'
                            }`}
                        >
                            <Receipt run={printRun} armed={armed} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent p-7 pt-10 md:p-9 md:pt-12">
                            <h3 className={`text-3xl md:text-5xl font-sans tracking-tight text-white ${titleFade('tools')}`}>{t('craft_tools_title')}</h3>
                            <Reveal open={open('tools')}>
                                <p className="mt-3 max-w-md text-zinc-400 leading-relaxed">{t('craft_tools_line')}</p>
                                <form onSubmit={checkSite} className="mt-5 flex max-w-md items-center gap-2">
                                    <label htmlFor="craft-audit-url" className="sr-only">
                                        {t('craft_tools_label')}
                                    </label>
                                    <input
                                        id="craft-audit-url"
                                        type="text"
                                        inputMode="url"
                                        autoComplete="url"
                                        spellCheck={false}
                                        value={site}
                                        onChange={(e) => setSite(e.target.value)}
                                        placeholder={t('craft_tools_placeholder')}
                                        className="min-w-0 flex-1 rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2.5 font-mono text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-forest-500/60 focus:ring-2 focus:ring-forest-500/20"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300"
                                    >
                                        {t('craft_tools_go')}
                                    </button>
                                </form>
                                <p className="mt-3 max-w-md text-sm text-zinc-500">{t('craft_tools_hint')}</p>
                            </Reveal>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
