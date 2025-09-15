import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutUserInputObjectSchema } from './MessageUpdateWithoutUserInput.schema';
import { MessageUncheckedUpdateWithoutUserInputObjectSchema } from './MessageUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MessageUpdateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput>;
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
