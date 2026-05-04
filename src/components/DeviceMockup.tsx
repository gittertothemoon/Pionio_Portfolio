import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

type Common = {
    src: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
};

/**
 * iPhone 15 Pro–style mockup. Space-grey titanium bezel, dynamic island,
 * thin uniform border, 19.5:9 aspect ratio, Apple-correct corner radii.
 */
export function PhoneMockup({ src, alt, className = '', style }: Common) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: '260px',
                aspectRatio: '9 / 19.5',
                ...style,
            }}
        >
            {/* Body / titanium frame */}
            <div
                className="absolute inset-0"
                style={{
                    borderRadius: '44px',
                    padding: '6px',
                    background:
                        'linear-gradient(135deg,#3a3a3c 0%,#1c1c1e 50%,#2c2c2e 100%)',
                    boxShadow:
                        '0 30px 60px -25px rgba(0,0,0,0.55), 0 12px 24px -10px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
            >
                {/* Inner bezel ring (matte black around screen) */}
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        borderRadius: '38px',
                        background: '#000',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />

                    {/* Dynamic Island */}
                    <div
                        className="absolute top-2 left-1/2 -translate-x-1/2 z-20"
                        style={{
                            width: '95px',
                            height: '28px',
                            borderRadius: '999px',
                            background: '#0a0a0a',
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                        }}
                    />
                </div>
            </div>

            {/* Subtle side buttons */}
            <span
                aria-hidden
                className="absolute"
                style={{
                    left: '-1.5px',
                    top: '20%',
                    width: '2px',
                    height: '28px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg,#2a2a2c,#1a1a1c)',
                }}
            />
            <span
                aria-hidden
                className="absolute"
                style={{
                    left: '-1.5px',
                    top: '30%',
                    width: '2px',
                    height: '46px',
                    borderRadius: '2px',
                    background: 'linear-gradient(90deg,#2a2a2c,#1a1a1c)',
                }}
            />
            <span
                aria-hidden
                className="absolute"
                style={{
                    right: '-1.5px',
                    top: '26%',
                    width: '2px',
                    height: '60px',
                    borderRadius: '2px',
                    background: 'linear-gradient(270deg,#2a2a2c,#1a1a1c)',
                }}
            />
        </div>
    );
}

/**
 * MacBook Pro–style mockup (lid only, viewed straight-on).
 * 16:10 screen, thin uniform black bezel, slim chassis edge with hinge slot.
 */
export function LaptopMockup({ src, alt, className = '', style }: Common) {
    return (
        <div className={`relative w-full ${className}`} style={{ maxWidth: '720px', ...style }}>
            {/* Lid */}
            <div
                className="relative"
                style={{
                    borderRadius: '14px 14px 4px 4px',
                    padding: '10px 10px 14px',
                    background:
                        'linear-gradient(180deg,#2a2a2c 0%,#1d1d1f 50%,#141416 100%)',
                    boxShadow:
                        '0 30px 60px -25px rgba(0,0,0,0.6), 0 12px 24px -8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
            >
                <div
                    className="relative overflow-hidden"
                    style={{
                        borderRadius: '4px',
                        aspectRatio: '16 / 10',
                        background: '#000',
                    }}
                >
                    {/* Front camera */}
                    <span
                        aria-hidden
                        className="absolute top-[5px] left-1/2 -translate-x-1/2 z-20"
                        style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '999px',
                            background: '#0a0a0a',
                            boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.08)',
                        }}
                    />

                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Bottom edge / closed-chassis hint */}
            <div
                className="relative mx-auto"
                style={{
                    width: '104%',
                    marginLeft: '-2%',
                    height: '8px',
                    borderRadius: '0 0 10px 10px',
                    background:
                        'linear-gradient(180deg,#1d1d1f 0%,#141416 60%,#0a0a0b 100%)',
                    boxShadow: '0 18px 28px -14px rgba(0,0,0,0.55)',
                }}
            >
                {/* Hinge cutout */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                        width: '90px',
                        height: '3px',
                        borderRadius: '0 0 4px 4px',
                        background: '#0a0a0b',
                    }}
                />
            </div>
        </div>
    );
}

/**
 * iPad Pro–style mockup, portrait orientation, slim uniform bezel.
 */
export function TabletMockup({ src, alt, className = '', style }: Common) {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: '380px',
                aspectRatio: '3 / 4',
                ...style,
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    borderRadius: '28px',
                    padding: '10px',
                    background:
                        'linear-gradient(135deg,#3a3a3c 0%,#1c1c1e 50%,#2c2c2e 100%)',
                    boxShadow:
                        '0 30px 60px -25px rgba(0,0,0,0.55), 0 12px 24px -10px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
            >
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        borderRadius: '20px',
                        background: '#000',
                    }}
                >
                    {/* Front camera (top-center, portrait) */}
                    <span
                        aria-hidden
                        className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20"
                        style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '999px',
                            background: '#0a0a0a',
                        }}
                    />
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
}

type FloatProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    delay?: number;
};

export function FloatingDevice({ children, className = '', style, delay = 0 }: FloatProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
