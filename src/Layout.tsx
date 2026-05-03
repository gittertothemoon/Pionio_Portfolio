import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';

export default function Layout() {
    return (
        <LanguageProvider>
            <Outlet />
            <Analytics />
        </LanguageProvider>
    );
}
