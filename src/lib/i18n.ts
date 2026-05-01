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

    about_cta: { en: 'Start a project', it: 'Inizia un progetto' },

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

    services_cta: { en: 'Have a project in mind?', it: 'Hai un progetto in mente?' },

    // Works Bento
    works_label: { en: 'Selected Works', it: 'Lavori Selezionati' },
    works_headline: { en: 'Visual Engineering.', it: 'Ingegneria Visiva.' },
    works_view_case: { en: 'View Case Study', it: 'Vedi Case Study' },
    works_visit_site: { en: 'Visit Site', it: 'Visita il Sito' },
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
    work_flow_cat: { en: 'Landing Page', it: 'Landing Page' },
    work_flow_desc: {
        en: 'Mobile-first landing page validating a boutique Pilates Reformer studio in San Giorgio di Piano, Bologna. Premium design with a lead-capture form connected to Supabase.',
        it: 'Landing page mobile-first per la validazione di uno studio boutique di Pilates Reformer a San Giorgio di Piano, Bologna. Design premium con form di raccolta lead collegato a Supabase.'
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

    exp_cta: { en: "Let's work together", it: 'Lavoriamo insieme' },

    // Contact
    contact_label: { en: 'Get In Touch', it: 'Mettiamoci In Contatto' },
    contact_headline: { en: "Let's build something bold.", it: 'Costruiamo qualcosa di audace.' },
    contact_description: {
        en: "I am currently accepting new freelance projects. Drop your email below and I'll reach out within 24 hours.",
        it: "Attualmente accetto nuovi progetti freelance. Inserisci la tua email qui sotto e ti contatterò entro 24 ore."
    },
    contact_form_button_idle: { en: 'Send message', it: 'Invia messaggio' },
    contact_form_button_loading: { en: 'Sending…', it: 'Invio in corso…' },
    contact_form_success_title: { en: 'Message sent', it: 'Messaggio inviato' },
    contact_form_success_body: {
        en: "I'll get back to you within 24 hours.",
        it: 'Ti risponderò entro 24 ore.'
    },
    contact_form_send_another: { en: 'Send another', it: 'Invia un altro messaggio' },
    contact_form_error: {
        en: 'Something went wrong. Please try again or email me directly.',
        it: 'Qualcosa è andato storto. Riprova o scrivimi direttamente via email.'
    },

    contact_field_nome: { en: 'Name', it: 'Nome' },
    contact_field_email: { en: 'Email', it: 'Email' },
    contact_field_tipo: { en: 'Project type', it: 'Tipo di progetto' },
    contact_field_budget: { en: 'Budget', it: 'Budget indicativo' },
    contact_field_messaggio: { en: 'Message', it: 'Messaggio' },
    contact_field_messaggio_placeholder: {
        en: 'Tell me about your project, goals, and timeline…',
        it: 'Raccontami il progetto, gli obiettivi e i tempi…'
    },
    contact_field_trovato: { en: 'How did you find me?', it: 'Come mi hai trovato?' },
    contact_field_optional: { en: 'optional', it: 'opzionale' },
    contact_field_required_hint: { en: '* required', it: '* campi obbligatori' },
    contact_select_placeholder: { en: 'Select an option', it: 'Seleziona un\'opzione' },

    contact_tipo_web: { en: 'Website / Landing page', it: 'Sito web / Landing page' },
    contact_tipo_ecommerce: { en: 'E-commerce', it: 'E-commerce' },
    contact_tipo_app: { en: 'Mobile app', it: 'App mobile' },
    contact_tipo_branding: { en: 'Branding / Logo', it: 'Branding / Logo' },
    contact_tipo_altro: { en: 'Other', it: 'Altro' },

    contact_budget_low: { en: '< €1,000', it: '< €1.000' },
    contact_budget_mid: { en: '€1,000 – €3,000', it: '€1.000 – €3.000' },
    contact_budget_high: { en: '€3,000 – €5,000', it: '€3.000 – €5.000' },
    contact_budget_top: { en: '> €5,000', it: '> €5.000' },
    contact_budget_tbd: { en: 'To be defined', it: 'Da definire' },

    contact_trovato_instagram: { en: 'Instagram', it: 'Instagram' },
    contact_trovato_linkedin: { en: 'LinkedIn', it: 'LinkedIn' },
    contact_trovato_portfolio: { en: 'Portfolio', it: 'Portfolio' },
    contact_trovato_passaparola: { en: 'Word of mouth', it: 'Passaparola' },
    contact_trovato_google: { en: 'Google', it: 'Google' },
    contact_trovato_altro: { en: 'Other', it: 'Altro' },

    // Footer
    footer_rights: { en: 'All Rights Reserved.', it: 'Tutti i Diritti Riservati.' },

    // Preloader
    preloader_init: { en: 'Initializing', it: 'Inizializzazione' },
};
