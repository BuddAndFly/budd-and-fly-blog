// Signale aux moteurs compatibles IndexNow (Bing, Yandex, Seznam, Naver…) les pages modifiées récemment.
// Lancé après chaque déploiement. Usage : node scripts/indexnow.mjs [jours=3]  (0 = toutes les pages)
const KEY = '898f41ee8b14c73f06e13f74a82714e3';
const HOST = 'buddandfly.com';
const days = Number(process.argv[2] ?? 3);

const xml = async (u) => (await fetch(u)).text();
const index = await xml(`https://${HOST}/sitemap-index.xml`);
const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const since = Date.now() - days * 86400000;
const urls = [];
for (const m of maps) {
  for (const [, block] of (await xml(m)).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const mod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (loc && (days === 0 || !mod || Date.parse(mod) >= since)) urls.push(loc);
  }
}
if (!urls.length) { console.log('IndexNow : aucune page récente.'); process.exit(0); }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow : ${urls.length} URL envoyées, réponse ${res.status}`);
