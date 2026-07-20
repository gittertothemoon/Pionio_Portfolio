import type { Locale } from './i18n';

export const WHATSAPP_NUMBER = '393486584933';
export const WHATSAPP_DISPLAY_NUMBER = '+39 348 658 4933';

const messages: Record<Locale, string> = {
    it: 'Ciao Ivan, ho visto il sito Pionio e vorrei chiederti qualche informazione sul mio progetto.',
    en: "Hi Ivan, I found Pionio and I'd like some information about my project.",
};

export function getWhatsAppUrl(locale: Locale): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[locale])}`;
}
