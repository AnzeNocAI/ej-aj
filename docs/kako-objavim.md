# Kako preverim in objavim stran

## Kje je stran

- Produkcija: https://ej-aj.si (dokler .si register ne objavi domene: https://ej-aj.anze999.workers.dev)
- Vsak PR ima svojo preview povezavo, ki jo Cloudflare doda kot komentar v PR.

## Objava (samo GitHub, brez terminala)

1. Odpri https://github.com/ej-aj-si/ej-aj/pulls. Tu so predlogi sprememb (PR-ji), ki jih
   pripravijo Claude ali rutine (tedenski pregled ob petkih, osvežitev modelov 1. v mesecu).
2. Odpri PR in preberi opis: kaj se spreminja in kaj je treba preveriti.
3. V komentarju Cloudflare bota klikni preview povezavo in preglej stran.
4. Če je v redu: **Merge pull request**, nato **Confirm merge**. Cloudflare v približno minuti
   objavi novo različico.
5. Če ni: napiši komentar v PR ali povej Claudu, kaj naj popravi.

## Hiter popravek besedila

1. Na GitHubu odpri datoteko, na primer `src/content/novice/<datoteka>.md`.
2. Klikni svinčnik (Edit this file) in popravi.
3. Pri shranjevanju izberi "Create a new branch for this commit and start a pull request".
4. Nadaljuj s korakoma 3 in 4 zgoraj.

## Kaj Claude merge-a sam

Samo tehnične spremembe (SEO, hitrost, strukturirani podatki, popravki napak), ko CI uspe.
Nova vsebina (novice, vodniki, besedila strani) vedno počaka na tvoj pregled.
