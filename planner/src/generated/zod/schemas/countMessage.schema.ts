import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { MessageOrderByWithRelationInputObjectSchema } from './objects/MessageOrderByWithRelationInput.schema';
import { MessageWhereInputObjectSchema } from './objects/MessageWhereInput.schema';
import { MessageWhereUniqueInputObjectSchema } from './objects/MessageWhereUniqueInput.schema';
import { MessageCountAggregateInputObjectSchema } from './objects/MessageCountAggregateInput.schema';

export const MessageCountSchema: z.ZodType<Prisma.MessageCountArgs> = z.object({ orderBy: z.union([MessageOrderByWithRelationInputObjectSchema, MessageOrderByWithRelationInputObjectSchema.array()]).optional(), where: MessageWhereInputObjectSchema.optional(), cursor: MessageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MessageCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.MessageCountArgs>;

export const MessageCountZodSchema = z.object({ orderBy: z.union([MessageOrderByWithRelationInputObjectSchema, MessageOrderByWithRelationInputObjectSchema.array()]).optional(), where: MessageWhereInputObjectSchema.optional(), cursor: MessageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MessageCountAggregateInputObjectSchema ]).optional() }).strict();