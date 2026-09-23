/* eslint-disable react-refresh/only-export-components -- route module exports loader data alongside the page */
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from '@phosphor-icons/react';
import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import { Seo } from '../components/Seo';
import NotFound from './NotFound';
import { getProject, projects, projectCategory, projectLongDescription, type CasoStudio } from '../lib/projects';
import { track } from '../lib/analytics';
import { SITE_URL } from '../lib/facts';
import { breadcrumbs, IDS } from '../lib/graph';
import { absoluteUrl, homeAnchor, pagePath, projectPath } from '../lib/paths';

export function getStaticPaths() {
    return projects.map((p) => `projects/${p.slug}`);
}

export function Component() {
    return <ProjectPage />;
}

// Titles and descriptions written for search, per project and language. Facts only from projects.ts.
const SEO: Record<string, { it: { title: string; description: string }; en: { title: string; description: string } }> = {
    'smoky-candle': {
        it: {
            title: 'Smoky Candle: caso studio, e-commerce con una candela 3D | Pionio',
            description:
                'Il mio marchio di candele di soia: il negozio rifatto attorno a una candela 3D che si apre, si accende e si spegne, con pagamento su Stripe. Settembre 2026.',
        },
        en: {
            title: 'Smoky Candle: case study, an e-commerce with a 3D candle | Pionio',
            description:
                'My own soy candle brand: the shop rebuilt around a 3D candle you open, light and blow out, with Stripe checkout. September 2026.',
        },
    },
    where2beach: {
        it: {
            title: "Where2Beach: app con la mappa live delle spiagge | Pionio",
            description:
                "Un'app con la mappa delle spiagge italiane dove la community segnala folla, qualità dell'acqua e pulizia in tempo reale. Progetto del 2025.",
        },
        en: {
            title: 'Where2Beach: live map app for Italian beaches | Pionio',
            description:
                'A community app with a live map of Italian beaches, where people report crowds, water quality and cleanliness in real time. Built in 2025.',
        },
    },
};

/* Un titolo con una parola in corsivo verde: nei dati la parola sta tra asterischi, *così* */
function TitoloCaso({ testo, className }: { testo: string; className: string }) {
    const parti = testo.split(/\*([^*]+)\*/);
    return (
        <h2 className={className}>
            {parti.map((p, i) =>
                i % 2 === 1 ? (
                    <span key={i} className="text-forest-500 italic font-serif">
                        {p}
                    </span>
                ) : (
                    p
                )
            )}
        </h2>
    );
}

function Caso({ caso, locale }: { caso: CasoStudio; locale: 'it' | 'en' }) {
    const eyebrow = 'text-forest-400 font-mono text-xs uppercase tracking-widest';
    const titolo = 'text-3xl md:text-5xl font-sans tracking-tight text-white leading-[1.05] max-w-[22ch]';
    const n = (i: number) => String(i + 1).padStart(2, '0');
    return (
        <div className="flex flex-col gap-24 md:gap-32 mt-8">
            {caso.sezioni.map((sez, i) => (
                <section key={sez.etichetta} className="grid md:grid-cols-12 gap-6 md:gap-12">
                    <span className={`${eyebrow} md:col-span-3 md:pt-3`}>
                        {n(i)} — {sez.etichetta}
                    </span>
                    <div className="md:col-span-9 flex flex-col gap-6">
                        <TitoloCaso testo={sez.titolo} className={titolo} />
                        {sez.testo?.map((t) => (
                            <p key={t} className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light max-w-[62ch]">
                                {t}
                            </p>
                        ))}
                        {sez.punti && (
                            <ul className="flex flex-col border-t border-white/5">
                                {sez.punti.map((t) => (
                                    <li key={t} className="py-5 border-b border-white/5 text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-[68ch]">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* dopo "cosa ho costruito": il telefono e il cofanetto, visti davvero */}
                        {i === 2 && (
                            <div className="mt-6 flex flex-col gap-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    {caso.immagini.telefono.map((img) => (
                                        <img
                                            key={img.src}
                                            src={img.src}
                                            alt={img.alt}
                                            width="600"
                                            height="1298"
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-auto rounded-[1.4rem] border border-white/10 bg-zinc-900"
                                        />
                                    ))}
                                </div>
                                <img
                                    src={caso.immagini.desktop.src}
                                    alt={caso.immagini.desktop.alt}
                                    width="1600"
                                    height="1000"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto rounded-[1.6rem] border border-white/10 bg-zinc-900"
                                />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            <section className="grid md:grid-cols-12 gap-6 md:gap-12">
                <span className={`${eyebrow} md:col-span-3 md:pt-3`}>
                    {n(caso.sezioni.length)} — {locale === 'it' ? 'I numeri' : 'Numbers'}
                </span>
                <div className="md:col-span-9 flex flex-col gap-8">
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        {caso.numeri.map((x) => (
                            <div key={x.etichetta} className="bg-zinc-950 p-5 md:p-6 flex flex-col gap-2">
                                <dt className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">{x.etichetta}</dt>
                                <dd className="text-white font-sans text-4xl md:text-5xl tracking-tight">{x.valore}</dd>
                                {x.prima && x.prima !== x.valore && (
                                    <dd className="text-zinc-500 font-mono text-xs">
                                        {locale === 'it' ? 'prima' : 'before'} {x.prima}
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                    <p className="text-zinc-400 text-base leading-relaxed max-w-[68ch]">{caso.notaNumeri}</p>
                </div>
            </section>

            <section className="flex flex-col items-start gap-6 border-t border-white/5 pt-16">
                <TitoloCaso testo={caso.cta.titolo} className={titolo} />
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">{caso.cta.testo}</p>
                <Link
                    to={pagePath('contact', locale)}
                    onClick={() => track('cta_contact_click', { source: 'case_study', locale })}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-600 hover:bg-forest-500 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                >
                    {caso.cta.bottone} <ArrowUpRight weight="bold" />
                </Link>
            </section>
        </div>
    );
}

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const { locale } = useLanguage();
    const project = slug ? getProject(slug) : undefined;

    if (!project) return <NotFound />;

    const path = projectPath(project.slug, locale);
    const url = absoluteUrl(path);
    const imageUrl = `${SITE_URL}${project.caso ? project.caso[locale].immagini.hero.src : project.image}`;
    const category = projectCategory(project, locale);
    const longDesc = projectLongDescription(project, locale);
    const shortDesc = project.description[locale];
    const lightBg = project.bgClass ?? 'bg-[#FAF7F2]';
    const isLight = project.theme === 'light';
    const caso = project.caso?.[locale];
    const seo = SEO[project.slug]?.[locale] ?? {
        title: `${project.title}: ${category} (${project.year}) | Pionio`,
        description: shortDesc.length > 155 ? `${shortDesc.slice(0, 152)}…` : shortDesc,
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#creativework`,
        name: project.title,
        url,
        image: imageUrl,
        dateCreated: project.year,
        inLanguage: locale,
        description: shortDesc,
        abstract: longDesc,
        creator: { '@id': IDS.person },
        keywords: project.tech.join(', '),
        ...(project.url ? { sameAs: [project.url] } : {}),
    };
    const crumbs = breadcrumbs([
        { name: 'Home', path: pagePath('home', locale) },
        { name: project.title, path },
    ]);
    const homeLabel = locale === 'it' ? 'Pionio, home' : 'Pionio, home page';
    const alt = locale === 'it' ? `${project.title}, progetto ${category} di Pionio` : `${project.title}, a ${category} project by Pionio`;

    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Seo title={seo.title} description={seo.description} image={imageUrl} imageAlt={alt}>
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(crumbs)}</script>
            </Seo>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {locale === 'it' ? 'Vai al contenuto' : 'Skip to content'}
            </a>

            <header
                className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 lg:px-24 z-50 flex justify-between items-center pointer-events-none"
                role="banner"
            >
                <Link to={pagePath('home', locale)} title={homeLabel} aria-label={homeLabel} className="pointer-events-auto flex h-[34px] items-center">
                    <Logo className="h-[27px] w-auto md:h-[38px] lg:h-[43px] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                </Link>
            </header>

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
                    <div>
                        <Link
                            to={homeAnchor('crafts', locale)}
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-forest-400 font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                        >
                            <ArrowLeft weight="bold" /> {locale === 'it' ? 'Tutti i progetti' : 'All projects'}
                        </Link>
                    </div>

                    <m.div
                        initial={{ y: 24 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-forest-400 font-mono text-xs md:text-sm uppercase tracking-widest">{category}</span>
                            <span className="text-zinc-500 font-mono text-xs md:text-sm">{project.year}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight text-white leading-[0.95]">{project.title}</h1>
                        {caso && <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light max-w-[40ch]">{caso.lead}</p>}
                    </m.div>

                    <div
                        className={`relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden border ${
                            isLight ? `${lightBg} border-zinc-200/60` : 'bg-zinc-900 border-white/5'
                        } shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]`}
                    >
                        {caso ? (
                            <img src={caso.immagini.hero.src} alt={caso.immagini.hero.alt} width="1600" height="1000" decoding="async" className="w-full h-full object-cover" />
                        ) : (
                            <img
                                src={project.image}
                                alt={alt}
                                width="1600"
                                height="1000"
                                decoding="async"
                                className={`w-full h-full ${project.imageFit === 'contain' ? 'object-contain p-12 md:p-20' : 'object-cover'} ${
                                    project.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''
                                }`}
                            />
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 md:gap-16 mt-4">
                        <div className="md:col-span-2 flex flex-col gap-6">
                            <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Il progetto' : 'About the project'}</h2>
                            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">{caso ? shortDesc : longDesc}</p>
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
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Anno' : 'Year'}</span>
                                <span className="text-white font-sans text-xl">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Categoria' : 'Category'}</span>
                                <span className="text-white font-sans text-xl">{category}</span>
                            </div>
                            {caso && (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Ruolo' : 'Role'}</span>
                                        <span className="text-white font-sans text-xl">{caso.ruolo}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Quando' : 'When'}</span>
                                        <span className="text-white font-sans text-base leading-snug">{caso.quando}</span>
                                    </div>
                                </>
                            )}
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Stack</span>
                                <ul className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <li key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {caso && <Caso caso={caso} locale={locale} />}

                    <section className="mt-16 pt-16 border-t border-white/5 flex flex-col gap-8">
                        <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{locale === 'it' ? 'Altri progetti' : 'Other projects'}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {projects
                                .filter((p) => p.slug !== project.slug && !p.personal)
                                .slice(0, 4)
                                .map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={projectPath(p.slug, locale)}
                                        onClick={() => track('project_click', { slug: p.slug, position: 'related', locale })}
                                        className="group flex flex-col gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-forest-500/20 transition-all duration-300"
                                    >
                                        <div className={`aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center ${p.bgClass ?? 'bg-zinc-900'}`}>
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                loading="lazy"
                                                decoding="async"
                                                className={`w-[60%] h-auto object-contain ${p.invertLogo ? '[filter:brightness(0)_invert(1)]' : ''}`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-sans text-sm group-hover:text-forest-100 transition-colors">{p.title}</span>
                                            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{projectCategory(p, locale)}</span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
