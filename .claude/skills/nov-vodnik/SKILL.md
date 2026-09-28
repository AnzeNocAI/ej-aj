---
name: nov-vodnik
description: Turn Anže's rough note (dictated or typed, dropped into ~/Desktop/ej-aj-inbox) into a draft practical guide ("vodnik") for ej-aj.si and open a PR. Keeps his voice and his experience, never invents results, strips anything that could identify a client. Use when he says "nov vodnik", "naredi vodnik iz zapiska", "obdelaj inbox", or points at a note.
---

# Nov vodnik iz zapiska

Anže works with Slovenian companies on AI adoption. A guide on ej-aj.si is one practical use
case written for a business reader: the problem, what you need, the steps, an example prompt,
the pitfalls. His notes are the raw material; you do the writing, he stays the author.

Repo: `/Users/anze/Desktop/ej-aj`. Read `AGENTS.md` there first. Every network `git`/`gh`
command needs the prefix `GH_TOKEN="$(gh auth token --user ej-aj-si)"` (never `gh auth switch`).
**Never merge and never push to `main`.**

## 1. Pick up the note

Inbox: `/Users/anze/Desktop/ej-aj-inbox/` (synced through iCloud, so he can drop notes from
his phone). Take the oldest `.txt` or `.md` file that is not in `obdelano/`, or the file he
named. Audio files: there is no transcription tool on this Mac yet; tell him and skip them.

One note becomes one guide. If a note is too thin for a guide (under about five sentences of
substance), do not pad it: write back what is missing as questions and stop.

## 2. Confidentiality pass (before writing anything)

The repo and the site are public. Anže is under NDA with his clients (through Produktnica and
directly). Remove or generalise:

- company, person, product and project names of clients, and of their suppliers or customers
- numbers, places, dates or details that would let a reader recognise the company
  ("a distributor with three warehouses in Štajerska" is too specific; "a distribution
  company" is fine)
- internal file names, system names, screenshots, quotes from colleagues

If the guide only works with such details, stop and ask him instead of writing it.

## 3. Write the draft

File: `src/content/novice/YYYY-MM-DD-<slug>.md` (today's date, short Slovenian slug without
č/š/ž). Front matter:

```yaml
title: '<Kako ...: concrete task in plain words>'
description: '<one sentence, max 200 characters>'
date: YYYY-MM-DD
type: vodnik
```

Body, in this order:

1. Two or three sentences: the everyday problem and who has it.
2. `## Kaj potrebujete`: tools and plans (for example a paid Claude or ChatGPT plan, a
   connector), and what to prepare.
3. `## Postopek`: numbered steps a non-technical reader can follow.
4. `## Primer navodila`: one realistic prompt in a blockquote, written generically.
5. `## Na kaj paziti`: two to four pitfalls from his note (checking results, personal data,
   when not to use AI).
6. `## Koliko to prinese`: only if the note states a result (time saved, errors avoided).
   Never invent or estimate numbers.

Voice: first person where he speaks from experience ("Pri podjetjih, s katerimi delam, ..."),
plain and concrete, no hype, no em or en dashes, Slovenian number formats. Where his note
leaves a gap you cannot fill without inventing, write `[DOPOLNI: what is missing]`. The
validator blocks publishing until every placeholder is resolved, so use it rather than guess.

## 4. Check, commit, PR

Work on a branch `vodnik/<slug>` from `origin/main`, in a worktree under
`/Users/anze/.cache/ej-aj-worktrees/` like the other skills. Then:

```bash
node scripts/og-slike.mjs                               # share image public/og/<id>.png
node scripts/preveri.mjs src/content/novice/<file>.md   # errors only for [DOPOLNI] are expected
npm run build
```

Commit the image (`public/og/<id>.png`, `scripts/og-slike.json`) together with the guide.

Open the PR (`gh pr create --repo ej-aj-si/ej-aj --base main`), title
`Vodnik: <title>`, body in Slovenian: what the guide covers, the list of `[DOPOLNI]` places,
what you removed or generalised for confidentiality, and "Merge = objava na ej-aj.si". Open it
as a draft (`--draft`) while any `[DOPOLNI]` remains.

Move the processed note to `/Users/anze/Desktop/ej-aj-inbox/obdelano/` (never delete notes)
and remove the worktree.

## 5. Final message

Slovenian, short: PR link, the open `[DOPOLNI]` questions, what was generalised.
