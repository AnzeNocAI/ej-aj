---
title: 'Kako preizkusiti AI rešitev na svojih nalogah, preden jo uvedete v podjetju'
description: 'Postopek v petih korakih za ekipe brez programerjev: deset pravih primerov iz dela, jasno merilo uspeha, ena sprememba naenkrat in tabela z rezultati.'
date: 2026-09-29
type: vodnik
---

Ko ekipa AI uporablja nekaj tednov, nastanejo prve rešitve: navodilo za povzemanje reklamacij, skill za pripravo ponudb, avtomatizacija za razvrščanje e-pošte. Preden tako rešitev dobijo vsi zaposleni, morate vedeti, ali res dobro dela. Občutek "zdi se, da kar dobro" za to ni dovolj. Ta vodnik opisuje preprost postopek, s katerim to preverite brez programiranja in brez posebnih orodij.

## Na kratko

- Preizkusite na desetih pravih primerih iz svojega dela, ne na primerih s spleta.
- Preden začnete, zapišite, kdaj je rezultat dober. Za vsak primer zapišite, ali je uspel, koliko ste morali popraviti, koliko je stal in koliko časa je trajal.
- Naenkrat spremenite samo eno stvar (model, navodilo ali dokumente), vse drugo naj ostane enako.
- Za prvi poskus je dovolj ročno pregledati ducat primerov. Ko rešitev uporablja celo podjetje, jo preizkusite na več primerih.

## Zakaj ni dovolj izbrati najboljši model

Kako dobro AI opravi nalogo, ni odvisno samo od modela. Odvisno je tudi od navodil, ki jih dobi, dokumentov, ki jih ima na voljo, orodij, ki jih sme uporabljati, in tega, kaj si zapomni med koraki.

Primer iz septembra 2026: organizacija ARC Prize je isti model, Gemini 3.8 Flash, preizkusila na zahtevnem testu ARC-AGI-3 na dva načina. Pri prvem je dosegel 10,37 %. Pri drugem si je model med koraki zapomnil svoje prejšnje razmišljanje, dolge pogovore pa je sproti skrajšal, in dosegel 35 %. Model je bil isti, rezultat več kot trikrat boljši.

Za podjetje to pomeni, da lestvice najboljših modelov malo povedo o tem, kako bo AI opravil vaše delo. To morate preizkusiti sami, na svojih nalogah.

Viri: [ARC Prize, Gemini 3.8 Flash](https://arcprize.org/results/google-gemini-3-8-flash), [The Neuron, 28. september 2026](https://www.theneurondaily.com/p/did-openai-lose-control)

## Postopek v petih korakih

### 1. Izberite deset pravih primerov

Vzemite primere iz zadnjih tednov: deset pravih reklamacij, deset povpraševanj ali deset računov. Anthropic v navodilih za preizkušanje priporoča, naj bodo primeri podobni tistim, ki jih boste res obdelovali, in naj med njimi ne manjkajo neobičajni. Med deset primerov zato dajte tudi nekaj težjih: nepopoln dokument, zelo dolgo sporočilo, nejasno vprašanje, pri katerem bi se tudi dva sodelavca težko strinjala.

Iz primerov pred preizkusom odstranite imena in druge osebne podatke strank. Druga možnost je, da uporabljate poslovni paket, ki je za take podatke dovoljen.

### 2. Zapišite, kdaj je rezultat dober

Merilo naj bo konkretno. "Dober povzetek" ni merilo. "Povzetek ima številko naročila, opis težave in zahtevo stranke ter ni daljši od petih vrstic" je merilo. Anthropic priporoča, da je merilo natančno in da ga je mogoče izmeriti. Večina rab potrebuje več meril hkrati, na primer točnost, ton, varovanje zasebnosti, hitrost in ceno.

### 3. Spremenite eno stvar naenkrat

Določite model, navodilo in dokumente, ki jih AI dobi, in jih med preizkusom ne spreminjajte. Ko želite nekaj izboljšati, spremenite samo eno stvar in ponovite vseh deset primerov. Če hkrati zamenjate model in prepišete navodilo, ne boste vedeli, kaj je pomagalo.

### 4. Rezultate zapisujte v tabelo

Za vsak primer zapišite:

| Primer | Uspelo (da/ne) | Koliko popravkov | Ročno delo (min) | Strošek | Čas |
|---|---|---|---|---|---|
| Reklamacija 1 | | | | | |
| Reklamacija 2 | | | | | |

Največ povesta stolpca s popravki in ročnim delom. Če rešitev uspe pri osmih primerih od desetih, a pri vsakem porabite deset minut za popravke, morda sploh ne prihrani časa.

### 5. Ponovite po vsaki spremembi

Isto tabelo izpolnite po vsaki spremembi navodila ali modela. Tako vidite, ali je rešitev res boljša ali samo drugačna. Ko so rezultati več krogov zapored podobni in je ročnega dela malo, lahko rešitev preizkusi širša skupina.

Viri: [Anthropic, Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests), [The Neuron, 28. september 2026](https://www.theneurondaily.com/p/did-openai-lose-control)

## Koliko preizkušanja je dovolj

Andrew Ng, ustanovitelj DeepLearning.AI, v tedenskem pismu v glasilu The Batch svetuje, naj bo preizkušanje tako obsežno, kot je zrela rešitev. Na začetku je dovolj ročno pregledati ducat primerov in presoditi, ali so rezultati smiselni. Pri zrelem izdelku pa gre za desettisoče primerov, natančnejša merila in preverjanje, kaj se zgodi po odgovoru, ne samo, kako dober je odgovor.

Za manjše podjetje je prava mera nekje vmes. Za prvi poskus zadošča deset primerov in vaša presoja. Ko rešitev dobijo vsi zaposleni ali ko njen rezultat gre navzven (odgovori strankam, knjiženje, naročila), jo preizkusite na več primerih. Rezultate naj pregleda še nekdo, ki rešitve ni pripravljal.

Vir: [The Batch, številka 372](https://www.deeplearning.ai/the-batch/issue-372/)

## Kontrolni seznam

- [ ] Imamo deset pravih primerov iz svojega dela, med njimi nekaj težjih.
- [ ] Iz primerov smo odstranili osebne podatke ali uporabljamo orodje, ki je za njih dovoljeno.
- [ ] Preden smo začeli, smo zapisali, kdaj je rezultat dober.
- [ ] Model, navodilo in dokumenti so bili med preizkusom enaki.
- [ ] Za vsak primer imamo zapisan uspeh, popravke, ročno delo, strošek in čas.
- [ ] Po vsaki spremembi smo ponovili vseh deset primerov.
- [ ] Preden rešitev dobijo vsi, jo je pregledal še nekdo drug.

Če rešitev šele izbirate, pomaga vodnik [Kako izbrati AI orodje za podjetje](/vodniki/kako-izbrati-ai-orodje-za-podjetje/). Kako napisati navodila, ki jih nato preizkušate, opisuje vodnik [Kako napisati dober prompt](/vodniki/kako-napisati-dober-prompt/).
