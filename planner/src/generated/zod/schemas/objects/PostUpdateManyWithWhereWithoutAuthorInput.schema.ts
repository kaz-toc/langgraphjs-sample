import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema';
import { PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema';
import { PostUncheckedUpdateManyWithoutAuthorInputObjectSchema } from './PostUncheckedUpdateManyWithoutAuthorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputObjectSchema), z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputObjectSchema)])
}).strict();
export const PostUpdateManyWithWhereWithoutAuthorInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput>;
export const PostUpdateManyWithWhereWithoutAuthorInputObjectZodSchema = makeSchema();
