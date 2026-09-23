import type { ComponentType } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import { projects } from './lib/projects';
import { postsEn } from './lib/blog-en';
import { services } from './lib/services';
import { posts } from './lib/blog';
import { SERVICE_EN_SLUG } from './lib/paths';

// Every page but the home arrives on its own when it's opened: someone landing on the home no longer
// downloads the blog, the privacy policy and the service pages too. The home stays in the main bundle
// because it's where most visits start. vite-react-ssg still pre-renders all of them at build time, and it finds
// each page's files by reading the import() written inside `lazy`: keep the import there, not in a helper.
const asRoute = (m: { default: ComponentType }) => ({ Component: m.default });

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
                lazy: () => import('./pages/ProjectPage').then(asRoute),
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            { path: 'servizi', lazy: () => import('./pages/ServicesIndex').then(asRoute) },
            {
                path: 'servizi/:slug',
                lazy: () => import('./pages/ServicePage').then(asRoute),
                getStaticPaths: () => services.map((s) => `servizi/${s.slug}`),
            },
            { path: 'blog', lazy: () => import('./pages/BlogIndex').then(asRoute) },
            {
                path: 'blog/:slug',
                lazy: () => import('./pages/BlogPost').then(asRoute),
                getStaticPaths: () => posts.map((p) => `blog/${p.slug}`),
            },
            { path: 'chi-sono', lazy: () => import('./pages/AboutPage').then(asRoute) },
            { path: 'contatti', lazy: () => import('./pages/ContactPage').then(asRoute) },
            { path: 'privacy', lazy: () => import('./pages/PrivacyPage').then(asRoute) },
            // Built as dist/404.html, which Vercel serves for addresses that don't exist.
            { path: '404', lazy: () => import('./pages/NotFound').then(asRoute) },
            { path: '*', lazy: () => import('./pages/NotFound').then(asRoute) },
        ],
    },
    {
        path: '/en',
        element: <Layout />,
        entry: 'src/Layout.tsx',
        children: [
            { index: true, Component: Home },
            { path: 'services', lazy: () => import('./pages/ServicesIndex').then(asRoute) },
            {
                path: 'services/:slug',
                lazy: () => import('./pages/ServicePage').then(asRoute),
                getStaticPaths: () => Object.values(SERVICE_EN_SLUG).map((slug) => `services/${slug}`),
            },
            {
                path: 'projects/:slug',
                lazy: () => import('./pages/ProjectPage').then(asRoute),
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            { path: 'blog', lazy: () => import('./pages/BlogIndex').then(asRoute) },
            {
                path: 'blog/:slug',
                lazy: () => import('./pages/BlogPost').then(asRoute),
                getStaticPaths: () => postsEn.map((p) => `blog/${p.slug}`),
            },
            { path: 'about', lazy: () => import('./pages/AboutPage').then(asRoute) },
            { path: 'contact', lazy: () => import('./pages/ContactPage').then(asRoute) },
            { path: 'privacy', lazy: () => import('./pages/PrivacyPage').then(asRoute) },
            { path: '*', lazy: () => import('./pages/NotFound').then(asRoute) },
        ],
    },
];
