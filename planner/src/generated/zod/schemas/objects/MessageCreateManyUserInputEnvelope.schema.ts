import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageCreateManyUserInputObjectSchema } from './MessageCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MessageCreateManyUserInputObjectSchema), z.lazy(() => MessageCreateManyUserInputObjectSchema).array()])
}).strict();
export const MessageCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MessageCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyUserInputEnvelope>;
export const MessageCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
