// Tells Bing (and the other IndexNow search engines: Yandex, Seznam, Naver) which pages changed,
// so they recrawl them within hours instead of days. Runs in CI after a push to main.
//
//   node scripts/indexnow.mjs <base-sha> <head-sha> [--dry-run]
//   node scripts/indexnow.mjs --all [--dry-run]   (every URL in the live sitemap, e.g. once at start)
//
// Maps the files changed between the two commits to public URLs, waits until Cloudflare has
// deployed them (every URL answers 200), then submits the list. The key file in public/ proves
// that we own the site; the key is public by design (https://www.indexnow.org/documentation).

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const SITE = 'https://ej-aj.si';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');
const [base, head] = args.filter((a) => !a.startsWith('--'));

const key = readdirSync('public')
  .find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  ?.replace(/\.txt$/, '');
if (!key) throw new Error('IndexNow key file (public/<32 hex>.txt) not found.');

const changed = all
  ? []
  : execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', base, head], { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);

const urls = new Set();
if (all) {
  const sitemap = await fetch(`${SITE}/sitemap-0.xml`).then((r) => r.text());
  for (const m of sitemap.matchAll(/<loc>https:\/\/ej-aj\.si(\/[^<]*)<\/loc>/g)) urls.add(m[1]);
}
for (const file of changed) {
  const post = file.match(/^src\/content\/novice\/(.+)\.md$/);
  if (post) {
    const fm = yaml.load(readFileSync(file, 'utf8').split(/^---$/m)[1]);
    if (fm.draft) continue;
    const id = post[1];
    if (fm.type === 'vodnik') {
      urls.add(`/vodniki/${id.replace(/^\d{4}-\d{2}-\d{2}-/, '')}/`);
      urls.add(fm.serija === 'prirocnik' ? '/prirocnik/' : '/vodniki/');
    } else {
      urls.add(`/novice/${id}/`);
      urls.add('/novice/');
    }
    urls.add('/');
    continue;
  }
  const data = {
    'src/data/modeli.yaml': '/modeli/',
    'src/data/narocnine.yaml': '/modeli/',
    'src/data/statistika.json': '/statistika/',
    'src/data/slovar.yaml': '/slovar/',
    'src/data/videi.yaml': '/videi/',
  }[file];
  if (data) urls.add(data);
}

const list = [...urls].map((p) => SITE + p);
if (!list.length) {
  console.log('No public pages changed, nothing to submit.');
  process.exit(0);
}
console.log(`Pages to submit:\n${list.join('\n')}`);
if (dryRun) process.exit(0);

// Cloudflare builds and deploys main on its own; wait until every page is live (max 10 min).
const deadline = Date.now() + 10 * 60 * 1000;
if (!all) await new Promise((r) => setTimeout(r, 60 * 1000));
for (;;) {
  const statuses = await Promise.all(list.map((u) => fetch(u, { method: 'HEAD' }).then((r) => r.status, () => 0)));
  if (statuses.every((s) => s === 200)) break;
  if (Date.now() > deadline) throw new Error(`Pages not live after 10 minutes: ${list.filter((_, i) => statuses[i] !== 200).join(', ')}`);
  await new Promise((r) => setTimeout(r, 30 * 1000));
}
// The key file itself must be live too, otherwise the submission is rejected.
const keyCheck = await fetch(`${SITE}/${key}.txt`).then((r) => r.text(), () => '');
if (keyCheck.trim() !== key) throw new Error(`Key file ${SITE}/${key}.txt is not live yet.`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'ej-aj.si', key, keyLocation: `${SITE}/${key}.txt`, urlList: list }),
});
// 200 and 202 both mean accepted; anything else is worth seeing in the CI log.
console.log(`IndexNow: HTTP ${res.status} ${await res.text()}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
