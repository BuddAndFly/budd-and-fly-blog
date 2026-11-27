// Génère, pour chaque photo JPEG de public/images, deux versions WebP plus légères
// (400, 800 et 1600 px de large) utilisées par le composant Pic.astro. Lancé avant chaque build.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'public/images';
const WIDTHS = [400, 800, 1600];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.jpe?g$/i.test(e.name)) yield p;
  }
}

const isFresh = async (src, out) => {
  try { return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs; } catch { return false; }
};

let made = 0;
for await (const src of walk(ROOT)) {
  for (const w of WIDTHS) {
    const out = src.replace(/\.jpe?g$/i, `-${w}.webp`);
    if (await isFresh(src, out)) continue;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
    made++;
  }
}
console.log(`images : ${made} fichier(s) WebP générés`);
