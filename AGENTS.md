# ej-aj.si

Slovenian AI hub: weekly AI news digest, model comparison and practical guides for Slovenian
businesses. Owner and editor: Anže. Public repo `ej-aj-pro/ej-aj`, deployed by Cloudflare
Workers (static assets, `wrangler.jsonc`) on every push to `main`.

Current state, open items, merge permissions and next-feature ideas: `docs/stanje-projekta.md`.
Read it at the start of every session.

## How publishing works

- Content lives in `src/content/novice/*.md` (schema in `src/content.config.ts`).
- **Never push content straight to `main`.** Work on a branch (`pregled/2026-10-02`,
  `clanek/<slug>`), open a PR, and let Anže review it on the Cloudflare preview URL. Merging is
  publishing.
- File names: `YYYY-MM-DD-<slug>.md`. Weekly digests: `YYYY-MM-DD-tedenski-pregled-<n>.md`.
- Before opening a PR run `node scripts/og-slike.mjs` (share image `public/og/<id>.png`, rendered
  with this Mac's fonts and committed), `node scripts/preveri.mjs --links <file>` (content
  validator: front matter, dashes, digest structure, sources, links, share image) and
  `npm run build`. The validator and the build must pass; CI runs the validator again on every PR.

## Skills and routines

- `.claude/skills/tedenski-pregled/`: prepares the weekly digest as a PR (parallel collector
  subagents, fact-checker subagent, validator). Run by a local Friday routine
  (`ej-aj-tedenski-pregled`), or on request.
- `.claude/skills/nov-vodnik/`: turns a note from `~/Desktop/ej-aj-inbox/` (outside the repo,
  synced via iCloud) into a draft guide PR, with a confidentiality pass and `[DOPOLNI: ...]`
  placeholders that the validator blocks. Manual for now.
- `.claude/skills/newsletter/`: turns the latest published digest into a newsletter email
  (file in `~/Desktop/ej-aj-newsletter/`, optional Buttondown draft via API). Never sends.
- Routines and skills do their work in git worktrees under `~/.cache/ej-aj-worktrees/`, never
  in the main checkout and never inside iCloud-synced folders.

## Writing rules (Slovenian copy)

- All reader-facing text is in Slovenian. Code, commits and this file are in English.
- **No em dashes (—).** Use a comma, colon, parentheses or a new sentence. No en dash as a
  substitute either; write ranges as "17. do 26. september".
- Plain, concrete language. No hype, no obvious AI phrasing, no stacked short fragments.
  Follow `docs/slog.md` (words and structures that read as AI, with a pre-PR check).
- Name: no personal name anywhere on the site (pages, articles, metadata, share images). The
  reviewer is "urednik" (`SITE.author`); "O projektu" must not reveal who runs the site. In the
  repo Anže appears by first name only, never with his surname.
- Slovenian number format: `1.500`, `0,10 USD`, `40 %`.
- Separate fact (what was announced) from interpretation (**Kaj to pomeni za vas:**).

## Accuracy rules

- Every news item needs at least one source link, preferably the primary source (the company's
  own announcement). Secondary sources only when there is no primary one.
- Every number, date and name must come from the linked source. If you cannot verify it, leave
  it out.
- Reports and rumours are labelled as such ("po poročanju ...", "gre za načrt").
- Summarise in your own words. Never copy article text or images.

## Confidentiality

Nothing from Produktnica or Anže's clients: no names, no data, no examples specific enough to
recognise a company. Guides describe generic use cases only.

## Content types

Three kinds of content, each with one job. Pick the type by these rules, not by habit.

- **Tedenski pregled** (`type: tedenski-pregled`, every Friday): all notable news of the week,
  short. It is the backbone of the site and the source of the newsletter. An item that also has
  its own article stays in the digest, but shorter, and ends with `Podrobneje: [naslov](/novice/<id>/)`.
- **Članek** (`type: clanek`): one news topic in depth, at most 1 to 2 per week. A news item
  becomes an article only if all three hold: (1) Slovenian readers will keep searching for it for
  weeks (a new model, a price change, availability in the EU or Slovenia, AI Act); (2) we can add
  something the announcement does not have (comparison with `/modeli/`, what it means in
  Slovenia, a test in Slovenian); (3) the verified facts carry at least 400 words. Funding,
  partnerships, customer stories and one-off events stay in the digest only.
- **Vodnik** (`type: vodnik`): practical, evergreen know-how that does not date with the news.

Each article is its own PR (`clanek/<slug>`) with its own fact-check, share image and
validator run, like any other content.

## Weekly digest format

Front matter: `title` ("Tedenski pregled #n: ..."), `description` (max 200 chars), `date`,
`type: tedenski-pregled`, `period`. Body: short intro, a "Na kratko" blockquote, 5 to 10 numbered
`##` items, each with 3 to 5 factual sentences, one **Kaj to pomeni za vas:** sentence and a
`Vir:` line (plus `Podrobneje:` when the item has its own article). Close with the date of the next issue.

Sources to scan each week: anthropic.com/news, openai.com/news, blog.google (AI),
Gemini API changelog, Mistral, Meta AI, EU AI Office, gov.si, KCUI, FRI UL, Slovenian media
(rtvslo.si, delo.si, n1info.si).

## Development

```
npm install
npm run dev     # http://localhost:4321
npm run build
```
