import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutMessagesInputObjectSchema } from './UserCreateNestedOneWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  content: z.string(),
  role: z.string(),
  sessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMessagesInputObjectSchema).optional()
}).strict();
export const MessageCreateInputObjectSchema: z.ZodType<Prisma.MessageCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateInput>;
export const MessageCreateInputObjectZodSchema = makeSchema();
