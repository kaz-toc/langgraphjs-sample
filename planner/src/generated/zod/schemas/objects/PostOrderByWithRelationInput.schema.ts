import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  published: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  author: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PostOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PostOrderByWithRelationInput>;
export const PostOrderByWithRelationInputObjectZodSchema = makeSchema();
