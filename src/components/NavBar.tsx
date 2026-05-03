import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    User,
    Lightning,
    GridFour,
    Briefcase,
    EnvelopeSimple,
    Wrench,
    Article,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

type NavItem =
    | { name: string; href: string; icon: typeof User; type: 'anchor'; tKey: string }
    | { name: string; to: string; icon: typeof User; type: 'route'; tKey: string };

const navItems: NavItem[] = [
    { name: 'About', href: '#about', icon: User, type: 'anchor', tKey: 'nav_about' },
    { name: 'Capabilities', href: '#services', icon: Lightning, type: 'anchor', tKey: 'nav_capabilities' },
    { name: 'Works', href: '#works', icon: GridFour, type: 'anchor', tKey: 'nav_works' },
    { name: 'Experience', href: '#experience', icon: Briefcase, type: 'anchor', tKey: 'nav_experience' },
    { name: 'Servizi', to: '/servizi', icon: Wrench, type: 'route', tKey: 'nav_servizi' },
    { name: 'Blog', to: '/blog', icon: Article, type: 'route', tKey: 'nav_blog' },
    { name: 'Contatti', to: '/contatti', icon: EnvelopeSimple, type: 'route', tKey: 'nav_contatti' },
];

export function NavBar() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const anchors = navItems.filter((i): i is Extract<NavItem, { type: 'anchor' }> => i.type === 'anchor');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        const sections = anchors
            .map((item) => document.querySelector(item.href))
            .filter((el): el is Element => Boolean(el));
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const itemClasses = (isActive: boolean) =>
        cn(
            'relative px-3 md:px-4 py-3 md:py-2 rounded-full flex items-center justify-center transition-colors duration-300',
            isActive ? 'text-forest-100' : 'text-zinc-500 hover:text-zinc-300'
        );

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center px-4">
            <motion.nav
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                className="pointer-events-auto flex items-center p-2 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] max-w-[95vw] overflow-x-auto"
            >
                <ul className="flex items-center gap-0.5 md:gap-1 relative">
                    {navItems.map((item) => {
                        const isActive = item.type === 'anchor' && activeSection === item.href;
                        const label = t(item.tKey);
                        const inner = (
                            <>
                                <item.icon weight="duotone" className="w-5 h-5 md:hidden relative z-10" />
                                <span className="hidden md:block text-sm font-mono tracking-wider relative z-10">
                                    {label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute inset-0 rounded-full bg-forest-500/20 border border-forest-500/30"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </>
                        );

                        if (item.type === 'anchor') {
                            return (
                                <li key={item.name} className="relative">
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleAnchorClick(e, item.href)}
                                        className={itemClasses(isActive)}
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
                                <Link to={item.to} className={itemClasses(false)} aria-label={label} title={label}>
                                    {inner}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>
        </div>
    );
}
