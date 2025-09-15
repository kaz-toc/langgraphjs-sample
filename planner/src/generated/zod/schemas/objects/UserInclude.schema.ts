import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostFindManySchema } from '../findManyPost.schema';
import { MessageFindManySchema } from '../findManyMessage.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  messages: z.union([z.boolean(), z.lazy(() => MessageFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
