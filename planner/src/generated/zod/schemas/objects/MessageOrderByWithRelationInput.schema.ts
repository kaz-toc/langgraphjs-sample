import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MessageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageOrderByWithRelationInput>;
export const MessageOrderByWithRelationInputObjectZodSchema = makeSchema();
