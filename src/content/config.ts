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

export const collections = { blog };
