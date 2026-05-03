import { motion } from 'framer-motion';
import { GithubLogo, InstagramLogo } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const socials = [
    { name: 'GitHub', href: 'https://github.com/gittertothemoon', icon: GithubLogo },
    { name: 'Instagram', href: 'https://www.instagram.com/pionio_dev', icon: InstagramLogo },
];

export function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="relative w-full bg-zinc-950 pt-24 pb-56 md:pb-52 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col items-center">

                {/* Top Section: Links & Copyright */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-16 md:mb-24">
                    <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest text-center md:text-left">
                        © {new Date().getFullYear()} PIONIO. {t('footer_rights')}
                    </p>

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

                {/* Oversized PIONIO Text */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center w-full"
                >
                    <p aria-hidden="true" className="text-[20vw] md:text-[15vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-950 select-none pointer-events-none m-0">
                        PIONIO
                    </p>
                </motion.div>

            </div>
        </footer>
    );
}
