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
    nav_audit: { en: 'Audit', it: 'Audit' },

    // Hero — conversion-first, client language
    hero_title: { en: 'I draw it|first.\nThen I|build it.', it: 'Disegno\nquello|che poi\ncostruisco.' },
    hero_cta_works: { en: 'See what I make', it: 'Guarda cosa faccio' },
    pmark_title: { en: 'Go on, turn the P.', it: 'La P si può girare.' },
    pmark_body: { en: 'It\'s the Pionio mark in three dimensions. Grab it and turn it however you like; leave it alone and after a few seconds it starts turning on its own again.', it: 'È il segno di Pionio in tre dimensioni. Prendila e girala come vuoi; se la lasci stare, dopo qualche secondo riprende a ruotare da sola.' },
    p3d_trigger: { en: 'How heavy is it?', it: 'Quanto pesa?' },
    p3d_trigger_aria: { en: 'See how much the 3D P weighs', it: 'Scopri il peso della P 3D' },
    p3d_dialog_aria: { en: 'How much the 3D P weighs', it: 'Quanto pesa la P 3D' },
    p3d_close: { en: 'Close', it: 'Chiudi' },
    p3d_kicker: { en: 'Behind the scenes', it: 'Dietro le quinte' },
    p3d_title: { en: 'Actually light.', it: 'Leggera sul serio.' },
    p3d_body: { en: 'The P can move and catch your eye without slowing the page down.', it: 'La P può muoversi e farsi notare senza rallentare la pagina.' },
    p3d_before: { en: 'It used to be', it: 'Prima erano' },
    p3d_old: { en: '8.4 MB', it: '8,4 MB' },
    p3d_now: { en: 'Now it\'s', it: 'Ora pesa il' },
    p3d_less: { en: '90% lighter', it: '90% in meno' },
    p3d_practice: { en: 'In practice', it: 'In pratica' },
    p3d_b1: { en: 'Loads without slowing the site', it: 'Si carica senza rallentare il sito' },
    p3d_b2: { en: 'Stays smooth on a phone too', it: 'Resta fluida anche dal telefono' },
    p3d_b3: { en: 'Only shows up once you scroll to it', it: 'Entra in scena solo quando ci arrivi' },
    p3d_footer: { en: 'Small model, big presence.', it: 'Piccolo modello, grande presenza.' },
    hero_cta_contact: { en: 'Get a free quote', it: 'Richiedi un preventivo' },
    hero_cta_whatsapp: { en: 'Message me on WhatsApp', it: 'Scrivimi su WhatsApp' },

    // Section numbers (vittoriohalfon-style progressive numbering)
    section_num_crafts: { en: '01', it: '01' },
    section_num_about: { en: '02', it: '02' },
    section_num_chisono: { en: '03', it: '03' },
    section_num_services: { en: '04', it: '04' },
    section_num_techstack: { en: '—', it: '—' },
    section_num_garanzie: { en: '05', it: '05' },
    section_num_experience: { en: '06', it: '06' },
    section_num_contact: { en: '07', it: '07' },

    // Three crafts — the studio after the 11/09/2026 turn: web, synthetic images, tools
    crafts_label: { en: 'Three crafts', it: 'Tre mestieri' },
    crafts_headline: { en: 'Websites, synthetic people, small tools.', it: 'Siti web, persone sintetiche, piccoli strumenti.' },
    craft_web_title: { en: 'Web', it: 'Web' },
    craft_web_line: { en: 'I design the site, then I build it, down to the last line. Look closely: the drawing is still under the page.', it: "Disegno il sito e poi lo costruisco, fino all'ultima riga. Guarda bene: sotto la pagina c'è ancora il disegno." },
    craft_web_alt: { en: 'The smokycandle.com home page; wherever you look, its drawing shows under the page, with blocks and measures', it: 'La home di smokycandle.com; dove guardi, sotto la pagina compare il suo disegno, con blocchi e misure' },
    craft_synth_line: { en: 'Faces that don\'t exist, built from the bone out. Look closely: the skull is still under the skin.', it: 'Volti che non esistono, costruiti dall\'osso alla pelle. Guarda bene: sotto il volto c\'è ancora il teschio.' },
    craft_synth_cta: { en: 'Enter Sintetico', it: 'Entra in Sintetico' },
    craft_synth_alt: { en: 'A crystal head with a human face; wherever you look, the skull shows under the skin', it: 'Una testa di cristallo con un volto umano; dove guardi, sotto la pelle compare il teschio' },
    craft_tools_title: { en: 'Tools', it: 'Strumenti' },
    craft_tools_line: { en: 'Small tools I needed and leave open for anyone. The first one checks a site in about twenty seconds and tells you, in plain words, what slows it down and what it\'s missing.', it: 'Piccoli attrezzi che mi sono serviti e che lascio usare a tutti. Il primo controlla un sito in una ventina di secondi e ti dice, a parole semplici, cosa lo rallenta e cosa gli manca.' },
    craft_tools_label: { en: 'Address of the site to check', it: 'Indirizzo del sito da controllare' },
    craft_tools_placeholder: { en: 'yoursite.com', it: 'iltuosito.it' },
    craft_tools_go: { en: 'Check it', it: 'Controlla' },
    craft_tools_hint: { en: 'The full check opens on audit.pionio.it.', it: 'Il controllo completo si apre su audit.pionio.it.' },
    // The receipt in the Tools panel: the audit's real report on where2beach.com (11/09/2026)
    rc_date: { en: '11 Sep 2026', it: '11.09.2026' },
    rc_phone: { en: 'from a phone', it: 'da telefono' },
    rc_fcp: { en: 'first content', it: 'primo contenuto' },
    rc_lcp: { en: 'main content', it: 'contenuto principale' },
    rc_cls: { en: 'layout shift', it: 'spostamenti' },
    rc_weight: { en: 'page weight', it: 'peso della pagina' },
    rc_alt: { en: 'images without alt', it: 'immagini senza alt' },
    rc_total: { en: 'TOTAL', it: 'TOTALE' },
    rc_grade: { en: 'SOLID', it: 'SOLIDO' },
    rc_verdict: { en: 'The site is healthy.', it: 'Il sito è in salute.' },

    // Sintetico band — the label's own room inside Pionio
    band_label: { en: 'A Pionio label', it: "Un'etichetta di Pionio" },
    band_body: {
        en: "People who don't exist, built in layers: images, prompt packs and a lab that turns any photo into a prompt for your own character.",
        it: 'Persone che non esistono, costruite a strati: immagini, pacchetti di prompt e un laboratorio che trasforma qualsiasi foto in un prompt per il tuo personaggio.'
    },
    band_cta: { en: 'Enter Sintetico', it: 'Entra in Sintetico' },
    sintetico_soon: { en: 'Opening soon', it: 'Apre presto' },
    band_img_alt: { en: 'Portrait of a woman sculpted in clear glass, with human eyes', it: 'Ritratto di una donna scolpita nel vetro, con occhi umani' },

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
    garanzie_title: { en: 'The risk is\u00a0mine.', it: 'Il rischio è\u00a0mio.' },
    garanzie_intro: { en: 'Three commitments, and I sign them first.', it: 'Tre impegni, e li firmo io per primo.' },
    garanzie_1_lead: { en: 'See it before you decide.', it: 'Vedi prima, decidi poi.' },
    garanzie_1_body: {
        en: 'I show you a real mockup before asking you to commit, then we refine it together until it feels like you.',
        it: 'Ti mostro un mockup vero prima di chiederti di confermare, poi lo rifiniamo insieme finché ti rappresenta.'
    },
    garanzie_2_lead: { en: 'A clear price and date.', it: 'Prezzo e data chiari.' },
    garanzie_2_body: {
        en: 'Budget and delivery are set before work starts. No hidden costs, no vague deadlines.',
        it: 'Preventivo e consegna li fissiamo prima di iniziare. Niente costi nascosti, niente scadenze vaghe.'
    },
    garanzie_3_lead: { en: 'Yours, with support.', it: 'Tutto tuo, con supporto.' },
    garanzie_3_body: {
        en: 'Code, domain and accounts stay yours. After launch, 30 days of support are included.',
        it: 'Codice, dominio e account restano a te. Dopo il lancio hai 30 giorni di assistenza inclusa.'
    },
    garanzie_sig_caption: { en: 'Ivan Pantò, Pionio', it: 'Ivan Pantò, Pionio' },
    garanzie_sig_alt: { en: "Ivan Pantò's signature", it: 'Firma di Ivan Pantò' },

    // About — speak to the client, not the dev
    about_label: { en: 'Why Pionio', it: 'Perché Pionio' },
    about_title: { en: 'A default is a choice nobody made.', it: 'Il default è una scelta che nessuno ha fatto.' },
    about_body: {
        en: "The typeface that came with it, the theme's colour, whatever spacing happens. Add them up and you get anyone's site. I take them one by one and decide.",
        it: "Il carattere che c'era già, il colore del tema, lo spazio che capita. Sommati fanno il sito di chiunque. Io li prendo uno per uno e decido."
    },
    // The six decisions of section 02 (About.tsx): what the browser gives by default, what this site uses
    spec_bg: { en: 'Background', it: 'Sfondo' },
    spec_bg_from: { en: 'browser white', it: 'bianco del browser' },
    spec_bg_to: { en: '#09090B', it: '#09090B' },
    spec_type: { en: 'Typeface', it: 'Carattere' },
    spec_type_from: { en: 'Times New Roman', it: 'Times New Roman' },
    spec_type_to: { en: 'Geist', it: 'Geist' },
    spec_title: { en: 'Title', it: 'Titolo' },
    spec_title_from: { en: '2em', it: '2em' },
    spec_title_to: { en: 'fills the column', it: 'riempie la colonna' },
    spec_margin: { en: 'Margins', it: 'Margini' },
    spec_margin_from: { en: '8 px', it: '8 px' },
    spec_margin_to: { en: '96 px', it: '96 px' },
    spec_colour: { en: 'Colour', it: 'Colore' },
    spec_colour_from: { en: '#0000EE', it: '#0000EE' },
    spec_colour_to: { en: '#306B4D', it: '#306B4D' },
    spec_buttons: { en: 'Buttons', it: 'Bottoni' },
    spec_buttons_from: { en: 'grey "Submit"', it: '«Invia» grigio' },
    spec_buttons_to: { en: 'say what they do', it: 'dicono cosa fanno' },
    spec_btn_default: { en: 'Submit', it: 'Invia' },
    spec_link_default: { en: 'Click here', it: 'Clicca qui' },

    // Chi sono — the human behind the studio (only section with a face)
    chisono_label: { en: 'About me', it: 'Chi sono' },
    chisono_headline_1: { en: "Behind Pionio there's no agency. There's ", it: "Dietro Pionio non c'è un'agenzia. Ci sono " },
    chisono_headline_highlight: { en: 'me', it: 'io' },
    chisono_headline_3: { en: '.', it: '.' },
    chisono_p1: {
        en: "I'm Ivan. I work across three crafts under one name: websites, synthetic images and small tools. One person from the first idea to the last pixel, so you always talk to whoever is actually making the thing.",
        it: "Sono Ivan. Lavoro su tre mestieri con un solo nome: siti web, immagini sintetiche e piccoli strumenti. Una persona dalla prima idea all'ultimo pixel: parli sempre con chi la cosa la fa davvero."
    },
    chisono_p2: {
        en: "I use AI every day, but I make the calls: it executes, I decide where the work goes. Sintetico is where I push it furthest, building people who don't exist and keeping them the same from one image to the next.",
        it: "Uso l'AI ogni giorno, ma le decisioni le prendo io: lei esegue, io scelgo dove portare il lavoro. Sintetico è dove la spingo più lontano: costruisco persone che non esistono e le tengo identiche da un'immagine all'altra."
    },
    chisono_name: { en: 'Ivan Pantò', it: 'Ivan Pantò' },
    chisono_role: { en: 'Founder · Designer, developer, image-maker', it: 'Fondatore · Designer, developer, image-maker' },
    chisono_more: { en: 'More about me', it: 'Di più su di me' },
    chisono_photo_alt: { en: 'Ivan Pantò, founder of Pionio', it: 'Ivan Pantò, fondatore di Pionio' },

    // Services (04) — what you can ask me for; the figures come from services.ts
    services_label: { en: 'What I Do', it: 'Cosa Faccio Per Te' },
    services_title: { en: 'Tell me what you need.', it: 'Dimmi cosa ti serve.' },
    services_intro: { en: 'For each one: what goes into it and where the price starts.', it: "Per ognuno trovi cosa c'è dentro e da quanto si parte." },
    services_tabs_label: { en: 'What you need', it: 'Cosa ti serve' },
    services_fine: {
        en: 'These are starting prices in euro, for clients outside Italy. We fix the real one before we start, and it stays put.',
        it: 'Sono prezzi di partenza. Quello vero lo fissiamo prima di iniziare, e resta quello.'
    },
    cm_from: { en: 'From', it: 'Da' },
    cm_time_label: { en: 'Time', it: 'Tempi' },
    cm_time_agreed: { en: 'Set together, before we start.', it: 'Li fissiamo insieme, prima di iniziare.' },
    cm_in_label: { en: "What's in it", it: "Dentro c'è" },
    cm_example_label: { en: 'Example:', it: 'Esempio:' },

    cm_site_name: { en: 'A new website', it: 'Un sito nuovo' },
    cm_site_url: { en: 'yoursite.com', it: 'iltuosito.it' },
    // {largeSite}, {shopScratch}: filled from prices.ts with the figure for the language (withPrices)
    cm_site_note: { en: 'From {largeSite} with many pages or custom features.', it: 'Da {largeSite} se le pagine sono tante o servono funzioni particolari.' },
    cm_site_time: { en: '2–4 weeks', it: '2–4 settimane' },
    cm_site_in_1: { en: 'Design and code, both mine.', it: 'Design e codice, tutti e due miei.' },
    cm_site_in_2: { en: 'Made for the phone first, then the big screen.', it: 'Pensato prima per il telefono, poi per lo schermo grande.' },
    cm_site_in_3: { en: 'Readable by Google from launch day.', it: 'Leggibile da Google dal giorno del lancio.' },
    cm_site_example: { en: 'this one.', it: 'questo sito.' },
    cm_site_cta: { en: "Let's talk about your site", it: 'Parliamo del tuo sito' },
    cm_site_msg: { en: 'I need a new website. ', it: 'Mi serve un sito nuovo. ' },

    cm_shop_name: { en: 'An online shop', it: 'Un negozio online' },
    cm_shop_url: { en: 'yourshop.com', it: 'iltuonegozio.it' },
    cm_shop_note: { en: 'On Shopify, ready to sell. From {shopScratch} if I build it from scratch.', it: 'Su Shopify, pronto per vendere. Da {shopScratch} se lo costruisco da zero.' },
    cm_shop_time: { en: '3–5 weeks, depending on complexity', it: '3–5 settimane, secondo la complessità' },
    cm_shop_in_1: { en: 'Product pages with photos, details and shipping up front.', it: 'Schede prodotto con foto, dettagli e spedizione in vista.' },
    cm_shop_in_2: { en: 'Pay by card, Apple Pay, Google Pay or PayPal.', it: 'Si paga con carta, Apple Pay, Google Pay o PayPal.' },
    cm_shop_in_3: { en: 'Fast on a phone too.', it: 'Veloce anche da telefono.' },
    cm_shop_cta: { en: "Let's talk about your shop", it: 'Parliamo del tuo negozio' },
    cm_shop_msg: { en: 'I need an online shop. ', it: 'Mi serve un negozio online. ' },

    cm_redo_name: { en: 'Your site, redone', it: 'Rifare il sito che hai' },
    cm_redo_url: { en: 'yoursite.com', it: 'iltuosito.it' },
    cm_redo_note: { en: 'Content migration and redirects included.', it: 'Migrazione dei contenuti e redirect inclusi.' },
    cm_redo_time: { en: '3–5 weeks, depending on complexity', it: '3–5 settimane, secondo la complessità' },
    cm_redo_in_1: { en: 'First I look at what already works, and keep it.', it: 'Prima guardo cosa funziona già, e lo tengo.' },
    cm_redo_in_2: { en: 'Every old address leads to the right new page.', it: 'Ogni vecchio indirizzo porta alla pagina nuova giusta.' },
    cm_redo_in_3: { en: 'Domain, email and logins sorted, even if someone else built the site.', it: "Dominio, email e accessi in ordine, anche se il sito l'ha fatto qualcun altro." },
    cm_redo_cta: { en: "Let's talk about your site", it: 'Parliamo del tuo sito' },
    cm_redo_msg: { en: "I'd like my site redone. ", it: 'Vorrei rifare il mio sito. ' },

    cm_tool_name: { en: "A tool that doesn't exist yet", it: "Uno strumento che ancora non c'è" },
    cm_tool_url: { en: 'app.yourwork.com', it: 'app.iltuolavoro.it' },
    cm_tool_note: { en: 'For a first version people actually use, not a demo.', it: 'Per una prima versione che si usa davvero, non una demo.' },
    cm_tool_time: { en: '6–12 weeks', it: '6–12 settimane' },
    cm_tool_in_1: { en: 'I start from what you do by hand today.', it: 'Parto da quello che oggi fai a mano.' },
    cm_tool_in_2: { en: 'A prototype to try first, then the code.', it: 'Prima un prototipo da provare, poi il codice.' },
    cm_tool_in_3: { en: 'Logins, database and backups included.', it: 'Accessi, database e backup compresi.' },
    cm_tool_cta: { en: "Let's talk about your tool", it: 'Parliamo del tuo strumento' },
    cm_tool_msg: { en: "I need a tool that doesn't exist yet. ", it: "Mi serve uno strumento che ancora non c'è. " },

    // Works Bento

    // Experience → Process (results-focused, not CV)
    exp_label: { en: 'How We Work Together', it: 'Come Lavoriamo Insieme' },
    exp_title: { en: 'How long it really takes.', it: 'Quanto ci vuole, davvero.' },
    exp_1_name: { en: 'The call', it: 'La chiamata' },
    exp_1_meta: { en: '30 minutes, free', it: '30 minuti, gratis' },
    exp_1_body: {
        en: 'You tell me what you do, who you want to reach and what has to happen on the site.',
        it: 'Mi racconti cosa fai, chi vuoi raggiungere e cosa deve succedere sul sito.'
    },
    exp_2_name: { en: 'Design and build', it: 'Progetto e costruzione' },
    exp_2_meta: { en: '2–4 weeks for a website', it: '2–4 settimane per un sito' },
    exp_2_body: {
        en: 'I draw it, show you, we fix it, I build it. You see the progress as it happens, not at the end.',
        it: 'Disegno, ti faccio vedere, correggiamo, costruisco. I progressi li vedi mentre vanno avanti, non alla fine.'
    },
    exp_3_name: { en: 'Live', it: 'Online' },
    exp_3_meta: { en: '+ 30 days of support', it: '+ 30 giorni di assistenza' },
    exp_3_body: {
        en: 'We publish, I hand over the accounts and how to update them. For 30 days after launch I am there.',
        it: 'Pubblichiamo, ti passo accessi e istruzioni. Per 30 giorni dopo il lancio ci sono.'
    },

    exp_cta: { en: "Let's start", it: 'Iniziamo' },

    // Contact — direct CTA
    contact_label: { en: 'Get In Touch', it: 'Parliamone' },
    contact_headline: { en: "Ready when you are.", it: 'Pronto quando lo sei tu.' },
    contact_description: {
        en: 'Tell me about your project in 2 minutes. I reply personally within 24 hours with a clear answer: realistic timeline, transparent quote, no hard sell.',
        it: 'Raccontami il tuo progetto in 2 minuti. Ti rispondo personalmente entro 24 ore con una risposta chiara: tempi realistici, preventivo trasparente, zero pressioni commerciali.'
    },
    contact_whatsapp_label: { en: 'Quick contact', it: 'Contatto rapido' },
    contact_whatsapp_title: { en: 'Prefer a message?', it: 'Preferisci un messaggio?' },
    contact_whatsapp_body: {
        en: 'Write to me directly on WhatsApp. A few lines are enough to get started.',
        it: 'Scrivimi direttamente su WhatsApp. Bastano due righe per iniziare.'
    },
    contact_form_alternative: { en: 'or tell me everything here', it: 'oppure raccontami tutto qui' },
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
    contact_tipo_redo: { en: 'Website redesign', it: 'Rifacimento del sito' },
    contact_tipo_tool: { en: 'Web tool / app', it: 'Strumento / web app' },
    contact_tipo_altro: { en: 'Other', it: 'Altro' },

    // Bands start at the lowest price of each list (prices.ts): no band below what anything costs.
    contact_budget_low: { en: '€4,000 – €7,500', it: '2.500 – 5.000 €' },
    contact_budget_mid: { en: '€7,500 – €15,000', it: '5.000 – 10.000 €' },
    contact_budget_high: { en: 'Over €15,000', it: 'Oltre 10.000 €' },
    contact_budget_tbd: { en: 'To be defined', it: 'Da definire' },

    contact_trovato_instagram: { en: 'Instagram', it: 'Instagram' },
    contact_trovato_linkedin: { en: 'LinkedIn', it: 'LinkedIn' },
    contact_trovato_portfolio: { en: 'Portfolio', it: 'Portfolio' },
    contact_trovato_passaparola: { en: 'Word of mouth', it: 'Passaparola' },
    contact_trovato_google: { en: 'Google', it: 'Google' },
    contact_trovato_altro: { en: 'Other', it: 'Altro' },

    // Footer
    footer_rights: { en: 'All Rights Reserved.', it: 'Tutti i Diritti Riservati.' },
    footer_services: { en: 'Services', it: 'Servizi' },
    footer_all_services: { en: 'Services and prices', it: 'Servizi e prezzi' },
    footer_all_posts: { en: 'All articles', it: 'Tutti gli articoli' },
    footer_explore: { en: 'Explore', it: 'Esplora' },
    footer_work: { en: 'Work', it: 'Progetti' },
    footer_about: { en: 'About', it: 'Chi sono' },
    footer_contact: { en: 'Contact', it: 'Contatti' },
    skip_to_content: { en: 'Skip to content', it: 'Vai al contenuto' },
};
