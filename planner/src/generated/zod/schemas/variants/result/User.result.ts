import { z } from 'zod';

// prettier-ignore
export const UserResultSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().nullable(),
    country: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    messages: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
