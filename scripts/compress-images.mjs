import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';
const QUALITY = 80;
const TEMP_SUFFIX = '.tmp.webp';

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const allFiles = await getAllFiles(IMAGES_DIR);

  const webpFiles = allFiles.filter(f => f.endsWith('.webp'));
  const jpgFiles = allFiles.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  const pngFiles = allFiles.filter(f => f.endsWith('.png'));
  const sourceFiles = [...jpgFiles, ...pngFiles];

  // Step 1: Find and delete duplicates (jpg/png where webp exists)
  console.log('\n--- Step 1: Removing duplicate source files where .webp exists ---');
  let deletedCount = 0;
  let deletedSize = 0;
  for (const src of sourceFiles) {
    const base = src.replace(/\.(jpg|jpeg|png)$/, '');
    const webpPath = base + '.webp';
    if (existsSync(webpPath)) {
      const info = await stat(src);
      deletedSize += info.size;
      await unlink(src);
      deletedCount++;
      process.stdout.write(`\rDeleted ${deletedCount} files...`);
    }
  }
  console.log(`\nDeleted ${deletedCount} duplicate files, freed ${(deletedSize / 1024 / 1024).toFixed(1)} MB`);

  // Step 2: Convert remaining jpg/png (no webp counterpart) to webp
  console.log('\n--- Step 2: Converting remaining jpg/png to webp ---');
  const remainingSourceFiles = (await getAllFiles(IMAGES_DIR)).filter(f =>
    f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
  );
  let convertedCount = 0;
  for (const src of remainingSourceFiles) {
    const base = src.replace(/\.(jpg|jpeg|png)$/, '');
    const webpPath = base + '.webp';
    try {
      await sharp(src)
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      await unlink(src);
      convertedCount++;
      console.log(`Converted: ${path.basename(src)} → ${path.basename(webpPath)}`);
    } catch (err) {
      console.error(`Failed to convert ${src}: ${err.message}`);
    }
  }
  console.log(`Converted ${convertedCount} files to webp`);

  // Step 3: Re-compress all webp files
  console.log('\n--- Step 3: Re-compressing all .webp files ---');
  const currentWebpFiles = (await getAllFiles(IMAGES_DIR)).filter(f => f.endsWith('.webp'));
  let compressedCount = 0;
  let savedSize = 0;
  for (const webpFile of currentWebpFiles) {
    const tmpPath = webpFile + TEMP_SUFFIX;
    try {
      const beforeStat = await stat(webpFile);
      await sharp(webpFile)
        .webp({ quality: QUALITY })
        .toFile(tmpPath);
      const afterStat = await stat(tmpPath);

      // Only replace if the new file is smaller
      if (afterStat.size < beforeStat.size) {
        await unlink(webpFile);
        await rename(tmpPath, webpFile);
        savedSize += (beforeStat.size - afterStat.size);
        compressedCount++;
      } else {
        await unlink(tmpPath);
      }
      process.stdout.write(`\rProcessed ${compressedCount + (currentWebpFiles.indexOf(webpFile) - compressedCount + 1)} / ${currentWebpFiles.length}...`);
    } catch (err) {
      console.error(`\nFailed to compress ${webpFile}: ${err.message}`);
      if (existsSync(tmpPath)) await unlink(tmpPath).catch(() => {});
    }
  }
  console.log(`\nCompressed ${compressedCount} webp files, saved ${(savedSize / 1024 / 1024).toFixed(1)} MB`);

  // Final summary
  console.log('\n--- Final Summary ---');
  const finalFiles = (await getAllFiles(IMAGES_DIR)).filter(f =>
    f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
  );
  let totalSize = 0;
  for (const f of finalFiles) {
    const s = await stat(f);
    totalSize += s.size;
  }
  console.log(`Total image files remaining: ${finalFiles.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);
}

main().catch(console.error);
