import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/Logo';
import { Hero } from '../components/Hero';
import { Hero3D } from '../components/Hero3D';
import { About } from '../components/About';
import { useIsRestrictedWebView } from '../lib/ua';
import { Services } from '../components/Services';
import { WorksBento } from '../components/WorksBento';
import { Guarantees } from '../components/Guarantees';
import { Experience } from '../components/Experience';
import { TechStack } from '../components/TechStack';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';

export default function Home() {
    const { t } = useLanguage();
    const restricted = useIsRestrictedWebView();

    return (
        <div className="w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased -webkit-font-smoothing-antialiased">
            <Head>
                <title>PIONIO — Siti web premium che fanno crescere il tuo business</title>
                <meta
                    name="description"
                    content="Sviluppatore web freelance italiano. Progetto siti web, e-commerce e landing page premium per imprenditori e brand. Design che ispira fiducia, veloce su mobile, ottimizzato per Google."
                />
                <link rel="canonical" href="https://pionio.it/" />
                <meta property="og:url" content="https://pionio.it/" />
                <meta property="og:title" content="PIONIO — Siti web premium che fanno crescere il tuo business" />
                <meta
                    property="og:description"
                    content="Sviluppatore web freelance italiano. Siti web, e-commerce e landing page premium per imprenditori e brand. Veloci, mobile-first, ottimizzati per Google."
                />
                <meta name="twitter:url" content="https://pionio.it/" />
                <meta name="twitter:title" content="PIONIO — Siti web premium che fanno crescere il tuo business" />
                <meta
                    name="twitter:description"
                    content="Sviluppatore web freelance italiano. Siti premium che attirano clienti e ispirano fiducia. Veloci, mobile-first, ottimizzati per Google."
                />
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
                <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                    <Link to="/" title="PIONIO — Homepage" aria-label="PIONIO — Homepage" className="pointer-events-auto">
                        <Logo className="h-40 md:h-56 lg:h-64 w-auto object-cover object-left-top -mt-10 md:-mt-16 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                    </Link>
                    <span className="hidden xl:inline-flex pointer-events-auto items-center gap-2 px-3 py-1 xl:-mt-16 rounded-full border border-forest-500/50 bg-forest-900/40 text-forest-200 text-sm font-mono tracking-tight">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
                        </span>
                        {t('hero_availability')}
                    </span>
                </div>
            </header>

            <main id="main">
                <div id="hero">
                    <Hero />
                </div>

                {/* Mobile-only: standalone interactive 3D showcase.
                    Skipped inside Instagram / Facebook / Threads / TikTok
                    in-app browsers — model-viewer + WebGL barely run there. */}
                <section className={`${restricted ? 'hidden' : 'xl:hidden'} w-full bg-zinc-950 pt-20 pb-24 px-6 flex flex-col items-center gap-10`}>
                    <div className="flex items-center gap-4">
                        <span className="text-forest-500 font-mono text-xs tracking-widest">PIONIO</span>
                        <div className="h-[1px] w-8 bg-forest-500/50" />
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">P mark</span>
                    </div>
                    <div className="w-full h-[380px] max-w-md">
                        <Hero3D
                            className="w-full h-full"
                            interactive
                            float
                            src="/models/pionio-3d-mobile.gltf"
                        />
                    </div>
                    <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                        Trascina per ruotare
                    </p>
                </section>

                <div id="about">
                    <About />
                </div>

                <div id="services">
                    <Services />
                </div>

                <TechStack />

                <div id="works">
                    <WorksBento />
                </div>

                <div id="garanzie">
                    <Guarantees />
                </div>

                <div id="experience">
                    <Experience />
                </div>

                <div id="contact">
                    <ContactCTA />
                </div>
            </main>

            <Footer />
        </div>
    );
}
