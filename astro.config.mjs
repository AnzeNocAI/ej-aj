// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import slovarPovezave from './src/markdown/slovar-povezave.mjs';
import { readdirSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';

// <lastmod> for article URLs in the sitemap: `updated` from the front matter, else `date`.
// Search engines use it to decide what to recrawl, so only articles get one (a date on pages
// like /modeli/ would have to change whenever their data changes).
const lastmod = new Map();
for (const file of readdirSync('src/content/novice')) {
  if (!file.endsWith('.md')) continue;
  const fm = yaml.load(readFileSync(`src/content/novice/${file}`, 'utf8').split(/^---$/m)[1]);
  if (fm.draft) continue;
  const id = file.replace(/\.md$/, '');
  const path = fm.type === 'vodnik' ? `/vodniki/${id.replace(/^\d{4}-\d{2}-\d{2}-/, '')}/` : `/novice/${id}/`;
  lastmod.set(`https://ej-aj.si${path}`, new Date(fm.updated ?? fm.date).toISOString());
}

export default defineConfig({
  site: 'https://ej-aj.si',
  integrations: [
    sitemap({
      serialize(item) {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  markdown: {
    processor: satteri({ mdastPlugins: [slovarPovezave] }),
  },
});
