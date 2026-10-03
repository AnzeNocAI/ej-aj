---
title: 'Ali zaznavalniki AI besedila delujejo: kaj kažejo raziskave in kaj to pomeni za slovenščino'
description: 'Ali lahko orodje zanesljivo ugotovi, da je besedilo napisal ChatGPT? Kaj kažejo raziskave, katere jezike podpira Turnitin, kaj priporoča Univerza v Ljubljani in kaj storiti namesto tega.'
date: 2026-10-03
type: vodnik
---

Zaznavalnik AI besedila (angl. AI detector) je orodje, ki za besedilo oceni, ali ga je napisal človek ali jezikovni model, na primer ChatGPT. Uporabljajo jih na primer šole in univerze. Ta vodnik povzame, kaj o zanesljivosti teh orodij kažejo raziskave in kaj pravijo njihovi ponudniki ter kaj to pomeni za besedila v slovenščini.

## Na kratko

- Raziskava, ki je preizkusila 14 zaznavalnikov, je ugotovila, da niso ne natančni ne zanesljivi. Ko je AI besedilo ročno popravljeno ali preoblikovano, delujejo še slabše.
- OpenAI je svoj zaznavalnik julija 2023 umaknil zaradi nizke natančnosti.
- Raziskava s Stanforda je pokazala, da zaznavalniki eseje ljudi, ki angleščine nimajo za materni jezik, pogosto napačno označijo kot AI.
- Turnitin zaznava AI le v angleščini, španščini, japonščini in arabščini. Slovenskih besedil ne preverja. Sam piše, da rezultat ne sme biti edina podlaga za ukrepanje proti študentu.
- Smernice Univerze v Ljubljani določajo, da zaznavalnik ni samostojen dokaz kršitve, ampak le pomožni signal. Presoja mora upoštevati tudi proces dela in pojasnila študenta.

## Kako zaznavalniki delujejo

Zaznavalniki pogosto temeljijo na jezikovnem modelu. OpenAI je na primer svoj zaznavalnik naredil tako, da je jezikovni model dodatno učil na parih človeških in AI besedil. Drugi zaznavalniki merijo, kako "predvidljivo" je besedilo: jezikovni modeli izbirajo zelo verjetne besede, zato je njihovo besedilo bolj enakomerno od človeškega. Rezultat je verjetnost ali odstotek, ne dokaz.

Iz tega sledita dve slabosti. Človek, ki piše preprosto in pravilno, lahko napiše zelo predvidljivo besedilo. AI besedilo, ki ga nekdo malo predela, pa ni več tako predvidljivo.

Viri: [OpenAI, zaznavalnik AI besedila](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/), [Liang in sod., GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)

## Kaj kažejo raziskave

Osem raziskovalcev z univerz v Nemčiji, Latviji, na Švedskem, Češkem, v Veliki Britaniji in Mehiki je v reviji International Journal for Educational Integrity decembra 2023 objavila preizkus 12 javno dostopnih zaznavalnikov in dveh komercialnih sistemov, ki ju uporabljajo šole (Turnitin in PlagiarismCheck). Zaključek: orodja niso ne natančna ne zanesljiva. Pogosteje so se zmotila tako, da so AI besedilo označila kot človeško. Ko so besedilo prikrili (ročno zamenjali besede ali ga preoblikovali s parafrazirnim orodjem Quillbot), so se rezultati še opazno poslabšali.

Raziskovalci s Stanforda so leta 2023 sedmim zaznavalnikom dali eseje, ki so jih za jezikovni izpit TOEFL napisali ljudje, ki angleščine nimajo za materni jezik. Zaznavalniki so v povprečju 61,22 % teh esejev označili kot AI. Kar 89 od 91 esejev (97,80 %) je kot AI označil vsaj eden od sedmih zaznavalnikov. Eseje ameriških osmošolcev so isti zaznavalniki ocenili skoraj brez napake. Avtorji opozarjajo, da lahko taka orodja v šolah nepravično kaznujejo tiste, ki pišejo v tujem jeziku.

Viri: [Weber-Wulff in sod., Testing of detection tools for AI-generated text](https://link.springer.com/article/10.1007/s40979-023-00146-z), [Liang in sod., GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819)

## Kaj pravijo ponudniki sami

OpenAI je januarja 2023 objavil svoj zaznavalnik. Na lastnem preizkusu je pravilno prepoznal le 26 % besedil, ki jih je napisal AI, 9 % človeških besedil pa je napačno označil kot AI. Za druge jezike razen angleščine ga niso priporočali. Julija 2023 so ga umaknili zaradi nizke natančnosti.

Turnitin, ki ga uporablja veliko univerz, zaznava AI samo v daljših besedilih (vsaj 300 besed) v angleščini, španščini, japonščini in arabščini. Za besedila v drugih jezikih poročila o AI ne izdela. V navodilih piše, da zaznavanje ni vedno pravilno in da rezultat ne sme biti edina podlaga za ukrepe proti študentu. Če zazna od 1 do 19 % AI besedila, Turnitin namesto številke pokaže le zvezdico, ker je v tem razponu več primerov, ko je človeško besedilo napačno označeno kot AI.

Google v besedila, ki jih napiše aplikacija Gemini (Googlov klepetalnik), vgradi vodni žig SynthID: skrit vzorec v izbiri besed, ki ga človek ne opazi. Preverjanje takega žiga ne ugiba po slogu, ampak išče ta vzorec. Prepozna le besedila, ki imajo žig SynthID, torej predvsem iz Googlovih izdelkov. Če je besedilo temeljito predelano ali prevedeno, je zanesljivost preverjanja precej nižja. Portal SynthID Detector zaenkrat preizkušajo novinarji in drugi medijski strokovnjaki s čakalnega seznama, Google pa kot vsebine za preverjanje na tej strani navaja slike, video in zvok, besedila ne.

Viri: [OpenAI, zaznavalnik AI besedila](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/), [Turnitin, poročilo o AI pisanju](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report), [Google DeepMind, SynthID](https://deepmind.google/models/synthid/), [Google, SynthID za razvijalce](https://ai.google.dev/responsible/docs/safeguards/synthid)

## Kaj to pomeni za slovenščino

Turnitin slovenščine ne podpira. Za orodja, ki trdijo, da podpirajo slovenščino, nismo našli javnih neodvisnih preizkusov na slovenskih besedilih. V že omenjeni evropski raziskavi so človeška besedila, ki so jih strojno prevedli v angleščino, zaznavalniki prepoznali za približno 20 % slabše. Če je že v angleščini rezultat nezanesljiv, po naši oceni za slovenščino ni razloga za večje zaupanje.

Univerza v Ljubljani je avgusta 2026 objavila nove smernice za rabo umetne inteligence. V njih piše, da orodja za zaznavanje uporabe AI niso samostojen in odločilni dokaz kršitve, ampak le pomožni signal v širši presoji, ki upošteva tudi navodila naloge, pojasnila študenta in vmesne osnutke. Center Digitalna UL je v novičniku ob objavi smernic zapisal, da detektorji niso zanesljivi. Smernice zahtevajo, da se raba AI navede, kadar pomembno vpliva na vsebino ali drugo bistveno sestavino izdelka, na primer strukturo, argumentacijo, analizo ali prevod.

Viri: [Univerza v Ljubljani, smernice za uporabo umetne inteligence](https://www.uni-lj.si/univerza/smernice-za-uporabo-umetne-inteligence), [Univerza v Ljubljani, sum neustrezne uporabe](https://www.uni-lj.si/univerza/smernice-za-uporabo-umetne-inteligence/sum-neustrezne-uporabe), [Center Digitalna UL, novičnik 31. 8. 2026](https://www.uni-lj.si/novice/2026-08-31-kako-postopati-ko-se-clovek-in-umetna-inteligenca-ne-strinjata)

## Kaj storiti namesto tega

To so naši predlogi, ne pravila.

Za učitelje in profesorje: vnaprej povejte, kaj je pri nalogi dovoljeno, in zahtevajte, da dijak ali študent navede, kje je uporabil AI. Ocenjujte tudi pot do izdelka (osnutke, zapiske, zgodovino sprememb v dokumentu) in ne le končnega besedila. Če kaj ni jasno, se z avtorjem pogovorite o vsebini: kdor je besedilo res napisal, običajno zna razložiti, zakaj je napisal tako.

Za delodajalce in naročnike: zaznavalnik ne pove, ali je besedilo dobro. Pomembno je, ali so podatki pravilni in ali je avtor zanje odgovoren. Pravila za rabo AI v podjetju lahko zapišete po naši [predlogi pravil rabe AI](/vodniki/predloga-pravil-rabe-ai/).

Za tiste, ki pišejo: če je vaše besedilo napačno označeno kot AI, shranite osnutke in zgodovino sprememb (Google Dokumenti jo hranijo samodejno, Word pa, če je datoteka shranjena v OneDrive ali SharePoint). To je dober dokaz, kako je besedilo nastalo.

Kako jezikovni modeli sestavljajo besedilo in zakaj je njihov slog predvidljiv, razloži vodnik [Kaj je umetna inteligenca in kako deluje](/vodniki/kaj-je-umetna-inteligenca/).
