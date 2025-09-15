import { useState, useRef, useEffect } from "react";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "../ui/button";

export type ChatMode = "with-history" | "without-history";

export interface ChatModeOption {
  value: ChatMode;
  label: string;
  description: string;
}

interface ChatContainerProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string, mode: ChatMode) => Promise<string>;
  defaultChatMode?: ChatMode;
}

export function ChatContainer({
  initialMessages = [],
  onSendMessage,
  defaultChatMode = "with-history",
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>(defaultChatMode);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatModeOptions: ChatModeOption[] = [
    {
      value: "with-history",
      label: "履歴保持モード",
      description: "過去の会話を記憶してコンテキストを保持します",
    },
    {
      value: "without-history",
      label: "単発モード",
      description: "各メッセージを独立して処理します",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let assistantContent = "こんにちは！どのようなお手伝いができますか？";

      if (onSendMessage) {
        assistantContent = await onSendMessage(content, chatMode);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "申し訳ございませんが、エラーが発生しました。もう一度お試しください。",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h1 className="text-lg font-semibold">AI チャット</h1>
          <p className="text-sm text-muted-foreground">
            {
              chatModeOptions.find((option) => option.value === chatMode)
                ?.description
            }
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Chat Mode Selector */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="chat-mode"
              className="text-sm font-medium text-muted-foreground"
            >
              モード:
            </label>
            <select
              id="chat-mode"
              value={chatMode}
              onChange={(e) => setChatMode(e.target.value as ChatMode)}
              className="px-3 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {chatModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={clearMessages}
            disabled={messages.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-4 mr-2"
            >
              <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
            </svg>
            クリア
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="size-6 text-primary"
              >
                <path d="M216 80H40a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16ZM40 96h176v96H40ZM64 128a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16H72a8 8 0 0 1-8-8Zm80 0a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">チャットを開始</h3>
              <p className="text-muted-foreground">
                下のメッセージボックスから会話を始めましょう
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="size-4"
              >
                <path d="M224 128a8 8 0 0 1-8 8h-24v24a8 8 0 0 1-16 0v-24h-24a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8Z" />
              </svg>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder="メッセージを入力..."
      />
    </div>
  );
}
