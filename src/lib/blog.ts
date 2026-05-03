export type BlogSection =
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'p'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'quote'; text: string }
    | { type: 'callout'; title: string; text: string };

export type BlogPost = {
    slug: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    excerpt: string;
    keywords: string[];
    datePublished: string; // ISO
    dateModified: string; // ISO
    readingMinutes: number;
    category: string;
    sections: BlogSection[];
};

export const posts: BlogPost[] = [
    {
        slug: 'quanto-costa-un-sito-web',
        title: 'Quanto costa un sito web nel 2026? Guida ai prezzi reali in Italia',
        seoTitle: 'Quanto Costa un Sito Web nel 2026 — Prezzi Reali in Italia | PIONIO',
        seoDescription:
            'Quanto costa davvero un sito web in Italia nel 2026? Guida ai prezzi di sito vetrina, e-commerce e web app, con range realistici, voci di costo e cosa evitare.',
        excerpt:
            'Range di prezzo realistici per sito vetrina, e-commerce e web app. Quali voci di costo aspettarsi e quali sono i campanelli d\'allarme di un preventivo troppo basso o troppo gonfiato.',
        keywords: [
            'quanto costa un sito web',
            'prezzo sito web',
            'preventivo sito web italia',
            'costo sito ecommerce',
            'costo web app',
        ],
        datePublished: '2026-04-12',
        dateModified: '2026-05-03',
        readingMinutes: 9,
        category: 'Guida ai prezzi',
        sections: [
            {
                type: 'p',
                text: "“Quanto costa un sito web?” è la domanda più comune e quella con la risposta più frustrante: dipende. Ma “dipende” non è una scusa per non dare numeri. In questa guida trovi range realistici per i tre tipi di progetto più richiesti in Italia nel 2026 — sito vetrina, e-commerce e web application — con le voci di costo che li compongono e i segnali per riconoscere preventivi gonfiati o sospettosamente bassi.",
            },
            { type: 'h2', text: 'I tre fattori che determinano davvero il prezzo' },
            {
                type: 'p',
                text: 'Prima dei range, conviene capire cosa muove davvero un preventivo. Sono solo tre cose, ed è bene tenerle a mente quando confronti più offerte.',
            },
            {
                type: 'ol',
                items: [
                    'Quanto è custom il design. Un tema riadattato costa una frazione di un design fatto da zero su misura del brand.',
                    'Quanta logica c\'è dietro. Un catalogo statico è una cosa; un sito con login, ricerca avanzata, filtri, integrazioni con gestionali è un altro mondo.',
                    "Chi ci lavora. Un freelance senior, un'agenzia di 20 persone e una software house enterprise hanno strutture di costo diverse, e si vedono nel preventivo.",
                ],
            },
            { type: 'h2', text: 'Sito vetrina: 1.500€ — 8.000€' },
            {
                type: 'p',
                text: 'Per “sito vetrina” intendiamo un sito di 5-10 pagine che presenta brand, servizi e contatti — il classico biglietto da visita digitale per uno studio professionale, un\'attività locale o un brand emergente. Sotto i 1.500€ trovi quasi sempre lavoro su template generici di Wix/Squarespace; sopra gli 8.000€ il sito comincia ad avere caratteristiche da progetto custom serio.',
            },
            { type: 'h3', text: 'Cosa è incluso in un sito vetrina ben fatto' },
            {
                type: 'ul',
                items: [
                    'Design su misura (almeno parzialmente) e responsive da mobile a desktop.',
                    'Hosting per il primo anno e setup del dominio.',
                    'CMS per aggiornare i contenuti senza chiamare lo sviluppatore.',
                    'SEO tecnica di base (meta tag, sitemap, structured data).',
                    'Analytics e cookie banner conformi GDPR.',
                    'Form di contatto funzionante con email di notifica.',
                ],
            },
            { type: 'h3', text: 'Quando preoccuparsi' },
            {
                type: 'p',
                text: "Sotto i 1.000€ è praticamente impossibile avere lavoro custom serio. Sopra i 12.000€ per un sito vetrina puro stai pagando troppo o stai comprando qualcosa che non è solo un sito vetrina (es. integrazioni custom, multilingua complesso, design system completo).",
            },
            { type: 'h2', text: 'E-commerce: 4.000€ — 25.000€' },
            {
                type: 'p',
                text: "Il range è ampio perché 'e-commerce' significa cose diverse. Un negozio Shopify chiavi in mano per un piccolo brand artigiano si fa con 4.000-7.000€. Un e-commerce custom su Next.js con headless CMS, integrazioni con gestionale e flussi di checkout particolari parte da 12.000€ e arriva facilmente sopra i 25.000€.",
            },
            { type: 'h3', text: 'Voci di costo tipiche' },
            {
                type: 'ul',
                items: [
                    'Setup piattaforma e configurazione tema (Shopify) o sviluppo frontend custom (headless).',
                    'Schede prodotto: design, fotografia se non già disponibile, microcopy.',
                    'Checkout e integrazione metodi di pagamento (Stripe, PayPal, Apple Pay).',
                    'Configurazione spedizioni, IVA e listini.',
                    'Email transazionali (conferma ordine, spedizione, recupero carrelli).',
                    'Tracking conversioni (GA4, Meta Pixel, Google Shopping).',
                ],
            },
            {
                type: 'callout',
                title: 'Attenzione alle commissioni nascoste',
                text: 'Shopify ha commissioni di transazione se non usi Shopify Payments. Su volumi importanti possono pesare quanto il costo di sviluppo iniziale. Considerale nel calcolo del costo totale del primo anno.',
            },
            { type: 'h2', text: 'Web application: 10.000€ — 80.000€+' },
            {
                type: 'p',
                text: 'Una web application è uno strumento di lavoro: dashboard, gestionale interno, MVP per startup, piattaforma SaaS. Il range è enorme perché qui si parla di prodotti software veri, con backend, database, autenticazione, ruoli, logiche di business, test automatici e via dicendo.',
            },
            { type: 'h3', text: 'MVP per startup' },
            {
                type: 'p',
                text: "Un MVP serio per una startup costa tipicamente 10.000-20.000€ per essere funzionante con i flussi essenziali. Tutto quello che ti propongono sotto i 5.000€ chiamandolo MVP è quasi sempre una landing con un form: utile per misurare interesse, non sufficiente per validare un'idea di prodotto.",
            },
            { type: 'h3', text: "Web app per uso interno" },
            {
                type: 'p',
                text: "Sostituire fogli Excel e processi manuali con una web app dedicata costa 15.000-40.000€ per un progetto di scala media (gestionale per studio, CRM custom, dashboard di reporting). Il ritorno arriva di solito nel giro di 12 mesi se l'app riduce davvero il tempo speso su attività ripetitive.",
            },
            { type: 'h2', text: 'Costi ricorrenti che spesso si dimenticano' },
            {
                type: 'p',
                text: 'Il prezzo del progetto è solo una parte del costo totale di possesso. Questi sono i costi annuali che incontri quasi sempre, indipendentemente dallo stack:',
            },
            {
                type: 'ul',
                items: [
                    'Dominio: 10-15€/anno per .it o .com.',
                    'Hosting/serverless: da 0€ (Vercel hobby) a 50-200€/mese per progetti seri.',
                    'CMS: da 0€ (open source) a 50-300€/mese (Sanity, Contentful business).',
                    'Email transazionali: 0-50€/mese per la maggior parte dei progetti.',
                    'Manutenzione: 100-500€/mese se vuoi qualcuno che risponde quando qualcosa si rompe.',
                ],
            },
            { type: 'h2', text: 'Come riconoscere un preventivo serio' },
            {
                type: 'p',
                text: 'Un preventivo professionale ha alcune caratteristiche difficili da imitare. Più te ne mancano, più il rischio di sorprese in corso d\'opera aumenta:',
            },
            {
                type: 'ul',
                items: [
                    'Suddivisione in voci con ore o giornate per ognuna, non un prezzo unico monolitico.',
                    'Lista esplicita di cosa è escluso (es. fotografia, copywriting, marketing).',
                    'Clausole su revisioni: quante sono comprese, cosa succede oltre.',
                    'Tempistiche realistiche con dipendenze chiare ("contenuti finali entro la settimana 3").',
                    'Termini di pagamento ragionevoli: tipicamente 30-50% all\'inizio, il resto a milestone.',
                    'Riferimenti verificabili: progetti già fatti, recensioni, persone contattabili.',
                ],
            },
            { type: 'h2', text: 'Quando spendere di più ha senso' },
            {
                type: 'p',
                text: 'A parità di funzionalità, un sito da 8.000€ può sembrare uguale a uno da 4.000€. La differenza si sente nel medio periodo: tempi di caricamento, posizionamento Google, facilità di evolvere il sito tra un anno, costi di manutenzione. Un sito ben fatto dura cinque anni; uno mediocre va rifatto tra dodici mesi, spesso da capo. Il calcolo va fatto su tre anni, non sul prezzo iniziale.',
            },
            {
                type: 'callout',
                title: 'TL;DR',
                text: 'Sito vetrina: 1.500-8.000€. E-commerce: 4.000-25.000€. Web app: 10.000-80.000€+. Aggiungi 100-500€/mese di costi ricorrenti. Diffida da preventivi monolitici, da chi promette tempi impossibili e da chi non ti sa dire cosa è escluso.',
            },
        ],
    },
    {
        slug: 'react-vs-wordpress',
        title: 'React vs WordPress: quale scegliere per il tuo prossimo sito?',
        seoTitle: 'React vs WordPress — Quale Scegliere nel 2026 | PIONIO',
        seoDescription:
            'React o WordPress per il tuo prossimo sito? Differenze reali su performance, SEO, costi, manutenzione e scalabilità. Una guida senza partigianerie per scegliere bene.',
        excerpt:
            'Le differenze reali tra React e WordPress su performance, SEO, costi e manutenzione. Una guida senza partigianerie per scegliere bene in base al tuo progetto.',
        keywords: [
            'react vs wordpress',
            'wordpress o react',
            'sito wordpress o custom',
            'differenze react wordpress',
            'jamstack vs wordpress',
        ],
        datePublished: '2026-03-08',
        dateModified: '2026-05-03',
        readingMinutes: 8,
        category: 'Tecnologia',
        sections: [
            {
                type: 'p',
                text: 'È una delle domande più comuni che ricevo. La risposta breve è: dipende dal progetto, e nessuna delle due è oggettivamente meglio. La risposta lunga è che React e WordPress risolvono problemi diversi, e confonderli ha conseguenze concrete sul costo del sito nel medio periodo.',
            },
            { type: 'h2', text: 'Cosa sono davvero, in due paragrafi' },
            {
                type: 'p',
                text: 'WordPress è un CMS — un sistema per gestire contenuti — nato nel 2003 e cresciuto fino a coprire circa il 43% di tutti i siti web esistenti. È PHP server-side, ha migliaia di temi e plugin, e permette a chi non sa programmare di costruire siti più o meno complessi assemblando pezzi.',
            },
            {
                type: 'p',
                text: 'React è una libreria JavaScript per costruire interfacce utente, sviluppata da Meta. Non è un CMS, non genera siti da solo: serve come base tecnica per costruire frontend custom, spesso accoppiata a framework come Next.js o Vite e a un backend o CMS separato (Sanity, Contentful, Strapi, Supabase).',
            },
            { type: 'h2', text: 'Performance: vince React (quasi sempre)' },
            {
                type: 'p',
                text: "Un sito React/Next.js fatto bene ha tempi di caricamento sotto i due secondi su mobile, immagini servite in formati moderni (AVIF/WebP), JavaScript splittato per pagina. Un sito WordPress medio è invece appesantito da temi che caricano librerie inutili e plugin che sommano richieste su richieste. Esistono WordPress velocissimi, ma richiedono lavoro tecnico mirato — non sono il default.",
            },
            { type: 'h3', text: 'Conseguenza concreta sulla SEO' },
            {
                type: 'p',
                text: 'Google usa i Core Web Vitals come fattore di ranking. Un sito lento perde posizioni anche con contenuti ottimi. Su questo terreno React parte avvantaggiato perché generi codice solo quando ti serve, mentre WordPress parte già con un peso fisso da gestire.',
            },
            { type: 'h2', text: 'Costo iniziale: vince WordPress' },
            {
                type: 'p',
                text: 'Un sito WordPress base parte da 1.000-2.000€ con un tema preso. Un sito custom in React parte tipicamente da 3.000-4.000€ perché tutto va costruito su misura. Se hai bisogno di un sito vetrina semplice e il tuo budget è sotto i 2.500€, WordPress è quasi sempre la scelta sensata.',
            },
            { type: 'h2', text: 'Costo nel tempo: dipende' },
            {
                type: 'p',
                text: 'WordPress richiede aggiornamenti frequenti: il core, i temi, i plugin. Ogni aggiornamento può rompere qualcosa, soprattutto se hai accumulato molti plugin nel tempo. Un sito custom in React richiede meno manutenzione ordinaria, ma quando ne ha bisogno serve uno sviluppatore.',
            },
            {
                type: 'callout',
                title: 'Regola pratica',
                text: 'Conta più di 15 plugin attivi su un WordPress? Il sito è già fragile. Prima o poi qualcosa si romperà a un aggiornamento e il costo di sistemarlo supererà quello che hai risparmiato in partenza.',
            },
            { type: 'h2', text: 'Flessibilità di design: vince React' },
            {
                type: 'p',
                text: 'Con un tema WordPress sei vincolato alle scelte del tema o paghi uno sviluppatore per modificarlo (costo non sempre minore di partire da zero). In React puoi disegnare e implementare esattamente quello che ti serve, senza compromessi. Per progetti dove il design è un differenziante, React vince a mani basse.',
            },
            { type: 'h2', text: 'Gestione contenuti: dipende da chi pubblica' },
            {
                type: 'p',
                text: "WordPress ha un editor maturo che persone non tecniche imparano in mezza giornata. I CMS moderni come Sanity, Contentful o Strapi sono altrettanto user-friendly, ma richiedono un setup iniziale. Se l'editor è uno solo e tecnicamente curioso, qualsiasi soluzione funziona; se sono dieci redattori che pubblicano ogni giorno, una user experience editoriale curata fa una differenza enorme.",
            },
            { type: 'h2', text: 'Sicurezza' },
            {
                type: 'p',
                text: "WordPress è il CMS più usato al mondo, quindi anche il bersaglio più frequente. Il 96% delle vulnerabilità WordPress arriva dai plugin. Un sito React/Next.js renderizzato staticamente ha una superficie di attacco minuscola: non c'è nemmeno un database accessibile dall'esterno se il sito è semplicemente HTML statico generato al build.",
            },
            { type: 'h2', text: 'Quando scegliere WordPress' },
            {
                type: 'ul',
                items: [
                    'Hai un budget limitato (sotto 2.500€) per un sito vetrina semplice.',
                    'Hai bisogno di un blog con redattori che pubblicano spesso e non vuoi formazione su un nuovo CMS.',
                    'Esiste già un plugin che risolve esattamente il tuo problema (es. WooCommerce per piccolo e-commerce).',
                    'Sai che il sito non crescerà molto e ti basta che funzioni.',
                ],
            },
            { type: 'h2', text: 'Quando scegliere React (o Next.js)' },
            {
                type: 'ul',
                items: [
                    "Il sito è strategico per il business e investirai nel medio periodo.",
                    "Hai bisogno di un'esperienza utente non replicabile con un tema generico.",
                    'Le performance e la SEO tecnica sono priorità reali, non solo dichiarate.',
                    'Stai costruendo un\'applicazione web, non un sito di contenuti.',
                    'Il tuo brand vuole distinguersi dalla media — e oggi la media è WordPress.',
                ],
            },
            { type: 'h2', text: 'Una via di mezzo: WordPress headless' },
            {
                type: 'p',
                text: "Esiste un'opzione meno conosciuta che combina i due mondi: usare WordPress come backend per la gestione contenuti e React/Next.js come frontend. Si chiama 'headless WordPress' e ha senso quando hai redattori esperti su WordPress ma vuoi le performance di un frontend moderno. Costa più di un WordPress puro ma meno di un sistema completamente custom.",
            },
            {
                type: 'callout',
                title: 'TL;DR',
                text: "WordPress per progetti semplici, budget piccoli, redazione attiva. React per progetti strategici, design su misura, performance e SEO come priorità reali. Il 70% dei siti italiani potrebbe stare su WordPress, ma il 70% di chi sceglie WordPress lo fa perché 'l'ha sempre fatto', non perché è la scelta giusta.",
            },
        ],
    },
    {
        slug: 'come-scegliere-web-designer-freelance',
        title: 'Come scegliere un web designer freelance: 9 segnali da osservare',
        seoTitle: 'Come Scegliere un Web Designer Freelance Affidabile | PIONIO',
        seoDescription:
            'Scegliere un web designer freelance senza pentirsene: 9 segnali concreti per valutare portfolio, processo, contratto e prezzi. Domande da fare prima di firmare.',
        excerpt:
            'Nove segnali concreti per valutare un web designer freelance prima di firmare: portfolio, processo, contratto e prezzi. Domande chiave da fare in fase di valutazione.',
        keywords: [
            'come scegliere web designer freelance',
            'scegliere web designer',
            'web designer affidabile',
            'come trovare un web designer',
            'valutare freelance web',
        ],
        datePublished: '2026-02-22',
        dateModified: '2026-05-03',
        readingMinutes: 7,
        category: 'Guida',
        sections: [
            {
                type: 'p',
                text: "Scegliere un web designer freelance è una di quelle decisioni che si pagano per anni. Una scelta sbagliata significa rifare il sito dopo 12 mesi, perdere posizionamento Google, gestire malumori interni. Una scelta giusta significa un partner che capisce il tuo brand e ti accompagna nell'evoluzione del prodotto digitale. Questi sono i nove segnali che osservo io stesso quando devo capire se collaborare con qualcuno.",
            },
            { type: 'h2', text: '1. Il portfolio mostra progetti, non solo immagini' },
            {
                type: 'p',
                text: 'Un portfolio fatto bene non è una galleria di screenshot belli. È una serie di case study che spiegano il problema del cliente, il processo, le scelte fatte e il risultato. Se il portfolio è solo immagini "pulite" senza contesto, manca la dimostrazione di come il designer ragiona. E ragionare è il 70% del lavoro.',
            },
            { type: 'h2', text: '2. I siti live esistono e funzionano' },
            {
                type: 'p',
                text: "Verifica che i siti del portfolio siano davvero online. Aprili da telefono, controlla i tempi di caricamento, vedi come si comportano. Tre cose da osservare: il sito è veloce? Funziona bene su mobile? Il design del portfolio è coerente con quello del sito del designer stesso? L'ultima è una cartina di tornasole: chi non sa rappresentare bene se stesso difficilmente farà miracoli per te.",
            },
            { type: 'h2', text: '3. C\'è un processo, non solo "fammi vedere cosa hai in mente"' },
            {
                type: 'p',
                text: 'Un freelance esperto ti spiega come lavora prima ancora che tu chieda. Discovery, wireframe, design, sviluppo, lancio. Ogni fase con tempi e deliverable. Se la prima risposta è "mandami il logo e i contenuti e ti faccio vedere", il rischio di andare avanti per indovinello è alto. Un buon processo non è burocrazia: è la garanzia che entrambi sapete dove state andando.',
            },
            { type: 'h2', text: '4. Sa dire di no' },
            {
                type: 'p',
                text: "Un professionista che dice sì a tutto è il peggior partner possibile. 'Posso aggiungere quel modulo?' 'Si può fare in metà del tempo?' 'Si può levare quella voce di costo?' Se la risposta è sempre sì, qualcosa non torna. Un buon freelance ti spiega quando una richiesta non è realistica, perché, e ti propone alternative. Ti rallenta meno nel breve, ma ti salva nel medio.",
            },
            { type: 'h2', text: '5. Parla di SEO e performance senza chiedertelo tu' },
            {
                type: 'p',
                text: "Nel 2026, un sito non ottimizzato per Google e per Core Web Vitals è un sito con metà del valore tagliato via. Se il designer non parla di SEO tecnica, structured data, performance e accessibilità nelle prime conversazioni, sta lavorando con la mentalità del 2015. Il rischio è che dopo sei mesi tu debba assumere un'altra persona per sistemare quello che doveva essere fatto da subito.",
            },
            { type: 'h2', text: '6. Il preventivo è dettagliato' },
            {
                type: 'p',
                text: 'Un preventivo professionale ha voci, quantità, prezzi unitari ed esclusioni esplicite. Non è un foglio Word con "Sito web — 5.000€". Se il preventivo è generico, lo è anche la pianificazione, e in corso d\'opera diventeranno discussioni infinite su cosa era previsto e cosa no.',
            },
            { type: 'h2', text: '7. Comunica come un adulto' },
            {
                type: 'p',
                text: "Risponde alle email entro 24-48 ore lavorative. Manda update senza che tu debba inseguirlo. Riconosce quando è in ritardo invece di sparire. Sembra ovvio: non lo è. Buona parte dei progetti freelance fallisce per problemi di comunicazione, non per incapacità tecnica. Le prime due settimane di interazione sono predittive: come va in fase di vendita, va anche in fase di delivery (ma peggio, perché in delivery c'è meno motivazione a essere brillanti).",
            },
            { type: 'h2', text: '8. Ha un contratto vero' },
            {
                type: 'p',
                text: 'Un contratto chiaro protegge entrambi. Definisce cosa viene consegnato, in che tempi, con quanti cicli di revisione, a quali condizioni si interrompe il progetto, chi possiede il codice e i file. Lavorare senza contratto significa fidarsi della parola — e quando le cose vanno male, la parola pesa zero in tribunale.',
            },
            { type: 'h2', text: '9. Pensa al dopo, non solo al lancio' },
            {
                type: 'p',
                text: "Un sito non è finito al lancio. Va aggiornato, evoluto, ottimizzato sui dati raccolti. Un freelance serio ti propone già durante la vendita un piano di manutenzione, ti spiega come aggiornare i contenuti, ti consegna documentazione utile. Se l'unica cosa che vuole è incassare e sparire, lo capirai un mese dopo il lancio quando avrai bisogno di una piccola modifica e nessuno risponderà.",
            },
            { type: 'h2', text: 'Domande da fare prima di firmare' },
            {
                type: 'ul',
                items: [
                    'Chi possiede il codice e gli asset una volta che il sito è online?',
                    'Cosa succede se mi trovo male e voglio interrompere?',
                    'Quanti cicli di revisione sono inclusi e cosa è considerato "revisione"?',
                    'Chi gestisce hosting, dominio e backup dopo il lancio?',
                    'Posso parlare con un cliente con cui hai lavorato negli ultimi 12 mesi?',
                    "Quali sono i limiti del progetto: cosa NON include il preventivo?",
                ],
            },
            { type: 'h2', text: 'Bandiere rosse da non ignorare' },
            {
                type: 'ul',
                items: [
                    'Promette di farti arrivare primo su Google in due settimane.',
                    'Cita prezzi al ribasso per chiudere e poi alza in corso d\'opera con "extra" continui.',
                    "Non ha mai progetti suoi visibili online (lavora solo come 'fantasma' per altre agenzie).",
                    'Sparisce per giorni durante la fase commerciale.',
                    "Insiste su pagamento tutto in anticipo o in nero.",
                    "Non vuole firmare un contratto, 'ci fidiamo'.",
                ],
            },
            {
                type: 'callout',
                title: 'TL;DR',
                text: "Portfolio con case study, siti live veri, processo chiaro, sa dire di no, parla di SEO e performance, preventivo dettagliato, comunicazione adulta, contratto vero, pensa al dopo. Se mancano più di tre di queste cose, cerca altrove — il sito è troppo importante per fidarsi e basta.",
            },
        ],
    },
    {
        slug: 'perche-investire-in-un-sito-web-professionale',
        title: 'Perché investire in un sito web professionale (e non in un fai-da-te)',
        seoTitle: 'Perché Investire in un Sito Web Professionale nel 2026 | PIONIO',
        seoDescription:
            'Quanto costa davvero un sito fai-da-te in opportunità mancate? 6 motivi concreti per investire in un sito web professionale e quando invece il fai-da-te ha senso.',
        excerpt:
            "Quanto costa un sito fai-da-te in opportunità mancate? Sei motivi concreti per investire in un sito professionale, e i due casi in cui invece il fai-da-te ha senso davvero.",
        keywords: [
            'investire in un sito web',
            'perché un sito web professionale',
            'sito fai da te o professionale',
            'valore sito web professionale',
            'roi sito web',
        ],
        datePublished: '2026-01-30',
        dateModified: '2026-05-03',
        readingMinutes: 7,
        category: 'Strategia',
        sections: [
            {
                type: 'p',
                text: "Costruire un sito su Wix o Squarespace costa qualche centinaio di euro l'anno e un weekend di lavoro. Un sito professionale costa migliaia di euro e settimane. Vista così, sembra che il fai-da-te vinca. Ma il prezzo del sito è solo una variabile dell'equazione. L'altra è quanto ti costa, ogni mese, avere un sito che non funziona come dovrebbe — e questa variabile la maggior parte delle aziende non la calcola.",
            },
            { type: 'h2', text: '1. Il primo cliente costa più del sito' },
            {
                type: 'p',
                text: 'Per un\'attività di servizi B2B, acquisire un cliente costa in media 200-2.000€ tra ads, tempo speso in vendita, materiali. Un sito che converte male — perché poco chiaro, lento o fragile — fa perdere clienti già nel funnel. Se un sito professionale ti porta solo due clienti in più all\'anno rispetto a uno mediocre, l\'investimento extra è ripagato.',
            },
            { type: 'h2', text: '2. Google premia chi fa le cose per bene' },
            {
                type: 'p',
                text: "Un sito fatto su template generici è quasi sempre lento, con codice gonfio e structured data assenti. Google penalizza queste cose con posizioni più basse, e posizioni più basse significano meno traffico organico. Sul lungo periodo, un sito professionale ben ottimizzato porta un flusso continuo di visitatori 'gratuiti', mentre uno mediocre dipende interamente da quanto spendi in ads.",
            },
            { type: 'h2', text: '3. Il design comunica posizionamento' },
            {
                type: 'p',
                text: "Quando un cliente atterra sul tuo sito, in tre secondi decide se sei premium o low-cost. Non lo fa leggendo i tuoi prezzi: lo fa percependo la qualità del design. Tipografia, spazio, fotografia, microinterazioni. Sono tutti segnali. Un sito amatoriale comunica 'low cost', anche se vendi servizi premium — e questo abbassa il prezzo che i clienti sono disposti a pagare.",
            },
            { type: 'h2', text: '4. La velocità si traduce in conversioni' },
            {
                type: 'p',
                text: "Studi di Google e Cloudflare mostrano che ogni secondo in più di caricamento riduce le conversioni del 7-20%. Un sito veloce porta più contatti, più vendite, più tempo speso sulle pagine. Un sito lento è una perdita silenziosa che non vedi nei conti, ma c'è. Costruire un sito veloce richiede competenze specifiche che difficilmente trovi nei builder fai-da-te.",
            },
            { type: 'h2', text: '5. La sicurezza non è opzionale' },
            {
                type: 'p',
                text: "I builder generici si difendono mediamente bene, ma quando devi raccogliere dati dei clienti (form di contatto, e-commerce, area riservata) il discorso cambia. Un sito professionale gestisce GDPR, certificati, validazione input e protezioni anti-spam come parte del processo. Un sito fai-da-te lascia spesso buchi che diventano problemi quando un attaccante li trova — e quando ti accorgi, è tardi.",
            },
            { type: 'h2', text: '6. La scalabilità futura' },
            {
                type: 'p',
                text: "Tra dodici mesi vorrai aggiungere una sezione blog, un'area clienti, un'integrazione con il gestionale, un nuovo modulo di prenotazione. Su un builder fai-da-te ognuna di queste cose è un compromesso tra quello che ti serve e quello che il sistema permette. Su un sito professionale è una feature che si aggiunge, perché il codice è tuo e si evolve con te.",
            },
            { type: 'h2', text: 'Quando il fai-da-te ha senso davvero' },
            {
                type: 'p',
                text: "Non sempre il sito professionale è la risposta giusta. Ci sono almeno due casi in cui il fai-da-te è la scelta migliore.",
            },
            { type: 'h3', text: 'Caso 1: stai validando un\'idea' },
            {
                type: 'p',
                text: 'Se stai testando se un servizio o un prodotto interessa al mercato, un sito Wix o un Notion pubblico bastano. Spendere 5.000€ per un sito custom prima di sapere se il prodotto vende è un pessimo investimento. Una landing veloce con un form, GA4 e qualche annuncio sono più che sufficienti per le prime sei-otto settimane di test.',
            },
            { type: 'h3', text: 'Caso 2: il sito non porta clienti' },
            {
                type: 'p',
                text: "Se la tua attività vive di passaparola e i nuovi clienti arrivano tutti tramite referral, il sito è un biglietto da visita ma non un canale di acquisizione. In questo caso un sito decoroso fai-da-te può bastare: il ROI di un sito professionale sarebbe basso perché il sito non è il punto di contatto principale del tuo business.",
            },
            { type: 'h2', text: 'Come capire dove ti trovi' },
            {
                type: 'p',
                text: "Tre domande pratiche per decidere se ha senso investire in un sito professionale:",
            },
            {
                type: 'ol',
                items: [
                    'Quanti contatti commerciali ti arrivano dal sito ogni mese? Se sono zero o pochi, il sito attuale sta lasciando soldi sul tavolo.',
                    'Quanto spendi in advertising? Se hai budget pubblicitario, ogni euro speso atterra su un sito che converte o brucia. La qualità del sito moltiplica o divide il ROI delle ads.',
                    'Stai pianificando una crescita nei prossimi 24 mesi? Se sì, il sito attuale ti seguirà o ti rallenterà? Costruire un sito serio prima della crescita costa meno che farlo durante.',
                ],
            },
            {
                type: 'callout',
                title: 'TL;DR',
                text: "Un sito professionale costa di più all'inizio ma genera valore in conversioni, posizionamento Google, percezione del brand e scalabilità nel tempo. Il fai-da-te ha senso solo se stai validando un'idea o se il sito non è davvero un canale di acquisizione.",
            },
        ],
    },
    {
        slug: 'guida-seo-piccole-imprese',
        title: 'Guida SEO per piccole imprese: 10 azioni concrete per il 2026',
        seoTitle: 'Guida SEO per Piccole Imprese 2026 — 10 Azioni Concrete | PIONIO',
        seoDescription:
            'Guida SEO per piccole imprese italiane: 10 azioni concrete che puoi mettere in pratica subito per posizionarti su Google senza investire migliaia di euro in agenzie.',
        excerpt:
            'Dieci azioni SEO concrete che una piccola impresa italiana può mettere in pratica subito per migliorare il posizionamento Google senza spendere migliaia di euro in agenzie.',
        keywords: [
            'guida seo piccole imprese',
            'seo per pmi',
            'seo per piccole aziende',
            'seo locale',
            'come migliorare seo',
            'ottimizzare seo google',
        ],
        datePublished: '2026-01-15',
        dateModified: '2026-05-03',
        readingMinutes: 10,
        category: 'SEO',
        sections: [
            {
                type: 'p',
                text: "La SEO sembra una di quelle cose riservate a grandi aziende con budget a sei zeri. In realtà la maggior parte delle vittorie SEO per una piccola impresa sono concrete, alla portata di chiunque abbia accesso al sito e qualche ora a settimana. Questa guida raccoglie le dieci azioni che hanno l'impatto migliore in rapporto al tempo richiesto, in ordine di priorità.",
            },
            { type: 'h2', text: '1. Configura Google Search Console' },
            {
                type: 'p',
                text: "Search Console è gratis, è ufficiale di Google e ti dice esattamente cosa pensa Google del tuo sito: per quali parole chiave appari, quante volte clicca la gente, quali pagine sono indicizzate, quali errori tecnici ha trovato. Senza Search Console, fai SEO al buio. Verifica il tuo dominio, aspetta una settimana di dati e parti da lì. Tempo richiesto: 30 minuti per la verifica.",
            },
            { type: 'h2', text: '2. Scrivi title e description per ogni pagina' },
            {
                type: 'p',
                text: 'Title (50-60 caratteri) e meta description (140-160 caratteri) sono ciò che Google mostra nei risultati di ricerca. Sono l\'unica cosa che il visitatore vede prima di cliccare. Ogni pagina deve avere title e description unici, scritti con la parola chiave principale all\'inizio del title e un beneficio chiaro nella description.',
            },
            { type: 'h3', text: 'Esempio concreto' },
            {
                type: 'p',
                text: 'Sbagliato: title "Home", description vuota. Giusto: title "Studio dentistico a Modena — visite, ortodonzia e implantologia", description "Studio dentistico a Modena specializzato in ortodonzia, implantologia e cura dei bambini. Prima visita gratuita, prenotazioni online."',
            },
            { type: 'h2', text: '3. Crea una scheda Google Business Profile' },
            {
                type: 'p',
                text: "Se hai un'attività locale, Google Business Profile è la singola azione SEO con il ritorno più alto in assoluto. Ti fa apparire nelle mappe quando qualcuno cerca il tuo servizio + città, gestisce le recensioni, mostra orari e foto. È gratis, ti porta clienti reali e in molti settori vince anche su siti meglio posizionati nei risultati classici.",
            },
            { type: 'h2', text: '4. Velocità del sito sotto i due secondi' },
            {
                type: 'p',
                text: "Apri PageSpeed Insights, inserisci il tuo dominio, controlla il punteggio mobile. Se è sotto 70, hai un problema. Le tre cose che lo migliorano il 90% delle volte sono: comprimere immagini in formato WebP o AVIF, eliminare plugin/script inutilizzati, scegliere un hosting decente (Vercel, Netlify, Cloudflare Pages, oppure un VPS serio). Vale 1 ora di lavoro per il 30% in più di conversioni dal mobile.",
            },
            { type: 'h2', text: '5. Structured data (JSON-LD)' },
            {
                type: 'p',
                text: "Lo structured data è codice nascosto nelle pagine che dice a Google: 'questo è un articolo, questo è un prodotto, questa è la mia attività con questo indirizzo'. Aiuta Google a mostrare snippet ricchi (recensioni, prezzo, orari) direttamente nei risultati di ricerca. Per piccole imprese, le tipologie più utili sono LocalBusiness, Article, Product, FAQPage e BreadcrumbList. Esistono generatori online gratuiti per generarli; chiedi a chi gestisce il sito di inserirli.",
            },
            { type: 'h2', text: '6. Crea contenuti che rispondono a domande reali' },
            {
                type: 'p',
                text: "La SEO moderna non è 'mettere parole chiave dappertutto'. È capire quali domande si fanno i tuoi potenziali clienti su Google e rispondere in modo migliore della concorrenza. Strumenti come AnswerThePublic, le ricerche correlate di Google e 'People Also Ask' ti danno gratis un elenco infinito di domande da trasformare in articoli o pagine FAQ.",
            },
            { type: 'h3', text: 'Esempio per uno studio commercialista' },
            {
                type: 'ul',
                items: [
                    "'Quanto costa un commercialista per partita IVA forfettario?'",
                    "'Quando passare da regime forfettario a ordinario?'",
                    "'Come fatturare a un cliente estero da partita IVA?'",
                    "Sono tutte domande con migliaia di ricerche al mese, poca competizione di qualità e alta intenzione commerciale. Un articolo serio per ognuna porta clienti pronti a pagare.",
                ],
            },
            { type: 'h2', text: '7. Linking interno tra le pagine' },
            {
                type: 'p',
                text: "Quando aggiungi un articolo, collegalo dalle pagine pertinenti del sito. Quando crei una pagina servizio, linkala dalla home. Il linking interno aiuta Google a capire quali sono le tue pagine importanti e distribuisce 'autorità' tra di loro. È gratis, richiede 5 minuti per pagina, e ha un impatto sorprendentemente alto sul posizionamento.",
            },
            { type: 'h2', text: '8. URL puliti e leggibili' },
            {
                type: 'p',
                text: 'Un URL pulito è del tipo /servizi/web-design. Un URL sporco è /index.php?page=12&id=4521. Google preferisce il primo perché è leggibile, e anche gli utenti lo capiscono. Se stai per rifare il sito o per pubblicare nuove pagine, scegli URL brevi, in italiano, con la parola chiave principale e nessuna data.',
            },
            { type: 'h2', text: '9. Recensioni Google reali' },
            {
                type: 'p',
                text: 'Le recensioni Google sono uno dei segnali di ranking più forti per il SEO locale, oltre che un acceleratore enorme di conversioni. Chiedi ogni cliente soddisfatto di lasciarne una con un link diretto (Google ti permette di generare un link di richiesta). Rispondi a tutte, soprattutto alle negative — Google vede un\'attività che gestisce le recensioni come un\'attività viva e affidabile.',
            },
            { type: 'h2', text: '10. Backlink da fonti reali' },
            {
                type: 'p',
                text: "I backlink — link verso il tuo sito da altri siti — restano uno dei fattori SEO più importanti. Per una piccola impresa, i backlink che valgono sono pochi e di qualità: la camera di commercio, l'associazione di categoria, il giornale locale che parla di te, i fornitori che ti citano sul loro sito. Non comprare link su 'pacchetti SEO': sono un boomerang che prima o poi Google penalizza.",
            },
            { type: 'h2', text: 'Cosa NON fare' },
            {
                type: 'p',
                text: "Tre pratiche che vedo ancora troppo spesso, e che fanno solo perdere tempo o, peggio, danneggiano il sito:",
            },
            {
                type: 'ul',
                items: [
                    'Riempire le pagine di parole chiave (keyword stuffing). Google lo riconosce e penalizza.',
                    'Comprare link da PBN o pacchetti su Fiverr. Funziona per qualche mese, poi crolla.',
                    'Pubblicare articoli generati con AI senza revisione e ottimizzazione. Google ha modi sempre migliori per riconoscerli, e contenuto generico non si posiziona.',
                ],
            },
            { type: 'h2', text: 'Tempi realistici' },
            {
                type: 'p',
                text: 'Le ottimizzazioni tecniche (1, 2, 4, 5, 8) danno effetti in 4-8 settimane. La parte di contenuti e link (6, 7, 9, 10) richiede mesi: i primi risultati si vedono dopo 3-6 mesi, i risultati maturi dopo 12 mesi di lavoro costante. Chi promette il contrario è in cattiva fede o non ha mai fatto SEO seriamente.',
            },
            {
                type: 'callout',
                title: 'TL;DR',
                text: 'Search Console + title/description curati + Google Business Profile + sito veloce + structured data + contenuti che rispondono a domande + linking interno + URL puliti + recensioni + backlink reali. Niente magia, niente trucchi: solo lavoro fatto bene su un orizzonte di 6-12 mesi.',
            },
        ],
    },
];

export function getPost(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug);
}
