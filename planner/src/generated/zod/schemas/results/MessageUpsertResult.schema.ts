import { z } from 'zod';
export const MessageUpsertResultSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  role: z.string(),
  userId: z.number().int().optional(),
  user: z.unknown().optional(),
  sessionId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});