import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Founder } from '../components/Founder';
import { Services } from '../components/Services';
import { Crafts } from '../components/Crafts';
import { SinteticoBand } from '../components/SinteticoBand';
import { PMark } from '../components/PMark';
import { Guarantees } from '../components/Guarantees';
import { Experience } from '../components/Experience';
import { AuditCTA } from '../components/AuditCTA';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';
import { HomeFAQ, homeFaq } from '../components/HomeFAQ';

export default function Home() {

    return (
        <div className="w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased -webkit-font-smoothing-antialiased">
            <Head>
                <title>Pionio · Ivan Panto, siti web, immagini sintetiche e strumenti</title>
                <meta
                    name="description"
                    content="Pionio è lo studio di Ivan Panto: siti web, immagini sintetiche con Sintetico e piccoli strumenti per il web. L'AI esegue, le scelte sono sue."
                />
                <link rel="canonical" href="https://pionio.it/" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pionio.it/" />
                <meta property="og:title" content="Pionio · Ivan Panto, siti web, immagini sintetiche e strumenti" />
                <meta
                    property="og:description"
                    content="Pionio è lo studio di Ivan Panto: siti web, immagini sintetiche con Sintetico e piccoli strumenti per il web. L'AI esegue, le scelte sono sue."
                />
                <meta name="twitter:url" content="https://pionio.it/" />
                <meta name="twitter:title" content="Pionio · Ivan Panto, siti web, immagini sintetiche e strumenti" />
                <meta
                    name="twitter:description"
                    content="Pionio è lo studio di Ivan Panto: siti web, immagini sintetiche con Sintetico e piccoli strumenti per il web. L'AI esegue, le scelte sono sue."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        '@id': 'https://pionio.it/#faq',
                        mainEntity: homeFaq.map((f) => ({
                            '@type': 'Question',
                            name: f.q,
                            acceptedAnswer: { '@type': 'Answer', text: f.a },
                        })),
                    })}
                </script>
            </Head>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>
            <header
                className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 lg:px-24 z-50 flex justify-between items-center pointer-events-none"
                role="banner"
            >
                <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                    <Link to="/" title="PIONIO — Homepage" aria-label="PIONIO — Homepage" className="pointer-events-auto flex h-[34px] items-center">
                        <Logo className="h-[27px] w-auto md:h-[38px] lg:h-[43px] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                    </Link>
                </div>
            </header>

            <main id="main">
                <div id="hero">
                    <Hero />
                </div>

                <div id="crafts">
                    <Crafts />
                </div>

                <div id="about">
                    <About />
                </div>

                <div id="chi-sono">
                    <Founder />
                </div>

                <div id="sintetico">
                    <SinteticoBand />
                </div>

                <div id="services">
                    <Services />
                </div>

                <div id="garanzie">
                    <Guarantees />
                </div>

                <div id="experience">
                    <Experience />
                </div>

                <div id="p-mark">
                    <PMark />
                </div>

                <AuditCTA />

                <HomeFAQ />

                <div>
                    <ContactCTA />
                </div>
            </main>

            <Footer />
        </div>
    );
}
