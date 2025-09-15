import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  content: z.literal(true).optional(),
  role: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const MessageMaxAggregateInputObjectSchema: z.ZodType<Prisma.MessageMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MessageMaxAggregateInputType>;
export const MessageMaxAggregateInputObjectZodSchema = makeSchema();
