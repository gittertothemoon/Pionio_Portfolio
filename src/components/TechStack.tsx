import { motion } from 'framer-motion';
import { FileCode, FileCss, Graph, Lightning, Atom, FrameCorners } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const icons = [
    { id: 1, Icon: Atom, name: "React Ecosystem" },
    { id: 2, Icon: Lightning, name: "Vite Builder" },
    { id: 3, Icon: FileCss, name: "Tailwind v4" },
    { id: 4, Icon: FrameCorners, name: "Framer Motion" },
    { id: 5, Icon: FileCode, name: "TypeScript" },
    { id: 6, Icon: Graph, name: "WebGL" },
];

export function TechStack() {
    const { t } = useLanguage();
    // Duplicate the array to create an infinite loop effect seamlessly
    // Triplicating ensures there's enough content to scroll without visual gaps
    const marqueeItems = [...icons, ...icons, ...icons];

    return (
        <section className="relative w-full py-40 bg-zinc-950 border-y border-white/5 overflow-hidden flex flex-col items-center gap-16">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 px-6"
            >
                <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_techstack')}</span>
                <div className="h-[1px] w-8 bg-forest-500/50" />
                <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('techstack_label')}</span>
            </motion.div>

            {/* Edge Gradients to blend the marquee fading out */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10 w-full" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="w-full flex overflow-hidden"
            >
                <motion.div
                    animate={{ x: ["0%", "-33.333%"] }} // Scroll one full set of the original 6 items
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    className="flex gap-16 md:gap-32 items-center whitespace-nowrap px-8"
                >
                    {marqueeItems.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex items-center gap-4 text-zinc-700 hover:text-forest-400 transition-colors duration-500 group cursor-default">
                            <item.Icon size={48} weight="duotone" className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                            <span className="font-mono text-xl md:text-2xl uppercase tracking-widest">{item.name}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
