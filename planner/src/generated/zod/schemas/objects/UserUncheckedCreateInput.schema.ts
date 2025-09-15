import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MessageUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema)
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
