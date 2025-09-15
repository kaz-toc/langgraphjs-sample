import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'name', 'country', 'zipCode', 'createdAt', 'updatedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;