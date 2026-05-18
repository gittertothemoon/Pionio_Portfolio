import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';
import { getPost, posts } from '../lib/blog';

export function getStaticPaths() {
    return posts.map((p) => `blog/${p.slug}`);
}

export function Component() {
    return <BlogPost />;
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPost(slug) : undefined;

    if (!post) {
        return (
            <div className="min-h-[100dvh] bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
                <Head>
                    <title>Articolo non trovato — PIONIO</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className="text-center flex flex-col gap-6 max-w-md">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</span>
                    <h1 className="text-4xl md:text-5xl font-sans tracking-tight">Articolo non trovato</h1>
                    <Link
                        to="/blog"
                        className="self-center inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-forest-500/20 text-white font-mono text-xs uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft weight="bold" /> Tutti gli articoli
                    </Link>
                </div>
            </div>
        );
    }

    const url = `https://pionio.it/blog/${post.slug}`;

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#blogposting`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title,
        description: post.seoDescription,
        image: 'https://pionio.it/og-image.png',
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'it-IT',
        author: { '@id': 'https://pionio.it/#person' },
        publisher: { '@id': 'https://pionio.it/#person' },
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        url,
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pionio.it/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://pionio.it/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
    };

    const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{post.seoTitle}</title>
                <meta name="description" content={post.seoDescription} />
                <meta name="keywords" content={post.keywords.join(', ')} />
                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="it" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={post.seoTitle} />
                <meta property="og:description" content={post.seoDescription} />
                <meta property="og:image" content="https://pionio.it/og-image.png" />
                <meta property="article:published_time" content={post.datePublished} />
                <meta property="article:modified_time" content={post.dateModified} />
                <meta property="article:author" content="PIONIO" />
                <meta property="article:section" content={post.category} />
                {post.keywords.map((k) => (
                    <meta key={k} property="article:tag" content={k} />
                ))}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.seoTitle} />
                <meta name="twitter:description" content={post.seoDescription} />
                <meta name="twitter:image" content="https://pionio.it/og-image.png" />
                <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
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
                <article className="max-w-[760px] mx-auto flex flex-col gap-12">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors"
                        >
                            <ArrowLeft weight="bold" /> Tutti gli articoli
                        </Link>
                    </m.div>

                    <m.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="flex flex-col gap-6"
                    >
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
                        <h1 className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]">
                            {post.title}
                        </h1>
                    </m.header>

                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-6 text-zinc-300 text-lg leading-[1.75] font-light"
                    >
                        {post.sections.map((section, i) => {
                            switch (section.type) {
                                case 'h2':
                                    return (
                                        <h2
                                            key={i}
                                            className="text-3xl md:text-4xl font-sans tracking-tight text-white mt-10 mb-2 leading-tight"
                                        >
                                            {section.text}
                                        </h2>
                                    );
                                case 'h3':
                                    return (
                                        <h3
                                            key={i}
                                            className="text-xl md:text-2xl font-sans tracking-tight text-white mt-6 mb-1"
                                        >
                                            {section.text}
                                        </h3>
                                    );
                                case 'p':
                                    return <p key={i}>{section.text}</p>;
                                case 'ul':
                                    return (
                                        <ul key={i} className="flex flex-col gap-3 pl-5 list-disc marker:text-forest-400">
                                            {section.items.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                case 'ol':
                                    return (
                                        <ol
                                            key={i}
                                            className="flex flex-col gap-3 pl-5 list-decimal marker:text-forest-400 marker:font-mono"
                                        >
                                            {section.items.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ol>
                                    );
                                case 'quote':
                                    return (
                                        <blockquote
                                            key={i}
                                            className="border-l-2 border-forest-500/50 pl-6 italic text-zinc-200"
                                        >
                                            {section.text}
                                        </blockquote>
                                    );
                                case 'callout':
                                    return (
                                        <aside
                                            key={i}
                                            className="my-4 p-6 md:p-8 rounded-2xl border border-forest-500/20 bg-forest-500/5 flex flex-col gap-3"
                                        >
                                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                                {section.title}
                                            </span>
                                            <p className="text-zinc-200">{section.text}</p>
                                        </aside>
                                    );
                            }
                        })}
                    </m.div>

                    <m.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 p-8 md:p-12 rounded-[2.5rem] border border-forest-500/20 bg-forest-500/5 flex flex-col gap-6"
                    >
                        <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                            Hai un progetto in mente?
                        </span>
                        <h2 className="text-2xl md:text-3xl font-sans tracking-tight text-white">
                            Trasformiamo queste idee nel tuo prossimo sito.
                        </h2>
                        <p className="text-zinc-300 text-lg leading-relaxed">
                            Se quello che hai letto qui ti convince e cerchi un partner per metterlo in pratica,
                            parliamone. Ti rispondo entro 48 ore con una stima realistica e i prossimi passi.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/contatti"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-500/20 border border-forest-500/40 text-forest-100 hover:bg-forest-500/30 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                Richiedi un preventivo <ArrowUpRight weight="bold" />
                            </Link>
                            <Link
                                to="/servizi"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                Esplora i servizi
                            </Link>
                        </div>
                    </m.section>

                    {otherPosts.length > 0 && (
                        <m.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                            className="mt-12 pt-12 border-t border-white/5 flex flex-col gap-8"
                        >
                            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                Continua a leggere
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {otherPosts.map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={`/blog/${p.slug}`}
                                        className="group flex flex-col gap-3 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all"
                                    >
                                        <span className="text-forest-400 font-mono text-[10px] uppercase tracking-widest">
                                            {p.category}
                                        </span>
                                        <span className="text-white font-sans text-base group-hover:text-forest-100 transition-colors leading-snug">
                                            {p.title}
                                        </span>
                                        <span className="text-zinc-500 font-mono text-[10px]">
                                            {p.readingMinutes} min
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </m.section>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
}
