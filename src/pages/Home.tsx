import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { Preloader } from '../components/Preloader';
import { Logo } from '../components/Logo';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { WorksBento } from '../components/WorksBento';
import { Experience } from '../components/Experience';
import { TechStack } from '../components/TechStack';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';

export default function Home() {
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
            <Preloader />
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

            <main id="main">
                <div id="hero">
                    <Hero />
                </div>

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
