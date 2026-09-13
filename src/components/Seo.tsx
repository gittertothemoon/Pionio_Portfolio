import type { ReactNode } from 'react';
import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_URL } from '../lib/facts';
import { absoluteUrl, alternatesFor } from '../lib/paths';

type Props = {
    title: string;
    description: string;
    type?: 'website' | 'article';
    image?: string;
    imageAlt?: string;
    noindex?: boolean;
    /** Page-level extras: JSON-LD scripts, article:* meta. Plain elements only, no fragments (Helmet). */
    children?: ReactNode;
};

// The head of every page, from one place: title, description, canonical, the hreflang pair when the
// page exists in both languages, Open Graph and the <html lang>. The canonical and the alternates come
// from the address itself, so a page can't point at the wrong twin.
export function Seo({ title, description, type = 'website', image, imageAlt, noindex, children }: Props) {
    const { locale } = useLanguage();
    const { pathname } = useLocation();
    const alt = alternatesFor(pathname);
    const url = absoluteUrl(pathname);
    const paired = Boolean(alt.it && alt.en);
    const img = image ?? `${SITE_URL}/og-cover.png`;
    const imgAlt =
        imageAlt ?? (locale === 'it' ? 'Disegno quello che poi costruisco. Pionio' : 'I draw it first. Then I build it. Pionio');

    return (
        <Head>
            <html lang={locale} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="robots"
                content={noindex ? 'noindex' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
            />
            <link rel="canonical" href={url} />
            {paired && <link rel="alternate" hrefLang="it" href={absoluteUrl(alt.it!)} />}
            {paired && <link rel="alternate" hrefLang="en" href={absoluteUrl(alt.en!)} />}
            {paired && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(alt.en!)} />}
            <meta property="og:site_name" content="Pionio" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={img} />
            <meta property="og:image:alt" content={imgAlt} />
            <meta property="og:locale" content={locale === 'it' ? 'it_IT' : 'en_GB'} />
            {paired && <meta property="og:locale:alternate" content={locale === 'it' ? 'en_GB' : 'it_IT'} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={img} />
            {children}
        </Head>
    );
}
