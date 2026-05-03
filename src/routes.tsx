import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import ServicesIndex from './pages/ServicesIndex';
import BlogIndex from './pages/BlogIndex';
import ContactPage from './pages/ContactPage';

export const routes: RouteRecord[] = [
    {
        path: '/',
        element: <Layout />,
        entry: 'src/Layout.tsx',
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'projects/:slug',
                lazy: () => import('./pages/ProjectPage'),
            },
            {
                path: 'servizi',
                Component: ServicesIndex,
            },
            {
                path: 'servizi/:slug',
                lazy: () => import('./pages/ServicePage'),
            },
            {
                path: 'blog',
                Component: BlogIndex,
            },
            {
                path: 'blog/:slug',
                lazy: () => import('./pages/BlogPost'),
            },
            {
                path: 'contatti',
                Component: ContactPage,
            },
        ],
    },
];
