import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageSelectObjectSchema } from './MessageSelect.schema';
import { MessageIncludeObjectSchema } from './MessageInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MessageSelectObjectSchema).optional(),
  include: z.lazy(() => MessageIncludeObjectSchema).optional()
}).strict();
export const MessageArgsObjectSchema = makeSchema();
export const MessageArgsObjectZodSchema = makeSchema();
