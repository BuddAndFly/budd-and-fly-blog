# Mettre le site en ligne avec GitHub Pages (domaine OVH)

Le site est compilé et publié automatiquement par GitHub (fichier `.github/workflows/deploy.yml`) à chaque envoi sur la branche `main`.
L'ancien site Lovable reste en ligne sur buddandfly.com jusqu'à la bascule de l'étape 3.

## Étape 1 — Activer GitHub Pages (2 minutes)

1. Sur GitHub, ouvrir le dépôt `BuddAndFly/budd-and-fly-blog` → **Settings** → **Pages** (menu de gauche).
2. **Build and deployment** → **Source** : choisir **GitHub Actions**.
3. Onglet **Actions** du dépôt → **Publier le site** → **Run workflow** (ou attendre le prochain envoi).

> GitHub Pages est gratuit pour un dépôt **public**. Pour un dépôt **privé**, il faut l'offre GitHub Team de l'organisation (payante). Sinon, rendre le dépôt public : **Settings** → **General** → **Danger Zone** → **Change visibility**.

## Étape 2 — Adresse de relecture : nouveau.buddandfly.com

Pendant la relecture, le site est publié sur un sous-domaine, sans toucher au site actuel.

1. Chez **OVH** : **Web Cloud** → **Noms de domaine** → `buddandfly.com` → onglet **Zone DNS** → **Ajouter une entrée** → **CNAME** :
   - sous-domaine : `nouveau`
   - cible : `buddandfly.github.io.` (avec le point final)
2. Sur GitHub : **Settings** → **Pages** → **Custom domain** : `nouveau.buddandfly.com` → **Save**, puis cocher **Enforce HTTPS** dès que c'est possible (quelques minutes à quelques heures).

Pendant cette phase, les brouillons sont visibles et toutes les pages sont en « noindex » : Google ne les indexe pas.

## Étape 3 — Bascule de buddandfly.com (plus tard)

À faire quand au moins une vingtaine de guides sont validés et que les anciens articles du blog sont migrés.

1. Dans `.github/workflows/deploy.yml`, passer `SHOW_DRAFTS` et `NOINDEX` à `"false"`.
2. Dans **Lovable**, retirer le domaine personnalisé buddandfly.com du projet.
3. Chez **OVH**, onglet **Zone DNS** :
   - supprimer les anciennes lignes **A** et **CNAME** de `buddandfly.com` et `www` qui pointent vers Lovable ;
   - ajouter 4 lignes **A** pour `buddandfly.com` (sous-domaine vide) : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ;
   - ajouter une ligne **CNAME** `www` → `buddandfly.github.io.` ;
   - **ne pas toucher aux lignes MX, SPF ou DKIM** (e-mails).
4. Sur GitHub : **Settings** → **Pages** → **Custom domain** : `buddandfly.com` → **Save**, puis **Enforce HTTPS**.
5. Dans **Google Search Console**, soumettre `https://buddandfly.com/sitemap-index.xml`.

Vérifier les adresses IP de GitHub Pages dans la documentation officielle au moment de la bascule : https://docs.github.com/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Redirections

Les anciennes adresses (guides pays, quiz, conseils…) sont redirigées vers les nouvelles pages par `src/data/redirects.mjs`.
Le lien `/app` mène à l'application : le jour où elle est sur les stores, modifier `APP_URL` dans `astro.config.mjs`.
