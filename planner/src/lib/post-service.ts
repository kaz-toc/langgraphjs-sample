import { z } from "zod";
import { prisma } from "./db";
import { PostCreateInputObjectSchema } from "../generated/zod/schemas/objects/PostCreateInput.schema";
import { PostUpdateInputObjectSchema } from "../generated/zod/schemas/objects/PostUpdateInput.schema";

// Zodスキーマを使ったバリデーション付きの投稿作成
export const createPost = async (
  data: z.infer<typeof PostCreateInputObjectSchema>
) => {
  // Zodでデータをバリデーション
  const validatedData = PostCreateInputObjectSchema.parse(data);

  // Prismaでデータベースに保存
  const post = await prisma.post.create({
    data: validatedData,
    include: {
      author: true,
    },
  });

  return post;
};

// 投稿取得
export const getPost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });

  return post;
};

// 投稿一覧取得
export const getPosts = async (published?: boolean) => {
  const posts = await prisma.post.findMany({
    where: published !== undefined ? { published } : undefined,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

// Zodスキーマを使ったバリデーション付きの投稿更新
export const updatePost = async (
  id: number,
  data: z.infer<typeof PostUpdateInputObjectSchema>
) => {
  // Zodでデータをバリデーション
  const validatedData = PostUpdateInputObjectSchema.parse(data);

  // Prismaでデータベースを更新
  const post = await prisma.post.update({
    where: { id },
    data: validatedData,
    include: {
      author: true,
    },
  });

  return post;
};

// 投稿削除
export const deletePost = async (id: number) => {
  const post = await prisma.post.delete({
    where: { id },
  });

  return post;
};

// ユーザーの投稿一覧取得
export const getPostsByUser = async (authorId: number) => {
  const posts = await prisma.post.findMany({
    where: { authorId },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};
