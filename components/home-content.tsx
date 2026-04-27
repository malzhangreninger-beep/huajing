"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Palette, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "创作日志",
    subtitle: "Journal",
    description:
      "记录每日灵感碎片——看到的、想到的、感受到的。AI 会帮你发现反复出现的母题和意象。",
    icon: BookOpen,
    href: "/journal",
    bg: "var(--primary)",
    fg: "var(--primary-foreground)",
    chip: "var(--accent)",
  },
  {
    title: "灵感转换",
    subtitle: "Transform",
    description:
      "输入一首诗、一段记忆、一个概念，获得构图建议、色调方案、美术史参考。",
    icon: Sparkles,
    href: "/transform",
    bg: "var(--accent)",
    fg: "var(--accent-foreground)",
    chip: "var(--quote-bg)",
  },
  {
    title: "母题画廊",
    subtitle: "Themes",
    description:
      "AI 分析你的创作日志，识别你的艺术语言、情绪基调、关注的哲学命题。",
    icon: Palette,
    href: "/themes",
    bg: "var(--quinary)",
    fg: "var(--quinary-foreground)",
    chip: "var(--tertiary)",
  },
];

export function HomeContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 画布背景色块 —— 像 Serveau 静物画里被切分的背景区 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-0 right-0 h-[280px]"
          style={{
            background: "linear-gradient(180deg, var(--quote-bg) 0%, transparent 100%)",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute top-[80px] right-0 w-[40%] h-[320px]"
          style={{
            background: "linear-gradient(225deg, var(--tertiary) 0%, transparent 70%)",
            opacity: 0.25,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[55%] h-[400px]"
          style={{
            background: "linear-gradient(45deg, var(--primary) 0%, transparent 70%)",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[45%] h-[320px]"
          style={{
            background: "linear-gradient(135deg, transparent 30%, var(--quaternary) 100%)",
            opacity: 0.22,
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-14 lg:px-16 lg:py-20 canvas-texture">
        {/* Hero */}
        <header className="max-w-5xl mx-auto mb-20 animate-fade-in">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Studio · 2026
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{ color: "var(--foreground)" }}
            >
              欢迎来到
              <span style={{ color: "var(--accent)" }}>画境</span>
              <span
                className="block text-2xl lg:text-3xl mt-3 font-normal italic opacity-60"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nature morte · Atelier
              </span>
            </h1>
            <p
              className="text-base lg:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              一个为艺术创作者服务的 AI 创作伴侣。通过「向内挖掘」和「向外转化」，
              帮助你找回和深化自己的艺术语言。
            </p>
          </div>
        </header>

        {/* 功能卡片 —— 像画里并置的三件物品 */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="flex items-baseline justify-between mb-8 px-1">
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-px"
                style={{ background: "var(--border)" }}
              />
              <h2
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Trois objets · 开始创作之旅
              </h2>
            </div>
            <span
              className="hidden sm:inline text-xs italic opacity-50"
              style={{ color: "var(--muted-foreground)" }}
            >
              n° 01 — 03
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const num = String(index + 1).padStart(2, "0");
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <article
                    className="relative h-full p-7 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      background: feature.bg,
                      color: feature.fg,
                    }}
                  >
                    <span
                      className="absolute top-3 right-3 w-2 h-2 rounded-full"
                      style={{ background: feature.chip }}
                    />

                    <div className="flex items-start justify-between mb-7">
                      <span
                        className="text-xs tracking-[0.2em] opacity-60"
                        style={{ color: feature.fg }}
                      >
                        n° {num}
                      </span>
                      <ArrowUpRight
                        className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{ color: feature.fg }}
                      />
                    </div>

                    <Icon
                      className="w-9 h-9 mb-6 opacity-95"
                      strokeWidth={1.4}
                      style={{ color: feature.fg }}
                    />

                    <h3
                      className="text-2xl font-semibold mb-1"
                      style={{ color: feature.fg }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-xs italic mb-4 opacity-65 tracking-wider"
                      style={{ color: feature.fg }}
                    >
                      {feature.subtitle}
                    </p>
                    <p
                      className="text-sm leading-relaxed opacity-90"
                      style={{ color: feature.fg }}
                    >
                      {feature.description}
                    </p>

                    <div
                      className="mt-7 pt-4 flex items-center gap-2"
                      style={{ borderTop: "1px solid currentColor", borderColor: feature.fg, opacity: 0.85 }}
                    >
                      <span
                        className="text-[11px] uppercase tracking-[0.25em] opacity-70"
                        style={{ color: feature.fg }}
                      >
                        进入
                      </span>
                      <span
                        className="flex-1 h-px opacity-50"
                        style={{ background: feature.fg }}
                      />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 设计理念 */}
        <section
          className="max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <div className="relative px-2 py-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-32 flex-shrink-0 flex md:flex-col items-center md:items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full animate-pulse-soft"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Slow Art
                </span>
              </div>

              <div className="flex-1">
                <h3
                  className="text-2xl lg:text-3xl font-semibold mb-5 leading-snug"
                  style={{ color: "var(--foreground)" }}
                >
                  不生成图像，<br />
                  而是激发<span style={{ color: "var(--accent)" }}>创作</span>。
                </h3>
                <p
                  className="text-sm lg:text-base leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  画境不同于 AI 生图工具。我们相信，真正的艺术创作来自于你自己的感受和思考。
                  AI 的角色是帮助你「看见自己」——发现你反复出现的母题，
                  将外部的诗歌、音乐、记忆转化为可执行的创作方案，
                  而最终的画笔，始终握在你手中。
                </p>
              </div>
            </div>
          </div>

          {/* 页脚签名 */}
          <div
            className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] opacity-60"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span>Atelier Huajing</span>
            <span className="flex items-center gap-2">
              <span
                className="w-6 h-px"
                style={{ background: "currentColor" }}
              />
              MMXXVI
              <span
                className="w-6 h-px"
                style={{ background: "currentColor" }}
              />
            </span>
            <span className="italic">Nature morte</span>
          </div>
        </section>
      </div>
    </div>
  );
}
