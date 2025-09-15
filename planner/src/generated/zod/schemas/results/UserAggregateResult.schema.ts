import { z } from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    email: z.number(),
    name: z.number(),
    country: z.number(),
    zipCode: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    posts: z.number(),
    messages: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    country: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    country: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});