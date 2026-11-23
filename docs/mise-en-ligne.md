# Mettre le site en ligne (Netlify + domaine OVH)

Tout le réglage technique est dans `netlify.toml` : il n'y a rien à configurer à la main dans Netlify.
L'ancien site Lovable reste en ligne jusqu'à la bascule de l'étape 3.

## Étape 1 — Mettre le site en ligne (5 minutes)

1. Aller sur https://app.netlify.com/signup et choisir **Sign up with GitHub**.
2. **Add new project** → **Import an existing project** → **GitHub**.
3. Autoriser Netlify sur l'organisation **BuddAndFly**, puis choisir le dépôt `budd-and-fly-blog`.
4. Netlify détecte tout seul les réglages (grâce à `netlify.toml`). Cliquer sur **Deploy**.

Le site est en ligne sur une adresse du type `https://nom-du-projet.netlify.app`.
Cette version publique n'affiche que les guides **validés**.

## Étape 2 — Adresse de relecture avec les brouillons

1. Dans le projet Netlify : **Project configuration** → **Build & deploy** → **Branches and deploy contexts** → **Configure**.
2. **Branch deploys** → **Let me add individual branches** → ajouter `refonte-blog` → **Save**.

La version de relecture est alors sur `https://refonte-blog--nom-du-projet.netlify.app` : tous les brouillons y sont visibles, et Google ne l'indexe pas.
Chaque envoi sur GitHub met les deux adresses à jour en 1 à 2 minutes.

## Étape 3 — Bascule de buddandfly.com (plus tard)

À faire quand au moins une vingtaine de guides sont validés et que les anciens articles du blog sont migrés, sinon des pages déjà indexées tomberaient en erreur.

1. Fusionner `refonte-blog` dans `main`.
2. Dans **Lovable**, retirer le domaine personnalisé buddandfly.com du projet.
3. Dans Netlify : **Domain management** → **Add a domain** → `buddandfly.com`. Netlify affiche les deux enregistrements DNS à créer (une adresse IP pour `buddandfly.com`, et un CNAME pour `www`).
4. Dans l'espace client OVH : **Web Cloud** → **Noms de domaine** → `buddandfly.com` → onglet **Zone DNS** :
   - supprimer les anciennes lignes **A** et **CNAME** qui pointaient vers Lovable (pour `buddandfly.com` et `www`) ;
   - ajouter les deux lignes données par Netlify ;
   - **ne pas toucher aux lignes MX, SPF ou DKIM** (e-mails).
5. Attendre la propagation (quelques minutes à quelques heures). Netlify active le HTTPS tout seul.
6. Dans **Google Search Console**, soumettre `https://buddandfly.com/sitemap-index.xml`.

## Redirections

Les anciennes adresses (guides pays, quiz, conseils…) sont redirigées en 301 par `public/_redirects`.
Le lien `/app` mène à l'application : le jour où elle est sur les stores, modifier sa ligne dans ce fichier.
