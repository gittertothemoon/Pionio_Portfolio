import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import { getProject, projects, projectCategory, projectLongDescription } from '../lib/projects';
import { track } from '../lib/analytics';

export function getStaticPaths() {
    return projects.map((p) => `projects/${p.slug}`);
}

export function Component() {
    return <ProjectPage />;
}

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const { locale } = useLanguage();
    const project = slug ? getProject(slug) : undefined;

    if (!project) {
        return (
            <div className="min-h-[100dvh] bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
                <Head>
                    <title>Project not found — PIONIO</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className="text-center flex flex-col gap-6 max-w-md">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</span>
                    <h1 className="text-4xl md:text-5xl font-sans tracking-tight">
                        {locale === 'it' ? 'Progetto non trovato' : 'Project not found'}
                    </h1>
                    <Link
                        to="/"
                        className="self-center inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-forest-500/20 hover:border-forest-500/30 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                    >
                        <ArrowLeft weight="bold" /> {locale === 'it' ? 'Torna al portfolio' : 'Back to portfolio'}
                    </Link>
                </div>
            </div>
        );
    }

    const url = `https://pionio.it/projects/${project.slug}`;
    const imageUrl = `https://pionio.it${project.image}`;
    const category = projectCategory(project, locale);
    const longDesc = projectLongDescription(project, locale);
    const shortDesc = project.description[locale];
    const lightBg = project.bgClass ?? 'bg-[#FAF7F2]';
    const isLight = project.theme === 'light';

    const titleTag = `${project.title} — ${category} (${project.year}) | PIONIO`;
    const seoDesc = shortDesc.length > 160 ? shortDesc.slice(0, 157) + '…' : shortDesc;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#creativework`,
        name: project.title,
        url,
        image: imageUrl,
        dateCreated: project.year,
        inLanguage: locale === 'it' ? 'it-IT' : 'en-US',
        description: shortDesc,
        about: longDesc,
        creator: { '@id': 'https://pionio.it/#person' },
        author: { '@id': 'https://pionio.it/#person' },
        isPartOf: { '@id': 'https://pionio.it/#works' },
        keywords: project.tech.join(', '),
        ...(project.url ? { sameAs: [project.url] } : {}),
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'it' ? 'Home' : 'Home',
                item: 'https://pionio.it/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: locale === 'it' ? 'Lavori' : 'Works',
                item: 'https://pionio.it/#works',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: url,
            },
        ],
    };

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content={seoDesc} />
                <meta name="keywords" content={`PIONIO, ${project.title}, ${category}, ${project.tech.join(', ')}, sviluppatore web, frontend developer`} />
                <link rel="canonical" href={url} />
                <link rel="alternate" hrefLang="it" href={url} />
                <link rel="alternate" hrefLang="en" href={url} />
                <link rel="alternate" hrefLang="x-default" href={url} />

                <meta property="og:type" content="article" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={`${project.title} — ${category}`} />
                <meta property="og:description" content={seoDesc} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:image:alt" content={`${project.title} — ${category} project by PIONIO`} />
                <meta property="article:author" content="PIONIO" />
                <meta property="article:published_time" content={`${project.year}-01-01`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={`${project.title} — ${category}`} />
                <meta name="twitter:description" content={seoDesc} />
                <meta name="twitter:image" content={imageUrl} />

                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <header
                className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex justify-between items-center pointer-events-none"
                role="banner"
            >
                <Link to="/" title="PIONIO — Homepage" aria-label="PIONIO — Homepage" className="pointer-events-auto">
                    <Logo className="h-40 md:h-56 lg:h-64 w-auto object-cover object-left-top -mt-10 md:-mt-16 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                </Link>
            </header>

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/#works"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                        >
                            <ArrowLeft weight="bold" /> {locale === 'it' ? 'Tutti i progetti' : 'All projects'}
                        </Link>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-forest-400 font-mono text-xs md:text-sm uppercase tracking-widest">
                                {category}
                            </span>
                            <span className="text-zinc-500 font-mono text-xs md:text-sm">— {project.year}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight text-white leading-[0.95]">
                            {project.title}
                        </h1>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className={`relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden border ${
                            isLight ? `${lightBg} border-zinc-200/60` : 'bg-zinc-900 border-white/5'
                        } shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]`}
                    >
                        <img
                            src={project.image}
                            alt={`${project.title} — ${category} project by PIONIO`}
                            width="1600"
                            height="1000"
                            decoding="async"
                            className={`w-full h-full ${
                                project.imageFit === 'contain' ? 'object-contain p-12 md:p-20' : 'object-cover'
                            } ${project.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''}`}
                        />
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="grid md:grid-cols-3 gap-12 md:gap-16 mt-4"
                    >
                        <div className="md:col-span-2 flex flex-col gap-6">
                            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                {locale === 'it' ? 'Il progetto' : 'About the project'}
                            </h2>
                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
                                {longDesc}
                            </p>
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track('project_visit_external', { slug: project.slug, locale })}
                                    className="self-start mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest-500/30 bg-forest-500/10 hover:bg-forest-500/20 text-forest-100 font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                                >
                                    {locale === 'it' ? 'Visita il sito' : 'Visit site'} <ArrowUpRight weight="bold" />
                                </a>
                            )}
                        </div>

                        <aside className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                    {locale === 'it' ? 'Anno' : 'Year'}
                                </span>
                                <span className="text-white font-sans text-xl">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                    {locale === 'it' ? 'Categoria' : 'Category'}
                                </span>
                                <span className="text-white font-sans text-xl">{category}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                    Stack
                                </span>
                                <ul className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <li
                                            key={tech}
                                            className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </m.div>

                    <m.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-16 pt-16 border-t border-white/5 flex flex-col gap-8"
                    >
                        <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            {locale === 'it' ? 'Altri progetti' : 'Other projects'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {projects
                                .filter((p) => p.slug !== project.slug)
                                .slice(0, 4)
                                .map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={`/projects/${p.slug}`}
                                        onClick={() => track('project_click', { slug: p.slug, position: 'related', locale })}
                                        className="group flex flex-col gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all duration-300"
                                    >
                                        <div
                                            className={`aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center ${
                                                p.bgClass ?? 'bg-zinc-900'
                                            }`}
                                        >
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                loading="lazy"
                                                decoding="async"
                                                className={`w-[60%] h-auto object-contain ${
                                                    p.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''
                                                }`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-sans text-sm group-hover:text-forest-100 transition-colors">
                                                {p.title}
                                            </span>
                                            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                                {projectCategory(p, locale)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </m.section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
