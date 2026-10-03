---
title: 'Claude skills: kaj je skill in kako ga napisati po Anthropicovih priporočilih'
description: 'Kaj je skill v Claudu, kje deluje in kako ga napisati po Anthropicovih dobrih praksah: jedrnat, nedvoumen, s skriptami za občutljive korake in preizkušen na primerih.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 6
videi: [mWvtOHlZM-I]
---

Skill je zapisan postopek, ki ga Claude uporabi, ko naleti na nalogo, za katero je namenjen. Namesto da vsakič razlagate, kako pripravite ponudbo ali mesečno poročilo, to enkrat zapišete v skill. Ta vodnik razloži, kako skill deluje in kako ga napisati, da daje zanesljive rezultate.

## Kako skill deluje

Skill je mapa z datoteko `SKILL.md`. Na vrhu datoteke sta ime in opis, pod njima navodila. V mapi so lahko še skripte, predloge in drugi dokumenti.

Claude skillov ne bere v celoti vnaprej. Anthropic temu pravi postopno razkrivanje in ima tri ravni:

1. Ime in opis vseh skillov (približno 100 tokenov na skill; token je košček besedila, pogosto del besede) sta vedno v kontekstu, torej v besedilu, ki ga ima Claude med delom pred sabo.
2. Ko opis ustreza nalogi, Claude prebere navodila iz `SKILL.md`.
3. Dodatne datoteke in skripte odpre ali požene šele, ko jih potrebuje. Pri skriptah v kontekst pride samo rezultat, ne koda.

Zato imate lahko veliko skillov, ne da bi zasedli kontekst. Opis je pri tem najpomembnejši del: po njem se Claude odloči, ali bo skill uporabil.

Skilli delujejo v aplikaciji Claude (v plačljivih paketih z vklopljenim izvajanjem kode jih naložite kot ZIP v nastavitvah), prek API-ja in v Claude Code. V Claude Code so v mapi `~/.claude/skills/<ime>/` (osebni) ali `.claude/skills/<ime>/` v projektu (skupni za ekipo). Pokličete jih z `/ime` ali pa jih Claude uporabi sam, ko opis ustreza. Nekdanji ukazi po meri so zdaj del skillov.

Viri: [Anthropic, Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), [Claude Code, skilli](https://code.claude.com/docs/en/skills)

## Ime in opis

Anthropic za ime predpisuje največ 64 znakov, male črke, številke in vezaje, brez besed "claude" in "anthropic". Priporoča ime, ki opiše dejavnost (v angleščini glagolnik na -ing, na primer `processing-pdfs`); v slovenščini na primer `priprava-ponudb`.

Opis je dolg največ 1.024 znakov in napisan v tretji osebi. Pove, kaj skill naredi in kdaj ga uporabiti, z besedami, ki jih bo uporabnik res napisal. Slab opis je "Pomaga pri ponudbah". Dober opis je "Pripravi ponudbo za storitve čiščenja iz cenika in predloge podjetja. Uporabi, ko uporabnik prosi za ponudbo, predračun ali oceno cene za čiščenje."

## Pravila za zanesljiv skill

Jedrnatost. Anthropic pravi, da je kontekst skupno dobro. Predpostavite, da je Claude že pameten, in zapišite samo tisto, česar ne ve: vaša pravila, vaše predloge, vaše izjeme. Navodila v `SKILL.md` naj bodo krajša od 500 vrstic; podrobnosti prestavite v ločene datoteke, na katere se `SKILL.md` sklicuje neposredno, brez verige sklicev.

Prava mera svobode. Kjer je več pravilnih poti, na primer pri pisanju besedila, dajte splošna navodila. Kjer je en korak občutljiv in mora biti vsakič enak, na primer izračun cene ali ime datoteke, dajte natančen postopek ali skripto. Anthropic to primerja z ozkim mostom s prepadi na obeh straneh, kjer potrebujete ograjo, in odprtim poljem, kjer je vsaka pot v redu.

Skripte za del, ki mora biti vsakič enak. Izračun, preverjanje oblike ali pretvorbo datoteke naj naredi skripta, ne model. Skripta naj napake obravnava sama, namesto da jih prepusti Claudu, in naj nima nepojasnjenih številk.

Nedvoumnost. Za isto stvar uporabljajte vedno isto besedo. Ne ponujajte več možnosti, kjer zadošča ena. Dodajte konkreten primer vhoda in izhoda.

Preverjanje v postopku. Pri zahtevnejših nalogah zapišite korake kot seznam in dodajte zanko: naredi, preveri, popravi, ponovi. Na primer: pripravi ponudbo, preveri, da so vse cene iz cenika, popravi, preveri znova.

Brez podatkov, ki zastarajo. Datumov in začasnih pravil ne pišite med navodila; če jih morate, jih ločite v poseben razdelek.

Vir: [Anthropic, dobre prakse za pisanje skillov](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Preizkus pred uporabo

Anthropic svetuje, da preizkuse pripravite, preden napišete večino skilla. Zapišite vsaj tri scenarije z zahtevo in pričakovanim rezultatom, najprej pa preverite, kako Claude nalogo opravi brez skilla. Tako vidite, kaj skill res doda.

Priporočen način dela je z dvema ločenima sejama Clauda: v eni s Claudom pišete in popravljate skill, v drugi, novi seji ga preizkušate na resnični nalogi. Kar gre narobe, popravite v prvi. Skill preizkusite z vsemi modeli, s katerimi ga boste uporabljali, ker manjši modeli potrebujejo natančnejša navodila.

## Primer

```markdown
---
name: priprava-ponudb
description: Pripravi ponudbo za storitve čiščenja iz cenika in predloge podjetja. Uporabi, ko uporabnik prosi za ponudbo, predračun ali oceno cene za čiščenje.
---

# Priprava ponudbe

1. Iz zahteve izpiši: stranko, površino v m², pogostost, uro čiščenja.
   Če kaj manjka, vprašaj in ne ugibaj.
2. Ceno izračunaj s skripto: `python scripts/cena.py --m2 <m2> --tedensko <n>`.
   Cene nikoli ne računaj sam.
3. Ponudbo napiši po predlogi `predloga-ponudbe.md`, največ ena stran.
4. Preveri: ali so vse cene iz skripte, ali je ime stranke pravilno, ali je
   ima ponudba največ eno stran. Če kaj ne drži, popravi in preveri znova.
5. Na koncu naštej podatke, ki jih še potrebujemo od stranke.
```

V tem primeru je pisanje prepuščeno Claudu, izračun cene pa skripti, ker mora biti vsakič enak.

## Varnost

Skill lahko vsebuje skripte, ki se izvedejo na vašem računalniku. Anthropic opozarja, naj skille uporabljate samo iz zaupanja vrednih virov in pred uporabo preglejte vse datoteke, ker lahko zlonameren skill pošlje podatke drugam.

Pet brezplačnih skillov v slovenščini, ki jih lahko prenesete in prilagodite, med njimi tudi skill za pregled skilla po teh pravilih, je na strani [Skilli](/skilli/).
