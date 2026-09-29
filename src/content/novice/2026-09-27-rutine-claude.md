---
title: 'Rutine v Claudu: kako AI dela sam ob določenem času'
description: 'Kaj so rutine in načrtovana opravila v Claudu, razlika med lokalno rutino na vašem računalniku in rutino v oblaku, kako jo nastavite in kaj zapisati v navodila.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 9
videi: [p2qmX6TM0kw]
---

Rutina je naloga, ki jo Claude opravi sam ob določenem času, na primer vsako jutro ob osmih ali vsak prvi dan v mesecu. Vi napišete navodila enkrat, Claude pa jih izvaja, ne da bi odprli pogovor. Na ej-aj.si z rutino vsak petek pripravimo osnutek tedenskega pregleda in vsak mesec preverimo cene modelov.

## Lokalna rutina ali rutina v oblaku

Claude Code pozna tri načine, kako nalogo pognati ob določenem času.

| | Rutina v oblaku | Lokalna rutina | /loop |
|---|---|---|---|
| Kje teče | v Anthropicovem oblaku | na vašem računalniku | na vašem računalniku |
| Računalnik mora biti prižgan | ne | da | da |
| Dostop do lokalnih datotek | ne | da | da |
| Najkrajši interval | 1 ura | 1 minuta | 1 minuta |

Lokalna rutina teče na vašem računalniku, zato vidi vaše datoteke in programe. Teče samo, ko je namizna aplikacija odprta in računalnik buden. Če je bil računalnik ugasnjen ali v spanju, ob naslednjem zagonu aplikacije ali prebujanju enkrat nadoknadi zamujene zagone iz zadnjih sedmih dni.

Rutina v oblaku teče tudi, ko je vaš računalnik ugasnjen, a do lokalnih datotek nima dostopa. Dela z repozitoriji na GitHubu in konektorji (povezavami z drugimi aplikacijami), ki ji jih dodelite. Je v zgodnji preizkusni fazi (research preview), na voljo v paketih Pro, Max, Team in Enterprise, z dnevno omejitvijo števila zagonov. Sprožiti jo je mogoče tudi prek API-ja ali ob dogodku na GitHubu.

`/loop` ponavlja nalogo samo znotraj odprte seje, ponavljajoče naloge pa po sedmih dneh potečejo. Primeren je za spremljanje nečesa, kar poteka zdaj.

Viri: [Claude Code, načrtovana opravila v namizni aplikaciji](https://code.claude.com/docs/en/desktop-scheduled-tasks), [Claude Code, rutine](https://code.claude.com/docs/en/routines), [Claude Code, /loop](https://code.claude.com/docs/en/scheduled-tasks)

## Kako nastavite lokalno rutino

V namizni aplikaciji Claude odprite zavihek Code in v stranski vrstici izberite Routines, nato New routine in Local. Napišete ime, navodila in urnik ter izberete mapo. Navodila se shranijo kot datoteka `SKILL.md` v mapi `~/.claude/scheduled-tasks/<ime>/`, zato jih lahko pozneje urejate neposredno v tej datoteki; sprememba velja od naslednjega zagona.

Rutino v oblaku ustvarite na claude.ai/code/routines, v namizni aplikaciji ali z ukazom `/schedule` v Claude Code.

## Kaj zapisati v navodila

Rutina teče brez vas, zato mora imeti navodila, ki ne potrebujejo vprašanj:

1. Kaj naj naredi, korak za korakom, in s katerimi datotekami ali viri.
2. Kaj naj naredi, ko nekaj ne uspe: na primer vir ni dosegljiv ali podatka ni. Najbolje, da to jasno zapiše v poročilo in težave ne poskuša zaobiti po svoje.
3. Česa ne sme narediti. Naša rutina za tedenski pregled na primer nikoli ne objavi, ampak samo odpre predlog, ki ga pregleda človek.
4. Kakšen naj bo rezultat: datoteka, sporočilo, predlog sprememb.

Ko rutino nastavite, jo prvič poženite ročno z "Run now". Tako vidite, ali deluje, in odobrite orodja, ki jih potrebuje, da se naslednji zagoni ne ustavijo pri vprašanju za dovoljenje.

## Za razvijalce: rutina brez aplikacije

Claude Code lahko teče tudi brez vmesnika, z ukazom `claude -p "navodilo"`. Tak ukaz lahko poženete iz lastnega urnika (na primer cron, vgrajenega urnika na Macu in Linuxu) ali v GitHub Actions (samodejnih opravilih na GitHubu), kjer se Claude odzove na omembo `@claude` v zahtevi za spremembo. Dokumentacija za skripte priporoča možnost `--bare`, rezultat pa lahko dobite tudi v obliki JSON (strukturirani podatki, ki jih program lažje prebere).

Viri: [Claude Code, delo brez vmesnika](https://code.claude.com/docs/en/headless), [Claude Code, GitHub Actions](https://code.claude.com/docs/en/github-actions)

## Ideje za prve rutine

- vsako jutro povzetek novih sporočil in nalog za danes,
- vsak petek poročilo o tem, kaj je bilo v tednu narejeno v projektu,
- vsak mesec preverjanje cen ali pogojev pri dobaviteljih, s seznamom sprememb,
- vsak dan preverjanje, ali so v mapi novi računi, in tabela z zneski.

Začnite z eno, ki jo boste vsak dan pregledali. Ko ji zaupate, dodajte naslednjo.
