import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  role: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sessionId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const MessageSelectObjectSchema: z.ZodType<Prisma.MessageSelect> = makeSchema() as unknown as z.ZodType<Prisma.MessageSelect>;
export const MessageSelectObjectZodSchema = makeSchema();
