// Where the other Pionio things live. In development Sintetico runs on its own local dev server.
// Sintetico non e' ancora online: in sviluppo punta al suo dev server, in produzione resta vuoto
// finche' sintetico.pionio.it non esiste, e i due bottoni diventano l'etichetta "Apre presto".
export const SINTETICO_URL = import.meta.env.DEV ? 'http://localhost:5180' : '';
export const AUDIT_URL = 'https://audit.pionio.it';
