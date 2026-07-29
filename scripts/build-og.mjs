import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/**
 * Rasterises the social preview card. Platforms will not render an SVG in an
 * og:image, so the card is authored as SVG and committed as PNG. Re-run with
 * `npm run og` after editing scripts/og.svg.
 */

const source = fileURLToPath(new URL('./og.svg', import.meta.url));
const target = fileURLToPath(new URL('../public/og.png', import.meta.url));

const svg = await readFile(source);
const png = await sharp(svg, { density: 192 }).resize(1200, 630).png({ compressionLevel: 9 }).toBuffer();

await writeFile(target, png);
console.log(`og.png — ${(png.length / 1024).toFixed(1)} kB`);
