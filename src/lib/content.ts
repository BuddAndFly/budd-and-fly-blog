import { getCollection, type CollectionEntry } from 'astro:content';
import { SHOW_DRAFTS } from '@/data/site';
import { PROFILES } from '@/data/visa';

export type Destination = CollectionEntry<'destinations'>;
export type Article = CollectionEntry<'articles'>;

/** Guides visibles : validés en production, tous en aperçu de relecture. */
export async function getDestinations() {
  const all = await getCollection('destinations');
  return all
    .filter((d) => SHOW_DRAFTS || d.data.status === 'valide')
    .sort((a, b) => a.data.priority - b.data.priority);
}

export async function getArticles() {
  const all = await getCollection('articles');
  return all
    .filter((a) => SHOW_DRAFTS || a.data.status === 'valide')
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));
}

export const isDraft = (e: { data: { status: string } }) => e.data.status !== 'valide';

export const profileLabel = (id: string) =>
  id === 'tous' ? 'Tous les profils' : (PROFILES as Record<string, { name: string }>)[id]?.name ?? id;

/** Une date ISO (2026-11-22) en français lisible. */
export function frDate(iso: string | null | undefined) {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Un guide n'est publiable que si toutes ses infos sensibles sont datées et qu'une personne l'a relu. */
export function missingChecks(d: Destination) {
  const missing: string[] = [];
  if (!d.data.entry.checkedAt) missing.push('Entrée et formalités');
  if (!d.data.health.checkedAt) missing.push('Santé');
  if (!d.data.safety.checkedAt) missing.push('Sécurité');
  if (!d.data.budget.checkedAt) missing.push('Budget');
  if (!d.data.author) missing.push('Auteur');
  if (!d.data.reviewer) missing.push('Relecture');
  return missing;
}
