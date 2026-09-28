export const SITE = {
  name: 'ej-aj',
  domain: 'ej-aj.si',
  tagline: 'Umetna inteligenca po slovensko',
  description:
    'Tedenski pregled AI novic, primerjava modelov in praktični vodniki za slovenska podjetja.',
  // Reader-facing name of the person who reviews content. No personal name on the site.
  author: 'urednik',
  // Cloudflare Web Analytics site tag (public, cookieless; not a secret).
  analyticsToken: 'ac8e62820c2148d4907a4bf8752809e2',
};

export const TYPE_LABEL: Record<string, string> = {
  'tedenski-pregled': 'Tedenski pregled',
  clanek: 'Članek',
  vodnik: 'Vodnik',
};

export function formatDate(date: Date) {
  return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}
