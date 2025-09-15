import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PostCreateManyInputObjectSchema: z.ZodType<Prisma.PostCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateManyInput>;
export const PostCreateManyInputObjectZodSchema = makeSchema();
