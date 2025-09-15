import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PostUncheckedCreateWithoutAuthorInputObjectSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput>;
export const PostUncheckedCreateWithoutAuthorInputObjectZodSchema = makeSchema();
