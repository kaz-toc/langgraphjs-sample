import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const messagescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MessageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  content: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  sessionId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MessageScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = messagescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput>;
export const MessageScalarWhereWithAggregatesInputObjectZodSchema = messagescalarwherewithaggregatesinputSchema;
