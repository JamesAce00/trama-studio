import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    rubrica: z.enum([
      'MATERIA PRIMA',
      'DENTRO IL CAPO',
      'DIETRO L\'ETICHETTA',
      'MITI DA SFATARE',
      'GLOSSARIO TESSILE',
      'SCELTE CONSAPEVOLI',
      'TRAME DI STORIA',
      'DALLA FILIERA',
    ]),
    lead: z.string(),
    autore: z.string().optional(),
  }),
});

const glossario = defineCollection({
  type: 'content',
  schema: z.object({
    termine: z.string(),
    lettera: z.string(),
    definizione: z.string(),
  }),
});

export const collections = { blog, glossario };
