---
name: pravila-rabe-ai
description: Pripravi interna pravila rabe orodij umetne inteligence za konkretno slovensko podjetje (dovoljena orodja, podatki, preverjanje rezultatov, označevanje, povezave, usposabljanje, napake) po predlogi ej-aj.si in z vprašanji prilagodi besedilo. Uporabi, ko uporabnik želi "pravila rabe AI", "politiko uporabe ChatGPT", "interni akt za AI", "pravilnik o umetni inteligenci" ali se pripravlja na AI pismenost po Aktu o umetni inteligenci.
---

# Pravila rabe AI za podjetje

Iz predloge v [predloga.md](predloga.md) pripraviš pravila za uporabnikovo podjetje. Z uporabnikom
govoriš v slovenščini in vprašanja postavljaš po en korak naenkrat. Na začetku povej, da predloga ni
pravni nasvet: če podjetje AI uporablja za odločitve o ljudeh (zaposlovanje, ocenjevanje dela) ali obdeluje zdravstvene podatke, naj pravila
pred uveljavitvijo pokaže pravniku ali pooblaščencu za varstvo podatkov.

```
- [ ] 1. Podatki o podjetju
- [ ] 2. Orodja
- [ ] 3. Podatki, ki jih podjetje obdeluje
- [ ] 4. Posebne rabe
- [ ] 5. Osnutek pravil
- [ ] 6. Pregled in oddaja
```

## 1. Podatki o podjetju

Vprašaj za ime podjetja, odgovorno osebo za pravila (ime in priimek, funkcija, e-naslov), datum
začetka veljavnosti in dejavnost. Imena odgovorne osebe ne izmišljuj; če ga uporabnik ne pove, pusti oglati oklepaj.

## 2. Orodja

Vprašaj, katera orodja AI podjetje plačuje ali dovoli (na primer ChatGPT Business, Claude Team,
Microsoft 365 Copilot, Gemini v Google Workspace), kdo jih uporablja in za katere naloge. Če uporabnik
omeni le paket (Microsoft 365, Google Workspace), vprašaj, ali uporabljajo vgrajenega pomočnika AI
(Copilot, Gemini). Za vsako orodje vprašaj, ali ima podjetje s ponudnikom pogodbo o obdelavi podatkov.
Če ne ve, v tabelo zapiši "preveriti" in v povzetku opozori, da brez nje osebni podatki v to orodje ne
sodijo.

Ne trdi, ali ima določen paket pogodbo o obdelavi podatkov, če tega nisi preveril na strani
ponudnika. Paketi in pogoji se spreminjajo.

## 3. Podatki, ki jih podjetje obdeluje

Vprašaj, s katerimi občutljivimi podatki dela podjetje (podatki pacientov, otrok, finančni podatki
strank, poklicna tajnost, kot sta odvetniška ali zdravniška) in kateri dokumenti so poslovna
skrivnost. Dopolni 3. poglavje. Kar za podjetje ne velja, izbriši; kar je posebnega, dopiši.

## 4. Posebne rabe

Vprašaj, ali podjetje:

- ima klepetalnik na spletni strani (točka 5.1);
- ustvarja ali predeluje slike, zvok ali video resničnih ljudi, predmetov, krajev ali dogodkov (točka 5.2);
- objavlja z AI pripravljena besedila za javnost (točka 5.3);
- povezuje AI z e-pošto, diskom ali poslovnimi sistemi (6. poglavje);
- uporablja ali namerava uporabljati AI pri zaposlovanju ali ocenjevanju zaposlenih (točka 4.3).

Točke 5.1, 5.2 in 5.3, ki ne veljajo, izbriši. Zaščitnih točk ne briši:

- Če povezav AI z drugimi sistemi ni, izbriši le 6.1; 6.2 in 6.3 ohrani.
- Če AI pri zaposlovanju ne uporabljajo, točko 4.3 nadomesti s "AI pri zaposlovanju in odločitvah o
  zaposlenih ne uporabljamo." Če jo uporabljajo, še enkrat priporoči pravnika.

## 5. Osnutek pravil

Pripravi celotno besedilo po strukturi predloge (9 poglavij in 2 prilogi). Pravila:

- Oglate oklepaje zamenjaj s podatki iz pogovora in pri tem pazi na sklon. Kar ni znano, pusti v
  oglatem oklepaju, da je vidno.
- Ne dodajaj novih pravnih trditev ali sklicev na zakone, ki jih ni v predlogi.
- Jezik ostane preprost in kratek, kot v predlogi.
- Ne spreminjaj številčenja točk, razen če celo točko izbrišeš; takrat preštevilči in uskladi
  razdelek Vsebina ter sklice na poglavja.

Besedilo shrani v datoteko, ki jo izbere uporabnik (privzeto `pravila-rabe-ai-<podjetje>.md`). Če želi
Word, mu povej, da je enaka predloga v obliki Word na
https://ej-aj.si/predloge/pravila-rabe-ai.docx, ali besedilo pretvori v .docx, če imaš za to orodje.

## 6. Pregled in oddaja

Preden oddaš, preveri:

1. Ali so vsa orodja iz pogovora v tabeli v 2. poglavju?
2. Ali je pri vsakem orodju zapisano, ali obstaja pogodba o obdelavi podatkov, ali "preveriti"?
3. Ali so posebni podatki dejavnosti v 3. poglavju?
4. Ali so izbrisane točke, ki ne veljajo, preštevilčene ostale ter usklajeni Vsebina in sklici?
5. Ali so ostali oglati oklepaji le tam, kjer podatka res ni?

Nato uporabniku napiši kratek povzetek: kaj je še treba dopolniti, katera orodja preveriti in naslednje
korake (podpis odgovorne osebe, seznanitev zaposlenih s podpisom v Prilogi 2, usposabljanje in vpis v
Prilogo 1, letni pregled).
