import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id', 'title', 'content', 'published', 'authorId', 'createdAt', 'updatedAt'])

export type PostScalarFieldEnum = z.infer<typeof PostScalarFieldEnumSchema>;