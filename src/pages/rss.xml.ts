import type { APIRoute } from 'astro';
import { getArticles } from '@/lib/content';
import { SITE } from '@/data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const posts = (await getArticles()).sort((a, b) => b.data.updatedAt.localeCompare(a.data.updatedAt));
  const items = posts.map((a) => {
    const url = new URL(`/blog/${a.id}/`, SITE.url).href;
    return `<item><title>${esc(a.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(a.data.description)}</description><category>${esc(a.data.category)}</category><pubDate>${new Date(`${a.data.publishedAt}T08:00:00Z`).toUTCString()}</pubDate></item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Budd&amp;Fly : le blog</title><link>${SITE.url}/blog/</link><description>${esc(SITE.description)}</description><language>fr-FR</language>${items.join('')}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
