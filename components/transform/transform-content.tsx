"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Sparkles,
  Send,
  BookOpenText,
  Music,
  Image as ImageIcon,
  Brain,
  Loader2,
} from "lucide-react";
import { TransformResult } from "./transform-result";

const inputTypes = [
  {
    id: "poem",
    label: "诗歌/散文",
    icon: BookOpenText,
    placeholder: "粘贴一首诗、一段散文，或任何触动你的文字...",
    example: "例如：里尔克的《秋日》、海子的诗句、你自己的随笔...",
  },
  {
    id: "memory",
    label: "记忆/场景",
    icon: Brain,
    placeholder: "描述一段记忆、一个场景、或一个画面...",
    example: "例如：童年夏天的午后、某个黄昏的街角、梦中的场景...",
  },
  {
    id: "concept",
    label: "概念/哲学",
    icon: Sparkles,
    placeholder: "输入一个概念、一个哲学命题、或一个抽象想法...",
    example: "例如：海德格尔的「栖居」、时间的流逝、孤独与自由...",
  },
];

export function TransformContent() {
  const [selectedType, setSelectedType] = useState(inputTypes[0]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/transform",
      body: { inputType: selectedType.label },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleClear = () => {
    setMessages([]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">灵感转换</h1>
              <p className="text-sm text-muted-foreground">
                将诗歌、记忆、概念转化为创作方案
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              清空对话
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Empty State - Input Form */
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  输入你的灵感来源
                </h2>
                <p className="text-muted-foreground">
                  将一首诗、一段记忆、一个概念，转化为可执行的绘画创作方案
                </p>
              </div>

              {/* Input Type Selector */}
              <div className="flex gap-2 mb-6 justify-center">
                {inputTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${
                          selectedType.id === type.id
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={selectedType.placeholder}
                    className="w-full h-40 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-lg leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedType.example}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>正在转换...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>开始转换</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`animate-fade-in ${
                    message.role === "user" ? "flex justify-end" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {message.role === "user" ? (
                    <div className="max-w-lg bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
                      <p className="text-foreground whitespace-pre-wrap">
                        {message.parts
                          ?.filter((p) => p.type === "text")
                          .map((p) => p.text)
                          .join("") || ""}
                      </p>
                    </div>
                  ) : (
                    <TransformResult
                      content={
                        message.parts
                          ?.filter((p) => p.type === "text")
                          .map((p) => p.text)
                          .join("") || ""
                      }
                      isStreaming={isLoading && index === messages.length - 1}
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area (when in chat mode) */}
        {messages.length > 0 && (
          <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="继续探索，或输入新的灵感来源..."
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
