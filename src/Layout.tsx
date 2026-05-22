import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { NavBar } from './components/NavBar';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollDepthTracker } from './components/ScrollDepthTracker';

export default function Layout() {
    return (
        <LanguageProvider>
            <LazyMotion features={domAnimation} strict>
                <ScrollToTop />
                <ScrollDepthTracker />
                <Outlet />
                <NavBar />
                <Analytics />
                <SpeedInsights />
            </LazyMotion>
        </LanguageProvider>
    );
}
