import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { posts } from '../lib/blog';

const url = 'https://pionio.it/blog';
const title = 'Blog — Web Design, Sviluppo, SEO per il mercato italiano | PIONIO';
const description =
    'Blog di PIONIO: guide pratiche su web design, sviluppo web, e-commerce, web app e SEO. Articoli tecnici e strategici scritti per il mercato italiano, senza fuffa.';

const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}#blog`,
    url,
    name: 'Blog PIONIO',
    description,
    author: { '@id': 'https://pionio.it/#person' },
    publisher: { '@id': 'https://pionio.it/#person' },
    blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${url}/${p.slug}`,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        author: { '@id': 'https://pionio.it/#person' },
    })),
};

const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pionio.it/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
    ],
};

export default function BlogIndex() {
    const sorted = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="blog web design, blog sviluppo web, blog seo italia, guida web design, guida seo, blog freelance web"
                />
                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="it" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://pionio.it/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-20">
                    <m.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-8 max-w-3xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">Blog</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05]">
                            Idee chiare su web, design e SEO.
                        </h1>
                        <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light">
                            Guide pratiche, opinioni argomentate e numeri reali sul mestiere di costruire siti e
                            applicazioni web. Scritto per il mercato italiano, senza fuffa.
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
                                    to={`/blog/${post.slug}`}
                                    className="group block p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-forest-500/20 transition-all"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-wrap items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                            <span className="text-forest-400">{post.category}</span>
                                            <span>•</span>
                                            <time dateTime={post.datePublished}>
                                                {new Date(post.datePublished).toLocaleDateString('it-IT', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </time>
                                            <span>•</span>
                                            <span>{post.readingMinutes} min di lettura</span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-sans tracking-tight text-white group-hover:text-forest-100 transition-colors leading-[1.15]">
                                            {post.title}
                                        </h2>
                                        <p className="text-zinc-400 text-lg leading-relaxed font-light max-w-2xl">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors">
                                            Leggi l'articolo <ArrowUpRight weight="bold" />
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
