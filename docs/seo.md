# SEO: stanje in načrt

Analiza 30. septembra 2026. Stran je stara pet dni, zato Search Console še nima uporabnih
podatkov; iskalni nizi spodaj so iz predlogov iskanja Google in Bing za Slovenijo (brez obsega
iskanj). Po 14. oktobru preveri v Search Console, kateri nizi dejansko prinašajo prikaze.

## Tehnično (urejeno v PR tehnicno/seo-osnove)

- `<lastmod>` v sitemapu za vse članke (iz `updated`, sicer `date`).
- Novo neobvezno polje `updated` v front matterju: `dateModified` v JSON-LD, `article:modified_time`
  in "Posodobljeno ..." ob datumu. Nastavi ga, ko se v vodniku spremenijo dejstva, cene ali
  razdelki, ne ob popravku tipkarske napake.
- `BreadcrumbList` na vseh člankih (slovar ga je že imel).
- Blok "Preberite še" pod vsakim člankom: trije članki z največ skupnimi izrazi iz slovarja.
- Strani slovarja: daljši meta opis (cele povedi do 158 znakov) in seznam "Kje o tem pišemo"
  (do 6 člankov, ki izraz omenjajo). Strani slovarja so bile zelo kratke (en odstavek).
- Dolgi naslovi (nad 52 znakov) v `<title>` nimajo več pripone " | ej-aj", da Google pokaže
  besede, ki opisujejo stran.
- IndexNow (`scripts/indexnow.mjs`, workflow `IndexNow`): po vsakem pushu na `main` Bingu
  sporoči spremenjene strani. Bing poganja tudi iskanje v ChatGPT in Copilot. Ročni zagon v
  zavihku Actions pošlje vse strani iz sitemapa (enkrat po mergeu).
- Naslovi in opisi naslovnice, /novice/, /vodniki/ in /slovar/ s ključnimi besedami.

## Nastavitve, ki jih mora narediti Anže (Cloudflare)

- **Always Use HTTPS** (SSL/TLS, Edge Certificates): `http://ej-aj.si/` 30. 9. vrne 200 namesto
  preusmeritve na https. Google zato vidi dve različici vsake strani.
- Po želji HSTS na isti strani (šele ko HTTPS preusmeritev deluje nekaj dni).

## Kaj ljudje iščejo (predlogi Google in Bing, Slovenija)

- Brezplačno: "chatgpt slovenija brezplačno", "umetna inteligenca brezplačno", "umetna
  inteligenca zastonj", "brezplačna ai orodja", "chatgpt brez prijave", "chat gpt v slovenščini
  free".
- Slovenščina: "chatgpt v slovenščini", "umetna inteligenca v slovenščini", "copilot
  slovenščina", "gemini v slovenščini", "umetna inteligenca aplikacija v slovenščini".
- Slike in video: "umetna inteligenca za slike", "ai za ustvarjanje slik", "ai za slike free",
  "ai video generator", "umetna inteligenca video iz slike".
- Cene: "chatgpt cena", "chatgpt plus cena", "chatgpt plus vs go", "claude pricing".
- Šola: "umetna inteligenca v šoli", "copilot arnes", "copilot za učitelje", "gemini za
  študente", "ai detektor slovenščina", "ai detector slovenija".
- Razlage: "umetna inteligenca kaj je to", "kako deluje", "chatgpt kaj je to", "claude kaj je
  to", "ai agent", "notebooklm".
- Področja: "ai za pravnike", "umetna inteligenca v računovodstvu" (oba že pokrita), "v javni
  upravi", "v zdravstvu", "v izobraževanju", "copilot za računovodje".
- Drugo: "ai prevajalnik", "ai prezentacija", "ai tečaj", "elements of ai tečaj".

## Predlogi vsebin (po pričakovani vrednosti)

1. **Brezplačna AI orodja: kaj dobite zastonj pri ChatGPT, Claude, Gemini in Copilot** (omejitve
   brezplačnih paketov, prijava, slovenščina, kaj se zgodi s podatki). Največ iskanj od vseh tem.
2. **ChatGPT v slovenščini: kako začeti** (prijava, nastavitev jezika, glas, aplikacija, kdaj se
   splača Go ali Plus). Iskalci tega niza so začetniki, ki jih druge strani ne nagovarjajo.
3. **Microsoft Copilot v slovenščini: brezplačni Copilot, Copilot Chat in Microsoft 365 Copilot**
   (razlike, kaj imate že v službenem računu). "copilot slovenščina" je drugi predlog za "copilot".
4. **AI za ustvarjanje slik: orodja, cene, avtorske pravice in označevanje po AI Act**. Veliko
   iskanj; povezava na vodnik AI Act (člen 50).
5. **Koliko stane ChatGPT (Free, Go, Plus, Pro, Business) v evrih**, enako za Claude in Gemini.
   Lahko samodejno iz `narocnine.yaml` kot strani `/cene/chatgpt/` ... (zdaj `/cene/` preusmerja
   na `/modeli/`), mesečna rutina jih osvežuje. Funkcija, ne samo članek.
6. **AI v šoli: kaj lahko učitelji in dijaki uporabljajo** (Arnes, pravila, preverjanje). Preveri
   pri Arnesu in MVI, kaj dejansko ponujajo; brez tega ne pisati.
7. **Ali zaznavalniki AI besedila delujejo (tudi za slovenščino)**. Iščejo učitelji, študenti in
   delodajalci; odgovor je podprt z raziskavami.
8. **Kaj je umetna inteligenca in kako deluje: razlaga za začetnike**. Temeljna stran, na katero
   kažejo vsi vodniki; slovar ima le kratko geslo.
9. **NotebookLM: kaj je in kako ga uporabiti za dokumente podjetja**.
10. **AI prevajalniki za slovenščino: DeepL, Google Translate, ChatGPT, Claude** (povezava na
    vodnik o slovenščini).
11. **AI tečaji in usposabljanja v Sloveniji (tudi brezplačni)**: dobro se poveže z vodnikom o AI
    pismenosti, na tak seznam radi kažejo drugi (povratne povezave).
12. Področni vodniki po vzoru računovodstva in prava: javna uprava, zdravstvo, šole.

Pri 1 do 3 in 5 so naslovi lahko skoraj enaki iskalnemu nizu; to ni click bait, ker natančno
povedo, kaj članek je.

## Zunaj strani (največji vzvod za novo domeno)

Nova domena brez povratnih povezav bo mesece rangirala nizko ne glede na vsebino. Možnosti, ki
ne kršijo pravil (brez LinkedIna in imena):

- Predloga pravil rabe AI (Word) in stran `/statistika/` sta vsebini, na katere drugi radi
  povežejo: ponudi ju zbornicam (GZS, OZS), stičiščem (DIH Slovenija), knjižnicam, šolam.
- Vpis v slovenske imenike in sezname virov o AI (KCUI, SLAIS, univerzitetne strani z viri).
- Odgovori na forumih in v skupinah (Reddit r/Slovenia, slo-tech), kjer je povezava na vodnik
  res odgovor na vprašanje.
- Newsletter: vsak poslan mail je vir ponovnih obiskov.
