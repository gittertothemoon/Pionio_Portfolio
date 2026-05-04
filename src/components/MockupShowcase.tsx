import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { PhoneMockup, LaptopMockup, TabletMockup, FloatingDevice } from './DeviceMockup';

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-forest-500/50" />
            <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{label}</span>
        </div>
    );
}

export function PhoneShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-32 md:py-48 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            {/* Ambient glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/4 w-[55%] h-[55%] rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(56,142,111,0.45), transparent 70%)' }}
            />
            <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 flex flex-col gap-8">
                    <SectionLabel label={t('mockup_phone_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_phone_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl"
                    >
                        {t('mockup_phone_desc')}
                    </motion.p>
                </div>

                <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <FloatingDevice
                        style={{
                            transform: 'rotate(-4deg)',
                        }}
                    >
                        <div style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}>
                            <PhoneMockup
                                src="/images/where2beach.png"
                                alt="Where2Beach app on iPhone"
                            />
                        </div>
                    </FloatingDevice>
                </div>
            </div>
        </section>
    );
}

export function LaptopShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-32 md:py-48 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 w-[55%] h-[55%] rounded-full opacity-25 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(56,142,111,0.5), transparent 70%)' }}
            />
            <div className="relative max-w-[1400px] mx-auto flex flex-col items-center gap-16">
                <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
                    <SectionLabel label={t('mockup_laptop_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_laptop_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light"
                    >
                        {t('mockup_laptop_desc')}
                    </motion.p>
                </div>

                <FloatingDevice>
                    <div style={{ transform: 'rotateX(8deg)' }}>
                        <LaptopMockup src="/images/flow.jpg" alt="FLOW Pilates Studio website on MacBook" />
                    </div>
                </FloatingDevice>
            </div>
        </section>
    );
}

export function MultiDeviceShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-32 md:py-48 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 left-1/3 w-[60%] h-[60%] rounded-full opacity-25 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(56,142,111,0.4), transparent 70%)' }}
            />
            <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 flex flex-col gap-8 lg:order-2">
                    <SectionLabel label={t('mockup_tablet_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_tablet_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl"
                    >
                        {t('mockup_tablet_desc')}
                    </motion.p>
                </div>

                <div className="lg:col-span-7 lg:order-1 relative flex justify-center min-h-[440px]">
                    <FloatingDevice
                        delay={0.05}
                        className="relative"
                        style={{ transform: 'rotate(2deg)' }}
                    >
                        <div style={{ transform: 'rotateY(6deg) rotateX(4deg)' }}>
                            <TabletMockup src="/images/smoky.png" alt="Smoky Candle e-commerce on iPad" />
                        </div>
                    </FloatingDevice>
                    <FloatingDevice
                        delay={0.25}
                        className="absolute -bottom-10 -right-2 lg:right-4 z-10"
                        style={{ transform: 'rotate(6deg)' }}
                    >
                        <div style={{ transform: 'rotateY(-10deg) rotateX(2deg)' }}>
                            <PhoneMockup src="/images/antonela.jpg" alt="Antonela art portfolio on iPhone" />
                        </div>
                    </FloatingDevice>
                </div>
            </div>
        </section>
    );
}
