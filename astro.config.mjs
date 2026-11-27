// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/redirects.mjs';
import { readFileSync, readdirSync } from 'node:fs';

// Date de dernière mise à jour de chaque guide et article, pour le plan du site (lastmod).
const lastmod = new Map();
for (const f of readdirSync('./src/content/destinations')) {
  const d = JSON.parse(readFileSync(`./src/content/destinations/${f}`, 'utf8'));
  lastmod.set(`/destinations/${f.replace(/\.json$/, '')}/`, d.updatedAt);
}
for (const f of readdirSync('./src/content/articles')) {
  const m = readFileSync(`./src/content/articles/${f}`, 'utf8').match(/^updatedAt: "?([0-9-]+)"?/m);
  if (m) lastmod.set(`/blog/${f.replace(/\.md$/, '')}/`, m[1]);
}

const APP_URL = 'https://buddandfly.expo.app/';

export default defineConfig({
  site: 'https://buddandfly.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    // Une seule adresse de sortie vers l'application : on la change ici le jour
    // où l'application est sur les stores, sans toucher aux liens du site.
    '/app': APP_URL,
    ...legacyRedirects,
  },
  integrations: [
    sitemap({
      // Les versions imprimables et les pages techniques ne vont pas dans le plan du site.
      filter: (page) => !page.includes('/imprimer/') && !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const date = lastmod.get(path) ?? lastmod.get(path.split('/').slice(0, 3).join('/') + '/');
        if (date) item.lastmod = new Date(`${date}T12:00:00Z`).toISOString();
        return item;
      },
    }),
  ],
});
