// Where the other Pionio things live. In development Sintetico runs on its own local dev server.
export const SINTETICO_URL = import.meta.env.DEV ? 'http://localhost:5180' : 'https://sintetico.pionio.it';
export const AUDIT_URL = 'https://audit.pionio.it';
