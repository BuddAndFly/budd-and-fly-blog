export const SITE = {
  name: 'Budd&Fly',
  url: 'https://buddandfly.com',
  tagline: 'Guides de voyage gratuits et vérifiés',
  description:
    'Guides de voyage gratuits à télécharger en PDF : formalités vérifiées, meilleure saison, budget réel, villes et itinéraires. Et une application pour trouver avec qui partir.',
  /** Toujours passer par /app : la redirection se change à un seul endroit (astro.config.mjs). */
  appPath: '/app',
  locale: 'fr_FR',
} as const;

/**
 * Les brouillons sont visibles seulement quand SHOW_DRAFTS=true (aperçu de relecture).
 * En production, seuls les guides validés par une personne sont publiés et indexés.
 */
export const SHOW_DRAFTS = import.meta.env.DEV || import.meta.env.SHOW_DRAFTS === 'true';

export const MONTHS = [
  { slug: 'janvier', name: 'janvier', short: 'Jan' },
  { slug: 'fevrier', name: 'février', short: 'Fév' },
  { slug: 'mars', name: 'mars', short: 'Mar' },
  { slug: 'avril', name: 'avril', short: 'Avr' },
  { slug: 'mai', name: 'mai', short: 'Mai' },
  { slug: 'juin', name: 'juin', short: 'Juin' },
  { slug: 'juillet', name: 'juillet', short: 'Juil' },
  { slug: 'aout', name: 'août', short: 'Août' },
  { slug: 'septembre', name: 'septembre', short: 'Sep' },
  { slug: 'octobre', name: 'octobre', short: 'Oct' },
  { slug: 'novembre', name: 'novembre', short: 'Nov' },
  { slug: 'decembre', name: 'décembre', short: 'Déc' },
] as const;

/** « en avril », « en août » : préposition correcte devant le mois. */
export const inMonth = (i: number) => `en ${MONTHS[i]!.name}`;

export const RATING_LABEL = ['À éviter si possible', 'Bonne période', 'Période idéale'] as const;

export const NAV = [
  { label: 'Destinations', href: '/destinations/' },
  { label: 'Où partir', href: '/ou-partir/' },
  { label: 'Voyager seul', href: '/blog/categorie/voyager-seul/' },
  { label: 'Partir à deux', href: '/blog/categorie/partir-a-deux/' },
  { label: 'Préparer', href: '/preparer/' },
] as const;

export const CATEGORIES = [
  { name: 'Voyager seul', slug: 'voyager-seul' },
  { name: 'Partir à deux', slug: 'partir-a-deux' },
  { name: 'Petits budgets', slug: 'petits-budgets' },
  { name: 'Préparer', slug: 'preparer' },
  { name: 'Idées de voyage', slug: 'idees-de-voyage' },
] as const;
