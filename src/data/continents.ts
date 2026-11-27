/** Continents des guides : slug d'URL et préposition (« en Europe », « au Moyen-Orient »). */
export const CONTINENTS = [
  { name: 'Europe', slug: 'europe', in: 'en Europe' },
  { name: 'Asie', slug: 'asie', in: 'en Asie' },
  { name: 'Moyen-Orient', slug: 'moyen-orient', in: 'au Moyen-Orient' },
  { name: 'Afrique', slug: 'afrique', in: 'en Afrique' },
  { name: 'Amérique du Nord', slug: 'amerique-du-nord', in: 'en Amérique du Nord' },
  { name: 'Amérique centrale et Caraïbes', slug: 'amerique-centrale-et-caraibes', in: 'en Amérique centrale et aux Caraïbes' },
  { name: 'Amérique du Sud', slug: 'amerique-du-sud', in: 'en Amérique du Sud' },
  { name: 'Océanie', slug: 'oceanie', in: 'en Océanie' },
  { name: 'Antarctique', slug: 'antarctique', in: 'en Antarctique' },
] as const;

/** Une page continent n'existe qu'à partir de ce nombre de guides (pas de page trop mince). */
export const CONTINENT_MIN = 3;
export const continentOf = (name: string) => CONTINENTS.find((c) => c.name === name);
