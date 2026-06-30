import type { Locale } from './i18n';

export type Project = {
    slug: string;
    id: string;
    title: string;
    category: { en: string; it: string };
    year: string;
    image: string;
    description: { en: string; it: string };
    longDescription: { en: string; it: string };
    url?: string;
    imageFit?: 'contain' | 'cover';
    theme?: 'dark' | 'light';
    bgClass?: string;
    // Black/dark logos need to be inverted to white when shown on a dark card.
    invertLogo?: boolean;
    span: string;
    tech: string[];
    // Personal flagship products (my own, not client work). Excluded from the
    // client "Works" grid — they get their own dedicated spotlight instead.
    personal?: boolean;
};

export const projects: Project[] = [
    {
        slug: 'where2beach',
        id: 'w2b',
        title: 'Where2Beach',
        category: { en: 'Community App', it: 'App Community' },
        year: '2025',
        image: '/images/w2b-logo.png',
        description: {
            en: 'A geolocation app for beaches allowing the community to report crowds, water quality, and beach cleanliness.',
            it: "Un'app per geolocalizzare le spiagge e permettere alla community di segnalare la folla, la qualità dell'acqua e la pulizia.",
        },
        longDescription: {
            en: 'Where2Beach is a community-driven geolocation app for the Italian coast. Users can browse a live map of beaches, see real-time community reports on crowd levels, water quality and cleanliness, and contribute their own observations. Built with React, TypeScript and a geospatial backend, the app focuses on fast, glanceable information for beachgoers planning a day out.',
            it: 'Where2Beach è un\'app di geolocalizzazione community-driven per la costa italiana. Gli utenti possono esplorare una mappa live delle spiagge, vedere segnalazioni in tempo reale su affollamento, qualità dell\'acqua e pulizia, e contribuire con le proprie osservazioni. Costruita con React, TypeScript e un backend geospaziale, l\'app punta su informazioni rapide e immediate per chi pianifica una giornata al mare.',
        },
        url: 'https://www.where2beach.com',
        imageFit: 'contain',
        theme: 'dark',
        span: 'md:col-span-2',
        tech: ['React', 'TypeScript', 'Geolocation', 'Real-time'],
    },
    {
        slug: 'flow-pilates',
        id: 'flow',
        title: 'FLOW Pilates Studio',
        category: { en: 'Landing Page', it: 'Landing Page' },
        year: '2026',
        image: '/images/flow-logo.png',
        description: {
            en: 'Mobile-first landing page validating a boutique Pilates Reformer studio in San Giorgio di Piano, Bologna. Custom design with a lead-capture form connected to Supabase.',
            it: 'Landing page mobile-first per la validazione di uno studio boutique di Pilates Reformer a San Giorgio di Piano, Bologna. Design su misura con form di raccolta lead collegato a Supabase.',
        },
        longDescription: {
            en: 'A mobile-first validation landing page for a new boutique Pilates Reformer studio opening in San Giorgio di Piano, near Bologna. The design is intentionally minimal and fast, with a single conversion goal: lead capture. The form is wired to Supabase so the founders can review interest in real time before committing to a full launch.',
            it: 'Landing page mobile-first per la validazione di un nuovo studio boutique di Pilates Reformer in apertura a San Giorgio di Piano, vicino Bologna. Il design è volutamente minimale e veloce, con un unico obiettivo di conversione: la raccolta lead. Il form è collegato a Supabase così che i fondatori possano valutare l\'interesse in tempo reale prima del lancio completo.',
        },
        url: 'https://flow-pilates-studio-bo.vercel.app',
        imageFit: 'contain',
        theme: 'dark',
        invertLogo: true,
        span: 'md:col-span-1',
        tech: ['React', 'Tailwind', 'Supabase', 'Mobile-first'],
    },
    {
        slug: 'antonela-paintings',
        id: 'antonela',
        title: "Antonela's Paintings",
        category: { en: 'Art Portfolio', it: "Portfolio d'Arte" },
        year: '2024',
        image: '/images/antonela-logo.png',
        description: {
            en: 'An art portfolio for an artist who paints on acrylic canvas.',
            it: "Portfolio d'arte per un artista che dipinge quadri su tele in acrilico.",
        },
        longDescription: {
            en: 'A digital portfolio for an emerging painter working on acrylic canvas. The site frames each piece like a gallery wall, with quiet typography and generous whitespace so the work itself stays the focus. Built to be effortless to update as new collections are produced.',
            it: 'Portfolio digitale per un\'artista emergente che lavora su tela in acrilico. Il sito incornicia ogni opera come una parete di galleria, con tipografia discreta e spazi ampi perché il lavoro resti al centro. Progettato per essere aggiornato senza sforzo all\'arrivo di nuove collezioni.',
        },
        url: 'https://antonelamaliqi.vercel.app',
        imageFit: 'contain',
        theme: 'dark',
        invertLogo: true,
        span: 'md:col-span-1',
        tech: ['React', 'Tailwind', 'CMS-ready'],
    },
    {
        slug: 'smoky-candle',
        id: 'smoky',
        title: 'Smoky Candle',
        category: { en: 'E-commerce', it: 'E-commerce' },
        year: '2024',
        image: '/images/smokycandle-logo.png',
        description: {
            en: 'An e-commerce platform for artisanal soy candles made in Italy.',
            it: 'E-commerce di candele artigianali di soia made in Italy.',
        },
        longDescription: {
            en: 'An e-commerce storefront for a small Italian maker of artisanal soy candles. The product pages emphasize material, scent and craft over volume, and the checkout is short and frictionless. The whole experience is tuned for trust — exactly what a hand-poured product needs.',
            it: 'E-commerce per un piccolo produttore italiano di candele artigianali in soia. Le schede prodotto valorizzano materia, profumo e artigianalità più che il volume, e il checkout è breve e senza attriti. Tutta l\'esperienza è calibrata per generare fiducia — esattamente ciò che serve a un prodotto fatto a mano.',
        },
        url: 'https://smokycandle.com',
        imageFit: 'contain',
        theme: 'dark',
        invertLogo: true,
        span: 'md:col-span-1',
        tech: ['React', 'E-commerce', 'Tailwind'],
    },
    {
        slug: 'arena-barbershop',
        id: 'arena',
        title: 'Arena Barbershop',
        category: { en: 'Local Business', it: 'Attività Locale' },
        year: '2024',
        image: '/images/arena-logo.png',
        description: {
            en: 'A digital presence for a barbershop located in Switzerland.',
            it: 'Presenza digitale per un barber shop situato in Svizzera.',
        },
        longDescription: {
            en: 'A polished digital presence for a barbershop in Switzerland. The site reads like a confident shopfront sign — clear hours, location, services and a single call to book — and is built to load instantly on the mobile devices most local customers use.',
            it: 'Presenza digitale curata per un barber shop in Svizzera. Il sito si legge come un\'insegna sicura di sé — orari, posizione, servizi e una singola call per prenotare — ed è costruito per caricarsi all\'istante sui dispositivi mobili che la clientela locale usa di più.',
        },
        url: 'https://arena-barbershop.vercel.app',
        imageFit: 'contain',
        theme: 'dark',
        invertLogo: true,
        span: 'md:col-span-1',
        tech: ['React', 'Tailwind', 'Local SEO'],
    },
    {
        slug: 'vespero',
        id: 'vespero',
        title: 'Vespero',
        category: { en: 'Personal SaaS', it: 'SaaS personale' },
        year: '2026',
        image: '/images/vespero-logo.png',
        description: {
            en: 'My own product — an AI assistant on WhatsApp and Telegram that answers clients for Italian freelancers, in their own voice.',
            it: 'Il mio prodotto — un assistente AI su WhatsApp e Telegram che risponde ai clienti per i freelance italiani, con la loro voce.',
        },
        longDescription: {
            en: "Vespero is my own SaaS product, designed and built end to end. It's an AI assistant on WhatsApp and Telegram for Italian freelancers, professionals and makers: it replies to clients when they can't — quotes, follow-ups, after-hours messages, project briefings and reminders — always in the freelancer's own voice. Onboarding takes ten minutes with no terminal: sign up, set your profile and rates, connect WhatsApp with a QR code, pick your skills. Under the hood it's a Next.js 15 dashboard on Supabase, a multi-tenant Node gateway powered by Claude, and Stripe billing — live in production at vespero.ai. A warm voice in the night.",
            it: 'Vespero è il mio prodotto SaaS, progettato e costruito da zero. È un assistente AI su WhatsApp e Telegram per freelance, professionisti e artigiani italiani: risponde ai clienti quando loro non possono — preventivi, follow-up, messaggi fuori orario, briefing e promemoria — sempre con la voce del freelance. L\'onboarding richiede dieci minuti senza terminale: registrazione, profilo e tariffe, WhatsApp via QR, scelta delle skill. Sotto il cofano è una dashboard Next.js 15 su Supabase, un gateway Node multi-tenant alimentato da Claude e pagamenti Stripe — in produzione su vespero.ai. Una voce calda nella notte.',
        },
        url: 'https://vespero.ai',
        imageFit: 'contain',
        theme: 'dark',
        span: 'md:col-span-1',
        tech: ['Next.js 15', 'TypeScript', 'Supabase', 'Claude AI', 'WhatsApp API', 'Stripe'],
        personal: true,
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function projectCategory(p: Project, locale: Locale): string {
    return p.category[locale];
}

export function projectDescription(p: Project, locale: Locale): string {
    return p.description[locale];
}

export function projectLongDescription(p: Project, locale: Locale): string {
    return p.longDescription[locale];
}
