import { z } from 'zod';
export const MessageGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  content: z.string(),
  role: z.string(),
  userId: z.number().int(),
  sessionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    content: z.number(),
    role: z.number(),
    userId: z.number(),
    user: z.number(),
    sessionId: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    userId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    userId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    content: z.string().nullable(),
    role: z.string().nullable(),
    userId: z.number().int().nullable(),
    sessionId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    content: z.string().nullable(),
    role: z.string().nullable(),
    userId: z.number().int().nullable(),
    sessionId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));