---
title: 'Claude Code ali klepet: zakaj Code tudi za tiste, ki ne programirajo'
description: 'Kaj je Claude Code, kako se razlikuje od klepeta v Claudu, v katerih paketih je na voljo in zakaj se splača tudi pisarniškim ljudem, ne samo programerjem.'
date: 2026-09-27
type: vodnik
serija: prirocnik
korak: 4
videi: [S-sYlFiGFv8]
---

Claude Code ima v imenu besedo "code", zato ga večina ljudi, ki ne programirajo, preskoči. To je škoda. Claude Code je v bistvu Claude, ki lahko dela z datotekami na vašem računalniku, poganja ukaze in samostojno opravi daljšo nalogo. Za pisarniško delo je to pogosto bolj uporabno kot klepet.

## Kaj je kaj

V klasičnem klepetu Claude odgovarja na vprašanja in piše besedila; datoteke mu naložite sami.

Cowork je Anthropicovo orodje za delo v več korakih brez programiranja: Claude prebere in zapiše lokalne datoteke, pripravi Excel s formulami, predstavitev ali dokument in uporablja brskalnik. Septembra 2026 je Anthropic začel klepet in Cowork združevati v eno aplikacijo, kjer Claude sam presodi, kaj naloga potrebuje. Združitev prihaja najprej v paketa Pro in Max, Team in Free sledita, Enterprise pa pozneje.

Claude Code po Anthropicovem opisu prebere vaše datoteke, jih ureja, poganja ukaze in se poveže z orodji, ki jih uporabljate. Deluje v terminalu, v urejevalnikih VS Code in JetBrains, v zavihku Code namizne aplikacije Claude in na spletu na claude.ai/code. Vključen je v pakete Pro, Max, Team in Enterprise, pri Pro in Max si omejitve uporabe deli s klepetom. V brezplačnem paketu ga ni.

Viri: [Claude Code, pregled](https://code.claude.com/docs/en/overview), [Claude, začetek s Coworkom](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork), [Claude, Cowork je zdaj Claude](https://claude.com/blog/cowork-is-now-claude), [Claude Code v paketih Pro in Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan), [Claude Code v paketih Team in Enterprise](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan), [Claude Code, načini dovoljenj](https://code.claude.com/docs/en/permission-modes)

## Zakaj Code tudi za nerazvijalce

To je naše mnenje, ne Anthropicovo. Claude Code se splača vsakemu, ki z AI dela več kot nekajkrat na teden, iz petih razlogov.

Prvič, dela z vašimi datotekami, ne s kopijami. Mapa s ponudbami, tabela strank ali zapisniki sestankov so na disku, Claude jih prebere, primerja in zapiše rezultat nazaj. Ni nalaganja, prenašanja in ročnega kopiranja.

Drugič, kontekst je v datoteki. Pravila, ki jih v klepetu vsakič znova razlagate, v Claude Code zapišete v `CLAUDE.md` in veljajo v vsaki seji.

Tretjič, ponavljajoče naloge postanejo skilli. Postopek, ki ste ga enkrat dobro opisali, shranite kot skill in ga naslednjič pokličete z enim ukazom.

Četrtič, naloge lahko tečejo same. Rutina v namizni aplikaciji na primer vsako jutro pripravi povzetek ali vsak petek poročilo.

Petič, vidite, kaj je naredil. Vse spremembe datotek so vidne, v načinu Manual pa Claude Code pred vsako spremembo vpraša za dovoljenje. Pri delu z Gitom ostane celotna zgodovina.

Več o tem v naslednjih delih priročnika: [kontekst na GitHubu](/vodniki/kontekst-podjetja-na-githubu/), [skilli](/vodniki/claude-skills/) in [rutine](/vodniki/rutine-claude/), pa tudi [subagenti](/vodniki/subagenti/) in [hooki](/vodniki/hooki-claude-code/).

## Kdaj je klepet dovolj

Za hitro vprašanje, prevod, povzetek enega dokumenta ali prvi osnutek maila je klepet hitrejši. Klepet je tudi prava izbira, ko delate z mobilnega telefona ali kadar naloga ne zahteva dostopa do datotek.

Pri Claude Code je treba paziti na dovoljenja. Ker lahko ureja datoteke in poganja ukaze, začnite v mapi, kjer ni ničesar, česar ne bi mogli obnoviti. Privzeti način Claude Code (auto) dela samostojno z varnostnimi preverjanji v ozadju; če želite vsako spremembo odobriti sami, preklopite na način Manual in dovoljenj ne odobravajte na slepo.

## Kako začeti brez terminala

Najlažja pot je namizna aplikacija Claude za Mac ali Windows, ki ima zavihek Code. Terminala ne potrebujete. Izberete mapo, v kateri naj Claude dela, in mu v navadnem jeziku opišete nalogo, na primer: "V tej mapi so ponudbe iz leta 2026. Naredi tabelo z datumom, stranko, zneskom in statusom vsake ponudbe in jo shrani kot Excel."

Za prvo sejo si izberite nalogo, ki bi vam ročno vzela pol ure in jo zlahka preverite. Ko vidite, kako Claude dela, preidite na zahtevnejše naloge.
