import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';

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
        ],
    },
];
