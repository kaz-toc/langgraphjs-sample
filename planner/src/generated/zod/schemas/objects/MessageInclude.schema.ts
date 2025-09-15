import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const MessageIncludeObjectSchema: z.ZodType<Prisma.MessageInclude> = makeSchema() as unknown as z.ZodType<Prisma.MessageInclude>;
export const MessageIncludeObjectZodSchema = makeSchema();
