---
title: 'Hooki v Claude Code: kaj so in kako z njimi nastavite pravila, ki se izvedejo samodejno'
description: 'Kaj so hooki v Claude Code, kako se razlikujejo od navodil v CLAUDE.md, katere dogodke poznajo, kako zaustavijo dejanje in na kaj paziti pri varnosti.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 8
---

Navodila v `CLAUDE.md` in skillih so nasveti: Claude jih praviloma upošteva, zagotovila pa ni. Hook je drugačen. To je ukaz, ki se samodejno izvede ob določenem dogodku, vsakič, ne glede na to, za kaj se model odloči. Anthropic to opisuje kot determinističen nadzor: hook se ob dogodku izvede vsakič, ne glede na presojo modela.

## Kdaj navodilo ni dovolj

Anthropic v dokumentaciji o `CLAUDE.md` sam opozarja: ta datoteka je kontekst, ne obvezna nastavitev. Če želite dejanje zares preprečiti, uporabite hook.

Primeri, kjer je to smiselno:

- Claude nikoli ne sme spreminjati določene mape ali datoteke, na primer pogodb ali računovodskih izvozov.
- Po vsaki spremembi besedila naj se samodejno požene preverjanje oblike ali validator.
- Ko Claude konča daljšo nalogo ali čaka na vaše dovoljenje, naj vas obvesti.
- Ob začetku seje naj se v kontekst doda sveža informacija, na primer današnji datum ali stanje nalog.

Vir: [Claude Code, spomin in CLAUDE.md](https://code.claude.com/docs/en/memory)

## Dogodki

Hook je vezan na dogodek med delom Clauda. Najpomembnejši so:

| Dogodek | Kdaj se zgodi |
|---|---|
| SessionStart | ob začetku seje |
| UserPromptSubmit | ko pošljete sporočilo, preden ga Claude obdela |
| PreToolUse | preden Claude uporabi orodje, na primer zapiše datoteko ali požene ukaz |
| PostToolUse | ko je orodje uporabljeno |
| Notification | ko Claude pošlje obvestilo, na primer ko čaka na dovoljenje |
| Stop | ko Claude konča odgovor |
| SubagentStop | ko subagent konča |

Dokumentacija jih našteje več kot trideset, med njimi tudi dogodke ob stiskanju konteksta (ko Claude predolg pogovor povzame, da sprosti prostor) in ob spremembi datotek. S poljem `matcher` hook omejite na določena orodja, na primer samo na urejanje datotek.

## Kako hook ustavi dejanje

Hook je najpogosteje ukaz v lupini (ukazni vrstici računalnika), ki dobi podatke o dogodku. Ko se ukaz konča, vrne številko, imenovano izhodna koda, in ta določi, kaj se zgodi. Koda 0 pomeni, da hook nima pripomb. Pri PreToolUse to ne pomeni odobritve: še vedno velja običajen postopek dovoljenj. Koda 2 dejanje ustavi, Claude pa kot razlog dobi besedilo, ki ga je hook izpisal na izhod za napake (stderr). Nekaterih dogodkov ni mogoče ustaviti.

Hooke nastavite v datoteki `settings.json`: v `~/.claude/` za vse vaše projekte ali v `.claude/` v projektu, da veljajo za ekipo. Pregledate jih z ukazom `/hooks`. Namesto ročnega pisanja lahko Clauda prosite, naj hook pripravi, na primer: "Dodaj hook, ki prepreči vsako spremembo datotek v mapi pogodbe."

Primer nastavitve, ki po vsakem urejanju ali pisanju datoteke požene preverjanje:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "node scripts/preveri.mjs" }]
      }
    ]
  }
}
```

Viri: [Claude Code, vodnik za hooke](https://code.claude.com/docs/en/hooks-guide), [Claude Code, hooki](https://code.claude.com/docs/en/hooks)

## Varnost

Anthropic opozarja, da hooki z ukazi izvajajo ukaze z vsemi pravicami vašega uporabniškega računa na računalniku. Hook, ki ga je nekdo dodal v projekt, se izvede na vašem računalniku, ko projektu v oknu za zaupanje dovolite delo. Pred prvim zagonom projekta, ki ga niste pripravili sami, preglejte `.claude/settings.json` in vtičnike, ki jih namestite, saj lahko tudi ti vsebujejo hooke.

## Hook, skill ali navodilo

Navodilo v `CLAUDE.md` uporabite za stvari, ki jih Claude mora vedeti. Skill za postopek, ki ga Claude uporabi, ko je potreben. Hook za pravilo, ki mora veljati vsakič, ali za dejanje, ki se mora zgoditi samodejno. Če bi bila kršitev pravila draga, naj bo hook.
