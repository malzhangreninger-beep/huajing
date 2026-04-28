"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Palette, ArrowRight } from "lucide-react";

const features = [
  {
    title: "创作日志",
    description:
      "记录每日灵感碎片——看到的、想到的、感受到的。AI 会帮你发现反复出现的母题与意象。",
    icon: BookOpen,
    href: "/journal",
    paint: "var(--primary)",
    paintFg: "var(--primary-foreground)",
  },
  {
    title: "灵感转换",
    description:
      "输入一首诗、一段记忆、一个概念，获得构图建议、色调方案、美术史参考。",
    icon: Sparkles,
    href: "/transform",
    paint: "var(--accent)",
    paintFg: "var(--accent-foreground)",
  },
  {
    title: "母题画廊",
    description:
      "AI 分析你的创作日志，识别你的艺术语言、情绪基调、关注的哲学命题。",
    icon: Palette,
    href: "/themes",
    paint: "var(--quinary)",
    paintFg: "var(--quinary-foreground)",
  },
];

export function HomeContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 画布上的颜料色块 —— 像 Serveau 静物画里被切分的背景区域 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-0 right-0 h-[340px]"
          style={{
            background: "var(--quote-bg)",
            opacity: 0.16,
            clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 92%)",
          }}
        />
        <div
          className="absolute top-[60px] right-0 w-[42%] h-[360px]"
          style={{
            background: "var(--tertiary)",
            opacity: 0.14,
            clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 88%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[58%] h-[420px]"
          style={{
            background: "var(--primary)",
            opacity: 0.16,
            clipPath: "polygon(0 18%, 100% 8%, 92% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[300px]"
          style={{
            background: "var(--quaternary)",
            opacity: 0.12,
            clipPath: "polygon(15% 22%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-16 lg:px-16 lg:py-24">
        {/* Hero —— 欢迎区 */}
        <header className="max-w-4xl mx-auto mb-20 animate-paint-in text-center">
          <h1
            className="text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-8 font-bold"
            style={{ color: "var(--foreground)" }}
          >
            欢迎来到<span style={{ color: "var(--accent)" }}>画境</span>
          </h1>
          <p
            className="text-lg lg:text-xl leading-[1.85] max-w-2xl mx-auto"
            style={{ color: "var(--foreground)", opacity: 0.78 }}
          >
            一个为艺术创作者服务的 AI 创作伴侣。通过「向内挖掘」和「向外转化」，
            帮助你找回和深化自己的艺术语言。
          </p>
        </header>

        {/* Klee 引言 */}
        <section
          className="max-w-3xl mx-auto mb-24 animate-paint-in"
          style={{ animationDelay: "300ms" }}
        >
          <blockquote className="text-center py-10 px-8 relative">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px"
              style={{ background: "rgba(44, 32, 16, 0.3)" }}
            />
            <p
              className="text-xl lg:text-2xl leading-[1.7] mb-5 italic"
              style={{ color: "var(--foreground)", opacity: 0.85 }}
            >
              「艺术是灵魂的镜子，而灵感是连接内在与外在的桥梁。」
            </p>
            <footer
              className="text-sm tracking-[0.2em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              —— 保罗·克利
            </footer>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px"
              style={{ background: "rgba(44, 32, 16, 0.3)" }}
            />
          </blockquote>
        </section>

        {/* 开始创作之旅 */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2
            className="text-3xl lg:text-4xl font-semibold mb-12 text-center"
            style={{ color: "var(--foreground)" }}
          >
            开始创作之旅
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group block animate-paint-slide"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <article className="painted-card relative h-full p-7 transition-opacity duration-700 group-hover:opacity-95">
                    {/* 角落颜料色斑 */}
                    <span
                      className="absolute top-0 right-0 w-16 h-16"
                      style={{
                        background: feature.paint,
                        opacity: 0.85,
                        clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute bottom-0 left-0 w-12 h-12"
                      style={{
                        background: feature.paint,
                        opacity: 0.25,
                        clipPath: "polygon(0 100%, 100% 100%, 0 0)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative">
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 mb-7"
                        style={{
                          background: feature.paint,
                          color: feature.paintFg,
                          borderRadius: "2px",
                        }}
                      >
                        <Icon className="w-7 h-7" strokeWidth={1.4} />
                      </div>

                      <h3
                        className="text-2xl font-semibold mb-4"
                        style={{ color: "var(--foreground)" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-[15px] leading-[1.85]"
                        style={{ color: "var(--foreground)", opacity: 0.78 }}
                      >
                        {feature.description}
                      </p>

                      <div
                        className="mt-8 pt-5 flex items-center justify-end"
                        style={{ borderTop: "2px solid rgba(44, 32, 16, 0.25)" }}
                      >
                        <ArrowRight
                          className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                          style={{ color: feature.paint }}
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 设计理念 */}
        <section
          className="max-w-3xl mx-auto animate-paint-in"
          style={{ animationDelay: "600ms" }}
        >
          <p
            className="text-center text-sm tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--muted-foreground)" }}
          >
            设计理念
          </p>
          <h3
            className="text-2xl lg:text-3xl font-semibold mb-8 text-center leading-[1.4]"
            style={{ color: "var(--foreground)" }}
          >
            不生成图像，而是激发<span style={{ color: "var(--accent)" }}>创作</span>
          </h3>
          <p
            className="text-[15px] lg:text-base leading-[1.95] text-center max-w-2xl mx-auto"
            style={{ color: "var(--foreground)", opacity: 0.78 }}
          >
            画境不同于 AI 生图工具。我们相信，真正的艺术创作来自于你自己的感受和思考。
            AI 的角色是帮助你「看见自己」——发现你反复出现的母题，
            将外部的诗歌、音乐、记忆转化为可执行的创作方案，
            而最终的画笔，始终握在你手中。
          </p>
        </section>
      </div>
    </div>
  );
}
