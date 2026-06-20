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
    nav_vespero: { en: 'Vespero', it: 'Vespero' },
    nav_experience: { en: 'Process', it: 'Processo' },
    nav_contact: { en: 'Contact', it: 'Contatti' },
    nav_servizi: { en: 'Services', it: 'Servizi' },
    nav_blog: { en: 'Blog', it: 'Blog' },
    nav_contatti: { en: 'Contact', it: 'Contatti' },
    nav_audit: { en: 'Audit', it: 'Audit' },

    // Hero — conversion-first, client language
    hero_title: { en: 'Websites\nthat make your\nbusiness grow.', it: 'Siti web\nche fanno crescere\nil tuo business.' },
    hero_subtitle: {
        en: "I'm PIONIO. I design and build premium websites for entrepreneurs, professionals and brands who want to look serious online — and turn visitors into real customers.",
        it: 'Sono PIONIO. Progetto e sviluppo siti web premium per imprenditori, professionisti e brand che vogliono presentarsi in modo serio online — e trasformare i visitatori in clienti reali.'
    },
    hero_cta_works: { en: 'See real projects', it: 'Vedi i progetti' },
    hero_cta_contact: { en: 'Get a free quote', it: 'Richiedi un preventivo' },
    hero_availability: { en: 'Available for freelance work', it: 'Disponibile per collaborazioni' },

    // Section numbers (vittoriohalfon-style progressive numbering)
    section_num_about: { en: '01', it: '01' },
    section_num_services: { en: '02', it: '02' },
    section_num_techstack: { en: '03', it: '03' },
    section_num_works: { en: '04', it: '04' },
    section_num_vespero: { en: '05', it: '05' },
    section_num_garanzie: { en: '06', it: '06' },
    section_num_experience: { en: '07', it: '07' },
    section_num_contact: { en: '08', it: '08' },

    // Audit tool CTA band (links to audit.pionio.it)
    audit_cta_label: { en: 'Free tool', it: 'Strumento gratuito' },
    audit_cta_headline: { en: "How's your site really doing?", it: "Com'è messo il tuo sito, davvero?" },
    audit_cta_description: {
        en: "Paste your site's address. In a few seconds I'll tell you what's slowing it down and what's costing you visitors — in plain words, not just numbers. No email needed.",
        it: "Incolla l'indirizzo del tuo sito. In pochi secondi ti dico cosa lo rallenta e cosa ti fa perdere visitatori — in italiano, non in numeri. Niente email.",
    },
    audit_cta_button: { en: 'Check your site', it: 'Controlla il tuo sito' },

    // TechStack
    techstack_label: { en: 'Tech Stack', it: 'Tech Stack' },

    // Garanzie — risk reversal section
    garanzie_label: { en: 'Guarantees', it: 'Garanzie' },
    garanzie_headline_1: { en: 'The risk ', it: 'Il rischio ' },
    garanzie_headline_highlight: { en: 'is mine', it: 'è mio' },
    garanzie_headline_3: { en: '.', it: '.' },
    garanzie_intro: {
        en: 'When you choose PIONIO, you don\'t take risks. You see the project before you commit, you know exactly what you\'re paying for, and you\'re never alone after launch.',
        it: 'Quando scegli PIONIO, non rischi. Vedi il progetto prima di confermare, sai esattamente cosa stai pagando e dopo il lancio non resti mai da solo.'
    },
    garanzie_1_title: { en: 'Free mockup before you commit', it: 'Mockup gratuito prima di confermare' },
    garanzie_1_desc: {
        en: 'Before you pay anything, I show you a real preview of your website. If it doesn\'t convince you, you walk away — no costs, no obligations.',
        it: 'Prima di pagare un euro, ti mostro un\'anteprima reale del tuo sito. Se non ti convince, te ne vai — zero costi, zero obblighi.'
    },
    garanzie_2_title: { en: 'Unlimited revisions included', it: 'Revisioni illimitate incluse' },
    garanzie_2_desc: {
        en: 'We work together until the result genuinely reflects you. No "extra rounds" charged separately, no surprises on the final invoice.',
        it: 'Lavoriamo insieme finché il risultato non ti rappresenta davvero. Niente "round extra" fatturati a parte, niente sorprese sulla fattura finale.'
    },
    garanzie_3_title: { en: 'No hidden costs', it: 'Nessun costo nascosto' },
    garanzie_3_desc: {
        en: 'Transparent quote signed before we start. The price you agree on is the price you pay. Period.',
        it: 'Preventivo trasparente firmato prima di iniziare. Il prezzo concordato è il prezzo che paghi. Punto.'
    },
    garanzie_4_title: { en: 'Post-launch support', it: 'Assistenza post-lancio' },
    garanzie_4_desc: {
        en: '30 days of free support after going live. Bugs, fixes, small tweaks — all included. Then optional maintenance, never forced.',
        it: '30 giorni di assistenza gratuita dopo il go-live. Bug, fix, piccoli aggiustamenti — tutto incluso. Dopo, manutenzione opzionale, mai imposta.'
    },
    garanzie_5_title: { en: 'You own everything', it: 'Tutto è di tua proprietà' },
    garanzie_5_desc: {
        en: 'Code, domain, hosting, accounts: it all stays in your name. No lock-in, no leverage. The website is yours from day one.',
        it: 'Codice, dominio, hosting, account: tutto resta intestato a te. Nessun lock-in, nessuna leva. Il sito è tuo dal primo giorno.'
    },
    garanzie_6_title: { en: 'Fixed delivery date', it: 'Data di consegna fissa' },
    garanzie_6_desc: {
        en: 'Agreed timeline written in the contract. If I miss it for reasons that are on me, you get a discount. Simple.',
        it: 'Tempistica concordata e scritta nel contratto. Se sforo per cause mie, ti riconosco uno sconto. Semplice.'
    },

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

    // Vespero — personal flagship SaaS spotlight (my own product, not client work)
    vespero_label: { en: 'Personal project', it: 'Progetto personale' },
    vespero_tagline: { en: 'A warm voice in the night.', it: 'Una voce calda nella notte.' },
    vespero_body: {
        en: "Vespero is my own SaaS product — not client work. An AI assistant that answers clients on WhatsApp and Telegram for Italian freelancers, professionals and makers: quotes, follow-ups, briefings and reminders, always in their own voice. I designed and built it end to end, from the interface to the multi-tenant gateway.",
        it: 'Vespero è il mio prodotto SaaS — non un lavoro su commissione. Un assistente AI che risponde ai clienti su WhatsApp e Telegram per freelance, professionisti e artigiani italiani: preventivi, follow-up, briefing e promemoria, sempre con la loro voce. L\'ho progettato e costruito da zero, dall\'interfaccia al gateway multi-tenant.'
    },
    vespero_point_1: { en: 'AI assistant on WhatsApp & Telegram', it: 'Assistente AI su WhatsApp e Telegram' },
    vespero_point_2: { en: "Replies in the freelancer's own voice", it: 'Risponde con la voce del freelance' },
    vespero_point_3: { en: '10-minute onboarding, no terminal', it: 'Onboarding in 10 minuti, zero terminale' },
    vespero_point_4: { en: 'Multi-tenant, Stripe billing, in production', it: 'Multi-tenant, pagamenti Stripe, in produzione' },
    vespero_cta_visit: { en: 'Visit vespero.ai', it: 'Visita vespero.ai' },
    vespero_cta_more: { en: 'Explore the project', it: 'Scopri il progetto' },
    vespero_chat_name: { en: 'Vespero', it: 'Vespero' },
    vespero_chat_status: { en: 'online', it: 'online' },
    vespero_chat_in: { en: 'Hi! Can you send me a quote for the website?', it: 'Ciao! Mi fai un preventivo per il sito?' },
    vespero_chat_out: {
        en: "Of course. A showcase site starts at €3,500 — I'll put together a tailored proposal and send it over by tomorrow.",
        it: 'Certo. Un sito vetrina parte da 3.500€ — ti preparo una proposta su misura e te la mando entro domani.'
    },
    vespero_chat_caption: { en: 'This is how Vespero replies — in your voice.', it: 'Così risponde Vespero, con la tua voce.' },

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
    contact_privacy_consent_pre: { en: 'By sending you accept the', it: 'Inviando accetti l\'' },
    contact_privacy_consent_link: { en: 'privacy policy', it: 'informativa privacy' },

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
};
