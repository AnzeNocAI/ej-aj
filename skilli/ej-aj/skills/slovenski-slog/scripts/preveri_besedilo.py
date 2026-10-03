#!/usr/bin/env python3
"""Preveri slovensko besedilo: pomišljaji, zapis številk, odstotki, valute, besede, ki zvenijo kot AI.

Uporaba: python3 preveri_besedilo.py <datoteka> [<datoteka> ...]

Izpiše vrstico, najdbo in predlog. Izhodna koda je 1, če je karkoli najdeno, sicer 0.
Bloki kode (```) in povezave (URL-ji) se preskočijo, ker v njih zapis številk ni slovenski.
"""
import re
import sys
from pathlib import Path

CHECKS = [
    (re.compile(r"[—–]"), "pomišljaj; uporabi vejico, dvopičje, oklepaj ali novo poved"),
    # 1,500 ali 12,000,000: angleški zapis tisočic. Tri decimalke (0,125) so redke, zato jih izpustimo.
    (re.compile(r"(?<![\d,.])[1-9]\d{0,2}(,\d{3})+(?![\d,])"), "angleški zapis tisočic; slovensko 1.500"),
    # 0.10 EUR, 3.5 %, 2.99 €: decimalna pika pred enoto.
    (re.compile(r"\b\d+\.\d{1,2}\s?(%|€|EUR|USD|\$|odstot)"), "decimalna pika; slovensko 2,5 % ali 0,10 EUR"),
    (re.compile(r"(?<![\d.])\d+(,\d+)?%"), "manjka presledek pred %; slovensko 40 %"),
    (re.compile(r"\$\s?\d"), "znak $ pred številko; slovensko 20 USD"),
    (re.compile(r"\d+(,\d+)?(€|EUR\b|USD\b)"), "manjka presledek pred valuto; slovensko 23 €"),
    (re.compile(r"\b\d{1,2}\.\d{1,2}\.\d{4}\b"), "datum brez presledkov; slovensko 3. 10. 2026"),
]

# Besede in fraze, ki jih AI rad pretirano uporablja. Iščejo se na začetku besede (\b), da
# "ključn" ne zadene "vključno".
AI_WORDS = [
    "ključen", "ključn", "bistven", "prelomen", "prelomn", "revolucionar", "izjemen", "izjemn",
    "celovit", "temeljit", "pomemben mejnik", "nov standard", "spremeni pravila igre", "igra spremeni pravila",
    "v današnjem hitro", "ni skrivnost, da", "pomembno je poudariti", "velja omeniti",
    "strokovnjaki opozarjajo", "po mnenju analitikov", "ne gre le za", "ne gre samo za", "več kot le",
    "s čimer", "kar poudarja",
]
OPENERS = ["Poleg tega", "Prav tako", "Nadalje", "Hkrati pa", "Skratka", "Za konec"]
SLOGAN = re.compile(r"\bbrez [^.,;]{1,40}, [zs]\b", re.I)


def strip_code(text):
    """Bloke kode zamenja s praznimi vrsticami, da številke vrstic ostanejo pravilne."""
    return re.sub(r"```.*?```", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)


def check(path):
    try:
        text = Path(path).read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as e:
        print(f"{path}: ne morem prebrati datoteke ({e}).")
        return 1
    found = 0
    for no, line in enumerate(strip_code(text).splitlines(), 1):
        clean = re.sub(r"https?://\S+|`[^`]*`", "", line)
        for rx, msg in CHECKS:
            for m in rx.finditer(clean):
                print(f"{path}:{no}: \"{m.group(0)}\" {msg}")
                found += 1
        low = clean.lower()
        for w in AI_WORDS:
            if re.search(rf"\b{re.escape(w)}", low):
                print(f"{path}:{no}: \"{w}\" zveni kot AI; ali jo lahko zamenjaš s konkretnim podatkom ali izbrišeš?")
                found += 1
        for o in OPENERS:
            if re.search(rf"(^[\s>*-]*\**|[.!?]\s+\**){o}\b", clean):
                print(f"{path}:{no}: poved se začne s \"{o}\"; praviloma je boljša brez tega")
                found += 1
        if SLOGAN.search(clean):
            print(f"{path}:{no}: slogan \"Brez X, z Y\"")
            found += 1
    return found


def main():
    if len(sys.argv) < 2:
        print("Uporaba: python3 preveri_besedilo.py <datoteka> [<datoteka> ...]")
        sys.exit(2)
    total = sum(check(p) for p in sys.argv[1:])
    print(f"\nNajdb: {total}." if total else "Ni najdb.")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
