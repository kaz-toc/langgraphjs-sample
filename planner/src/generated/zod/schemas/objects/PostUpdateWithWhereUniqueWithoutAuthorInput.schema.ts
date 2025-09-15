import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutAuthorInputObjectSchema } from './PostUpdateWithoutAuthorInput.schema';
import { PostUncheckedUpdateWithoutAuthorInputObjectSchema } from './PostUncheckedUpdateWithoutAuthorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutAuthorInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutAuthorInputObjectSchema)])
}).strict();
export const PostUpdateWithWhereUniqueWithoutAuthorInputObjectSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput>;
export const PostUpdateWithWhereUniqueWithoutAuthorInputObjectZodSchema = makeSchema();
