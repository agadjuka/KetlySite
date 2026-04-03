/**
 * Builds a multi-page PDF from presentation.html (one page per .slide).
 * Text and links stay native in the PDF (Chromium print pipeline).
 *
 * Usage: npm run pdf:presentation
 * Output: ketly-presentation.pdf (project root)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'presentation.html');
const outPath = path.join(root, 'ketly-presentation.pdf');

if (!fs.existsSync(htmlPath)) {
  console.error('Missing file:', htmlPath);
  process.exit(1);
}

const fileUrl = pathToFileURL(htmlPath).href;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--font-render-hinting=none'],
});

const page = await browser.newPage();

await page.goto(fileUrl, {
  waitUntil: 'networkidle0',
  timeout: 120000,
});

await page.evaluate(() => document.fonts.ready);

await page.pdf({
  path: outPath,
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();

console.log('PDF written:', outPath);
