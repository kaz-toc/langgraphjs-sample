import { z } from 'zod';

export const MessageScalarFieldEnumSchema = z.enum(['id', 'content', 'role', 'userId', 'sessionId', 'createdAt', 'updatedAt'])

export type MessageScalarFieldEnum = z.infer<typeof MessageScalarFieldEnumSchema>;