import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPostsInputObjectSchema } from './UserUpdateWithoutPostsInput.schema';
import { UserUncheckedUpdateWithoutPostsInputObjectSchema } from './UserUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPostsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPostsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput>;
export const UserUpdateToOneWithWhereWithoutPostsInputObjectZodSchema = makeSchema();
