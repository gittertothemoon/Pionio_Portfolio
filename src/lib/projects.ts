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
    // A full case study, per language. Only facts: numbers are measured, never estimated.
    caso?: { en: CasoStudio; it: CasoStudio };
    // quando la pagina è cambiata l'ultima volta (per la sitemap), se diverso dal resto del sito
    aggiornato?: string;
};

/** Un titolo con una parola in corsivo: la parola va tra asterischi, *così*. */
export type CasoStudio = {
    lead: string;
    ruolo: string;
    quando: string;
    sezioni: { etichetta: string; titolo: string; testo?: string[]; punti?: string[] }[];
    numeri: { valore: string; etichetta: string; prima?: string }[];
    notaNumeri: string;
    immagini: {
        hero: { src: string; alt: string };
        desktop: { src: string; alt: string };
        telefono: { src: string; alt: string }[];
    };
    cta: { titolo: string; testo: string; bottone: string };
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
        category: { en: 'E-commerce, my own brand', it: 'E-commerce, marchio mio' },
        year: '2026',
        image: '/images/smokycandle-logo.png',
        previewImage: '/images/casi/smoky/desk-hero.webp',
        description: {
            en: 'My own soy candle brand. I rebuilt its shop around a 3D candle you can open, light and blow out, with Stripe checkout.',
            it: 'Il mio marchio di candele di soia. Ho rifatto il negozio attorno a una candela 3D che si apre, si accende e si spegne, con il pagamento su Stripe.',
        },
        longDescription: {
            en: 'Smoky Candle is my own brand: soy candles my cousin and I pour by hand. The first site, in February 2026, was a static storefront whose checkout did nothing. In September 2026 I rebuilt it around a WebGL candle modelled on the real jar, which you open, light and blow out, gift boxes that assemble as you scroll, and a working Stripe checkout.',
            it: 'Smoky Candle è il mio marchio: candele di soia che colo a mano con mio cugino. Il primo sito, a febbraio 2026, era una vetrina ferma e il suo checkout non faceva niente. A settembre 2026 l\'ho rifatto attorno a una candela in WebGL modellata sul vasetto vero, che si apre, si accende e si spegne, a cofanetti che si compongono scorrendo e a un pagamento vero su Stripe.',
        },
        url: 'https://smokycandle.com',
        imageFit: 'contain',
        theme: 'dark',
        invertLogo: true,
        span: 'md:col-span-1',
        tech: ['Next.js', 'React Three Fiber', 'three.js', 'Web Audio', 'Stripe', 'Tailwind'],
        aggiornato: '2026-09-23',
        caso: {
            en: {
                lead: 'Smoky Candle is my own brand: soy candles my cousin and I pour by hand. I rebuilt its shop around a candle you can open, light and blow out.',
                ruolo: 'Brand, design and code',
                quando: 'First version February 2026, rebuilt September 2026',
                sezioni: [
                    {
                        etichetta: 'The brand',
                        titolo: 'A real product, in a *garage*.',
                        testo: [
                            'Soy wax, a wooden wick, two scents: Butter and Berry. We sold about thirty candles by hand, to people we could look in the eye.',
                            'Coin, the Italian department store chain, saw them and liked them. Then the budget got in the way. The stock is still real, and it sits in my garage.',
                        ],
                    },
                    {
                        etichetta: 'The problem',
                        titolo: 'The first site sold *nothing*.',
                        testo: [
                            'The first version, in February 2026, looked right. The checkout button did not do anything.',
                            'A candle is bought for how it feels in a room. A grid of photos does not give you that.',
                        ],
                    },
                    {
                        etichetta: 'What I built',
                        titolo: 'A candle that *follows* you down the page.',
                        punti: [
                            'A WebGL candle modelled on the real jar: the printed label, the black or gold screw cap, the white tube box.',
                            'You open the box, unscrew the cap and light it. Forty hours of burn run in two minutes, and the wax goes down.',
                            'Pass quickly over the flame and it goes out, like a breath. A thread of smoke rises from the wick.',
                            'The crackle, the pop of the box and the clicks of the cap are generated with Web Audio. No audio files.',
                            'As you scroll, the gift boxes assemble themselves: the second candle, the black box with tissue and ribbon, the envelope with the handwritten note.',
                            'Checkout on Stripe. Prices are read on the server, shipping is free from 50 euro.',
                        ],
                    },
                    {
                        etichetta: 'What broke on the iPhone',
                        titolo: 'Three things I learned the *hard* way.',
                        punti: [
                            'A fixed 3D canvas that follows the scroll always lands one frame late on iOS, so the candle shakes. Now the canvas lives inside each section and Safari scrolls it with the page.',
                            'Safari ignores filters on a 2D canvas: the grey logo on the box came out gold. I bake it into an image instead.',
                            'Browsers only play sound after a real tap, and scrolling does not count. The sound button is always in view, and every tap tries again.',
                        ],
                    },
                ],
                numeri: [
                    { valore: '78', etichetta: 'Performance', prima: '92' },
                    { valore: '100', etichetta: 'Accessibility', prima: '91' },
                    { valore: '100', etichetta: 'Best practices', prima: '100' },
                    { valore: '100', etichetta: 'SEO', prima: '100' },
                ],
                notaNumeri:
                    'Lighthouse 12, mobile, measured locally on 23 September 2026. The earlier number is the static first version. The 3D engine weighs about 250 KB compressed, so it loads once the page is ready and the candle fades in.',
                immagini: {
                    hero: { src: '/images/casi/smoky/desk-hero.webp', alt: 'The Smoky Candle home page: a lit Butter candle inside the brick arch of the logo' },
                    desktop: { src: '/images/casi/smoky/desk-cofanetti.webp', alt: 'The Discovery Box assembled in 3D: two candles in a black box, the lid with a ribbon, an envelope with a handwritten note' },
                    telefono: [
                        { src: '/images/casi/smoky/mob-pack.webp', alt: 'On the phone, the candle arrives closed in its white tube box' },
                        { src: '/images/casi/smoky/mob-accesa.webp', alt: 'The candle unboxed, uncapped and lit' },
                        { src: '/images/casi/smoky/mob-regalo.webp', alt: 'The gift box assembled while scrolling' },
                        { src: '/images/casi/smoky/mob-carrello.webp', alt: 'The cart with free shipping, before the Stripe checkout' },
                    ],
                },
                cta: {
                    titolo: 'Want your product to feel like *this*?',
                    testo: 'I build one site at a time. Tell me what you sell.',
                    bottone: 'Let\'s talk',
                },
            },
            it: {
                lead: 'Smoky Candle è il mio marchio: candele di soia che colo a mano con mio cugino. Ho rifatto il suo negozio attorno a una candela che si apre, si accende e si spegne.',
                ruolo: 'Marchio, design e codice',
                quando: 'Prima versione a febbraio 2026, rifatto a settembre 2026',
                sezioni: [
                    {
                        etichetta: 'Il marchio',
                        titolo: 'Un prodotto vero, in un *garage*.',
                        testo: [
                            'Cera di soia, stoppino in legno, due fragranze: Butter e Berry. Ne abbiamo vendute una trentina a mano, a persone che potevamo guardare in faccia.',
                            'Coin, la catena di grandi magazzini, le ha viste e le sono piaciute. Poi il budget si è messo di mezzo. Lo stock è vero, ed è nel mio garage.',
                        ],
                    },
                    {
                        etichetta: 'Il problema',
                        titolo: 'Il primo sito non vendeva *niente*.',
                        testo: [
                            'La prima versione, a febbraio 2026, sembrava a posto. Il bottone del checkout non faceva niente.',
                            'Una candela si compra per come sta in una stanza. Una griglia di foto questo non te lo dà.',
                        ],
                    },
                    {
                        etichetta: 'Cosa ho costruito',
                        titolo: 'Una candela che ti *segue* lungo la pagina.',
                        punti: [
                            'Una candela in WebGL modellata sul vasetto vero: l\'etichetta di stampa, il tappo a vite nero o dorato, la scatola a tubo bianca.',
                            'Apri la scatola, sviti il tappo e la accendi. Quaranta ore di fiamma passano in due minuti, e la cera cala.',
                            'Passi veloce sopra la fiamma e si spegne, come con un soffio. Dallo stoppino sale un filo di fumo.',
                            'Il crepitio, il pop della scatola e gli scatti del tappo sono generati con Web Audio. Nessun file audio.',
                            'Scorrendo, i cofanetti si compongono da soli: la seconda candela, la scatola nera con velina e nastro, la busta col biglietto scritto a mano.',
                            'Pagamento su Stripe. I prezzi li legge il server, la spedizione è gratuita da 50 euro.',
                        ],
                    },
                    {
                        etichetta: 'Cosa si è rotto su iPhone',
                        titolo: 'Tre cose imparate a *spese* mie.',
                        punti: [
                            'Una tela 3D fissa che insegue lo scroll su iOS arriva sempre un fotogramma dopo, e la candela sobbalza. Adesso la tela vive dentro ogni sezione e la fa scorrere Safari con la pagina.',
                            'Safari ignora i filtri sulle tele 2D: il logo grigio della scatola veniva dorato. Adesso è un\'immagine già pronta.',
                            'I browser fanno suonare solo dopo un tocco vero, e lo scroll non conta. Il bottone del suono è sempre in vista, e ogni tocco riprova.',
                        ],
                    },
                ],
                numeri: [
                    { valore: '78', etichetta: 'Prestazioni', prima: '92' },
                    { valore: '100', etichetta: 'Accessibilità', prima: '91' },
                    { valore: '100', etichetta: 'Buone pratiche', prima: '100' },
                    { valore: '100', etichetta: 'SEO', prima: '100' },
                ],
                notaNumeri:
                    'Lighthouse 12, mobile, misurato in locale il 23 settembre 2026. Il numero di prima è quello della prima versione, statica. Il motore 3D pesa circa 250 KB compressi, quindi parte a pagina pronta e la candela entra in dissolvenza.',
                immagini: {
                    hero: { src: '/images/casi/smoky/desk-hero.webp', alt: 'La home di Smoky Candle: una candela Butter accesa dentro l\'arco in mattoni del logo' },
                    desktop: { src: '/images/casi/smoky/desk-cofanetti.webp', alt: 'Il Discovery Box composto in 3D: due candele nella scatola nera, il coperchio col nastro, la busta col biglietto scritto a mano' },
                    telefono: [
                        { src: '/images/casi/smoky/mob-pack.webp', alt: 'Sul telefono la candela arriva chiusa nella sua scatola a tubo bianca' },
                        { src: '/images/casi/smoky/mob-accesa.webp', alt: 'La candela tolta dal pack, svitata e accesa' },
                        { src: '/images/casi/smoky/mob-regalo.webp', alt: 'Il cofanetto regalo composto scorrendo' },
                        { src: '/images/casi/smoky/mob-carrello.webp', alt: 'Il carrello con la spedizione gratuita, prima del pagamento su Stripe' },
                    ],
                },
                cta: {
                    titolo: 'Vuoi che il tuo prodotto si senta *così*?',
                    testo: 'Lavoro su un sito alla volta. Dimmi cosa vendi.',
                    bottone: 'Parliamone',
                },
            },
        },
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
