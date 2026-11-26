import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Une information « sensible » (entrée, santé, sécurité, prix) porte toujours
 * sa source et la date à laquelle elle a été vérifiée. Sans date, elle est
 * affichée comme « à vérifier » et le guide ne peut pas passer en « validé ».
 */
const sourced = z.object({
  text: z.string(),
  points: z.array(z.string()).default([]),
  source: z.object({ label: z.string(), url: z.url() }),
  checkedAt: z.string().nullable().default(null),
});

const photo = z.object({
  src: z.string(),
  alt: z.string(),
  credit: z.object({ author: z.string(), license: z.string(), url: z.url().optional() }).nullable().default(null),
});

const profile = z.enum(['explorateur', 'energique', 'lent', 'stratege', 'tous']);

const city = z.object({
  slug: z.string(),
  name: z.string(),
  nights: z.string(),
  for: z.array(profile).min(1),
  summary: z.string(),
  photo: photo.optional(),
  sleep: z.string(),
  see: z.array(z.object({ name: z.string(), note: z.string() })).min(3),
  hidden: z.array(z.object({ name: z.string(), note: z.string() })).default([]),
  eat: z.string(),
  getAround: z.string(),
  tip: z.string().optional(),
});

const destinations = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/destinations' }),
  schema: z.object({
    name: z.string(),
    /** « au Japon », « en Italie », « aux États-Unis » : pour des phrases correctes. */
    prep: z.string(),
    kind: z.enum(['pays', 'territoire', 'region']).default('pays'),
    continent: z.enum(['Europe', 'Asie', 'Moyen-Orient', 'Afrique', 'Amérique du Nord', 'Amérique centrale et Caraïbes', 'Amérique du Sud', 'Océanie', 'Antarctique']),
    priority: z.number().int(),
    status: z.enum(['brouillon', 'valide']),
    updatedAt: z.string(),
    author: z.object({ name: z.string(), role: z.string() }).nullable().default(null),
    reviewer: z.object({ name: z.string(), date: z.string() }).nullable().default(null),
    seo: z.object({ title: z.string().max(65), description: z.string().max(160) }),
    hero: photo.nullable().default(null),
    /** La réponse directe, en haut de page : 2 ou 3 phrases. */
    summary: z.string(),
    essentials: z.object({
      bestPeriod: z.string(),
      languages: z.string(),
      currency: z.string(),
      timeDiff: z.string(),
      plugs: z.string(),
      emergency: z.string(),
      flight: z.string().optional(),
    }),
    /** 12 mois, de janvier à décembre. 2 = idéal, 1 = bien, 0 = à éviter si possible. */
    months: z.array(z.object({ rating: z.union([z.literal(0), z.literal(1), z.literal(2)]), note: z.string() })).length(12),
    budget: z.object({
      currencyNote: z.string(),
      rows: z.array(z.object({ label: z.string(), solo: z.string(), duo: z.string() })).min(3),
      totalSolo: z.string(),
      totalDuo: z.string(),
      note: z.string(),
      sources: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      checkedAt: z.string().nullable().default(null),
    }),
    entry: sourced,
    health: sourced,
    safety: sourced.nullable().default(null),
    cities: z.array(city).min(1),
    itineraries: z.array(z.object({
      days: z.number().int(),
      title: z.string(),
      for: z.array(profile).min(1),
      steps: z.array(z.object({ days: z.string(), place: z.string(), note: z.string() })).min(2),
    })).default([]),
    transport: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
    culture: z.array(z.string()).default([]),
    phrases: z.array(z.object({ fr: z.string(), local: z.string(), say: z.string().optional() })).default([]),
    checklist: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(65).optional(),
    description: z.string().max(160),
    category: z.enum(['Voyager seul', 'Partir à deux', 'Petits budgets', 'Préparer', 'Idées de voyage']),
    status: z.enum(['brouillon', 'valide']),
    publishedAt: z.string(),
    updatedAt: z.string(),
    author: z.object({ name: z.string(), role: z.string() }).nullable().default(null),
    hero: photo.nullable().default(null),
    destinations: z.array(z.string()).default([]),
  }),
});

export const collections = { destinations, articles };
