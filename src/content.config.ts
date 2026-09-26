import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
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

export const collections = { novice };
