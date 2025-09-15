import { z } from "zod";
import { prisma } from "./db";
import { UserCreateInputObjectSchema } from "../generated/zod/schemas/objects/UserCreateInput.schema";
import { UserUpdateInputObjectSchema } from "../generated/zod/schemas/objects/UserUpdateInput.schema";

// Zodスキーマを使ったバリデーション付きのユーザー作成
export const createUser = async (
  data: z.infer<typeof UserCreateInputObjectSchema>
) => {
  // Zodでデータをバリデーション
  const validatedData = UserCreateInputObjectSchema.parse(data);

  // Prismaでデータベースに保存
  const user = await prisma.user.create({
    data: validatedData,
    include: {
      posts: true,
      messages: true,
    },
  });

  return user;
};

// ユーザー取得
export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      messages: true,
    },
  });

  return user;
};

// ユーザー一覧取得
export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      messages: true,
    },
  });

  return users;
};

// Zodスキーマを使ったバリデーション付きのユーザー更新
export const updateUser = async (
  id: number,
  data: z.infer<typeof UserUpdateInputObjectSchema>
) => {
  // Zodでデータをバリデーション
  const validatedData = UserUpdateInputObjectSchema.parse(data);

  // Prismaでデータベースを更新
  const user = await prisma.user.update({
    where: { id },
    data: validatedData,
    include: {
      posts: true,
      messages: true,
    },
  });

  return user;
};

// ユーザー削除
export const deleteUser = async (id: number) => {
  const user = await prisma.user.delete({
    where: { id },
  });

  return user;
};
