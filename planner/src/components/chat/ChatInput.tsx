import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import React from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm",
              "placeholder:text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
            spellCheck={false}
            rows={1}
            style={{
              resize: "none",
              overflow: "hidden",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "60px";
              target.style.height = Math.min(target.scrollHeight, 240) + "px";
            }}
          />
          <div className="absolute right-0 top-4 sm:right-4">
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || disabled}
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/80",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="size-4"
              >
                <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
