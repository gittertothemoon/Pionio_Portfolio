import { motion } from 'framer-motion';
import { FileCode, FileCss, Graph, Lightning, Atom, FrameCorners } from '@phosphor-icons/react';

const icons = [
    { id: 1, Icon: Atom, name: "React Ecosystem" },
    { id: 2, Icon: Lightning, name: "Vite Builder" },
    { id: 3, Icon: FileCss, name: "Tailwind v4" },
    { id: 4, Icon: FrameCorners, name: "Framer Motion" },
    { id: 5, Icon: FileCode, name: "TypeScript" },
    { id: 6, Icon: Graph, name: "WebGL" },
];

export function TechStack() {
    // Duplicate the array to create an infinite loop effect seamlessly
    // Triplicating ensures there's enough content to scroll without visual gaps
    const marqueeItems = [...icons, ...icons, ...icons];

    return (
        <section className="relative w-full py-32 bg-zinc-950 border-y border-white/5 overflow-hidden flex flex-col items-center">

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
