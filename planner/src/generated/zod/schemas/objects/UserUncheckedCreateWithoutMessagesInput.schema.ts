import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput>;
export const UserUncheckedCreateWithoutMessagesInputObjectZodSchema = makeSchema();
