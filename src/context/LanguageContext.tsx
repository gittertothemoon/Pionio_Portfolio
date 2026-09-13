/* eslint-disable react-refresh/only-export-components -- provider + useLanguage hook share one module */
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { dict } from '../lib/i18n';
import type { Locale } from '../lib/i18n';
import { localeFromPath } from '../lib/paths';

interface LanguageContextProps {
    locale: Locale;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // The language comes from the address: /en/... is English, everything else is Italian. The build and
    // the browser read the same URL, so they render the same language, and search engines find each
    // language at its own address. Nothing is guessed from the browser any more: a visitor whose browser
    // speaks the other language gets a small hint (LanguageHint), never a redirect.
    const { pathname } = useLocation();
    const locale = localeFromPath(pathname);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const t = (key: string): string => {
        if (!dict[key]) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
        return dict[key][locale] || key;
    };

    return <LanguageContext.Provider value={{ locale, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
