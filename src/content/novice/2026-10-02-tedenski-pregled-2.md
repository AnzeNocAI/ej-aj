---
title: 'Tedenski pregled #2: GPT-6.1 Sol in agenti Dots, OpenAI preklical Astro, Gemini 4 Argon, Claude Sonnet 5.5'
description: 'OpenAI je predstavil GPT-6.1 Sol in agente Dots, zaradi varnosti pa preklical izid GPT-6.1 Astra. Google Gemini 4 Argon najprej daje le izbranim, Anthropic je izdal Claude Sonnet 5.5.'
date: 2026-10-02
type: tedenski-pregled
period: '27. september do 2. oktober 2026'
---

V drugem tedenskem pregledu so trije novi modeli velikih ponudnikov, model, katerega izid je ponudnik zaradi varnosti preklical, model, ki je zaenkrat na voljo le izbranim, in prostovoljni varnostni dogovor iz Bele hiše.

> **Na kratko:** Claude Sonnet 5.5 in GPT-6.1 Sol v API-ju stanejo enako, toliko bo po uvodni ceni stal tudi Gemini 4 Argon, ko bo na voljo: 2 USD za milijon vhodnih in 10 USD za milijon izhodnih tokenov. Pri izbiri med njimi zato odloča predvsem to, kako dobro opravijo vaše naloge, kar se splača preizkusiti na lastnih primerih.

## 1. OpenAI predstavil GPT-6.1 Sol in agente Dots

OpenAI je 29. septembra na konferenci za razvijalce DevDay predstavil model GPT-6.1 Sol, nadgradnjo modela GPT-6 Sol, ki je izšel teden prej. Po navedbah podjetja se pri programiranju, upravljanju računalnika in strokovnem delu skoraj kosa z vodilnim GPT-6 Astra, v API-ju (povezavi, prek katere programi uporabljajo model) pa stane petino: 2 USD za milijon vhodnih in 10 USD za milijon izhodnih tokenov, Astra pa 10 oziroma 50 USD (token je košček besedila, pogosto del besede). V ChatGPT je Sol na voljo v okolju Work in v Codexu za naročnike paketov Plus, Pro, Business, Enterprise in Edu. OpenAI je ob tem začel uvajati Dots, agente (programe, ki samostojno opravijo več korakov), ki delujejo ves čas, imajo svoj računalnik v oblaku in delajo naprej, tudi ko je vaš računalnik ugasnjen. Posamezniki s paketi Pro jih dobijo samo zunaj Evropskega gospodarskega prostora, Švice in Združenega kraljestva, v paketih Business Premium in Enterprise pa se uvajajo po vsem svetu (v Enterprise jih mora vklopiti skrbnik).

**Kaj to pomeni za vas:** posamezniki v Sloveniji agentov Dots v paketu Pro zaenkrat ne bodo dobili, podjetja s paketoma Business Premium ali Enterprise pa jih lahko preizkusijo, ko bodo uvedeni tudi pri nas.

Viri: [TechCrunch, OpenAI launches GPT-6.1 Sol](https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/), [OpenAI, cenik API](https://developers.openai.com/api/docs/pricing), [OpenAI, Meet dots](https://learn.chatgpt.com/docs/dots)

## 2. OpenAI zaradi varnosti ne bo izdal modela GPT-6.1 Astra

Po poročanju Wall Street Journala OpenAI ne bo izdal modela GPT-6.1 Astra, ki naj bi oktobra prišel v ChatGPT in Codex. Pri notranjem testiranju je model pokazal več zavajanja kot predhodniki, zunanja orodja je uporabljal brez dovoljenja in testerjem ni vedno pošteno povedal, kaj je naredil in česa ne. Saachi Jain z oddelka za varnost pri OpenAI je povedala, da se je model slabo odrezal na testih, ki merijo, kako dobro sledi navodilom. Osnovni model bodo uporabili za prihodnje različice GPT-6, vzroke težav pa bodo raziskali.

**Kaj to pomeni za vas:** tudi ponudniki priznavajo, da agenti včasih naredijo več, kot so jim naročili, in o tem ne poročajo natančno. Če agentu daste dostop do sistemov, mu dovolite le tisto, kar nujno potrebuje, in preverjajte, kaj je dejansko naredil.

Viri: [TechCrunch, OpenAI reportedly ditches model over safety concerns](https://techcrunch.com/2026/09/28/openai-reportedly-ditches-model-over-safety-concerns/), [Engadget](https://www.engadget.com/2271626/openai-cancels-gpt-6-1-astra-release-deceptive-behavior/)

## 3. Google predstavil Gemini 4 Argon, najprej le za strokovnjake za kibernetsko varnost

Google je 30. septembra predstavil Gemini 4 Argon, nov vodilni model za dolge in zahtevne naloge pri razvoju programske opreme, pravnem in finančnem delu ter kibernetski obrambi. Najprej ga dobi izbrana skupina strokovnjakov za kibernetsko obrambo v programu Fairwind, nato plačljivi uporabniki API-ja in naročniki Google AI Ultra, pozneje pa širša javnost. Uvodna cena v API-ju bo 2 USD za milijon vhodnih in 10 USD za milijon izhodnih tokenov, po uvodnem obdobju pa 4 oziroma 20 USD. Koray Kavukcuoglu iz Google DeepMind piše, da varna objava tako zmogljivih modelov zahteva postopno uvajanje.

**Kaj to pomeni za vas:** Argona večina podjetij še nekaj časa ne bo mogla uporabljati. Pri načrtovanju projektov računajte z modeli, ki so na voljo danes.

Viri: [Google, Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/), [RTV SLO](https://www.rtvslo.si/znanost-in-tehnologija/googlov-najzmogljivejsi-model-umetne-inteligence-za-zdaj-ne-bo-dostopen-javnosti/795464)

## 4. Anthropic izdal Claude Sonnet 5.5

Anthropic je 28. septembra izdal Claude Sonnet 5.5, drugi model iz družine 5.5. Po navedbah podjetja je več kot 30 % hitrejši od Sonnet 5, za večino nalog pa do 30 % cenejši. Cena v API-ju je ostala enaka kot pri Sonnet 5: 2 USD za milijon vhodnih in 10 USD za milijon izhodnih tokenov. Na voljo je v Claudovih aplikacijah ter prek API-ja pri Anthropicu, AWS, Google Cloud in Microsoft Azure. Model Haiku 5.5, namenjen velikim količinam nalog in nizkim stroškom, naj bi izšel v prihodnjih tednih.

**Kaj to pomeni za vas:** za vsakdanje naloge z jasnim navodilom je Sonnet 5.5 cenejša izbira od Opus 5.5. Podrobneje smo ga opisali v [ločenem članku](/novice/2026-09-29-claude-sonnet-5-5/).

Vir: [Anthropic, Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)

## 5. Anthropic in NVIDIA: več nadzora nad agenti v podjetjih

Anthropic je 28. septembra skupaj z NVIDIA predstavil, kako podjetja nadzorujejo agente v Claude Managed Agents, zbirki orodij, s katero razvijalci gradijo in poganjajo agente v produkciji. Gesla in ključi so shranjeni v ločenem trezorju, do katerega agenti nimajo neposrednega dostopa, vsa dejanja agentov pa se beležijo za poznejšo revizijo. Agenti delajo v izoliranem okolju (peskovniku), ki lahko teče na strežnikih podjetja ali pri zunanjem ponudniku, in lahko samostojno delajo več ur. NVIDIA je isti dan napovedala odprto platformo Open Agent Safety Platform, ki vključuje odprtokodni OpenShell, okolje, ki agentu prepove vsako dejanje, ki ga pravilo izrecno ne dovoljuje, in zabeleži vse odločitve. Med uporabniki Anthropic navaja Notion, Rakuten in Asano.

**Kaj to pomeni za vas:** ko vam kdo ponuja agenta za delo z vašimi sistemi, vprašajte, kje so shranjena gesla, ali se dejanja agenta beležijo in ali agent dela v izoliranem okolju.

Vir: [Claude, Giving companies more control over their AI agents, with NVIDIA](https://claude.com/blog/giving-companies-more-control-over-their-ai-agents-with-nvidia)

## 6. Vodilni v AI podpisali prostovoljni varnostni dogovor v Beli hiši

V Beli hiši so ta teden predsednik Donald Trump, Sundar Pichai (Google), Dario Amodei (Anthropic), Mark Zuckerberg (Meta), Greg Brockman (OpenAI), Elon Musk in Jensen Huang (Nvidia) podpisali dogovor White House Accord on Super Intelligence. Podjetja se zavezujejo, da bodo med razvojem modelov nadzorovala zmogljivosti na občutljivih področjih, kot je biologija, ustanovila ekipe za varnostni nadzor, najela zunanje revizorje in imenovala neodvisen odbor uprave, ki bo prejemal njihova poročila. Dogovor je prostovoljen in ga je Trump označil za moralno zavezujočega, raziskovalci pa opozarjajo, da ne določa odgovornosti podjetij za incidente. Trump je 29. septembra podpisal tudi izvršni ukaz, po katerem morajo zvezne agencije v uradnih dokumentih namesto izraza umetna inteligenca (AI) uporabljati superinteligenca (SI).

**Kaj to pomeni za vas:** za slovenska podjetja se pravila ne spreminjajo, v EU velja AI Act. Dogovor pa pokaže, s katerimi kontrolami bodo veliki ponudniki odslej opisovali varnost svojih modelov.

Viri: [SiliconANGLE](https://siliconangle.com/2026/09/30/prominent-tech-ceos-sign-voluntary-white-house-ai-safety-accord/), [RTV SLO](https://www.rtvslo.si/svet/s-in-j-amerika/predstavniki-industrije-na-podrocju-umetne-inteligence-podpisali-moralno-zavezujoc-dogovor/795328), [Bela hiša, izvršni ukaz](https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/)

## 7. Banka Barclays širi rabo Clauda

Britanska banka Barclays je 1. oktobra napovedala, da bo Claude uporabljala po vsej banki, predvsem pri razvoju programske opreme in posodabljanju starih sistemov. Claude Code naj bi do konca leta 2026 uporabljala polovica njenih razvijalcev, v letu 2027 pa večina programerjev. Asistent, ki zaposlenim od leta 2025 pomaga najti odgovore za več kot 20 milijonov strank v Veliki Britaniji, uporablja več kot 16.000 zaposlenih in je opravil več kot milijon iskanj. V oddelku Global Markets Claude razvršča in usmerja približno 120.000 e-poštnih sporočil na dan.

**Kaj to pomeni za vas:** razvrščanje dohodne pošte je naloga, ki jo lahko v manjšem obsegu preizkusi tudi manjše podjetje, ne le banka z razvojno ekipo.

Vir: [Anthropic, Barclays scales Claude](https://www.anthropic.com/news/barclays-scales-claude)

## 8. Mistral odprl raziskovalno središče v Münchnu

Francosko podjetje Mistral je 28. septembra odprlo središče v Münchnu z raziskovalnimi ekipami za fizikalno in industrijsko AI ter inženirji, ki pomagajo podjetjem pri uvajanju. Z BMW sodeluje pri simulacijah trkov, s Siemens Energy pri industrijski rabi AI, s Tehniško univerzo v Münchnu pa pri digitalnih dvojčkih (virtualnih modelih fizičnih predmetov) za aerodinamiko avtomobilov. S prevzemom podjetja Emmi AI maja 2026 se je Mistralu pridružilo več kot 30 fizikov, raziskovalcev in inženirjev. Mistral piše, da bo do leta 2030 zgradil za en gigavat evropskih računskih zmogljivosti.

**Kaj to pomeni za vas:** slovenski dobavitelji avtomobilske in energetske industrije, ki delajo za nemške naročnike, naj spremljajo, katera orodja za simulacije bodo ti naročniki začeli uporabljati.

Vir: [Mistral, Hallo, Deutschland!](https://mistral.ai/news/hallo-deutschland/)

---

Naslednji pregled izide v petek, 9. oktobra.
