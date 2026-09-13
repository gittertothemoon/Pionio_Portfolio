// Who Pionio is, in one place. Everything that states a fact about Pionio (structured data, llms.txt,
// the sitemap, the timings quoted in the copy) reads it from here, so the facts can't drift apart again.
// No street address and no VAT number: Ivan works as a private person.

export const SITE_URL = 'https://pionio.it';

export const FACTS = {
    name: 'Pionio',
    founder: {
        name: 'Ivan Panto',
        photo: '/images/ivan.webp',
        role: { it: 'Designer, developer e image-maker', en: 'Designer, developer and image-maker' },
    },
    base: { city: 'Bologna', region: 'Emilia-Romagna', country: 'IT' },
    email: 'pionio.dev@gmail.com',
    replyWithinHours: 24,
    supportDays: 30,
    languages: ['it', 'en'],
    // Calendar weeks from the first call to launch. Shop and redesign are kept with margin on purpose,
    // and depend on how complex the job is (Ivan, 13/09/2026).
    weeks: {
        site: '2–4',
        shop: '3–5',
        redesign: '3–5',
        tool: '6–12',
    },
    profiles: [
        'https://www.instagram.com/pionio_dev',
        'https://github.com/gittertothemoon',
        'https://www.linkedin.com/in/ivan-panto/',
    ],
    sintetico: { url: 'https://sintetico.pionio.it/', instagram: 'https://www.instagram.com/sintetico.lab' },
    audit: { url: 'https://audit.pionio.it/' },
    oneLiner: {
        it: 'Pionio è lo studio di Ivan Panto, a Bologna: siti web, immagini sintetiche con Sintetico e piccoli strumenti per il web. Una persona sola, dal disegno al codice.',
        en: "Pionio is Ivan Panto's one-person studio in Bologna, Italy: websites, synthetic images with Sintetico and small tools for the web. One person, from the drawing to the code.",
    },
} as const;
