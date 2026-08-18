import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const indexPath = `${distDir}/index.html`;

const template = await readFile(indexPath, 'utf-8');

// Locate entry-server build file in dist/server
const serverDir = `${distDir}/server`;
const files = await readdir(serverDir);
const entryFile = files.find((f) => f.startsWith('entry-server.') && (f.endsWith('.js') || f.endsWith('.mjs'))) || 'entry-server.js';
const entryServerUrl = pathToFileURL(join(serverDir, entryFile)).href;

const { render } = await import(entryServerUrl);

// 1. Render PL version for /
const { html: plHtmlContent } = render('/');
const plHtml = template
  .replace('<html lang="pl">', '<html lang="pl">')
  .replace('<div id="root"></div>', `<div id="root">${plHtmlContent}</div>`);

await writeFile(indexPath, plHtml);

// 2. Create 404.html (fallback)
await writeFile(`${distDir}/404.html`, plHtml);

// 3. Render EN version for /en
const { html: enHtmlContent } = render('/en');
const enTitle = 'Paweł Włodarczyk — Full-Stack &amp; Applied ML Engineer | CodeWorks';
const enDesc = 'Paweł Włodarczyk — Full-Stack Software Engineer &amp; Applied ML (6 years exp, MSc CS). Deploying AI for enterprise &amp; e-commerce. Founder of CodeWorks (codeworks-it.pl).';
const plTitle = 'Paweł Włodarczyk — Full-Stack &amp; Applied ML Engineer | CodeWorks';
const plDesc = 'Paweł Włodarczyk — Full-Stack Software Engineer &amp; Applied ML (6 lat doświadczenia, mgr inż. informatyki). Wdrażanie AI dla enterprise i e-commerce. Prowadzę CodeWorks (codeworks-it.pl).';

const enHtml = template
  .replace('<html lang="pl">', '<html lang="en">')
  .replace('rel="canonical" href="https://www.pawelvlodarczyk.pl/"', 'rel="canonical" href="https://www.pawelvlodarczyk.pl/en"')
  .replace('property="og:url" content="https://www.pawelvlodarczyk.pl/"', 'property="og:url" content="https://www.pawelvlodarczyk.pl/en"')
  .replaceAll(plTitle, enTitle)
  .replaceAll(plDesc, enDesc)
  .replace('<div id="root"></div>', `<div id="root">${enHtmlContent}</div>`);

await mkdir(`${distDir}/en`, { recursive: true });
await writeFile(`${distDir}/en/index.html`, enHtml);

console.log('Routes /404.html and /en/index.html prerendered successfully.');
