---
title: 'Subagenti v Claude Code: kaj so in kdaj jih uporabiti'
description: 'Kaj so subagenti v Claude Code, zakaj imajo svoj kontekst, kateri so vgrajeni, kako naredite svojega in kdaj se splačajo, ko delo razdelite na več agentov.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 7
videi: [dLiXiD8hOAI, qtKkzsQjAy0]
---

Subagent je pomočnik, ki mu glavni Claude preda del naloge. Opravi ga v svojem, ločenem pogovoru in vrne samo povzetek. Tako glavni pogovor ostane pregleden, več delov naloge pa lahko teče hkrati.

## Zakaj ločen kontekst

Vsak subagent ima svoje okno konteksta, svoja navodila, svoja orodja in dovoljenja. Ko na primer preišče sto datotek, da najde tri pomembne, v glavni pogovor ne pride vseh sto, ampak samo ugotovitev. Subagent ne vidi zgodovine glavnega pogovora, ampak samo sporočilo, s katerim mu je bila naloga predana. Zato mora biti to sporočilo samostojno: kaj naj naredi, kje, in kaj naj vrne.

Anthropic v članku o kontekstnem inženiringu opisuje isti razlog: subagenti s čistim kontekstom vrnejo zgoščene povzetke, glavni agent pa ostane osredotočen.

Subagenti porabljajo del vaše kvote uporabe, zato jih uporabljajte tam, kjer prinesejo korist.

Viri: [Claude Code, subagenti](https://code.claude.com/docs/en/sub-agents), [Anthropic, kontekstni inženiring za agente](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## Vgrajeni subagenti

Claude Code ima tri glavne vgrajene subagente. Explore išče po datotekah in jih samo bere. Plan v načinu načrtovanja zbira kontekst, preden Claude predstavi načrt, in prav tako samo bere. General-purpose raziskuje in tudi ukrepa. Claude jih uporabi sam, ko presodi, da je to smiselno.

## Kdaj se splačajo

Pri vzporednem delu. Če morate preveriti tri vire ali pripraviti tri neodvisne dele poročila, jih lahko trije subagenti delajo hkrati.

Pri iskanju in branju. Ko je treba prebrati veliko besedila, da najdete malo, naj to naredi subagent, glavnemu pogovoru pa vrne le bistvo.

Pri preverjanju. Neodvisen subagent, ki preveri delo drugega, ne pozna njegovih predpostavk, zato najde napake, ki jih avtor spregleda. Na ej-aj.si tako preverjamo vsako številko in vsak datum v člankih.

Ne splačajo se pri majhnih nalogah, kjer bi predaja naloge vzela več časa kot delo samo, in pri nalogah, kjer je ves čas potreben celoten kontekst pogovora.

## Kako naredite svojega

Subagent je datoteka Markdown v mapi `.claude/agents/` v projektu ali `~/.claude/agents/` za vse vaše projekte. Obvezna sta samo ime in opis, neobvezno pa lahko določite orodja, model in dovoljenja. Namesto ročnega pisanja lahko Clauda prosite, naj datoteko pripravi.

```markdown
---
name: preverjevalec-dejstev
description: Preveri vsako številko, datum in ime v besedilu pri navedenem viru. Uporabi pred objavo vsakega članka.
tools: Read, WebFetch
model: sonnet
---

Odpri vsak vir v besedilu. Za vsako trditev s številko, datumom ali imenom
preveri, ali jo vir res navaja. Vrni seznam: trditev, kaj piše v viru, povezava.
Trditev, ki je vir ne navaja, označi kot nepreverjeno, tudi če je verjetno resnična.
```

Claude subagenta uporabi sam, ko opis ustreza nalogi, ali pa ga pokličete po imenu. Če v opis napišete, naj ga uporablja proaktivno, ga bo pogosteje.

V novejših različicah lahko subagenti zaženejo tudi svoje subagente, privzeto do tri ravni globoko, hkrati pa jih teče največ 20.

Vir: [Claude Code, subagenti](https://code.claude.com/docs/en/sub-agents)

## Kako se povežejo s skilli in hooki

Skill pove, kako se naloga opravi. Subagent jo opravi v ločenem kontekstu. Hook poskrbi, da se nekaj zgodi vsakič, ne glede na to, za kaj se model odloči. Kako izbrati med njimi, je opisano v delih [Claude skills](/vodniki/claude-skills/) in [Hooki v Claude Code](/vodniki/hooki-claude-code/).
