import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const MessageAvgAggregateInputObjectSchema: z.ZodType<Prisma.MessageAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MessageAvgAggregateInputType>;
export const MessageAvgAggregateInputObjectZodSchema = makeSchema();
