import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { MessageSelectObjectSchema } from './objects/MessageSelect.schema';
import { MessageIncludeObjectSchema } from './objects/MessageInclude.schema';
import { MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';

export const MessageFindUniqueSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MessageFindUniqueArgs>;

export const MessageFindUniqueZodSchema = z.object({ select: MessageSelectObjectSchema.optional(), include: MessageIncludeObjectSchema.optional(), where: MessageWhereUniqueInputObjectSchema }).strict();