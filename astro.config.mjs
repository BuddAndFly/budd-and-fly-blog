// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://buddandfly.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Les redirections (anciennes adresses, lien /app vers l'application) sont des
  // vraies redirections 301/302 gérées par l'hébergeur : voir public/_redirects.
  integrations: [
    sitemap({
      // Les versions imprimables et les pages techniques ne vont pas dans le plan du site.
      filter: (page) => !page.includes('/imprimer/') && !page.includes('/404'),
    }),
  ],
});
