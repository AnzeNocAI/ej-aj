// Markdown plugin: links the first mention of a glossary term in an article to /slovar/<id>/.
//
// Terms come from src/data/slovar.yaml. Slovenian is inflected, so every word of a phrase also
// matches with the usual case endings ("token", "tokena", "tokenov"; "kontekstnega okna").
// Acronyms match case-sensitively, with an optional hyphenated ending ("API-ja").
//
// Rules: only the first mention of each term, at most MAX_LINKS per article, never inside
// headings, links, tables, code or source lines ("Vir:", "Viri:"). Code and HTML are not text
// nodes, so they are never touched.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const MAX_LINKS = 10;

// Terms that are not linked: brand names (every article mentions them) and words that are
// too common in everyday Slovenian to be a reliable match.
const SKIP = new Set([
  'umetna-inteligenca',
  'chatgpt',
  'claude',
  'claude-code',
  'gemini',
  'copilot',
  'gpt',
  'temperatura',
  'parametri',
  'rutina',
  'razmisljanje',
  'uporaba-racunalnika',
  'ucenje-in-sklepanje',
]);

// Phrases to match instead of the headword, where the headword or its alternatives in
// parentheses are ambiguous ("navodilo", "veščina") or inflect irregularly ("vložitve").
const PHRASES = {
  'veliki-jezikovni-model': ['veliki jezikovni model', 'LLM'],
  prompt: ['prompt'],
  asistent: ['AI asistent'],
  mcp: ['MCP', 'Model Context Protocol'],
  skill: ['skill'],
  rag: ['RAG'],
  vlozitev: ['vložitev', 'vložitve', 'vložitvi', 'vložitvami', 'embedding'],
  'odprte-utezi': ['odprte uteži', 'odprtih uteži', 'odprtimi utežmi', 'odprtokodni model'],
  benchmark: ['benchmark', 'primerjalni test'],
  'zasebnost-podatkov': ['zasebnost podatkov'],
  'ai-act': ['AI Act', 'Akt o umetni inteligenci'],
  agi: ['AGI', 'splošna umetna inteligenca'],
  evalvacija: ['evalvacija', 'eval'],
  deepfake: ['deepfake', 'globoki ponaredek'],
  'sencna-ai': ['senčna AI', 'shadow AI'],
  'vrivanje-navodil': ['vrivanje navodil', 'prompt injection'],
  api: ['API'],
  // Not linked (in SKIP), only used to find articles that mention the product.
  copilot: ['Copilot'],
};

const L = '[\\p{L}\\p{N}]';
const ENDINGS = '(?:a|e|i|o|u|om|ov|em|ih|im|imi|ama|ami|ah|ega|emu|ej|ja|ju|jem|ji|jev|oma|ema)?';

function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Regex source for one word: acronyms exact (plus "-ja"), other words as stem + case ending.
function wordPattern(word) {
  if (/^[A-Z0-9]{2,}$/.test(word)) return `${escape(word)}(?:-\\p{Ll}+)?`;
  if (/^[A-Z]/.test(word) && word.length > 1 && word !== word.toUpperCase() && /[A-Z]/.test(word.slice(1))) return escape(word);
  const lower = word.toLowerCase();
  const stem = /[aeiou]$/.test(lower) && lower.length > 4 ? lower.slice(0, -1) : lower;
  return `${escape(stem)}${ENDINGS}`;
}

function phrasePattern(phrase) {
  return phrase.split(/\s+/).map(wordPattern).join('\\s+');
}

function headword(izraz) {
  return izraz.replace(/\s*\(.*?\)\s*/g, ' ').trim();
}

const cached = new Map();
// includeSkipped: also the SKIP terms, for finding which articles mention a term (never linked).
function loadTerms(includeSkipped = false) {
  if (cached.has(includeSkipped)) return cached.get(includeSkipped);
  // Relative to the project root: this module is also bundled into the build via src/lib.ts,
  // where import.meta.url no longer points at src/markdown/.
  const entries = yaml.load(readFileSync(resolve(process.cwd(), 'src/data/slovar.yaml'), 'utf8'));
  const terms = [];
  for (const e of entries) {
    if (SKIP.has(e.id) && !includeSkipped) continue;
    const phrases = PHRASES[e.id] ?? [headword(e.izraz)];
    for (const p of phrases) {
      const acronymOnly = /^[A-Z0-9]{2,}$/.test(p) || /^[A-Z]{2,}\s/.test(p);
      terms.push({ id: e.id, title: e.izraz, phrase: p, source: phrasePattern(p), caseSensitive: acronymOnly });
    }
  }
  // Longer phrases first, so "agentna AI" wins over "agent" and "sistemski prompt" over "prompt".
  terms.sort((a, b) => b.phrase.length - a.phrase.length);
  const build = (list, flags) =>
    list.length ? new RegExp(list.map((t) => `(?<![\\p{L}\\p{N}-])(${t.source})(?!${L})`).join('|'), flags) : null;
  const sens = terms.filter((t) => t.caseSensitive);
  const insens = terms.filter((t) => !t.caseSensitive);
  const compiled = { sens: { re: build(sens, 'gu'), terms: sens }, insens: { re: build(insens, 'giu'), terms: insens } };
  cached.set(includeSkipped, compiled);
  return compiled;
}

// All matches in a string from both regexes, left to right, without overlaps.
function findMatches(text, compiled) {
  const found = [];
  for (const { re, terms } of [compiled.sens, compiled.insens]) {
    if (!re) continue;
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) {
      const g = m.slice(1).findIndex((x) => x !== undefined);
      found.push({ start: m.index, end: m.index + m[0].length, term: terms[g] });
    }
  }
  found.sort((a, b) => a.start - b.start || b.end - a.end);
  const out = [];
  let lastEnd = -1;
  for (const f of found) if (f.start >= lastEnd) { out.push(f); lastEnd = f.end; }
  return out;
}

// Glossary ids mentioned in a Markdown text (headings included, link URLs and "Vir:" lines not).
// Used for related articles and for the article list on glossary pages.
export function termIdsIn(text, { includeSkipped = false } = {}) {
  const compiled = loadTerms(includeSkipped);
  const plain = text.replace(/\]\([^)]*\)/g, ']').replace(/^Viri?:.*$/gm, '');
  return new Set(findMatches(plain, compiled).map((m) => m.term.id));
}

const SKIP_ANCESTORS = new Set(['heading', 'link', 'linkReference', 'definition', 'tableCell']);

// Sätteri mdast plugin (Astro 7's default Markdown processor). The factory runs once per
// document, so the "already linked" set is per article.
export default function slovarPovezave() {
  const compiled = loadTerms();
  const linked = new Set();
  return {
    name: 'slovar-povezave',
    // Terms the author already linked by hand count as linked.
    before(_root, ctx) {
      for (const m of ctx.source.matchAll(/\]\(\/slovar\/([a-z0-9-]+)\/?[)#]/g)) linked.add(m[1]);
    },
    text(node, ctx) {
      if (linked.size >= MAX_LINKS) return;
      for (let p = ctx.parent(node); p; p = ctx.parent(p)) {
        if (SKIP_ANCESTORS.has(p.type)) return;
        if (p.type === 'paragraph' && /^\s*Viri?:/.test(ctx.textContent(p))) return;
      }
      const matches = findMatches(node.value, compiled);
      const parts = [];
      let pos = 0;
      for (const m of matches) {
        if (linked.has(m.term.id) || linked.size >= MAX_LINKS) continue;
        linked.add(m.term.id);
        if (m.start > pos) parts.push({ type: 'text', value: node.value.slice(pos, m.start) });
        parts.push({
          type: 'link',
          url: `/slovar/${m.term.id}/`,
          title: `Slovar: ${m.term.title}`,
          data: { hProperties: { className: ['slovar-link'] } },
          children: [{ type: 'text', value: node.value.slice(m.start, m.end) }],
        });
        pos = m.end;
      }
      if (!parts.length) return;
      if (pos < node.value.length) parts.push({ type: 'text', value: node.value.slice(pos) });
      ctx.replaceNode(node, parts);
    },
  };
}
