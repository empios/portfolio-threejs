import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const indexPath = `${distDir}/index.html`;

const html = await readFile(indexPath, 'utf-8');

// 1. Create 404.html (for GitHub Pages / static host route fallback)
await writeFile(`${distDir}/404.html`, html);

// 2. Create en/index.html with pre-rendered English attributes
const enHtml = html
  .replace('<html lang="en">', '<html lang="en">')
  .replace('href="https://www.pawelvlodarczyk.pl/"', 'href="https://www.pawelvlodarczyk.pl/en"');

await mkdir(`${distDir}/en`, { recursive: true });
await writeFile(`${distDir}/en/index.html`, enHtml);

console.log('Routes /404.html and /en/index.html copied successfully.');
