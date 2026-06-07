import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    User,
    Lightning,
    GridFour,
    Briefcase,
    EnvelopeSimple,
    Wrench,
    Article,
    Gauge,
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
    { name: 'About', hash: 'about', icon: User, type: 'anchor', tKey: 'nav_about' },
    { name: 'Capabilities', hash: 'services', icon: Lightning, type: 'anchor', tKey: 'nav_capabilities' },
    { name: 'Works', hash: 'works', icon: GridFour, type: 'anchor', tKey: 'nav_works' },
    { name: 'Experience', hash: 'experience', icon: Briefcase, type: 'anchor', tKey: 'nav_experience' },
    { name: 'Servizi', to: '/servizi', icon: Wrench, type: 'route', tKey: 'nav_servizi' },
    { name: 'Blog', to: '/blog', icon: Article, type: 'route', tKey: 'nav_blog' },
    { name: 'Contatti', to: '/contatti', icon: EnvelopeSimple, type: 'route', tKey: 'nav_contatti' },
    { name: 'Audit', href: 'https://audit.pionio.it/?from=site_cta', icon: Gauge, type: 'external', tKey: 'nav_audit' },
];

export function NavBar() {
    const { t, locale } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>('');

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
            'relative px-2 md:px-4 py-3 max-xs:py-2 md:py-2 rounded-full flex items-center justify-center transition-colors duration-300',
            isActive ? 'text-forest-100' : 'text-zinc-500 hover:text-zinc-300'
        );

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center px-4">
            <m.nav
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="pointer-events-auto flex items-center p-2 max-xs:p-1.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] max-w-[95vw] overflow-x-auto"
            >
                <ul className="flex items-center gap-0.5 md:gap-1 relative">
                    {navItems.map((item) => {
                        const isAnchorActive =
                            item.type === 'anchor' && isHome && activeSection === item.hash;
                        const isRouteActive =
                            item.type === 'route' && location.pathname.startsWith(item.to);
                        const isActive = isAnchorActive || isRouteActive;
                        const label = t(item.tKey);
                        const inner = (
                            <>
                                <item.icon weight="duotone" className="w-5 h-5 md:hidden relative z-10" />
                                <span className="hidden md:block text-sm font-mono tracking-wider relative z-10 whitespace-nowrap">
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
                                <li key={item.name} className="relative">
                                    <a
                                        href={href}
                                        onClick={(e) => handleAnchorClick(e, item.hash)}
                                        className={itemClasses(isActive)}
                                        aria-label={label}
                                        title={label}
                                    >
                                        {inner}
                                    </a>
                                </li>
                            );
                        }

                        if (item.type === 'external') {
                            return (
                                <li key={item.name} className="relative">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track('audit_click', { source: 'navbar', locale })}
                                        className={itemClasses(false)}
                                        aria-label={label}
                                        title={label}
                                    >
                                        {inner}
                                    </a>
                                </li>
                            );
                        }

                        return (
                            <li key={item.name} className="relative">
                                <Link
                                    to={item.to}
                                    className={itemClasses(isActive)}
                                    aria-label={label}
                                    title={label}
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
