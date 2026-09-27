# Slog: kako ne zveneti kot AI

Rules for every reader-facing Slovenian text on ej-aj.si (digests, guides, page copy, table
notes). Adapted from Anže's reference "How Not to Sound Like AI", which itself is based on
[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
Every skill and routine that writes copy follows this file together with `AGENTS.md`.

## Core rule

Say what happened, what something costs, what it does. Do not tell the reader why it matters or
how impressive it is. If a sentence would still work after swapping in any other company, tool
or country, it is too generic: cut it or add the specific fact.

## Words and phrases to avoid

Slovenian equivalents of typical LLM vocabulary. One in a long text is fine, clusters are not.

- Importance words: ključen, bistven, prelomen, revolucionaren, izjemen, celovit, temeljit,
  pomemben mejnik, nov standard, igra spremeni pravila.
- Filler openers: "V današnjem hitro spreminjajočem se svetu", "Ni skrivnost, da", "Pomembno je
  poudariti", "Velja omeniti", "Skratka", "Za konec".
- Hollow connectors at the start of a sentence: Poleg tega, Prav tako, Nadalje, Hkrati pa.
  Usually the sentence reads better without them.
- Vague attribution: "strokovnjaki opozarjajo", "po mnenju analitikov". Name the source or cut.

## Structures to avoid

- Slogans made of contrasts: "Brez X, z Y", "Ne gre le za X, ampak za Y", "Več kot le X".
- Participle or "kar" tails that add a judgement: "..., s čimer podjetje utrjuje svoj položaj",
  "..., kar poudarja pomen ...". End the sentence at the fact.
- Triplets everywhere: three adjectives, three nouns, three parallel clauses in every paragraph.
  Use one, two or four when that is what the facts give.
- "Od X do Y" as a sweeping range ("od prvih delavnic do rešitev ...").
- Bullet lists where every item starts with a **bold label:**. Prefer short paragraphs; use
  bold for the one thing a skimming reader must not miss, not for every line.
- Summary paragraphs that repeat the section. Closing moral lessons ("Nauk: ...").
- Synonym cycling (model, sistem, orodje, rešitev for the same thing). Repeat the noun.

## What the text should look like

- Plain verbs: je, ima, stane, velja, ne dela.
- Specific numbers, dates, names and mechanisms, each from a source.
- Mixed sentence length. Opinions marked as opinions and kept in **Kaj to pomeni za vas:**.
- Anže's voice where he speaks: first person, direct, a bit informal, no marketing tone. Never
  invent his experience ("na vsaki delavnici ...") unless he wrote it himself.

## Quick check before a PR

1. Swap test: could the sentence describe any other product or company? Rewrite.
2. Delete the last clause of every long sentence. Better? Keep it deleted.
3. Search for the words above.
4. Count bold labels and triplets.
5. Would a sceptical reader roll their eyes at any sentence? Rewrite it.
