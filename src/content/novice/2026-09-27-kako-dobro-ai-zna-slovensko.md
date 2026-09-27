---
title: 'Kako dobro AI zna slovensko: ChatGPT, Claude, Gemini, Copilot in GaMS'
description: 'Kaj o slovenščini velikih jezikovnih modelov povedo slovenske meritve, katera orodja slovenščino uradno podpirajo, kaj je slovenski model GaMS in kako izbrati za svoje delo.'
date: 2026-09-27
type: vodnik
---

Vsa večja AI orodja odgovarjajo v slovenščini, vprašanje je, kako dobro. Ta vodnik zbere, kar je o tem mogoče preveriti: rezultate slovenskih meritev, uradne sezname podprtih jezikov in slovenski model GaMS. Stanje je septembra 2026.

## Na kratko

- Na EuroEvalu in SloBenchovi lestvici za prevajanje so najboljši modeli Googla, Anthropica in OpenAI-ja blizu skupaj. Na CJVT-jevi areni je Gemini 2.5 Pro opazno pred ostalimi, Claude pa tam ni ocenjen.
- Slovenski model GaMS3 je na CJVT-jevi areni, kjer ljudje slepo ocenjujejo odgovore v slovenščini, drugi, takoj za Gemini 2.5 Pro.
- Microsoft slovenščino izrecno navaja med jeziki, ki jih je za Copilot preizkusil. Claude slovenščine nima med jeziki vmesnika, pogovarja pa se v njej. stranska plošča Gemini v Gmailu in Dokumentih slovenščine nima med podprtimi jeziki, Mistral je nima med jeziki, v katerih pričakuje dobro delovanje.
- Za prepoznavo slovenskega govora je na SloBenchovi lestvici najboljše slovensko orodje, ne svetovni ponudniki.
- Najzanesljivejši test je vaš: isto nalogo v slovenščini dajte dvema orodjema in primerjajte.

## Kaj povedo meritve

Slovenskih meritev za jezikovne modele je nekaj, vsaka meri nekaj drugega. Nobena ne zajema vseh najnovejših modelov, zato jih je treba brati skupaj.

### Arena CJVT: kaj izberejo ljudje

Center za jezikovne vire in tehnologije Univerze v Ljubljani vodi slovensko areno, kjer uporabniki dobijo dva odgovora na isto vprašanje v slovenščini, ne vedo, kateri model je napisal katerega, in izberejo boljšega. Iz glasov nastane lestvica. Na njej je 32 modelov; stran ne navaja datuma zadnje posodobitve. V tabeli je izbor.

| Mesto | Model | Ocena (ELO) | Glasov |
|---|---|---|---|
| 1 | Gemini 2.5 Pro | 1.129 | 273 |
| 2 | GaMS3 12B Instruct | 1.054 | 370 |
| 3 | GaMS 27B Instruct Nemotron | 1.048 | 302 |
| 5 | Gemini 2.0 Flash | 1.038 | 157 |
| 7 | GPT-5 | 1.036 | 99 |
| 9 | GPT-4o | 1.027 | 267 |
| 10 | Gemini 3 Pro (predogled) | 1.020 | 36 |
| 13 | Mistral Large 3 | 1.008 | 82 |

Pri večini modelov je negotovost ocene 20 do 30 točk, zato se intervali modelov od drugega do približno šestnajstega mesta prekrivajo. Gemini 2.5 Pro je edini jasno pred ostalimi. Nekateri novejši modeli imajo malo glasov. Modelov Claude in Copilot na lestvici ni.

Vir: [Slovenska arena CJVT, lestvica](https://arena.cjvt.si/en/leaderboard)

### EuroEval: avtomatski testi v slovenščini

EuroEval je evropska zbirka avtomatskih testov za jezikovne modele, med njimi za slovenščino. Rezultat je povprečno mesto čez vse naloge, manjše je boljše. Na slovenski lestvici (zadnja sprememba aprila 2026) so v vrhu Gemini 2.5 Flash z razmišljanjem (1,34), Claude Sonnet 4.5 z razmišljanjem (1,37), GPT-5 (1,37), Gemini 3 Pro v predogledu (1,39) in Gemini 2.5 Pro (1,43). GaMS na tej lestvici ni.

Vir: [EuroEval, slovenska lestvica (podatki)](https://github.com/EuroEval/leaderboards/blob/main/leaderboards/slovene_all_simplified.csv)

### SloBench: prevajanje

Na SloBenchu, zbirki slovenskih testov CJVT, je lestvica za strojno prevajanje iz angleščine v slovenščino. Po meri BERTScore so v vrhu DeepL (0,8812), Gemini 1.5 Pro (0,8791), Claude Sonnet 3.5 (0,8789) in GPT-4o (0,8784), GaMS3 12B Instruct je trinajsti (0,8714). Razlike so majhne, v testu pa so starejše različice modelov iz leta 2024.

Vir: [SloBench, prevajanje iz angleščine v slovenščino](https://slobench.cjvt.si/leaderboard/view/8)

## Uradna podpora slovenščini

Kaj ponudniki sami pravijo o slovenščini:

| Orodje | Vmesnik v slovenščini | Kaj pravi ponudnik |
|---|---|---|
| ChatGPT | da | slovenščina je med jeziki vmesnika |
| Claude | ne | vmesnik ima 11 jezikov, pogovarjate se lahko v katerem koli |
| Gemini (aplikacija) | da | slovenščina je med več kot 70 podprtimi jeziki |
| Gemini v Gmailu, Dokumentih in Preglednicah | ne | stranska plošča Gemini podpira 29 jezikov, slovenščine med njimi ni |
| Microsoft 365 Copilot | da | slovenščina je med 48 jeziki, za katere Microsoft navaja, da je kakovost široko preizkušena |
| Mistral | ni podatka | slovenščine ni na seznamu jezikov, kjer pričakuje dobro delovanje; hrvaščina, srbščina, češčina in poljščina so |

Anthropic in OpenAI objavljata rezultate svojih modelov za 14 jezikov, slovenščine med njimi ni.

Viri: [OpenAI, jezik vmesnika ChatGPT](https://help.openai.com/en/articles/8357869-how-to-change-your-language-setting-in-chatgpt), [Claude, raba v izbranem jeziku](https://support.claude.com/en/articles/10769299-how-to-use-claude-in-your-preferred-language), [Google, jeziki aplikacije Gemini](https://support.google.com/gemini/answer/13575153?hl=en), [Google, jeziki Gemini v Workspace](https://support.google.com/docs/answer/14925782?hl=en), [Microsoft, jeziki Microsoft 365 Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/supported-languages-for-microsoft-365-copilot), [Mistral, jeziki](https://docs.mistral.ai/resources/languages), [Anthropic, večjezičnost](https://platform.claude.com/docs/en/build-with-claude/multilingual-support), [OpenAI, večjezični MMLU](https://github.com/openai/simple-evals/blob/main/multilingual_mmlu_benchmark_results.md)

## GaMS: slovenski model

GaMS je družina jezikovnih modelov, ki jih v projektu PoVeJMo razvijajo na Fakulteti za računalništvo in informatiko ter CJVT Univerze v Ljubljani. Najnovejša različica, GaMS3 12B, temelji na Googlovem odprtem modelu Gemma 3, dodatno pa je učena na slovenskih besedilih. Za razvoj modela (priprava podatkov in učenje) so na evropskem superračunalniku Leonardo porabili približno 150 tisoč ur grafičnih procesorjev. Model razume slovensko in angleško, delno tudi hrvaško, bosansko in srbsko, in ima kontekstno okno 131.072 tokenov.

Uteži modela so prosto dostopne pod Googlovimi pogoji za Gemmo, zato ga podjetje lahko poganja na svoji strojni opremi in podatki ne zapustijo hiše. Po poročanju Univerze v Ljubljani so štiri podjetja (Semantika, Špica, Better in XLAB) model GaMS že prilagodila za svoje aplikacije. Klepetalnik z modelom je na voljo na povejmo.si, pri namestitvi pomaga SLAIF.

Po naši oceni so za vsakdanje pisarniško delo veliki komercialni modeli bolj priročni. GaMS je smiseln, ko podatki ne smejo iz podjetja ali ko želite model prilagoditi svojim besedilom.

Viri: [GaMS3 12B Instruct, Hugging Face](https://huggingface.co/cjvt/GaMS3-12B-Instruct), [GaMS, odprti dostop](https://gams.povejmo.si/odprtidostop/), [Univerza v Ljubljani, 20. 7. 2026](https://www.uni-lj.si/novice/2026-07-20-slovenscina-dobila-svoj-veliki-generativni-jezikovni-model-gams)

## Govor in prevajanje

Za prepoznavo slovenskega govora ima SloBench posebno lestvico. Najmanj napak ima slovensko orodje Truebar (4,0 % napačnih besed), blizu so tudi drugi slovenski razpoznavalniki. Med tujimi ponudniki imajo ElevenLabs 10,7 %, Microsoftova storitev Azure 14,4 % in OpenAI Whisper 19,7 % napačnih besed. Rezultati tujih ponudnikov so iz let 2023 do 2025, zadnji vnos na lestvici je iz avgusta 2025.

Uradne izjave, da glasovni načini ChatGPT, Claude ali Gemini podpirajo slovenščino, nismo našli. Claude navaja, da so jeziki razen angleščine v glasovnem načinu v preizkusni fazi.

Za prevajanje in prepis govora so na voljo tudi prosto dostopna slovenska orodja iz projekta RSDO na portalu Slovenščina.eu.

Viri: [SloBench, prepoznava govora](https://slobench.cjvt.si/leaderboard/view/10), [Claude, glasovni način](https://support.claude.com/en/articles/11101966-use-voice-mode), [Slovenščina.eu, prevajalnik](https://slovenscina.eu/prevajalnik), [Slovenščina.eu, razpoznavalnik govora](https://slovenscina.eu/razpoznavalnik)

## Kako izbrati za svoje delo

Na avtomatskih testih so vodilni modeli blizu skupaj, razlike pa se spreminjajo z vsako novo različico. Zato je odločilna vaša vrsta besedil. Pri preverjanju slovenskih besedil je vredno posebej pogledati sklanjanje lastnih imen, dvojino, strokovne izraze, ki bi jih model lahko prevedel dobesedno iz angleščine, in stavčno zgradbo, ki posnema angleško.

Preizkus, ki vzame pol ure:

1. Izberite tri resnična besedila iz svojega dela: e-sporočilo stranki, povzetek dokumenta, strokovno besedilo z vašimi izrazi.
2. Isto nalogo z enakim promptom dajte dvema ali trem orodjem.
3. Besedila naj prebere nekdo, ki dobro piše, brez podatka, katero orodje jih je napisalo.
4. Izberite orodje, ki je dalo najmanj popravkov, in mu v navodila zapišite izraze in pravila, ki jih je zgrešilo.

Kako napisati tako navodilo, piše v vodniku [Kako napisati dober prompt](/vodniki/kako-napisati-dober-prompt/), kako orodja izbrati glede na cene in podatke pa v vodniku [Kako izbrati AI orodje za podjetje](/vodniki/kako-izbrati-ai-orodje-za-podjetje/).
