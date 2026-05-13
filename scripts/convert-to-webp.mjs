/**
 * Converts all JPG/PNG images in public/images to WebP format.
 * Run once: node scripts/convert-to-webp.mjs
 * Requires: npm install sharp --save-dev
 *
 * WebP files are placed alongside originals (e.g. hero.jpg → hero.webp).
 * Originals are kept as fallback for older browsers.
 */

import { readdir } from 'fs/promises';
import { join, extname } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('sharp not found. Run: npm install sharp --save-dev');
  process.exit(1);
}

const IMAGES_DIR = './public/images';
const QUALITY = 82;

let converted = 0;
let skipped = 0;
let failed = 0;

async function convertDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await convertDir(fullPath);
      } else {
        const ext = extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          try {
            await sharp(fullPath).webp({ quality: QUALITY }).toFile(webpPath);
            process.stdout.write('.');
            converted++;
          } catch (e) {
            console.error(`\nFailed: ${fullPath} — ${e.message}`);
            failed++;
          }
        } else {
          skipped++;
        }
      }
    })
  );
}

console.log(`Converting images in ${IMAGES_DIR} to WebP (quality ${QUALITY})...`);
await convertDir(IMAGES_DIR);
console.log(`\n\nDone. Converted: ${converted} | Skipped: ${skipped} | Failed: ${failed}`);
