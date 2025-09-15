import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const MessageSumAggregateInputObjectSchema: z.ZodType<Prisma.MessageSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MessageSumAggregateInputType>;
export const MessageSumAggregateInputObjectZodSchema = makeSchema();
