#!/usr/bin/env node
// Generates public/predloge/pravila-rabe-ai.docx, the downloadable template of internal AI use
// rules for companies (guide: /vodniki/predloga-pravil-rabe-ai/). Edit the text here, not in
// Word, then run: node scripts/predloga-pravil.mjs
//
// Placeholders are in [square brackets] and highlighted, so a company can find and replace
// them. Slovenian copy, no em or en dashes (AGENTS.md, docs/slog.md).

import { mkdirSync, writeFileSync } from 'node:fs';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Tab,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

const OUT = new URL('../public/predloge/pravila-rabe-ai.docx', import.meta.url);
const FONT = 'Calibri';
const ACCENT = '1F3BD6';

// Text with [placeholders] highlighted.
function runs(text, opts = {}) {
  return text.split(/(\[[^\]]+\])/).filter(Boolean).map((part) =>
    part.startsWith('[')
      ? new TextRun({ text: part, highlight: 'yellow', ...opts })
      : new TextRun({ text: part, ...opts }),
  );
}
const p = (text, opts = {}) => new Paragraph({ children: runs(text), spacing: { after: 120 }, ...opts });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
// Numbered rule "1.1 ..." kept as literal numbers, so the numbering survives copy and paste.
const rule = (num, text) =>
  new Paragraph({
    children: [new TextRun({ text: num, bold: true }), new TextRun({ children: [new Tab()] }), ...runs(text)],
    spacing: { after: 120 },
    indent: { left: 567, hanging: 567 },
    tabStops: [{ type: TabStopType.LEFT, position: 567 }],
  });
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: runs(text), spacing: { after: 60 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: border, bottom: border, left: border, right: border };
function table(header, rows, widths) {
  const cell = (text, isHead, w) =>
    new TableCell({
      borders,
      width: { size: w, type: WidthType.DXA },
      shading: isHead ? { fill: 'E8ECFD', type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ children: runs(text, isHead ? { bold: true } : {}) })],
    });
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((t, i) => cell(t, true, widths[i])) }),
      ...rows.map((r) => new TableRow({ children: r.map((t, i) => cell(t, false, widths[i])) })),
    ],
  });
}
const spacer = () => new Paragraph({ children: [], spacing: { after: 120 } });

// Instructions box on the first page (to delete before use): a shaded, bordered paragraph block.
const note = (text) =>
  new Paragraph({
    children: runs(text, { size: 20 }),
    shading: { fill: 'F3F5FE', type: ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 8 } },
    spacing: { after: 80 },
    indent: { left: 200, right: 200 },
  });

const children = [
  note('Navodilo za uporabo predloge (pred uporabo ga izbrišite)'),
  note(
    'Besedilo v oglatih oklepajih, na primer [ime podjetja], zamenjajte s podatki svojega podjetja. Točke, ki za vas ne veljajo, izbrišite, manjkajoče dodajte. Pravila naj bodo kratka, da jih zaposleni res preberejo.',
  ),
  note(
    'Predloga ni pravni nasvet. Povzema javne vire (Akt o umetni inteligenci, GDPR, Zakon o poslovni skrivnosti, priporočila Informacijskega pooblaščenca). Če AI uporabljate za odločitve o ljudeh ali obdelujete zdravstvene podatke, se posvetujte s pravnikom ali pooblaščencem za varstvo podatkov. Razlaga in viri: ej-aj.si/vodniki/predloga-pravil-rabe-ai/',
  ),
  spacer(),
  new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Pravila rabe orodij umetne inteligence')] }),
  p('[Ime podjetja]'),
  p('Velja od: [datum]. Odgovorna oseba za ta pravila: [ime in priimek, e-naslov].'),

  h1('1. Namen in obseg'),
  rule('1.1', 'Pravila določajo, katera orodja umetne inteligence (AI) zaposleni smejo uporabljati pri delu, katere podatke vanje smejo vnašati in kako preverjajo rezultate.'),
  rule('1.2', 'Veljajo za vse zaposlene in zunanje sodelavce, ki orodja AI uporabljajo pri delu za [ime podjetja], na službenih ali osebnih napravah.'),
  rule('1.3', 'Pravila so del ukrepov za AI pismenost po 4. členu Akta o umetni inteligenci (Uredba (EU) 2024/1689) in razumnih ukrepov za varovanje poslovnih skrivnosti po Zakonu o poslovni skrivnosti.'),

  h1('2. Dovoljena orodja'),
  rule('2.1', 'Za delo uporabljamo samo orodja iz spodnje tabele, prek službenih računov.'),
  table(
    ['Orodje in paket', 'Kdo ga uporablja', 'Za katere naloge', 'Pogodba o obdelavi podatkov'],
    [
      ['[npr. ChatGPT Business]', '[vsi zaposleni]', '[pisanje, povzemanje, prevajanje]', '[da]'],
      ['[npr. Microsoft 365 Copilot]', '[prodaja, računovodstvo]', '[e-pošta, Excel]', '[da]'],
      ['[orodje]', '[kdo]', '[naloge]', '[da ali ne]'],
    ],
    [2600, 2000, 2826, 1600],
  ),
  spacer(),
  rule('2.2', 'Osebnih in brezplačnih računov za službene podatke ne uporabljamo.'),
  rule('2.3', 'Novo orodje pred uporabo odobri [odgovorna oseba]. Pred odobritvijo preveri, ali ponudnik podatke uporablja za učenje modelov, kje (v EU ali zunaj nje) in koliko časa jih hrani ter ali je z njim sklenjena pogodba o obdelavi osebnih podatkov. Pogoje odobrenih orodij pregleda vsaj enkrat na leto.'),
  rule('2.4', 'Kdor se z orodji AI uči na osebnem računu, pri tem ne uporablja službenih podatkov in v nastavitvah izklopi uporabo pogovorov za izboljšanje modelov.'),

  rule('2.5', 'Ko zaposleni odide, [odgovorna oseba] ukine njegov dostop do službenih računov AI in poskrbi, da službeni pogovori in datoteke ostanejo v podjetju.'),

  h1('3. Podatki'),
  rule('3.1', 'V nobeno orodje AI ne vnašamo:'),
  bullet('gesel, dostopnih ključev in podatkov za prijavo v sisteme;'),
  bullet('posebnih vrst osebnih podatkov: podatkov o zdravju, rasnem ali etničnem poreklu, političnem mnenju, verskem ali filozofskem prepričanju, članstvu v sindikatu, genetskih podatkov, biometričnih podatkov za identifikacijo ter podatkov o spolnem življenju ali usmerjenosti [razen: navedite izjemo, če obstaja];'),
  bullet('podatkov o kazenskih obsodbah in prekrških;'),
  bullet('podatkov, ki jih varuje poklicna tajnost [prilagodite svojemu poklicu, npr. odvetniška ali zdravniška tajnost].'),
  rule('3.2', 'Samo v odobrena orodja iz 2. poglavja in le toliko, kolikor je za nalogo nujno, vnašamo:'),
  bullet('osebne podatke strank, zaposlenih in kandidatov, vključno z identifikatorji, kot sta EMŠO in davčna številka;'),
  bullet('pogodbe, ponudbe, cene in druge dokumente, ki so označeni kot poslovna skrivnost;'),
  bullet('interne dokumente, ki niso namenjeni javnosti.'),
  rule('3.3', 'Brez omejitev lahko v odobrena orodja vnašamo javno objavljena besedila, splošna vprašanja brez podatkov o konkretnih ljudeh ali podjetjih in lastna besedila brez zaupnih vsebin.'),
  rule('3.4', 'Pred vnosom podatke, kjer je mogoče, nadomestimo s splošnimi oznakami (stranka A, podjetje iz gradbeništva, znesek v razponu). Brisanje imena še ni anonimizacija: osebo je pogosto mogoče prepoznati po drugih podatkih.'),
  rule('3.5', 'Celotnih dokumentov ne nalagamo, če za nalogo zadošča del. Fotografij ljudi ne nalagamo.'),
  rule('3.6', 'Pogovorov z zaupnimi podatki ne delimo prek javnih povezav.'),
  rule('3.7', 'Katere informacije so poslovna skrivnost, določa [pravilnik o poslovni skrivnosti ali drug pisni akt]. Če zaposleni ni prepričan, ali je podatek zaupen, vpraša [odgovorno osebo] ali ga ne vnese.'),

  h1('4. Preverjanje rezultatov in odgovornost'),
  rule('4.1', 'Vsak rezultat AI pred uporabo preveri človek: dejstva, številke, imena, citate in vire. Orodja AI lahko navajajo podatke, ki ne obstajajo.'),
  rule('4.2', 'Za besedilo, ki gre stranki ali v javnost, in za odločitev, sprejeto s pomočjo AI, odgovarja zaposleni, ki besedilo pošlje ali odločitev sprejme, ne orodje.'),
  rule('4.3', 'AI pri zaposlovanju ali odločitvah o zaposlenih (izbira kandidatov, ocenjevanje dela, napredovanje, odpoved) uporabljamo samo po predhodni presoji [odgovorne osebe]. Za take rabe Akt o umetni inteligenci določa posebne obveznosti, med njimi tudi obveščanje zaposlenih in njihovih predstavnikov (sindikata ali sveta delavcev) pred uvedbo.'),
  rule('4.4', 'AI ne uporabljamo za prepoznavanje čustev zaposlenih. 5. člen Akta o umetni inteligenci to na delovnem mestu prepoveduje, razen iz zdravstvenih ali varnostnih razlogov.'),

  h1('5. Označevanje'),
  rule('5.1', 'Klepetalnik na naši spletni strani ali v aplikaciji jasno pove, da se uporabnik pogovarja z AI.'),
  rule('5.2', 'Slike, zvok ali video, ki smo jih ustvarili ali predelali z AI in prikazujejo resnične ljudi, predmete, kraje ali dogodke tako, da bi lahko lažno delovali kot resnični, označimo kot umetno ustvarjene ali predelane.'),
  rule('5.3', 'Besedila, ki jih z AI pripravimo za obveščanje javnosti, pred objavo pregleda in odobri [urednik ali odgovorna oseba], ki prevzame odgovornost za objavo.'),

  h1('6. Povezave z drugimi sistemi'),
  rule('6.1', 'Povezave orodij AI z e-pošto, diskom ali poslovnimi sistemi (konektorje) omogoči samo [odgovorna oseba], in le tiste, ki jih za delo potrebujemo.'),
  rule('6.2', 'Orodje, ki ima dostop do zaupnih podatkov, ne sme brez nadzora brati neznanih spletnih strani, e-pošte ali dokumentov. Te lahko vsebujejo skrita navodila, s katerimi napadalec skuša priti do podatkov (vrivanje navodil).'),
  rule('6.3', 'Dejanja, ki jih ni mogoče preklicati, kot so pošiljanje sporočil, plačila in brisanje, pred izvedbo potrdi človek.'),

  h1('7. Usposabljanje'),
  rule('7.1', 'Vsak zaposleni, ki uporablja AI, se pred začetkom seznani s temi pravili in opravi usposabljanje, prilagojeno svojemu delu: kako orodje deluje, kje se moti, kako pisati navodila in kako preveriti rezultat.'),
  rule('7.2', 'Usposabljanja vodimo v evidenci (Priloga 1), seznanitev s pravili zaposleni potrdi s podpisom (Priloga 2). Pravila in usposabljanja osvežimo vsaj enkrat na leto.'),

  h1('8. Napake in vprašanja'),
  rule('8.1', 'Če zaposleni v orodje AI vnese podatke v nasprotju s temi pravili ali opazi, da je orodje razkrilo zaupne podatke, to takoj sporoči [odgovorni osebi, e-naslov].'),
  rule('8.2', 'Kadar gre za osebne podatke, [odgovorna oseba] presodi, ali je šlo za kršitev varnosti osebnih podatkov. Kršitev, ki jo je treba prijaviti, se Informacijskemu pooblaščencu prijavi brez nepotrebnega odlašanja, po možnosti v 72 urah po seznanitvi s kršitvijo (33. člen GDPR).'),
  rule('8.3', 'Vprašanja o pravilih in predloge za nova orodja pošljite na [e-naslov].'),

  h1('9. Veljavnost'),
  rule('9.1', 'Pravila veljajo od [datum]. [Odgovorna oseba] jih pregleda vsaj enkrat na leto in ob uvedbi novega orodja.'),
  spacer(),
  p('[Kraj in datum]'),
  p('[Ime in priimek, funkcija]'),
  p('Podpis: ______________________'),

  new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun('Priloga 1: Evidenca usposabljanj')] }),
  p('Evidenca služi kot dokaz o ukrepih za AI pismenost, če ga zahteva nadzorni organ.'),
  table(
    ['Datum', 'Udeleženci', 'Vsebina usposabljanja', 'Izvajalec', 'Trajanje'],
    [
      ['[datum]', '[imena ali oddelek]', '[npr. pravila rabe, preverjanje rezultatov, pisanje navodil]', '[notranji ali zunanji]', '[ure]'],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
    [1300, 2000, 3026, 1700, 1000],
  ),

  new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun('Priloga 2: Izjava o seznanitvi')] }),
  p('Spodaj podpisani potrjujem, da sem prebral(-a) Pravila rabe orodij umetne inteligence [ime podjetja], ki veljajo od [datum], in jih bom pri delu upošteval(-a).'),
  spacer(),
  table(
    ['Ime in priimek', 'Delovno mesto', 'Datum', 'Podpis'],
    [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
    [2700, 2426, 1600, 2300],
  ),
];

const doc = new Document({
  creator: 'ej-aj.si',
  title: 'Pravila rabe orodij umetne inteligence (predloga)',
  description: 'Predloga internih pravil rabe AI za podjetja. ej-aj.si',
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { size: 40, bold: true, font: FONT, color: '16181D' }, paragraph: { spacing: { after: 160 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: FONT, color: ACCENT }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 0 } },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1134, hanging: 283 } } } }],
      },
    ],
  },
  sections: [
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: 'Predloga: ej-aj.si   Stran ', size: 16, color: '808080' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '808080' }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

mkdirSync(new URL('../public/predloge/', import.meta.url), { recursive: true });
writeFileSync(OUT, await Packer.toBuffer(doc));
console.log(`Zapisano: ${OUT.pathname}`);
