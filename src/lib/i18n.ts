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
    work_nexora_cat: { en: 'E-commerce Architecture', it: 'Architettura E-commerce' },
    work_nexora_desc: {
        en: 'A headless e-commerce storefront engineered for sub-second load times. Re-architected the entire global state to synchronize carts across multiple tabs using BroadcastChannel edge technology.',
        it: 'Uno storefront e-commerce headless progettato per tempi di caricamento inferiori al secondo. Ristrutturazione dello stato globale per sincronizzare i carrelli su più schede utilizzando la tecnologia BroadcastChannel.'
    },
    work_aura_cat: { en: 'SaaS Dashboard', it: 'Dashboard SaaS' },
    work_aura_desc: {
        en: 'Complex data visualization dashboard for high-frequency traders. Implemented a custom charting library using WebGL to render millions of data points smoothly without freezing the main React thread.',
        it: 'Dashboard complessa di visualizzazione dati per trader ad alta frequenza. Implementazione di una libreria di grafici personalizzata in WebGL per far girare milioni di punti dati a 60fps senza bloccare React.'
    },
    work_verve_cat: { en: 'Creative Portfolio', it: 'Portfolio Creativo' },
    work_verve_desc: {
        en: 'A hyper-aesthetic portfolio for an NYC branding agency. Built entirely around Framer Motion physics springs, ensuring every scroll and hover feels weighty, magnetic, and physically accurate.',
        it: 'Un portfolio iper-estetico per un\'agenzia di branding di NYC. Costruito interamente con le molle fisiche di Framer Motion, per garantire che ogni scroll e hover sia magnetico e fisicamente appagante.'
    },

    // Experience
    exp_label: { en: 'Experience', it: 'Esperienza' },
    exp_1_role: { en: 'Independent Digital Designer & Developer', it: 'Designer & Sviluppatore Digitale Indipendente' },
    exp_1_desc: {
        en: 'Bridging the gap between hyper-aesthetic design and robust frontend architecture for high-profile clients globally. Specializing in WebGL, Framer Motion, and radical UI paradigms.',
        it: 'Colmare il divario tra design iper-estetico e architettura frontend per clienti di alto profilo. Specializzato in WebGL, Framer Motion e paradigmi UI non convenzionali.'
    },
    exp_2_role: { en: 'Senior UI/UX Engineer', it: 'Senior UI/UX Engineer' },
    exp_2_desc: {
        en: 'Led the comprehensive redesign of the core trading application. Engineered complex React dashboards ensuring 60fps performance and WCAG compliant accessibility standards.',
        it: 'Guida della riprogettazione completa dell\'applicazione di trading principale. Sviluppo di dashboard React complesse garantendo prestazioni a 60fps e accessibilità WCAG.'
    },
    exp_3_role: { en: 'Frontend Developer', it: 'Sviluppatore Frontend' },
    exp_3_desc: {
        en: 'Developed award-winning marketing campaigns and interactive landing pages. Pioneered the adoption of headless CMS architectures and modern Jamstack workflows.',
        it: 'Sviluppo di campagne di marketing pluripremiate e landing page interattive. Introduzione di architetture CMS headless e flussi di lavoro Jamstack moderni.'
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
