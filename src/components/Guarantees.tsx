import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

// "Less motion" as the browser says it, followed live; in the static HTML it counts as yes (the signature is just there).
const MENO_MOVIMENTO = '(prefers-reduced-motion: reduce)';
const ascoltaMovimento = (avvisa: () => void) => {
    const mq = window.matchMedia(MENO_MOVIMENTO);
    mq.addEventListener('change', avvisa);
    return () => mq.removeEventListener('change', avvisa);
};
import { useLanguage } from '../context/LanguageContext';
import { SIGNATURE_D, SIGNATURE_VIEWBOX } from '../lib/signature';

const CLAUSES = [1, 2, 3] as const;

// 05. The three commitments as the clauses of a one-page agreement. When the signature line comes into
// view the signature writes itself, left to right: the outline of the letters first, then the ink.
export function Guarantees() {
    const { t } = useLanguage();
    const sigRef = useRef<HTMLDivElement>(null);
    // Without JavaScript, or with reduced motion, the signature is simply there.
    const armed = useSyncExternalStore(ascoltaMovimento, () => !window.matchMedia(MENO_MOVIMENTO).matches, () => false);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const el = sigRef.current;
        if (!el || !armed) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setSigned(true);
                io.disconnect();
            },
            { threshold: 0.8 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [armed]);

    return (
        <section className="relative w-full border-t border-white/5 bg-zinc-950 px-6 py-24 md:px-12 md:py-32" aria-labelledby="garanzie-title">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
                <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-sm tracking-widest text-forest-500">{t('section_num_garanzie')}</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">{t('garanzie_label')}</span>
                    </div>
                    <h2 id="garanzie-title" className="mt-8 text-5xl leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[5.5rem] lg:leading-[0.95]">
                        {t('garanzie_title')}
                    </h2>
                    <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-zinc-400 md:text-lg">{t('garanzie_intro')}</p>
                </div>

                <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-7 md:p-12">
                        <ol className="flex flex-col">
                            {CLAUSES.map((n) => (
                                <li key={n} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-white/10 py-6 first:pt-0 md:grid-cols-[2.5rem_1fr] md:py-7">
                                    <span className="pt-0.5 font-mono text-sm text-forest-400 md:text-base">{n}.</span>
                                    <div>
                                        <p className="text-lg font-medium tracking-tight text-white md:text-xl">{t(`garanzie_${n}_lead`)}</p>
                                        <p className="mt-2 max-w-xl text-base font-light leading-relaxed text-zinc-400">{t(`garanzie_${n}_body`)}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-10 flex justify-end">
                            <div ref={sigRef} className={`sig w-[min(100%,20rem)] ${armed ? 'is-armed' : ''} ${signed ? 'is-signed' : ''}`}>
                                <svg viewBox={SIGNATURE_VIEWBOX} className="h-auto w-full text-forest-300" role="img" aria-label={t('garanzie_sig_alt')}>
                                    <path d={SIGNATURE_D} fillRule="evenodd" className="sig-path" />
                                </svg>
                                <div className="mt-1 h-px bg-white/25" />
                                <p className="mt-2 text-right text-sm text-zinc-500">{t('garanzie_sig_caption')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
