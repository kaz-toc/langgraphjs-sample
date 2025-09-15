import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithoutUserInputObjectSchema } from './MessageUpdateWithoutUserInput.schema';
import { MessageUncheckedUpdateWithoutUserInputObjectSchema } from './MessageUncheckedUpdateWithoutUserInput.schema';
import { MessageCreateWithoutUserInputObjectSchema } from './MessageCreateWithoutUserInput.schema';
import { MessageUncheckedCreateWithoutUserInputObjectSchema } from './MessageUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MessageUpdateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MessageCreateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput>;
export const MessageUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
