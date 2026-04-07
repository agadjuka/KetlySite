/**
 * PDF из presentation.html: каждый слайд — растровая картинка (одинаково на всех устройствах),
 * поверх — невидимые URI-аннотации, чтобы ссылки оставались кликабельными.
 *
 * Usage: npm run pdf:presentation
 * Output: ketly-presentation.pdf (project root)
 *
 * Браузер: npm run pdf:install-browser или системный Chrome/Edge (см. launchBrowser).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';
import puppeteer from 'puppeteer';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'presentation.html');
const outPath = path.join(root, 'ketly-presentation.pdf');

const SLIDE_W = 1280;
const SLIDE_H = 720;

if (!fs.existsSync(htmlPath)) {
  console.error('Missing file:', htmlPath);
  process.exit(1);
}

const fileUrl = pathToFileURL(htmlPath).href;

const baseLaunch = {
  headless: true,
  args: ['--font-render-hinting=none'],
};

async function launchBrowser() {
  try {
    return await puppeteer.launch({ ...baseLaunch, channel: 'chrome' });
  } catch {
    try {
      return await puppeteer.launch({ ...baseLaunch, channel: 'msedge' });
    } catch {
      return await puppeteer.launch(baseLaunch);
    }
  }
}

const browser = await launchBrowser();
const page = await browser.newPage();

await page.setViewport({
  width: SLIDE_W,
  height: SLIDE_H * 12,
  deviceScaleFactor: 1,
});

await page.goto(fileUrl, {
  waitUntil: 'networkidle0',
  timeout: 120000,
});

await page.evaluate(() => document.fonts.ready);

const slideHandles = await page.$$('.slide');
const pagesData = [];

for (const slide of slideHandles) {
  await slide.evaluate((el) =>
    el.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await new Promise((r) => setTimeout(r, 150));

  const links = await slide.evaluate((el) => {
    const sr = el.getBoundingClientRect();
    return Array.from(el.querySelectorAll('a[href]')).map((a) => {
      const r = a.getBoundingClientRect();
      return {
        href: a.href,
        x: r.left - sr.left,
        y: r.top - sr.top,
        width: r.width,
        height: r.height,
      };
    });
  });

  const pngBuffer = await slide.screenshot({
    type: 'png',
    captureBeyondViewport: true,
  });

  pagesData.push({ pngBuffer, links });
}

await browser.close();

const doc = new PDFDocument({
  autoFirstPage: false,
  size: [SLIDE_W, SLIDE_H],
  margin: 0,
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

for (const { pngBuffer, links } of pagesData) {
  doc.addPage({ size: [SLIDE_W, SLIDE_H], margin: 0 });
  doc.image(pngBuffer, 0, 0, { width: SLIDE_W, height: SLIDE_H });
  for (const link of links) {
    const { href, x, y, width, height } = link;
    if (!href || width < 2 || height < 2) continue;
    const clampedX = Math.max(0, Math.min(x, SLIDE_W - 4));
    const clampedY = Math.max(0, Math.min(y, SLIDE_H - 4));
    const w = Math.min(width, SLIDE_W - clampedX);
    const h = Math.min(height, SLIDE_H - clampedY);
    doc.link(clampedX, clampedY, w, h, href);
  }
}

doc.end();

await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});

console.log('PDF written (image pages + link annotations):', outPath);
