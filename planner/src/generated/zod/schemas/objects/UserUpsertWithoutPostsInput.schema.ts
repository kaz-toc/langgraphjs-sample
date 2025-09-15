import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserUpdateWithoutPostsInputObjectSchema } from './UserUpdateWithoutPostsInput.schema';
import { UserUncheckedUpdateWithoutPostsInputObjectSchema } from './UserUncheckedUpdateWithoutPostsInput.schema';
import { UserCreateWithoutPostsInputObjectSchema } from './UserCreateWithoutPostsInput.schema';
import { UserUncheckedCreateWithoutPostsInputObjectSchema } from './UserUncheckedCreateWithoutPostsInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPostsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPostsInput>;
export const UserUpsertWithoutPostsInputObjectZodSchema = makeSchema();
