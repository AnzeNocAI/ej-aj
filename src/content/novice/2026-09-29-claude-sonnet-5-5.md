---
title: 'Anthropic izdal Claude Sonnet 5.5: kaj je novega in kdaj ga izbrati namesto Opus 5.5'
description: 'Anthropic je 28. septembra izdal model Claude Sonnet 5.5. Kaj je novega, koliko stane, kje je na voljo in za katere naloge je primernejši od dražjega Opus 5.5.'
date: 2026-09-29
type: clanek
---

Anthropic je 28. septembra izdal nov model Claude Sonnet 5.5. Je drugi model iz družine 5.5, prvi je bil Opus 5.5. Sonnet je cenejši in hitrejši od Opusa in je namenjen vsakdanjemu delu.

> **Na kratko:** pri izdelavi dokumentov, predstavitev in preglednic je Sonnet 5.5 po Anthropicovih navedbah skoraj enako dober kot Opus 5.5, za razvijalce pa stane pol manj. Za zahtevne naloge, pri katerih mora model sam presojati, je še vedno boljši Opus 5.5.

## Kaj je novega

Anthropic navaja, da Sonnet 5.5 odgovore piše več kot 30 % hitreje kot prejšnji Sonnet 5. Za isto nalogo porabi manj tokenov, zato je naloga do 30 % cenejša. Token je košček besedila, pogosto del besede, in po številu tokenov se obračunava raba modela.

Cena na token je ostala enaka kot pri Sonnet 5: 2 USD za milijon tokenov, ki jih modelu pošljete, in 10 USD za milijon tokenov, ki jih model napiše. Opus 5.5 stane 4 oziroma 20 USD. Ti ceni veljata za razvijalce, ki model uporabljajo prek API-ja, torej povezave, prek katere lastni programi uporabljajo model. Pri mesečni naročnini na Claude se ne plačuje po tokenih.

Oba modela lahko naenkrat upoštevata do milijon tokenov besedila, kar je po Anthropicovih podatkih približno 555.000 angleških besed. Temu se reče kontekstno okno.

Viri: [Anthropic, Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5), [Claude, pregled modelov](https://platform.claude.com/docs/en/about-claude/models/overview)

## Pri čem je dober

Anthropic piše, da je Sonnet 5.5 najboljši pri vsakdanjih nalogah z jasnim navodilom, pri popravljanju napak v programski kodi in pri izdelavi dokumentov, predstavitev in preglednic. Na testu GDPval-AA, ki meri, kako dobro model opravi pisarniške in strokovne naloge, je skoraj izenačen z Opus 5.5. Opus 5.5 je po navedbah podjetja jasno boljši pri zapletenih nalogah, kjer pot do rezultata ni vnaprej jasna in mora model dalj časa sam presojati.

## Kje je na voljo

V klepetu ga lahko uporablja vsak na Claude.ai, na spletu ter v aplikacijah za iOS in Android. Anthropic ne navaja, kateri paketi naročnine ga dobijo. Razvijalci ga lahko uporabljajo prek Anthropicovega API-ja ter pri Amazon Web Services, Google Cloud in Microsoft Azure. Najmanjši model iz družine, Haiku 5.5, naj bi prišel v prihodnjih tednih.

Viri: [Anthropic, Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5), [Anthropic, Claude Sonnet](https://www.anthropic.com/claude/sonnet)

## Kdaj Sonnet in kdaj Opus

Preprosto pravilo za ekipo: Sonnet za rutino, Opus za presojo.

Rutina so naloge z jasnim navodilom in jasnim rezultatom. Na primer povzetek dolgega e-sporočila, tabela iz priloženega dokumenta, osnutek odgovora stranki po vzorcu ali predstavitev iz zapiskov.

Presoja so naloge, pri katerih mora model sam ugotoviti, kaj je pomembno. Na primer primerjava več pogodb ali analiza, pri kateri vnaprej ne veste, kaj iščete.

Pravilo preverite na svojem delu. Isto rutinsko nalogo naredite z obema modeloma in primerjajte, koliko ste morali popraviti. Če je razlika majhna, izberite Sonnet, ker je hitrejši.

**Kaj to pomeni za vas:** če imate avtomatizacijo, ki model prek API-ja uporabi stokrat na dan, vas Sonnet stane pol manj kot Opus. Preizkusite, ali Sonnet 5.5 nalogo opravi dovolj dobro. Cene vseh modelov so na strani [Modeli in cene](/modeli/).
