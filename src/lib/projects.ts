import type { Locale } from './i18n';

export type Project = {
    slug: string;
    id: string;
    title: string;
    category: { en: string; it: string };
    year: string;
    image: string;
    previewImage?: string;
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
        previewImage: '/images/where2beach.webp',
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
        slug: 'smoky-candle',
        id: 'smoky',
        title: 'Smoky Candle',
        category: { en: 'E-commerce', it: 'E-commerce' },
        year: '2024',
        image: '/images/smokycandle-logo.png',
        previewImage: '/images/smoky-card-1200.webp',
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
