import { m } from 'framer-motion';
import { GithubLogo, InstagramLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';
import { services } from '../lib/services';
import { posts } from '../lib/blog';

const socials = [
    { name: 'GitHub', href: 'https://github.com/gittertothemoon', icon: GithubLogo },
    { name: 'Instagram', href: 'https://www.instagram.com/pionio_dev', icon: InstagramLogo },
];

export function Footer() {
    const { t, locale } = useLanguage();
    const recentPosts = [...posts]
        .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
        .slice(0, 4);
    return (
        <footer className="relative w-full bg-zinc-950 pt-24 pb-56 md:pb-52 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                    <nav aria-label="Servizi" className="flex flex-col gap-4">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                            Servizi
                        </span>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    to="/servizi"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Tutti i servizi
                                </Link>
                            </li>
                            {services.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        to={`/servizi/${s.slug}`}
                                        className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                    >
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Blog" className="flex flex-col gap-4">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Blog</span>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    to="/blog"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Tutti gli articoli
                                </Link>
                            </li>
                            {recentPosts.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/blog/${p.slug}`}
                                        className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors line-clamp-2"
                                    >
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Esplora" className="flex flex-col gap-4">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                            Esplora
                        </span>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#works"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Progetti
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#about"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Chi sono
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contatti"
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    Contatti
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://audit.pionio.it/?from=site_cta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track('audit_click', { source: 'footer', locale })}
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    {t('audit_cta_button')} →
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-col gap-4">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Social</span>
                        <ul className="flex flex-col gap-2">
                            {socials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track('social_click', { network: social.name.toLowerCase(), locale })}
                                        className="inline-flex items-center gap-2 text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                    >
                                        <social.icon size={16} weight="duotone" />
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="mailto:pionio.dev@gmail.com"
                                    onClick={() => track('email_click', { source: 'footer', locale })}
                                    className="text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors"
                                >
                                    pionio.dev@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest text-center md:text-left">
                            © {new Date().getFullYear()} PIONIO. {t('footer_rights')}
                        </p>
                        <Link
                            to="/privacy"
                            className="text-zinc-500 hover:text-forest-400 font-mono text-xs md:text-sm uppercase tracking-widest transition-colors"
                        >
                            Privacy
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-forest-400 hover:-translate-y-1 transition-all duration-300"
                                aria-label={social.name}
                            >
                                <social.icon size={24} weight="duotone" />
                            </a>
                        ))}
                    </div>
                </div>

                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '100px' }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center"
                >
                    <p
                        aria-hidden="true"
                        className="text-[20vw] md:text-[15vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-950 select-none pointer-events-none m-0"
                    >
                        PIONIO
                    </p>
                </m.div>
            </div>
        </footer>
    );
}
