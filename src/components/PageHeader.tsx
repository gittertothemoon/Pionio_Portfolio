import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function PageHeader() {
    return (
        <header
            className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 lg:px-24 z-50 flex justify-between items-center pointer-events-none"
            role="banner"
        >
            <Link
                to="/"
                title="PIONIO — Homepage"
                aria-label="PIONIO — Homepage"
                className="pointer-events-auto flex h-[34px] items-center"
            >
                <Logo className="h-[27px] w-auto md:h-[38px] lg:h-[43px] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </Link>
        </header>
    );
}
