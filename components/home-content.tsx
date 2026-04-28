"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Palette } from "lucide-react";

const features = [
  {
    title: "创作日志",
    subtitle: "Journal",
    number: "I",
    description:
      "记录每日灵感碎片——看到的、想到的、感受到的。AI 会帮你发现反复出现的母题与意象。",
    icon: BookOpen,
    href: "/journal",
    paint: "var(--primary)",
    paintFg: "var(--primary-foreground)",
  },
  {
    title: "灵感转换",
    subtitle: "Transform",
    number: "II",
    description:
      "输入一首诗、一段记忆、一个概念，获得构图建议、色调方案、美术史参考。",
    icon: Sparkles,
    href: "/transform",
    paint: "var(--accent)",
    paintFg: "var(--accent-foreground)",
  },
  {
    title: "母题画廊",
    subtitle: "Themes",
    number: "III",
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
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* 顶部芥末黄色块 —— 像画里上方的暖背景 */}
        <div
          className="absolute top-0 left-0 right-0 h-[340px]"
          style={{
            background: "var(--quote-bg)",
            opacity: 0.18,
            clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 92%)",
          }}
        />
        {/* 右上雾蓝灰色块 —— 像桌沿 */}
        <div
          className="absolute top-[60px] right-0 w-[42%] h-[360px]"
          style={{
            background: "var(--tertiary)",
            opacity: 0.16,
            clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 88%)",
          }}
        />
        {/* 左下鼠尾草绿 —— 像画里桌面 */}
        <div
          className="absolute bottom-0 left-0 w-[58%] h-[420px]"
          style={{
            background: "var(--primary)",
            opacity: 0.18,
            clipPath: "polygon(0 18%, 100% 8%, 92% 100%, 0 100%)",
          }}
        />
        {/* 右下藕粉色块 —— 像画里花卉处 */}
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[300px]"
          style={{
            background: "var(--quaternary)",
            opacity: 0.14,
            clipPath: "polygon(15% 22%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        {/* 中央微微一点宝蓝 —— 像画里偶尔的深蓝点缀 */}
        <div
          className="absolute bottom-[120px] left-[30%] w-[80px] h-[80px] rounded-full"
          style={{
            background: "var(--royal)",
            opacity: 0.06,
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-14 lg:px-16 lg:py-20">
        {/* Hero —— 像画的左侧标签 */}
        <header className="max-w-5xl mx-auto mb-20 animate-paint-in">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-3 mb-7 text-[11px] tracking-[0.32em] uppercase italic"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="block w-8 h-px"
                style={{ background: "rgba(44, 32, 16, 0.4)" }}
              />
              Atelier · MMXXVI
            </div>
            <h1
              className="text-5xl lg:text-7xl leading-[1.02] tracking-tight mb-6 font-bold"
              style={{ color: "var(--foreground)" }}
            >
              欢迎来到
              <br />
              <span style={{ color: "var(--accent)" }}>画</span>
              <span style={{ color: "var(--accent)" }}>境</span>
            </h1>
            <p
              className="italic text-lg lg:text-xl mb-6 opacity-70"
              style={{ color: "var(--muted-foreground)", letterSpacing: "0.05em" }}
            >
              Nature morte · 一幅未完成的静物
            </p>
            <p
              className="text-base lg:text-lg leading-[1.85] max-w-xl"
              style={{ color: "var(--foreground)", opacity: 0.78 }}
            >
              一个为艺术创作者服务的 AI 创作伴侣。通过「向内挖掘」与「向外转化」，
              帮你找回并深化自己的艺术语言。
            </p>
          </div>
        </header>

        {/* 三件物品 */}
        <section className="max-w-6xl mx-auto mb-28">
          <div className="flex items-baseline justify-between mb-10 px-1">
            <div className="flex items-center gap-4">
              <span
                className="block w-10 h-px"
                style={{ background: "rgba(44, 32, 16, 0.4)" }}
              />
              <h2
                className="text-[11px] uppercase tracking-[0.36em] italic"
                style={{ color: "var(--muted-foreground)" }}
              >
                Trois objets · 三件物品
              </h2>
            </div>
            <span
              className="hidden sm:inline text-[11px] italic opacity-50 tracking-[0.3em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              n° I — III
            </span>
          </div>

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
                    {/* 角落的颜料色斑 —— 像画里物体接触面的颜色反射 */}
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
                      {/* 罗马数字编号 */}
                      <div className="flex items-baseline justify-between mb-8">
                        <span
                          className="text-xs tracking-[0.4em] italic"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          n° {feature.number}
                        </span>
                      </div>

                      {/* 图标 —— 像画里物体的速写 */}
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
                        className="text-2xl font-semibold mb-1"
                        style={{ color: "var(--foreground)" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-xs italic mb-5 tracking-[0.18em] uppercase opacity-60"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        — {feature.subtitle}
                      </p>
                      <p
                        className="text-[15px] leading-[1.85]"
                        style={{ color: "var(--foreground)", opacity: 0.78 }}
                      >
                        {feature.description}
                      </p>

                      {/* 笔触感底部分隔 + 进入 */}
                      <div
                        className="mt-8 pt-5 flex items-center justify-between"
                        style={{
                          borderTop: "2px solid rgba(44, 32, 16, 0.25)",
                        }}
                      >
                        <span
                          className="text-[11px] uppercase tracking-[0.32em] italic"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          Entrer
                        </span>
                        <span
                          className="text-lg transition-transform duration-500 group-hover:translate-x-1"
                          style={{ color: feature.paint }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 设计理念 —— 像画框右下角的小段题字 */}
        <section
          className="max-w-3xl mx-auto animate-paint-in"
          style={{ animationDelay: "800ms" }}
        >
          <div className="px-2 py-12">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-32 flex-shrink-0 flex md:flex-col items-center md:items-start gap-3">
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.36em] italic"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Slow · Art
                </span>
              </div>

              <div className="flex-1">
                <h3
                  className="text-2xl lg:text-3xl font-semibold mb-6 leading-[1.4]"
                  style={{ color: "var(--foreground)" }}
                >
                  不生成图像，<br />
                  而是激发<span style={{ color: "var(--accent)" }}>创作</span>。
                </h3>
                <p
                  className="text-[15px] lg:text-base leading-[1.95]"
                  style={{ color: "var(--foreground)", opacity: 0.75 }}
                >
                  画境不同于 AI 生图工具。我们相信，真正的艺术创作来自于你自己的感受与思考。
                  AI 的角色是帮助你「看见自己」——发现你反复出现的母题，
                  将外部的诗歌、音乐、记忆转化为可执行的创作方案，
                  而最终的画笔，始终握在你手中。
                </p>
              </div>
            </div>
          </div>

          {/* 页脚签名 —— 像画家在画布右下角的小字 */}
          <div
            className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.4em] italic"
            style={{ color: "var(--muted-foreground)", opacity: 0.55 }}
          >
            <span>Atelier Huajing</span>
            <span className="flex items-center gap-3">
              <span
                className="block w-8 h-px"
                style={{ background: "currentColor" }}
              />
              <span>MMXXVI</span>
              <span
                className="block w-8 h-px"
                style={{ background: "currentColor" }}
              />
            </span>
            <span>Nature morte</span>
          </div>
        </section>
      </div>
    </div>
  );
}
