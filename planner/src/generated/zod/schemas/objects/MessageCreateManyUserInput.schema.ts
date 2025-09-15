import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  content: z.string(),
  role: z.string(),
  sessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const MessageCreateManyUserInputObjectSchema: z.ZodType<Prisma.MessageCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyUserInput>;
export const MessageCreateManyUserInputObjectZodSchema = makeSchema();
