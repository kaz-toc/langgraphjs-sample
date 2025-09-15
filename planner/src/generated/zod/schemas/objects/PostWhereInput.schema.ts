import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const postwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PostWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  published: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  authorId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  author: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const PostWhereInputObjectSchema: z.ZodType<Prisma.PostWhereInput> = postwhereinputSchema as unknown as z.ZodType<Prisma.PostWhereInput>;
export const PostWhereInputObjectZodSchema = postwhereinputSchema;
