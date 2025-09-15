import { z } from 'zod';
export const UserFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  posts: z.array(z.unknown()),
  messages: z.array(z.unknown())
}));