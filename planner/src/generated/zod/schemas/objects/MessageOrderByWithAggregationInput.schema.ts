import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MessageCountOrderByAggregateInputObjectSchema } from './MessageCountOrderByAggregateInput.schema';
import { MessageAvgOrderByAggregateInputObjectSchema } from './MessageAvgOrderByAggregateInput.schema';
import { MessageMaxOrderByAggregateInputObjectSchema } from './MessageMaxOrderByAggregateInput.schema';
import { MessageMinOrderByAggregateInputObjectSchema } from './MessageMinOrderByAggregateInput.schema';
import { MessageSumOrderByAggregateInputObjectSchema } from './MessageSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MessageAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MessageSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MessageOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageOrderByWithAggregationInput>;
export const MessageOrderByWithAggregationInputObjectZodSchema = makeSchema();
