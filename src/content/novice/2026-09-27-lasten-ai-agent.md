---
title: 'Kako naredite svojega AI agenta s Claudom: pet načinov od najpreprostejšega do programiranja'
description: 'Pet načinov, kako s Claudom narediti lastnega AI agenta: projekt, skill z rutino, subagent, Agent SDK in Managed Agents. Kdaj izbrati katerega in kaj potrebujete.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 10
videi: [zObYdmNB2Bo]
---

Beseda agent se uporablja za marsikaj. Tu z njo mislimo AI, ki samostojno opravi nalogo v več korakih: prebere, kar potrebuje, uporabi orodja, preveri rezultat in ga vrne. Lastnega agenta lahko naredite na pet načinov, ki so spodaj razvrščeni po zahtevnosti. Za večino podjetij zadoščata prva dva ali trije.

## 1. Projekt z navodili

Najpreprostejši agent je projekt v aplikaciji Claude z dobrimi navodili in dokumenti. Ne dela sam, a vsakič, ko ga odprete, ve, kdo ste, kaj je naloga in kje so podatki. Z vklopljenimi konektorji (povezavami z drugimi aplikacijami) lahko bere tudi iz drugih orodij. Na voljo je v vseh paketih, v brezplačnem do pet projektov. Kako ga napolniti, je opisano v delu [Kako AI-ju dati kontekst podjetja](/vodniki/kontekst-podjetja-za-ai/).

Vir: [Claude, kaj so projekti](https://support.claude.com/en/articles/9517075-what-are-projects)

Primerno za: ponavljajoče se naloge, pri katerih ste zraven, na primer pisanje ponudb ali odgovorov strankam.

## 2. Skill in rutina

Skill zapiše postopek, rutina ga požene ob določenem času. Skupaj naredita agenta, ki dela sam: vsak ponedeljek pripravi poročilo, vsak dan preveri nove račune. Programiranje ni potrebno, potrebujete Claude Code ali namizno aplikacijo. Glejte dela [Claude skills](/vodniki/claude-skills/) in [Rutine v Claudu](/vodniki/rutine-claude/).

Primerno za: naloge, ki se ponavljajo po urniku in jih lahko zapišete kot postopek.

## 3. Subagent

Subagent je specializiran pomočnik v Claude Code s svojimi navodili, orodji in modelom, na primer preverjevalec dejstev ali pregledovalec pogodb. Glavni Claude mu preda del naloge. Opisan je v delu [Subagenti v Claude Code](/vodniki/subagenti/).

Primerno za: naloge, ki jih je smiselno ločiti od glavnega dela, ker potrebujejo svoj kontekst ali neodvisen pogled.

## 4. Claude Agent SDK

Agent SDK je knjižnica za programska jezika Python in TypeScript, torej zbirka pripravljene kode. Razvijalcem ponuja ista orodja, isto zanko delovanja agenta in upravljanje konteksta kot Claude Code, da jih vgradijo v lastne programe. Z njo razvijalec naredi agenta, ki teče v vašem sistemu, na primer v spletni aplikaciji ali na strežniku. Za delo potrebuje ključ za API, geslo, s katerim program dostopa do Claudove povezave za razvijalce.

Primerno za: agente, ki morajo biti del vašega izdelka ali notranjega sistema.

Vir: [Claude Agent SDK, pregled](https://code.claude.com/docs/en/agent-sdk/overview)

## 5. Managed Agents

Managed Agents so Anthropicova storitev, ki agenta izvaja privzeto v Anthropicovem oblaku, za dolge naloge, ki tečejo v ozadju, ne da bi čakali nanje. Storitev je v preizkusni fazi (beta) in je namenjena razvijalcem.

Vir: [Anthropic, Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)

## Povezave z orodji: konektorji in MCP

Agent je uporaben toliko, kolikor ima dostop do orodij in podatkov. MCP (Model Context Protocol) je odprt standard za povezovanje AI z orodji, kot so Google Drive, Jira ali Slack. V aplikaciji Claude jih dodate kot konektorje v meniju Customize > Connectors, v brezplačnem paketu lahko dodate en konektor po meri. V Claude Code jih dodate z ukazom `claude mcp add`.

Anthropic opozarja, naj uporabljate samo strežnike MCP (programe, ki AI povežejo z določenim orodjem), ki jim zaupate, ker lahko vsebina, ki jo agent prebere, vsebuje skrita navodila. Temu pravimo [vrivanje navodil](/slovar/vrivanje-navodil/).

Viri: [Claude Code, MCP](https://code.claude.com/docs/en/mcp), [Claude, konektorji](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)

## Kako izbrati

Začnite pri najpreprostejšem načinu, ki nalogo reši. Projekt z navodili je narejen v eni uri. Skill z rutino v enem popoldnevu. Agent SDK zahteva razvijalca in vzdrževanje. Pri vsakem načinu velja isto: agent naj ima jasen cilj, jasen konec naloge in način, kako preveri svoje delo, preden ga vrne.
