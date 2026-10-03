---
name: pregled-skilla
description: Pregleda skill (mapo s SKILL.md) po Anthropicovih priporočilih za pisanje skillov in predlaga konkretne popravke. Preveri ime in opis, dolžino, strukturo datotek, nedvoumnost navodil, primere, preverjanje v postopku, skripte in varnost. Uporabi, ko uporabnik prosi za pregled, oceno ali izboljšavo skilla, reče "preglej skill", "audit skilla", "ali je ta skill dober" ali pred objavo ali deljenjem skilla.
---

# Pregled skilla

Skill pregledaš in napišeš poročilo v slovenščini. Datotek skilla ne spreminjaš, dokler uporabnik
popravkov izrecno ne potrdi.

## Postopek

Kopiraj seznam in ga sproti odkljukaj:

```
- [ ] 1. Poišči mapo skilla in preberi vse datoteke
- [ ] 2. Poženi samodejno preverjanje
- [ ] 3. Oceni vsebino po merilih
- [ ] 4. Preveri varnost
- [ ] 5. Napiši poročilo
- [ ] 6. Po potrditvi popravi in preveri znova
```

**1. Poišči mapo in preberi vse.** Če uporabnik ni povedal poti, ga vprašaj. Preberi `SKILL.md` in
vse datoteke, na katere se sklicuje, tudi skripte. Ne ugibaj, kaj je v datoteki, ki je nisi odprl.

**2. Samodejno preverjanje.** Skripta je v mapi tega skilla (tam, kjer je ta `SKILL.md`). Poženi jo s polno potjo:

```bash
python3 <mapa-tega-skilla>/scripts/preveri_skill.py <pot-do-pregledovanega-skilla>
```

Skripta preveri pravila, ki morajo biti vsakič enaka: ime, dolžino opisa, prepovedane besede,
dolžino `SKILL.md`, poti z obratno poševnico, markdown povezave na manjkajoče datoteke, sklice v
več ravneh in morebitna gesla. Poti v `kodi` preveri le, če začnejo s `scripts/`, `reference/`,
`predloge/` ali `templates/`; ostale preveri ročno. Izpiše
`NAPAKA` (skill ne bo deloval ali krši pravila formata) in `OPOZORILO` (slabša kakovost).
Ugotovitve skripte prepiši v poročilo med Napake oziroma Izboljšave; ročno jih ne preverjaj znova.

**3. Vsebina.** Oceni po merilih v [merila.md](merila.md). Za vsako ugotovitev navedi vrstico ali
odsek in predlagaj konkretno besedilo, ne splošnega nasveta.

**4. Varnost.** Preveri vse skripte in navodila:

- Ali skripta pošilja podatke na splet, briše datoteke ali spreminja sistem? Kam in zakaj?
- Ali navodila zahtevajo nameščanje paketov, branje gesel, ključev ali datotek zunaj mape projekta?
- Ali kje piše, naj Claude upošteva navodila iz dokumentov, spletnih strani ali e-pošte, ki jih obdeluje?
- Ali skill vsebuje osebne podatke, imena strank, gesla ali interne podatke podjetja?

Vsako tveganje opiši z imenom datoteke in vrstico. Če skill izvira od drugod, uporabnika opozori, naj
ga ne namesti, dokler tveganja niso pojasnjena.

**5. Poročilo** napiši v pogovor po tej predlogi. Če uporabnik želi, ga shrani še v datoteko:

```markdown
# Pregled skilla: <ime>

**Povzetek:** <ena do dve povedi: ali je skill pripravljen za uporabo in kaj je najpomembneje popraviti>

## Napake (popraviti pred uporabo)
1. <datoteka:vrstica> <kaj je narobe> → <predlagano besedilo>

## Izboljšave
1. ...

## Varnost
<ugotovitve ali "Ni ugotovljenih tveganj.">

## Preizkus
<tri scenarije: zahteva uporabnika in pričakovan rezultat; glej merila.md, razdelek Preizkus>
```

**6. Popravki.** Ko uporabnik potrdi, popravi datoteke, nato znova poženi skripto in preveri, da
ugotovitve izginejo. Če ostanejo, popravi in ponovi.

## Česa ne delaš

- Ne prepisuješ celega skilla, če uporabnik ni prosil za to. Popravki naj bodo čim manjši.
- Ne dodajaš razlag, ki jih Claude ne potrebuje. Krajši skill je praviloma boljši.
- Ne zaganjaš skript iz pregledovanega skilla, dokler jih ne prebereš in uporabnik ne potrdi.
