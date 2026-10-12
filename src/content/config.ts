import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    readTime: z.string().default('6 min read'),
    publishDate: z.string().default('October 12, 2026'),
    author: z.string().default('Eugen FnF Master Coach'),
    authorRole: z.string().default('Senior Performance Specialist'),
    imageUrl: z.string().default('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};
