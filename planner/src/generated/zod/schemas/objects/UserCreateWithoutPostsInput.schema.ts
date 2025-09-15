import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { MessageCreateNestedManyWithoutUserInputObjectSchema } from './MessageCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutPostsInput>;
export const UserCreateWithoutPostsInputObjectZodSchema = makeSchema();
