import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema';
import { MessageCreateNestedManyWithoutUserInputObjectSchema } from './MessageCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutUserInputObjectSchema)
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
