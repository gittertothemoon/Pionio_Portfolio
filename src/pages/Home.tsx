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
import { Seo } from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { FACTS } from '../lib/facts';
import { IDS } from '../lib/graph';
import { absoluteUrl, pagePath } from '../lib/paths';
import { eur, PRICES } from '../lib/prices';

export default function Home() {
    const { locale, t } = useLanguage();
    const home = pagePath('home', locale);
    const url = absoluteUrl(home);

    const title =
        locale === 'it'
            ? 'Pionio · Ivan Pantò: siti web, immagini sintetiche e strumenti'
            : 'Pionio · Ivan Pantò: websites, synthetic images and tools';
    const description =
        locale === 'it'
            ? `Sono Ivan Pantò, base Bologna. Disegno e costruisco siti web, creo persone sintetiche con Sintetico e piccoli strumenti. Siti da ${eur(PRICES.site.it, 'it')}, rispondo entro ${FACTS.replyWithinHours} ore.`
            : `I'm Ivan Pantò, an independent designer and developer in Bologna, Italy. I design and build websites for clients abroad, from ${eur(PRICES.site.en, 'en')}, and reply within ${FACTS.replyWithinHours} hours.`;

    const webPage = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { '@id': IDS.website },
        about: { '@id': IDS.org },
    };
    const faqPage = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: homeFaq(locale).map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };
    const homeLabel = locale === 'it' ? 'Pionio, home' : 'Pionio, home page';

    return (
        <div className="w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased -webkit-font-smoothing-antialiased">
            <Seo title={title} description={description}>
                <script type="application/ld+json">{JSON.stringify(webPage)}</script>
                <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
            </Seo>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                {t('skip_to_content')}
            </a>
            <header
                className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 lg:px-24 z-50 flex justify-between items-center pointer-events-none"
                role="banner"
            >
                <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                    <Link to={home} title={homeLabel} aria-label={homeLabel} className="pointer-events-auto flex h-[34px] items-center">
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
