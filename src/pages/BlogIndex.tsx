import { Seo } from '../components/Seo';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { postPath, postsFor } from '../lib/blog';
import { useLanguage } from '../context/LanguageContext';
import { absoluteUrl, pagePath } from '../lib/paths';

// The two blogs are different: the Italian one for the Italian market, the English one for clients abroad.
const COPY = {
    it: {
        title: 'Blog: prezzi, siti web e SEO spiegati semplici | Pionio',
        description:
            'Guide di Ivan Pantò su quanto costa un sito, come scegliere chi lo fa e cosa serve per farsi trovare su Google. Numeri veri, niente gergo.',
        name: 'Blog di Pionio',
        h1: 'Idee chiare su web, design e SEO.',
        lead: 'Guide pratiche, opinioni argomentate e numeri reali sul mestiere di costruire siti e applicazioni web. Scritto per il mercato italiano, senza fuffa.',
        skip: 'Vai al contenuto',
        minutes: 'min di lettura',
        read: "Leggi l'articolo",
        date: 'it-IT',
    },
    en: {
        title: 'Blog: websites, pricing and 3D on the web, from Italy | Pionio',
        description:
            'Notes by Ivan Pantò, a web designer in Italy: what a site costs, how the work runs with a client abroad, and what I learn building them.',
        name: 'Pionio blog',
        h1: 'Notes from the workshop.',
        lead: 'Prices, process and what I learn building websites. Written in English for clients outside Italy.',
        skip: 'Skip to content',
        minutes: 'min read',
        read: 'Read the article',
        date: 'en-GB',
    },
} as const;

export default function BlogIndex() {
    const { locale } = useLanguage();
    const c = COPY[locale];
    const posts = postsFor(locale);
    const url = absoluteUrl(pagePath('blog', locale));
    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: c.name,
        description: c.description,
        inLanguage: locale,
        author: { '@id': 'https://pionio.it/#person' },
        publisher: { '@id': 'https://pionio.it/#org' },
        blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absoluteUrl(postPath(p.slug, locale)),
            datePublished: p.datePublished,
            dateModified: p.dateModified,
            author: { '@id': 'https://pionio.it/#person' },
        })),
    };
    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(pagePath('home', locale)) },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
        ],
    };
    const sorted = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={c.title} description={c.description}>
                <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Seo>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {c.skip}
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-20">
                    <m.section
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-8 max-w-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">Blog</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            {c.h1}
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light">
                            {c.lead}
                        </p>
                    </m.section>

                    <section className="flex flex-col gap-8">
                        {sorted.map((post, i) => (
                            <m.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.5, delay: i * 0.04 }}
                            >
                                <Link
                                    to={postPath(post.slug, locale)}
                                    className="group block p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-forest-500/20 transition-all"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-wrap items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                            <span className="text-forest-400">{post.category}</span>
                                            <span>•</span>
                                            <time dateTime={post.datePublished}>
                                                {new Date(post.datePublished).toLocaleDateString(c.date, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </time>
                                            <span>•</span>
                                            <span>{post.readingMinutes} {c.minutes}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-sans tracking-tight text-white group-hover:text-forest-100 transition-colors leading-[1.15]">
                                            {post.title}
                                        </h2>
                                        <p className="text-zinc-400 text-lg leading-relaxed font-light max-w-2xl">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors">
                                            {c.read} <ArrowUpRight weight="bold" />
                                        </div>
                                    </div>
                                </Link>
                            </m.article>
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
