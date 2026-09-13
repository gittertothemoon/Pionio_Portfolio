import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { llmsTxt, sitemapXml } from './src/lib/seo-files'

// vite-react-ssg reads `ssgOptions` from this config, but Vite's own types don't know the field: the
// assertion below lets it through the type check without loosening anything else.
const config = {
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    // The sitemap and llms.txt are written after the pages, from the same data (facts, prices, services,
    // posts, projects), so they can't fall behind the site.
    async onFinished(dir: string) {
      await writeFile(join(dir, 'sitemap.xml'), sitemapXml())
      await writeFile(join(dir, 'llms.txt'), llmsTxt())
    },
  },
}

// https://vite.dev/config/
export default defineConfig(config as UserConfig)
