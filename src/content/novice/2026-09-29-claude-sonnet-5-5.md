---
title: 'Claude Sonnet 5.5: hitrejši in cenejši model za vsakdanje delo'
description: 'Anthropic je 28. septembra izdal Claude Sonnet 5.5. Je hitrejši in na nalogo cenejši od Sonnet 5, pri zahtevnem odprtem delu pa ostaja močnejši Opus 5.5.'
date: 2026-09-29
type: clanek
---

Anthropic je 28. septembra izdal Claude Sonnet 5.5, drugi model družine 5.5 (prvi je bil Opus 5.5). Sonnet je cenejši in hitrejši od Opusa, namenjen delu, kjer štejeta hitrost in cena.

> **Na kratko:** pri pisarniškem delu (dokumenti, predstavitve, preglednice) je Sonnet 5.5 po Anthropicovih navedbah skoraj enako dober kot Opus 5.5, stane pa v API-ju pol manj. Opus 5.5 ostaja boljši za zahtevne naloge, kjer mora model dolgo presojati sam.

## Kaj je novega

Po navedbah Anthropica Sonnet 5.5 piše odgovore več kot 30 % hitreje kot Sonnet 5. Za isto nalogo porabi manj tokenov, zato je na nalogo do 30 % cenejši, čeprav je cena na token ostala enaka: 2 USD za milijon vhodnih in 10 USD za milijon izhodnih tokenov. Opus 5.5 stane 4 oziroma 20 USD. Oba modela imata kontekstno okno milijon tokenov.

Anthropic piše, da je Sonnet 5.5 najmočnejši pri dobro omejenih vsakdanjih nalogah, popravljanju napak v kodi ter izdelavi dokumentov, predstavitev in preglednic. Na testu GDPval-AA, ki meri pisarniško in strokovno delo, je skoraj izenačen z Opus 5.5. Opus 5.5 je po navedbah podjetja jasno močnejši pri zapletenem odprtem delu, ki zahteva dolgotrajno presojo.

V klepetu ga lahko uporablja vsak na Claude.ai, na spletu ter v aplikacijah za iOS in Android. Za razvijalce je na voljo na vseh Anthropicovih platformah, tudi pri Amazon Web Services, Google Cloud in Microsoft Azure, v API-ju pod oznako `claude-sonnet-5-5`. Najmanjši model družine, Haiku 5.5, bo po napovedi prišel v prihodnjih tednih.

Viri: [Anthropic, Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5), [Anthropic, Claude Sonnet](https://www.anthropic.com/claude/sonnet), [Claude, pregled modelov](https://platform.claude.com/docs/en/about-claude/models/overview)

## Kdaj Sonnet in kdaj Opus

Preprosto pravilo za ekipo: Sonnet za rutino, Opus za presojo. Rutina so naloge z jasnim navodilom in jasnim rezultatom, na primer povzetek dolgega maila, tabela iz priloženega dokumenta, osnutek odgovora stranki po vzorcu ali predstavitev iz zapiskov. Presoja so naloge, kjer mora model sam ugotoviti, kaj je pomembno, na primer primerjava več pogodb, analiza, pri kateri ne veste vnaprej, kaj iščete, ali daljša samostojna naloga v Claude Code.

Pravilo preverite na svojem delu. Isto rutinsko nalogo naredite z obema modeloma in primerjajte, koliko ste morali popraviti. Če je razlika majhna, je Sonnet boljša izbira, ker je hitrejši.

**Kaj to pomeni za vas:** pri avtomatizacijah prek API-ja, ki tečejo stokrat na dan, je razlika med Sonnet in Opus pol računa, zato se splača preizkusiti, ali Sonnet 5.5 nalogo opravi dovolj dobro. Primerjava cen vseh modelov je na strani [Modeli in cene](/modeli/).
