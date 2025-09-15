import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPostsInputObjectSchema } from './UserCreateWithoutPostsInput.schema';
import { UserUncheckedCreateWithoutPostsInputObjectSchema } from './UserUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPostsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPostsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput>;
export const UserCreateOrConnectWithoutPostsInputObjectZodSchema = makeSchema();
