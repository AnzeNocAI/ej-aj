# Stanje projekta in predaja

Za agenta, ki nadaljuje delo na ej-aj.si. Najprej preberi `AGENTS.md` (pravila pisanja, točnosti,
zaupnosti), nato ta dokument, `docs/postavitev.md` (domena, Cloudflare, računi) in
`docs/kako-objavim.md` (kako Anže pregleduje in objavlja). Stanje: 26. september 2026, pozno zvečer.

## Kaj je na strani (ej-aj.si)

| Pot | Vsebina | Podatki |
|---|---|---|
| `/` | naslovnica | |
| `/novice/` | tedenski pregledi in članki | `src/content/novice/*.md` |
| `/vodniki/` | praktični vodniki (trajni naslovi brez datuma) | `src/content/novice/*.md`, `type: vodnik` |
| `/modeli/` | primerjava 15 modelov (API cene, kontekst) | `src/data/modeli.yaml` |
| `/cene/` | cene naročnin AI orodij (23 paketov) | `src/data/narocnine.yaml` |
| `/slovar/`, `/slovar/<id>/` | 53 izrazov, vsak s svojo stranjo | `src/data/slovar.yaml` |
| `/o-projektu/`, `/zasebnost/` (še v PR #7) | | |
| `/rss.xml`, `/llms.txt`, `/sitemap-index.xml` | generirano | |

Objavljeno: tedenski pregled #1 (popravljen po preverjanju dejstev), vodnik "AI Act za slovenska
podjetja". SEO: JSON-LD na vseh straneh, `public/og.png`, Search Console in Bing potrjena, sitemap
oddan. Analitika: Cloudflare Web Analytics (brez piškotkov).

## Pravila sodelovanja z Anžetom

- Slovenščina za vse, kar bere Anže ali bralec. **Nikoli pomišljajev (em ali en dash).**
- **Merge:** tehnične PR-je (SEO, hitrost, popravki, dokumentacija) lahko mergaš sam, ko je CI zelen.
  Nova vsebina (novice, vodniki, besedila strani, podatki v tabelah) vedno počaka na njegov pregled.
- **Preverjanje dejstev je obvezno** pri vsaki vsebini: ločen subagent odpre vsak vir in preveri vsako
  število, datum in ime. Pri pregledu #1 in pri vodniku AI Act je našel resnične napake (v vodniku
  bi brez njega pisalo, da za AI pismenost ni glob, slovenski ZIUDHPUI pa jih določa).
- Zaenkrat **brez omembe Produktnice, brez LinkedIna in Typefullyja**.
- Pred novo funkcijo premisli, ali doda vrednost: SEO, uporabno znanje, pomoč Anžetu pri delu
  (delavnice, stranke), promocija.
- Nič iz strank (NDA): primeri so vedno generični.
- Računov ne ustvarjaš ti; gesel ne vpisuješ. Pri dejanjih v brskalniku za strani, ki niso ta repo,
  vprašaj.

## Tehnika, ki jo moraš poznati

- Repo: `/Users/anze/Desktop/ej-aj`, GitHub `AnzeNocAI/ej-aj` (javen). Aktivni `gh` račun na Macu je
  **AnzeNoc** in ga ne preklapljaj (`gh auth switch` pokvari drugo sejo). Vsak omrežni ukaz:
  `GH_TOKEN="$(gh auth token --user AnzeNocAI)" git push ...`, enako za `gh pr ...`.
- Commiti gredo pod `326904133+AnzeNocAI@users.noreply.github.com` (nastavljeno v repo configu).
- Gostovanje: Cloudflare Workers s statičnimi datotekami (`wrangler.jsonc`), vsak push v `main` se
  objavi, vsak PR dobi preview povezavo (komentar Cloudflare bota).
- Validator: `node scripts/preveri.mjs --links <datoteka>`; CI ga poganja ob vsakem PR-ju in blokira
  `[DOPOLNI: ...]` v straneh.
- Worktreeji rutin in skillov: `~/.cache/ej-aj-worktrees/` (Namizje se sinhronizira v iCloud).
- Skilli v repu: `tedenski-pregled`, `posodobi-modele` (modeli in naročnine), `nov-vodnik` (iz
  zapiska v `~/Desktop/ej-aj-inbox/`), `newsletter` (v PR #7).
- **Brskalnik:** Cloudflare, Domenca, Search Console in Bing so na računu anze999@gmail.com v
  Anžetovem Chrome profilu **anze999** (Claude in Chrome). V tem profilu klikanje po koordinatah
  pogosto zgreši (posnetki so razdrobljeni); deluje pa sprožanje dogodkov z `javascript_tool`
  (pointerdown, mousedown, click na `[role=combobox]` in `[role=option]`) ter `form_input`.
  Vgrajeni brskalnik aplikacije je v Sloveniji in vidi evrske cene, WebFetch vidi ameriške.
- openai.com vrača 403 skriptam, EUR-Lex vrača prazno stran; uporabi nadomestne vire in to povej.
- Pri zloženih PR-jih (stacked) najprej preusmeri otroka na `main`, šele nato izbriši bazno vejo,
  sicer GitHub otroka zapre.

## Odprto

1. **PR #7 newsletter** (draft): čaka, da Anže odpre račun na Buttondown in pošlje URL obrazca
   (`newsletterAction` v `src/site.ts`). PR je treba uskladiti z `main`: od PR #12 je predloga članka
   v `src/layouts/Post.astro`, zato komponento `<Newsletter />` vstavi tja (pod opozorilo o AI), ne v
   `src/pages/novice/[...slug].astro`. V `src/pages/zasebnost.astro` ostajata dve oznaki
   `[DOPOLNI]` (podatki o Buttondownu, datum objave).
2. **Rutini** (glej spodaj) sta bili ustvarjeni v instanci na računu DIA, ki poteče okoli 14. 10.
   2026. V novi instanci ju ustvari znova (orodje za načrtovana opravila) in ju v stari izklopi, da ne
   tečeta dvakrat. Prvi zagon tedenskega pregleda je v petek, 2. oktobra; Anže naj ga prvič požene z
   "Run now", da se shranijo odobritve orodij.
3. E-pošta `pozdrav@ej-aj.si` se preusmerja na anze999@gmail.com (Cloudflare Email Routing).

## Predlogi za naslednje funkcije (po vrednosti)

1. **Drugi vodnik iz javnih virov:** "Kateri podatki ne sodijo v ChatGPT: varna raba AI v podjetju"
   (GDPR, mnenja Informacijskega pooblaščenca, poslovni paketi in učenje na podatkih). Visoka vrednost
   za SEO in Anžetove delavnice. Postopek kot pri AI Act: raziskovalni subagenti, pisanje,
   preverjevalec dejstev, PR.
2. **Vodnik "Kako izbrati AI orodje za podjetje"**, ki povezuje `/cene/` in `/modeli/`.
3. **Samodejne notranje povezave:** prva omemba izraza iz slovarja v članku postane povezava na
   `/slovar/<id>/` (SEO, uporabnost).
4. **Tedenski pregled dopolni slovar:** ko se v pregledu pojavi nov izraz, rutina predlaga geslo.
5. **Vodniki iz Anžetovih zapiskov** (skill `nov-vodnik`), ko bo v nabiralniku kaj.
6. Iskanje (Pagefind), ko bo strani več kot približno 30 člankov.

## Rutine (za ponovno ustvarjanje)

### ej-aj-tedenski-pregled

- Urnik: ob petkih ob 10.30 (`30 10 * * 5`), po Anžetovi osebni rutini `tedenski-ai-pregled` (9.00).
- Prompt:

```
You are running as a scheduled local routine for Anže Noč. Task: prepare the next weekly AI news digest ("Tedenski pregled") for his public site ej-aj.si and open a pull request. You never merge and never push to main; merging is publishing and only Anže does that.

Repo: /Users/anze/Desktop/ej-aj (GitHub: AnzeNocAI/ej-aj). Always use absolute paths.

GitHub auth: the active gh account on this Mac is a different one (AnzeNoc) and must NOT be switched with `gh auth switch`, because another Claude session relies on it. Prefix every network command (git fetch, git push, gh ...) with GH_TOKEN="$(gh auth token --user AnzeNocAI)".

Steps:
1. cd /Users/anze/Desktop/ej-aj && GH_TOKEN="$(gh auth token --user AnzeNocAI)" git fetch origin
2. Load the current instructions from main, not from whatever branch is checked out locally:
   git show origin/main:.claude/skills/tedenski-pregled/SKILL.md
   git show origin/main:AGENTS.md
   If the skill file does not exist on origin/main, stop and report in Slovenian: "Skill tedenski-pregled še ni na main. Mergaj PR #3 (https://github.com/AnzeNocAI/ej-aj/pull/3), potem rutino zaženi ročno." Do nothing else.
3. Follow the skill exactly, step by step. It creates its own worktree under /Users/anze/.cache/ej-aj-worktrees/ (outside iCloud), uses parallel subagents to collect news, a fact-checker subagent, runs scripts/preveri.mjs and the build, and opens the PR. Do not touch the main checkout at /Users/anze/Desktop/ej-aj beyond git fetch and git worktree commands.
4. Rules that always apply: Slovenian copy, no em dashes or en dashes; every news item has a source link and every number, date and name must come from an opened source; never invent anything; no client names or client data (his private knowledge-base report may be read only as a list of leads, never copied).
5. Final message in Slovenian, short: the PR link, the headlines, failed sources, and anything Anže must check by hand. If any step failed, say exactly which one and what state things were left in; do not work around failures silently.
```

### ej-aj-posodobi-modele

- Urnik: 1. v mesecu ob 10.00 (`0 10 1 * *`).
- Prompt:

```
You are running as a scheduled local routine for Anže Noč. Task: re-check the model comparison on his public site ej-aj.si (src/data/modeli.yaml) against the providers' official pages and open a pull request if anything changed. You never merge and never push to main; merging is publishing and only Anže does that.

Repo: /Users/anze/Desktop/ej-aj (GitHub: AnzeNocAI/ej-aj). Always use absolute paths.

GitHub auth: the active gh account on this Mac is a different one (AnzeNoc) and must NOT be switched with `gh auth switch`. Prefix every network command (git fetch, git push, gh ...) with GH_TOKEN="$(gh auth token --user AnzeNocAI)".

Steps:
1. cd /Users/anze/Desktop/ej-aj && GH_TOKEN="$(gh auth token --user AnzeNocAI)" git fetch origin
2. Load the current instructions from main:
   git show origin/main:.claude/skills/posodobi-modele/SKILL.md
   git show origin/main:AGENTS.md
   If the skill or src/data/modeli.yaml does not exist on origin/main, stop and report in Slovenian: "Primerjava modelov še ni na main. Mergaj PR #1 in #2 (https://github.com/AnzeNocAI/ej-aj/pulls), potem rutino zaženi ročno." Do nothing else.
3. Follow the skill exactly. It works in its own worktree under /Users/anze/.cache/ej-aj-worktrees/ (outside iCloud), uses one subagent per provider, changes only values confirmed on an opened official page, and opens a PR with a table of changes. If nothing changed, it opens no PR.
4. Slovenian copy, no em dashes or en dashes. Never fill a value from memory.
5. Final message in Slovenian, short: PR link or "brez sprememb", the list of changes, failed sources. If a step failed, say which one and what state things were left in.
```
