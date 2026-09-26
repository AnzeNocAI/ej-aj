// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants and
// answer engines. Generated from the content collections, so it never goes stale.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts } from '../lib';
import { SITE } from '../site';

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).toString();
  const posts = await getPosts();
  const terms = (await getCollection('slovar')).sort((a, b) =>
    a.data.izraz.localeCompare(b.data.izraz, 'sl'),
  );

  const lines = [
    `# ${SITE.name} (${SITE.domain})`,
    '',
    `> ${SITE.tagline}. ${SITE.description} Vsebina je v slovenščini, vsaka novica ima vir.`,
    '',
    '## Glavne strani',
    '',
    `- [Primerjava AI modelov](${abs('/modeli/')}): cene API, kontekstno okno in priporočila za Claude, GPT, Gemini, Mistral, Llama, DeepSeek in slovenski GaMS, z viri in datumom preverjanja.`,
    `- [AI slovar](${abs('/slovar/')}): ${terms.length} izrazov umetne inteligence, razloženih po domače.`,
    `- [Novice](${abs('/novice/')}): tedenski pregledi AI novic z vplivom na slovenska podjetja.`,
    `- [O projektu](${abs('/o-projektu/')}): kdo piše in kako nastaja vsebina.`,
    '',
    '## Novice',
    '',
    ...posts.map((p) => `- [${p.data.title}](${abs(`/novice/${p.id}/`)}): ${p.data.description}`),
    '',
    '## AI slovar',
    '',
    ...terms.map((t) => `- [${t.data.izraz}](${abs(`/slovar/${t.id}/`)})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
