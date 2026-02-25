import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { dict } from '../lib/i18n';
import type { Locale } from '../lib/i18n';

interface LanguageContextProps {
    locale: Locale;
    setLocale: (lang: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Try to read from local storage or default to English
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pionio-locale') as Locale;
            if (saved === 'it' || saved === 'en') return saved;
        }
        return 'en';
    });

    const setLocale = (lang: Locale) => {
        setLocaleState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('pionio-locale', lang);
            document.documentElement.lang = lang;
        }
    };

    const t = (key: string): string => {
        if (!dict[key]) {
            console.warn(`Translation key not found: ${key}`);
            return key; // Fallback to key itself if missing
        }
        return dict[key][locale] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
