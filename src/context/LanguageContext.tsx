/* eslint-disable react-refresh/only-export-components -- provider + useLanguage hook share one module */
import { createContext, useContext, useEffect, useState } from 'react';
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
    // The pre-rendered HTML is Italian, so hydration starts in Italian (starting in English made
    // React throw away the server markup, error #418). Right after, the saved choice or the
    // browser language takes over: anyone whose browser isn't Italian gets English.
    const [locale, setLocaleState] = useState<Locale>('it');
    useEffect(() => {
        const saved = localStorage.getItem('pionio-locale');
        if (saved === 'it' || saved === 'en') {
            setLocaleState(saved);
            return;
        }
        const nav = navigator.language?.toLowerCase() ?? '';
        setLocaleState(nav.startsWith('it') ? 'it' : 'en');
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = locale;
        }
    }, [locale]);

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
