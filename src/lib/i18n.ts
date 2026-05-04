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
    nav_capabilities: { en: 'What I Do', it: 'Cosa Faccio' },
    nav_works: { en: 'Works', it: 'Progetti' },
    nav_experience: { en: 'Process', it: 'Processo' },
    nav_contact: { en: 'Contact', it: 'Contatti' },
    nav_servizi: { en: 'Services', it: 'Servizi' },
    nav_blog: { en: 'Blog', it: 'Blog' },
    nav_contatti: { en: 'Contact', it: 'Contatti' },

    // Hero — conversion-first, client language
    hero_title: { en: 'Websites\nthat make your\nbusiness grow.', it: 'Siti web\nche fanno crescere\nil tuo business.' },
    hero_subtitle: {
        en: "I'm PIONIO. I design and build premium websites for entrepreneurs, professionals and brands who want to look serious online — and turn visitors into real customers.",
        it: 'Sono PIONIO. Progetto e sviluppo siti web premium per imprenditori, professionisti e brand che vogliono presentarsi in modo serio online — e trasformare i visitatori in clienti reali.'
    },
    hero_cta_works: { en: 'See real projects', it: 'Vedi i progetti' },
    hero_cta_contact: { en: 'Get a free quote', it: 'Richiedi un preventivo' },
    hero_availability: { en: 'Accepting 2 new projects', it: 'Disponibile per 2 nuovi progetti' },

    // About — speak to the client, not the dev
    about_label: { en: 'Why PIONIO', it: 'Perché PIONIO' },
    about_headline_1: { en: 'A website should ', it: 'Il tuo sito deve ' },
    about_headline_highlight: { en: 'work for you', it: 'lavorare per te' },
    about_headline_3: { en: ', every day.', it: ', ogni giorno.' },
    about_p1: {
        en: 'Most websites are pretty pictures that nobody finds and nobody acts on. Mine are designed to do one job: bring you the right clients and convince them to choose you.',
        it: 'La maggior parte dei siti sono solo bei disegni che nessuno trova e che non portano clienti. I miei sono progettati per fare una cosa: portarti le persone giuste e convincerle a scegliere te.'
    },
    about_p2: {
        en: 'Premium design, fast loading, mobile-first, optimized for Google. You get a digital storefront that builds trust on the first scroll — without the agency price tag and without the technical headaches.',
        it: 'Design premium, caricamento veloce, mobile-first, ottimizzato per Google. Ottieni una vetrina digitale che ispira fiducia al primo scroll — senza il costo di un\'agenzia e senza grattacapi tecnici.'
    },

    about_cta: { en: 'Start your project', it: 'Inizia il tuo progetto' },

    // Services — translate tech jargon into client benefits
    services_label: { en: 'What I Do', it: 'Cosa Faccio Per Te' },
    services_headline_1: { en: 'Three things, ', it: 'Tre cose, ' },
    services_headline_highlight: { en: 'done seriously', it: 'fatte sul serio' },
    services_headline_3: { en: '.', it: '.' },
    service_1_title: { en: 'Websites that convert', it: 'Siti web che convertono' },
    service_1_desc: {
        en: 'Showcase, e-commerce or landing page — built to load instantly, work flawlessly on every phone, and guide your visitor toward one clear action: contacting you or buying.',
        it: 'Sito vetrina, e-commerce o landing page — costruito per caricarsi all\'istante, funzionare alla perfezione su ogni telefono e guidare il visitatore verso un\'unica azione chiara: contattarti o comprare.'
    },
    service_2_title: { en: 'Design that earns trust', it: 'Design che ispira fiducia' },
    service_2_desc: {
        en: 'Smooth animations, refined typography, premium feel. The kind of details that make a visitor think "these people are serious" — before they\'ve read a single word.',
        it: 'Animazioni fluide, tipografia curata, sensazione premium. Quei dettagli che fanno pensare al visitatore "questa gente è seria" — prima ancora di leggere una parola.'
    },
    service_3_title: { en: 'Found on Google', it: 'Visibile su Google' },
    service_3_desc: {
        en: 'Technical SEO, fast Core Web Vitals, clean structured data. Your website is built to be found by the people already searching for what you offer.',
        it: 'SEO tecnica, Core Web Vitals veloci, dati strutturati puliti. Il tuo sito è costruito per essere trovato dalle persone che stanno già cercando ciò che offri.'
    },

    services_cta: { en: 'Tell me about your project', it: 'Parlami del tuo progetto' },

    // Works Bento
    works_label: { en: 'Real Projects, Real Clients', it: 'Progetti Reali, Clienti Reali' },
    works_headline: { en: 'Selected work.', it: 'Lavori selezionati.' },
    works_view_case: { en: 'See details', it: 'Vedi dettagli' },
    works_visit_site: { en: 'Visit site', it: 'Visita il sito' },
    work_w2b_cat: { en: 'Community App', it: 'App Community' },
    work_w2b_desc: {
        en: 'Geolocation app for the Italian coast — live beach reports from a real community of users.',
        it: 'App di geolocalizzazione per la costa italiana — segnalazioni live delle spiagge da una community di utenti reali.'
    },
    work_antonela_cat: { en: 'Art Portfolio', it: "Portfolio d'Arte" },
    work_antonela_desc: {
        en: 'A digital gallery for an emerging painter — quiet, premium, lets the artwork do the talking.',
        it: "Una galleria digitale per un'artista emergente — silenziosa, premium, lascia parlare le opere."
    },
    work_smoky_cat: { en: 'E-commerce', it: 'E-commerce' },
    work_smoky_desc: {
        en: 'Online shop for an Italian artisan candle brand — short checkout, premium feel, online sales from day one.',
        it: 'Shop online per un brand italiano di candele artigianali — checkout breve, sensazione premium, vendite dal primo giorno.'
    },
    work_arena_cat: { en: 'Local Business', it: 'Attività Locale' },
    work_arena_desc: {
        en: 'Digital presence for a Swiss barbershop — clear info, one-tap booking, instant load on mobile.',
        it: 'Presenza digitale per un barber shop svizzero — info chiare, prenotazione in un tap, caricamento istantaneo su mobile.'
    },
    work_flow_cat: { en: 'Landing Page', it: 'Landing Page' },
    work_flow_desc: {
        en: 'Mobile-first landing page for a new Pilates studio near Bologna — built to validate demand and capture real leads before launch.',
        it: 'Landing page mobile-first per un nuovo studio di Pilates vicino Bologna — costruita per validare la domanda e raccogliere lead reali prima del lancio.'
    },

    // Experience → Process (results-focused, not CV)
    exp_label: { en: 'How We Work Together', it: 'Come Lavoriamo Insieme' },
    exp_1_role: { en: '01 — We talk about your goal', it: '01 — Parliamo del tuo obiettivo' },
    exp_1_desc: {
        en: 'A free 30-minute call. You tell me what your business does, who your clients are, and what you want the website to actually achieve. No tech jargon — just clarity.',
        it: 'Una call gratuita di 30 minuti. Mi racconti cosa fa la tua attività, chi sono i tuoi clienti e cosa vuoi davvero ottenere dal sito. Niente gergo tecnico — solo chiarezza.'
    },
    exp_2_role: { en: '02 — I design and build', it: '02 — Progetto e sviluppo' },
    exp_2_desc: {
        en: 'Within 2–4 weeks I deliver a premium, fast, mobile-first website ready for Google. You see progress in real time and approve every step — no surprises at the end.',
        it: 'In 2–4 settimane consegno un sito premium, veloce, mobile-first e pronto per Google. Vedi i progressi in tempo reale e approvi ogni step — nessuna sorpresa alla fine.'
    },
    exp_3_role: { en: '03 — You go live and grow', it: '03 — Vai online e cresci' },
    exp_3_desc: {
        en: "We launch, I hand over a clean, easy-to-update site, and I'm still there if something needs to evolve. Your website becomes an asset that works for you for years.",
        it: 'Lanciamo, ti consegno un sito pulito e facile da aggiornare, e resto a disposizione se qualcosa deve evolvere. Il tuo sito diventa un asset che lavora per te per anni.'
    },

    exp_cta: { en: "Let's start", it: 'Iniziamo' },

    // Contact — direct CTA
    contact_label: { en: 'Get In Touch', it: 'Parliamone' },
    contact_headline: { en: "Ready when you are.", it: 'Pronto quando lo sei tu.' },
    contact_description: {
        en: 'Tell me about your project in 2 minutes. I reply personally within 24 hours with a clear answer: realistic timeline, transparent quote, no hard sell.',
        it: 'Raccontami il tuo progetto in 2 minuti. Ti rispondo personalmente entro 24 ore con una risposta chiara: tempi realistici, preventivo trasparente, zero pressioni commerciali.'
    },
    contact_form_button_idle: { en: 'Send my request', it: 'Invia la mia richiesta' },
    contact_form_button_loading: { en: 'Sending…', it: 'Invio in corso…' },
    contact_form_success_title: { en: 'Got it — thanks', it: 'Ricevuto — grazie' },
    contact_form_success_body: {
        en: "I'll get back to you personally within 24 hours.",
        it: 'Ti rispondo personalmente entro 24 ore.'
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
    contact_field_messaggio: { en: 'Tell me more', it: 'Raccontami di più' },
    contact_field_messaggio_placeholder: {
        en: 'What does your business do? What do you want the website to achieve? When would you like to launch?',
        it: 'Cosa fa la tua attività? Cosa vuoi ottenere dal sito? Quando vorresti lanciare?'
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

    // Mockup showcase sections — short, evocative, conversion-first
    mockup_phone_label: { en: 'Mobile-first by default', it: 'Mobile-first di default' },
    mockup_phone_title: { en: 'Looks perfect in your client\'s pocket.', it: 'Perfetto nella tasca del tuo cliente.' },
    mockup_phone_desc: {
        en: 'Over 70% of your visitors arrive on a phone. Every project I deliver is designed for that screen first — premium, instant, easy to thumb through.',
        it: 'Oltre il 70% dei visitatori arriva da telefono. Ogni progetto che consegno è pensato prima per quello schermo — premium, istantaneo, facile da scorrere col pollice.'
    },
    mockup_laptop_label: { en: 'Desktop, refined', it: 'Desktop, rifinito' },
    mockup_laptop_title: { en: 'A digital storefront that earns trust at first glance.', it: 'Una vetrina digitale che ispira fiducia al primo sguardo.' },
    mockup_laptop_desc: {
        en: 'Generous typography, considered spacing, smooth animation. The visual quality of an agency, without the agency overhead.',
        it: 'Tipografia generosa, spaziature pensate, animazioni fluide. La qualità visiva di un\'agenzia, senza il sovrapprezzo di un\'agenzia.'
    },
    mockup_tablet_label: { en: 'Every device, every detail', it: 'Ogni device, ogni dettaglio' },
    mockup_tablet_title: { en: 'One website, perfectly tuned to every screen.', it: 'Un sito, perfetto su ogni schermo.' },
    mockup_tablet_desc: {
        en: 'Phone, tablet, laptop, ultrawide — your site looks intentional everywhere. No broken layouts, no awkward zooms, no excuses.',
        it: 'Telefono, tablet, laptop, ultrawide — il tuo sito appare voluto ovunque. Niente layout rotti, niente zoom strani, nessuna scusa.'
    },
};
