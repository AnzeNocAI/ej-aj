#!/usr/bin/env node
// Deterministic checks for ej-aj.si content, run before every PR and in CI.
//
// Usage:
//   node scripts/preveri.mjs [files...]          check the given Markdown files
//   node scripts/preveri.mjs                     check every file in src/content/novice
//   node scripts/preveri.mjs --links [files...]  also request every link (network)
//
// Exit code 1 when any error is found. Warnings never fail the run.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const CONTENT_DIR = 'src/content/novice';
const args = process.argv.slice(2);
const checkLinks = args.includes('--links');
let files = args.filter((a) => !a.startsWith('--'));
if (files.length === 0) {
  files = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => join(CONTENT_DIR, f));
}

const TYPES = ['tedenski-pregled', 'clanek', 'vodnik'];
// Hosts that block scripted requests but are fine in a browser.
const BOT_BLOCKING_HOSTS = ['openai.com', 'www.openai.com', 'x.com', 'twitter.com', 'www.linkedin.com'];

let errors = 0;
let warnings = 0;

function error(file, msg) {
  errors++;
  console.log(`  NAPAKA  ${msg}`);
}

function warn(file, msg) {
  warnings++;
  console.log(`  OPOZORILO  ${msg}`);
}

function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
    else if (/^".*"$/.test(value)) value = value.slice(1, -1);
    data[kv[1]] = value;
  }
  return { data, body: text.slice(m[0].length) };
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function extractLinks(body) {
  return [...body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
}

async function probe(url) {
  const host = new URL(url).hostname;
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ej-aj-link-check/1.0; +https://ej-aj.si)' },
      signal: AbortSignal.timeout(15000),
    });
    return { status: res.status, host };
  } catch (e) {
    return { status: 0, host, reason: e.name === 'TimeoutError' ? 'timeout' : e.message };
  }
}

for (const file of files) {
  console.log(`\n${file}`);
  const text = readFileSync(file, 'utf8');
  const name = basename(file);

  // Dashes: em dash never, en dash never (ranges are written with "do").
  for (const m of text.matchAll(/[—–]/g)) {
    error(file, `vrstica ${lineOf(text, m.index)}: pomišljaj "${m[0]}" (uporabi vejico, dvopičje, oklepaj ali "do")`);
  }

  // Placeholders the author still has to fill in must never reach the site.
  for (const m of text.matchAll(/\[DOPOLNI[^\]]*\]/g)) {
    error(file, `vrstica ${lineOf(text, m.index)}: odprto mesto ${m[0]} (dopolni ali odstrani)`);
  }

  const fm = parseFrontMatter(text);
  if (!fm) {
    error(file, 'manjka front matter');
    continue;
  }
  const { data, body } = fm;

  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(name)) {
    error(file, 'ime datoteke mora biti YYYY-MM-DD-slug.md (male črke, številke, vezaji)');
  }
  for (const key of ['title', 'description', 'date', 'type']) {
    if (!data[key]) error(file, `front matter: manjka "${key}"`);
  }
  if (data.type && !TYPES.includes(data.type)) error(file, `front matter: neznan type "${data.type}"`);
  if (data.description && data.description.length > 200) {
    error(file, `description ima ${data.description.length} znakov (največ 200)`);
  }
  if (!existsSync(join('public/og', name.replace(/\.md$/, '.png')))) {
    warn(file, 'manjka slika za deljenje (zaženi: node scripts/og-slike.mjs)');
  }
  if (data.date && !name.startsWith(data.date)) {
    error(file, `datum v imenu datoteke se ne ujema z date: ${data.date}`);
  }

  if (data.type === 'tedenski-pregled') {
    if (!data.period) error(file, 'tedenski pregled potrebuje "period"');
    if (!/^Tedenski pregled #\d+: /.test(data.title || '')) {
      error(file, 'naslov mora biti oblike "Tedenski pregled #N: ..."');
    }
    if (!name.includes('tedenski-pregled-')) error(file, 'ime datoteke mora vsebovati "tedenski-pregled-N"');
    if (!/^> \*\*Na kratko:\*\*/m.test(body)) error(file, 'manjka blok "> **Na kratko:**"');

    // Each numbered item: needs "Kaj to pomeni za vas" and a "Vir:"/"Viri:" line with a link.
    const items = body.split(/^## /m).slice(1);
    const numbered = items.filter((s) => /^\d+\. /.test(s));
    if (numbered.length < 5 || numbered.length > 10) {
      error(file, `število novic je ${numbered.length} (mora biti od 5 do 10)`);
    }
    numbered.forEach((section, i) => {
      const title = section.split('\n')[0];
      const expected = `${i + 1}. `;
      if (!title.startsWith(expected)) error(file, `novica "${title}": pričakovana številka ${i + 1}`);
      if (!/\*\*Kaj to pomeni za vas:\*\*/.test(section)) error(file, `novica "${title}": manjka "Kaj to pomeni za vas"`);
      const vir = section.match(/^Viri?: (.+)$/m);
      if (!vir) error(file, `novica "${title}": manjka vrstica "Vir:" ali "Viri:"`);
      else if (!/\]\(https?:\/\//.test(vir[1])) error(file, `novica "${title}": vir nima povezave`);
      const facts = section.split(/\*\*Kaj to pomeni za vas:\*\*/)[0];
      const sentences = facts.split('\n').slice(1).join(' ').split(/(?<=[.!?])\s+(?=[A-ZČŠŽ])/).filter((s) => s.trim());
      if (sentences.length < 3) warn(file, `novica "${title}": samo ${sentences.length} povedi dejstev (cilj 3 do 5)`);
      if (sentences.length > 6) warn(file, `novica "${title}": ${sentences.length} povedi dejstev (cilj 3 do 5)`);
    });
  }

  // English number formats that slip into Slovenian copy: 1,500 or 0.10 USD.
  for (const m of body.matchAll(/\b\d{1,3},\d{3}\b/g)) {
    warn(file, `vrstica ${lineOf(text, text.indexOf(body) + m.index)}: "${m[0]}" je angleški zapis tisočic (slovensko: 1.500)`);
  }
  for (const m of body.matchAll(/\b\d+\.\d+ ?(USD|EUR|€|\$|%)/g)) {
    warn(file, `vrstica ${lineOf(text, text.indexOf(body) + m.index)}: "${m[0]}" uporablja decimalno piko (slovensko: 0,10)`);
  }

  if (checkLinks) {
    const links = [...new Set(extractLinks(body))];
    const results = await Promise.all(links.map(async (url) => ({ url, ...(await probe(url)) })));
    for (const r of results) {
      if (r.status >= 200 && r.status < 400) continue;
      if (r.status === 429) {
        warn(file, `povezava ${r.url}: HTTP 429 (omejitev zahtev, preveri ročno)`);
      } else if (r.status === 403 && BOT_BLOCKING_HOSTS.includes(r.host)) {
        warn(file, `povezava ${r.url}: HTTP 403 (stran blokira skripte, preveri ročno)`);
      } else if (r.status === 0) {
        warn(file, `povezava ${r.url}: ni odziva (${r.reason})`);
      } else {
        error(file, `povezava ${r.url}: HTTP ${r.status}`);
      }
    }
    console.log(`  preverjenih povezav: ${links.length}`);
  }
}

console.log(`\n${files.length} datotek, ${errors} napak, ${warnings} opozoril`);
process.exit(errors > 0 ? 1 : 0);
