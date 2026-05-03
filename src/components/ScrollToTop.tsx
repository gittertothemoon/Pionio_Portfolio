import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    }, [pathname, hash]);

    return null;
}
