---
title: 'Kaj je umetna inteligenca in kako deluje: razlaga za začetnike'
description: 'Kaj je umetna inteligenca, kako ChatGPT sestavi odgovor, kaj so jezikovni modeli, zakaj si AI včasih kaj izmisli in kako začeti. Razlaga brez tehničnega predznanja.'
date: 2026-10-03
type: vodnik
---

Umetna inteligenca (AI, iz angleškega artificial intelligence) je skupno ime za računalniške programe, ki opravljajo naloge, za katere je bila prej potrebna človeška presoja: razumejo besedilo, prepoznajo obraz na fotografiji, predlagajo naslednjo pesem ali napišejo odgovor na e-pošto. Ta vodnik razloži, kako taki programi delujejo, zakaj se včasih zmotijo in kako jih začnete uporabljati. Tehničnega predznanja ne potrebujete.

## Na kratko

- AI ni en program, ampak veliko različnih programov. Večina se nalog nauči iz primerov, ne iz pravil, ki bi jih napisal programer.
- ChatGPT, Claude, Gemini in Copilot so klepetalniki, ki temeljijo na velikih jezikovnih modelih. Jezikovni model odgovor sestavlja sproti, košček za koščkom, tako da napoveduje, kaj najverjetneje sledi.
- Model se uči napovedovati verjetno besedilo, ne resničnega, zato včasih samozavestno navede napačen podatek. Temu pravimo halucinacija.
- V Sloveniji je leta 2025 orodje generativne AI v zadnjih treh mesecih uporabilo 37,6 % prebivalcev med 16. in 74. letom, v EU 32,7 %.
- Začnete lahko brezplačno. Za prve korake so spodaj povezave na vodnike.

## Kaj šteje za umetno inteligenco

Splošno sprejete definicije ni. Pravno definicijo ima evropski [Akt o umetni inteligenci](/vodniki/ai-act-za-slovenska-podjetja/) (AI Act). Po njej je sistem umetne inteligence program, ki iz prejetih podatkov sklepa, kako ustvariti rezultat: napoved, vsebino, priporočilo ali odločitev. Pri tem deluje bolj ali manj samostojno, po začetku uporabe pa se lahko tudi prilagaja.

Bistvo je v besedi "sklepa": sistem iz podatkov sam ugotovi, kako priti do rezultata. Navaden program naredi točno to, kar mu je programer napisal v pravilih. Večina današnjih sistemov AI pa pravil nima zapisanih, ampak se je vzorcev naučila iz primerov.

AI uporabljate že dolgo, tudi če tega ne veste: filter neželene pošte, ki zna ločiti oglas od pravega sporočila, navigacija, ki oceni, kdaj boste prispeli, odklepanje telefona z obrazom, priporočila na Netflixu in Spotifyju, strojni prevajalnik. Novo v zadnjih letih je predvsem to, da AI zna tudi ustvarjati besedila, slike, zvok in video. Temu pravimo generativna AI.

Vir: [Uredba (EU) 2024/1689 o umetni inteligenci, člen 3](https://eur-lex.europa.eu/legal-content/SL/TXT/HTML/?uri=OJ:L_202401689)

## Kako se računalnik uči iz primerov

Učenju iz primerov pravimo strojno učenje. Namesto da bi programer napisal pravila, kako prepoznati neželeno pošto, programu pokaže veliko sporočil, ki so označena kot "neželeno" ali "v redu". Program sam poišče, po čem se razlikujejo, in to znanje nato uporabi na novih sporočilih.

Znanje programa je zapisano v množici števil, ki jim pravimo parametri ali uteži. Med učenjem se ta števila po malem spreminjajo, dokler program ne odgovarja dovolj dobro. Slovenski jezikovni model GaMS3, ki so ga na Fakulteti za računalništvo in informatiko Univerze v Ljubljani razvili na osnovi Googlovega modela Gemma 3, ima na primer 12 milijard parametrov, največji modeli pa še veliko več. Ko ljudje rečejo, da je model "naučen", mislijo to: števila so nastavljena tako, da program pri novih vprašanjih večinoma da uporaben odgovor.

Vir: [GaMS3 12B na Hugging Face](https://huggingface.co/cjvt/GaMS3-12B-Instruct)

## Kaj so veliki jezikovni modeli

Veliki jezikovni model (angl. large language model, LLM) je program, ki se je iz ogromne količine besedil naučil, kako si besede sledijo. Na takih modelih temeljijo ChatGPT (podjetje OpenAI), Claude (Anthropic), Gemini (Google) in Microsoft Copilot. Klepetalnik je aplikacija, prek katere se z modelom pogovarjate; isti model lahko poganja več aplikacij.

Po navedbah OpenAI se njihovi modeli učijo predvsem iz treh virov: javno dostopnih vsebin na internetu, podatkov partnerjev ter podatkov, ki jih prispevajo uporabniki, ljudje, ki sodelujejo pri učenju modela, in raziskovalci. Vse pogosteje uporabljajo tudi umetno ustvarjene (sintetične) podatke. Razvoj ima več faz: pripravo podatkov za učenje, predučenje (model se uči iz velike količine besedil), naknadno učenje (model dodatno naučijo, kako naj odgovarja) ter preverjanje in izboljšave po začetku uporabe.

Vir: [OpenAI, kako nastajajo ChatGPT in njihovi modeli](https://help.openai.com/en/articles/7842364-how-chatgpt-and-our-foundation-models-are-developed)

## Kako ChatGPT sestavi odgovor

Model besedilo razreže na manjše koščke, ki jim pravimo tokeni. Token je lahko cela beseda, del besede ali ločilo. Odgovor nato sestavlja po en košček naenkrat: glede na vaše vprašanje in vse, kar je že napisal, oceni, kateri tokeni so najverjetnejše nadaljevanje, in izbere enega od njih.

OpenAI to ponazori s stavkom "Namesto levo je zavila ___". Na začetku učenja so odgovori modela večinoma naključni. Ko obdela veliko besedila, se nauči, da sta smiselni nadaljevanji na primer "desno" ali "nazaj". Ker je smiselnih nadaljevanj več, je v odgovorih nekaj naključja, zato lahko na isto vprašanje dobite različna odgovora.

Po navedbah OpenAI model ne hrani kopij besedil, iz katerih se je učil, in odgovora ne prepiše iz njih, ampak ga sestavi iz naučenih vzorcev.

Brez iskanja po spletu model odgovarja samo iz tega, kar se je naučil, zato novejših dogodkov praviloma ne pozna.

Vir: [OpenAI, kako nastajajo ChatGPT in njihovi modeli](https://help.openai.com/en/articles/7842364-how-chatgpt-and-our-foundation-models-are-developed)

## Zakaj si AI včasih kaj izmisli

Halucinacija je odgovor, ki zveni prepričljivo, a ni resničen: izmišljen datum, vir, citat ali številka. OpenAI je septembra 2025 objavil raziskavo, po kateri je eden od razlogov način, kako se modele ocenjuje. Pri večini testov model dobi točko samo za pravilen odgovor, za "ne vem" pa nič. Tako kot pri testu izbirnega tipa se zato bolj splača ugibati kot priznati, da odgovora ne ve. Drugi razlog je, da redkih podatkov, na primer rojstnega dne manj znane osebe, model iz vzorcev v besedilih ne more zanesljivo napovedati.

OpenAI v isti objavi zapiše, da halucinacije ostajajo temeljni izziv za vse velike jezikovne modele. Takratni najnovejši model GPT-5 jih ima po njihovih navedbah opazno manj, zlasti ko pred odgovorom razmišlja, povsem pa jih ne odpravi.

Kaj to pomeni v praksi: vsako številko, datum, ime in vir, ki jih dobite od AI, preverite, preden jih uporabite. Napake zmanjšate, če modelu sami daste dokument, iz katerega naj odgovarja. Če zahtevate, naj navede vir, ga lahko preverite, a vir odprite, saj si ga model lahko tudi izmisli. Kako napišete dobro navodilo, razloži vodnik [Kako napisati dober prompt](/vodniki/kako-napisati-dober-prompt/).

Vir: [OpenAI, zakaj jezikovni modeli halucinirajo](https://openai.com/index/why-language-models-hallucinate/)

## Kaj AI zna in česa ne

Ta razdelek je naša ocena, ne meritev.

AI dobro pomaga pri nalogah, kjer je besedilo že na voljo ali kjer lahko rezultat hitro preverite: povzetek dolgega dokumenta, osnutek dopisa, prevod, preoblikovanje tabele, ideje za naslov, razlaga pojma, pomoč pri formuli v Excelu. Prihrani čas pri prvem osnutku, končno besedilo pa še vedno preberete sami.

Slabše se obnese pri nalogah, kjer potrebuje podatke, ki jih nima (interne številke podjetja, sveže novice brez iskanja po spletu), in pri odločitvah, kjer napaka veliko stane (pravni, davčni, zdravstveni nasveti). Tu je lahko dobro izhodišče, odločitev pa ostane pri človeku.

Pri osebnih podatkih in poslovnih skrivnostih bodite previdni: v brezplačne in osebne pakete jih ne vnašajte. Zakaj in kaj storiti namesto tega, piše v vodniku [Kateri podatki ne sodijo v ChatGPT](/vodniki/varna-raba-ai-v-podjetju/).

## Koliko ljudi v Sloveniji uporablja AI

Po podatkih Eurostata je leta 2025 orodje generativne AI v zadnjih treh mesecih uporabilo 37,6 % prebivalcev Slovenije, starih od 16 do 74 let. Povprečje EU je bilo 32,7 %. Med mladimi od 16 do 24 let je bilo uporabnikov 73 %. Vsaj eno tehnologijo AI je uporabljalo 21,6 % slovenskih podjetij z vsaj 10 zaposlenimi (brez finančnega sektorja).

Več številk in primerjav z drugimi državami je na strani [AI v Sloveniji v številkah](/statistika/).

Vir: [Eurostat, raba generativne AI pri prebivalcih](https://ec.europa.eu/eurostat/databrowser/view/isoc_ai_iaiu/default/table), [Eurostat, raba AI v podjetjih](https://ec.europa.eu/eurostat/databrowser/view/isoc_eb_ai/default/table)

## Kako začeti

1. Izberite eno orodje in ustvarite brezplačen račun. Razlike med brezplačnimi paketi so v vodniku [Brezplačna AI orodja](/vodniki/brezplacna-ai-orodja/), navodila za prve korake pa v vodniku [ChatGPT v slovenščini](/vodniki/chatgpt-v-slovenscini/).
2. Dajte mu nalogo iz svojega dela, ki jo dobro poznate, da boste znali oceniti odgovor. Na primer: povzemi ta zapisnik v pet točk.
3. Če odgovor ni dober, ne začnite znova, ampak povejte, kaj naj popravi. Popravke lahko zahtevate večkrat v istem pogovoru.
4. Preverite vsa dejstva, preden besedilo pošljete naprej.
5. Če vas zanima, katero orodje izbrati ali koliko stane, poglejte primerjavo [ChatGPT, Claude ali Gemini](/vodniki/chatgpt-claude-ali-gemini/) in stran [Modeli in cene](/modeli/).

Neznane izraze (token, prompt, agent, kontekstno okno) razloži [AI slovar](/slovar/).
