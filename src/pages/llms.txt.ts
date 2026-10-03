// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants and
// answer engines. Generated from the content collections, so it never goes stale.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts, postPath } from '../lib';
import { SITE } from '../site';
import { PRODUCTS } from '../cene';

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
    ...PRODUCTS.map((p) => `- [Koliko stane ${p.ime}](${abs(`/cene/${p.slug}/`)}): cene vseh paketov za posameznike in podjetja z viri, osveženo vsak mesec.`),
    `- [AI v Sloveniji v številkah](${abs('/statistika/')}): delež podjetij in prebivalcev, ki uporabljajo AI, primerjava z državami EU in delež klepetalnikov (Eurostat, SURS, Microsoft, StatCounter).`,
    `- [Najbolj uporabljeni AI klepetalniki po državah](${abs('/statistika/klepetalniki-po-drzavah/')}): deleži ChatGPT, Gemini, Copilot, Perplexity in Claude v 48 državah Evrope in sveta (StatCounter), osveženo vsak mesec.`,
    `- [AI slovar](${abs('/slovar/')}): ${terms.length} izrazov umetne inteligence, razloženih po domače.`,
    `- [Priročnik: kako dobro uporabljati Claude](${abs('/prirocnik/')}): 10 vodnikov po vrsti o promptih, kontekstu podjetja, Claude Code, skillih, subagentih, hookih, rutinah in lastnih agentih.`,
    `- [Brezplačni skilli v slovenščini](${abs('/skilli/')}): pet skillov za Claude, Claude Code in druga orodja po standardu Agent Skills (pregled skilla, AI v delovni postopek, baza znanja na GitHubu, slovenski slog, pravila rabe AI), z ZIP datotekami in namestitvijo.`,
    `- [Priporočeni videi](${abs('/videi/')}): izbrane epizode o delu z AI s povzetki v slovenščini.`,
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
