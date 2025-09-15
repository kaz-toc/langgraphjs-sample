// LangGraph APIクライアント
export interface UserContext {
  userId?: string;
  username?: string;
  email?: string;
}

export class LangGraphClient {
  private baseUrl: string;
  private userContext?: UserContext;

  constructor(baseUrl = "http://localhost:8123", userContext?: UserContext) {
    this.baseUrl = baseUrl;
    this.userContext = userContext;
  }

  setUserContext(userContext: UserContext) {
    this.userContext = userContext;
  }

  async sendMessage(
    message: string,
    threadId?: string,
    mode: "with-history" | "without-history" = "with-history"
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/runs/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistant_id: "agent",
          input: {
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            // ユーザーコンテキストを含める
            user_context: this.userContext,
            // チャットモードを追加
            mode,
          },
          thread_id:
            mode === "with-history" ? threadId : `single_${Date.now()}`,
          stream_mode: "values",
          // メタデータとしてユーザー情報を追加
          metadata: {
            user_id: this.userContext?.userId,
            username: this.userContext?.username,
            mode,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ストリームレスポンスを処理
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.messages && data.messages.length > 0) {
                  const lastMessage = data.messages[data.messages.length - 1];
                  if (lastMessage.role === "assistant") {
                    result = lastMessage.content;
                  }
                }
              } catch (e) {
                // JSONパースエラーは無視
              }
            }
          }
        }
      }

      return result || "申し訳ございませんが、応答を取得できませんでした。";
    } catch (error) {
      console.error("LangGraph API error:", error);
      throw new Error(
        "LangGraph APIへの接続に失敗しました。サーバーが起動しているか確認してください。"
      );
    }
  }
}
