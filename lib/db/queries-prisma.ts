import "server-only";

import { prisma } from "../prisma";
import { generateHashedPassword } from "./utils";
import { generateUUID } from "../utils";
import { ChatSDKError } from "../errors";

export type User = {
  id: string;
  email: string;
  password?: string | null;
  name?: string | null;
  country?: string | null;
  zipCode?: string | null;
};

export async function getUser(email: string): Promise<Array<User>> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        country: true,
        zipCode: true,
      },
    });

    return user ? [user] : [];
  } catch (error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get user by email"
    );
  }
}

export async function createUser(email: string, password: string) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new ChatSDKError("bad_request:database", "Failed to create user");
  }
}

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return [user];
  } catch (error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to create guest user"
    );
  }
}

export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: "public" | "private";
}) {
  try {
    return await prisma.chat.create({
      data: {
        id,
        userId,
        title,
        visibility,
      },
    });
  } catch (error) {
    throw new ChatSDKError("bad_request:database", "Failed to save chat");
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    // Prisma handles cascading deletes automatically
    const deletedChat = await prisma.chat.delete({
      where: { id },
    });

    return deletedChat;
  } catch (error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete chat by id"
    );
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    let whereCondition: any = { userId: id };

    if (startingAfter) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: startingAfter },
      });

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${startingAfter} not found`
        );
      }

      whereCondition.createdAt = { gt: selectedChat.createdAt };
    } else if (endingBefore) {
      const selectedChat = await prisma.chat.findUnique({
        where: { id: endingBefore },
      });

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${endingBefore} not found`
        );
      }

      whereCondition.createdAt = { lt: selectedChat.createdAt };
    }

    const filteredChats = await prisma.chat.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      take: extendedLimit,
    });

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get chats by user id"
    );
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id },
    });

    return chat;
  } catch (error) {
    throw new ChatSDKError("bad_request:database", "Failed to get chat by id");
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        country: true,
        zipCode: true,
      },
    });

    return user;
  } catch (error) {
    throw new ChatSDKError("bad_request:database", "Failed to get user by id");
  }
}

export async function updateUserProfile({
  userId,
  name,
  country,
  zipCode,
}: {
  userId: string;
  name?: string;
  country?: string;
  zipCode?: string;
}) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        country,
        zipCode,
      },
      select: {
        id: true,
        email: true,
        name: true,
        country: true,
        zipCode: true,
      },
    });

    return user;
  } catch (error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to update user profile"
    );
  }
}
