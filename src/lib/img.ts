import { existsSync } from 'node:fs';

/** srcset WebP 800/1600 px d'une photo JPEG de public/images, s'ils ont été générés (scripts/images.mjs). */
export function webpSet(src: string | undefined | null): string | undefined {
  if (!src || !/\.jpe?g$/i.test(src)) return undefined;
  const base = src.replace(/\.jpe?g$/i, '');
  return existsSync(`public${base}-800.webp`) && existsSync(`public${base}-1600.webp`)
    ? `${base}-800.webp 800w, ${base}-1600.webp 1600w`
    : undefined;
}
