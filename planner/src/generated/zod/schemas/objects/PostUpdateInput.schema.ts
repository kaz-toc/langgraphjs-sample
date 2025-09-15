import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPostsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPostsNestedInput.schema'

const makeSchema = () => z.object({
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  published: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputObjectSchema).optional()
}).strict();
export const PostUpdateInputObjectSchema: z.ZodType<Prisma.PostUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateInput>;
export const PostUpdateInputObjectZodSchema = makeSchema();
