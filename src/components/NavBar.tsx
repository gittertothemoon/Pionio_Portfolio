import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { User, Lightning, GridFour, Briefcase, EnvelopeSimple } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Capabilities', href: '#services', icon: Lightning },
    { name: 'Works', href: '#works', icon: GridFour },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: EnvelopeSimple },
];

export function NavBar() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState<string>('');

    // Scroll spy logic
    useEffect(() => {
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

        const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean);
        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center px-4">
            <motion.nav
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                className="pointer-events-auto flex items-center p-2 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
                <ul className="flex items-center gap-1 md:gap-2 relative">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href;
                        return (
                            <li key={item.name} className="relative">
                                <a
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className={cn(
                                        "relative px-4 py-3 md:py-2 rounded-full flex items-center justify-center transition-colors duration-300",
                                        isActive ? "text-forest-100" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                    aria-label={item.name}
                                    title={item.name}
                                >
                                    {/* Mobile Vector Icon */}
                                    <item.icon weight="duotone" className="w-5 h-5 md:hidden relative z-10" />

                                    {/* Desktop Text Label */}
                                    <span className="hidden md:block text-sm font-mono tracking-wider relative z-10">
                                        {t(`nav_${item.name.toLowerCase()}`)}
                                    </span>

                                    {/* Active Indicator Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 rounded-full bg-forest-500/20 border border-forest-500/30"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>
        </div>
    );
}
