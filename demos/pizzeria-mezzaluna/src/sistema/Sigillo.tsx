import { m } from 'framer-motion';

/**
 * Il sigillo che gira piano in un angolo. È il dettaglio che dice "qualcuno ha
 * disegnato questa pagina" prima ancora che si legga una riga.
 */
export default function Sigillo({ className = '' }: { className?: string }) {
    return (
        <m.div
            className={className}
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
            <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                <defs>
                    <path id="giro" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                </defs>
                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeOpacity="0.18" />
                <text
                    fill="currentColor"
                    fillOpacity="0.72"
                    fontSize="15"
                    letterSpacing="5.2"
                    fontFamily="Inter Tight, sans-serif"
                >
                    <textPath href="#giro" startOffset="0">
                        48 ORE DI LIEVITAZIONE · FORNO A LEGNA · DAL 1978 ·
                    </textPath>
                </text>
                {/* La mezzaluna al centro, che è poi tutto il marchio. */}
                <path d="M118 66a40 40 0 1 0 0 68 33 33 0 0 1 0-68z" fill="var(--color-oro)" />
            </svg>
        </m.div>
    );
}
