import { z } from 'zod';

// prettier-ignore
export const PostInputSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    content: z.string().optional().nullable(),
    published: z.boolean(),
    authorId: z.number().int(),
    author: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PostInputType = z.infer<typeof PostInputSchema>;
