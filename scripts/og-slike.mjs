#!/usr/bin/env node
// Renders a share image (1200x630) for every article: public/og/<id>.png, with the article's
// title, type and date. Like public/og.png, the PNGs are made locally and committed, so the
// Cloudflare build needs no fonts (Slovenian letters render with the Mac's Helvetica Neue).
//
//   node scripts/og-slike.mjs          render images that are missing or whose title changed
//   node scripts/og-slike.mjs --vse    render all again (after a design change)
//
// scripts/og-slike.json remembers the title each image was rendered with.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const CONTENT = 'src/content/novice';
const OUT = 'public/og';
const MANIFEST = 'scripts/og-slike.json';
const ALL = process.argv.includes('--vse');
const LABEL = { 'tedenski-pregled': 'Tedenski pregled', clanek: 'Članek', vodnik: 'Vodnik' };
const MONTHS = ['januarja', 'februarja', 'marca', 'aprila', 'maja', 'junija', 'julija', 'avgusta', 'septembra', 'oktobra', 'novembra', 'decembra'];
const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif';

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  const data = {};
  for (const line of m?.[1].split('\n') ?? []) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^'.*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'");
    else if (/^".*"$/.test(v)) v = v.slice(1, -1);
    data[kv[1]] = v;
  }
  return data;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The title sits between the date line (y 170) and the footer (y 572).
const TITLE_TOP = 215;
const TITLE_BOTTOM = 520;

// Greedy word wrap by an approximate character budget; shrink the font until the lines fit.
function layout(title) {
  for (const size of [76, 68, 60, 54, 48]) {
    const maxLines = Math.floor((TITLE_BOTTOM - TITLE_TOP) / (size * 1.12));
    const perLine = Math.floor(1020 / (size * 0.53));
    const lines = [];
    let line = '';
    // One-letter prepositions (v, s, z, k, o, u, a, i) stay with the next word, as in print.
    const words = title.split(/\s+/).reduce((acc, w) => {
      const prev = acc[acc.length - 1];
      if (prev !== undefined && /(^|\s)[vszkouaiVSZKOUAI]$/.test(prev)) acc[acc.length - 1] = `${prev} ${w}`;
      else acc.push(w);
      return acc;
    }, []);
    for (const word of words) {
      if (line && (line + ' ' + word).length > perLine) {
        lines.push(line);
        line = word;
      } else line = line ? `${line} ${word}` : word;
    }
    if (line) lines.push(line);
    if (lines.length <= maxLines) return { size, lines };
  }
  return { size: 48, lines: [title.slice(0, 150)] };
}

function svg({ title, type, date }) {
  const { size, lines } = layout(title);
  const lineH = Math.round(size * 1.12);
  const top = TITLE_TOP + size * 0.85;
  const [y, m, d] = date.split('-').map(Number);
  const meta = `${LABEL[type] ?? 'Članek'} · ${d}. ${MONTHS[m - 1]} ${y}`;
  const text = lines
    .map((l, i) => `<text x="90" y="${Math.round(top + i * lineH)}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="#ffffff" letter-spacing="-1.5">${esc(l)}</text>`)
    .join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1f3bd6"/>
      <stop offset="1" stop-color="#101a5c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="80" r="220" fill="#ffffff" opacity="0.06"/>
  <text x="90" y="112" font-family="${FONT}" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-1.5">ej<tspan fill="#8ea0ff">-</tspan>aj</text>
  <text x="90" y="170" font-family="${FONT}" font-size="28" font-weight="600" fill="#8ea0ff">${esc(meta)}</text>
  ${text}
  <text x="90" y="572" font-family="${FONT}" font-size="28" fill="#dfe4ff">ej-aj.si · Umetna inteligenca po slovensko</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
let rendered = 0;
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md')).sort()) {
  const id = file.replace(/\.md$/, '');
  const data = frontMatter(readFileSync(`${CONTENT}/${file}`, 'utf8'));
  if (!data.title || !data.date) continue;
  const png = `${OUT}/${id}.png`;
  if (!ALL && existsSync(png) && manifest[id] === data.title) continue;
  await sharp(Buffer.from(svg(data))).png({ compressionLevel: 9 }).toFile(png);
  manifest[id] = data.title;
  rendered++;
  console.log(`  ${png}`);
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(rendered ? `Ustvarjenih slik: ${rendered}` : 'Vse slike so že ustvarjene.');
