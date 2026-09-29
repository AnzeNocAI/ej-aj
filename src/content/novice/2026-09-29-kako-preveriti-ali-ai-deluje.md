---
title: 'Kako preveriti, ali AI pri vašem delu res deluje'
description: 'Preprost postopek za ekipe: deset realnih nalog, jasno merilo uspeha, ena sprememba naenkrat in tabela z rezultati. Tako veste, ali je AI rešitev res pripravljena za vsakdanjo rabo.'
date: 2026-09-29
type: vodnik
---

Ko ekipa AI uporablja nekaj tednov, se pojavi vprašanje, ali neka rešitev res deluje: navodilo za povzemanje reklamacij, skill za pripravo ponudb, avtomatizacija za razvrščanje e-pošte. Odgovor "zdi se mi, da kar dobro" ni dovolj, da bi rešitev dali vsem zaposlenim. Ta vodnik opisuje preprost postopek, s katerim to preverite brez programiranja in brez posebnih orodij.

## Na kratko

- Preizkusite na desetih realnih nalogah iz svojega dela, ne na splošnih testih ali primerih s spleta.
- Pred testom zapišite, kaj pomeni uspeh. Za vsako nalogo beležite, ali je uspela, koliko ste morali popraviti, koliko je stala in koliko časa je vzela.
- Spremenite eno stvar naenkrat (model, navodilo ali priložene dokumente), vse drugo pustite enako.
- Obseg testiranja naj sledi zrelosti rešitve: za prvi poskus je dovolj ročno pregledati ducat primerov, za rešitev, ki jo uporablja vse podjetje, potrebujete več.

## Zakaj ne zadošča izbrati "najboljši model"

Rezultat ni odvisen samo od modela, ampak tudi od tega, kar je okoli njega: navodil, dokumentov, ki jih model dobi, orodij, do katerih ima dostop, in tega, kaj si zapomni med koraki. Primer iz septembra 2026: fundacija ARC Prize je isti model, Gemini 3.8 Flash, testirala na testu ARC-AGI-3 z dvema različnima nastavitvama. S standardno je dosegel 10,37 %, z nastavitvijo, ki med zahtevami ohrani modelovo prejšnje razmišljanje in krajša dolge pogovore, pa 35 %. Model je bil isti, rezultat več kot trikrat boljši.

Za podjetje to pomeni, da primerjave modelov na lestvicah malo povedo o tem, kako bo AI opravil vaše delo. To morate preizkusiti sami, na svojih nalogah.

Viri: [ARC Prize, Gemini 3.8 Flash](https://arcprize.org/results/google-gemini-3-8-flash), [The Neuron, 28. september 2026](https://www.theneurondaily.com/p/did-openai-lose-control)

## Postopek v petih korakih

### 1. Izberite deset realnih nalog

Vzemite primere iz zadnjih tednov: deset pravih reklamacij, deset povpraševanj, deset računov. Anthropic v navodilih za testiranje priporoča, naj testi posnemajo resnično mešanico nalog, in naj ne pozabite na robne primere. Med deset primerov zato dajte tudi nekaj težjih: nepopoln dokument, zelo dolgo sporočilo, nejasno vprašanje, pri katerem bi se tudi dva sodelavca težko strinjala. Podatke strank pred testom anonimizirajte ali uporabljajte samo poslovni paket, ki je dovoljen za take podatke.

### 2. Zapišite, kaj je uspeh

Merilo naj bo konkretno. "Dober povzetek" ni merilo. "Povzetek ima številko naročila, opis težave in zahtevek stranke, v največ petih vrsticah" je. Anthropic priporoča, da je merilo natančno in merljivo, ter opozarja, da večina rab potrebuje več meril hkrati, na primer točnost, ton, varovanje zasebnosti, hitrost in ceno.

### 3. Zamrznite vse razen ene stvari

Določite model, navodilo in dokumente, ki jih AI dobi, ter jih med testom ne spreminjajte. Ko želite nekaj izboljšati, spremenite samo eno stvar in ponovite vseh deset nalog. Če hkrati zamenjate model in prepišete navodilo, ne boste vedeli, kaj je pomagalo.

### 4. Beležite v tabelo

Za vsako nalogo zapišite:

| Naloga | Uspelo (da/ne) | Koliko popravkov | Ročno delo (min) | Strošek | Čas |
|---|---|---|---|---|---|
| Reklamacija 1 | | | | | |
| Reklamacija 2 | | | | | |

Najbolj povedni sta stolpca s popravki in ročnim delom. Rešitev, ki uspe v osmih primerih od desetih, a pri vsakem zahteva deset minut popravljanja, morda ne prihrani časa.

### 5. Ponovite po vsaki spremembi

Isto tabelo izpolnite po vsaki spremembi navodila ali modela. Tako vidite, ali se je rešitev res izboljšala ali se je le spremenila. Ko rezultat ostane stabilen in je ročnega dela malo, je rešitev pripravljena, da jo preizkusi širša skupina.

Viri: [Anthropic, Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests), [The Neuron, 28. september 2026](https://www.theneurondaily.com/p/did-openai-lose-control)

## Koliko testiranja je dovolj

Andrew Ng v svojem tedenskem pismu v The Batch svetuje, naj se obseg testiranja prilagodi zrelosti projekta. Na začetku je dovolj ročno pregledati ducat primerov in presoditi, ali so smiselni. Pri zrelem izdelku pa gre za desettisoče primerov, natančnejšo ocenjevalno lestvico in preverjanje posledic, ne samo kakovosti posameznega odgovora.

Za manjše podjetje je sredina običajno prava mera. Za prvi poskus zadošča deset primerov in vaša presoja. Ko rešitev daste vsem zaposlenim ali jo povežete z ukrepi navzven (odgovori strankam, knjiženje, naročila), povečajte število primerov in naj rezultate pregleda še nekdo, ki rešitve ni pripravljal.

Vir: [The Batch, številka 372](https://www.deeplearning.ai/the-batch/issue-372/)

## Kontrolni seznam

- [ ] Imamo deset realnih primerov iz svojega dela, med njimi nekaj težjih.
- [ ] Podatki strank so anonimizirani ali v orodju, ki je za njih dovoljeno.
- [ ] Zapisali smo merilo uspeha, preden smo začeli.
- [ ] Model, navodilo in dokumenti so med testom enaki.
- [ ] Za vsak primer imamo zapisan uspeh, popravke, ročno delo, strošek in čas.
- [ ] Po vsaki spremembi smo ponovili vseh deset primerov.
- [ ] Preden rešitev dobijo vsi, jo je pregledal še nekdo drug.

Če rešitev še izbirate, pomaga vodnik [Kako izbrati AI orodje za podjetje](/vodniki/kako-izbrati-ai-orodje-za-podjetje/). Za pisanje navodil, ki jih nato preizkušate, je v priročniku vodnik [Kako napisati dober prompt](/vodniki/kako-napisati-dober-prompt/).
