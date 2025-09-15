import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const MessageAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MessageAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageAvgOrderByAggregateInput>;
export const MessageAvgOrderByAggregateInputObjectZodSchema = makeSchema();
