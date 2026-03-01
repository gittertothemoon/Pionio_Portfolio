export type Locale = 'en' | 'it';

type Dictionary = {
    [key: string]: {
        en: string;
        it: string;
    };
};

export const dict: Dictionary = {
    // Navigation
    nav_about: { en: 'About', it: 'Chi Sono' },
    nav_capabilities: { en: 'Capabilities', it: 'Competenze' },
    nav_works: { en: 'Works', it: 'Progetti' },
    nav_experience: { en: 'Experience', it: 'Esperienza' },
    nav_contact: { en: 'Contact', it: 'Contatti' },

    // Hero
    hero_title: { en: 'Digital\nCraft &\nEngineering.', it: 'Artigianato\nDigitale &\nIngegneria.' },
    hero_subtitle: {
        en: "I'm PIONIO. I bridge the gap between uncompromising design and robust frontend architecture. Crafting high-agency, tailored web experiences.",
        it: "Sono PIONIO. Unisco un design senza compromessi a un'architettura frontend robusta. Creo esperienze web su misura ad alta intensità."
    },
    hero_cta_works: { en: 'View Selected Works', it: 'Vedi i Progetti' },
    hero_cta_contact: { en: 'Start a project', it: 'Inizia un progetto' },
    hero_availability: { en: 'Available for freelance work', it: 'Disponibile per collaborazioni' },

    // About
    about_label: { en: 'Philosophy', it: 'Filosofia' },
    about_headline_1: { en: 'I build digital experiences that refuse to be ', it: 'Costruisco esperienze digitali che si rifiutano di essere ' },
    about_headline_highlight: { en: 'ignored', it: 'ignorate' },
    about_headline_3: { en: '.', it: '.' },
    about_p1: {
        en: "I believe that great engineering is invisible, while great design is unforgettable. My process bridges the gap between rigorous frontend architectures and uncompromising visual aesthetics.",
        it: "Credo che la grande ingegneria sia invisibile, mentre il grande design è indimenticabile. Il mio processo colma il divario tra rigorose architetture frontend e un'estetica visiva senza compromessi."
    },
    about_p2: {
        en: 'By leveraging modern physics engines and tailored color systems, I craft "high-agency" interfaces that actively engage users rather than passively serving data.',
        it: 'Sfruttando motori fisici moderni e sistemi di colori su misura, realizzo interfacce "ad alta intensità" che coinvolgono attivamente gli utenti anziché limitarsi a mostrare dati.'
    },

    // Services
    services_label: { en: 'Capabilities', it: 'Competenze' },
    services_headline_1: { en: 'Designing systems that ', it: 'Sistemi progettati per ' },
    services_headline_highlight: { en: 'scale', it: 'scalare' },
    services_headline_3: { en: '.', it: '.' },
    service_1_title: { en: 'Frontend Architecture', it: 'Architettura Frontend' },
    service_1_desc: {
        en: 'Engineering resilient, scalable React applications. Focusing on Server Components, optimized bundles, and flawless 60fps rendering across all modern viewports.',
        it: 'Ingegnerizzazione di applicazioni React resilienti e scalabili. Fissazione per Server Components, bundle ottimizzati e un rendering impeccabile a 60fps su tutti i dispositivi.'
    },
    service_2_title: { en: 'Interaction Design', it: 'Design Interattivo' },
    service_2_desc: {
        en: 'Breathing life into static pixels. From complex WebGL shaders to micro-physics using Framer Motion, creating interfaces that feel physically tactile and alive.',
        it: 'Dare vita ai pixel statici. Da complessi shader WebGL (3D) alla micro-fisica con Framer Motion, per creare interfacce che risultano tattili e vive.'
    },
    service_3_title: { en: 'Art Direction', it: 'Direzione Artistica' },
    service_3_desc: {
        en: 'Elevating brand perception through uncompromising visual taste. Curating typography, tailored color systems, and asymmetric layouts to guarantee a premium digital footprint.',
        it: "Elevare la percezione del brand attraverso un gusto visivo estremo. Cura della tipografia, palette di colori personalizzate e layout asimmetrici per un'impronta digitale premium."
    },

    // Works Bento
    works_label: { en: 'Selected Works', it: 'Lavori Selezionati' },
    works_headline: { en: 'Visual Engineering.', it: 'Ingegneria Visiva.' },
    works_view_case: { en: 'View Case Study', it: 'Vedi Case Study' },
    work_w2b_cat: { en: 'Community App', it: 'App Community' },
    work_w2b_desc: {
        en: 'A geolocation app for beaches allowing the community to report crowds, water quality, and beach cleanliness.',
        it: "Un'app per geolocalizzare le spiagge e permettere alla community di segnalare la folla, la qualità dell'acqua e la pulizia."
    },
    work_antonela_cat: { en: 'Art Portfolio', it: "Portfolio d'Arte" },
    work_antonela_desc: {
        en: 'An art portfolio for an artist who paints on acrylic canvas.',
        it: "Portfolio d'arte per un artista che dipinge quadri su tele in acrilico."
    },
    work_smoky_cat: { en: 'E-commerce', it: 'E-commerce' },
    work_smoky_desc: {
        en: 'An e-commerce platform for artisanal soy candles made in Italy.',
        it: 'E-commerce di candele artigianali di soia made in Italy.'
    },
    work_arena_cat: { en: 'Local Business', it: 'Attività Locale' },
    work_arena_desc: {
        en: 'A digital presence for a barbershop located in Switzerland.',
        it: 'Presenza digitale per un barber shop situato in Svizzera.'
    },

    // Experience
    exp_label: { en: 'Experience', it: 'Esperienza' },
    exp_1_role: { en: 'Independent Frontend Developer', it: 'Sviluppatore Frontend Indipendente' },
    exp_1_desc: {
        en: 'Crafting modern, performant web applications with a strong focus on UI/UX. Delivering tailored digital experiences using React and the React ecosystem.',
        it: "Sviluppo di applicazioni web moderne e performanti con una forte attenzione alla UI/UX. Realizzazione di esperienze digitali su misura utilizzando React e il suo ecosistema."
    },
    exp_2_role: { en: 'Web Developer', it: 'Sviluppatore Web' },
    exp_2_desc: {
        en: 'Collaborated on the development of full-stack projects, building responsive interfaces and optimizing frontend architectures for better performance and accessibility.',
        it: "Collaborazione allo sviluppo di progetti full-stack, creando interfacce responsive e ottimizzando l'architettura frontend per migliorare performance e accessibilità."
    },
    exp_3_role: { en: 'Frontend Intern / Junior Developer', it: 'Sviluppatore Frontend Junior / Tirocinante' },
    exp_3_desc: {
        en: 'Started the professional journey creating interactive landing pages and learning modern JavaScript frameworks, translating design mockups into functional code.',
        it: 'Inizio del percorso professionale creando landing page interattive e apprendendo i moderni framework JavaScript, trasformando i mockup grafici in codice funzionale.'
    },

    // Contact
    contact_label: { en: 'Get In Touch', it: 'Mettiamoci In Contatto' },
    contact_headline: { en: "Let's build something bold.", it: 'Costruiamo qualcosa di audace.' },
    contact_description: {
        en: "I am currently accepting new freelance projects. Drop your email below and I'll reach out within 24 hours.",
        it: "Attualmente accetto nuovi progetti freelance. Inserisci la tua email qui sotto e ti contatterò entro 24 ore."
    },
    contact_form_button_idle: { en: 'Start', it: 'Inizia' },

    // Footer
    footer_rights: { en: 'All Rights Reserved.', it: 'Tutti i Diritti Riservati.' },

    // Preloader
    preloader_init: { en: 'Initializing', it: 'Inizializzazione' },
};
