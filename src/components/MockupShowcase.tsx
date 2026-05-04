import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MockupImage, FloatingDevice } from './DeviceMockup';

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-forest-500/40" />
            <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{label}</span>
        </div>
    );
}

export function PhoneShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-28 md:py-40 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
                <div className="lg:col-span-6 flex flex-col gap-7">
                    <SectionLabel label={t('mockup_phone_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_phone_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl"
                    >
                        {t('mockup_phone_desc')}
                    </motion.p>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                    <FloatingDevice>
                        <MockupImage
                            src="/mockups/iphone-where2beach.webp"
                            alt="Where2Beach app on iPhone"
                            width={780}
                            height={1433}
                            className="w-[260px] sm:w-[300px] md:w-[340px]"
                        />
                    </FloatingDevice>
                </div>
            </div>
        </section>
    );
}

export function LaptopShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-28 md:py-40 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="relative max-w-[1200px] mx-auto flex flex-col items-center gap-14">
                <div className="flex flex-col items-center gap-5 text-center max-w-3xl">
                    <SectionLabel label={t('mockup_laptop_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_laptop_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light"
                    >
                        {t('mockup_laptop_desc')}
                    </motion.p>
                </div>

                <FloatingDevice className="w-full flex justify-center">
                    <MockupImage
                        src="/mockups/macbook-flow.webp"
                        alt="FLOW Pilates Studio website on MacBook"
                        width={1680}
                        height={1210}
                        className="w-full max-w-[960px]"
                    />
                </FloatingDevice>
            </div>
        </section>
    );
}

export function MultiDeviceShowcase() {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-28 md:py-40 bg-zinc-950 px-6 md:px-12 overflow-hidden border-t border-white/5">
            <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
                <div className="lg:col-span-5 flex flex-col gap-7 lg:order-2">
                    <SectionLabel label={t('mockup_tablet_label')} />
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-white leading-[1.05]"
                    >
                        {t('mockup_tablet_title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-xl"
                    >
                        {t('mockup_tablet_desc')}
                    </motion.p>
                </div>

                <div className="lg:col-span-7 lg:order-1 relative flex justify-center items-center min-h-[480px] sm:min-h-[560px]">
                    <FloatingDevice>
                        <MockupImage
                            src="/mockups/ipad-smoky.webp"
                            alt="Smoky Candle e-commerce on iPad"
                            width={1020}
                            height={1280}
                            className="w-[300px] sm:w-[400px] md:w-[460px]"
                        />
                    </FloatingDevice>
                    <FloatingDevice
                        delay={0.15}
                        className="absolute"
                        style={{ right: '4%', bottom: '0%' }}
                    >
                        <MockupImage
                            src="/mockups/iphone-antonela.webp"
                            alt="Antonela art portfolio on iPhone"
                            width={640}
                            height={1129}
                            className="w-[140px] sm:w-[180px] md:w-[210px]"
                        />
                    </FloatingDevice>
                </div>
            </div>
        </section>
    );
}
