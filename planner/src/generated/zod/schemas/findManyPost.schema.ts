import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { PostIncludeObjectSchema } from './objects/PostInclude.schema';
import { PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema';
import { PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema';
import { PostScalarFieldEnumSchema } from './enums/PostScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostFindManySelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    content: z.boolean().optional(),
    published: z.boolean().optional(),
    authorId: z.boolean().optional(),
    author: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PostSelect>;

export const PostFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    content: z.boolean().optional(),
    published: z.boolean().optional(),
    authorId: z.boolean().optional(),
    author: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const PostFindManySchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({ select: PostFindManySelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PostFindManyArgs>;

export const PostFindManyZodSchema = z.object({ select: PostFindManySelectSchema.optional(), include: z.lazy(() => PostIncludeObjectSchema.optional()), orderBy: z.union([PostOrderByWithRelationInputObjectSchema, PostOrderByWithRelationInputObjectSchema.array()]).optional(), where: PostWhereInputObjectSchema.optional(), cursor: PostWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()]).optional() }).strict();