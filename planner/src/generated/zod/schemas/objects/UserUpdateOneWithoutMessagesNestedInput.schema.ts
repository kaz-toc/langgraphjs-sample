import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateWithoutMessagesInputObjectSchema } from './UserCreateWithoutMessagesInput.schema';
import { UserUncheckedCreateWithoutMessagesInputObjectSchema } from './UserUncheckedCreateWithoutMessagesInput.schema';
import { UserCreateOrConnectWithoutMessagesInputObjectSchema } from './UserCreateOrConnectWithoutMessagesInput.schema';
import { UserUpsertWithoutMessagesInputObjectSchema } from './UserUpsertWithoutMessagesInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMessagesInput.schema';
import { UserUpdateWithoutMessagesInputObjectSchema } from './UserUpdateWithoutMessagesInput.schema';
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema } from './UserUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMessagesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema), z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutMessagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutMessagesNestedInput>;
export const UserUpdateOneWithoutMessagesNestedInputObjectZodSchema = makeSchema();
