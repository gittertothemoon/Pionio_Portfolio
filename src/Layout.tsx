import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import { NavBar } from './components/NavBar';
import { ScrollToTop } from './components/ScrollToTop';

export default function Layout() {
    return (
        <LanguageProvider>
            <ScrollToTop />
            <Outlet />
            <NavBar />
            <Analytics />
        </LanguageProvider>
    );
}
