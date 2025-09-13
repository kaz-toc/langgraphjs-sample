import { prisma } from "../prisma";
import { chatGraph, GraphState } from "../langgraph/graph";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import { nanoid } from "nanoid";

export class ChatService {
  async createChat(userId: string, title: string) {
    return await prisma.chat.create({
      data: {
        id: nanoid(),
        title,
        userId,
      },
    });
  }

  async getChatHistory(chatId: string) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return chat;
  }

  async saveMessage(
    chatId: string,
    content: string,
    role: "user" | "assistant" | "system"
  ) {
    return await prisma.message.create({
      data: {
        id: nanoid(),
        content,
        role,
        chatId,
      },
    });
  }

  async processMessage(chatId: string, userMessage: string, userId?: string) {
    // Save user message
    await this.saveMessage(chatId, userMessage, "user");

    // Get chat history
    const chat = await this.getChatHistory(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Convert messages to LangChain format
    const messages: BaseMessage[] = chat.messages.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      }
      // Add other message types as needed
      return new HumanMessage(msg.content); // Fallback
    });

    // Add the new user message
    messages.push(new HumanMessage(userMessage));

    // Create initial state
    const initialState: GraphState = {
      messages,
      userId,
      sessionId: chatId,
    };

    try {
      // Process with LangGraph
      const result = await chatGraph.invoke(initialState);

      // Get the last AI message
      const lastMessage = result.messages[result.messages.length - 1];
      const aiResponse = lastMessage.content.toString();

      // Save AI response
      await this.saveMessage(chatId, aiResponse, "assistant");

      return {
        success: true,
        response: aiResponse,
        chatId,
      };
    } catch (error) {
      console.error("Error processing message:", error);
      throw new Error("Failed to process message");
    }
  }

  async getUserChats(userId: string) {
    return await prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  async deleteChat(chatId: string, userId: string) {
    // Verify ownership
    const chat = await prisma.chat.findFirst({
      where: { id: chatId, userId },
    });

    if (!chat) {
      throw new Error("Chat not found or not authorized");
    }

    return await prisma.chat.delete({
      where: { id: chatId },
    });
  }
}
