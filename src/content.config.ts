import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const novice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/novice' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.coerce.date(),
    type: z.enum(['tedenski-pregled', 'clanek', 'vodnik']),
    // Obdobje, ki ga pokriva tedenski pregled, npr. "17. do 26. september 2026".
    period: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const slovar = defineCollection({
  loader: file('src/data/slovar.yaml'),
  schema: z.object({
    izraz: z.string(),
    angl: z.string().optional(),
    razlaga: z.string(),
    primer: z.string().optional(),
    glej: z.array(z.string()).default([]),
  }),
});

const modeli = defineCollection({
  loader: file('src/data/modeli.yaml'),
  schema: z.object({
    ponudnik: z.string(),
    ime: z.string(),
    api_id: z.string().nullable().default(null),
    izid: z.string().nullable().default(null),
    // USD na milijon tokenov, standardna cena (brez paketnih popustov).
    cena_vhod: z.number().nullable(),
    cena_izhod: z.number().nullable(),
    kontekst: z.number().nullable(),
    odprte_utezi: z.boolean(),
    dostop: z.string(),
    za_kaj: z.string(),
    opomba: z.string().optional(),
    viri: z.array(z.url()).min(1),
    preverjeno: z.coerce.date(),
  }),
});

const narocnine = defineCollection({
  loader: file('src/data/narocnine.yaml'),
  schema: z.object({
    produkt: z.string(),
    paket: z.string(),
    za: z.enum(['posameznik', 'podjetje']),
    // Cena na uporabnika na mesec pri mesečnem plačilu; null = cena po dogovoru ali brezplačno.
    cena_mesec: z.number().nullable(),
    // Cena na uporabnika na mesec pri letnem plačilu.
    cena_letno: z.number().nullable().default(null),
    valuta: z.enum(['EUR', 'USD']),
    ddv: z.string().nullable().default(null),
    min_uporabnikov: z.number().nullable().default(null),
    kaj_dobite: z.string(),
    opomba: z.string().optional(),
    vir: z.url(),
    preverjeno: z.coerce.date(),
  }),
});

export const collections = { novice, slovar, modeli, narocnine };
