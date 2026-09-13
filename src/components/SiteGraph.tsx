import { Head } from 'vite-react-ssg';
import { useLanguage } from '../context/LanguageContext';
import { siteGraph } from '../lib/graph';

// The site-wide structured data (Pionio, Ivan, Sintetico, Audit), in the language of the page.
export function SiteGraph() {
    const { locale } = useLanguage();
    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(siteGraph(locale))}</script>
        </Head>
    );
}
