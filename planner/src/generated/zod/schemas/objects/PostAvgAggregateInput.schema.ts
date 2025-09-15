import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  authorId: z.literal(true).optional()
}).strict();
export const PostAvgAggregateInputObjectSchema: z.ZodType<Prisma.PostAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PostAvgAggregateInputType>;
export const PostAvgAggregateInputObjectZodSchema = makeSchema();
