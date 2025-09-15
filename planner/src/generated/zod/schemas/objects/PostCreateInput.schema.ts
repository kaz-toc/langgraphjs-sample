import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutPostsInputObjectSchema } from './UserCreateNestedOneWithoutPostsInput.schema'

const makeSchema = () => z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputObjectSchema)
}).strict();
export const PostCreateInputObjectSchema: z.ZodType<Prisma.PostCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateInput>;
export const PostCreateInputObjectZodSchema = makeSchema();
