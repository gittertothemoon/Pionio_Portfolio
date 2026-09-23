/**
 * Su fondo chiaro la grana va in `multiply`, non in `overlay`: sporca la carta
 * invece di illuminarla. È la differenza fra una pagina stampata e uno schermo.
 */
export default function Grana() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] opacity-[0.16] mix-blend-multiply"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
            }}
        />
    );
}
