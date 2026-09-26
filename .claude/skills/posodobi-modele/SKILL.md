---
name: posodobi-modele
description: Monthly refresh of the ej-aj.si model comparison (src/data/modeli.yaml). Re-checks every price, context window and availability against the providers' official pages, adds notable new models, and opens a PR with a clear diff summary. Use when asked to "posodobi modele", "preveri cene modelov", or by the monthly routine. Never merges.
---

# Posodobi primerjavo modelov

Output: a branch `modeli/YYYY-MM` with changes to `src/data/modeli.yaml`, and an open PR.
**Never merge, never push to `main`.** Read `/Users/anze/Desktop/ej-aj/AGENTS.md` first.

Every `gh` and network `git` command needs the prefix
`GH_TOKEN="$(gh auth token --user AnzeNocAI)"` (the active gh account is a different one and
must not be switched).

## 1. Worktree

```bash
cd /Users/anze/Desktop/ej-aj
GH_TOKEN="$(gh auth token --user AnzeNocAI)" git fetch origin
MONTH=$(date +%Y-%m)
WT=/Users/anze/.cache/ej-aj-worktrees/modeli-$MONTH
mkdir -p /Users/anze/.cache/ej-aj-worktrees
git worktree add "$WT" -b "modeli/$MONTH" origin/main
cd "$WT" && npm ci --silent
```

If `modeli/$MONTH` already exists on origin, stop and report.

## 2. Re-check every model (parallel subagents)

Split `src/data/modeli.yaml` by provider. Launch one subagent per provider in a single message
(`subagent_type: general-purpose`, `model: sonnet`), each with its entries and this task:

> For each model below, open the URLs in `viri` and the provider's current pricing and models
> pages with WebFetch. Report the current standard API price (USD per million input and output
> tokens, not batch, lowest standard tier), context window in tokens, whether it is still
> offered, and any newer model from the same provider that replaced it or is now the flagship.
> Only report values you saw on an opened page, with the URL. Return JSON:
> `{"models": [{"id", "cena_vhod", "cena_izhod", "kontekst", "still_offered", "source_urls",
> "notes"}], "new_models": [{"ime", "why_notable", "cena_vhod", "cena_izhod", "kontekst",
> "source_urls"}], "failed_sources": [...]}`

openai.com often returns 403 to scripts. Then use the OpenAI developer community
announcements, platform docs, or reputable coverage (TechCrunch, The Verge), and name the source.

## 3. Update the YAML

- Change only values a subagent confirmed on an opened page. Set `preverjeno` to today for
  every entry you re-checked, and update `viri` if the source moved.
- A model that is no longer offered: remove it and say so in the PR.
- New models: add at most the flagship and one budget model per provider. The table should
  stay under about 20 rows. Write `za_kaj` in Slovenian as a practical recommendation for a
  Slovenian company (one sentence), and `opomba` only for facts from the source.
- Slovenian copy, no em or en dashes.

## 4. Check, commit, PR

```bash
npm run build
git add src/data/modeli.yaml
git commit -m "Refresh model comparison ($MONTH)"
GH_TOKEN="$(gh auth token --user AnzeNocAI)" git push -u origin "modeli/$MONTH"
GH_TOKEN="$(gh auth token --user AnzeNocAI)" gh pr create --repo AnzeNocAI/ej-aj --base main \
  --head "modeli/$MONTH" --title "Primerjava modelov: osvežitev $MONTH" --body-file <body.md>
```

PR body (Slovenian): a table of changes (model, field, old, new, source), added and removed
models, sources that failed, and "Merge = objava na ej-aj.si". If nothing changed, do not open
a PR; report "brez sprememb" instead and delete the branch.

Remove the worktree at the end: `git -C /Users/anze/Desktop/ej-aj worktree remove "$WT"`.

## 5. Final message

Slovenian, short: PR link (or "brez sprememb"), the list of changes, failed sources.
