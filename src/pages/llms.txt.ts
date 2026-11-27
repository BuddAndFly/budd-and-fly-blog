import type { APIRoute } from 'astro';
import { getArticles, getDestinations } from '@/lib/content';
import { SITE } from '@/data/site';

// Résumé du site pour les assistants IA (convention llms.txt) : quoi, pour qui, sources, et toutes les pages utiles.
export const GET: APIRoute = async () => {
  const dests = (await getDestinations()).sort((a, b) => a.data.name.localeCompare(b.data.name, 'fr'));
  const posts = (await getArticles()).sort((a, b) => a.data.title.localeCompare(b.data.title, 'fr'));
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Budd&Fly publie ${dests.length} guides de voyage gratuits en français, téléchargeables en PDF A4. Les formalités d'entrée, la santé et la sécurité sont résumées à partir de sources officielles (France Diplomatie, Institut Pasteur, Service-Public) et datées ; aucune information n'est inventée : quand une donnée n'est pas confirmée par une source, elle est omise. Chaque guide donne la meilleure période mois par mois, les villes et étapes, des itinéraires par profil de voyageur et une FAQ.`,
    `Le site est édité par BUDDANDFLY (Nice, France), qui développe aussi l'application Budd&Fly pour trouver des compagnons de voyage compatibles.`,
    '',
    '## Pages principales',
    `- [Toutes les destinations](${SITE.url}/destinations/) : les ${dests.length} guides par continent`,
    `- [Où partir mois par mois](${SITE.url}/ou-partir/) : les destinations idéales pour chaque mois`,
    `- [Visa voyageur](${SITE.url}/visa-voyageur/) : test gratuit en 10 questions pour connaître son profil de voyageur`,
    `- [Blog](${SITE.url}/blog/) : conseils pour voyager seul, à deux, petit budget, préparer son voyage`,
    `- [Méthode et sources](${SITE.url}/a-propos/)`,
    '',
    '## Guides de voyage',
    ...dests.map((d) => `- [Guide ${d.data.name}](${SITE.url}/destinations/${d.id}/) : ${d.data.seo.description}`),
    '',
    '## Articles',
    ...posts.map((a) => `- [${a.data.title}](${SITE.url}/blog/${a.id}/) : ${a.data.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
