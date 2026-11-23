// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/redirects.mjs';

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
    }),
  ],
});
