---
title: 'AI v računovodstvu: kaj zna, česa ne sme in kako začeti'
description: 'Za računovodske servise in finančne službe: kje AI pri delu pomaga, zakaj zaupnost in e-računi od leta 2028 spreminjajo sliko, kaj svetujejo stroka in ponudniki ter kako začeti.'
date: 2026-09-27
type: vodnik
---

Računovodstvo je delo z dokumenti in številkami, zato se zdi naravno področje za AI. Hkrati je to delo z zaupnimi podatki strank, kjer napaka v številki nekaj stane. Ta vodnik je za računovodske servise in finančne službe v podjetjih: kje AI danes pomaga, česa ne sme in kako začeti.

> **Ni pravni ali davčni nasvet.** Vodnik povzema javne vire. Za konkretne primere, ki zadevajo davke ali varstvo podatkov, se posvetujte s strokovnjakom.

## Na kratko

- AI v računovodstvu pomaga predvsem pri branju dokumentov, analizi tabel, iskanju napak v Excelu in pisanju pojasnil strankam. Za končne izračune in oddaje je še vedno odgovoren računovodja.
- Kodeks poklicne etike računovodje zahteva varovanje zaupnih informacij. Podatki strank zato sodijo samo v poslovna orodja s pogodbo o obdelavi podatkov.
- Od 1. januarja 2028 bo izmenjava e-računov med podjetji v Sloveniji obvezna. E-račun je strukturiran dokument XML, ki ga program prebere brez AI; račun v PDF ni e-račun.
- Microsoft in Anthropic sama opozarjata, da njuna orodja v Excelu delajo napake in da je treba rezultate pred uporabo preveriti.

## Kje AI pomaga

### Branje dokumentov

AI zna prebrati prejete račune v PDF ali kot sliko, izpiske in pogodbe. Vsaj nekateri slovenski računovodski programi to že imajo; e-racuni.com na primer v svoji dokumentaciji za knjigo prejete pošte opisuje branje dokumentov z AI, ki teče, kadar za račun ni datoteke XML. Preverite pri ponudniku svojega programa, kaj ima.

### Delo v Excelu

Claude za Excel po Anthropicovi dokumentaciji odgovarja z navedbo točnih celic, spreminja predpostavke tako, da formule ostanejo povezane, in poišče vzrok napak. Kot primer navodila Anthropic navaja pripravo modela s tremi računovodskimi izkazi iz bruto bilance. Microsoft ima za finance agenta Finance Agent (prej Microsoft Copilot for Finance) z usklajevanjem v Excelu, vendar ta za zdaj deluje samo v ameriški angleščini. Pregled orodij je v vodniku [AI v Excelu, Wordu in Outlooku](/vodniki/ai-v-excelu-wordu-outlooku/).

### Pisanje

AI pripravi osnutke pojasnil strankam, povzetke novih predpisov, odgovore na pogosta vprašanja in navodila za zbiranje dokumentov ob koncu leta. Po naši oceni tu AI prihrani največ časa pri najmanj tveganja, ker vsebino preveri računovodja, preden gre ven.

Viri: [e-racuni.com, zajem podatkov z OCR](https://e-racuni.com/WikiDoc/p?action=nextPage&lang=Slovene&page=OCR+data+capture), [Claude v Excelu](https://claude.com/docs/office-agents/excel), [Microsoft, Finance Agent](https://learn.microsoft.com/en-us/copilot/finance/welcome), [Microsoft, preimenovanje Copilot for Finance](https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2025/10/20/empowering-finance-with-an-ai-assistant-in-microsoft-365-copilot/)

## Česa AI ne sme

Kodeks poklicne etike računovodje, ki ga je sprejel Slovenski inštitut za revizijo, v točki 3.2.1 določa, da mora računovodja varovati zaupne informacije, s katerimi se seznani pri delu, razen če ima izrecno dovoljenje za razkritje in ga k temu zavezuje zakon. Po točki 3.2.3 mora o zaupnosti poučiti tudi podrejene sodelavce in jih nadzirati. Britanski inštitut ICAEW v smernicah za generativno AI svetuje, naj podatki strank in zaupni interni podatki ne gredo v javna AI orodja.

Informacijski pooblaščenec priporoča, da osebne podatke z orodji generativne AI delite v čim manjšem obsegu, uporabljate storitve, zavezane k spoštovanju GDPR, in preverite, ali ponudnik podatke obdeluje zunaj EU in jih uporablja za učenje modela.

Iz tega sledi preprosto pravilo: podatki strank samo v poslovna orodja s pogodbo o obdelavi podatkov, ki se na podatkih ne učijo, in samo v obsegu, ki ga naloga res potrebuje. Podrobnosti po ponudnikih so v vodniku [Kateri podatki ne sodijo v ChatGPT](/vodniki/varna-raba-ai-v-podjetju/).

Viri: [SIR, Kodeks poklicne etike računovodje (PDF)](https://si-revizija.si/datoteke/splosno/696/rac-kodeks_etike-racunovodja.pdf), [ICAEW, generativna AI: kaj početi in česa ne](https://www.icaew.com/technical/technology/artificial-intelligence/generative-ai-guide/dos-and-donts), [Informacijski pooblaščenec, 19. 2. 2025](https://www.ip-rs.si/novice/generativna-umetna-inteligenca-pod-drobnogledom-informacijskega-poobla%C5%A1%C4%8Denca-1739949806)

## Napake in odgovornost

Microsoft v pogostih vprašanjih o Copilotu v Excelu piše, da Copilot lahko dela napake in napačno razume podatke, in svetuje, naj ga ne uporabljate za odločitve na občutljivih področjih, kot so finance. Vse, kar ustvari, je treba pregledati in preveriti. Anthropic za Claude v Excelu navaja, da ni priporočljiv za končne izdelke za stranke brez človeškega pregleda in za izračune, pomembne za revizijo, brez preverjanja.

Strokovna služba Mednarodnega odbora za etične standarde računovodij (IESBA) je julija 2026 v publikaciji poudarila, da strokovni računovodje ostajajo odgovorni za presoje in odločitve pri svojem delu, tudi ko uporabljajo nove tehnologije. ICAEW svetuje, naj rezultate AI preverjate s poklicno skepso in se izogibate slepemu zaupanju v rezultate, ki jih da stroj.

Posebno tveganje so tuje datoteke. Anthropic opozarja, naj Claude v Excelu uporabljate samo z datotekami, ki jim zaupate, ker lahko datoteke iz zunanjih virov, na primer predloge, datoteke dobaviteljev in uvozi podatkov, vsebujejo skrita navodila, ki orodje pripravijo do tega, da izvleče podatke, spremeni zapise ali izvede uničujoča dejanja. Temu pravimo [vrivanje navodil](/slovar/vrivanje-navodil/).

Viri: [Microsoft, pogosta vprašanja o Copilotu v Excelu](https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel), [Claude v Excelu](https://claude.com/docs/office-agents/excel), [IESBA, 15. 7. 2026](https://www.ethicsboard.org/news-events/2026-07/new-iesba-staff-publication-highlights-ethical-considerations-accountants-using-emerging)

## E-računi od leta 2028

Državni zbor je oktobra 2025 sprejel Zakon o izmenjavi elektronskih računov in drugih elektronskih dokumentov. Od 1. januarja 2028 bo izmenjava e-računov obvezna za vse subjekte, vpisane v Poslovni register Slovenije, in za fizične osebe, ki opravljajo dejavnost (na primer samostojne podjetnike). E-račun je strukturiran dokument v obliki XML; račun v PDF ni e-račun. Izmenjava bo mogoča prek ponudnikov e-poti, lastnih sistemov, omrežja PEPPOL ali brezplačne aplikacije miniBlagajna, pošiljanje po e-pošti pa ne bo dovoljeno, razen potrošnikom.

To je pomembno za načrtovanje. Ko bodo domači računi prihajali kot XML, jih bo računovodski program prebral sam, brez AI. Branje z AI bo po naši oceni ostalo koristno predvsem za račune tujih dobaviteljev, blagajniške prejemke in druge dokumente, ki niso e-računi.

Vir: [OZS, sprejet zakon o izmenjavi e-računov (vir: MF in UJP)](https://www.ozs.si/novice/sprejet-zakon-o-izmenjavi-elektronskih-racunov-in-drugih-elektronskih-dokumentov-68fb5c9feb78d306262a6d29)

## AI Act

Za večino računovodskega dela Akt o umetni inteligenci ne prinaša posebnih obveznosti; ostaja dolžnost, da podjetje podpira AI pismenost zaposlenih, ki je bila julija 2026 z AI Omnibusom omiljena. Med visoko tvegane rabe pa sodi ocenjevanje kreditne sposobnosti fizičnih oseb (razen odkrivanja goljufij); pravila za take rabe veljajo od 2. decembra 2027. Več v vodniku [AI Act za slovenska podjetja](/vodniki/ai-act-za-slovenska-podjetja/).

Viri: [AI Act, Priloga III (EUR-Lex)](https://eur-lex.europa.eu/legal-content/SL/TXT/HTML/?uri=CELEX:32024R1689), [Evropska komisija, AI Omnibus](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force)

## Kako začeti

ICAEW svetuje, da začnete z majhnimi poskusi, ki niso ključni za poslovanje, in da pripravite smernice za odgovorno rabo. Predlagan postopek:

1. Izberite nalogo z nizkim tveganjem, na primer pisanje pojasnil strankam ali povzetek novega predpisa.
2. Uporabite poslovni paket s pogodbo o obdelavi podatkov in v njem ustvarite projekt z navodili za pisanje in pravili pisarne.
3. Zapišite pravila: katerih podatkov ne vnašamo, kdo preveri rezultat, katere datoteke smemo odpreti z AI. Pomagate si lahko s [predlogo pravil rabe AI](/vodniki/predloga-pravil-rabe-ai/).
4. Ko se orodje izkaže, ga preizkusite pri delu v Excelu na kopiji datoteke in vsako številko preverite.
5. Branje dokumentov preverite najprej v programu, ki ga že uporabljate, preden kupite novo orodje.
