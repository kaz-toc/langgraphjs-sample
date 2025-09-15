import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const messagescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MessageScalarWhereInputObjectSchema), z.lazy(() => MessageScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MessageScalarWhereInputObjectSchema), z.lazy(() => MessageScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  sessionId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MessageScalarWhereInputObjectSchema: z.ZodType<Prisma.MessageScalarWhereInput> = messagescalarwhereinputSchema as unknown as z.ZodType<Prisma.MessageScalarWhereInput>;
export const MessageScalarWhereInputObjectZodSchema = messagescalarwhereinputSchema;
