import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import ServicesIndex from './pages/ServicesIndex';
import ServicePage from './pages/ServicePage';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
import { projects } from './lib/projects';
import { services } from './lib/services';
import { posts } from './lib/blog';
import { SERVICE_EN_SLUG } from './lib/paths';

// Two trees with the same layout: Italian at the root, where the addresses Google already knows stay put,
// and English under /en. Static paths are relative to their tree: vite-react-ssg prefixes them with the
// parent's path, so "services/web-design" under /en is built as /en/services/web-design.
export const routes: RouteRecord[] = [
    {
        path: '/',
        element: <Layout />,
        entry: 'src/Layout.tsx',
        children: [
            { index: true, Component: Home },
            {
                path: 'projects/:slug',
                Component: ProjectPage,
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            { path: 'servizi', Component: ServicesIndex },
            {
                path: 'servizi/:slug',
                Component: ServicePage,
                getStaticPaths: () => services.map((s) => `servizi/${s.slug}`),
            },
            { path: 'blog', Component: BlogIndex },
            {
                path: 'blog/:slug',
                Component: BlogPost,
                getStaticPaths: () => posts.map((p) => `blog/${p.slug}`),
            },
            { path: 'chi-sono', Component: AboutPage },
            { path: 'contatti', Component: ContactPage },
            { path: 'privacy', Component: PrivacyPage },
            // Built as dist/404.html, which Vercel serves for addresses that don't exist.
            { path: '404', Component: NotFound },
            { path: '*', Component: NotFound },
        ],
    },
    {
        path: '/en',
        element: <Layout />,
        entry: 'src/Layout.tsx',
        children: [
            { index: true, Component: Home },
            { path: 'services', Component: ServicesIndex },
            {
                path: 'services/:slug',
                Component: ServicePage,
                getStaticPaths: () => Object.values(SERVICE_EN_SLUG).map((slug) => `services/${slug}`),
            },
            {
                path: 'projects/:slug',
                Component: ProjectPage,
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            { path: 'about', Component: AboutPage },
            { path: 'contact', Component: ContactPage },
            { path: 'privacy', Component: PrivacyPage },
            { path: '*', Component: NotFound },
        ],
    },
];
