import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PostCreateWithoutAuthorInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutAuthorInput>;
export const PostCreateWithoutAuthorInputObjectZodSchema = makeSchema();
