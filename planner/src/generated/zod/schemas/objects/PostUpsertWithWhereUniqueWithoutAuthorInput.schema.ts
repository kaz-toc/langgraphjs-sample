import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutAuthorInputObjectSchema } from './PostUpdateWithoutAuthorInput.schema';
import { PostUncheckedUpdateWithoutAuthorInputObjectSchema } from './PostUncheckedUpdateWithoutAuthorInput.schema';
import { PostCreateWithoutAuthorInputObjectSchema } from './PostCreateWithoutAuthorInput.schema';
import { PostUncheckedCreateWithoutAuthorInputObjectSchema } from './PostUncheckedCreateWithoutAuthorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutAuthorInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutAuthorInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutAuthorInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutAuthorInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput>;
export const PostUpsertWithWhereUniqueWithoutAuthorInputObjectZodSchema = makeSchema();
