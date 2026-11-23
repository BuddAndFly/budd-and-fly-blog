# Mettre le site en ligne (Cloudflare Pages + domaine OVH)

Deux étapes : d'abord une **adresse de test** pour relire, puis la **bascule de buddandfly.com** quand assez de guides sont validés. L'ancien site Lovable reste en ligne jusqu'à la bascule.

## Étape 1 — Adresse de test (à faire maintenant)

1. Créer un compte gratuit sur https://dash.cloudflare.com/sign-up.
2. Menu **Workers & Pages** → **Create** → onglet **Pages** → **Connect to Git**.
3. Autoriser GitHub et choisir le dépôt `BuddAndFly/budd-and-fly-blog`.
4. Réglages de compilation :
   - Production branch : `main`
   - Framework preset : `Astro`
   - Build command : `npm run build`
   - Build output directory : `dist`
5. **Environment variables** → section **Preview** uniquement : ajouter `SHOW_DRAFTS` = `true`.
   (Ainsi les brouillons sont visibles sur l'adresse de test, jamais en production.)
6. **Save and Deploy**.

Le site de relecture (branche `refonte-blog`) est alors visible sur
`https://refonte-blog.<nom-du-projet>.pages.dev`. Chaque envoi sur GitHub le met à jour en 1 à 2 minutes.
Ces adresses `pages.dev` ne sont pas indexées par Google (voir `public/_headers`).

## Étape 2 — Bascule de buddandfly.com (plus tard)

À faire quand au moins une vingtaine de guides sont validés et que les anciens articles du blog sont migrés, sinon des pages déjà indexées tomberaient en erreur.

1. Fusionner `refonte-blog` dans `main` (le site de production se met à jour).
2. **Transférer la gestion DNS de buddandfly.com chez Cloudflare** (gratuit) : c'est nécessaire pour faire pointer l'adresse sans « www ».
   - Dans Cloudflare : **Add a domain** → `buddandfly.com` → offre **Free**.
   - Cloudflare importe les enregistrements existants. **Vérifie que les enregistrements e-mail (MX, SPF, DKIM) sont bien là**, sinon les adresses @buddandfly.com cesseraient de fonctionner.
   - Cloudflare affiche deux serveurs de noms (ex. `xxx.ns.cloudflare.com`).
   - Dans l'espace client OVH : **Web Cloud** → **Noms de domaine** → `buddandfly.com` → onglet **Serveurs DNS** → **Modifier les serveurs DNS** → remplacer par les deux serveurs Cloudflare. La propagation prend de quelques minutes à 24 h.
3. Dans **Lovable**, retirer le domaine personnalisé buddandfly.com du projet.
4. Dans Cloudflare Pages → le projet → **Custom domains** → ajouter `buddandfly.com` puis `www.buddandfly.com`. Les enregistrements DNS et le certificat HTTPS sont créés automatiquement.
5. Dans **Google Search Console**, soumettre `https://buddandfly.com/sitemap-index.xml`.

## Redirections

Les anciennes adresses (guides pays, quiz, conseils…) sont redirigées en 301 par `public/_redirects`.
Le lien `/app` mène à l'application : le jour où elle est sur les stores, modifier sa ligne dans ce fichier.
