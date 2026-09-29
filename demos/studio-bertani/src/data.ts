// Studio inventato. Nomi, percorsi professionali, numeri e recapiti sono di
// fantasia: servono a far vedere come si comporta il sito con dentro contenuti
// veri, non a descrivere persone reali.

export const studio = {
    nome: 'Bertani & Associati',
    nomeEsteso: 'Studio Legale Bertani & Associati',
    claim: 'Assistenza legale per imprese e famiglie, dal 1994.',
    indirizzo: 'Via Guglielmo Marconi 41, 40122 Bologna',
    telefono: '051 000 4499',
    telefonoHref: 'tel:+390510004499',
    email: 'segreteria@studiobertani.demo',
    pec: 'studiobertani@pec.demo',
    orari: 'Lunedì–venerdì, 9:00–13:00 e 14:30–18:30',
};

export type Area = {
    titolo: string;
    sommario: string;
    voci: string[];
    icona: 'impresa' | 'lavoro' | 'famiglia' | 'immobili' | 'contratti' | 'recupero';
};

export const aree: Area[] = [
    {
        titolo: 'Diritto societario',
        sommario: 'Dalla costituzione ai passaggi generazionali, con un occhio a come finiscono le liti prima che comincino.',
        voci: ['Costituzione e patti parasociali', 'Cessioni di quote e rami d\'azienda', 'Responsabilità di amministratori', 'Passaggio generazionale'],
        icona: 'impresa',
    },
    {
        titolo: 'Diritto del lavoro',
        sommario: 'Per il datore e per il lavoratore, mai per entrambi nella stessa vicenda.',
        voci: ['Assunzioni e contratti', 'Licenziamenti e impugnazioni', 'Vertenze e conciliazioni', 'Sicurezza sul lavoro'],
        icona: 'lavoro',
    },
    {
        titolo: 'Famiglia e successioni',
        sommario: 'La materia in cui le parole scelte male costano più degli errori tecnici.',
        voci: ['Separazioni e divorzi', 'Affidamento e mantenimento', 'Testamenti e divisioni', 'Patti di famiglia'],
        icona: 'famiglia',
    },
    {
        titolo: 'Immobiliare e locazioni',
        sommario: 'Compravendite, affitti, condominio: i contratti che tutti firmano senza leggere.',
        voci: ['Preliminari e rogiti', 'Locazioni abitative e commerciali', 'Vizi e difformità', 'Controversie condominiali'],
        icona: 'immobili',
    },
    {
        titolo: 'Contratti e responsabilità',
        sommario: 'Scritti per reggere in tribunale, non per fare numero di pagine.',
        voci: ['Redazione e revisione', 'Appalti e forniture', 'Risarcimento danni', 'Contrattualistica internazionale'],
        icona: 'contratti',
    },
    {
        titolo: 'Recupero crediti',
        sommario: 'Dal sollecito al pignoramento, dicendo subito quanto è realistico incassare.',
        voci: ['Decreti ingiuntivi', 'Esecuzioni mobiliari e immobiliari', 'Piani di rientro', 'Insolvenze e concorsuale'],
        icona: 'recupero',
    },
];

export const metodo = [
    {
        passo: '01',
        titolo: 'Primo incontro',
        testo: 'Quarantacinque minuti, in studio o in video. Ci portate le carte, vi diciamo se avete un caso e quanto è solido. Se non ce l\'avete, ve lo diciamo lì.',
    },
    {
        passo: '02',
        titolo: 'Preventivo scritto',
        testo: 'Prima di iniziare ricevete un documento con attività, tempi stimati e costo. Se lungo la strada cambia qualcosa, lo aggiorniamo per iscritto, non a voce.',
    },
    {
        passo: '03',
        titolo: 'Aggiornamenti fissi',
        testo: 'Un aggiornamento ogni volta che succede qualcosa, e comunque uno al mese anche quando non succede niente. Rispondiamo alle email entro ventiquattro ore.',
    },
];

export const professionisti = [
    {
        nome: 'Avv. Chiara Bertani',
        ruolo: 'Socio fondatore',
        aree: 'Societario, contratti',
        bio: 'In studio dal 1994. Si occupa di imprese familiari e dei loro passaggi generazionali, cioè della materia in cui il diritto societario incontra i litigi a tavola.',
        iniziali: 'CB',
    },
    {
        nome: 'Avv. Marco Lenzi',
        ruolo: 'Socio',
        aree: 'Lavoro, recupero crediti',
        bio: 'Assiste PMI del manifatturiero emiliano nelle vertenze di lavoro. Prima di fare l\'avvocato ha lavorato cinque anni in un ufficio del personale, e si vede.',
        iniziali: 'ML',
    },
    {
        nome: 'Avv. Sara Neri',
        ruolo: 'Associato',
        aree: 'Famiglia, successioni',
        bio: 'Mediatore familiare accreditato. Porta a giudizio solo quello che a un tavolo non si è chiuso, che nella sua materia è meno di quanto si pensi.',
        iniziali: 'SN',
    },
];

export const numeri = [
    { a: 30, suffisso: '', etichetta: 'Anni di attività a Bologna' },
    { a: 3, suffisso: '', etichetta: 'Avvocati, più la segreteria' },
    { a: 24, suffisso: ' h', etichetta: 'Tempo massimo di risposta alle email' },
    { a: 45, suffisso: '′', etichetta: 'Durata del primo incontro' },
];

export const manifesto =
    "Uno studio piccolo non può essere bravo in tutto, e il nostro non fa finta. Facciamo sei materie, le facciamo da trent'anni, e quando arriva qualcosa che sta fuori lo diciamo subito invece di imparare a spese vostre.";

export const faq = [
    {
        domanda: 'Quanto costa il primo incontro?',
        risposta:
            'Il primo incontro conoscitivo, fino a quarantacinque minuti, è a titolo gratuito. Serve a capire se il caso c\'è e se siamo lo studio giusto. Da lì in poi ogni attività è preventivata per iscritto prima di partire.',
    },
    {
        domanda: 'Lavorate solo a Bologna?',
        risposta:
            'Lo studio è a Bologna e la maggior parte dei procedimenti è in Emilia-Romagna, ma seguiamo cause su tutto il territorio nazionale appoggiandoci a corrispondenti locali per le udienze che richiedono la presenza fisica.',
    },
    {
        domanda: 'Si possono fare incontri in videochiamata?',
        risposta:
            'Sì, e per molte pratiche è la modalità che consigliamo: si fissa prima, si risparmia il parcheggio in centro. Le firme che richiedono la presenza le concentriamo in un unico appuntamento.',
    },
    {
        domanda: 'Come vengono calcolati gli onorari?',
        risposta:
            'A seconda della pratica: a forfait per le attività che sappiamo quantificare (contratti, decreti ingiuntivi, consulenze), a scaglioni sui parametri forensi per i giudizi. In entrambi i casi il preventivo arriva prima, per iscritto.',
    },
    {
        domanda: 'Quanto dura una causa civile?',
        risposta:
            'Dipende dal tribunale e dalla materia. In primo grado a Bologna, per una causa civile ordinaria, la forbice realistica è fra i due e i quattro anni. Diffidate di chi vi dà una data: possiamo darvi una forbice e tenerla aggiornata.',
    },
];
