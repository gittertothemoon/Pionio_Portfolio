# Pionio — Siti demo

Siti dimostrativi realizzati da [Pionio](https://pionio.it) per mostrare, a chi
un sito non ce l'ha ancora, come potrebbe essere il suo.

> **Tutte le attività qui dentro sono inventate.** Nomi, indirizzi, prezzi,
> recensioni e persone sono fittizi e servono solo a rendere leggibile la demo.
> Nessuna di queste è un cliente reale di Pionio. Ogni sito lo dichiara a
> schermo, in cima a ogni pagina.

## Siti

| Cartella | Settore | Attività (fittizia) |
| --- | --- | --- |
| `sites/pizzeria-mezzaluna` | Ristorazione | Pizzeria Mezzaluna, Bologna |
| `sites/studio-bertani` | Studio professionale | Studio Legale Bertani & Associati, Bologna |

## Stack

Lo stesso di casa Pionio, così una demo può diventare la base di un lavoro vero:
React 19 + TypeScript, Vite 7, Tailwind CSS v4, `framer-motion` dietro
`LazyMotion` e `lenis` per lo scorrimento smorzato. Nessun backend: i form
mostrano la conferma lato client e non inviano nulla.

I caratteri sono self-hostati (`public/fonts`, `src/caratteri.css`): niente
richieste a Google, niente salto di layout, niente grana GDPR da spiegare a un
cliente italiano. Niente foto di repertorio: le immagini sono disegnate a
codice — braci su canvas e dischi generativi per la pizzeria, rosette guilloché
per lo studio — e ogni sito dice dove andranno gli scatti veri.

Tutte le pagine sono in `noindex`: un'attività che non esiste non deve finire
nei risultati di ricerca.

## Sviluppo

Ogni sito è un progetto indipendente, con il suo `package.json`.

```bash
cd sites/pizzeria-mezzaluna
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Deploy

Un progetto Vercel per sito, puntando allo stesso repo e cambiando la
**Root Directory**:

| Progetto Vercel | Root Directory |
| --- | --- |
| `demo-pizzeria` | `sites/pizzeria-mezzaluna` |
| `demo-studio-legale` | `sites/studio-bertani` |
