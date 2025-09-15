import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { PostFindManySchema } from '../findManyPost.schema';
import { MessageFindManySchema } from '../findManyMessage.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  country: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  messages: z.union([z.boolean(), z.lazy(() => MessageFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
