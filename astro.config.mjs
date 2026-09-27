// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import slovarPovezave from './src/markdown/slovar-povezave.mjs';

export default defineConfig({
  site: 'https://ej-aj.si',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ mdastPlugins: [slovarPovezave] }),
  },
});
