import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MessageCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCountOrderByAggregateInput>;
export const MessageCountOrderByAggregateInputObjectZodSchema = makeSchema();
