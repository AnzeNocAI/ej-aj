#!/usr/bin/env python3
"""Preveri formalna pravila skilla (mapa s SKILL.md). Samo standardna knjižnica.

Uporaba: python3 preveri_skill.py <pot-do-mape-skilla>

Izpiše NAPAKA (skill ne bo deloval ali krši pravila formata) in OPOZORILO (slabša kakovost).
Izhodna koda je 1, če je vsaj ena napaka, sicer 0.
"""
import re
import sys
from pathlib import Path

# Omejitve iz Anthropicove specifikacije za SKILL.md.
NAME_MAX = 64
DESCRIPTION_MAX = 1024
RESERVED = ("anthropic", "claude")
# Priporočilo: telo SKILL.md naj bo krajše od 500 vrstic.
BODY_MAX_LINES = 500
# Daljše dodatne datoteke naj imajo kazalo na začetku.
TOC_FROM_LINES = 100
# Pod to dolžino opis praviloma ne pove, kdaj skill uporabiti.
DESCRIPTION_MIN = 80

errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def parse_frontmatter(text):
    """Vrne (slovar polj, telo). Podpira preproste vrstice ključ: vrednost in bloke >- ali |."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    raw, body = text[3:end].strip("\n"), text[end + 4 :]
    fields, key = {}, None
    for line in raw.splitlines():
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if m and not line.startswith(" "):
            key, value = m.group(1), m.group(2).strip()
            fields[key] = "" if value in (">", ">-", "|", "|-") else value.strip("'\"")
        elif key is not None:
            fields[key] = (fields[key] + " " + line.strip()).strip()
    return fields, body


def local_links(text):
    """Relativne poti v markdown povezavah [besedilo](pot.md), ki kažejo na datoteke v skillu.

    Poti v `kodi` ne štejejo: pogosto se nanašajo na projekt uporabnika, ne na skill."""
    found = set(re.findall(r"\]\(([^)#\s]+\.\w+)(?:#[^)]*)?\)", text))
    return {p for p in found if not re.match(r"^[a-z]+:", p) and not p.startswith("/")}


def main():
    if len(sys.argv) != 2:
        print("Uporaba: python3 preveri_skill.py <pot-do-mape-skilla>")
        sys.exit(2)
    root = Path(sys.argv[1]).expanduser()
    skill_md = root / "SKILL.md" if root.is_dir() else root
    if not skill_md.exists():
        print(f"NAPAKA: {skill_md} ne obstaja. Podaj mapo, v kateri je SKILL.md.")
        sys.exit(1)
    root = skill_md.parent
    text = skill_md.read_text(encoding="utf-8")
    fields, body = parse_frontmatter(text)

    if fields is None:
        err("SKILL.md nima glave (front matter) med vrsticama '---'.")
        fields = {}
    name = fields.get("name", "")
    desc = fields.get("description", "")

    if not name:
        err("Manjka polje 'name'.")
    else:
        if len(name) > NAME_MAX:
            err(f"Ime ima {len(name)} znakov, dovoljeno je največ {NAME_MAX}.")
        if not re.fullmatch(r"[a-z0-9-]+", name):
            err(f"Ime '{name}' sme vsebovati le male črke, številke in vezaje (brez šumnikov in presledkov).")
        if any(w in name.lower() for w in RESERVED):
            err(f"Ime '{name}' vsebuje prepovedano besedo ({', '.join(RESERVED)}).")
        if root.name != name:
            warn(f"Ime mape '{root.name}' se razlikuje od imena skilla '{name}'.")

    if not desc:
        err("Manjka polje 'description'.")
    else:
        if len(desc) > DESCRIPTION_MAX:
            err(f"Opis ima {len(desc)} znakov, dovoljeno je največ {DESCRIPTION_MAX}.")
        if len(desc) < DESCRIPTION_MIN:
            warn(f"Opis ima le {len(desc)} znakov. Verjetno ne pove, kdaj skill uporabiti.")
        if re.search(r"<[^>]+>", desc) or re.search(r"<[^>]+>", name):
            err("Ime ali opis vsebuje oznake XML (<...>).")
        if re.search(r"\b(I can|I will|You can|you can)\b|\b(pomagam|uporabite me|lahko vam)\b", desc, re.I):
            warn("Opis naj bo v tretji osebi ('Pripravi ...'), ne v prvi ali drugi.")
        if not re.search(r"(uporabi|use when|\bko\b|\bkadar\b)", desc, re.I):
            warn("Opis ne pove, kdaj skill uporabiti (na primer 'Uporabi, ko ...').")

    lines = body.strip("\n").splitlines()
    if len(lines) > BODY_MAX_LINES:
        warn(f"Telo SKILL.md ima {len(lines)} vrstic. Priporočeno je manj kot {BODY_MAX_LINES}; podrobnosti prestavi v ločene datoteke.")

    for f in sorted({skill_md, *[p for p in root.rglob("*") if p.is_file() and p.suffix in (".md", ".txt")]}):
        t = f.read_text(encoding="utf-8", errors="replace")
        rel = f.relative_to(root)
        if re.search(r"[A-Za-z]:\\|\b(?:[\w.-]+\\)+[\w.-]+\.\w+", t):
            warn(f"{rel}: pot z obratno poševnico (\\). Uporabljaj '/'.")
        if f != skill_md and len(t.splitlines()) > TOC_FROM_LINES and not re.search(r"(?im)^#+\s*(vsebina|kazalo|contents)", t):
            warn(f"{rel}: ima več kot {TOC_FROM_LINES} vrstic, a nima kazala na začetku.")

    # Poti v `kodi`, ki so očitno mišljene znotraj skilla.
    for p in sorted(set(re.findall(r"`((?:scripts|reference|predloge|templates)/[\w./-]+\.\w+)`", text))):
        if not (root / p).exists() and p != "SKILL.md":
            warn(f"SKILL.md omenja `{p}`, ki ga v mapi skilla ni. Preveri, ali je pot pravilna.")

    linked = local_links(text)
    for p in sorted(linked):
        if not (root / p).exists():
            err(f"SKILL.md se sklicuje na '{p}', ki ne obstaja.")
    for p in sorted(linked):
        target = root / p
        if target.exists() and target.suffix == ".md":
            nested = {q for q in local_links(target.read_text(encoding="utf-8")) if q.endswith(".md")}
            nested -= linked
            if nested:
                warn(f"{p} se sklicuje na {', '.join(sorted(nested))}. Sklici naj bodo le eno raven globoko iz SKILL.md.")

    # Ključi z znano obliko so napaka; "geslo: ..." je le opozorilo, ker se pojavi tudi v navodilih.
    secret = re.compile(r"""(sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)""")
    password = re.compile(r"""(?i:password|geslo)\s*[:=]\s*["']?(?=[^\s"']*\d)[A-Za-z0-9!@#$%^&*_.+-]{6,}""")
    for f in root.rglob("*"):
        if f.is_file() and f.stat().st_size < 1_000_000:
            try:
                t = f.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            if secret.search(t):
                err(f"{f.relative_to(root)}: videti je dostopni ključ. Odstrani ga iz skilla.")
            elif password.search(t):
                warn(f"{f.relative_to(root)}: videti je geslo. Preveri in ga odstrani, če je pravo.")

    for e in errors:
        print(f"NAPAKA: {e}")
    for w in warnings:
        print(f"OPOZORILO: {w}")
    print(f"\nPreverjeno: {skill_md}. Napak: {len(errors)}, opozoril: {len(warnings)}.")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
