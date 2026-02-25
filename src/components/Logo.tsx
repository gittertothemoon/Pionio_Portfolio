export function Logo({ className }: { className?: string }) {
    return (
        <img
            src="/logo.svg"
            alt="PIONIO Logo"
            className={className}
        />
    );
}
