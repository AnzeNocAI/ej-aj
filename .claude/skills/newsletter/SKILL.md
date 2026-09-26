---
name: newsletter
description: Turn the latest published ej-aj.si weekly digest into a newsletter email (subject, preview text, short Markdown body with links back to the site) and, if a Buttondown API key is configured, save it as a Buttondown draft. Never sends. Use when Anže says "pripravi newsletter", "newsletter za ta teden", or after a digest PR is merged.
---

# Newsletter iz tedenskega pregleda

The newsletter is the weekly digest by email. Its job is to bring readers back to ej-aj.si, so
the email is shorter than the article and every item links to the site.

Repo: `/Users/anze/Desktop/ej-aj`. Read `AGENTS.md` first (Slovenian, no em or en dashes,
Slovenian number formats). **Never send an email and never schedule one.** Anže sends from
Buttondown himself.

## 1. Find the issue

Use the newest `type: tedenski-pregled` file on `origin/main`
(`git fetch origin` with `GH_TOKEN="$(gh auth token --user AnzeNocAI)"`, then
`git show origin/main:src/content/novice/<file>`). Only published issues go out: if the newest
digest is still in an open PR, stop and say so.

## 2. Write the email

- **Subject** (max 60 characters): `ej-aj #N: <two main topics>`.
- **Preview text** (max 90 characters): the "Na kratko" takeaway, shortened.
- **Body** (Markdown, Buttondown renders it):
  - one-sentence greeting and the "Na kratko" takeaway
  - for each item: `**<headline>**`, one sentence of fact, one sentence of "what it means",
    and a link `[Preberi več](https://ej-aj.si/novice/<id>/#<anchor>)` (anchors are the
    headings' ids in the built HTML; if unsure, link the article without an anchor)
  - closing line with a link to the full issue and to `/slovar/` or `/modeli/` when relevant
- Facts only from the published article. Do not add new information.

Save it to `/Users/anze/Desktop/ej-aj-newsletter/YYYY-MM-DD.md` (outside the repo) with the
subject and preview text at the top.

## 3. Buttondown draft (optional)

If the environment variable `BUTTONDOWN_API_KEY` is set, create a draft:

```bash
curl -s https://api.buttondown.com/v1/emails \
  -H "Authorization: Token $BUTTONDOWN_API_KEY" -H "Content-Type: application/json" \
  -d @payload.json    # {"subject": ..., "body": ..., "status": "draft"}
```

Check the response: the email must come back with a draft status. If the API rejects the
`status` field or the call fails, do not retry with other options that might send; report the
response and leave the Markdown file for Anže to paste into Buttondown. Never print the key.

If the key is not set, just point Anže to the Markdown file.

## 4. Final message

Slovenian, short: subject, preview text, path to the file, and whether a Buttondown draft was
created (with its link if the API returned one).
