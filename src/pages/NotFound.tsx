import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import { pagePath } from '../lib/paths';

const COPY = {
    it: { title: 'Pagina non trovata | Pionio', h1: 'Qui non c’è niente.', body: 'L’indirizzo è sbagliato, oppure la pagina si è spostata.', home: 'Torna alla home', services: 'Servizi e prezzi' },
    en: { title: 'Page not found | Pionio', h1: 'Nothing here.', body: 'The address is wrong, or the page has moved.', home: 'Back to the home page', services: 'Services and prices' },
};

// Built once as dist/404.html, which Vercel serves for any address that doesn't exist; the catch-all
// routes render the same page when the browser navigates to a missing address.
export default function NotFound() {
    const { locale } = useLanguage();
    const c = COPY[locale];
    return (
        <div className="min-h-[100dvh] w-full bg-zinc-950 font-sans text-zinc-50 antialiased">
            <Seo title={c.title} description={c.body} noindex />
            <PageHeader />
            <main id="main" className="flex min-h-[100dvh] items-center px-6 md:px-12 lg:px-24">
                <div className="flex max-w-xl flex-col gap-6">
                    <span className="font-mono text-sm text-zinc-500">404</span>
                    <h1 className="text-5xl leading-[1.05] tracking-tight text-white md:text-7xl">{c.h1}</h1>
                    <p className="text-lg text-zinc-400">{c.body}</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <Link
                            to={pagePath('home', locale)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition-colors hover:bg-forest-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400"
                        >
                            <ArrowLeft weight="bold" /> {c.home}
                        </Link>
                        <Link
                            to={pagePath('services', locale)}
                            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-zinc-300 underline decoration-forest-500/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400"
                        >
                            {c.services}
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
