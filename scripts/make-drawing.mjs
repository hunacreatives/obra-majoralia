import sharp from 'sharp';

// Turn a render into a clean line drawing (brand ink #383838 on white) for the
// drawing → render reveal. Canny edge detection: Sobel gradients, thin lines via
// non-maximum suppression, then hysteresis so only real, connected edges remain.
// usage: node scripts/make-drawing.mjs <input> <drawing-out> [width] [render-out] [cropLeft 0–1] [cropRight 0–1]
const [input, output, widthArg, renderOut, cropArg, cropRightArg] = process.argv.slice(2);
const W = Number(widthArg ?? 1600);
const cropLeft = Number(cropArg ?? 0);
const cropRight = Number(cropRightArg ?? 0);

// optional crop from the left/right (e.g. to drop a foreground figure or centre the
// subject), shared by both outputs
const meta = await sharp(input).metadata();
const left = Math.round(meta.width * cropLeft);
const right = Math.round(meta.width * cropRight);
const base = () => sharp(input).extract({ left, top: 0, width: meta.width - left - right, height: meta.height }).resize({ width: W });

if (renderOut) await base().webp({ quality: 84 }).toFile(renderOut);

const { data, info } = await base().greyscale().toColourspace('b-w').blur(1.2).raw().toBuffer({ resolveWithObject: true });
if (info.channels !== 1) throw new Error(`expected 1 channel, got ${info.channels}`);
const { width, height } = info;
const at = (x, y) => data[Math.min(height - 1, Math.max(0, y)) * width + Math.min(width - 1, Math.max(0, x))];

// 1. gradients
const mag = new Float32Array(width * height);
const dir = new Uint8Array(width * height); // 0: 0°, 1: 45°, 2: 90°, 3: 135°
let max = 0;
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
  const gx = -at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1) + at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1);
  const gy = -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) + at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1);
  const i = y * width + x;
  mag[i] = Math.hypot(gx, gy);
  if (mag[i] > max) max = mag[i];
  const a = ((Math.atan2(gy, gx) * 180) / Math.PI + 180) % 180;
  dir[i] = a < 22.5 || a >= 157.5 ? 0 : a < 67.5 ? 1 : a < 112.5 ? 2 : 3;
}

// 2. non-maximum suppression → 1px lines
const thin = new Float32Array(width * height);
const off = [[1, 0], [1, 1], [0, 1], [-1, 1]];
for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
  const i = y * width + x, [dx, dy] = off[dir[i]];
  const m = mag[i];
  if (m >= mag[(y + dy) * width + x + dx] && m >= mag[(y - dy) * width + x - dx]) thin[i] = m / max;
}

// 3. hysteresis: strong edges, plus weak edges connected to them
const HI = 0.16, LO = 0.07;
const keep = new Uint8Array(width * height);
const stack = [];
for (let i = 0; i < thin.length; i++) if (thin[i] >= HI) { keep[i] = 1; stack.push(i); }
while (stack.length) {
  const i = stack.pop(), x = i % width, y = (i / width) | 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const j = (y + dy) * width + x + dx;
    if (j >= 0 && j < thin.length && !keep[j] && thin[j] >= LO) { keep[j] = 1; stack.push(j); }
  }
}

// 4. ink: line strength follows edge strength, softened slightly for a pen-like line
const ink = Buffer.alloc(width * height);
for (let i = 0; i < ink.length; i++) ink[i] = keep[i] ? Math.round(255 * Math.min(1, 0.55 + thin[i] * 1.6)) : 0;
const soft = await sharp(ink, { raw: { width, height, channels: 1 } }).blur(0.6).toColourspace('b-w').raw().toBuffer();
if (soft.length !== width * height) throw new Error('softened line image is not single-channel');
const out = Buffer.alloc(width * height * 3);
for (let i = 0; i < soft.length; i++) {
  const t = Math.min(1, soft[i] / 255 * 1.35);
  for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(255 + (0x38 - 255) * t);
}
await sharp(out, { raw: { width, height, channels: 3 } }).webp({ quality: 90 }).toFile(output);
console.log('drawing', width, 'x', height, '->', output, renderOut ? `(+ render ${renderOut})` : '');
