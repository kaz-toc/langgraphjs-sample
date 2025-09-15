import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageWhereInputObjectSchema } from './MessageWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MessageWhereInputObjectSchema).optional(),
  some: z.lazy(() => MessageWhereInputObjectSchema).optional(),
  none: z.lazy(() => MessageWhereInputObjectSchema).optional()
}).strict();
export const MessageListRelationFilterObjectSchema: z.ZodType<Prisma.MessageListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MessageListRelationFilter>;
export const MessageListRelationFilterObjectZodSchema = makeSchema();
