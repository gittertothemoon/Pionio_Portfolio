import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.startsWith('#') ? hash.slice(1) : hash;
            const tryScroll = (attempt: number) => {
                const target = document.getElementById(id);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });
                } else if (attempt < 10) {
                    setTimeout(() => tryScroll(attempt + 1), 80);
                }
            };
            tryScroll(0);
            return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        // Re-assert after a frame in case browser/layout shifts the scroll
        const r1 = requestAnimationFrame(() => window.scrollTo(0, 0));
        const r2 = setTimeout(() => window.scrollTo(0, 0), 50);
        return () => {
            cancelAnimationFrame(r1);
            clearTimeout(r2);
        };
    }, [pathname, hash]);

    return null;
}
