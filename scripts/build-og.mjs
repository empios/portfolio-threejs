import { writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

/**
 * Renders the social preview card. Platforms will not render HTML or SVG in an
 * og:image, so the card is authored as scripts/og.html (same fonts, palette
 * and point cloud as the site) and committed as public/og.png.
 *
 * Re-run with `npm run og` after editing the card or the portrait. Needs a
 * local Chromium: playwright-core uses PLAYWRIGHT_BROWSERS_PATH, or set
 * CHROMIUM_PATH to a Chromium/Chrome binary.
 */

const source = pathToFileURL(fileURLToPath(new URL('./og.html', import.meta.url))).href;
const target = fileURLToPath(new URL('../public/og.png', import.meta.url));

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
  // Drawn at 2x and scaled down, for crisp type and points.
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await page.goto(source);
  await page.waitForSelector('body[data-ready]');
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0));
  const shot = await page.screenshot({ type: 'png' });
  const png = await sharp(shot).resize(1200, 630).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(target, png);
  console.log(`og.png — ${(png.length / 1024).toFixed(1)} kB`);
} finally {
  await browser.close();
}
