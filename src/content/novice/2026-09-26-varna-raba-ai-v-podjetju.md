---
title: 'Kateri podatki ne sodijo v ChatGPT: varna raba AI v podjetju'
description: 'Katere podatke lahko vnesete v ChatGPT, Claude, Gemini ali Copilot, kaj ponudniki s njimi naredijo po paketih, kaj pravi GDPR in kako napisati kratka interna pravila.'
date: 2026-09-26
type: vodnik
---

Preden zaposleni v ChatGPT ali Claude prilepi pogodbo, seznam strank ali mail, bi moral vedeti, ali to sme. Odgovor je odvisen od treh stvari: kakšni so podatki, kateri paket orodja uporabljate in kaj je podjetje s ponudnikom dogovorilo. Ta vodnik vse tri razloži na enem mestu, s stanjem septembra 2026.

> **Ni pravni nasvet.** Vodnik je povzetek javnih virov za lažjo orientacijo. Pogoji ponudnikov se pogosto spreminjajo, zato jih pred odločitvijo preverite na povezanih straneh. Za obdelavo posebnih vrst osebnih podatkov (zdravje, otroci) se posvetujte s pravnikom ali pooblaščencem za varstvo podatkov.

## Na kratko

- Vnos osebnih podatkov v AI orodje je obdelava po GDPR. Zanjo potrebujete pravno podlago in ustrezno zavarovanje, tako kot pri vsakem drugem zunanjem izvajalcu.
- Brezplačni in osebni paketi niso za podatke strank. Pri ChatGPT, Claude, Gemini, Copilot in Mistral se lahko pogovori uporabijo za učenje modelov, razen če to izklopite. Pogodbo o obdelavi podatkov ponudniki ponujajo le za poslovne pakete.
- Poslovni paketi (ChatGPT Business in Enterprise, Claude Team in Enterprise, Gemini v Google Workspace, Copilot s službenim računom) vaših podatkov privzeto ne uporabljajo za učenje in vključujejo ali omogočajo sklenitev pogodbe o obdelavi podatkov.
- Tudi s poslovnim paketom nekatere stvari ne sodijo v AI: posebne vrste osebnih podatkov brez jasne podlage, podatki, zaščiteni s poklicno tajnostjo, gesla in dostopni ključi.
- Brisanje imena ni anonimizacija. Informacijski pooblaščenec na to posebej opozarja.

## Zakaj to sploh je vprašanje

Ko zaposleni v AI orodje prilepi pogodbo, seznam strank ali mail sodelavca, se zgodijo tri stvari hkrati.

Podatki gredo k zunanjemu ponudniku. Informacijski pooblaščenec v priporočilih iz februarja 2026 zapiše, da je že vnos podatkov v orodje AI obdelava osebnih podatkov. Zanjo potrebujete pravno podlago, spoštovati morate pravice posameznikov in zagotoviti ustrezno varnost. Če ponudnik podatke obdeluje v vašem imenu, GDPR v členu 28 zahteva pogodbo ali drug pravni akt, ki to obdelavo ureja (pogodba o obdelavi, v angleščini DPA).

Podatki lahko končajo v učenju modela. Pri osebnih paketih ponudniki pogovore uporabljajo za izboljšanje modelov, če tega ne izklopite. Pooblaščenec zato priporoča, da preverite, ali bodo vaši podatki uporabljeni za učenje, in da vnesete le najmanj, kar je nujno.

Lahko izgubite zaščito poslovne skrivnosti. Po Zakonu o poslovni skrivnosti je informacija poslovna skrivnost samo, če je imetnik sprejel razumne ukrepe, da ostane tajna. Zakon domneva, da so ti ukrepi izpolnjeni, če je podjetje informacijo pisno določilo kot skrivnost in o tem obvestilo vse, ki imajo do nje dostop. Interna pravila o rabi AI so del teh ukrepov.

Viri: [Informacijski pooblaščenec, Varna in odgovorna uporaba UI pri delu (PDF, februar 2026)](https://www.ip-rs.si/fileadmin/user_upload/Pdf/Priporocila/Varna%20in%20odgovorna%20uporaba%20UI%20pri%20delu_%20Priporo%C4%8Dila%20za%20javne%20uslu%C5%BEbence_10feb2026.pdf), [Informacijski pooblaščenec, generativna UI pod drobnogledom](https://www.ip-rs.si/novice/generativna-umetna-inteligenca-pod-drobnogledom-informacijskega-poobla%C5%A1%C4%8Denca-1739949806), [GDPR](https://eur-lex.europa.eu/legal-content/SL/TXT/HTML/?uri=CELEX:32016R0679), [ZPosS, 2. člen](https://www.racunovodstvo.net/zakonodaja/zakon-o-poslovni-skrivnosti-zposs/2-clen)

## Kaj ne sodi v AI orodje

Priporočila Informacijskega pooblaščenca so napisana za javne uslužbence, vendar se dobro prenesejo v vsako podjetje. Osnovno pravilo: v orodja AI ne vnašajte osebnih, zaupnih ali drugače varovanih podatkov, razen če je to za konkreten namen izrecno dovoljeno. Ne lepite celotnih dokumentov in ne nalagajte fotografij ljudi.

Praktična razdelitev v tri skupine:

**Nikoli, ne glede na paket:**

- gesla, dostopni ključi (API ključi), podatki za prijavo v bančne in druge sisteme,
- podatki, zaščiteni s poklicno tajnostjo, če tega ne dovoljujejo pravila vašega poklica (na primer odvetniki in zdravniki),
- posebne vrste osebnih podatkov iz člena 9 GDPR brez jasne pravne podlage: zdravje, rasno ali etnično poreklo, politično mnenje, versko ali filozofsko prepričanje, članstvo v sindikatu, genetski podatki, biometrični podatki za edinstveno identifikacijo, spolno življenje ali usmerjenost.

**Samo v poslovnem paketu s pogodbo o obdelavi in po internih pravilih:**

- osebni podatki strank, zaposlenih in kandidatov (imena, maili, telefonske številke, EMŠO, naslovi),
- pogodbe, ponudbe, cene in drugi dokumenti, označeni kot poslovna skrivnost,
- interni dokumenti, ki niso namenjeni javnosti.

**Brez težav v katerem koli paketu:**

- javno objavljena besedila (vaša spletna stran, objavljeni članki),
- splošna vprašanja brez podatkov o konkretnih ljudeh ali podjetjih,
- lastna besedila brez zaupnih vsebin (osnutek objave, struktura predstavitve).

Za poklicne tajnosti je dober zgled Svet evropskih odvetniških zbornic (CCBE), ki je oktobra 2025 odvetnikom svetoval, naj v orodja generativne AI ne vnašajo osebnih ali zaupnih podatkov stranke, razen če so zagotovljena ustrezna zaščita, na primer pogodbena zaveza zaupnosti, pogodba o obdelavi ali delovanje v lokalnem, zavarovanem okolju. Slovenski Zakon o odvetništvu odvetniku nalaga, da kot tajnost varuje vse, kar mu je zaupala stranka, Zakon o zdravniški službi pa zdravniku, da varuje podatke o zdravstvenem stanju bolnika.

Viri: [Informacijski pooblaščenec, priporočila (PDF)](https://www.ip-rs.si/fileadmin/user_upload/Pdf/Priporocila/Varna%20in%20odgovorna%20uporaba%20UI%20pri%20delu_%20Priporo%C4%8Dila%20za%20javne%20uslu%C5%BEbence_10feb2026.pdf), [CCBE, vodnik o rabi generativne AI (PDF)](https://www.ccbe.eu/fileadmin/speciality_distribution/public/documents/IT_LAW/ITL_Guides_recommendations/EN_ITL_20251002_CCBE-guide-on-the-use-of-the-use-of-generative-AI-for-lawyers.pdf), [ZOdv, 6. člen](https://zakonodaja.com/zakon/zodv/6-clen), [ZZdrS, 51. člen](https://zakonodaja.com/zakon/zzdrs/51-clen)

## Brisanje imena ni anonimizacija

Pogost nasvet je "samo ime zbrišite". Pooblaščenec opozarja, da vsako brisanje osebnih podatkov ni anonimizacija: če odstranite ime, naslov in EMŠO, lahko osebo še vedno prepoznate po drugih podatkih, AI pa je pri povezovanju podatkov še posebej uspešen. Pri pritožbi stranke je za prepoznavo morda dovolj že datum, kraj in opis dogodka.

Kaj pomaga:

- nadomestite podatke s splošnimi oznakami (stranka A, podjetje iz gradbeništva, znesek v razponu),
- vnesite samo del dokumenta, ki ga res potrebujete, ne celotne datoteke,
- namesto resničnega primera opišite izmišljen primer z enako strukturo.

Vir: [Informacijski pooblaščenec, priporočila (PDF)](https://www.ip-rs.si/fileadmin/user_upload/Pdf/Priporocila/Varna%20in%20odgovorna%20uporaba%20UI%20pri%20delu_%20Priporo%C4%8Dila%20za%20javne%20uslu%C5%BEbence_10feb2026.pdf)

## Kaj ponudniki naredijo z vašimi podatki

Stanje po uradnih straneh ponudnikov, preverjeno 26. septembra 2026. Cene paketov so na strani [Modeli in cene](/modeli/#narocnine).

| Orodje in paket | Učenje na vaših pogovorih | Hramba | Pogodba o obdelavi |
|---|---|---|---|
| ChatGPT Free, Plus, Pro | da, razen če izklopite | do izbrisa, začasni klepet do 30 dni | ni navedena |
| ChatGPT Business, Enterprise | privzeto ne | določi skrbnik, izbrisani do 30 dni | da |
| Claude Free, Pro, Max | po vaši izbiri | 5 let, če učenje dovolite, sicer 30 dni | ne, le za poslovne pakete |
| Claude Team, Enterprise, API | privzeto ne | Team, Enterprise: do izbrisa, nato do 30 dni (Enterprise tudi nastavljivo); API: do 30 dni | da, del poslovnih pogojev |
| Gemini (osebni račun) | da, če je vklopljena Dejavnost (Keep Activity) | privzeto 18 mesecev, pregledani pogovori do 3 leta | ni navedena |
| Gemini v Google Workspace | ne brez vašega dovoljenja | določi skrbnik (3, 18 ali 36 mesecev) | da |
| Copilot (osebni Microsoftov račun) | lahko, izklopite v nastavitvah | zgodovina 18 mesecev | ni navedena |
| Copilot s službenim računom (Entra ID) | ne | po nastavitvah Microsoft Purview | da |
| Mistral Vibe (prej Le Chat), osebni paketi | da, razen če izklopite | podatki privzeto v EU | ni navedena |

"Ni navedena" pomeni, da ponudnik pogodbo o obdelavi omenja le pri poslovnih paketih. Nekaj podrobnosti, ki jih tabela ne pove:

Pri ChatGPT učenje izklopite v Nastavitve, Nadzor podatkov, stikalo "Improve the model for everyone". Začasni klepet (Temporary Chat) se ne uporablja za učenje in se hrani do 30 dni. Pozor: če pri odgovoru kliknete palec gor ali dol, lahko celoten pogovor vseeno pride v učenje. Hramba podatkov v Evropi je na voljo samo za API in nove prostore ChatGPT Enterprise in Edu, ne za Business.

Pri Claudu od jeseni 2025 osebni paketi zahtevajo izbiro, ali dovolite učenje. Nastavitev spremenite v nastavitvah zasebnosti. Anthropic na svoji platformi za razvijalce (API) hrambe podatkov v EU trenutno ne ponuja, na voljo sta le ZDA in globalna obdelava. Pri AWS Bedrock in Google Cloud je regija odvisna od izbrane končne točke.

Pri Geminiju z osebnim računom pogovore lahko pregledujejo ljudje, Google pa sam svetuje, da ne vnašate zaupnih podatkov, ki jih ne bi želeli pokazati pregledovalcu. Z izklopljeno Dejavnostjo (Keep Activity) se pogovori hranijo 72 ur.

Pri Copilotu z osebnim računom učenje izklopite v Nastavitve, Zasebnost. S službenim računom velja Microsoftova zaščita podatkov za podjetja. Za organizacije v EU velja tudi EU Data Boundary, z izjemami: spletno iskanje prek Binga in modeli podjetja Anthropic so izvzeti.

Mistral je evropski ponudnik in podatke privzeto hrani v EU, vendar se pri osebnih paketih pogovori privzeto uporabljajo za učenje. V paketu Enterprise je učenje privzeto izklopljeno. Tudi pri Mistralu lahko ocena odgovora s komentarjem pogovor pošlje v učenje.

Viri: [OpenAI, nadzor podatkov v ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt), [OpenAI, zasebnost za podjetja](https://openai.com/enterprise-privacy/), [OpenAI, hramba podatkov v regiji](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt), [Anthropic, spremembe pogojev za potrošnike](https://www.anthropic.com/news/updates-to-our-consumer-terms), [Anthropic, učenje na podatkih za podjetja](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training), [Anthropic, učenje na podatkih za osebne pakete](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training), [Anthropic, hramba podatkov organizacij](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data), [Anthropic, DPA](https://privacy.claude.com/en/articles/7996862-i-am-a-commercial-customer-how-do-i-view-your-data-processing-addendum-dpa), [Anthropic, hramba podatkov v regiji](https://platform.claude.com/docs/en/manage-claude/data-residency), [Google, zasebnost v aplikacijah Gemini](https://support.google.com/gemini/answer/13594961), [Google Workspace, zasebnost generativne AI](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub), [Microsoft, zasebnost v Copilotu](https://support.microsoft.com/en-us/topic/microsoft-copilot-privacy-controls-8e479f27-6eb6-48c5-8d6a-c134062e2be6), [Microsoft, zaščita podatkov za podjetja](https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection), [Mistral, učenje na podatkih](https://help.mistral.ai/en/articles/347617-do-you-use-my-user-data-to-train-your-artificial-intelligence-models), [Mistral, hramba podatkov](https://help.mistral.ai/en/articles/347629-where-do-you-store-my-data-or-my-organization-s-data)

## Kaj preveriti pri poslovnem paketu

Poslovni paket reši večino težav, ne pa vseh. Pred uvedbo preverite:

1. Pogodbo o obdelavi podatkov. Pri OpenAI jo za Business, Enterprise in API sklenete prek obrazca, pri Anthropicu je del poslovnih pogojev, pri Googlu in Microsoftu je del pogodbe za Workspace oziroma Microsoft 365.
2. Kje se podatki obdelujejo. Večina ponudnikov je v ZDA. Prenos podatkov v ZDA je trenutno mogoč na podlagi okvira EU in ZDA za zasebnost podatkov (Data Privacy Framework), ki ga je Splošno sodišče EU septembra 2025 potrdilo (zadeva T-553/23). Zoper sodbo je po poročanju vložena pritožba na Sodišče EU (C-703/25 P), zato stanje spremljajte.
3. Hrambo in dostop. Kdo v podjetju vidi pogovore drugih, kako dolgo se hranijo, ali jih lahko skrbnik izvozi ali izbriše.
4. Konektorje. Ko orodje povežete z e-pošto, diskom ali CRM, dobi dostop do veliko več podatkov kot pri ročnem lepljenju. Omogočite le tiste, ki jih res potrebujete.
5. Oceno učinka. Če obdelava verjetno pomeni veliko tveganje za posameznike, na primer obsežna obdelava posebnih vrst podatkov ali sistematično ocenjevanje oseb, GDPR v členu 35 zahteva oceno učinka na varstvo podatkov.

Viri: [OpenAI, zasebnost za podjetja](https://openai.com/enterprise-privacy/), [GDPR](https://eur-lex.europa.eu/legal-content/SL/TXT/HTML/?uri=CELEX:32016R0679), [Sodišče EU, sporočilo za javnost 106/25 (PDF)](https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf), [Digital Policy Alert, pritožba Latombe](https://digitalpolicyalert.org/event/35459-latombe-filed-appeal-against-general-court-dismissal-of-challenge-to-european-unionunited-states-data-protection-framework-adequacy-decision-in-latombe-v-commission), [Informacijski pooblaščenec, UI in varstvo osebnih podatkov](https://www.ip-rs.si/varstvo-osebnih-podatkov/klju%C4%8Dna-podro%C4%8Dja-uredbe/umetna-inteligenca-in-varstvo-osebnih-podatkov)

## Kaj se je že zgodilo

- Samsung, april 2023: po poročanju medijev so zaposleni v ChatGPT vnesli interne podatke podjetja. Samsung je nato od 1. maja 2023 prepovedal rabo generativnih AI orodij na službenih napravah.
- ChatGPT, 20. marec 2023: zaradi napake v odprtokodni knjižnici so nekateri uporabniki videli naslove pogovorov drugih uporabnikov. Pri približno 1,2 % naročnikov ChatGPT Plus, ki so bili aktivni v devetih urah tistega dne, so bili drugim lahko vidni ime, e-naslov, naslov za plačilo ter zadnje štiri številke in datum veljavnosti kartice.
- Deljeni pogovori v Googlu, julij 2025: javne povezave do pogovorov v ChatGPT, pri katerih so uporabniki označili, da jih je mogoče najti, so se pojavile v rezultatih iskanja. OpenAI je 31. julija 2025 umaknil možnost, da so deljeni pogovori vidni iskalnikom.

Pri napaki iz marca 2023 uporabniki niso naredili ničesar narobe, napaka je bila pri ponudniku. Pogovor z zaupnimi podatki pa ne sodi v deljeno povezavo, tudi če funkcija deluje, kot je predvideno.

Viri: [TechCrunch o Samsungu](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/), [BleepingComputer o napaki v ChatGPT](https://www.bleepingcomputer.com/news/security/openai-chatgpt-payment-data-leak-caused-by-open-source-bug/), [TechCrunch o deljenih pogovorih](https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines)

## Novo tveganje: agenti in vrivanje navodil

Ko AI orodje samo bere spletne strani, maile ali dokumente, lahko v njih naleti na skrita navodila napadalca. Temu pravimo [vrivanje navodil](/slovar/vrivanje-navodil/). OWASP, organizacija za varnost programske opreme, ga uvršča na prvo mesto med tveganji za aplikacije z velikimi jezikovnimi modeli in kot primer navaja povzemanje spletne strani s skritimi navodili, ki pogovor pošljejo napadalcu. OWASP navaja, da ni jasno, ali zanesljiva zaščita sploh obstaja. Zato velja: orodje z dostopom do zaupnih podatkov naj ne bere neznanih vsebin brez vašega nadzora.

Vir: [OWASP, LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

## Kratka interna pravila

Pravila naj bodo dovolj kratka, da jih zaposleni preberejo. Predloga, ki jo prilagodite:

> **Pravila rabe AI orodij**
>
> 1. Za delo uporabljamo samo službene račune teh orodij: [seznam]. Osebnih računov za službene podatke ne uporabljamo.
> 2. V AI orodja ne vnašamo gesel, dostopnih ključev, zdravstvenih podatkov in drugih posebnih vrst osebnih podatkov.
> 3. Osebne podatke strank in zaposlenih ter poslovne skrivnosti vnašamo le v odobrena službena orodja in le toliko, kolikor je nujno.
> 4. Pred vnosom podatke, kjer je mogoče, nadomestimo s splošnimi oznakami.
> 5. Pogovorov z zaupnimi podatki ne delimo prek javnih povezav.
> 6. Vsak rezultat AI pred uporabo preveri človek. Za končno odločitev odgovarja človek, ne orodje.
> 7. Vprašanja in napake sporočimo: [odgovorna oseba].

Taka pravila so hkrati del ukrepov za [AI pismenost po AI Act](/vodniki/ai-act-za-slovenska-podjetja/) in razumnih ukrepov za varstvo poslovne skrivnosti. Brez njih zaposleni pogosto uporabljajo lastne brezplačne račune, čemur pravimo [senčna AI](/slovar/sencna-ai/).

Daljša predloga v Wordu, z dovoljenimi orodji, označevanjem, evidenco usposabljanj in izjavo o seznanitvi, je v vodniku [Predloga pravil rabe AI v podjetju](/vodniki/predloga-pravil-rabe-ai/).

## Kontrolni seznam

- [ ] Vemo, katera AI orodja in kateri paketi se v podjetju uporabljajo.
- [ ] Za službene podatke uporabljamo poslovne pakete s pogodbo o obdelavi podatkov.
- [ ] Pri osebnih računih, ki jih še uporabljamo, je učenje na pogovorih izklopljeno.
- [ ] Imamo zapisana pravila, kaj se v AI orodja ne vnaša.
- [ ] Zaposleni vedo, da brisanje imena ni anonimizacija.
- [ ] Konektorji do e-pošte in dokumentov so omogočeni le tam, kjer jih res potrebujemo.
- [ ] Pri obdelavi, ki lahko pomeni veliko tveganje za posameznike, smo preverili, ali potrebujemo oceno učinka.
