// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants and
// answer engines. Generated from the content collections, so it never goes stale.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts, postPath } from '../lib';
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
    `- [Cene AI orodij in primerjava modelov](${abs('/modeli/')}): naročnine za ChatGPT, Claude, Gemini, Microsoft Copilot in druga orodja (posamezniki in podjetja) ter cene API, kontekstno okno in priporočila za Claude, GPT, Gemini, Mistral, Llama, DeepSeek in slovenski GaMS, z viri in datumom preverjanja.`,
    `- [AI v Sloveniji v številkah](${abs('/statistika/')}): delež podjetij in prebivalcev, ki uporabljajo AI, primerjava z državami EU in delež klepetalnikov (Eurostat, SURS, Microsoft, StatCounter).`,
    `- [AI slovar](${abs('/slovar/')}): ${terms.length} izrazov umetne inteligence, razloženih po domače.`,
    `- [Novice](${abs('/novice/')}): tedenski pregledi AI novic z vplivom na slovenska podjetja.`,
    `- [O projektu](${abs('/o-projektu/')}): kdo piše in kako nastaja vsebina.`,
    '',
    '## Novice',
    '',
    ...posts.map((p) => `- [${p.data.title}](${abs(postPath(p))}): ${p.data.description}`),
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
