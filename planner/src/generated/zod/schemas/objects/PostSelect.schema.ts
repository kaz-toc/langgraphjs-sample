import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
  authorId: z.boolean().optional(),
  author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const PostSelectObjectSchema: z.ZodType<Prisma.PostSelect> = makeSchema() as unknown as z.ZodType<Prisma.PostSelect>;
export const PostSelectObjectZodSchema = makeSchema();
