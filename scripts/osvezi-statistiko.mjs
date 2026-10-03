#!/usr/bin/env node
// Refreshes src/data/statistika.json (the /statistika/ page) straight from the sources:
// Eurostat API (isoc_eb_ai, isoc_ai_iaiu), Microsoft AI Diffusion CSV on GitHub and StatCounter
// CSV exports. Prints what changed. Never edits anything else.
//
//   node scripts/osvezi-statistiko.mjs            # write the file
//   node scripts/osvezi-statistiko.mjs --dry-run  # only print the diff

import { readFileSync, writeFileSync } from 'node:fs';

const FILE = new URL('../src/data/statistika.json', import.meta.url);
const DRY = process.argv.includes('--dry-run');

const EU = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL', 'ES', 'FI', 'FR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];
const IME = { AT: 'Avstrija', BE: 'Belgija', BG: 'Bolgarija', CY: 'Ciper', CZ: 'Češka', DE: 'Nemčija', DK: 'Danska', EE: 'Estonija', EL: 'Grčija', ES: 'Španija', FI: 'Finska', FR: 'Francija', HR: 'Hrvaška', HU: 'Madžarska', IE: 'Irska', IT: 'Italija', LT: 'Litva', LU: 'Luksemburg', LV: 'Latvija', MT: 'Malta', NL: 'Nizozemska', PL: 'Poljska', PT: 'Portugalska', RO: 'Romunija', SE: 'Švedska', SI: 'Slovenija', SK: 'Slovaška' };
const MS_NAMES = { Austria: 'AT', Belgium: 'BE', Bulgaria: 'BG', Cyprus: 'CY', Czechia: 'CZ', 'Czech Republic': 'CZ', Germany: 'DE', Denmark: 'DK', Estonia: 'EE', Greece: 'EL', Spain: 'ES', Finland: 'FI', France: 'FR', Croatia: 'HR', Hungary: 'HU', Ireland: 'IE', Italy: 'IT', Lithuania: 'LT', Luxembourg: 'LU', Latvia: 'LV', Malta: 'MT', Netherlands: 'NL', Poland: 'PL', Portugal: 'PT', Romania: 'RO', Sweden: 'SE', Slovenia: 'SI', Slovakia: 'SK' };
const BOTS = ['ChatGPT', 'Google Gemini', 'Microsoft Copilot', 'Perplexity', 'Claude'];
// Chatbot shares by country (/statistika/klepetalniki-po-drzavah/): StatCounter region name,
// region code, Slovenian name, group. China and Russia are left out on purpose: StatCounter does
// not track their domestic chatbots, so its shares there say little about real use.
const BOTS_DRZAVE = [...BOTS, 'Deepseek'];
const DRZAVE = [
  ...EU.map((c) => [{ CZ: 'Czech Republic', EL: 'Greece' }[c] ?? Object.keys(MS_NAMES).find((n) => MS_NAMES[n] === c), c === 'EL' ? 'GR' : c, IME[c], 'EU']),
  ['United Kingdom', 'GB', 'Združeno kraljestvo', 'Evropa'],
  ['Norway', 'NO', 'Norveška', 'Evropa'],
  ['Switzerland', 'CH', 'Švica', 'Evropa'],
  ['Serbia', 'RS', 'Srbija', 'Evropa'],
  ['Bosnia and Herzegovina', 'BA', 'Bosna in Hercegovina', 'Evropa'],
  ['Montenegro', 'ME', 'Črna gora', 'Evropa'],
  ['North Macedonia', 'MK', 'Severna Makedonija', 'Evropa'],
  ['Ukraine', 'UA', 'Ukrajina', 'Evropa'],
  ['Turkey', 'TR', 'Turčija', 'Evropa'],
  ['United States', 'US', 'ZDA', 'Svet'],
  ['Canada', 'CA', 'Kanada', 'Svet'],
  ['Mexico', 'MX', 'Mehika', 'Svet'],
  ['Brazil', 'BR', 'Brazilija', 'Svet'],
  ['India', 'IN', 'Indija', 'Svet'],
  ['Japan', 'JP', 'Japonska', 'Svet'],
  ['South Korea', 'KR', 'Južna Koreja', 'Svet'],
  ['Indonesia', 'ID', 'Indonezija', 'Svet'],
  ['Australia', 'AU', 'Avstralija', 'Svet'],
  ['South Africa', 'ZA', 'Južna Afrika', 'Svet'],
  ['Nigeria', 'NG', 'Nigerija', 'Svet'],
  ['Egypt', 'EG', 'Egipt', 'Svet'],
];
const r2 = (v) => Math.round(v * 100 + 1e-7) / 100;

// Half-up rounding to one decimal (Eurostat publishes two; 19,95 must become 20,0).
const r1 = (v) => Math.round(v * 10 + 1e-7) / 10;

async function get(url, as = 'json') {
  const res = await fetch(url, { headers: { 'user-agent': 'ej-aj.si statistika (https://ej-aj.si)' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return as === 'json' ? res.json() : res.text();
}

// Minimal JSON-stat 2.0 reader: value(filters) for one cell, null when missing.
async function eurostat(dataset, params) {
  const q = new URLSearchParams({ lang: 'EN' });
  for (const [k, v] of Object.entries(params)) for (const x of [].concat(v)) q.append(k, x);
  const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${dataset}?${q}`;
  const js = await get(url);
  const ids = js.id;
  const value = (filters) => {
    let idx = 0;
    for (let d = 0; d < ids.length; d++) {
      const dim = js.dimension[ids[d]].category.index;
      const key = filters[ids[d]] ?? Object.keys(dim)[0];
      if (!(key in dim)) return null;
      idx = idx * js.size[d] + dim[key];
    }
    const v = js.value[idx];
    return v === undefined ? null : v;
  };
  const times = Object.keys(js.dimension.time.category.index).sort();
  return { value, times, updated: js.updated };
}

function parseCsv(text) {
  const [head, ...rows] = text.trim().split(/\r?\n/);
  const split = (l) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).slice(0, -1).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
  const cols = split(head);
  return rows.map((l) => Object.fromEntries(split(l).map((v, i) => [cols[i], v])));
}

const ym = (d) => `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
const ymDash = (s) => `${s.slice(0, 4)}-${s.slice(4)}`;

function statcounterUrl(region, regionHidden, from, to) {
  const q = new URLSearchParams({
    device: 'Desktop & Mobile & Tablet & Console',
    device_hidden: 'desktop+mobile+tablet+console',
    'multi-device': 'true',
    statType_hidden: 'ai_chatbot',
    region_hidden: regionHidden,
    granularity: 'monthly',
    statType: 'AI Chatbot',
    region,
    fromInt: from,
    toInt: to,
    fromMonthYear: ymDash(from),
    toMonthYear: ymDash(to),
    csv: '1',
  });
  return `https://gs.statcounter.com/ai-chatbot-market-share/all/${region.toLowerCase().replaceAll(' ', '-')}/chart.php?${q}`;
}

// Microsoft CSV columns look like "H1 2025 AI Diffusion" and "Q2 2026 AI Diffusion".
const MS_PERIOD = /^(H|Q)(\d) (\d{4})/;
const MS_LABEL = (col) => {
  const m = col.match(MS_PERIOD);
  if (!m) return col;
  return m[1] === 'H' ? `${m[2]}. pol. ${m[3]}` : `${m[2]}. čet. ${m[3]}`;
};

async function main() {
  const old = JSON.parse(readFileSync(FILE, 'utf8'));
  const out = {};
  const sources = {};

  // Enterprises
  const P = [['Varnost IKT', 'E_AI_PITS'], ['Poslovna administracija ali vodenje', 'E_AI_PBAM'], ['Trženje ali prodaja', 'E_AI_PMS'], ['Proizvodni procesi', 'E_AI_PPP'], ['Razvoj in inovacije', 'E_AI_PRDI'], ['Računovodstvo ali finance', 'E_AI_PFIN'], ['Logistika', 'E_AI_PLOG']];
  const B = [['Premalo znanja', 'E_AI_BLE'], ['Nejasne pravne posledice', 'E_AI_BLEG'], ['Skrb za varstvo podatkov', 'E_AI_BCDP'], ['Nezdružljivost z obstoječimi sistemi', 'E_AI_BINC'], ['Dostopnost ali kakovost podatkov', 'E_AI_BDDT'], ['Previsoki stroški', 'E_AI_BCST'], ['Etični pomisleki', 'E_AI_BEC'], ['AI ni uporaben za podjetje', 'E_AI_BNU']];
  const eb = await eurostat('isoc_eb_ai', {
    unit: 'PC_ENT',
    nace_r2: 'C10-S951_X_K',
    size_emp: ['GE10', '10-49', '50-249', 'GE250'],
    indic_is: ['E_AI_TANY', ...P.map((p) => p[1]), ...B.map((b) => b[1])],
  });
  sources.podjetja = { dataset: 'isoc_eb_ai', eurostat_updated: eb.updated };
  const e = (ind, geo, time, size = 'GE10') => eb.value({ indic_is: ind, geo, time, size_emp: size, unit: 'PC_ENT', nace_r2: 'C10-S951_X_K', freq: 'A' });
  const years = eb.times.filter((t) => e('E_AI_TANY', 'SI', t) !== null);
  const last = years.at(-1);
  out.podjetja_trend = { leta: years.map(Number), SI: years.map((y) => r1(e('E_AI_TANY', 'SI', y))), EU: years.map((y) => r1(e('E_AI_TANY', 'EU27_2020', y))) };
  out.podjetja_drzave = EU.map((c) => ({ koda: c, ime: IME[c], v: e('E_AI_TANY', c, last) })).filter((r) => r.v !== null).map((r) => ({ ...r, v: r1(r.v) })).sort((a, b) => b.v - a.v);
  out.podjetja_drzave_EU = r1(e('E_AI_TANY', 'EU27_2020', last));
  out.podjetja_velikost = [['10 do 49 zaposlenih', '10-49'], ['50 do 249 zaposlenih', '50-249'], ['250 ali več zaposlenih', 'GE250']].map(([k, s]) => ({ k, SI: r1(e('E_AI_TANY', 'SI', last, s)), EU: r1(e('E_AI_TANY', 'EU27_2020', last, s)) }));
  const share = (ind, geo) => r1((100 * e(ind, geo, last)) / e('E_AI_TANY', geo, last));
  out.podjetja_namen = P.map(([k, c]) => ({ k, SI: share(c, 'SI'), EU: share(c, 'EU27_2020') }));
  out.podjetja_razlogi = B.map(([k, c]) => ({ k, SI: r1(e(c, 'SI', last)), EU: r1(e(c, 'EU27_2020', last)) }));

  // Individuals
  const ages = [['16 do 24 let', 'Y16_24'], ['25 do 34 let', 'Y25_34'], ['35 do 44 let', 'Y35_44'], ['45 do 54 let', 'Y45_54'], ['55 do 64 let', 'Y55_64'], ['65 do 74 let', 'Y65_74']];
  const purposes = [['Zasebno', 'I_IUAIPR'], ['Pri delu', 'I_IUAIWP'], ['Pri formalnem izobraževanju', 'I_IUAIFE']];
  const ia = await eurostat('isoc_ai_iaiu', {
    indic_is: ['I_IUAI', ...purposes.map((p) => p[1])],
    ind_type: ['IND_TOTAL', ...ages.map((a) => a[1])],
    unit: ['PC_IND', 'PC_IND_IUAI'],
  });
  sources.prebivalci = { dataset: 'isoc_ai_iaiu', eurostat_updated: ia.updated };
  const i = (ind, geo, time, t = 'IND_TOTAL', unit = 'PC_IND') => ia.value({ indic_is: ind, geo, time, ind_type: t, unit, freq: 'A' });
  const iLast = ia.times.filter((t) => i('I_IUAI', 'SI', t) !== null).at(-1);
  out.prebivalci_leto = Number(iLast);
  out.prebivalci_drzave = EU.map((c) => ({ koda: c, ime: IME[c], v: i('I_IUAI', c, iLast) })).filter((r) => r.v !== null).map((r) => ({ ...r, v: r1(r.v) })).sort((a, b) => b.v - a.v);
  out.prebivalci_drzave_EU = r1(i('I_IUAI', 'EU27_2020', iLast));
  out.prebivalci_starost = ages.map(([k, t]) => ({ k, SI: r1(i('I_IUAI', 'SI', iLast, t)), EU: r1(i('I_IUAI', 'EU27_2020', iLast, t)) }));
  out.prebivalci_namen = purposes.map(([k, c]) => ({ k, SI: r1(i(c, 'SI', iLast, 'IND_TOTAL', 'PC_IND_IUAI')), EU: r1(i(c, 'EU27_2020', iLast, 'IND_TOTAL', 'PC_IND_IUAI')) }));

  // Microsoft AI Diffusion: newest CSV in the repo's data folder.
  const list = await get('https://api.github.com/repos/microsoft/ai-diffusion-report/contents/data');
  const csvs = list.map((f) => f.name).filter((n) => /^AI_Diffusion_Q\d\d{4}.*\.csv$/.test(n));
  const key = (n) => { const [, q, y] = n.match(/Q(\d)(\d{4})/); return Number(y) * 10 + Number(q); };
  const newest = csvs.sort((a, b) => key(b) - key(a))[0];
  const msRows = parseCsv(await get(`https://raw.githubusercontent.com/microsoft/ai-diffusion-report/main/data/${newest}`, 'text'));
  const periodCols = Object.keys(msRows[0]).filter((c) => MS_PERIOD.test(c));
  const pctNum = (v) => r1(parseFloat(v));
  const lastCol = periodCols.at(-1);
  sources.microsoft = { file: newest, zadnje_obdobje: MS_LABEL(lastCol) };
  out.microsoft_obdobje = MS_LABEL(lastCol);
  out.microsoft_drzave = msRows.filter((r) => MS_NAMES[r.Economy] && r[lastCol] !== '').map((r) => ({ koda: MS_NAMES[r.Economy], ime: IME[MS_NAMES[r.Economy]], v: pctNum(r[lastCol]) })).sort((a, b) => b.v - a.v);
  const si = msRows.find((r) => r.Economy === 'Slovenia');
  out.microsoft_si = { obdobja: periodCols.map(MS_LABEL), SI: periodCols.map((c) => pctNum(si[c])) };

  // StatCounter: last 12 complete months.
  const now = new Date();
  const to = ym(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)));
  const from = ym(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12, 1)));
  const siRows = parseCsv(await get(statcounterUrl('Slovenia', 'SI', from, to), 'text')).filter((r) => Number(r.ChatGPT) > 0);
  // A one-month range comes back transposed, so ask for two months and take the last row.
  const prev = ym(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 2, 1)));
  const euRows = parseCsv(await get(statcounterUrl('Europe', 'eu', prev, to), 'text'));
  sources.statcounter = { od: ymDash(from), do: ymDash(to) };
  out.klepetalniki_si = { meseci: siRows.map((r) => r.Date), ...Object.fromEntries(BOTS.map((b) => [b, siRows.map((r) => Number(r[b] ?? 0))])) };
  const euLast = euRows.at(-1);
  out.klepetalniki_evropa = { mesec: euLast.Date, ...Object.fromEntries(BOTS.map((b) => [b, Number(euLast[b] ?? 0)])) };

  // StatCounter by country: average of the monthly shares over the last three complete months,
  // because single months of smaller countries swing by several points.
  const from3 = ym(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 3, 1)));
  const drzave = [];
  for (const [region, code, ime, skupina] of [['Worldwide', 'ww', 'Svet', 'Svet'], ['Europe', 'eu', 'Evropa', 'Evropa'], ...DRZAVE]) {
    const rows = parseCsv(await get(statcounterUrl(region, code, from3, to), 'text')).filter((r) => /^\d{4}-\d{2}$/.test(r.Date));
    if (rows.length !== 3) throw new Error(`StatCounter ${region}: ${rows.length} mesecev namesto 3`);
    const avg = (b) => r2(rows.reduce((sum, r) => sum + Number(r[b] ?? 0), 0) / rows.length);
    drzave.push({ koda: code.toUpperCase(), ime, skupina, ...Object.fromEntries(BOTS_DRZAVE.map((b) => [b, avg(b)])) });
    await new Promise((res) => setTimeout(res, 300));
  }
  out.klepetalniki_drzave = { od: ymDash(from3), do: ymDash(to), drzave };
  sources.statcounter_drzave = { od: ymDash(from3), do: ymDash(to), drzav: drzave.length };

  out._meta = { preverjeno: new Date().toLocaleDateString('sv-SE'), viri: sources };

  // Diff summary
  const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
  const a = new Map(flat(old)), b = new Map(flat(out));
  const changes = [...new Set([...a.keys(), ...b.keys()])].filter((k) => !k.startsWith('_meta') && a.get(k) !== b.get(k));
  console.log(changes.length ? `Sprememb: ${changes.length}` : 'Brez sprememb v podatkih.');
  for (const k of changes.slice(0, 200)) console.log(`  ${k}: ${a.get(k) ?? '(novo)'} -> ${b.get(k) ?? '(odstranjeno)'}`);
  console.log('Viri:', JSON.stringify(sources));
  if (!DRY) writeFileSync(FILE, JSON.stringify(out, null, 1) + '\n');
}

main().catch((err) => {
  console.error('NAPAKA:', err.stack);
  process.exit(1);
});
