// src/App.tsx

import { AuthenticatedChat } from "../components/auth/AuthenticatedChat";
import { LangGraphClient } from "../lib/langgraph-client";
import "./App.css";

function App() {
  // 実際のAPIエンドポイントを使用した認証済みAIレスポンス関数
  const handleAuthenticatedMessage = async (
    message: string,
    userId?: string
  ): Promise<string> => {
    try {
      // 実際のチャットAPIエンドポイントを呼び出し
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          userId: userId ? parseInt(userId) : undefined,
          sessionId: `session_${userId}_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.response ||
        data.assistantMessage?.content ||
        "レスポンスの取得に失敗しました。"
      );
    } catch (error) {
      console.error("Chat API error:", error);
      // エラーをそのまま再スロー
      throw error;
    }
  };

  return (
    <div className="h-screen w-full">
      <AuthenticatedChat onSendMessage={handleAuthenticatedMessage} />
    </div>
  );
}

export default App;
