import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional()
}).strict();
export const PostSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostSumOrderByAggregateInput>;
export const PostSumOrderByAggregateInputObjectZodSchema = makeSchema();
