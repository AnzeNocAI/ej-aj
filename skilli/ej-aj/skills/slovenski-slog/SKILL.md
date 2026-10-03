---
name: slovenski-slog
description: Piše in popravlja slovenska besedila tako, da ne zvenijo kot AI (brez napihnjenih besed, sloganov, nizov po tri in praznih zaključkov), in s slovenskim zapisom številk, datumov, odstotkov in valut. Uporabi pri pisanju ali urejanju slovenskih člankov, objav, e-pošte, ponudb in spletnih besedil ter ko uporabnik reče "popravi slog", "da ne bo zvenelo kot AI", "preveri besedilo" ali "slovenski zapis številk".
---

# Slovenski slog

Ko pišeš ali urejaš slovensko besedilo, upoštevaj spodnja pravila. Pri urejanju obstoječega
besedila spreminjaj le tisto, kar krši pravila, in ohrani avtorjev glas.

## Osnovno pravilo

Povej, kaj se je zgodilo, kaj nekaj stane in kaj počne. Ne razlagaj bralcu, zakaj je to pomembno ali
kako impresivno je. Če bi poved veljala tudi za drugo podjetje, izdelek ali državo, je preveč
splošna: izbriši jo ali dodaj konkreten podatek. Podatka si ne izmišljuj; če ga ni v besedilu,
vprašaj uporabnika ali poved izbriši.

## Besede, ki se jim izogibaj

Ena v daljšem besedilu je v redu, več skupaj ne.

- Napihnjene: ključen, bistven, prelomen, revolucionaren, izjemen, celovit, temeljit, pomemben mejnik, nov standard, igra spremeni pravila.
- Prazni uvodi: "V današnjem hitro spreminjajočem se svetu", "Ni skrivnost, da", "Pomembno je poudariti", "Velja omeniti", "Skratka", "Za konec".
- Prazni vezniki na začetku povedi: Poleg tega, Prav tako, Nadalje, Hkrati pa. Poved je praviloma boljša brez njih.
- Nejasni viri: "strokovnjaki opozarjajo", "po mnenju analitikov". Imenuj vir ali izbriši.

## Strukture, ki se jim izogibaj

- Slogani iz nasprotij: "Brez X, z Y", "Ne gre le za X, ampak za Y", "Več kot le X".
- Repi z "kar" ali deležnikom, ki dodajo oceno: "..., s čimer podjetje utrjuje svoj položaj", "..., kar poudarja pomen ...". Poved končaj pri dejstvu.
- Nizi po tri povsod: trije pridevniki, trije samostalniki, trije vzporedni stavki. Uporabi enega, dva ali štiri, kolikor jih dajo dejstva.
- "Od X do Y" kot širok razpon ("od prvih korakov do celovitih rešitev ...").
- Alineje, ki se vse začnejo z odebeljeno oznako in dvopičjem. Raje kratki odstavki.
- Povzetki, ki ponovijo razdelek, in moralni zaključki ("Nauk: ...").
- Menjavanje sopomenk za isto stvar (model, sistem, orodje, rešitev). Ponovi samostalnik.

## Kako naj besedilo zveni

- Preprosti glagoli: je, ima, stane, velja, ne dela.
- Konkretne številke, datumi, imena in mehanizmi.
- Različno dolge povedi. Mnenje je označeno kot mnenje.
- Strokovni izraz ob prvi omembi kratko pojasni.
- Naslov pove, o čem je besedilo, brez vab za klike in hvalnic.

## Zapis

- Brez dolgega pomišljaja (—) in brez kratkega pomišljaja (–) kot nadomestka. Uporabi vejico, dvopičje, oklepaj ali novo poved. Razpon zapiši z besedo: "17. do 26. september", "od 10 do 20 %".
- Tisočice s piko, decimalke z vejico: 1.500, 0,10 EUR, 3,5 milijona.
- Presledek pred znakom za odstotek in valuto: 40 %, 23 €, 15 USD.
- Datum: 3. oktober 2026, 3. 10. 2026 (s presledki).
- Narekovaji: »...«, „..." ali "...", dosledno v celem besedilu.

## Preverjanje

Ko je besedilo napisano ali popravljeno, poženi skripto iz mape tega skilla (tam, kjer je ta
`SKILL.md`) s polno potjo:

```bash
python3 <mapa-tega-skilla>/scripts/preveri_besedilo.py <datoteka>
```

Skripta najde pomišljaje, angleški zapis številk, manjkajoče presledke pred % in valutami ter besede
s seznama zgoraj. Popravi, kar najde, in jo poženi znova. Če besedilo ni v datoteki, ga shrani v
začasno datoteko in jo preveri.

Nato besedilo preberi še sam in preveri:

1. Ali bi poved lahko opisovala katerokoli drugo podjetje ali izdelek? Prepiši jo.
2. Poskusno izbriši zadnji del dolge povedi. Če poved brez njega pove isto, ga pusti izbrisanega.
3. Preštej odebeljene oznake in nize po tri.
4. Bi skeptičen bralec ob kateri povedi zavil z očmi? Prepiši jo.
5. Ali naslov pove točno, o čem je besedilo, in je vsak strokovni izraz pojasnjen?
