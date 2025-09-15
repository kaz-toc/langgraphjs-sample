import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostCreateManyAuthorInputObjectSchema } from './PostCreateManyAuthorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PostCreateManyAuthorInputObjectSchema), z.lazy(() => PostCreateManyAuthorInputObjectSchema).array()])
}).strict();
export const PostCreateManyAuthorInputEnvelopeObjectSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope>;
export const PostCreateManyAuthorInputEnvelopeObjectZodSchema = makeSchema();
