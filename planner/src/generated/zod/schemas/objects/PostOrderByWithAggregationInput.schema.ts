import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PostCountOrderByAggregateInputObjectSchema } from './PostCountOrderByAggregateInput.schema';
import { PostAvgOrderByAggregateInputObjectSchema } from './PostAvgOrderByAggregateInput.schema';
import { PostMaxOrderByAggregateInputObjectSchema } from './PostMaxOrderByAggregateInput.schema';
import { PostMinOrderByAggregateInputObjectSchema } from './PostMinOrderByAggregateInput.schema';
import { PostSumOrderByAggregateInputObjectSchema } from './PostSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  published: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PostOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PostOrderByWithAggregationInput>;
export const PostOrderByWithAggregationInputObjectZodSchema = makeSchema();
