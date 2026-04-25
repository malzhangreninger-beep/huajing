"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageItem } from "./message-item";
import { ChatInput } from "./chat-input";
import { InspirationCards } from "./inspiration-cards";
import { Sparkles } from "lucide-react";

export function ChatContainer() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/inspiration" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleInspirationSelect = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {!hasMessages ? (
            <div className="space-y-12">
              {/* Welcome Section */}
              <div className="text-center space-y-4 py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-4">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-semibold text-foreground">
                  欢迎来到画境
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  我是你的AI绘画灵感助手，无论你是寻找创作主题、探索艺术风格，
                  还是需要技法建议，我都能为你提供专业的指导。
                </p>
              </div>

              {/* Inspiration Cards */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    探索灵感
                  </h3>
                  <p className="text-foreground">
                    选择一个主题开始，或直接输入你的创作想法
                  </p>
                </div>
                <InspirationCards onSelect={handleInspirationSelect} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        画境
                      </span>
                    </div>
                    <div className="inline-block px-5 py-4 rounded-2xl rounded-tl-sm bg-card border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm">正在构思灵感...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
