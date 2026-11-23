# Budd&Fly — guides de voyage

Site vitrine et blog de Budd&Fly : guides de voyage gratuits, vérifiés et téléchargeables en PDF A4, qui mènent vers l'application pour trouver avec qui partir.

Site statique construit avec [Astro](https://astro.build). Aucune base de données : tout le contenu est dans `src/content/`.

## Commandes

```bash
npm install
npm run dev        # aperçu local, brouillons visibles
npm run build      # site de production (guides validés seulement)
SHOW_DRAFTS=true npm run build   # aperçu de relecture avec les brouillons
```

## Où est quoi

| Dossier | Contenu |
|---|---|
| `src/content/destinations/*.json` | Un fichier par destination (pays ou territoire), avec ses villes |
| `src/content/articles/*.md` | Articles du blog |
| `src/content.config.ts` | Le schéma des guides : tout champ manquant bloque la compilation |
| `src/data/visa.ts` | Le Visa Budd&Fly : 10 questions, 6 jauges, 4 profils (même modèle que l'application) |
| `public/_redirects` | Redirections 301 des anciennes adresses du site |
| `docs/mise-en-ligne.md` | Mise en ligne sur Cloudflare Pages et bascule du domaine |
| `public/images/` | Photos, toutes sous licence libre et créditées |

## Règles de fiabilité

1. **Chaque information sensible a une source et une date.** Entrée, santé et sécurité viennent des pages Conseils aux voyageurs de France Diplomatie ; le champ `checkedAt` indique quand elles ont été vérifiées. Sans date, la page affiche « À vérifier ».
2. **Un guide n'est publié qu'après relecture humaine.** Les guides sont créés avec `"status": "brouillon"`. Pour publier : renseigner `author`, `reviewer`, les dates `checkedAt` (budget compris), puis passer `status` à `"valide"`. Les brouillons ne sont ni dans la version de production ni dans le plan du site.
3. **Photos** : uniquement des licences libres (CC0, CC BY, CC BY-SA, domaine public), avec auteur, licence et lien affichés.

## Lien vers l'application

Tous les liens passent par `/app`, redirigé dans `public/_redirects`. Le jour où l'application est sur les stores, on change cette seule ligne.
