import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutMessagesInput>;
export const UserCreateWithoutMessagesInputObjectZodSchema = makeSchema();
