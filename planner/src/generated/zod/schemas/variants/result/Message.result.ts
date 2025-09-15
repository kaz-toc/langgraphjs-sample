import { z } from 'zod';

// prettier-ignore
export const MessageResultSchema = z.object({
    id: z.number().int(),
    content: z.string(),
    role: z.string(),
    userId: z.number().int().nullable(),
    user: z.unknown().nullable(),
    sessionId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type MessageResultType = z.infer<typeof MessageResultSchema>;
