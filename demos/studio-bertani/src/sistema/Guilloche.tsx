/**
 * Il guilloché: la trama che sta sulle banconote e sui timbri notarili, e che
 * qui fa da ritratto quando i ritratti non ci sono. È un ipotrocoide — la
 * curva dello spirografo — disegnato tre volte con parametri leggermente
 * diversi: due numeri cambiati e non se ne trovano due uguali.
 */
function tracciato(R: number, r: number, d: number, giri = 1, punti = 1400) {
    const p: string[] = [];
    for (let i = 0; i <= punti; i++) {
        const t = (i / punti) * Math.PI * 2 * giri * (r / gcd(R, r));
        const k = (R - r) / r;
        const x = (R - r) * Math.cos(t) + d * Math.cos(k * t);
        const y = (R - r) * Math.sin(t) - d * Math.sin(k * t);
        p.push(`${i === 0 ? 'M' : 'L'}${(100 + x).toFixed(2)},${(100 + y).toFixed(2)}`);
    }
    return p.join(' ');
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

export default function Guilloche({
    seme,
    className = '',
}: {
    seme: number;
    className?: string;
}) {
    const R = 86;
    const strati = [
        { r: 17 + (seme % 5), d: 46 + (seme % 7) * 3, o: 0.55 },
        { r: 23 + ((seme * 3) % 6), d: 38 + ((seme * 5) % 9) * 2, o: 0.38 },
        { r: 11 + ((seme * 7) % 4), d: 58 - (seme % 5) * 2, o: 0.24 },
    ];

    return (
        <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
            <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeOpacity="0.2" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity="0.12" />
            {strati.map((s, i) => (
                <path
                    key={i}
                    d={tracciato(R, s.r, s.d)}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={s.o}
                    strokeWidth="0.55"
                />
            ))}
        </svg>
    );
}
