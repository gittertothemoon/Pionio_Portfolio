import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

type Common = {
    src: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
};

export function PhoneMockup({ src, alt, className = '', style }: Common) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: '280px',
                aspectRatio: '9 / 19.5',
                ...style,
            }}
        >
            <div
                className="absolute inset-0 rounded-[2.6rem] p-[10px]"
                style={{
                    background:
                        'linear-gradient(150deg, #2a2a2e 0%, #0a0a0a 45%, #1f1f23 100%)',
                    boxShadow:
                        '0 60px 120px -40px rgba(0,0,0,0.9), 0 30px 60px -20px rgba(0,0,0,0.6), inset 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
            >
                <div
                    className="relative w-full h-full rounded-[2.1rem] overflow-hidden"
                    style={{
                        background: '#000',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
                    }}
                >
                    {/* Dynamic island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-[88px] h-[26px] rounded-full bg-black" />
                    {/* Screen content */}
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 pointer-events-none rounded-[2.1rem] ring-1 ring-white/5" />
                </div>
            </div>
            {/* Side button highlights */}
            <span className="absolute right-[-2px] top-[28%] w-[3px] h-12 rounded-r-sm bg-zinc-700/70" />
            <span className="absolute left-[-2px] top-[20%] w-[3px] h-7 rounded-l-sm bg-zinc-700/70" />
            <span className="absolute left-[-2px] top-[32%] w-[3px] h-12 rounded-l-sm bg-zinc-700/70" />
        </div>
    );
}

export function LaptopMockup({ src, alt, className = '', style }: Common) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: '640px',
                maxWidth: '100%',
                ...style,
            }}
        >
            {/* Screen */}
            <div
                className="relative rounded-t-[14px] p-[12px] pb-[16px]"
                style={{
                    background: 'linear-gradient(180deg, #1d1d1f 0%, #0a0a0a 100%)',
                    boxShadow:
                        '0 50px 100px -30px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
            >
                <div
                    className="relative rounded-[6px] overflow-hidden"
                    style={{
                        aspectRatio: '16 / 10',
                        background: '#000',
                    }}
                >
                    {/* Camera */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 w-[6px] h-[6px] rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Screen reflection */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 100%)',
                        }}
                    />
                </div>
            </div>
            {/* Hinge / base */}
            <div
                className="relative mx-auto"
                style={{
                    width: '108%',
                    marginLeft: '-4%',
                    height: '14px',
                    background:
                        'linear-gradient(180deg, #2a2a2c 0%, #18181a 50%, #0d0d0e 100%)',
                    borderBottomLeftRadius: '14px',
                    borderBottomRightRadius: '14px',
                    boxShadow:
                        '0 20px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
            >
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[4px] rounded-b-md"
                    style={{ background: 'linear-gradient(180deg, #050505, #1a1a1c)' }}
                />
            </div>
        </div>
    );
}

export function TabletMockup({ src, alt, className = '', style }: Common) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: '460px',
                aspectRatio: '4 / 3',
                maxWidth: '100%',
                ...style,
            }}
        >
            <div
                className="absolute inset-0 rounded-[28px] p-[14px]"
                style={{
                    background:
                        'linear-gradient(150deg, #28282c 0%, #0a0a0a 50%, #1d1d20 100%)',
                    boxShadow:
                        '0 60px 120px -40px rgba(0,0,0,0.9), inset 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
            >
                <div
                    className="relative w-full h-full rounded-[16px] overflow-hidden"
                    style={{ background: '#000' }}
                >
                    {/* Camera */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 w-[6px] h-[6px] rounded-full bg-zinc-700" />
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

type FloatProps = {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    delay?: number;
};

export function FloatingDevice({ children, className = '', style, delay = 0 }: FloatProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
            style={{ transformStyle: 'preserve-3d', perspective: '1400px', ...style }}
        >
            {children}
        </motion.div>
    );
}
