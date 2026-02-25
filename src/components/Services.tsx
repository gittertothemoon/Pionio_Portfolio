import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
    const { t } = useLanguage();

    const services = [
        {
            id: "01",
            title: t('service_1_title'),
            description: t('service_1_desc')
        },
        {
            id: "02",
            title: t('service_2_title'),
            description: t('service_2_desc')
        },
        {
            id: "03",
            title: t('service_3_title'),
            description: t('service_3_desc')
        }
    ];
    return (
        <section className="relative w-full py-32 md:py-48 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t('services_label')}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans tracking-tight text-white mb-16 leading-[1.1]">
                        {t('services_headline_1')}<br />
                        <span className="text-forest-500 italic font-serif">{t('services_headline_highlight')}</span>{t('services_headline_3')}
                    </h2>
                </motion.div>

                {/* Services List - Parallax Tilt Cards style but clean */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

// Extracted internal component to isolate Framer Motion useMotionValue hooks for performance
function ServiceCard({ service, index }: { service: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Parallax subtle tilt ranges
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between min-h-[400px] p-8 md:p-12 rounded-[2rem] bg-zinc-900 border border-white/5 overflow-hidden will-change-transform"
        >
            {/* Liquid Glass Overlay Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-forest-500/0 via-transparent to-forest-500/0 group-hover:from-forest-500/10 transition-colors duration-1000 ease-out pointer-events-none" />

            {/* Top Number */}
            <div style={{ transform: "translateZ(30px)" }} className="text-zinc-700 font-mono text-5xl md:text-6xl font-light tracking-tighter">
                {service.number}
            </div>

            {/* Content */}
            <div style={{ transform: "translateZ(40px)" }} className="flex flex-col gap-6 mt-16">
                <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-white group-hover:text-forest-400 transition-colors duration-500">
                    {service.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                    {service.description}
                </p>
            </div>
        </motion.div>
    );
}
