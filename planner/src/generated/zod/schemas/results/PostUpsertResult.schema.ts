import { z } from 'zod';
export const PostUpsertResultSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean(),
  authorId: z.number().int(),
  author: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});