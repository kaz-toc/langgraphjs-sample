import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const MessageSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MessageSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageSumOrderByAggregateInput>;
export const MessageSumOrderByAggregateInputObjectZodSchema = makeSchema();
