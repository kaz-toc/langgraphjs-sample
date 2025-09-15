import { z } from 'zod';

// prettier-ignore
export const PostResultSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    content: z.string().nullable(),
    published: z.boolean(),
    authorId: z.number().int(),
    author: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PostResultType = z.infer<typeof PostResultSchema>;
