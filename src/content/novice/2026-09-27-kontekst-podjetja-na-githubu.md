---
title: 'Kontekst podjetja na GitHubu: da ali ne'
description: 'Ali naj podjetje dokumente za AI (CLAUDE.md, pravila, predloge) hrani v repozitoriju na GitHubu? Prednosti, tveganja, zasebni repozitoriji, gesla in kdaj je bolje ne.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 5
---

Ko podjetje začne resno uporabljati AI, se nabere veliko navodil: dokument o podjetju, pravila pisanja, predloge, skilli. Vprašanje je, kje jih hraniti, da so vsem dostopni, urejeni in varni. Ena od možnosti je repozitorij na GitHubu. Ta vodnik našteje dejstva, na koncu pa povemo, kaj priporočamo.

## Kako Claude bere kontekst iz datotek

Claude Code na začetku vsake seje prebere datoteko `CLAUDE.md`. Ta je lahko v domači mapi uporabnika (velja za vse njegove projekte), v korenu projekta (velja za projekt) ali v podmapah; datoteke v podmapah prebere, ko začne delati v tisti mapi. Datoteke se ne izključujejo, ampak seštevajo. Anthropic svetuje, naj bo posamezna datoteka krajša od 200 vrstic. Z ukazom `/init` Claude pripravi prvi osnutek, datoteko pa je smiselno shraniti v Git, da jo ima vsa ekipa. Claude Code bere tudi datoteko `AGENTS.md`, ki jo uporabljajo nekatera druga orodja, privzeto le, kadar `CLAUDE.md` ni.

Tudi Claude v brskalniku lahko bere z GitHuba. V pogovor ali projekt dodate izbrane datoteke in mape z repozitorija. Claude sinhronizira samo imena in vsebino datotek na izbrani veji, brez zgodovine sprememb. Najnovejše spremembe prenesete z gumbom "Sync now". Za zasebne repozitorije je treba namestiti aplikacijo Claude za GitHub. Integracija datoteke z GitHuba samo prebere v pogovor ali projekt.

Viri: [Claude Code, spomin in CLAUDE.md](https://code.claude.com/docs/en/memory), [Claude, CLAUDE.md in boljši prompti](https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts), [Claude, povezava z GitHubom](https://support.claude.com/en/articles/10167454-use-the-github-integration)

## Kaj prinese GitHub

Zgodovino sprememb. Vsaka sprememba navodil je zapisana: kdo jo je naredil, kdaj in zakaj. Ko AI začne delati drugače, lahko pogledate, kaj se je spremenilo, in se vrnete na prejšnjo različico.

Pregled pred objavo. Spremembe pravil lahko gredo skozi predlog sprememb (pull request), ki ga pregleda odgovorna oseba, preden začne veljati za vse.

Eno mesto za vse. Isti `CLAUDE.md`, skilli in predloge veljajo za vse, ki delajo s projektom, v terminalu, urejevalniku, namizni aplikaciji ali na spletu.

## Tveganja

Javno ali zasebno. Javni repozitorij vidi vsak na internetu. Zasebnega vidite vi, ljudje, s katerimi ga delite, in nekateri člani organizacije; lastniki organizacije vidijo vse repozitorije. Kontekst podjetja sodi izključno v zasebni repozitorij.

Gesla in ključi. Pogosta napaka je, da v repozitorij pride geslo ali dostopni ključ. GitHub ima pregledovanje skrivnosti, ki preišče celotno zgodovino na vseh vejah. Za javne repozitorije je brezplačno, za zasebne repozitorije organizacije je potreben plačljivi dodatek Secret Protection (paketa Team ali Enterprise Cloud), za zasebne repozitorije osebnih računov pa običajno ni na voljo. Zaščita pred potiskom za uporabnike je privzeto vklopljena in prepreči, da bi skrivnost potisnili v javni repozitorij. Pri zasebnih repozitorijih jo je treba vklopiti na ravni repozitorija, kar zahteva plačljivi dodatek.

Brisanje ni izbris. Če datoteko z geslom izbrišete, ostane v zgodovini. GitHub svetuje, da skrivnost najprej prekličete ali zamenjate; to je pogosto dovolj. Odstranjevanje iz zgodovine je zahtevno, kopije, ki so jih ljudje že prenesli, pa jo lahko še vedno vsebujejo.

Osebni podatki in poslovne skrivnosti. Za podatke v repozitoriju veljajo ista pravila kot za podatke v AI orodju. Kaj ne sodi nikamor, je opisano v vodniku [Kateri podatki ne sodijo v ChatGPT](/vodniki/varna-raba-ai-v-podjetju/).

Viri: [GitHub, o repozitorijih](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories), [GitHub, pregledovanje skrivnosti](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning), [GitHub, zaščita pred potiskom](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection), [GitHub, odstranjevanje občutljivih podatkov](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Naše priporočilo

Da, če podjetje uporablja Claude Code in ima vsaj eno osebo, ki pozna osnove Gita. Pogoji:

1. Repozitorij je zaseben in dostop imajo le ljudje, ki ga potrebujejo.
2. V repozitoriju ni gesel, ključev, osebnih podatkov strank in dokumentov z oznako poslovne skrivnosti. Za gesla uporabljajte upravljalnik gesel.
3. Spremembe pravil gredo skozi pregled.
4. `CLAUDE.md` je kratek, podrobnosti so v ločenih datotekah, ki jih Claude odpre, ko jih potrebuje.

Ne, če AI uporabljate samo v klepetu. Takrat so projekti v Claudu preprostejši in zadoščajo, kot je opisano v delu [Kako AI-ju dati kontekst podjetja](/vodniki/kontekst-podjetja-za-ai/). Ne tudi, če v podjetju nihče ne bo skrbel za repozitorij: zapuščen repozitorij z zastarelimi pravili je slabši od nobenega.
