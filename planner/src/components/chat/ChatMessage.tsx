import { cn } from "../../lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "group relative mb-4 flex items-start md:-ml-12",
        message.role === "user" ? "justify-end" : ""
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background order-2 ml-2"
            : "bg-primary text-primary-foreground mr-2"
        )}
      >
        {message.role === "user" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="size-4"
          >
            <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0C63.78 166.78 40.31 185.66 25.08 212a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="size-4"
          >
            <path d="M224 128a8 8 0 0 1-8 8h-24v24a8 8 0 0 1-16 0v-24h-24a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8ZM144 72H40a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h104a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16Zm0 112H40V88h104v96Z" />
          </svg>
        )}
      </div>
      <div
        className={cn(
          "flex-1 px-1 ml-2 space-y-2 overflow-hidden",
          message.role === "user" ? "order-1 mr-2" : ""
        )}
      >
        <div
          className={cn(
            "prose prose-sm max-w-none break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0",
            message.role === "user"
              ? "bg-muted p-3 rounded-lg max-w-sm ml-auto"
              : ""
          )}
        >
          {message.role === "assistant" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: any) => {
                  return !inline ? (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code
                      className="bg-muted px-1 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }: any) => <>{children}</>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="mb-2 last:mb-0">{message.content}</p>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
