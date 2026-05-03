import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function PageHeader() {
    return (
        <header
            className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex justify-between items-center pointer-events-none"
            role="banner"
        >
            <Link
                to="/"
                title="PIONIO — Homepage"
                aria-label="PIONIO — Homepage"
                className="pointer-events-auto"
            >
                <Logo className="h-40 md:h-56 lg:h-64 w-auto object-cover object-left-top -mt-10 md:-mt-16 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </Link>
        </header>
    );
}
