import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const postscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PostScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PostScalarWhereInputObjectSchema: z.ZodType<Prisma.PostScalarWhereInput> = postscalarwhereinputSchema as unknown as z.ZodType<Prisma.PostScalarWhereInput>;
export const PostScalarWhereInputObjectZodSchema = postscalarwhereinputSchema;
