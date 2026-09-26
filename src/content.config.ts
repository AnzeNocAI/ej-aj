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

export const collections = { novice, slovar };
