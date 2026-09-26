export const SITE = {
  name: 'ej-aj',
  domain: 'ej-aj.si',
  tagline: 'Umetna inteligenca po slovensko',
  description:
    'Tedenski pregled AI novic, primerjava modelov in praktični vodniki za slovenska podjetja.',
  author: 'Anže Noč',
};

export const TYPE_LABEL: Record<string, string> = {
  'tedenski-pregled': 'Tedenski pregled',
  clanek: 'Članek',
  vodnik: 'Vodnik',
};

export function formatDate(date: Date) {
  return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}
