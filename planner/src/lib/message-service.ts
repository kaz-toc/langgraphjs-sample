import { prisma } from "./db";
import { z } from "zod";

// メッセージ作成用のスキーマ
export const CreateMessageSchema = z.object({
  content: z.string().min(1, "メッセージ内容は必須です"),
  role: z.enum(["user", "assistant"]),
  userId: z.number().int().positive().optional().nullable(),
  sessionId: z.string().optional(),
});

export type CreateMessageData = z.infer<typeof CreateMessageSchema>;

// メッセージ更新用のスキーマ
export const UpdateMessageSchema = z.object({
  content: z.string().min(1).optional(),
  role: z.enum(["user", "assistant"]).optional(),
  userId: z.number().int().positive().optional().nullable(),
  sessionId: z.string().optional(),
});

export type UpdateMessageData = z.infer<typeof UpdateMessageSchema>;

// メッセージを作成
export async function createMessage(data: CreateMessageData) {
  const validatedData = CreateMessageSchema.parse(data);

  return await prisma.message.create({
    data: validatedData,
    include: {
      user: true,
    },
  });
}

// 全メッセージを取得
export async function getMessages(sessionId?: string) {
  const where = sessionId ? { sessionId } : {};

  return await prisma.message.findMany({
    where,
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

// 特定のメッセージを取得
export async function getMessage(id: number) {
  return await prisma.message.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

// メッセージを更新
export async function updateMessage(id: number, data: UpdateMessageData) {
  const validatedData = UpdateMessageSchema.parse(data);

  return await prisma.message.update({
    where: { id },
    data: validatedData,
    include: {
      user: true,
    },
  });
}

// メッセージを削除
export async function deleteMessage(id: number) {
  return await prisma.message.delete({
    where: { id },
    include: {
      user: true,
    },
  });
}

// ユーザーのメッセージを取得
export async function getMessagesByUser(userId: number) {
  return await prisma.message.findMany({
    where: { userId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

// セッションのメッセージを取得
export async function getMessagesBySession(sessionId: string) {
  return await prisma.message.findMany({
    where: { sessionId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
