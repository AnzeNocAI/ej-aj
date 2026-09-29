---
title: 'Kako napisati dober prompt: pravila, ki jih priporočajo Anthropic, OpenAI in Google'
description: 'Kako napisati prompt za Claude, ChatGPT ali Gemini, da dobite uporaben odgovor v prvem poskusu: jasna naloga, razlog, primeri, struktura in dolgi dokumenti. S primerom.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 2
---

Prompt je navodilo, ki ga date AI-ju. Anthropic, OpenAI in Google objavljajo svoje nasvete za pisanje promptov in ti se v bistvu ujemajo. Ta vodnik jih povzame za vsakdanjo rabo, brez tehničnih podrobnosti za razvijalce.

## Zlato pravilo: sodelavec brez konteksta

Anthropic svetuje, da si Clauda predstavljate kot zelo sposobnega novega sodelavca, ki ne pozna vaših navad, strank in pravil. Preden pošljete prompt, se vprašajte: ali bi sodelavec, ki o nalogi ne ve nič, iz tega besedila razumel, kaj želite? Če bi bil zmeden, bo zmeden tudi AI.

Iz tega sledi večina ostalih nasvetov. Povejte, za kaj gre, komu je rezultat namenjen, kakšno obliko želite in kaj je pomembno. Če je vrstni red korakov pomemben, jih oštevilčite. Če želite več kot minimalen odgovor, to izrecno zahtevajte.

## Povejte, zakaj

Navodilo z razlogom deluje bolje kot golo pravilo. Anthropicov primer: namesto "nikoli ne uporabljaj tropičij" napišite, da bo besedilo bral sintetizator govora, ki tropičja ne zna prebrati. Model iz razloga razume tudi primere, ki jih niste našteli.

V poslovnem jeziku: namesto "piši kratko" napišite "odgovor bo stranka brala na telefonu med sestankom, zato naj bo krajši od petih povedi".

## Dajte primere

Primeri so eden najzanesljivejših načinov, da dobite želeno obliko in ton. Anthropic priporoča tri do pet primerov, ki so si med seboj dovolj različni, da model ne prepiše enega. Google za Gemini priporoča, da primere dodate vedno, število pa preizkusite, saj preveč primerov lahko vodi v posnemanje. Če imate mail, ponudbo ali povzetek, s katerim ste bili zadovoljni, ga priložite kot primer.

## Ločite navodila, podatke in primere

Ko je prompt daljši, AI lažje sledi, če so deli jasno ločeni. Anthropic za to predlaga oznake, kot so `<navodila>`, `<dokument>` in `<primer>`, OpenAI in Google pa tudi naslove v obliki Markdown (preprost zapis oblikovanja z znaki, na primer # za naslov). Oblika ni pomembna, pomembno je, da se ve, kaj je navodilo in kaj besedilo, ki ga je treba obdelati.

## Dolgi dokumenti: najprej dokument, nato vprašanje

Pri dolgih dokumentih postavite dokument na začetek, vprašanje pa na konec. Anthropic navaja, da je to v njihovih testih izboljšalo kakovost odgovorov za do 30 %. Google za Gemini svetuje enako: najprej podatki, nato vprašanje.

Pri dolgih dokumentih pomaga tudi, če AI najprej izpiše dele besedila, ki so pomembni za vprašanje, in šele nato odgovori. Anthropic navaja, da to modelu pomaga osredotočiti se na pomembne dele. Hkrati vidite, na katerih delih besedila temelji odgovor, in ga lažje preverite.

## Recite, kaj želite, ne česa ne želite

"Piši v tekočih odstavkih" deluje bolje kot "ne uporabljaj alinej". Na obliko odgovora vpliva tudi oblika vašega prompta: če je prompt poln alinej in odebeljenih besed, bo verjetno tak tudi odgovor.

## Vloga v eni povedi

Ena poved o vlogi, na primer "Si izkušen računovodja, ki razlaga podjetnikom brez strokovnega znanja", po Anthropicovih navedbah že spremeni odgovor. Vloga ne nadomesti konteksta, je pa dober začetek.

## Velike naloge razdelite

Pri zahtevnih nalogah pogosto deluje zaporedje osnutek, pregled, popravek: najprej naj AI pripravi osnutek, nato ga preveri po vaših merilih, nato popravi. Vsak korak lahko pregledate, preden gre naprej.

Viri: [Anthropic, dobre prakse za prompte](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), [OpenAI, prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering), [Google, strategije za prompte](https://ai.google.dev/gemini-api/docs/prompting-strategies)

## Primer: pred in po

Slab prompt:

> Napiši ponudbo za čiščenje pisarn.

Boljši prompt:

> Pripravi osnutek ponudbe za redno čiščenje pisarn. Stranka je računovodski servis s 400 m² pisarn v Ljubljani, čiščenje želi trikrat na teden po 17. uri. Ponudbo bo bral direktor, ki ga zanimata predvsem cena in zanesljivost, zato naj bo stvarna in dolga največ eno stran.
>
> Uporabi naš cenik in predlogo ponudbe iz priloženih dokumentov. Cene vzemi samo iz cenika; če za kaj cene ni, napiši [manjka cena], namesto da jo oceniš.
>
> Na koncu posebej naštej, katere podatke še potrebujemo od stranke.

Drugi prompt je daljši, a pove, kdo je stranka, kdo bo bral, kaj je pomembno, iz česa naj AI dela in kaj naj naredi, ko podatka nima. Zadnje je posebej pomembno, ker AI brez takega navodila si manjkajoče podatke rad izmisli.

## Kontrolni seznam za prompt

- [ ] Ali bi sodelavec brez konteksta razumel nalogo?
- [ ] Ali piše, za koga je rezultat in kaj bo z njim naredil?
- [ ] Ali sem povedal, zakaj je kakšno pravilo pomembno?
- [ ] Ali sem priložil dokument ali primer, namesto da ga opisujem?
- [ ] Ali je jasno, kakšno obliko in dolžino želim?
- [ ] Ali piše, kaj naj AI naredi, ko podatka nima?

Ko imate dober prompt za nalogo, ki se ponavlja, ga ne pišite vsakič znova. Shranite ga v projekt ali skill, kot je opisano v naslednjih delih priročnika.
