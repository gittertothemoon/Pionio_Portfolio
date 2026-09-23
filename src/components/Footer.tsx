import { m } from 'framer-motion';
import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { track } from '../lib/analytics';
import { services } from '../lib/services';
import { servicesEn } from '../lib/services-en';
import { postPath, postsFor } from '../lib/blog';
import { homeAnchor, pagePath, servicePath } from '../lib/paths';

// The same three profiles the structured data lists (facts.ts).
const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/pionio_dev', icon: InstagramLogo },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-panto/', icon: LinkedinLogo },
    { name: 'GitHub', href: 'https://github.com/gittertothemoon', icon: GithubLogo },
];

const linkClass = 'text-zinc-300 hover:text-forest-400 font-sans text-sm transition-colors';
const headClass = 'text-zinc-500 font-mono text-[10px] uppercase tracking-widest';

export function Footer() {
    const { t, locale } = useLanguage();
    // Each language shows its own articles: the English ones are written for clients outside Italy.
    const recentPosts = [...postsFor(locale)].sort((a, b) => b.datePublished.localeCompare(a.datePublished)).slice(0, 4);
    // English pages list only the services that have an English page.
    const serviceLinks =
        locale === 'it'
            ? services.map((s) => ({ key: s.slug, title: s.title }))
            : services.filter((s) => servicesEn[s.slug]).map((s) => ({ key: s.slug, title: servicesEn[s.slug].title }));

    return (
        <footer className="relative w-full bg-zinc-950 pt-24 pb-56 md:pb-52 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
                <div className="grid grid-cols-2 gap-10 md:gap-12 md:grid-cols-4">
                    <nav aria-label={t('footer_services')} className="flex flex-col gap-4">
                        <span className={headClass}>{t('footer_services')}</span>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link to={pagePath('services', locale)} className={linkClass}>
                                    {t('footer_all_services')}
                                </Link>
                            </li>
                            {serviceLinks.map((s) => (
                                <li key={s.key}>
                                    <Link to={servicePath(s.key, locale)} className={linkClass}>
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {recentPosts.length > 0 && (
                        <nav aria-label="Blog" className="flex flex-col gap-4">
                            <span className={headClass}>Blog</span>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link to={pagePath('blog', locale)} className={linkClass}>
                                        {t('footer_all_posts')}
                                    </Link>
                                </li>
                                {recentPosts.map((p) => (
                                    <li key={p.slug}>
                                        <Link to={postPath(p.slug, locale)} className={`${linkClass} line-clamp-2`}>
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <nav aria-label={t('footer_explore')} className="flex flex-col gap-4">
                        <span className={headClass}>{t('footer_explore')}</span>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link to={pagePath('home', locale)} className={linkClass}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={homeAnchor('crafts', locale)} className={linkClass}>
                                    {t('footer_work')}
                                </Link>
                            </li>
                            <li>
                                <Link to={pagePath('about', locale)} className={linkClass}>
                                    {t('footer_about')}
                                </Link>
                            </li>
                            <li>
                                <Link to={pagePath('contact', locale)} className={linkClass}>
                                    {t('footer_contact')}
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://audit.pionio.it/?from=site_cta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track('audit_click', { source: 'footer', locale })}
                                    className={linkClass}
                                >
                                    {t('audit_cta_button')}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-col gap-4">
                        <span className={headClass}>Social</span>
                        <ul className="flex flex-col gap-2">
                            {socials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track('social_click', { network: social.name.toLowerCase(), locale })}
                                        className={`inline-flex items-center gap-2 ${linkClass}`}
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
                                    className={linkClass}
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
                            © {new Date().getFullYear()} Pionio. {t('footer_rights')}
                        </p>
                        <Link
                            to={pagePath('privacy', locale)}
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
