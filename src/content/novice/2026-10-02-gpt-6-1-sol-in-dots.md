---
title: 'OpenAI GPT-6.1 Sol in agenti Dots: kaj je novega, koliko stane in kaj je na voljo v Sloveniji'
description: 'OpenAI je 29. septembra predstavil model GPT-6.1 Sol, uvaja pa tudi agente Dots. Kaj model zna, koliko stane v primerjavi s Claude Sonnet 5.5 in kdo v Sloveniji lahko uporablja Dots.'
date: 2026-10-02
type: clanek
---

OpenAI je 29. septembra na konferenci za razvijalce DevDay predstavil model GPT-6.1 Sol. Je nadgradnja modela GPT-6 Sol, ki je izšel teden prej. OpenAI uvaja tudi Dots, agente v ChatGPT, ki delajo tudi takrat, ko vas ni za računalnikom.

> **Na kratko:** GPT-6.1 Sol v API-ju stane enako kot Claude Sonnet 5.5, OpenAI pa trdi, da se skoraj kosa z njegovim najdražjim modelom. Agentov Dots posamezniki s paketom Pro v Sloveniji zaenkrat ne dobijo, podjetja s paketoma Business Premium in Enterprise pa jih bodo.

## Kaj je GPT-6.1 Sol

OpenAI v navodilih za izbiro modela zdaj predstavlja tri modele. GPT-6 Astra je najzmogljivejši in najdražji, GPT-6 Luna najcenejši in namenjen ozko opredeljenim, ponavljajočim se nalogam, GPT-6.1 Sol pa je vmes. Po navedbah podjetja se Sol pri programiranju, upravljanju računalnika in strokovnem delu skoraj kosa z Astro.

OpenAI navaja, da Sol dela manj vsebinskih napak kot predhodnik. Pri nizki stopnji razmišljanja je delež odgovorov z vsebinsko napako padel z 11,4 % na 7,7 %. Razmišljanje (reasoning) pomeni, da model pred odgovorom porabi nekaj časa za notranje sklepanje; višja stopnja da praviloma boljši odgovor, a je počasnejša in dražja.

Za kaj ga uporabiti, OpenAI pove v svojih navodilih za izbiro modela: za zahtevnejše projekte, pri katerih šteje tudi cena, na primer predstavitev za upravo iz finančnih rezultatov. Priporoča, da isto nalogo preizkusite s Sol in z Astro ter primerjate kakovost in ceno.

Viri: [TechCrunch, OpenAI launches GPT-6.1 Sol](https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/), [OpenAI, izbira modela](https://learn.chatgpt.com/docs/model-selection), [OpenAI, modeli v ChatGPT](https://learn.chatgpt.com/docs/models), [OpenAI, cenik API](https://developers.openai.com/api/docs/pricing)

## Koliko stane

Cene veljajo za API, torej povezavo, prek katere lastni programi uporabljajo model. Plača se po tokenih; token je košček besedila, pogosto del besede. Spodaj so cene v USD za milijon tokenov.

| Model | Vhodni tokeni | Izhodni tokeni |
| --- | --- | --- |
| GPT-6.1 Sol | 2 | 10 |
| GPT-6 Astra | 10 | 50 |
| Claude Sonnet 5.5 | 2 | 10 |
| Gemini 4 Argon (uvodna cena, še ni splošno na voljo) | 2 | 10 |

Pri Sol je treba upoštevati še tri podrobnosti. Besedilo, ki ga modelu pošiljate večkrat (na primer ista navodila pri vsakem klicu), lahko shranite v predpomnilnik. Shranjevanje stane 2,50 USD za milijon tokenov, vsako nadaljnje branje iz predpomnilnika pa 0,10 USD. Pri zelo dolgih pozivih, nad 272.000 vhodnimi tokeni, pa za cel klic plačate dvakratno ceno vhodnih in 1,5-kratno ceno izhodnih tokenov. Pri paketni obdelavi (Batch), kjer odgovore dobite z zamikom, je cena pol nižja.

Viri: [OpenAI, GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol), [OpenAI, cenik API](https://developers.openai.com/api/docs/pricing), [Anthropic, Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5), [Google, Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)

## Kje je na voljo

V ChatGPT je Sol na voljo v okolju Work in v Codexu (OpenAI-jevem orodju za programiranje) za naročnike paketov Plus, Pro, Business, Enterprise in Edu. V navadnem klepetu ga ob izidu še ni bilo. Paket Plus v Sloveniji stane 23 EUR na mesec, cene vseh paketov so na strani [Modeli in cene](/modeli/#narocnine).

Za podjetja, ki uporabljajo API, je pomemben podatek o hrambi podatkov. Sol podpira hrambo in obdelavo podatkov v EU, ob tem pa hitri način delovanja (fast mode) ni na voljo. Za regionalno obdelavo, kjer je na voljo, OpenAI zaračuna 10 % več.

Viri: [TechCrunch](https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/), [OpenAI, GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

## Kaj so agenti Dots

Dot je agent, torej program, ki samostojno opravi več korakov. Deluje ves čas, poganja ga GPT-6 Astra, in ima svoj računalnik in brskalnik v oblaku, zato dela naprej tudi, ko je vaš računalnik ugasnjen. Zna raziskovati, analizirati podatke, pripravljati dokumente in pisati programsko kodo.

Z istim agentom se lahko pogovarjate v ChatGPT, v Slacku, v Microsoft Teams ali ga pokličete. Zapomni si vaše preference in odločitve ter pri naslednjem pogovoru nadaljuje, kjer ste ostali. Ko potrebuje vašo odločitev, vas vpraša. Če se mora prijaviti na spletno stran, vam pošlje zahtevo, geslo pa vpišete v ločen obrazec zunaj pogovora. Do vaših aplikacij, na primer e-pošte ali dokumentov, dostopa le, če jih povežete in mu to dovolite.

Vir: [OpenAI, Meet dots](https://learn.chatgpt.com/docs/dots)

## Ali lahko Dots uporabljate v Sloveniji

Odvisno od paketa:

- **Pro** (v Sloveniji od 103 EUR na mesec): samo za uporabnike, starejše od 18 let, zunaj Evropskega gospodarskega prostora, Združenega kraljestva in Švice. V Sloveniji torej ne.
- **Business Premium:** uvajajo jih po vsem svetu.
- **Enterprise:** uvajajo jih po vsem svetu, privzeto pa so izklopljeni in jih mora vklopiti skrbnik.

Uvajanje je postopno, zato jih morda ne boste videli takoj, tudi če paket ustreza. Pogovori z agentom se ne štejejo v omejitve uporabe ChatGPT, opravila, ki jih agent zažene v Work ali Codexu, pa se.

Viri: [OpenAI, Meet dots](https://learn.chatgpt.com/docs/dots), [OpenAI, cenik paketov](https://learn.chatgpt.com/docs/pricing)

## Kako se odločiti

**Kaj to pomeni za vas:** če prek API-ja že uporabljate Claude Sonnet 5.5, je GPT-6.1 Sol enako drag, zato odloča predvsem kakovost na vaših nalogah. Vzemite deset tipičnih primerov, jih pošljite obema modeloma in primerjajte, koliko ste morali popraviti. Če morajo podatki ostati v EU, preverite, ali vaš OpenAI račun hrambo v EU že ima vklopljeno.

Pri agentih Dots velja enako kot pri vsakem agentu, ki dela sam: povežite le aplikacije, ki jih naloga res potrebuje, in pred pošiljanjem, objavo ali plačilom naj potrdi človek. Kako se tega lotiti, opisuje vodnik [Varna raba AI v podjetju](/vodniki/varna-raba-ai-v-podjetju/).
