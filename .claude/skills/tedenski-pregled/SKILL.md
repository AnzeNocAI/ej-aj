---
name: tedenski-pregled
description: Prepare the next ej-aj.si weekly AI news digest (Tedenski pregled) as a pull request. Collects news with parallel subagents, writes the Slovenian draft, proposes glossary entries for new terms, verifies every claim against its source, runs the validator and opens a PR for Anže to review. Use when asked for "tedenski pregled", "novice tedna", or by the Friday routine. Never merges or publishes.
---

# Tedenski pregled (weekly digest)

Output: one new file `src/content/novice/YYYY-MM-DD-tedenski-pregled-N.md` on a branch
`pregled/YYYY-MM-DD`, optionally up to 3 new entries in `src/data/slovar.yaml`, and an open
pull request. **Never merge, never push to `main`.** Merging
is publishing, and only Anže does that.

Repo: `/Users/anze/Desktop/ej-aj` (public, `ej-aj-si/ej-aj`). Read `AGENTS.md` and
`docs/slog.md` there first: their writing, accuracy and confidentiality rules apply to
everything below.

GitHub auth: the active `gh` account is a different one and must not be switched. Prefix every
network command (`git fetch`, `git push`, `gh ...`) with
`GH_TOKEN="$(gh auth token --user ej-aj-si)"`.

## 1. Set up a clean worktree

Do not touch the main checkout (Anže may have uncommitted work there).

```bash
cd /Users/anze/Desktop/ej-aj
GH_TOKEN="$(gh auth token --user ej-aj-si)" git fetch origin
TODAY=$(date +%F)
WT=/Users/anze/.cache/ej-aj-worktrees/pregled-$TODAY
mkdir -p /Users/anze/.cache/ej-aj-worktrees
git worktree add "$WT" -b "pregled/$TODAY" origin/main
cd "$WT" && npm ci --silent
```

If the branch already exists on origin (an earlier run today), stop and report it instead of
creating a second PR. Work only inside `$WT` from here on.

## 2. Work out the issue number and window

- Previous issue: the `tedenski-pregled` file in `src/content/novice/` with the newest `date`.
- `N` = previous number + 1.
- Window: from the day after the previous issue's `date` up to and including today.
- `period` in front matter, Slovenian: `27. september do 2. oktober 2026` (month names in
  lowercase, no dashes).

## 3. Collect candidates with three parallel subagents

Launch these three with the Agent tool **in one message** so they run in parallel
(`subagent_type: general-purpose`, `model: sonnet`). Give each the window dates and the prompt
below with its own source list. Tell them to use WebFetch for HTML pages and `curl` for RSS, and
to return only JSON.

Shared prompt text for every collector:

> Find AI news published between {START} and {END} (inclusive) from the sources below. For each
> real, dated announcement return an object: `title` (English, as published), `date`
> (YYYY-MM-DD), `url` (the primary source, the company's own page if one exists), `extra_urls`
> (reputable secondary coverage, optional), `facts` (3 to 6 short factual bullet points copied
> in substance from the page: numbers, prices, availability, names), `category` (model, product,
> research, policy, slovenia, business). Skip anything outside the window, anything you could
> not open, rumours without a named outlet, funding rounds under 1 billion USD, and stock or
> chip news. Never invent a URL or a number: if a page did not load, leave the item out and add
> it to `failed_sources`. Return JSON only: `{"items": [...], "failed_sources": [...]}`.

Source-specific tips (learned from test runs; pass the relevant ones to each collector):

- anthropic.com/news: WebFetch's summary gets dates wrong. Fetch the raw HTML with `curl` and
  read the `<time>` tags.
- claude.com/blog: paginated; older posts are at `?b7eea976_page=2`. Skip guides and
  thought-leadership posts, keep dated product and customer announcements.
- Claude Code: the changelog has no dates. Map versions to dates with the GitHub Releases API
  (`gh api repos/anthropics/claude-code/releases --paginate --jq '.[] | [.tag_name, .published_at] | @tsv'`)
  and link the release page. Keep only notable user-facing features.
- openai.com returns 403 to scripts. Use help.openai.com release notes, the OpenAI developer
  community, developers.openai.com, or reputable coverage, and say which one you used.

Source lists:

- **A (Anthropic and Claude):** https://www.anthropic.com/news, the Claude Code changelog
  https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md (only notable
  user-facing features, not bug fixes), https://claude.com/blog if it exists.
- **B (other labs):** https://openai.com/news/ (often blocks scripts; then use
  https://help.openai.com/en/articles/6825453-chatgpt-release-notes and reputable coverage such
  as techcrunch.com, theverge.com), https://blog.google/technology/ai/,
  https://ai.google.dev/gemini-api/docs/changelog, https://mistral.ai/news,
  https://ai.meta.com/blog/, https://www.microsoft.com/en-us/ai/blog/.
- **C (Slovenia and EU):** https://www.gov.si/novice/ (search "umetna inteligenca"),
  https://kcui.si/novice/, https://www.fri.uni-lj.si/sl/novice, https://www.rtvslo.si/znanost-in-tehnologija,
  https://n1info.si/magazin/digitalno/, https://digital-strategy.ec.europa.eu/en/news (AI Act,
  AI Office). Slovenian news counts only if it is about AI and has a concrete fact (a decision,
  a programme, a model, an event with results).

Also read, as a list of leads only, Anže's private weekly report if one exists for today:
`/Users/anze/Desktop/Claude/GitHub Repository (Anze)/knowledge/ai-research/tedenski-pregled/<today>.md`.
Any lead you use must be re-verified at its primary source. Never copy text or client
references from that report; it is private.

## 4. Select 5 to 10 items

Reader: a Slovenian business person curious about AI, not an engineer. Pick what changes what
they can do or buy. A good mix: 2 to 3 model or product releases, 1 practical feature,
1 research or safety story if it is striking, 1 policy or EU item, 1 Slovenian item when there
is a real one. Merge duplicates (one item, several sources). Drop items whose facts you cannot
support with an opened page. Fewer good items beat more weak ones; 5 is fine.

## 5. Write the draft

Follow the format in `AGENTS.md` ("Weekly digest format") and the first issue
`src/content/novice/2026-09-26-tedenski-pregled-1.md` as the model for tone and length:

- Front matter: `title: 'Tedenski pregled #N: <3 to 4 main topics>'`, `description` (max 200
  characters, one sentence), `date: <today>`, `type: tedenski-pregled`, `period`.
- One-sentence intro, then `> **Na kratko:** ...` with the one takeaway of the week.
- Items as `## 1. <Slovenian headline>`: 3 to 5 factual sentences (who, what, when, numbers,
  availability), then `**Kaj to pomeni za vas:** <one or two sentences, concrete for a Slovenian
  company>`, then `Vir: [Name, title](url)` or `Viri: [..](..), [..](..)`.
- Reports and plans are labelled ("po poročanju ...", "gre za načrt").
- Last line: `Naslednji pregled izide v petek, <d. month>.`
- Slovenian formats: `1.500`, `0,10 USD`, `40 %`, dates `22. septembra`. No em or en dashes.

## 5b. Propose glossary entries for new terms

The site has a glossary (`src/data/slovar.yaml`, pages `/slovar/<id>/`), and the first mention
of every glossary term in an article is linked to it automatically
(`src/markdown/slovar-povezave.mjs`). New terms from this week's news should end up there.

1. List the technical terms the draft uses that a Slovenian business reader might not know
   (for example "agentni brskalnik", "destilacija", "MoE"). Ignore product and company names,
   and terms already in `slovar.yaml` under any form (check `izraz`, `angl` and the plugin's
   `PHRASES`).
2. Pick at most 3 that are likely to come up again. If none qualifies, skip this step and write
   "Nova gesla: brez" in the PR body.
3. Add each to `src/data/slovar.yaml`, following the rules in the file header: `id` (slug
   without č/š/ž), `izraz` (Slovenian term, English or acronym in parentheses if common),
   `angl`, `razlaga` (2 to 4 sentences, general, no prices, model names or dates that go stale),
   optional `primer`, and `glej` with 1 to 3 related existing ids. Place it next to related
   entries. Plain language per `docs/slog.md`, no em or en dashes.
4. If the headword is also an everyday Slovenian word or a brand, add an entry to `PHRASES` or
   `SKIP` in `src/markdown/slovar-povezave.mjs` so the automatic links stay precise.
5. Check the result: after `npm run build`, the digest page must link the new term
   (`grep -o 'href="/slovar/<id>/"' dist/novice/<slug>/index.html`).

## 6. Verify every claim (separate subagent)

Launch one subagent (`subagent_type: general-purpose`, default model) with the full draft and
this task:

> You are a fact-checker. For every numbered item, open each linked source with WebFetch (or a
> secondary link if the primary blocks scripts) and check every number, date, name, price and
> availability claim in the factual sentences. The "Kaj to pomeni za vas" sentence is opinion;
> only flag it if it states a fact that is wrong. Return JSON:
> `{"items": [{"n": 1, "status": "ok" | "fix" | "drop", "problems": ["claim -> what the source says"]}]}`.
> Be strict: a claim the source does not state is a problem, even if it is probably true.
> Also check any new glossary entries in `src/data/slovar.yaml` (listed below): is the
> definition correct and general enough not to go stale? Return them as
> `{"glossary": [{"id", "status": "ok" | "fix" | "drop", "problems": [...]}]}`.

Apply every fix. Drop items marked `drop`, renumber, and keep at least 5 (if you end with fewer
than 5, continue anyway and open the PR as a draft, explaining why in the PR body).

## 7. Deterministic checks

```bash
node scripts/og-slike.mjs          # share image public/og/<id>.png (needs this Mac's fonts)
node scripts/preveri.mjs --links src/content/novice/<file>.md
npm run build
```

Both must pass. Fix every NAPAKA. OPOZORILO about 403 from openai.com is expected; mention it
in the PR body. Other warnings: fix if they are real.

## 8. Commit, push, open the PR

```bash
git add src/content/novice/<file>.md src/data/slovar.yaml src/markdown/slovar-povezave.mjs public/og scripts/og-slike.json
git commit -m "Weekly digest #N (<period>)" -m "Co-Authored-By: Claude <noreply@anthropic.com>"
GH_TOKEN="$(gh auth token --user ej-aj-si)" git push -u origin "pregled/$TODAY"
GH_TOKEN="$(gh auth token --user ej-aj-si)" gh pr create --repo ej-aj-si/ej-aj \
  --base main --head "pregled/$TODAY" --title "Tedenski pregled #N (<period>)" --body-file <body.md>
```

PR body (Slovenian, short):

- one line: what the issue covers and how many items
- a checklist, one line per item: `- [ ] <headline> (vir: <domain>)`
- **Nova gesla v slovarju:** one line per entry, `- [ ] <izraz>: <first sentence of razlaga>`
  with a link to `/slovar/<id>/` on the preview, or "brez". Anže deletes the ones he doesn't
  want before merging.
- **Za preveriti:** anything the fact-checker could not confirm, sources that failed, and
  anything you were unsure about
- validator result (errors / warnings) and "Build: OK"
- last line: "Merge = objava na ej-aj.si. Cloudflare bo spodaj dodal preview povezavo."

Then remove the worktree: `cd /Users/anze/Desktop/ej-aj && git worktree remove "$WT"`.

## 9. Final message

Slovenian, short: the PR link, the item headlines, new glossary entries, failed sources,
anything Anže must check.
If a step failed, say which one and what state things were left in. Do not work around a
failure silently.
