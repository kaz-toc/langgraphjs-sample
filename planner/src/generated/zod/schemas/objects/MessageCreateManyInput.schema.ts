import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  content: z.string(),
  role: z.string(),
  userId: z.number().int().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const MessageCreateManyInputObjectSchema: z.ZodType<Prisma.MessageCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyInput>;
export const MessageCreateManyInputObjectZodSchema = makeSchema();
