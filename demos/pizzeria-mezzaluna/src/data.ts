// Contenuti della demo. Attività inventata: nomi, prezzi, recensioni e persone
// sono di fantasia e servono solo a far vedere come si comporta il sito quando
// è pieno di roba vera.

export const locale = {
    nome: 'Pizzeria Mezzaluna',
    claim: 'Impasto a 48 ore, forno a legna, un menu corto.',
    indirizzo: 'Via delle Fornaci 12, 40122 Bologna',
    telefono: '051 000 1978',
    telefonoHref: 'tel:+390510001978',
    email: 'ciao@pizzeriamezzaluna.demo',
    mappa: 'https://www.openstreetmap.org/#map=16/44.4949/11.3426',
};

export type CategoriaMenu = 'pizze' | 'bianche' | 'antipasti' | 'dolci';

export const categorie: { id: CategoriaMenu; label: string; nota: string }[] = [
    { id: 'pizze', label: 'Pizze rosse', nota: 'Pomodoro San Marzano, fiordilatte di Agerola.' },
    { id: 'bianche', label: 'Pizze bianche', nota: 'Senza pomodoro, con base di crema o olio.' },
    { id: 'antipasti', label: 'Antipasti', nota: 'Da dividere, mentre il forno fa il suo.' },
    { id: 'dolci', label: 'Dolci', nota: 'Fatti in casa, cambiano ogni settimana.' },
];

export type Piatto = {
    nome: string;
    descrizione: string;
    prezzo: number;
    categoria: CategoriaMenu;
    etichette?: ('vegetariano' | 'piccante' | 'novità')[];
};

export const menu: Piatto[] = [
    {
        nome: 'Marinara di mezzanotte',
        descrizione: 'Pomodoro, aglio di Voghiera, origano di montagna, olio nuovo.',
        prezzo: 7,
        categoria: 'pizze',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Margherita Mezzaluna',
        descrizione: 'Fiordilatte, pomodoro, basilico raccolto la mattina, parmigiano 30 mesi.',
        prezzo: 9,
        categoria: 'pizze',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Diavola onesta',
        descrizione: 'Salame piccante di Calabria, fiordilatte, miele di castagno.',
        prezzo: 12,
        categoria: 'pizze',
        etichette: ['piccante'],
    },
    {
        nome: 'Ortolana di stagione',
        descrizione: 'Verdure dell\'orto di Budrio passate in griglia, stracciatella.',
        prezzo: 12,
        categoria: 'pizze',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Bufala e datterino giallo',
        descrizione: 'Datterino giallo del Vesuvio, bufala campana, basilico.',
        prezzo: 13,
        categoria: 'pizze',
        etichette: ['vegetariano', 'novità'],
    },
    {
        nome: 'Mortadella e pistacchio',
        descrizione: 'Mortadella Bologna IGP, crema di pistacchio di Bronte, stracciatella.',
        prezzo: 13,
        categoria: 'bianche',
    },
    {
        nome: 'Patate, rosmarino e scamorza',
        descrizione: 'Patate a fette sottili, scamorza affumicata, rosmarino del vaso fuori.',
        prezzo: 11,
        categoria: 'bianche',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Zucca e salsiccia',
        descrizione: 'Crema di zucca delle Valli, salsiccia di mora romagnola, provola.',
        prezzo: 13,
        categoria: 'bianche',
        etichette: ['novità'],
    },
    {
        nome: 'Crocchè di patate',
        descrizione: 'Quattro pezzi, fritti al momento. Aspettate cinque minuti, ne vale la pena.',
        prezzo: 6,
        categoria: 'antipasti',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Tagliere di mortadella e squacquerone',
        descrizione: 'Con tigelle calde. Da dividere in due, o in tre se siete educati.',
        prezzo: 12,
        categoria: 'antipasti',
    },
    {
        nome: 'Verdure del giorno in padella',
        descrizione: 'Quello che arriva la mattina dal mercato di via Ugo Bassi.',
        prezzo: 7,
        categoria: 'antipasti',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Tiramisù della casa',
        descrizione: 'Savoiardi fatti in casa, caffè della torrefazione di via Pratello.',
        prezzo: 6,
        categoria: 'dolci',
        etichette: ['vegetariano'],
    },
    {
        nome: 'Torta di riso',
        descrizione: 'La ricetta della nonna di Nerina, quella vera, con il liquore.',
        prezzo: 5,
        categoria: 'dolci',
        etichette: ['vegetariano'],
    },
];

export const orari = [
    { giorno: 'Lunedì', apertura: 'Chiuso' },
    { giorno: 'Martedì', apertura: '18:30 – 23:30' },
    { giorno: 'Mercoledì', apertura: '18:30 – 23:30' },
    { giorno: 'Giovedì', apertura: '18:30 – 23:30' },
    { giorno: 'Venerdì', apertura: '18:30 – 00:30' },
    { giorno: 'Sabato', apertura: '12:30 – 15:00 · 18:30 – 00:30' },
    { giorno: 'Domenica', apertura: '12:30 – 15:00 · 18:30 – 23:30' },
];

export const recensioni = [
    {
        testo: 'Ci siamo capitati per caso di martedì sera e da allora ci torniamo ogni due settimane. L\'impasto è leggero davvero, non quello che dicono tutti.',
        autore: 'Giulia M.',
        contesto: 'Bologna, da tre anni',
    },
    {
        testo: 'La mortadella e pistacchio è una cosa seria. E si prenota dal telefono in venti secondi, che di questi tempi non è scontato.',
        autore: 'Davide R.',
        contesto: 'Casalecchio',
    },
    {
        testo: 'Siamo andati in otto per un compleanno, ci hanno messo il tavolo lungo in fondo senza fare storie. Bambini compresi.',
        autore: 'Federica T.',
        contesto: 'San Lazzaro',
    },
];

export const numeri = [
    { valore: '1978', etichetta: 'Dall\'anno in cui il forno è stato acceso la prima volta' },
    { valore: '48 h', etichetta: 'Di lievitazione, contate una per una' },
    { valore: '40', etichetta: 'Coperti dentro, più il dehors da aprile' },
];

/** Domenica è 0 in JS, ma la settimana degli orari comincia di lunedì. */
export function orarioDiOggi() {
    const o = orari[(new Date().getDay() + 6) % 7];
    return { ...o, chiuso: o.apertura === 'Chiuso' };
}

export const ingredienti = [
    'Farina macinata a pietra',
    'Lievito madre',
    'San Marzano',
    'Fiordilatte di Agerola',
    'Olio nuovo',
    'Legna di faggio',
    'Sale di Cervia',
    'Basilico della mattina',
];

export const lievitazione = [
    {
        ora: 'Ora 0',
        titolo: 'Si impasta',
        testo: 'Acqua fredda, farina di grano tenero macinata a pietra, un pugno di madre tenuta viva da quarant\'anni. Nessun miglioratore: se l\'impasto viene male, viene male.',
    },
    {
        ora: 'Ora 2',
        titolo: 'Puntata',
        testo: 'La massa riposa coperta, a temperatura ambiente, finché non raddoppia. È l\'unico momento in cui si può ancora correggere qualcosa.',
    },
    {
        ora: 'Ora 6',
        titolo: 'In cella',
        testo: 'Quattro gradi, buio, quaranta ore. Qui non succede niente di visibile e succede tutto: è il freddo che rende la pizza leggera.',
    },
    {
        ora: 'Ora 46',
        titolo: 'Staglio',
        testo: 'Panetti da 260 grammi, pesati a mano uno per uno, rimessi a temperatura per l\'ultima ora.',
    },
    {
        ora: 'Ora 48',
        titolo: 'Nel forno',
        testo: 'Quattrocentocinquanta gradi, novanta secondi, una girata sola. Il resto lo fa la legna di faggio.',
    },
];
