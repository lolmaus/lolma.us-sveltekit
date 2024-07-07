import { z } from 'zod';

export const EntitySchema = z.object({
  attributes: z.unknown(),
  html: z.string().optional(),
  slug: z.string(),
  lang: z.string(),
  date: z.string().optional(),
  fileName: z.string(),
  urlName: z.string(),
});

export type Entity = z.infer<typeof EntitySchema>;

export const BlogPostInIndexSchema = EntitySchema.extend({
  attributes: z.object({
    title: z.string(),
    updatedAt: z.string().date().optional(),
    tags: z.array(z.string()).optional(),
    og: z.object({
      image: z.string().optional(),
    }).optional(),
    teaser: z.string().optional(),
  })
});

export type BlogPostInIndex = z.infer<typeof BlogPostInIndexSchema>;

export const BlogPostSchema = BlogPostInIndexSchema.extend({
  html: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const BlogPostsIndexSchema = z.array(BlogPostInIndexSchema);
