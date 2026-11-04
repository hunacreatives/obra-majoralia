import sharp from 'sharp';
import { readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Grid thumbnails for every image referenced in src/mocks/projects.ts.
// Archive tiles render ~480px wide (4 columns), so 960px covers 2x screens;
// the originals are 2560–5760px and made the projects page stutter.
// Output mirrors the source path under public/images/thumbs/.
// Re-run after adding project images: npm run images:thumbs

const THUMB_WIDTH = 960;
const QUALITY = 78;

const mock = await readFile('./src/mocks/projects.ts', 'utf8');
const srcs = [...new Set(mock.match(/\/images\/[^'"\s]+\.(webp|jpe?g|png)/gi))];

let made = 0, skipped = 0, missing = 0;
for (const src of srcs) {
  const input = path.join('public', src);
  const output = path.join('public/images/thumbs', src.replace(/^\/images\//, '')).replace(/\.(jpe?g|png)$/i, '.webp');
  if (!existsSync(input)) { missing++; console.warn('missing', input); continue; }
  if (existsSync(output)) { skipped++; continue; }
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(input)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);
  made++;
}

// 1600px and 2400px copies of each cover for the homepage's wide images: a phone
// at 3x needs more than 960px, a retina desktop more than 1600px. Output under
// public/images/thumbs-1600/ and thumbs-2400/.
const covers = [...mock.matchAll(/imageUrl:\s*'([^']+)'/g)].map(m => m[1]);
for (const width of [1600, 2400]) {
  for (const src of new Set(covers)) {
    const input = path.join('public', src);
    const output = path.join(`public/images/thumbs-${width}`, src.replace(/^\/images\//, '')).replace(/\.(jpe?g|png)$/i, '.webp');
    if (!existsSync(input) || existsSync(output)) continue;
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);
    made++;
  }
}

// OBRAverse CTA band on /projects: a centre crop of the full 3840×6098 map
const ctaOut = 'public/images/obraverse/cta.webp';
if (!existsSync(ctaOut)) {
  await sharp('public/images/obraverse/base.webp')
    .resize({ width: 1920 })
    .extract({ left: 0, top: Math.round((3049 - 1400) / 2), width: 1920, height: 1400 })
    .webp({ quality: 78 })
    .toFile(ctaOut);
  made++;
}

console.log(`thumbs: ${made} made, ${skipped} already there, ${missing} missing`);
