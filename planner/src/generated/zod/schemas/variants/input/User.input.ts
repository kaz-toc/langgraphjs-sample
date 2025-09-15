import { z } from 'zod';

// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    zipCode: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    messages: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
