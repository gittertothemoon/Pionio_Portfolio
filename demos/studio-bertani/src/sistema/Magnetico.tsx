import { useRef, type ReactNode } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

/**
 * Il bottone si sposta verso il mouse quando gli passa vicino. Costa poco e
 * cambia la sensazione di tutta la pagina.
 */
export default function Magnetico({
    children,
    href,
    className = '',
    forza = 0.32,
}: {
    children: ReactNode;
    href: string;
    className?: string;
    forza?: number;
}) {
    const rif = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 320, damping: 22 });
    const sy = useSpring(y, { stiffness: 320, damping: 22 });

    return (
        <m.a
            ref={rif}
            href={href}
            className={className}
            style={{ x: sx, y: sy }}
            onPointerMove={(e) => {
                const r = rif.current?.getBoundingClientRect();
                if (!r) return;
                x.set((e.clientX - (r.left + r.width / 2)) * forza);
                y.set((e.clientY - (r.top + r.height / 2)) * forza);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </m.a>
    );
}
