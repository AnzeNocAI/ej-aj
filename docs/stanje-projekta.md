# Stanje projekta in predaja

Za agenta, ki nadaljuje delo na ej-aj.si. Najprej preberi `AGENTS.md` (pravila pisanja, točnosti,
zaupnosti), `docs/slog.md` (kako ne zveneti kot AI), nato ta dokument, `docs/postavitev.md`
(domena, Cloudflare, računi) in `docs/kako-objavim.md` (kako Anže pregleduje in objavlja).
Stanje: 27. september 2026 (zvečer).

## Kaj je na strani (ej-aj.si)

| Pot | Vsebina | Podatki |
|---|---|---|
| `/` | naslovnica z razdelki novice, modeli in cene, statistika, slovar, vodniki | |
| `/novice/` | tedenski pregledi in članki | `src/content/novice/*.md` |
| `/vodniki/` | praktični vodniki (trajni naslovi brez datuma) | `src/content/novice/*.md`, `type: vodnik` |
| `/modeli/` | naročnine (23 paketov) in 15 modelov s cenami API | `src/data/narocnine.yaml`, `src/data/modeli.yaml` |
| `/cene/` | preusmeritev 301 na `/modeli/#narocnine` | `public/_redirects` |
| `/statistika/` | raba AI v Sloveniji, 10 interaktivnih grafov | `src/data/statistika.json`, generira `scripts/osvezi-statistiko.mjs` |
| `/prirocnik/` | priročnik: 10 vodnikov o dobri rabi Claude (`serija: prirocnik`, `korak`) | `src/content/novice/*.md` |
| `/videi/` | priporočeni videi (YouTube, naloži se šele ob kliku) | `src/data/videi.yaml` |
| `/slovar/`, `/slovar/<id>/` | 54 izrazov, vsak s svojo stranjo | `src/data/slovar.yaml` |
| `/o-projektu/`, `/zasebnost/` (še v PR #7) | | |
| `/rss.xml`, `/llms.txt`, `/sitemap-index.xml` | generirano | |

Objavljeno (22 člankov): tedenski pregled #1, 11 samostojnih vodnikov (AI Act, varna raba,
izbira orodja, predloga pravil v Wordu, kako dobro AI zna slovensko, AI v Excelu/Wordu/Outlooku,
AI v računovodstvu, AI za pravnike in odvetnike, ChatGPT ali Claude ali Gemini, odpoved
naročnine, AI pismenost zaposlenih) in 10 vodnikov
priročnika. SEO: JSON-LD na vseh straneh,
`public/og.png`, Search Console in Bing potrjena, sitemap oddan, samodejne notranje povezave na
slovar. Analitika: Cloudflare Web Analytics (brez piškotkov).

## Pravila sodelovanja z Anžetom

- Slovenščina za vse, kar bere Anže ali bralec. **Nikoli pomišljajev (em ali en dash).** Slog po
  `docs/slog.md`: brez sloganov ("Brez X, z Y"), brez alinej z odebeljenimi oznakami, brez
  izmišljenih izkušenj ("na vsaki delavnici ...").
- **Na strani nobenega osebnega imena** (tudi ne "Anže"): pregledovalec je "urednik" (`SITE.author`), stran "O projektu" ne razkrije, kdo stoji za njo. **V repu samo ime "Anže", nikoli priimek.** `git config user.name` je "Anže".
  Priimek in osebni e-naslov ostajata v starih commitih (račun se je prej imenoval drugače); zgodovine ne prepisujemo.
- **Merge:** tehnične PR-je (SEO, hitrost, popravki, dokumentacija, skilli) lahko mergaš sam, ko je
  CI zelen. Nova vsebina (novice, vodniki, besedila strani, podatki v tabelah) vedno počaka na
  njegov pregled. Ko Anže reče "mergaj", smeš združiti tudi vsebinske PR-je, ki jih je pregledal.
- **Preverjanje dejstev je obvezno** pri vsaki vsebini: ločen subagent odpre vsak vir in preveri vsako
  število, datum in ime. Doslej je našel resnične napake pri vsaki vsebini (globe za AI pismenost,
  hramba pri Claude Team, slovenske cene Microsofta, napačen izračun "najmanjše porabe" pri Mistralu).
- Zaenkrat **brez omembe Produktnice, brez LinkedIna in Typefullyja**.
- Pred novo funkcijo premisli, ali doda vrednost: SEO, uporabno znanje, pomoč Anžetu pri delu
  (delavnice, stranke), promocija. Na kratko jo utemelji, preden začneš.
- Nič iz strank (NDA): primeri so vedno generični.
- Računov ne ustvarjaš ti; gesel ne vpisuješ. Pri dejanjih v brskalniku za strani, ki niso ta repo,
  vprašaj.

## Tehnika, ki jo moraš poznati

- Repo: `/Users/anze/Desktop/ej-aj`, GitHub `ej-aj-pro/ej-aj` (javen). Aktivni `gh` račun na Macu je
  **AnzeNoc** in ga ne preklapljaj (`gh auth switch` pokvari drugo sejo). Vsak omrežni ukaz:
  `GH_TOKEN="$(gh auth token --user ej-aj-pro)" git push ...`, enako za `gh pr ...`.
- Commiti gredo pod `326904133+ej-aj-pro@users.noreply.github.com` (nastavljeno v repo configu).
- Gostovanje: Cloudflare Workers s statičnimi datotekami (`wrangler.jsonc`), vsak push v `main` se
  objavi, vsak PR dobi preview povezavo (komentar Cloudflare bota). Preusmeritve so v
  `public/_redirects`.
- **Astro 7 uporablja za Markdown Sätteri, ne remark.** Vtičniki remark ne delujejo; vtičnik se
  napiše za Sätteri (`markdown.processor: satteri({ mdastPlugins: [...] })`), primer je
  `src/markdown/slovar-povezave.mjs`.
- **Samodejne povezave na slovar** (`src/markdown/slovar-povezave.mjs`): prva omemba gesla v članku,
  s slovenskimi končnicami, največ 10 na članek, nikoli v naslovih, povezavah, tabelah in vrsticah
  "Vir:". Blagovne znamke in preveč splošne besede so v `SKIP`, dvoumna gesla imajo natančne oblike
  v `PHRASES`. Novo geslo v `slovar.yaml` se poveže samo od sebe.
- **Statistika:** `node scripts/osvezi-statistiko.mjs [--dry-run]` prenese podatke iz Eurostata,
  Microsoftovega CSV na GitHubu in StatCounterja ter izpiše spremembe. Številk ne vpisuj na roko.
  Letnice na strani se berejo iz podatkov, razlagalne povedi pa je treba ob novih podatkih preveriti.
- Grafi na `/statistika/` so v čistem SVG brez knjižnic (`src/scripts/grafi.ts`); paleta je
  preverjena za barvno slepoto, barve so CSS spremenljivke na `.viz`.
- Validator: `node scripts/preveri.mjs --links <datoteka>`; CI ga poganja ob vsakem PR-ju in blokira
  `[DOPOLNI: ...]` v straneh. Lokalno v peskovniku povezave vrnejo "fetch failed"; preveri jih CI.
- Predogled delovne kopije: `.claude/launch.json` kaže na glavni checkout. Za worktree začasno dodaj
  vnos z `npm --prefix <worktree> run dev -- --port 43xx` in ga po preverjanju vrni z
  `git checkout .claude/launch.json`.
- Worktreeji rutin in skillov: `~/.cache/ej-aj-worktrees/` (Namizje se sinhronizira v iCloud).
- Skilli v repu: `tedenski-pregled` (predlaga tudi do 3 nova gesla za slovar), `posodobi-modele`
  (modeli, naročnine in statistika), `nov-vodnik` (iz zapiska v `~/Desktop/ej-aj-inbox/`),
  `newsletter` (v PR #7).
- **Brskalnik:** Cloudflare, Domenca, Search Console in Bing so na računu anze999@gmail.com v
  Anžetovem Chrome profilu **anze999** (Claude in Chrome). V tem profilu klikanje po koordinatah
  pogosto zgreši (posnetki so razdrobljeni); deluje pa sprožanje dogodkov z `javascript_tool`
  (pointerdown, mousedown, click na `[role=combobox]` in `[role=option]`) ter `form_input`.
  Vgrajeni brskalnik aplikacije je v Sloveniji in vidi evrske cene, WebFetch vidi ameriške.
  Microsoft ima slovenske cene na `microsoft.com/sl-si/...`, Mistral pa na strani s cenami omogoča
  izbiro države.
- openai.com vrača 403 skriptam, EUR-Lex vrača prazno stran; uporabi nadomestne vire ali vgrajeni
  brskalnik in to povej.
- Pri zloženih PR-jih (stacked) najprej preusmeri otroka na `main`, šele nato izbriši bazno vejo,
  sicer GitHub otroka zapre.

## Odprto

1. **PR #7 newsletter** (draft, 27. 9. usklajen z `main`): obrazec je v `src/layouts/Post.astro` in
   na naslovnici, skrit, dokler je `newsletterAction` v `src/site.ts` `null`. Čaka, da Anže odpre
   račun na Buttondown in pošlje URL obrazca. V `src/pages/zasebnost.astro` ostajata dve oznaki
   `[DOPOLNI]` (kje Buttondown hrani podatke, datum objave); CI zato namenoma pade.
2. **Rutini** sta od 26. 9. 2026 ustvarjeni v tej instanci (glej spodaj). Anže naj stari v instanci
   DIA izklopi in novi prvič požene z "Run now", da se shranijo odobritve orodij. Prvi zagoni:
   posodobitev modelov 1. oktobra, tedenski pregled #2 2. oktobra.
3. **Tabela naročnin:** Microsoft je še v USD (obstajajo slovenske cene v EUR), Mistral Team po
   francoski ceni (za Slovenijo 30,49 €). Popravi ju mesečna rutina 1. oktobra; skill to že ve.
4. E-pošta `pozdrav@ej-aj.si` se preusmerja na anze999@gmail.com (Cloudflare Email Routing).

## Narejeno 26. in 27. septembra 2026

- Vodniki: varna raba AI, izbira orodja, predloga pravil (Word, `scripts/predloga-pravil.mjs`),
  kako dobro AI zna slovensko, AI v Excelu/Wordu/Outlooku, AI v računovodstvu.
- Priročnik `/prirocnik/` z 10 vodniki (prompt, kontekst, Claude Code, GitHub, skilli, subagenti,
  hooki, rutine, lasten agent) in stran `/videi/` z 9 videi.
- Stran `/statistika/` s skripto za osveževanje, stran s cenami združena z `/modeli/`.
- Samodejne povezave na slovar, slika za deljenje za vsak članek (`scripts/og-slike.mjs`).
- Samo ime brez priimka, `docs/slog.md`, popravek vodnika AI Act (člen 50(2)).
- Rutini: mesečna osvežuje tudi statistiko, tedenski pregled predlaga gesla za slovar.
- Zvečer 27. 9.: vodniki "AI za pravnike in odvetnike" (#29), "ChatGPT, Claude ali Gemini"
  (#30), odpoved naročnine (#34) in AI pismenost zaposlenih (#37), krajši opis na naslovnici po Anžetovem besedilu (#28, #32), popravek presledka v nogi
  (Astro pobriše presledek za izrazom `{SITE.author}.`, zato `{' '}`). Validator pri `--links`
  obravnava `chatgpt.com` in `help.openai.com` kot gostitelja, ki blokirata skripte.
- Besedilo PDF-jev (CCBE, sodbe) se na tem Macu izvleče s PDFKit prek kratke skripte v Swiftu
  (`PDFDocument(url:).page(at:).string`); `pdftotext` in `pypdf` nista nameščena.

Odprta vprašanja za Anžeta so v `~/Desktop/ej-aj-vprasanja.md` (zunaj repa).

## Predlogi za naslednje funkcije (po vrednosti)

Iz raziskave ključnih besed 27. 9. 2026 (predlogi iskanja Google in Bing za Slovenijo, Google
Trends; brez podatkov o obsegu iskanj):

1. ~~AI za pravnike in odvetnike~~ (objavljeno 27. 9.).
2. ~~ChatGPT ali Claude ali Gemini~~ (objavljeno 27. 9.).
3. ~~Odpoved naročnine in vračilo denarja~~ (objavljeno 27. 9., #34).
4. ~~AI pismenost zaposlenih~~ (objavljeno 27. 9., #37).
5. **Search Console**: čez nekaj tednov pogledati, kateri iskalni nizi prinašajo obiske (Anže
   mora dovoliti delo v svojem Chrome profilu).
6. **Vodniki iz Anžetovih zapiskov** (skill `nov-vodnik`), ko bo v `~/Desktop/ej-aj-inbox/` kaj.
7. **Newsletter** (PR #7), ko Anže odpre Buttondown; na strani o zasebnosti omeniti tudi
   sličice videov z i.ytimg.com.
8. Iskanje (Pagefind): z 22 članki se približujemo meji približno 30.

## Rutine (za ponovno ustvarjanje)

### ej-aj-tedenski-pregled

- Urnik: ob petkih ob 10.30 (`30 10 * * 5`), po Anžetovi osebni rutini `tedenski-ai-pregled` (9.00).
- Prompt:

```
You are running as a scheduled local routine for Anže. Task: prepare the next weekly AI news digest ("Tedenski pregled") for his public site ej-aj.si and open a pull request. You never merge and never push to main; merging is publishing and only Anže does that.

Repo: /Users/anze/Desktop/ej-aj (GitHub: ej-aj-pro/ej-aj). Always use absolute paths.

GitHub auth: the active gh account on this Mac is a different one (AnzeNoc) and must NOT be switched with `gh auth switch`, because another Claude session relies on it. Prefix every network command (git fetch, git push, gh ...) with GH_TOKEN="$(gh auth token --user ej-aj-pro)".

Steps:
1. cd /Users/anze/Desktop/ej-aj && GH_TOKEN="$(gh auth token --user ej-aj-pro)" git fetch origin
2. Load the current instructions from main, not from whatever branch is checked out locally:
   git show origin/main:.claude/skills/tedenski-pregled/SKILL.md
   git show origin/main:AGENTS.md
   If the skill file does not exist on origin/main, stop and report in Slovenian: "Skill tedenski-pregled še ni na main. Mergaj PR #3 (https://github.com/ej-aj-pro/ej-aj/pull/3), potem rutino zaženi ročno." Do nothing else.
3. Follow the skill exactly, step by step. It creates its own worktree under /Users/anze/.cache/ej-aj-worktrees/ (outside iCloud), uses parallel subagents to collect news, a fact-checker subagent, runs scripts/preveri.mjs and the build, and opens the PR. Do not touch the main checkout at /Users/anze/Desktop/ej-aj beyond git fetch and git worktree commands.
4. Rules that always apply: Slovenian copy, no em dashes or en dashes; every news item has a source link and every number, date and name must come from an opened source; never invent anything; no client names or client data (his private knowledge-base report may be read only as a list of leads, never copied).
5. Final message in Slovenian, short: the PR link, the headlines, failed sources, and anything Anže must check by hand. If any step failed, say exactly which one and what state things were left in; do not work around failures silently.
```

### ej-aj-posodobi-modele

- Urnik: 1. v mesecu ob 10.00 (`0 10 1 * *`). Od 27. 9. 2026 osveži tudi statistiko (`scripts/osvezi-statistiko.mjs`).
- Prompt:

```
You are running as a scheduled local routine for Anže. Task: re-check the model comparison (src/data/modeli.yaml), the subscription prices (src/data/narocnine.yaml) and the AI statistics page (src/data/statistika.json, page /statistika/) on his public site ej-aj.si, and open a pull request if anything changed. You never merge and never push to main; merging is publishing and only Anže does that.

Repo: /Users/anze/Desktop/ej-aj (GitHub: ej-aj-pro/ej-aj). Always use absolute paths.

GitHub auth: the active gh account on this Mac is a different one (AnzeNoc) and must NOT be switched with `gh auth switch`. Prefix every network command (git fetch, git push, gh ...) with GH_TOKEN="$(gh auth token --user ej-aj-pro)".

Steps:
1. cd /Users/anze/Desktop/ej-aj && GH_TOKEN="$(gh auth token --user ej-aj-pro)" git fetch origin
2. Load the current instructions from main:
   git show origin/main:.claude/skills/posodobi-modele/SKILL.md
   git show origin/main:AGENTS.md
   git show origin/main:docs/slog.md (if it exists)
   If the skill or src/data/modeli.yaml does not exist on origin/main, stop and report in Slovenian: "Primerjava modelov še ni na main. Mergaj PR #1 in #2 (https://github.com/ej-aj-pro/ej-aj/pulls), potem rutino zaženi ročno." Do nothing else.
   If scripts/osvezi-statistiko.mjs does not exist on origin/main yet, skip the statistics part and say in the final message: "Statistika še ni na main (PR #17)."
3. Follow the skill exactly. It works in its own worktree under /Users/anze/.cache/ej-aj-worktrees/ (outside iCloud), uses one subagent per provider, changes only values confirmed on an opened official page, refreshes the statistics only with scripts/osvezi-statistiko.mjs (never by hand) and has a fact-checker subagent re-check the page's sentences against new statistics, and opens one PR with a table of changes. If nothing changed, it opens no PR.
4. Slovenian copy, no em dashes or en dashes. Never fill a value from memory.
5. Final message in Slovenian, short: PR link or "brez sprememb", the list of changes (models, prices, statistics), failed sources. If a step failed, say which one and what state things were left in.
```
