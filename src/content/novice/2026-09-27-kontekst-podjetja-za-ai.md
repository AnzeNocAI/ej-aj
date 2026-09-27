---
title: 'Kako AI-ju dati kontekst podjetja: projekti, navodila in spomin'
description: 'Kako Claudu enkrat povedati, kdo ste, kako delate in kaj velja, da tega ne ponavljate v vsakem pogovoru. Projekti, navodila, spomin in kaj zapisati.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 3
---

Kakovost odgovora je zelo odvisna od tega, koliko AI ve o vaši nalogi. Kontekst podjetja so informacije, ki jih AI potrebuje vedno znova: kaj podjetje dela, kdo so stranke, kako pišete, katera pravila veljajo. Ta vodnik pove, kam jih zapisati, da jih ne ponavljate v vsakem pogovoru.

## Zakaj ne kar vsega

Mika, da bi AI-ju dali vse dokumente podjetja naenkrat. Anthropic v članku o kontekstnem inženiringu opozarja, da je kontekst omejen vir, nekakšen proračun pozornosti. Ko je besedila v kontekstu vedno več, model vse slabše natančno prikliče, kar v njem piše. Temu pravijo "context rot".

Zato je cilj najmanjša količina informacij, ki zadošča za dobro delo. Namesto celotnega arhiva raje kratek dokument o podjetju in dostop do ostalih dokumentov, ko jih AI potrebuje. Anthropic temu pravi pridobivanje ob pravem času: AI ima seznam, kje kaj najde, in dokument odpre šele, ko ga potrebuje.

Navodila naj bodo na pravi višini. Premalo splošno pomeni dolg seznam togih pravil za vsak primer, preveč splošno pomeni "piši profesionalno". Dobra navodila povedo, kaj je pomembno in zakaj, podrobnosti pa prepustijo modelu.

Vir: [Anthropic, kontekstni inženiring za agente](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## Kam zapisati kontekst v Claudu

Claude ima tri mesta, vsako za drugačen namen.

Navodila za račun veljajo v vseh vaših pogovorih. Sodijo sem stvari, ki veljajo vedno: kdo ste, v katerem jeziku želite odgovore, kakšen ton vam ustreza.

Projekt je delovni prostor za eno področje dela, na primer "Prodaja", "Kadrovske zadeve" ali "Stranka X". Ima svoja navodila in svojo zbirko dokumentov. Pogovori v projektu ne vidijo drug drugega; skupni so jim dokumenti in navodila projekta ter, če je vklopljen, spomin projekta. Posamezna datoteka v projektu je lahko velika do 30 MB. Ko se dokumenti približajo meji konteksta, plačljivi paketi samodejno preklopijo v način, v katerem Claude po dokumentih išče, namesto da jih bere v celoti, in tako zmore do desetkrat več vsebine. V paketih Team in Enterprise lahko projekte delite s sodelavci, z možnostjo branja ali urejanja.

Spomin si iz preteklih pogovorov zapomni vašo vlogo, projekte in želje. V paketih Free, Pro in Max je privzeto vklopljen, v paketih Team in Enterprise ga vklopi skrbnik. Vsak projekt ima svoj spomin, kar pomeni, da se stvari iz enega projekta ne prelivajo v drugega. Kaj si je zapomnil, pregledate in urejate v nastavitvah.

Viri: [Claude, kaj so projekti](https://support.claude.com/en/articles/9517075-what-are-projects), [Claude, ustvarjanje projektov](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects), [Claude, nalaganje datotek](https://support.claude.com/en/articles/8241126-upload-files-to-claude), [Claude, iskanje po dokumentih projekta](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects), [Claude, spomin](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context), [Claude, prilagajanje](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features)

## Kaj zapisati: dokument "O podjetju"

Dober začetek je en kratek dokument, ki ga dodate v vsak projekt. Predlagana vsebina:

1. Kaj podjetje dela, v dveh ali treh povedih, in za koga.
2. Glavni izdelki ali storitve, z razlikami med njimi.
3. Kdo so stranke in kaj jim je pomembno.
4. Kako pišemo: vikanje ali tikanje, ton, besede, ki jih uporabljamo ali ne.
5. Pravila, ki veljajo vedno, z razlogom (na primer: cen ne navajamo brez cenika, ker se spreminjajo).
6. Kje so drugi dokumenti (ceniki, predloge, pravilniki) in kdaj jih uporabiti.

Dokument naj bo kratek. Kar potrebujete le občasno, na primer podroben cenik, naj bo ločen dokument v projektu, ki ga AI odpre, ko ga potrebuje. Pred dodajanjem preverite, katerih podatkov ne sme biti v AI orodju; vodnik [Kateri podatki ne sodijo v ChatGPT](/vodniki/varna-raba-ai-v-podjetju/) to opisuje po točkah.

## Kako preverite, ali kontekst deluje

Postavite tri do pet vprašanj, na katera poznate pravi odgovor, na primer "Kdo so naše tri glavne vrste strank?" ali "Napiši kratek odgovor stranki, ki sprašuje po roku dobave". Če so odgovori splošni ali napačni, v kontekstu nekaj manjka ali je zapisano nejasno. Ista vprašanja ponovite, ko dokument spremenite.

Kontekst ni narejen enkrat za vselej. Ko AI večkrat naredi isto napako, dopišite pravilo z razlogom. Ko pravilo ni več potrebno, ga odstranite.

## Kontekst v Claude Code

V Claude Code ima kontekst obliko datoteke `CLAUDE.md`, ki jo Claude prebere na začetku vsake seje. Ker je to navadna datoteka, jo lahko hranite skupaj z ostalimi dokumenti podjetja, tudi na GitHubu. Ali je to dobra ideja, je opisano v delu [Kontekst podjetja na GitHubu: da ali ne](/vodniki/kontekst-podjetja-na-githubu/).
