import React, { useRef, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    intensity?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
    ({ children, className, intensity = 0.5, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const [isHovered, setIsHovered] = useState(false);

        // Mouse coordinates relative to the center of the button
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        // Premium spring physics for the magnetic pull
        const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current) return;
            const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            x.set(distanceX * intensity);
            y.set(distanceY * intensity);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        // Combine forwarded ref and internal ref
        const setRefs = (element: HTMLButtonElement) => {
            buttonRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        return (
            <m.button
                ref={setRefs}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                style={{ x: springX, y: springY }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 disabled:pointer-events-none disabled:opacity-50",
                    "rounded-full bg-forest-600 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_4px_12px_rgba(0,0,0,0.1)] hover:bg-forest-500",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>

                {/* Subtle hover glow that follows the mouse (simplified for performance, hidden when not hovered) */}
                <m.div
                    className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </m.button>
        );
    }
);
MagneticButton.displayName = 'MagneticButton';
