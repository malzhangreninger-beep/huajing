"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Palette, ArrowRight, Quote } from "lucide-react";

const features = [
  {
    title: "创作日志",
    description:
      "记录每日灵感碎片——看到的、想到的、感受到的。AI 会帮你发现反复出现的母题和意象。",
    icon: BookOpen,
    href: "/journal",
    iconBg: "bg-primary",
  },
  {
    title: "灵感转换",
    description:
      "输入一首诗、一段记忆、一个概念，获得构图建议、色调方案、美术史参考。",
    icon: Sparkles,
    href: "/transform",
    iconBg: "bg-accent",
  },
  {
    title: "母题画廊",
    description:
      "AI 分析你的创作日志，识别你的艺术语言、情绪基调、关注的哲学命题。",
    icon: Palette,
    href: "/themes",
    iconBg: "bg-tertiary",
  },
];

const quotes = [
  {
    text: "艺术是灵魂的镜子，而灵感是连接内在与外在的桥梁。",
    author: "保罗·克利",
  },
  {
    text: "每一个艺术家都把他自己沉浸在他的作品里，成为他作品的一部分。",
    author: "梵高",
  },
  {
    text: "创作就是不断发现自己的过程。",
    author: "塞尚",
  },
];

export function HomeContent() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen p-6 lg:p-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            欢迎来到<span className="text-accent">画境</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            一个为艺术创作者服务的 AI 创作伴侣。通过「向内挖掘」和「向外转化」，
            帮助你找回和深化自己的艺术语言。
          </p>
        </div>

        {/* Quote Card - 褪色暖黄 */}
        <div
          className="relative rounded p-10 mb-12"
          style={{
            backgroundColor: "var(--quote-bg)",
            border: "1.5px solid var(--border)",
          }}
        >
          <Quote
            className="absolute top-5 left-5 w-12 h-12 opacity-60"
            style={{ color: "var(--quote-foreground)" }}
            strokeWidth={2}
          />
          <blockquote className="text-center pt-4">
            <p
              className="text-xl italic mb-4 leading-relaxed font-medium"
              style={{ color: "var(--quote-foreground)" }}
            >
              「{randomQuote.text}」
            </p>
            <cite
              className="text-sm not-italic opacity-80"
              style={{ color: "var(--quote-foreground)" }}
            >
              —— {randomQuote.author}
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Features Grid - 统一米白卡片，色彩仅在图标处点缀 */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center">
          开始创作之旅
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative h-full bg-card rounded p-6 transition-all duration-300 hover:bg-secondary"
                  style={{ border: "1.5px solid var(--border)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded ${feature.iconBg}`}
                      style={{ border: "1.5px solid var(--border)" }}
                    >
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Philosophy Section */}
      <div
        className="max-w-3xl mx-auto mt-20 text-center animate-fade-in"
        style={{ animationDelay: "400ms" }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card mb-6"
          style={{ border: "1.5px solid var(--border)" }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          <span className="text-xs text-foreground">设计理念</span>
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          不生成图像，而是激发创作
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          画境不同于 AI 生图工具。我们相信，真正的艺术创作来自于你自己的感受和思考。
          AI 的角色是帮助你「看见自己」——发现你反复出现的母题，
          将外部的诗歌、音乐、记忆转化为可执行的创作方案，
          而最终的画笔，始终握在你手中。
        </p>
      </div>
    </div>
  );
}
