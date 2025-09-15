import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  content: z.literal(true).optional(),
  published: z.literal(true).optional(),
  authorId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PostMinAggregateInputObjectSchema: z.ZodType<Prisma.PostMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PostMinAggregateInputType>;
export const PostMinAggregateInputObjectZodSchema = makeSchema();
