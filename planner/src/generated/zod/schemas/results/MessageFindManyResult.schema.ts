import { z } from 'zod';
export const MessageFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  content: z.string(),
  role: z.string(),
  userId: z.number().int().optional(),
  user: z.unknown().optional(),
  sessionId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});