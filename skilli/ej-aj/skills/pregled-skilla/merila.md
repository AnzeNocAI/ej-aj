# Merila za pregled skilla

Povzeto po Anthropicovih priporočilih za pisanje skillov
(platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).

## Vsebina

- Ime in opis
- Jedrnatost
- Prava mera svobode
- Struktura in postopno razkrivanje
- Postopek in preverjanje
- Primeri in predloge
- Doslednost in zastarevanje
- Skripte
- Preizkus

## Ime in opis

- Opis pove, kaj skill naredi in kdaj ga uporabiti, v tretji osebi ("Pripravi ...", ne "Pomagam ..." ali "Uporabite me ...").
- V opisu so besede, ki jih bo uporabnik res napisal: imena dokumentov, vrste nalog, sopomenke. Pri skillih za slovenske uporabnike tudi slovenski izrazi.
- Opis ni preširok ("Pomaga pri dokumentih"), sicer se skill sproži ob napačnih nalogah.
- Ime opiše dejavnost, je kratko in dosledno z drugimi skilli uporabnika.

## Jedrnatost

- Vsak odstavek mora upravičiti svoj prostor. Claude že zna splošne stvari (kaj je PDF, kako se piše e-pošta). Skill zapiše le tisto, česar ne ve: pravila podjetja, predloge, izjeme, vrstni red.
- Ponavljanja in uvodi ("V tem skillu bomo ...") so odveč.

## Prava mera svobode

- Kjer je več pravilnih poti (pisanje, analiza), so navodila splošna.
- Kjer mora biti korak vsakič enak (izračun, ime datoteke, oblika izvoza, zaporedje), je natančen ukaz ali skripta.
- Napaka je oboje: toga pravila za ustvarjalno nalogo in ohlapna navodila za občutljiv korak.

## Struktura in postopno razkrivanje

- `SKILL.md` je krajši od 500 vrstic. Podrobnosti so v ločenih datotekah.
- Na vse dodatne datoteke se `SKILL.md` sklicuje neposredno, ne prek druge datoteke.
- Datoteke daljše od 100 vrstic imajo na začetku kazalo.
- Imena datotek povedo vsebino (`cenik.md`, ne `dokument2.md`).

## Postopek in preverjanje

- Zahtevnejše naloge imajo oštevilčene korake in seznam za odkljukanje.
- Pri nalogah, kjer je kakovost pomembna, je zanka: naredi, preveri, popravi, preveri znova.
- Jasno je, kdaj naj Claude vpraša uporabnika namesto da ugiba (manjkajoči podatki).
- Dejanja, ki jih ni mogoče preklicati (pošiljanje, brisanje, plačilo, objava), zahtevajo potrditev uporabnika.

## Primeri in predloge

- Kjer je oblika rezultata pomembna, je predloga ali vsaj en konkreten primer vhoda in izhoda.
- Primeri so konkretni in brez resničnih osebnih podatkov ali podatkov strank.

## Doslednost in zastarevanje

- Za isto stvar je vedno ista beseda (ne enkrat "ponudba", drugič "predračun", tretjič "offer").
- Ni podatkov, ki hitro zastarajo (cene, datumi, imena modelov), ali pa so ločeni in označeni.
- Ni več enakovrednih možnosti tam, kjer zadošča ena privzeta.

## Skripte

- Skripta napake obravnava sama in izpiše jasno sporočilo, ne pusti Claudu, da ugiba.
- Ni nepojasnjenih številk; vsaka nastavitev ima razlog v komentarju.
- Potrebni paketi so našteti v navodilih.
- Iz navodil je jasno, ali naj Claude skripto požene ali jo le prebere.
- Poti uporabljajo poševnico `/`.

## Preizkus

Predlagaj vsaj tri scenarije za preizkus: običajen primer, primer z manjkajočimi podatki in mejni
primer (nenavaden vhod ali naloga, pri kateri se skill ne bi smel sprožiti). Za vsakega zapiši
zahtevo uporabnika in kaj mora biti v rezultatu. Svetuj, naj uporabnik:

1. nalogo najprej da Claudu brez skilla, da vidi, kaj skill sploh doda;
2. skill preizkusi v novi seji, ne v tisti, v kateri ga je pisal;
3. ga preizkusi z vsemi modeli, s katerimi ga bo uporabljal (manjši modeli potrebujejo natančnejša navodila).
