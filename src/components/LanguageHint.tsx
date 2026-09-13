import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { alternatesFor } from '../lib/paths';
import { track } from '../lib/analytics';

const KEY = 'pionio-lang-hint-closed';

// When the browser speaks the other language and this page has a twin, say so, once, quietly. Never a
// redirect: search engines and people who chose this language keep the page they asked for.
export function LanguageHint() {
    const { locale } = useLanguage();
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);
    const alt = alternatesFor(pathname);
    const target = locale === 'it' ? alt.en : alt.it;

    useEffect(() => {
        let closed = false;
        try {
            closed = localStorage.getItem(KEY) === '1';
        } catch {
            /* storage blocked: show it, closing just won't be remembered */
        }
        const browserIt = (navigator.language ?? '').toLowerCase().startsWith('it');
        const mismatch = locale === 'it' ? !browserIt : browserIt;
        // Decided after mount on purpose: the pre-rendered page never contains the hint.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(Boolean(target) && mismatch && !closed);
    }, [locale, target]);

    if (!show || !target) return null;

    const close = () => {
        setShow(false);
        try {
            localStorage.setItem(KEY, '1');
        } catch {
            /* nothing to do */
        }
    };

    const label = locale === 'it' ? 'This page is also in English' : 'Questa pagina c’è anche in italiano';
    const to = locale === 'it' ? 'en' : 'it';

    return (
        <div className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4 pointer-events-none" role="region" aria-label={label}>
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/90 py-1 pl-4 pr-1 text-sm text-zinc-300 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <Link
                    to={target}
                    hrefLang={to}
                    onClick={() => {
                        track('lang_switch', { from: locale, to, location: 'hint' });
                        close();
                    }}
                    className="py-1.5 underline decoration-forest-500/60 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 rounded-sm"
                >
                    {label}
                </Link>
                <button
                    type="button"
                    onClick={close}
                    aria-label={locale === 'it' ? 'Close' : 'Chiudi'}
                    className="ml-1 grid h-8 w-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400"
                >
                    <X size={14} weight="bold" />
                </button>
            </div>
        </div>
    );
}
