import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { SINTETICO_URL } from '../lib/links';

const MATTE = '/images/sintetico/muse-2-matte.webp';
const mask: CSSProperties = {
    WebkitMaskImage: `url(${MATTE})`,
    maskImage: `url(${MATTE})`,
    WebkitMaskSize: 'cover',
    maskSize: 'cover',
    WebkitMaskPosition: '50% 0%',
    maskPosition: '50% 0%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
};

// Sintetico's own room inside Pionio: its black, its bone white, its Bodoni, its glass face that
// catches the light you hold. The one place on pionio.it that doesn't wear forest green.
export function SinteticoBand() {
    const { t } = useLanguage();
    const stage = useRef<HTMLDivElement>(null);

    const move = (e: PointerEvent<HTMLDivElement>) => {
        const el = stage.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--lx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--ly', `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    return (
        <section className="relative w-full overflow-hidden border-t border-white/5 bg-black" aria-labelledby="sintetico-band-title">
            <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-12 md:py-32">
                <div className="relative z-10 md:col-span-5">
                    <div className="flex items-center gap-3">
                        <img src="/images/sintetico/s-mark.webp" alt="" width={32} height={32} className="h-8 w-8" loading="lazy" />
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t('band_label')}</span>
                    </div>
                    <h2
                        id="sintetico-band-title"
                        className="font-bodoni mt-8 text-[clamp(4rem,11vw,9rem)] leading-[0.85] tracking-[-0.02em] text-[#ede6da]"
                    >
                        Sintetico
                    </h2>
                    <p className="mt-8 max-w-md text-lg leading-relaxed text-zinc-400">{t('band_body')}</p>
                    {SINTETICO_URL ? (
                        <a
                            href={SINTETICO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-flex items-center gap-2 bg-[#ede6da] px-6 py-4 text-sm font-medium text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fb3c8]"
                        >
                            {t('band_cta')} <ArrowUpRight size={16} weight="bold" />
                        </a>
                    ) : (
                        <span className="mt-10 inline-flex items-center gap-2 border border-[#ede6da]/30 px-6 py-4 text-sm font-medium text-[#ede6da]/70">
                            {t('sintetico_soon')}
                        </span>
                    )}
                </div>

                <div ref={stage} onPointerMove={move} className="synth-stage relative md:col-span-7">
                    <img
                        src="/images/sintetico/muse-2.webp"
                        alt={t('band_img_alt')}
                        width={900}
                        height={1205}
                        loading="lazy"
                        decoding="async"
                        className="synth-fade mx-auto aspect-[4/5] w-full object-cover object-[50%_0%]"
                    />
                    <div className="synth-light" aria-hidden="true" style={mask} />
                </div>
            </div>
        </section>
    );
}
