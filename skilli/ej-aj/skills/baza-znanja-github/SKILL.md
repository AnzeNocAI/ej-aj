---
name: baza-znanja-github
description: Postavi mapo oziroma repozitorij Git kot bazo znanja podjetja za AI (CLAUDE.md, dokument o podjetju, pravila pisanja, predloge, skilli) in ga pripravi za zasebni repozitorij na GitHubu. Preveri, da v njem ni gesel in osebnih podatkov. Uporabi, ko uporabnik želi "bazo znanja za AI", "kontekst podjetja na GitHubu", "CLAUDE.md za podjetje", "repozitorij z navodili za AI" ali uredi dokumente podjetja za Claude Code.
---

# Baza znanja podjetja na GitHubu

Ustvariš mapo z dokumenti, ki jih AI potrebuje vedno znova, in jo pripraviš za zasebni repozitorij.
Z uporabnikom govoriš v slovenščini. Repozitorija na GitHubu sam ne ustvariš in ničesar ne potisneš
(push), dokler uporabnik tega izrecno ne potrdi.

```
- [ ] 1. Ali je GitHub prava izbira
- [ ] 2. Struktura mape
- [ ] 3. Dokument o podjetju in CLAUDE.md
- [ ] 4. Varnostni pregled
- [ ] 5. Git in GitHub
- [ ] 6. Preizkus
```

## 1. Ali je GitHub prava izbira

Vprašaj, ali podjetje uporablja Claude Code ali drugo orodje, ki dela z datotekami, in ali je kdo, ki
pozna osnove Gita. Če AI uporabljajo samo v klepetu, svetuj projekt v orodju, ki ga že uporabljajo
(Claude ali ChatGPT), z navodili in dokumenti namesto repozitorija; tam
dokument o podjetju (korak 3) prav tako pride prav. Če nihče ne bo skrbel za repozitorij, to povej:
zapuščen repozitorij z zastarelimi pravili je slabši od nobenega.

## 2. Struktura mape

Vprašaj za ime in mesto mape. Privzeto ustvari:

```
<ime-mape>/
├── CLAUDE.md              kratka navodila, ki jih Claude Code prebere na začetku vsake seje
├── README.md              za ljudi: kaj je v repozitoriju in kdo ga ureja
├── podjetje/
│   └── o-podjetju.md      kdo smo, kaj delamo, za koga
├── pravila/
│   └── pisanje.md         ton, vikanje ali tikanje, besede, ki jih (ne) uporabljamo; pomaga skill slovenski-slog
├── predloge/              predloge dokumentov (ponudba, odgovor stranki ...)
├── .claude/skills/        skilli, ki veljajo za vse v ekipi
└── .gitignore
```

Mape, ki jih podjetje ne potrebuje, izpusti. Ne ustvarjaj praznih datotek "za kasneje".

## 3. Dokument o podjetju in CLAUDE.md

Izhodišče sta predlogi [predloge/o-podjetju.md](predloge/o-podjetju.md) in
[predloge/CLAUDE-predloga.md](predloge/CLAUDE-predloga.md); drugo shrani kot `CLAUDE.md`. Podatke izpelji z vprašanji, ne
izmišljuj si jih. Česar uporabnik ne ve, pusti v oglatem oklepaju, kot je v predlogi. Seznam "Kje kaj
najdeš" v `CLAUDE.md` uskladi z mapami, ki res obstajajo. Za `README.md` zadošča nekaj vrstic: kaj je
v repozitoriju, kdo ga ureja in kako predlagate spremembo.

Pravila:

- `CLAUDE.md` naj bo kratek (Anthropic svetuje manj kot 200 vrstic). Vsebuje le, kar velja vedno, in seznam, kje so drugi dokumenti. Podrobnosti so v ločenih datotekah, ki jih Claude odpre, ko jih potrebuje.
- Vsako pravilo ima razlog, da ga AI lahko pravilno uporabi tudi v primeru, ki ga pravilo ne našteje.
- Dokumenti so kratki. Podrobni ceniki in pravilniki so ločene datoteke.

## 4. Varnostni pregled

Pred prvim commitom preglej vse datoteke v mapi, na primer z
`grep -rnIE 'sk-|ghp_|password|geslo|BEGIN .*PRIVATE KEY|[0-9]{13}' .`, in uporabniku poročaj:

- gesla, dostopni ključi, žetoni (na primer `sk-...`, `ghp_...`, `password=`), datoteke `.env`;
- osebni podatki strank in zaposlenih (imena z e-naslovi, telefoni, EMŠO, davčne številke, zdravstveni podatki);
- dokumenti z oznako poslovne skrivnosti ali zaupno.

Najdeno pokaži in vprašaj, kaj naj odstraniš. V `.gitignore` dodaj vsaj `.env`, `*.key`, `*.pem`,
`.DS_Store` in mapo za osebne zapiske, če jo uporabnik želi. Opozori, da izbrisana datoteka v Gitu ostane v
zgodovini: če je geslo kdaj že bilo v repozitoriju, ga je treba zamenjati.

## 5. Git in GitHub

Po potrditvi uporabnika:

1. `git init` in prvi commit v lokalni mapi.
2. Repozitorij na GitHubu mora biti **zaseben**. Če ima uporabnik nameščen `gh`, predlagaj
   `gh repo create <ime> --private --source . --push`, a ga poženi šele, ko uporabnik potrdi ime
   in organizacijo. Sicer mu povej korake na github.com (New repository, Private).
3. Svetuj: dostop le ljudem, ki ga potrebujejo; spremembe pravil prek pull requesta, ki ga pregleda
   odgovorna oseba; za gesla upravljalnik gesel, ne repozitorij.

## 6. Preizkus

Predlagaj tri do pet vprašanj, na katera uporabnik pozna pravi odgovor (na primer "Kdo so naše
glavne stranke?" ali "Napiši kratek odgovor stranki, ki sprašuje po roku dobave"). Naj jih postavi
v novi seji Claude Code v tej mapi. Če so odgovori splošni ali napačni, v dokumentih nekaj manjka
ali je nejasno. Ko AI večkrat naredi isto napako, naj dopiše pravilo z razlogom.
