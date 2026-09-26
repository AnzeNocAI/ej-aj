# ej-aj.si

Umetna inteligenca po slovensko: tedenski pregled AI novic, primerjava modelov in praktični
vodniki za slovenska podjetja.

Stran je tudi poskus, koliko dela lahko opravi AI (Claude Code) pod človeškim uredniškim
nadzorom. Pravila, po katerih AI piše, so v [`AGENTS.md`](AGENTS.md).

- Ogrodje: [Astro](https://astro.build), vsebina v Markdownu (`src/content/novice/`)
- Gostovanje: Cloudflare Workers (statične datoteke), objava ob vsakem merge v `main`

```
npm install
npm run dev
```
