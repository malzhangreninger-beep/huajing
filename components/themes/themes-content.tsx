"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Palette,
  Sparkles,
  BookOpen,
  TrendingUp,
  Eye,
  Loader2,
  Send,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// 模拟的日志数据（实际项目中应该从状态管理或API获取）
const mockJournalEntries = [
  {
    content: "今天在窗边看到一束光线穿过玻璃杯，折射出彩虹的颜色。让我想起莫奈画中的光影变化。",
    tags: ["光影", "窗", "静物"],
    mood: 4,
  },
  {
    content: "读了里尔克的《秋日》，那种孤独的氛围很打动我。想尝试用冷灰色调来表达这种感觉。",
    tags: ["诗歌", "孤独", "秋天"],
    mood: 3,
  },
  {
    content: "在公园散步时看到老人坐在长椅上，背影让我想到时间的流逝。也许可以画一个系列关于「等待」的主题。",
    tags: ["背影", "时间", "等待"],
    mood: 4,
  },
  {
    content: "黄昏时分的城市剪影，高楼的轮廓在落日中显得格外孤独。想尝试用剪纸式的平面构图来表现。",
    tags: ["黄昏", "城市", "孤独"],
    mood: 3,
  },
  {
    content: "翻看老照片，发现自己总是被窗户和门框吸引。也许这代表了某种对内外空间的思考？",
    tags: ["窗", "空间", "记忆"],
    mood: 4,
  },
];

const quickAnalyses = [
  {
    title: "意象分析",
    icon: Eye,
    prompt: "请分析我日志中反复出现的视觉意象和符号。",
  },
  {
    title: "情绪地图",
    icon: TrendingUp,
    prompt: "请帮我梳理日志中的情绪变化和主导情感基调。",
  },
  {
    title: "创作建议",
    icon: Sparkles,
    prompt: "基于我的日志，给我一些具体的创作方向建议。",
  },
];

export function ThemesContent() {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/themes",
      body: { journalEntries: mockJournalEntries },
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

  const handleQuickAnalysis = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  const handleClear = () => {
    setMessages([]);
    setInputValue("");
  };

  // 从日志中提取所有标签
  const allTags = [...new Set(mockJournalEntries.flatMap((e) => e.tags))];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Palette className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">母题画廊</h1>
              <p className="text-sm text-muted-foreground">
                发现你的艺术语言
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              重新分析
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex-1 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Stats Overview */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    <span className="text-sm text-muted-foreground">日志记录</span>
                  </div>
                  <p className="text-3xl font-semibold text-foreground">
                    {mockJournalEntries.length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-muted-foreground">标签数量</span>
                  </div>
                  <p className="text-3xl font-semibold text-foreground">
                    {allTags.length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">平均情绪</span>
                  </div>
                  <p className="text-3xl font-semibold text-foreground">
                    {(
                      mockJournalEntries.reduce((sum, e) => sum + e.mood, 0) /
                      mockJournalEntries.length
                    ).toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Tag Cloud */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  你的关键词云
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => {
                    // 计算标签出现次数来决定大小
                    const count = mockJournalEntries.filter((e) =>
                      e.tags.includes(tag)
                    ).length;
                    const size = count > 1 ? "text-base" : "text-sm";
                    const weight = count > 1 ? "font-medium" : "font-normal";

                    return (
                      <span
                        key={tag}
                        className={`
                          px-3 py-1.5 rounded-full bg-secondary text-foreground
                          ${size} ${weight}
                          hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer
                        `}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {tag}
                        {count > 1 && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({count})
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Quick Analysis Buttons */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  快速分析
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {quickAnalyses.map((analysis) => {
                    const Icon = analysis.icon;
                    return (
                      <button
                        key={analysis.title}
                        onClick={() => handleQuickAnalysis(analysis.prompt)}
                        disabled={isLoading}
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">
                          {analysis.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Question */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  自由提问
                </h3>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="问问 AI 关于你创作母题的任何问题..."
                    className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
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
                </form>
              </div>
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
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/30">
                        <Palette className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-foreground">
                          母题分析
                        </span>
                        {isLoading && index === messages.length - 1 && (
                          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            分析中...
                          </span>
                        )}
                      </div>
                      <div className="px-5 py-4 prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h2: ({ children }) => (
                              <h2 className="text-lg font-semibold text-primary mt-6 mb-3 first:mt-0">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-foreground/90 leading-relaxed mb-3">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="space-y-2 mb-4 list-none pl-0">
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li className="flex gap-2 text-foreground/90">
                                <span className="text-primary mt-1">•</span>
                                <span>{children}</span>
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-muted-foreground">
                                {children}
                              </em>
                            ),
                            hr: () => <hr className="border-border my-6" />,
                          }}
                        >
                          {message.parts
                            ?.filter((p) => p.type === "text")
                            .map((p) => p.text)
                            .join("") || ""}
                        </ReactMarkdown>
                      </div>
                    </div>
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
                  placeholder="继续探索你的创作母题..."
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
