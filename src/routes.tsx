import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import ServicesIndex from './pages/ServicesIndex';
import ServicePage from './pages/ServicePage';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import ProjectPage from './pages/ProjectPage';
import { projects } from './lib/projects';
import { services } from './lib/services';
import { posts } from './lib/blog';

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
                Component: ProjectPage,
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            {
                path: 'servizi',
                Component: ServicesIndex,
            },
            {
                path: 'servizi/:slug',
                Component: ServicePage,
                getStaticPaths: () => services.map((s) => `servizi/${s.slug}`),
            },
            {
                path: 'blog',
                Component: BlogIndex,
            },
            {
                path: 'blog/:slug',
                Component: BlogPost,
                getStaticPaths: () => posts.map((p) => `blog/${p.slug}`),
            },
            {
                path: 'contatti',
                Component: ContactPage,
            },
        ],
    },
];
