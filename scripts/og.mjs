// Génère pour chaque guide une image de partage (1200×630, réseaux sociaux et aperçus)
// et une épingle verticale (1000×1500, Pinterest) : photo du guide + « Guide PDF gratuit ».
// Sortie dans public/og/ (non versionnée), régénérée seulement si la photo ou le guide change.
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const OUT = 'public/og';
const FONTS = [
  'node_modules/@expo-google-fonts/dm-serif-display/400Regular/DMSerifDisplay_400Regular.ttf',
  'node_modules/@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf',
  'node_modules/@expo-google-fonts/plus-jakarta-sans/800ExtraBold/PlusJakartaSans_800ExtraBold.ttf',
];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Coupe le nom du pays en lignes d'environ `max` caractères.
function lines(text, max) {
  const out = [];
  let cur = '';
  // Coupe aussi après les tirets (Saint-Vincent-et-les-Grenadines) : le tiret reste en fin de ligne.
  for (const w of text.split(/\s+|(?<=-)/)) {
    const sep = cur.endsWith('-') ? '' : ' ';
    if (cur && (cur + sep + w).length > max) { out.push(cur); cur = w; } else cur = cur ? cur + sep + w : w;
  }
  if (cur) out.push(cur);
  return out;
}

function overlay({ W, H, name, sub, size, max, padX, bottom, k = 1 }) {
  const ls = lines(name, max);
  // Taille du titre : réduite si plusieurs lignes, et jamais plus large que l'image (≈0,5 em par caractère).
  const longest = Math.max(...ls.map((l) => l.length));
  const fs = Math.min(ls.length > 1 ? Math.round(size * 0.82) : size, Math.floor((W - 2 * padX) / (longest * 0.5)));
  const lh = Math.round(fs * 1.05);
  const titleTop = H - bottom - lh * (ls.length - 1);
  const badgeY = titleTop - fs - 46 * k;
  const badge = 'GUIDE PDF GRATUIT';
  const bw = (44 + badge.length * 15.5) * k;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.45" stop-color="#000" stop-opacity="0.15"/><stop offset="1" stop-color="#000" stop-opacity="0.78"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="${padX}" y="${badgeY}" width="${bw}" height="${48 * k}" rx="${24 * k}" fill="#1f6b3f"/>
  <text x="${padX + 22 * k}" y="${badgeY + 32 * k}" font-family="Plus Jakarta Sans" font-weight="800" font-size="${22 * k}" letter-spacing="${2 * k}" fill="#fff">${badge}</text>
  ${ls.map((l, i) => `<text x="${padX}" y="${titleTop + i * lh}" font-family="DM Serif Display" font-size="${fs}" fill="#fff">${esc(l)}</text>`).join('\n  ')}
  <text x="${padX}" y="${H - bottom + 58 * k}" font-family="Plus Jakarta Sans" font-weight="700" font-size="${28 * k}" fill="#fff" fill-opacity="0.92">${esc(sub)}</text>
  <text x="${W - padX}" y="${70 * k}" text-anchor="end" font-family="Plus Jakarta Sans" font-weight="800" font-size="${30 * k}" fill="#fff">Budd&amp;Fly</text>
</svg>`;
}

const render = (svg) => new Resvg(svg, { font: { fontFiles: FONTS, loadSystemFonts: false } }).render().asPng();
// Fraîcheur par empreinte (et non par date) : le cache CI de public/og reste valable après un checkout.
const SCRIPT = await readFile('scripts/og.mjs');
const HASHES = join(OUT, 'hashes.json');
await mkdir(OUT, { recursive: true });
let hashes = {};
try { hashes = JSON.parse(await readFile(HASHES, 'utf8')); } catch {}
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };
let made = 0;
for (const f of await readdir('src/content/destinations')) {
  if (!f.endsWith('.json')) continue;
  const slug = f.slice(0, -5);
  const g = JSON.parse(await readFile(join('src/content/destinations', f), 'utf8'));
  if (!g.hero) continue;
  const photo = join('public', g.hero.src);
  const h = createHash('sha1').update(SCRIPT).update(g.name).update(await readFile(photo)).digest('hex');
  const formats = [
    { file: `${slug}.jpg`, W: 1200, H: 630, size: 110, max: 18, padX: 64, bottom: 110, sub: 'Formalités · meilleure saison · itinéraires' },
    { file: `${slug}-pin.jpg`, W: 1000, H: 1500, size: 170, max: 11, padX: 64, bottom: 230, k: 1.5, sub: 'Formalités · saison · itinéraires' },
  ];
  for (const o of formats) {
    const out = join(OUT, o.file);
    if (hashes[o.file] === h && (await exists(out))) continue;
    const bg = await sharp(photo).resize(o.W, o.H, { fit: 'cover', position: 'attention' }).toBuffer();
    await sharp(bg).composite([{ input: render(overlay({ ...o, name: g.name })) }]).jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(out);
    hashes[o.file] = h;
    made++;
  }
}
await writeFile(HASHES, JSON.stringify(hashes));
console.log(`Images de partage : ${made} générées`);
