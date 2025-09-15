import { useUser, useAuth, SignInButton, UserButton } from "@clerk/clerk-react";
import { ChatContainer, ChatMode } from "../chat/ChatContainer";
import { LangGraphClient } from "../../lib/langgraph-client";
import { useState, useEffect } from "react";

interface AuthenticatedChatProps {
  onSendMessage?: (
    message: string,
    mode: ChatMode,
    userId?: string
  ) => Promise<string>;
}

export function AuthenticatedChat({ onSendMessage }: AuthenticatedChatProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [langGraphClient, setLangGraphClient] =
    useState<LangGraphClient | null>(null);
  const [threadId, setThreadId] = useState<string>("");

  // ユーザーがサインインしたらLangGraphクライアントを初期化
  useEffect(() => {
    if (isSignedIn && user) {
      // デバッグ: ユーザー情報をコンソールに出力
      console.log("Clerk User Object:", {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        fullName: user.fullName,
        emailAddress: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl,
      });

      const userContext = {
        userId: user.id,
        username:
          user.firstName ||
          user.username ||
          user.fullName ||
          user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
          "unknown",
        email: user.primaryEmailAddress?.emailAddress,
      };
      const client = new LangGraphClient("http://localhost:8123", userContext);
      setLangGraphClient(client);
      setThreadId(`thread_${user.id}_${Date.now()}`);
    }
  }, [isSignedIn, user]);

  // 認証済みメッセージハンドラー
  const handleAuthenticatedMessage = async (
    message: string,
    mode: ChatMode
  ): Promise<string> => {
    if (!isSignedIn || !user || !langGraphClient) {
      return "認証が必要です。ログインしてください。";
    }

    try {
      // Clerkトークンを取得（必要に応じて）
      // const token = await getToken();

      if (onSendMessage) {
        return await onSendMessage(message, mode, user.id);
      }

      // デフォルトのLangGraphクライアント使用
      // モードに応じて異なるthreadIdを使用
      const currentThreadId =
        mode === "with-history" ? threadId : `single_${Date.now()}`;
      return await langGraphClient.sendMessage(message, currentThreadId, mode);
    } catch (error) {
      console.error("認証済みメッセージ送信エラー:", error);

      // フォールバック
      const userName =
        user.firstName ||
        user.username ||
        user.fullName ||
        user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "ユーザー";

      const modeLabel = mode === "with-history" ? "履歴保持" : "単発";
      const responses = [
        `こんにちは${userName}さん！「${message}」について詳しく教えてください。`,
        `${userName}さん、${message}に関してお手伝いできることがあります。`,
        `なるほど、${message}についてですね。具体的にどのようなサポートが必要でしょうか？`,
      ];
      return `[${modeLabel}モード] ${responses[Math.floor(Math.random() * responses.length)]}`;
    }
  };

  // ローディング中
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">認証情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
        <div className="text-center space-y-4">
          <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-8 text-primary"
            >
              <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0C63.78 166.78 40.31 185.66 25.08 212a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">AIチャットボットへようこそ</h1>
            <p className="text-muted-foreground mt-2">
              パーソナライズされた会話を始めるには、ログインしてください
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <SignInButton mode="modal">
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded-md font-medium transition-colors">
              ログイン / サインアップ
            </button>
          </SignInButton>
        </div>

        <div className="text-center text-sm text-muted-foreground max-w-md">
          <p>
            ログインすることで、会話履歴の保存やパーソナライズされた
            AIレスポンスをお楽しみいただけます。
          </p>
        </div>
      </div>
    );
  }

  // 認証済みの場合
  return (
    <div className="h-screen flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-3">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-4 text-primary"
            >
              <path d="M224 128a8 8 0 0 1-8 8h-24v24a8 8 0 0 1-16 0v-24h-24a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              こんにちは、
              {user.firstName ||
                user.username ||
                user.fullName ||
                user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
                "ユーザー"}
              さん
            </h1>
            <p className="text-sm text-muted-foreground">
              AIアシスタントとの会話をお楽しみください
            </p>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* チャット */}
      <div className="flex-1">
        <ChatContainer
          onSendMessage={handleAuthenticatedMessage}
          initialMessages={[
            {
              id: "welcome",
              role: "assistant",
              content: `こんにちは${user.firstName || user.username || user.fullName || user.primaryEmailAddress?.emailAddress?.split("@")[0] || "ユーザー"}さん！どのようなお手伝いができますか？`,
              timestamp: new Date(),
            },
          ]}
        />
      </div>
    </div>
  );
}
