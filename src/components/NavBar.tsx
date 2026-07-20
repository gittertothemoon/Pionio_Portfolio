import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    User,
    Lightning,
    GridFour,
    Briefcase,
    EnvelopeSimple,
    Article,
} from '@phosphor-icons/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';

type AnchorItem = {
    name: string;
    hash: string;
    icon: typeof User;
    type: 'anchor';
    tKey: string;
};
type RouteItem = {
    name: string;
    to: string;
    icon: typeof User;
    type: 'route';
    tKey: string;
};
type ExternalItem = {
    name: string;
    href: string;
    icon: typeof User;
    type: 'external';
    tKey: string;
};
type NavItem = AnchorItem | RouteItem | ExternalItem;

const navItems: NavItem[] = [
    { name: 'Works', hash: 'works', icon: GridFour, type: 'anchor', tKey: 'nav_works' },
    { name: 'Capabilities', hash: 'services', icon: Lightning, type: 'anchor', tKey: 'nav_capabilities' },
    { name: 'About', hash: 'chi-sono', icon: User, type: 'anchor', tKey: 'nav_about' },
    { name: 'Experience', hash: 'experience', icon: Briefcase, type: 'anchor', tKey: 'nav_experience' },
    { name: 'Blog', to: '/blog', icon: Article, type: 'route', tKey: 'nav_blog' },
    { name: 'Contatti', hash: 'contact', icon: EnvelopeSimple, type: 'anchor', tKey: 'nav_contatti' },
];

export function NavBar() {
    const { t, locale } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>('');
    const [isVisible, setIsVisible] = useState(true);

    const isHome = location.pathname === '/';

    useEffect(() => {
        if (!isHome) {
            // Reset scrollspy when leaving the single-page home route.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveSection('');
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        const sections = navItems
            .filter((i): i is AnchorItem => i.type === 'anchor')
            .map((item) => document.getElementById(item.hash))
            .filter((el): el is HTMLElement => Boolean(el));
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [isHome, location.pathname]);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const updateVisibility = () => {
            const nextY = window.scrollY;
            if (nextY < 120 || nextY < lastY - 8) setIsVisible(true);
            else if (nextY > lastY + 8) setIsVisible(false);
            lastY = nextY;
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateVisibility);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (isHome) {
            e.preventDefault();
            const target = document.getElementById(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            e.preventDefault();
            navigate(`/#${hash}`);
        }
    };

    const itemClasses = (isActive: boolean) =>
        cn(
            'relative w-full xl:w-auto px-1 xl:px-4 py-2 xl:py-2 rounded-full flex flex-col xl:flex-row gap-1 xl:gap-0 items-center justify-center transition-colors duration-300',
            isActive ? 'text-forest-100' : 'text-zinc-400 hover:text-white'
        );

    return (
        <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-0 z-50 pointer-events-none flex justify-center px-4">
            <m.nav
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 90 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: isVisible ? 0.05 : 0 }}
                aria-hidden={!isVisible}
                className={cn(
                    'flex items-center w-[calc(100vw-2rem)] max-w-[520px] xl:w-auto xl:max-w-[calc(100vw-2rem)] p-1.5 xl:p-2 rounded-full bg-zinc-950/88 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden',
                    isVisible ? 'pointer-events-auto' : 'pointer-events-none'
                )}
            >
                <ul className="grid grid-cols-6 xl:flex items-center gap-0.5 xl:gap-1 relative w-full xl:w-auto min-w-0">
                    {navItems.map((item) => {
                        const isAnchorActive =
                            item.type === 'anchor' && isHome && activeSection === item.hash;
                        const isRouteActive =
                            item.type === 'route' && location.pathname.startsWith(item.to);
                        const isActive = isAnchorActive || isRouteActive;
                        const label = t(item.tKey);
                        const inner = (
                            <>
                                <item.icon weight="duotone" className="w-[18px] h-[18px] xl:hidden relative z-10" />
                                <span className="text-[8px] leading-none xl:text-sm font-mono tracking-tight xl:tracking-wider relative z-10 whitespace-nowrap">
                                    {label}
                                </span>
                                {isActive && (
                                    <m.div
                                        layoutId="activeNavIndicator"
                                        className="absolute inset-0 rounded-full bg-forest-500/20 border border-forest-500/30"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </>
                        );

                        if (item.type === 'anchor') {
                            const href = isHome ? `#${item.hash}` : `/#${item.hash}`;
                            return (
                                <li key={item.name} className="relative min-w-0">
                                    <a
                                        href={href}
                                        onClick={(e) => handleAnchorClick(e, item.hash)}
                                        className={itemClasses(isActive)}
                                        aria-label={label}
                                        title={label}
                                        tabIndex={isVisible ? undefined : -1}
                                    >
                                        {inner}
                                    </a>
                                </li>
                            );
                        }

                        if (item.type === 'external') {
                            return (
                                <li key={item.name} className="relative min-w-0">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track('audit_click', { source: 'navbar', locale })}
                                        className={itemClasses(false)}
                                        aria-label={label}
                                        title={label}
                                        tabIndex={isVisible ? undefined : -1}
                                    >
                                        {inner}
                                    </a>
                                </li>
                            );
                        }

                        return (
                            <li key={item.name} className="relative min-w-0">
                                <Link
                                    to={item.to}
                                    className={itemClasses(isActive)}
                                    aria-label={label}
                                    title={label}
                                    tabIndex={isVisible ? undefined : -1}
                                >
                                    {inner}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </m.nav>
        </div>
    );
}
