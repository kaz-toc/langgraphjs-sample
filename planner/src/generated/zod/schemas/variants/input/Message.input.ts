import { z } from 'zod';

// prettier-ignore
export const MessageInputSchema = z.object({
    id: z.number().int(),
    content: z.string(),
    role: z.string(),
    userId: z.number().int().optional().nullable(),
    user: z.unknown().optional().nullable(),
    sessionId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type MessageInputType = z.infer<typeof MessageInputSchema>;
