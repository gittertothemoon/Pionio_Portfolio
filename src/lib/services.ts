export type Service = {
    slug: string;
    title: string;
    h1: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    intro: string;
    paragraphs: string[];
    includes: { title: string; description: string }[];
    process: { step: string; title: string; description: string }[];
    tech: string[];
    faq: { q: string; a: string }[];
    relatedProjectSlugs: string[];
    pricingNote: string;
    ctaTitle: string;
    ctaCopy: string;
};

export const services: Service[] = [
    {
        slug: 'web-design',
        title: 'Web Design',
        h1: 'Web design su misura per brand che non vogliono passare inosservati',
        seoTitle: 'Web Design Freelance Italia — Siti Web su Misura | PIONIO',
        seoDescription:
            'Web design freelance in Italia: siti web su misura per brand, studi e startup. Identità visiva, layout originali, performance e SEO incluse. Richiedi un preventivo.',
        keywords: [
            'web design',
            'web designer freelance italia',
            'web designer italiano',
            'sito web su misura',
            'design sito web',
            'agenzia web design alternativa',
            'web design Bologna',
        ],
        intro:
            "Il web design non è scegliere un template e cambiare i colori. È costruire un'esperienza visiva coerente con il posizionamento del brand, leggibile su qualsiasi dispositivo e capace di portare risultati misurabili.",
        paragraphs: [
            "Lavoro come web designer freelance in Italia con clienti che hanno bisogno di un sito davvero su misura: brand che vogliono distinguersi, studi professionali che cercano credibilità, startup che devono validare un'idea e farsi prendere sul serio. Ogni progetto parte da una fase di studio del posizionamento e si traduce in un layout originale, mai un copia-e-incolla di un tema.",
            "La differenza tra un sito web ben disegnato e uno mediocre la si vede nei dettagli: la gerarchia tipografica, lo spazio tra gli elementi, la coerenza dei colori, il modo in cui il sito si comporta quando ci passi il mouse sopra o lo apri da telefono. Tutti questi dettagli, sommati, sono ciò che fa percepire il tuo brand come curato o come amatoriale.",
            "Disegno con tre vincoli sempre presenti: deve essere bello, deve caricare velocemente, deve essere indicizzabile da Google. Niente slider pesantissimi che rallentano il sito, niente animazioni gratuite che distraggono dal messaggio. Solo design al servizio della comunicazione.",
        ],
        includes: [
            {
                title: 'Identità visiva digitale',
                description:
                    'Sistema di colori, tipografia, iconografia e linguaggio visivo coerenti con il tuo brand, applicati a tutto il sito.',
            },
            {
                title: 'Layout originale',
                description:
                    'Wireframe e design su misura per i contenuti che hai davvero, non per quelli del template di turno.',
            },
            {
                title: 'Responsive da mobile a desktop',
                description:
                    'Ogni pagina pensata prima per smartphone e poi adattata, perché la maggior parte dei tuoi visitatori arriva da lì.',
            },
            {
                title: 'Microinterazioni curate',
                description:
                    'Hover, transizioni e animazioni leggere che rendono il sito vivo senza appesantirlo.',
            },
            {
                title: 'Accessibilità di base',
                description:
                    'Contrasti, dimensioni dei testi e struttura semantica conformi alle linee guida WCAG.',
            },
            {
                title: 'Consegna pronta per lo sviluppo',
                description:
                    'File Figma organizzati o sito direttamente sviluppato in codice — a seconda di cosa serve al tuo team.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Discovery',
                description:
                    'Una call lunga e mirata per capire brand, pubblico, obiettivi e cosa funziona o non funziona oggi.',
            },
            {
                step: '02',
                title: 'Strategia visiva',
                description:
                    'Moodboard, riferimenti, scelte tipografiche e di colore. Allineamento prima di disegnare la prima pagina.',
            },
            {
                step: '03',
                title: 'Design',
                description:
                    'Prima la home, poi le pagine interne. Iterazioni rapide su Figma con feedback strutturato.',
            },
            {
                step: '04',
                title: 'Sviluppo o handoff',
                description:
                    'Sviluppo io stesso il sito in codice o consegno il file Figma al tuo team con documentazione chiara.',
            },
            {
                step: '05',
                title: 'Lancio e supporto',
                description:
                    'Pubblicazione, controlli SEO di base, formazione per aggiornare i contenuti, supporto post-lancio.',
            },
        ],
        tech: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        faq: [
            {
                q: 'Quanto costa un sito web disegnato su misura?',
                a: 'Un sito vetrina ben fatto parte da circa 2.500€, un progetto più articolato con più pagine e funzionalità custom va da 5.000€ in su. Tutto dipende da contenuti, complessità e timeline.',
            },
            {
                q: 'In quanto tempo consegnate il sito?',
                a: 'Da 3 a 8 settimane per la maggior parte dei progetti, dal kick-off al lancio. La variabile più grande è la velocità con cui ricevo contenuti e feedback.',
            },
            {
                q: 'Lavorate solo a Bologna o anche a distanza?',
                a: 'Ho clienti in tutta Italia e qualcuno all\'estero. Il 99% del lavoro avviene a distanza, con call di allineamento regolari.',
            },
            {
                q: 'Disegnate anche il logo?',
                a: 'Curo il sistema visivo digitale e posso lavorare a partire da una brand identity esistente o costruirla insieme a un brand designer di fiducia.',
            },
        ],
        relatedProjectSlugs: ['where2beach', 'flow-pilates', 'antonela-paintings'],
        pricingNote: 'Da 2.500€ per un sito vetrina, da 5.000€ per progetti su più pagine.',
        ctaTitle: "Hai un progetto in mente?",
        ctaCopy:
            "Raccontami il tuo brand e i tuoi obiettivi. Ti rispondo entro 24 ore con una stima realistica e i prossimi passi.",
    },
    {
        slug: 'sviluppo-web',
        title: 'Sviluppo Web',
        h1: 'Sviluppatore web freelance: codice pulito, performance reali, niente sorprese',
        seoTitle: 'Sviluppatore Web Freelance Italia — React, TypeScript, Performance | PIONIO',
        seoDescription:
            'Sviluppatore web freelance in Italia. Sviluppo siti e applicazioni in React, TypeScript e Next.js. Codice pulito, performance reali, accessibilità, SEO tecnica. Preventivo gratuito.',
        keywords: [
            'sviluppatore web freelance',
            'programmatore web',
            'sviluppatore frontend italia',
            'sviluppo siti web',
            'react developer freelance',
            'sviluppatore typescript',
        ],
        intro:
            'Quando un sito è lento, instabile o difficile da aggiornare, il problema non è quasi mai il design: è il codice sotto. Sviluppo siti e applicazioni web pensati per durare, scalare e farsi indicizzare bene.',
        paragraphs: [
            "Sono uno sviluppatore web freelance specializzato in frontend moderno: React, TypeScript, Next.js, Vite, Tailwind CSS. Lavoro con brand, agenzie e startup che hanno bisogno di sviluppo serio e non di un assemblaggio di plugin trovati in giro.",
            "Ogni progetto parte da una scelta di stack motivata. Un sito vetrina di 5 pagine non ha bisogno della stessa architettura di una web app con migliaia di utenti. Spendere bene il budget tecnico significa scegliere lo strumento giusto per il problema, non quello più di moda.",
            "Quello che troverai sempre nel mio codice: type safety con TypeScript, componenti riutilizzabili, test sui flussi critici, performance budget rispettato (Core Web Vitals), accessibilità di base, SEO tecnica corretta. Sono cose noiose ma sono ciò che separa un sito che dura cinque anni da uno che bisogna rifare tra dodici mesi.",
        ],
        includes: [
            {
                title: 'Architettura frontend solida',
                description:
                    'Struttura del progetto pensata per crescere senza diventare un caos in sei mesi.',
            },
            {
                title: 'Performance reali',
                description:
                    'Core Web Vitals nel verde, immagini ottimizzate, code splitting, prerendering quando ha senso.',
            },
            {
                title: 'TypeScript end-to-end',
                description:
                    'Tipizzazione forte per ridurre i bug e rendere il refactoring sicuro nel tempo.',
            },
            {
                title: 'Integrazioni con CMS e API',
                description:
                    'Sanity, Strapi, Supabase, Stripe, Resend, qualsiasi servizio serva al business.',
            },
            {
                title: 'Deploy e CI/CD',
                description:
                    'Pubblicazione su Vercel o simili, anteprime per branch, controlli automatici prima del merge.',
            },
            {
                title: 'Documentazione utile',
                description:
                    'README chiaro e una guida per aggiornare contenuti senza chiamarmi ogni volta.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Analisi tecnica',
                description:
                    'Capisco requisiti, vincoli, integrazioni e SLA. Da qui esce una proposta di stack e tempi.',
            },
            {
                step: '02',
                title: 'Setup e architettura',
                description:
                    'Repository, pipeline di deploy, struttura dei componenti, design system di base.',
            },
            {
                step: '03',
                title: 'Sviluppo iterativo',
                description:
                    'Pull request piccole, anteprime per ogni feature, demo settimanali quando il progetto è denso.',
            },
            {
                step: '04',
                title: 'QA e ottimizzazione',
                description:
                    'Test sui browser reali, audit Lighthouse, controlli di accessibilità, fix delle ultime asperità.',
            },
            {
                step: '05',
                title: 'Lancio e maintenance',
                description:
                    'Go-live, monitoraggio, eventuale supporto continuativo per evolvere il prodotto nel tempo.',
            },
        ],
        tech: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Vercel'],
        faq: [
            {
                q: 'Lavorate solo con React o anche con altri framework?',
                a: 'React è quello in cui sono più veloce, ma ho lavorato anche con Vue e con stack più semplici quando il progetto lo richiede.',
            },
            {
                q: 'Riprendete progetti già iniziati da altri?',
                a: 'Sì, e capita spesso. Inizio con un audit del codice esistente per capire cosa salvare e cosa rifare.',
            },
            {
                q: 'Offrite manutenzione dopo il lancio?',
                a: 'Sì, con piani mensili o a ore. La maggior parte dei clienti sceglie un pacchetto piccolo per avere qualcuno che risponde quando serve.',
            },
            {
                q: 'Lavorate in team con altri sviluppatori?',
                a: 'Sì, mi inserisco in team esistenti come consulente frontend o lavoro con designer/backend di fiducia se il progetto lo richiede.',
            },
        ],
        relatedProjectSlugs: ['where2beach', 'smoky-candle', 'flow-pilates'],
        pricingNote: 'Tariffa giornaliera o a progetto, in base alla scala. Preventivo trasparente prima di iniziare.',
        ctaTitle: 'Vuoi un confronto tecnico?',
        ctaCopy:
            'Mandami una descrizione del progetto o del problema. Se è nelle mie corde rispondo con una proposta concreta, altrimenti ti dico chi può aiutarti meglio.',
    },
    {
        slug: 'ecommerce',
        title: 'E-commerce',
        h1: "Sviluppo e-commerce: vendi online davvero, non solo “ci sei”",
        seoTitle: 'Sviluppo E-commerce su Misura — Negozi Online che Vendono | PIONIO',
        seoDescription:
            'Creare un sito e-commerce che converte: sviluppo negozi online su misura con Shopify, Stripe, headless commerce. UX, performance, SEO. Per artigiani, brand e PMI italiane.',
        keywords: [
            'creare sito ecommerce',
            'sviluppo ecommerce',
            'sito ecommerce su misura',
            'negozio online',
            'shopify developer italia',
            'ecommerce headless',
            'sviluppatore ecommerce freelance',
        ],
        intro:
            "Un e-commerce non è un catalogo con un bottone “Aggiungi al carrello”. È un percorso pensato per portare uno sconosciuto da una pubblicità o da Google fino al pagamento, con il minor numero possibile di motivi per abbandonare.",
        paragraphs: [
            "Sviluppo e-commerce per piccoli brand italiani, artigiani e PMI che vogliono vendere online sul serio. La domanda non è mai “che piattaforma usiamo?” ma “qual è la più adatta a quanto vendi, a chi e con che margine?”. Da quella risposta deriva tutto il resto.",
            "Ho lavorato sia con stack chiavi in mano (Shopify) sia con architetture headless (frontend custom su Next.js o React, commerce engine separato, pagamenti via Stripe). La prima è veloce e robusta per la maggior parte dei progetti; la seconda dà controllo totale su esperienza utente e performance, ma ha senso solo sopra un certo volume.",
            "Quello che curo sempre, indipendentemente dallo stack: schede prodotto convincenti, checkout breve, pagina carrello chiara, gestione corretta di IVA e spedizioni, integrazione con Google Shopping, tracciamento conversioni, performance mobile sotto i due secondi.",
        ],
        includes: [
            {
                title: 'Strategia di piattaforma',
                description:
                    "Analisi del catalogo, dei volumi e dei margini per scegliere tra Shopify, headless o stack ibrido.",
            },
            {
                title: 'Design schede prodotto',
                description:
                    "Layout pensati per dare fiducia: foto, dettagli, recensioni, garanzie, spedizione, FAQ.",
            },
            {
                title: 'Checkout ottimizzato',
                description:
                    "Pagamenti rapidi (carta, Apple Pay, Google Pay, PayPal), gestione errori, recupero carrelli.",
            },
            {
                title: 'SEO per e-commerce',
                description:
                    "Tag title, meta description, schema Product, sitemap aggiornato, redirect quando serve.",
            },
            {
                title: 'Performance mobile',
                description:
                    "Immagini servite in AVIF/WebP, lazy loading, prefetching dei link, Core Web Vitals nel verde.",
            },
            {
                title: 'Integrazioni',
                description:
                    "Stripe, PayPal, Google Analytics, Meta Pixel, Klaviyo o Mailchimp, gestione spedizioni.",
            },
        ],
        process: [
            {
                step: '01',
                title: 'Discovery commerciale',
                description:
                    'Catalogo, prezzi, margini, target, canali di acquisizione. Da qui derivano scelte tecniche e di design.',
            },
            {
                step: '02',
                title: 'Architettura',
                description:
                    "Scelta della piattaforma, mappa delle pagine, definizione delle integrazioni di pagamento e marketing.",
            },
            {
                step: '03',
                title: 'Design e sviluppo',
                description:
                    "Schede prodotto, carrello, checkout, pagine istituzionali. Tutto disegnato e sviluppato insieme.",
            },
            {
                step: '04',
                title: 'Test reali',
                description:
                    "Acquisti di test su tutti i metodi di pagamento, controllo email transazionali, gestione resi.",
            },
            {
                step: '05',
                title: 'Lancio e ottimizzazione',
                description:
                    "Pubblicazione, monitoraggio conversioni, A/B test sulle pagine chiave per migliorare nel tempo.",
            },
        ],
        tech: ['Shopify', 'Next.js', 'React', 'TypeScript', 'Stripe', 'Sanity', 'Tailwind CSS'],
        faq: [
            {
                q: 'Quanto costa un e-commerce ben fatto?',
                a: "Un negozio Shopify chiavi in mano parte da 4.000€. Un e-commerce headless custom da 12.000€ in su. Il prezzo dipende dal numero di prodotti, dalle integrazioni e dalle pagine custom.",
            },
            {
                q: 'Meglio Shopify o un e-commerce custom?',
                a: "Shopify è più che sufficiente fino a centinaia di migliaia di euro di fatturato annuo. Custom ha senso quando hai bisogno di un'esperienza non replicabile in tema o quando le commissioni Shopify pesano davvero.",
            },
            {
                q: 'Migrate da WooCommerce o Magento?',
                a: 'Sì, faccio migrazioni con redirect 301 corretti per non perdere il posizionamento Google e con import controllato di prodotti, ordini e clienti.',
            },
            {
                q: 'Vi occupate anche di marketing?',
                a: "Mi occupo della parte tecnica (tracking, feed Google Shopping, integrazione email). Per ads e content collaboro con specialisti dedicati.",
            },
        ],
        relatedProjectSlugs: ['smoky-candle'],
        pricingNote: 'Da 4.000€ per Shopify chiavi in mano. Da 12.000€ per e-commerce headless custom.',
        ctaTitle: 'Pronti a vendere online sul serio?',
        ctaCopy:
            "Raccontami cosa vendi e dove vuoi arrivare. Ti propongo lo stack giusto e una roadmap chiara, senza vendere strumenti che non ti servono.",
    },
    {
        slug: 'applicazioni-web',
        title: 'Applicazioni Web',
        h1: 'Sviluppo applicazioni web su misura: dal prototipo alla scala',
        seoTitle: 'Sviluppo Applicazioni Web su Misura — Web App in React | PIONIO',
        seoDescription:
            'Sviluppo applicazioni web su misura per startup e PMI italiane. Web app in React, dashboard, gestionali, MVP. Dalla discovery al lancio, con performance e accessibilità. Preventivo gratuito.',
        keywords: [
            'sviluppo applicazioni web',
            'web app su misura',
            'sviluppo web app',
            'mvp startup',
            'gestionale web',
            'dashboard custom',
            'react app developer italia',
        ],
        intro:
            "Una web application è uno strumento di lavoro: deve fare risparmiare tempo, ridurre errori, dare visibilità sui dati. Sviluppo applicazioni web su misura per chi ha bisogno di qualcosa che il software off-the-shelf non risolve.",
        paragraphs: [
            "Lavoro su web app di vario tipo: MVP per startup che devono validare un'idea con i primi utenti reali, dashboard interne per aziende che vogliono unificare dati sparsi su mille fogli Excel, gestionali leggeri che sostituiscono software vecchi e poco usati.",
            "La parte difficile non è quasi mai il codice: è capire davvero come lavorano le persone che useranno l'applicazione, quali sono le tre cose che fanno cento volte al giorno e come renderle un click. Per questo ogni progetto inizia con interviste agli utenti finali e finisce con loro che testano il prodotto.",
            "Dal punto di vista tecnico uso React con TypeScript, un backend a misura del progetto (Supabase per partire veloci, Node.js o serverless quando serve più controllo), autenticazione gestita correttamente, query ottimizzate. Niente over-engineering, ma niente nemmeno scorciatoie che fanno crollare il prodotto al primo cliente serio.",
        ],
        includes: [
            {
                title: 'Discovery e interviste',
                description:
                    'Capisco davvero il flusso di lavoro che la web app deve sostituire o migliorare.',
            },
            {
                title: 'Prototipo navigabile',
                description:
                    'Prima del codice, un prototipo Figma testabile per validare le scelte UX con utenti reali.',
            },
            {
                title: 'Frontend reattivo',
                description:
                    'Interfacce veloci, con feedback immediato sulle azioni e gestione corretta di stati e errori.',
            },
            {
                title: 'Backend solido',
                description:
                    'API REST o GraphQL, autenticazione, autorizzazioni, database relazionali quando ha senso.',
            },
            {
                title: 'Test e qualità',
                description:
                    'Test automatici sui flussi critici, monitoraggio errori in produzione (Sentry), backup.',
            },
            {
                title: 'Sviluppo iterativo',
                description:
                    'Demo regolari, anteprime per ogni feature, possibilità di cambiare priorità in corsa.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Discovery',
                description:
                    'Interviste agli utenti, mappa dei flussi attuali, definizione dei "job to be done".',
            },
            {
                step: '02',
                title: 'Prototipo',
                description:
                    'Wireframe e prototipo cliccabile su Figma, testato con 3-5 utenti reali prima di scrivere codice.',
            },
            {
                step: '03',
                title: 'MVP',
                description:
                    "Sviluppo della prima versione con le funzionalità essenziali, già usabili in produzione.",
            },
            {
                step: '04',
                title: 'Iterazioni',
                description:
                    'Cicli brevi di feedback, telemetria sull\'uso reale, priorità rivalutate ogni due settimane.',
            },
            {
                step: '05',
                title: 'Scala',
                description:
                    "Quando il prodotto cresce: ottimizzazioni di performance, monitoraggio, hardening della sicurezza.",
            },
        ],
        tech: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'tRPC'],
        faq: [
            {
                q: 'Quanto costa sviluppare una web app?',
                a: "Un MVP solido parte da 8.000€-15.000€. Web app più articolate arrivano facilmente a 30.000€+ a seconda di flussi, integrazioni e scala. Preventivo dettagliato dopo la discovery.",
            },
            {
                q: 'In quanto tempo si sviluppa un MVP?',
                a: 'Da 6 a 12 settimane per un MVP serio. Tutto quello sotto le 6 settimane di solito è una landing con un form, non un MVP funzionante.',
            },
            {
                q: 'Lavorate con team interni esistenti?',
                a: "Sì, mi inserisco volentieri come lead frontend o full-stack in team già strutturati per accelerare un progetto.",
            },
            {
                q: 'Vi occupate del backend e del database?',
                a: "Sì, faccio full-stack in React/Node.js per i progetti di scala media. Per progetti più grandi collaboro con backend specialisti dedicati.",
            },
        ],
        relatedProjectSlugs: ['where2beach', 'flow-pilates'],
        pricingNote: 'MVP da 8.000€-15.000€. Web app full-stack su misura da 20.000€ in su.',
        ctaTitle: "Hai un'idea di prodotto?",
        ctaCopy:
            "Mandami una descrizione anche grezza. Se ha senso, ci facciamo una call e ragioniamo insieme su cosa serve davvero per uscire con un MVP.",
    },
    {
        slug: 'seo-ottimizzazione',
        title: 'SEO & Ottimizzazione',
        h1: 'SEO tecnica e ottimizzazione: farti trovare su Google senza barare',
        seoTitle: 'Consulenza SEO Italia — Ottimizzazione SEO Tecnica per Siti Web | PIONIO',
        seoDescription:
            'Consulenza SEO e ottimizzazione tecnica per siti web italiani. Audit, Core Web Vitals, structured data, sitemap, contenuti. Posizionamento Google misurabile. Preventivo trasparente.',
        keywords: [
            'ottimizzazione seo',
            'consulenza seo',
            'seo italia',
            'seo freelance',
            'audit seo',
            'core web vitals',
            'posizionamento google',
            'seo tecnica',
        ],
        intro:
            'La SEO non è magia ed è ancora meno un trucco. È una disciplina fatta di tecnica, contenuti e pazienza. Mi occupo della parte tecnica — quella che, fatta male, manda in fumo qualsiasi sforzo di contenuto.',
        paragraphs: [
            "Faccio consulenza SEO tecnica per siti italiani: audit completi, ottimizzazione Core Web Vitals, structured data (JSON-LD), sitemap, hreflang per progetti multilingua, redirect dopo migrazioni, controllo della crawlability. La parte di scrittura dei contenuti la lascio a chi conosce davvero il settore del cliente.",
            "Il principio di partenza è semplice: prima di provare a posizionarsi meglio, bisogna assicurarsi che Google riesca a leggere il sito. Una SPA renderizzata solo lato client è spesso invisibile ai bot meno sofisticati; una migrazione fatta male brucia mesi di posizionamento; un sito lento perde posizioni anche se ha contenuti ottimi.",
            "Il mio metodo è trasparente: ti dico cosa è realistico ottenere, in quanto tempo e cosa serve. Niente promesse di prima posizione in due settimane, niente keyword stuffing, niente link in pdf di siti finti. Solo lavoro tecnico e di contenuti che, nel medio periodo, sposta davvero il traffico organico.",
        ],
        includes: [
            {
                title: 'Audit SEO completo',
                description:
                    "Analisi tecnica di 60+ punti: indicizzazione, performance, structured data, alberatura, link interni.",
            },
            {
                title: 'Ottimizzazione Core Web Vitals',
                description:
                    "LCP, INP, CLS sotto soglia su mobile e desktop, perché Google li usa come fattore di ranking.",
            },
            {
                title: 'Structured data (JSON-LD)',
                description:
                    "Schema corretto per articoli, prodotti, FAQ, breadcrumb, localBusiness, event, organization.",
            },
            {
                title: 'Sitemap e robots.txt',
                description:
                    "Sitemap XML completa con hreflang, image sitemap, robots.txt che blocca solo quello che va bloccato.",
            },
            {
                title: 'Migrazioni senza danni',
                description:
                    "Mappa dei redirect 301 da vecchio a nuovo dominio, controllo post-migrazione, recovery se serve.",
            },
            {
                title: 'Reportistica chiara',
                description:
                    "Search Console, GA4, posizionamento sulle parole chiave che contano. Solo metriche che si traducono in business.",
            },
        ],
        process: [
            {
                step: '01',
                title: 'Audit tecnico',
                description:
                    "Crawl completo del sito, controllo manuale dei punti critici, prioritizzazione degli interventi.",
            },
            {
                step: '02',
                title: 'Roadmap',
                description:
                    'Lista di interventi ordinata per impatto/sforzo, con tempi e risorse necessarie per ognuno.',
            },
            {
                step: '03',
                title: 'Implementazione',
                description:
                    'Fix tecnici, structured data, ottimizzazione performance, miglioramenti di alberatura.',
            },
            {
                step: '04',
                title: 'Monitoraggio',
                description:
                    'Search Console, posizionamento delle keyword target, traffico organico, conversioni da organico.',
            },
            {
                step: '05',
                title: 'Iterazione',
                description:
                    "SEO non è mai “finita”: revisione mensile, nuovi contenuti, aggiustamenti basati sui dati.",
            },
        ],
        tech: ['Search Console', 'GA4', 'Screaming Frog', 'Lighthouse', 'PageSpeed Insights', 'JSON-LD'],
        faq: [
            {
                q: 'In quanto tempo si vedono i primi risultati SEO?',
                a: 'Le ottimizzazioni tecniche danno effetti in 4-8 settimane. Il posizionamento sulle keyword competitive richiede 3-6 mesi minimo, soprattutto per siti nuovi.',
            },
            {
                q: 'Garantite la prima posizione su Google?',
                a: 'No, e diffida di chi lo promette. Garantiamo lavoro tecnico fatto bene e una roadmap di contenuti e interventi che, statisticamente, sposta il traffico.',
            },
            {
                q: 'Vi occupate anche di link building?',
                a: 'Per progetti dove ha senso, sì. Solo link da siti veri, con un piano editoriale serio. Niente PBN o scambi finti.',
            },
            {
                q: 'Lavorate solo su siti che avete sviluppato voi?',
                a: 'No, l\'audit SEO funziona su qualsiasi stack — WordPress, Shopify, custom. La parte di implementazione dipende dalle competenze del tuo team o se ti serve che intervenga io.',
            },
        ],
        relatedProjectSlugs: ['where2beach', 'arena-barbershop'],
        pricingNote: 'Audit SEO da 800€. Ottimizzazione tecnica con preventivo a progetto.',
        ctaTitle: 'Vuoi capire dove perdi traffico?',
        ctaCopy:
            'Mandami il dominio del tuo sito e i tuoi obiettivi. Faccio un controllo iniziale gratuito e ti dico se ha senso lavorare insieme.',
    },
    {
        slug: 'rifacimento-sito-bologna',
        title: 'Rifacimento Siti Web Bologna',
        h1: 'Rifare il sito web a Bologna senza perdere quello che già funziona',
        seoTitle: 'Rifacimento Sito Web Bologna — Restyling per PMI e Professionisti | PIONIO',
        seoDescription:
            'Rifacimento siti web a Bologna per PMI, studi e professionisti. Sito nuovo, veloce e leggibile da Google, con migrazione dei contenuti e redirect corretti. Da 2.500€, risposta in 24 ore.',
        keywords: [
            'rifacimento sito web bologna',
            'rifare sito web',
            'restyling sito web bologna',
            'web designer bologna',
            'sito web aziendale bologna',
            'sito web vecchio da rifare',
        ],
        intro:
            "Un sito di otto anni fa oggi lavora contro di te: lento da telefono, invisibile su Google, con informazioni vecchie. Rifarlo non significa buttare tutto — significa tenere ciò che porta contatti e ricostruire il resto.",
        paragraphs: [
            "Lavoro da Bologna con PMI, studi e professionisti che hanno già un sito e non ne sono più contenti. Il punto di partenza non è mai la pagina bianca: è capire cosa del sito attuale funziona ancora (pagine posizionate, contenuti letti, contatti che arrivano) e cosa invece frena. Da lì esce un progetto di rifacimento con priorità chiare.",
            "La parte che quasi tutti sbagliano nel rifare un sito è la migrazione: pagine spostate senza redirect, URL cambiati a caso, mesi di posizionamento Google bruciati in un pomeriggio. Ogni rifacimento che consegno include la mappa dei redirect 301 dal vecchio al nuovo, il controllo dell'indicizzazione dopo il lancio e il passaggio corretto di dominio ed email.",
            "Essere a Bologna aiuta: se preferisci parlarne di persona davanti a un caffè, si fa. Detto questo, lavoro con clienti in tutta Italia e il processo funziona identico a distanza — call di allineamento, anteprime online a ogni passaggio, feedback diretto sulle pagine.",
        ],
        includes: [
            {
                title: 'Analisi del sito attuale',
                description:
                    'Cosa si posiziona, cosa viene letto, da dove arrivano i contatti. Si ricostruisce sapendo cosa salvare.',
            },
            {
                title: 'Design nuovo, contenuti migrati',
                description:
                    'Layout ripensato per il telefono e per chi legge in fretta. Testi e foto buoni si portano di là, il resto si rifà.',
            },
            {
                title: 'Redirect 301 completi',
                description:
                    'Ogni vecchio URL punta alla pagina nuova giusta. Il posizionamento Google accumulato non si perde.',
            },
            {
                title: 'Performance da telefono',
                description:
                    'Core Web Vitals nel verde, immagini ottimizzate, caricamento sotto i due secondi sulla rete mobile.',
            },
            {
                title: 'SEO on-page rifatta',
                description:
                    'Tag title, meta description, struttura dei titoli, sitemap e dati strutturati corretti pagina per pagina.',
            },
            {
                title: 'Dominio, email e accessi in ordine',
                description:
                    'Subentro pulito anche se il sito lo ha fatto qualcun altro: recupero accessi, hosting, caselle email.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Audit del sito esistente',
                description:
                    'Crawl completo, dati di traffico se disponibili, lista di ciò che funziona e ciò che va rifatto.',
            },
            {
                step: '02',
                title: 'Progetto e preventivo',
                description:
                    'Mappa delle pagine nuove, cosa si migra e cosa si riscrive, prezzo chiuso e tempi realistici.',
            },
            {
                step: '03',
                title: 'Design e sviluppo',
                description:
                    'Il sito nuovo prende forma su un link di anteprima che puoi aprire quando vuoi, da qualsiasi dispositivo.',
            },
            {
                step: '04',
                title: 'Migrazione e redirect',
                description:
                    'Contenuti trasferiti, redirect 301 attivi, controllo che Google veda il nuovo sito senza scossoni.',
            },
            {
                step: '05',
                title: 'Lancio e verifica',
                description:
                    'Pubblicazione, controllo indicizzazione nelle settimane successive, istruzioni per aggiornare i contenuti.',
            },
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'WordPress', 'Vercel', 'Search Console'],
        faq: [
            {
                q: 'Quanto costa rifare un sito web?',
                a: 'Il rifacimento di un sito vetrina parte da 2.500€, migrazione e redirect inclusi. Progetti con più pagine o funzionalità particolari vanno da 5.000€ in su. Prezzo chiuso prima di iniziare.',
            },
            {
                q: 'Rifacendo il sito perdo il posizionamento su Google?',
                a: 'No, se la migrazione è fatta con i redirect 301 corretti e la struttura nuova viene comunicata a Google. È la parte del lavoro che curo di più, perché è quella che nessuno vede finché non va storta.',
            },
            {
                q: 'Il sito attuale lo ha fatto un\'altra agenzia. È un problema?',
                a: 'No, capita nella maggior parte dei rifacimenti. Recupero accessi a dominio, hosting ed email, e se qualcosa manca si ricostruisce. Il vecchio fornitore non deve fare nulla.',
            },
            {
                q: 'Lavorate solo con aziende di Bologna?',
                a: 'No. Bologna è la base e per chi è in zona ci si può vedere di persona, ma lavoro con clienti in tutta Italia a distanza, con lo stesso processo.',
            },
        ],
        relatedProjectSlugs: ['arena-barbershop', 'flow-pilates', 'smoky-candle'],
        pricingNote: 'Da 2.500€ per il rifacimento di un sito vetrina, migrazione e redirect inclusi.',
        ctaTitle: 'Il tuo sito ha bisogno di essere rifatto?',
        ctaCopy:
            'Mandami il link del sito attuale e due righe su cosa non ti convince. Lo guardo e ti rispondo entro 24 ore con un parere onesto: a volte serve rifarlo, a volte basta sistemarlo.',
    },
    {
        slug: 'siti-guide-outdoor',
        title: 'Siti Web per Guide Outdoor',
        h1: 'Siti web per guide escursionistiche e attività outdoor',
        seoTitle: 'Siti Web per Guide Escursionistiche e Attività Outdoor | PIONIO',
        seoDescription:
            'Siti web per guide escursionistiche, accompagnatori di media montagna e attività outdoor. Farsi trovare su Google per zona e attività, ricevere richieste anche in alta stagione. Da 2.500€.',
        keywords: [
            'sito web guida escursionistica',
            'sito web guida alpina',
            'sito accompagnatore media montagna',
            'sito web attività outdoor',
            'sito web trekking',
            'prenotazioni escursioni online',
        ],
        intro:
            'Chi cerca "escursioni guidate" su Google decide in pochi minuti con chi andare. Se il tuo sito non compare per la tua zona, o compare ma non convince, quelle uscite le riempie qualcun altro.',
        paragraphs: [
            "Il lavoro di guida ha una stagionalità precisa: le ricerche esplodono in estate e nei ponti, e ogni settimana di invisibilità in alta stagione sono posti vuoti che non tornano. Un sito fatto bene lavora proprio lì — pagine che rispondono alle ricerche vere (\"escursioni guidate\" più la tua zona, ciaspolate, trekking di più giorni) e un calendario chiaro di uscite e disponibilità.",
            "La maggior parte dei siti di guide che vedo ha lo stesso problema: parla dell'attività in generale, ma non dice dove. Google ragiona per zona: una pagina per area operativa e per tipo di attività — con dislivelli, durate, difficoltà e periodo — intercetta chi sta già cercando esattamente quello. Il blog, se già lo scrivi, diventa un alleato: va solo collegato bene alle pagine che convertono.",
            "L'altra metà del lavoro è la richiesta: chi arriva sul sito da telefono, magari la sera prima del weekend, deve poterti scrivere in trenta secondi. Form corto, WhatsApp, date visibili senza scaricare PDF. Il sito raccoglie la richiesta, tu confermi — senza commissioni di piattaforme esterne.",
        ],
        includes: [
            {
                title: 'Pagine per zona e attività',
                description:
                    'Una pagina per ogni area e tipo di uscita: escursioni, ciaspolate, e-bike, trekking di più giorni. È quello che Google premia.',
            },
            {
                title: 'Calendario uscite leggibile',
                description:
                    'Date, difficoltà, posti disponibili, punto di ritrovo. Aggiornabile da te, senza chiamare nessuno.',
            },
            {
                title: 'Richieste senza attrito',
                description:
                    'Form corto e link WhatsApp su ogni pagina. La conferma resta a te, il sito raccoglie i contatti.',
            },
            {
                title: 'Foto che reggono da telefono',
                description:
                    'Le tue immagini di uscite vere, ottimizzate per caricare in fretta anche con segnale scarso.',
            },
            {
                title: 'Credenziali in evidenza',
                description:
                    'Titoli, collegio o albo di appartenenza, assicurazione: le cose che fanno scegliere una guida certificata.',
            },
            {
                title: 'Blog collegato alle uscite',
                description:
                    'Se scrivi già di percorsi e attrezzatura, ogni articolo porta alle pagine di prenotazione giuste.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Le tue zone e le tue uscite',
                description:
                    'Una call per mappare aree operative, attività, stagioni e come arrivano oggi le richieste.',
            },
            {
                step: '02',
                title: 'Struttura delle pagine',
                description:
                    'La mappa del sito costruita sulle ricerche reali della tua zona, non su un menu standard.',
            },
            {
                step: '03',
                title: 'Design e contenuti',
                description:
                    'Layout con le tue foto, testi asciutti che parlano a chi deve scegliere una guida, non a un altro professionista.',
            },
            {
                step: '04',
                title: 'Sviluppo e prova reale',
                description:
                    'Sito costruito e provato da telefono, con richieste di test dal form e da WhatsApp.',
            },
            {
                step: '05',
                title: 'Lancio prima della stagione',
                description:
                    'Pubblicazione con tempi pensati sulla tua stagionalità, indicizzazione verificata su Search Console.',
            },
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vercel', 'Search Console', 'WhatsApp Business'],
        faq: [
            {
                q: 'Quanto costa un sito per una guida escursionistica?',
                a: 'Da 2.500€ per un sito con pagine per zona e attività, calendario e richieste via form o WhatsApp. Il prezzo esatto dipende da quante attività e aree copri.',
            },
            {
                q: 'Ho già un sito WordPress di qualche anno fa. Si può recuperare?',
                a: 'Dipende dallo stato. A volte conviene sistemare quello che c\'è, a volte rifare su base nuova migrando i contenuti con i redirect corretti. Lo guardo e ti dico la mia, gratis.',
            },
            {
                q: 'Serve un sistema di prenotazione con pagamento online?',
                a: 'Quasi mai, all\'inizio. Per la maggior parte delle guide funziona meglio richiesta dal sito e conferma tua via WhatsApp o email. Il pagamento online si aggiunge quando i volumi lo giustificano.',
            },
            {
                q: 'Posso aggiornare il calendario delle uscite da solo?',
                a: 'Sì, è il requisito di partenza: date, posti e stati delle uscite si aggiornano da un\'area semplice, dal telefono se serve. Ti lascio anche una guida breve per farlo in autonomia.',
            },
        ],
        relatedProjectSlugs: ['flow-pilates', 'where2beach', 'arena-barbershop'],
        pricingNote: 'Da 2.500€ per un sito completo di pagine per zona, calendario e contatti diretti.',
        ctaTitle: 'La prossima stagione si prepara adesso',
        ctaCopy:
            'Raccontami dove porti le persone e come arrivano oggi le tue richieste. Ti rispondo entro 24 ore con una proposta e i tempi per essere online prima del picco.',
    },
    {
        slug: 'siti-agriturismi-bb',
        title: 'Siti Web per Agriturismi e B&B',
        h1: 'Siti web per agriturismi e B&B: più prenotazioni dirette, meno commissioni',
        seoTitle: 'Siti Web per Agriturismi e B&B — Prenotazioni Dirette | PIONIO',
        seoDescription:
            'Siti web per agriturismi, B&B e case vacanza. Prenotazioni dirette senza commissioni OTA, foto e camere presentate bene, richieste via WhatsApp e form. Da 2.500€, risposta in 24 ore.',
        keywords: [
            'sito web agriturismo',
            'sito web b&b',
            'sito web bed and breakfast',
            'prenotazioni dirette agriturismo',
            'sito casa vacanze',
            'commissioni booking alternativa',
        ],
        intro:
            'Ogni prenotazione che passa da Booking lascia lì una commissione attorno al 15%. Il sito serve a questo: farti trovare da chi cerca la tua zona e trasformare quella ricerca in una prenotazione diretta.',
        paragraphs: [
            "Booking e le altre piattaforme portano ospiti, ed è giusto usarle. Il problema è quando sono l'unico canale: commissioni su ogni soggiorno, ospiti che restano \"di Booking\" e non tuoi, condizioni che cambiano senza che tu possa dire nulla. Un sito fatto bene non sostituisce le piattaforme — ti dà il canale dove i margini restano interi e l'ospite torna da te direttamente.",
            "Chi cerca un agriturismo lo fa quasi sempre per zona: il paese, la valle, \"agriturismo con piscina\" più la provincia. Il sito va costruito su quelle ricerche, con pagine chiare per camere, prezzi indicativi, cosa si mangia e cosa c'è intorno. E le foto: sono il motivo per cui si prenota, vanno servite grandi, vere e veloci da caricare anche in mobilità.",
            "La richiesta deve essere immediata: date, persone, un tasto WhatsApp e un form corto. Molti ospiti — soprattutto stranieri — scrivono la sera tardi: il sito raccoglie la richiesta con tutte le informazioni che ti servono, tu rispondi quando puoi. Se usi già un channel manager, il sito ci si collega senza doppio lavoro sul calendario.",
        ],
        includes: [
            {
                title: 'Pagine camere e ospitalità',
                description:
                    'Ogni camera con foto grandi, servizi, prezzi indicativi per stagione. Chiarezza che fa scrivere.',
            },
            {
                title: 'Richiesta diretta in 30 secondi',
                description:
                    'Form con date e persone + tasto WhatsApp. La prenotazione si chiude come preferisci tu.',
            },
            {
                title: 'Trovabile per la tua zona',
                description:
                    'Pagine e dati strutturati costruiti sulle ricerche locali: il paese, la valle, cosa c\'è da fare intorno.',
            },
            {
                title: 'Foto veloci e vere',
                description:
                    'Le immagini della struttura ottimizzate per il telefono, senza slider pesanti che rallentano tutto.',
            },
            {
                title: 'Italiano e inglese',
                description:
                    'Doppia lingua dove serve davvero, per gli ospiti stranieri che cercano l\'Italia autentica.',
            },
            {
                title: 'Collegamento al channel manager',
                description:
                    'Se gestisci già le disponibilità con un gestionale, il sito ci parla. Niente doppio calendario a mano.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'La struttura e la zona',
                description:
                    'Una call per capire camere, stagioni, che ospiti arrivano oggi e da quali canali.',
            },
            {
                step: '02',
                title: 'Contenuti e foto',
                description:
                    'Selezione delle immagini migliori, testi per camere e dintorni, prezzi e condizioni da mostrare.',
            },
            {
                step: '03',
                title: 'Design e sviluppo',
                description:
                    'Il sito prende forma su un link di anteprima: lo guardi dal telefono, come farà l\'ospite.',
            },
            {
                step: '04',
                title: 'Richieste alla prova',
                description:
                    'Test reali di form e WhatsApp, email di notifica che arrivano dove le leggi davvero.',
            },
            {
                step: '05',
                title: 'Lancio e indicizzazione',
                description:
                    'Pubblicazione, invio a Google, controllo che la struttura compaia per le ricerche della zona.',
            },
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vercel', 'Search Console', 'WhatsApp Business'],
        faq: [
            {
                q: 'Quanto costa un sito per un agriturismo o un B&B?',
                a: 'Da 2.500€ per un sito completo con pagine camere, richiesta diretta e doppia lingua. Il prezzo dipende dal numero di camere e dalle integrazioni che servono.',
            },
            {
                q: 'Il sito sostituisce Booking?',
                a: 'No, ci si affianca. Le piattaforme portano visibilità, il sito ti dà il canale diretto senza commissioni. L\'obiettivo realistico è spostare una parte crescente delle prenotazioni sul diretto.',
            },
            {
                q: 'Serve il pagamento online per le prenotazioni?',
                a: 'Non per forza. Molte strutture chiudono la prenotazione con un acconto via bonifico o link di pagamento inviato su WhatsApp. Il pagamento integrato si aggiunge se i volumi lo giustificano.',
            },
            {
                q: 'Posso aggiornare prezzi e disponibilità da solo?',
                a: 'Sì. Prezzi e contenuti si aggiornano da un\'area semplice, e se usi un channel manager le disponibilità restano sincronizzate da lì.',
            },
        ],
        relatedProjectSlugs: ['smoky-candle', 'flow-pilates', 'arena-barbershop'],
        pricingNote: 'Da 2.500€ per un sito completo con richiesta diretta e doppia lingua.',
        ctaTitle: 'Quanto ti costa Booking ogni anno?',
        ctaCopy:
            'Fai il conto delle commissioni dell\'ultima stagione e mandami il link della tua struttura. Ti rispondo entro 24 ore dicendoti cosa può fare un sito diretto per te, con numeri e tempi.',
    },
];

export function getService(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}
