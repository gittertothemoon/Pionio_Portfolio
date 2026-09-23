/**
 * La grana sopra tutto. Senza, i fondi scuri sembrano plastica; con, sembrano
 * carta stampata. Sta in `fixed` così non scorre insieme alla pagina: è la
 * texture della pellicola, non del contenuto.
 */
export default function Grana() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] opacity-[0.22] mix-blend-overlay"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            }}
        />
    );
}
