// Redirections des adresses de l'ancien site (Lovable) vers le nouveau.
// Objectif : ne perdre aucune page déjà indexée par Google.

/** Les 61 guides pays de l'ancien site (même identifiant dans le nouveau). */
export const LEGACY_COUNTRY_SLUGS = [
  'france', 'italie', 'espagne', 'portugal', 'grece', 'croatie', 'islande', 'norvege',
  'royaume-uni', 'allemagne', 'pays-bas', 'irlande', 'suisse', 'autriche', 'republique-tcheque',
  'japon', 'thailande', 'vietnam', 'indonesie', 'inde', 'chine', 'coree-du-sud', 'singapour',
  'malaisie', 'philippines', 'cambodge', 'laos', 'sri-lanka', 'nepal', 'taiwan', 'etats-unis',
  'canada', 'mexique', 'cuba', 'costa-rica', 'republique-dominicaine', 'guatemala', 'panama',
  'perou', 'bresil', 'argentine', 'chili', 'colombie', 'bolivie', 'equateur', 'maroc', 'tunisie',
  'egypte', 'afrique-du-sud', 'kenya', 'tanzanie', 'senegal', 'ile-maurice', 'madagascar',
  'namibie', 'australie', 'nouvelle-zelande', 'emirats-arabes-unis', 'jordanie', 'turquie',
  'antarctique',
];

const OLD_LANGS = ['en', 'es', 'it', 'zh'];
const OLD_TOPICS = { 'quand-partir': 'quand-partir', budget: 'budget', visa: 'formalites' };

/** @type {Record<string, string>} */
export const legacyRedirects = {
  '/pays': '/destinations/',
  '/recherche': '/destinations/',
  '/quiz': '/visa-voyageur/',
  '/rejoindre': '/app',
  '/checklist': '/preparer/',
  '/checklist-sur-mesure': '/preparer/',
  '/faq': '/a-propos/',
  '/mon-inscription': '/app',
  '/conseils': '/blog/',
  '/conseils/ou-partir': '/ou-partir/',
  '/conseils/budget-voyage': '/preparer/',
  '/conseils/visa-et-formalites': '/preparer/',
  '/conseils/avec-qui-partir': '/blog/',
  '/conseils/rythme-et-bien-etre': '/blog/',
  '/conseils/outils-voyage': '/preparer/',
  '/guide/guide-lisbonne': '/destinations/portugal/lisbonne/',
  '/guide/guide-tokyo': '/destinations/japon/tokyo/',
  '/guide/guide-marrakech': '/destinations/maroc/marrakech/',
  '/profil-voyageur/explorateur': '/visa-voyageur/',
  '/profil-voyageur/curieux': '/visa-voyageur/',
  '/profil-voyageur/connecteur': '/visa-voyageur/',
  '/profil-voyageur/contemplatif': '/visa-voyageur/',
  '/showcase/quiz': '/visa-voyageur/',
  '/showcase/profils': '/visa-voyageur/',
  '/showcase/matching': '/app',
};

// Anciennes pages pays dont le guide n'est pas encore rédigé (sources officielles
// à compléter) : on renvoie vers la liste des destinations plutôt que vers une 404.
const PENDING_GUIDES = new Set([]);

for (const slug of LEGACY_COUNTRY_SLUGS) {
  const target = PENDING_GUIDES.has(slug) ? '/destinations/' : `/destinations/${slug}/`;
  legacyRedirects[`/guide-pays/${slug}`] = target;
  for (const lang of OLD_LANGS) {
    legacyRedirects[`/guide-pays/${slug}/${lang}`] = target;
  }
  for (const [oldTopic, anchor] of Object.entries(OLD_TOPICS)) {
    legacyRedirects[`/pays/${slug}/${oldTopic}`] = PENDING_GUIDES.has(slug) ? target : `${target}#${anchor}`;
  }
}
