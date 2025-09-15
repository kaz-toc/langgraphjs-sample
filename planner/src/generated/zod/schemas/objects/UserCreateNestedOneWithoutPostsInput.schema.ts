import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateWithoutPostsInputObjectSchema } from './UserCreateWithoutPostsInput.schema';
import { UserUncheckedCreateWithoutPostsInputObjectSchema } from './UserUncheckedCreateWithoutPostsInput.schema';
import { UserCreateOrConnectWithoutPostsInputObjectSchema } from './UserCreateOrConnectWithoutPostsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput>;
export const UserCreateNestedOneWithoutPostsInputObjectZodSchema = makeSchema();
