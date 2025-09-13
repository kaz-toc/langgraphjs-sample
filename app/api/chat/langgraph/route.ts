import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/lib/services/chat-service";
import { auth } from "@/app/(auth)/auth";

const chatService = new ChatService();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, chatId } = await request.json();

    if (!message || !chatId) {
      return NextResponse.json(
        { error: "Message and chatId are required" },
        { status: 400 }
      );
    }

    const result = await chatService.processMessage(
      chatId,
      message,
      session.user.id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      // Get all chats for user
      const chats = await chatService.getUserChats(session.user.id);
      return NextResponse.json({ chats });
    }

    // Get specific chat history
    const chat = await chatService.getChatHistory(chatId);
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
