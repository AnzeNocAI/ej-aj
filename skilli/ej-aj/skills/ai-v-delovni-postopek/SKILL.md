---
name: ai-v-delovni-postopek
description: Vodi uporabnika po korakih, da delovni postopek (na primer pripravo ponudb, odgovore na povpraševanja, povzemanje reklamacij, mesečno poročilo) opiše tako, da ga lahko opravlja AI, preveri, ali je postopek primeren za AI, in na koncu iz tega napiše skill s preizkusnimi primeri. Uporabi, ko uporabnik reče "uvedi AI v postopek", "avtomatiziraj to nalogo", "naredi skill iz mojega postopka", "kako bi to delal z AI" ali opisuje ponavljajoče se delo, ki bi ga rad prepustil AI.
---

# AI v delovni postopek

Z uporabnikom se pogovarjaš v slovenščini, po en sklop vprašanj naenkrat. Ne zasipaj ga z vsemi
vprašanji hkrati. Ko česa ne ve, predlagaj razumno privzeto vrednost in jo označi kot predlog.

```
- [ ] 1. Izbira postopka
- [ ] 2. Ali je postopek primeren za AI
- [ ] 3. Opis postopka
- [ ] 4. Merilo uspeha in preizkusni primeri
- [ ] 5. Osnutek skilla
- [ ] 6. Preizkus in naslednji koraki
```

## 1. Izbira postopka

Vprašaj, katero nalogo bi rad prepustil AI, kako pogosto jo opravlja in koliko časa vzame. Če jih
našteje več, predlagaj, naj začne s tisto, ki se ponavlja vsaj tedensko, ima jasen vhod in izhod in
pri kateri napaka ni draga. Eno nalogo izpelji do konca, preden začneš drugo.

## 2. Ali je postopek primeren za AI

Preveri skupaj z uporabnikom in povej, kaj si ugotovil:

- **Podatki.** Ali naloga vsebuje osebne podatke, podatke strank ali poslovne skrivnosti? Če da, naj jo dela le v orodju s pogodbo o obdelavi podatkov (poslovni paket), sicer naj podatke prej odstrani. Tega ne preskoči.
- **Posledice napake.** Kaj se zgodi, če AI naredi napako? Če gre rezultat neposredno stranki, v knjigovodstvo ali v odločitev o zaposlenih, mora vsak rezultat pred uporabo pregledati človek.
- **Odločitve o ljudeh.** Pri zaposlovanju, ocenjevanju dela in podobnem opozori, da veljajo posebna pravila (Akt o umetni inteligenci, varstvo osebnih podatkov) in naj pred uvedbo vpraša pravnika.
- **Ponovljivost.** Ali dva sodelavca nalogo opravita podobno? Če ne, najprej skupaj zapišita, kako naj se dela.

Če postopek ni primeren, to jasno povej in predlagaj manjši del, ki je.

## 3. Opis postopka

Z vprašanji izpelji:

1. **Vhod:** kaj dobi AI (e-pošta, PDF, tabela, zapiski) in v kakšni obliki.
2. **Koraki:** kaj človek danes naredi, po vrsti. Kje se odloča in po čem.
3. **Pravila:** kaj vedno velja, z razlogom (na primer: cen ne navajamo brez cenika, ker se spreminjajo).
4. **Viri:** kateri dokumenti so potrebni (cenik, predloga, pravilnik) in kje so.
5. **Izhod:** kaj je rezultat, v kakšni obliki, kako dolg, komu gre.
6. **Ročni koraki:** kaj mora vedno narediti ali potrditi človek (pošiljanje, plačilo, objava).
7. **Izjeme:** kaj naj AI naredi, ko podatek manjka ali je primer nenavaden. Privzeto: vpraša, ne ugiba.

Opis pokaži uporabniku in ga popravi, dokler ne reče, da drži.

## 4. Merilo uspeha in preizkusni primeri

Skupaj zapišita, kdaj je rezultat dober, konkretno in preverljivo. "Dober povzetek" ni merilo.
"Povzetek ima številko naročila, opis težave in zahtevo stranke ter ni daljši od petih vrstic" je.

Prosi za deset pravih primerov iz zadnjih tednov, med njimi nekaj težjih (nepopoln dokument, nejasna
zahteva). Opozori ga, naj iz njih odstrani imena in druge osebne podatke, če ne dela v orodju, ki je
za take podatke dovoljeno. Če primerov še nima, zapiši tri scenarije: običajen, z manjkajočimi
podatki in mejni.

## 5. Osnutek skilla

Napiši skill po predlogi v [predloga-skilla.md](predloga-skilla.md):

- Ime z malimi črkami in vezaji, ki opiše dejavnost (na primer `priprava-ponudb`).
- Opis v tretji osebi: kaj naredi in kdaj ga uporabiti, z besedami, ki jih uporabnik res uporablja.
- Za korake, ki morajo biti vsakič enaki (izračun, oblika imena datoteke), predlagaj skripto ali natančno pravilo. Za pisanje pusti več svobode.
- Na koncu postopka korak preverjanja: naredi, preveri po merilu, popravi, preveri znova.
- Ročni koraki iz 3. koraka (točka 6) so v skillu zapisani kot "počakaj na potrditev uporabnika".
- Samo tisto, česar Claude ne ve: pravila, predloge in izjeme tega podjetja. Brez splošnih razlag.

Za vsak dokument iz 3. koraka (točka 4) ustvari datoteko v mapi skilla ali vanjo zapiši
`[DOPOLNI: ...]` in uporabniku povej, katere datoteke mora dodati. Preizkusne primere in scenarije
iz 4. koraka shrani v `preizkus.md` v mapi skilla, skupaj s tabelo iz 6. koraka.

Skill shrani kot mapo z datoteko `SKILL.md` tja, kamor želi uporabnik. Za Claude Code je to
`.claude/skills/<ime>/` v projektu ali `~/.claude/skills/<ime>/`. Za aplikacijo Claude mapo stisni
v ZIP, ki ga uporabnik naloži med skille v nastavitvah. Če uporabnik dela v ChatGPT ali drugem
klepetalniku brez skillov, vsebino `SKILL.md` uporabi kot navodila projekta, dokumente pa naloži kot
datoteke projekta.

Če je na voljo skill `pregled-skilla`, z njim preveri osnutek in popravi ugotovitve.

## 6. Preizkus in naslednji koraki

Uporabniku povej, naj:

1. skill preizkusi v novi seji na desetih primerih in za vsakega zapiše, ali je uspel, koliko je moral popraviti in koliko časa je porabil;
2. naenkrat spremeni le eno stvar (navodilo, model ali dokumente) in ponovi vse primere;
3. skill pokaže sodelavcu, ki ga ni pisal, preden ga dobijo vsi.

Ponudi tabelo za zapisovanje rezultatov:

| Primer | Uspelo (da/ne) | Koliko popravkov | Ročno delo (min) | Opomba |
|---|---|---|---|---|
