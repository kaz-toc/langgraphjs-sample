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

    const { title } = await request.json();

    const chatTitle = title || `Chat ${new Date().toLocaleString()}`;

    const chat = await chatService.createChat(session.user.id, chatTitle);

    return NextResponse.json({
      success: true,
      chat: {
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating new chat:", error);
    return NextResponse.json(
      { error: "Failed to create new chat" },
      { status: 500 }
    );
  }
}
