import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../lib/analytics';

const THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const fired = new Set<number>();
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const doc = document.documentElement;
                const total = doc.scrollHeight - window.innerHeight;
                if (total > 0) {
                    const pct = (window.scrollY / total) * 100;
                    for (const t of THRESHOLDS) {
                        if (pct >= t && !fired.has(t)) {
                            fired.add(t);
                            track('scroll_depth', { depth: t, path: pathname });
                        }
                    }
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    return null;
}
