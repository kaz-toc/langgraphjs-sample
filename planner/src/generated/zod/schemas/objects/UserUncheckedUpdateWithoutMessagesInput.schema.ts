import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from './PostUncheckedUpdateManyWithoutAuthorNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  country: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  zipCode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput>;
export const UserUncheckedUpdateWithoutMessagesInputObjectZodSchema = makeSchema();
