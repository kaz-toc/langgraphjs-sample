import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const PostIncludeObjectSchema: z.ZodType<Prisma.PostInclude> = makeSchema() as unknown as z.ZodType<Prisma.PostInclude>;
export const PostIncludeObjectZodSchema = makeSchema();
