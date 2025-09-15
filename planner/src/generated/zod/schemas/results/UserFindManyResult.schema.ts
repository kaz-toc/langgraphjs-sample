import { z } from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  posts: z.array(z.unknown()),
  messages: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});