import { track as vercelTrack } from '@vercel/analytics';

type Primitive = string | number | boolean | null;

type EventMap = {
    lang_switch: { from: 'it' | 'en'; to: 'it' | 'en'; location: string };
    cta_contact_click: { source: string; locale: string };
    email_click: { source: string; locale: string };
    whatsapp_click: { source: string; locale: string };
    project_click: { slug: string; position: 'hero' | 'grid' | 'related'; locale: string };
    project_visit_external: { slug: string; locale: string };
    service_click: { slug: string; source: string; locale: string };
    blog_post_open: { slug: string; locale: string };
    blog_read_complete: { slug: string; seconds: number; locale: string };
    scroll_depth: { depth: 25 | 50 | 75 | 100; path: string };
    nav_click: { target: string; locale: string };
    social_click: { network: string; locale: string };
};

export function track<K extends keyof EventMap>(event: K, props: EventMap[K]): void {
    if (typeof window === 'undefined') return;
    vercelTrack(event, props as Record<string, Primitive>);
}
