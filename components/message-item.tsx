"use client";

import { UIMessage } from "ai";
import { User, Sparkles } from "lucide-react";

interface MessageItemProps {
  message: UIMessage;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-secondary"
            : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Sparkles className="w-5 h-5 text-primary" />
        )}
      </div>

      <div
        className={`flex-1 max-w-2xl ${isUser ? "text-right" : "text-left"}`}
      >
        <div className="mb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {isUser ? "你" : "画境"}
          </span>
        </div>
        <div
          className={`inline-block px-5 py-4 rounded-2xl ${
            isUser
              ? "bg-secondary text-foreground rounded-tr-sm"
              : "bg-card border border-border/50 text-card-foreground rounded-tl-sm"
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none">
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return (
                  <div
                    key={index}
                    className="whitespace-pre-wrap leading-relaxed"
                  >
                    {part.text}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
