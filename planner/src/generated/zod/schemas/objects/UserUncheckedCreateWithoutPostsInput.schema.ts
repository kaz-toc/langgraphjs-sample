import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MessageUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput>;
export const UserUncheckedCreateWithoutPostsInputObjectZodSchema = makeSchema();
