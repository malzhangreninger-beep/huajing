"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import { Fragment } from "react";

const features = [
  {
    num: "01",
    title: "创作日志",
    desc: "记录每天的图像、句子、梦、情绪，珍藏稍纵即逝的灵感。",
    href: "/journal",
    cta: "进入日志",
    img: "/images/card-journal.jpg",
  },
  {
    num: "02",
    title: "灵感转换",
    desc: "把诗歌、记忆、概念转成可视化的创作方案与草图。",
    href: "/transform",
    cta: "开始转换",
    img: "/images/card-transform.jpg",
  },
  {
    num: "03",
    title: "母题画廊",
    desc: "看见反复出现的意象、情绪，发掘属于你的艺术语言。",
    href: "/themes",
    cta: "探索画廊",
    img: "/images/card-themes.jpg",
  },
];

const workflow = [
  { label: "收集灵感", img: "/images/workflow-1.jpg" },
  { label: "提炼关键词", img: "/images/workflow-2.jpg" },
  { label: "灵感转换", img: "/images/workflow-3.jpg" },
  { label: "构图方案", img: "/images/workflow-4.jpg" },
  { label: "色彩方案", img: "/images/workflow-5.jpg" },
  { label: "创作草图", img: "/images/workflow-6.jpg" },
];

const tags = ["光", "窗边", "静物", "温暖", "记忆", "蓝色"];

export function HomeContent() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-24">
      {/* === HERO === */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 lg:pt-14 pb-16 paint-in">
        {/* 左：标题 + CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1
            className="text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.16] font-semibold tracking-tight mb-7"
            style={{ color: "var(--foreground)" }}
          >
            让 AI 陪你
            <br />
            看见自己的
            <br />
            艺术语言
          </h1>
          <p
            className="text-[15px] leading-[1.95] mb-9 max-w-md"
            style={{ color: "var(--foreground)", opacity: 0.78 }}
          >
            <span className="font-semibold">画境</span> 是你的 AI 创作伴侣，
            <br />
            帮助你记录灵感、提炼母题、转化创作方向，
            <br />
            让每一次创作，都更靠近你想表达的自己。
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-7">
            <Link href="/journal" className="btn-primary">
              开始记录灵感
            </Link>
            <Link href="/transform" className="btn-outline">
              体验灵感转换
            </Link>
          </div>

          <button
            type="button"
            className="flex items-center gap-3 text-sm tracking-[0.12em] hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                border: "1px solid var(--muted-foreground)",
              }}
            >
              <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
            </span>
            观看 2 分钟介绍
          </button>
        </div>

        {/* 右：油画 hero —— 包裹一些悬浮标签像 mood board */}
        <div className="lg:col-span-7 relative">
          <div
            className="relative aspect-[16/11] overflow-hidden painted-thumb"
            style={{ borderRadius: "4px" }}
          >
            <Image
              src="/images/hero-still-life.jpg"
              alt="油画静物 —— 创作伴侣的灵感空间"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* 悬浮的灵感卡片 */}
            <div
              className="hidden md:block absolute top-6 right-8 px-4 py-3 max-w-[180px]"
              style={{
                background: "rgba(240, 233, 214, 0.92)",
                border: "1px solid rgba(58, 48, 37, 0.15)",
                borderRadius: "3px",
              }}
            >
              <p
                className="text-[10px] tracking-[0.2em] mb-1.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                灵感片段
              </p>
              <p
                className="text-[13px] leading-[1.65] italic"
                style={{ color: "var(--foreground)" }}
              >
                "清晨的窗台上，光穿过玻璃瓶。"
              </p>
            </div>

            {/* 色彩方案标签 */}
            <div
              className="hidden md:flex absolute bottom-6 right-8 gap-1.5 p-2"
              style={{
                background: "rgba(240, 233, 214, 0.92)",
                border: "1px solid rgba(58, 48, 37, 0.15)",
                borderRadius: "3px",
              }}
            >
              {[
                "var(--tone-sage)",
                "var(--tone-mustard)",
                "var(--tone-clay)",
                "var(--tone-ink)",
                "var(--tone-rose)",
              ].map((c, i) => (
                <span
                  key={i}
                  className="block w-5 h-5"
                  style={{ background: c, borderRadius: "2px" }}
                />
              ))}
            </div>

            {/* 底部小贴纸 */}
            <div
              className="hidden md:block absolute bottom-6 left-8 px-3 py-1.5 text-[10px] italic tracking-[0.18em]"
              style={{
                background: "rgba(31, 49, 71, 0.9)",
                color: "var(--primary-foreground)",
                borderRadius: "2px",
              }}
            >
              MOOD BOARD · 04.28
            </div>
          </div>
        </div>
      </section>

      {/* === 三张功能卡 === */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 paint-in">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group block"
          >
            <article className="frame relative overflow-hidden p-5 lg:p-6 h-full transition-opacity duration-500 group-hover:opacity-95">
              <div className="flex gap-4 lg:gap-5">
                <div className="flex-1 min-w-0 flex flex-col">
                  <div
                    className="text-[12px] italic tracking-[0.4em] mb-2.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {f.num}
                  </div>
                  <h3
                    className="text-[22px] lg:text-2xl font-semibold mb-3 tracking-wide"
                    style={{ color: "var(--foreground)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[13.5px] leading-[1.85] mb-6 flex-1"
                    style={{ color: "var(--foreground)", opacity: 0.78 }}
                  >
                    {f.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-[13px] tracking-[0.14em] transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--accent)" }}
                  >
                    {f.cta} <span>→</span>
                  </span>
                </div>

                {/* 油画缩略图 */}
                <div
                  className="relative w-[88px] h-[88px] lg:w-[112px] lg:h-[112px] flex-shrink-0 painted-thumb"
                >
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {/* === 底部双栏 === */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 paint-in">
        {/* 今日创作片段 */}
        <div className="lg:col-span-5 frame p-6 lg:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="block w-1 h-5"
              style={{ background: "var(--tone-sage)" }}
            />
            <h3
              className="text-[17px] font-semibold tracking-[0.08em]"
              style={{ color: "var(--foreground)" }}
            >
              今日创作片段
            </h3>
          </div>

          <p
            className="text-[18px] leading-[1.85] mb-3"
            style={{ color: "var(--foreground)", fontStyle: "italic" }}
          >
            <span className="text-2xl align-middle mr-1" style={{ color: "var(--accent)" }}>"</span>
            一杯水，半本书，
            <br />
            午后的光线很慢。
            <span className="text-2xl align-middle ml-0.5" style={{ color: "var(--accent)" }}>"</span>
          </p>
          <p
            className="text-[11px] tracking-[0.2em] mb-7"
            style={{ color: "var(--muted-foreground)" }}
          >
            记录于 2026.04.28 14:10
          </p>

          {/* 情绪曲线图 */}
          <div className="mb-7">
            <div
              className="text-[11px] tracking-[0.22em] mb-3"
              style={{ color: "var(--muted-foreground)" }}
            >
              情绪曲线
            </div>
            <MoodChart />
          </div>

          {/* 高频词 */}
          <div className="mb-7">
            <div
              className="text-[11px] tracking-[0.22em] mb-3"
              style={{ color: "var(--muted-foreground)" }}
            >
              高频词
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-[13px] tracking-wider"
                  style={{
                    background: "var(--secondary)",
                    color: "var(--foreground)",
                    borderRadius: "2px",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-auto">
            <Link
              href="/journal"
              className="btn-primary py-2.5 px-5 text-[13px]"
            >
              继续记录
            </Link>
            <Link
              href="/journal"
              className="text-[13px] tracking-[0.14em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              回顾全部 →
            </Link>
          </div>
        </div>

        {/* 工作流示例 */}
        <div className="lg:col-span-7 frame p-6 lg:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-7">
            <span
              className="block w-1 h-5"
              style={{ background: "var(--tone-ochre)" }}
            />
            <h3
              className="text-[17px] font-semibold tracking-[0.08em]"
              style={{ color: "var(--foreground)" }}
            >
              艺术家工作流示例
            </h3>
          </div>

          {/* 工作流 6 步 */}
          <div className="flex items-start justify-between gap-1 lg:gap-2 mb-7">
            {workflow.map((w, i) => (
              <Fragment key={w.label}>
                <div className="flex flex-col items-center gap-2.5 flex-1 min-w-0">
                  <div className="relative w-full aspect-[3/4] painted-thumb">
                    <Image
                      src={w.img}
                      alt={w.label}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                  <p
                    className="text-[12px] tracking-[0.06em] text-center"
                    style={{ color: "var(--foreground)" }}
                  >
                    {w.label}
                  </p>
                </div>
                {i < workflow.length - 1 && (
                  <span
                    className="flex-shrink-0 text-base mt-12 lg:mt-16 select-none"
                    style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 mt-auto"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              className="text-[13.5px] italic"
              style={{ color: "var(--muted-foreground)" }}
            >
              以你的方式开始，没有标准答案。
            </p>
            <Link
              href="/transform"
              className="text-[13px] tracking-[0.14em] inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              查看完整工作流 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== 极简情绪曲线 SVG ===== */
function MoodChart() {
  // 5 个时刻 (0/6/12/18/24时) 的情绪点 —— 轴 y 越小越开心
  const points: Array<[number, number]> = [
    [30, 60],
    [85, 22],
    [140, 48],
    [195, 18],
    [250, 50],
  ];
  const polyPoints = points.map((p) => p.join(",")).join(" ");
  const xLabels = ["0时", "6时", "12时", "18时", "24时"];
  const xPositions = [22, 75, 130, 185, 240];

  return (
    <svg
      viewBox="0 0 270 92"
      className="w-full h-auto"
      preserveAspectRatio="none"
      role="img"
      aria-label="情绪曲线图"
    >
      {/* 横向参考虚线 */}
      {[20, 40, 60].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2="260"
          y2={y}
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
      ))}

      {/* 左侧情绪刻度（小圆 + 表情符号） */}
      <g transform="translate(8, 0)">
        <circle cx="0" cy="20" r="3.5" fill="none" stroke="var(--muted-foreground)" strokeWidth="0.6" />
        <path d="M -1.5 19 q 1.5 -1.6 3 0" stroke="var(--muted-foreground)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <circle cx="-0.7" cy="18.3" r="0.4" fill="var(--muted-foreground)" />
        <circle cx="0.7" cy="18.3" r="0.4" fill="var(--muted-foreground)" />

        <circle cx="0" cy="40" r="3.5" fill="none" stroke="var(--muted-foreground)" strokeWidth="0.6" />
        <line x1="-1.4" y1="40.6" x2="1.4" y2="40.6" stroke="var(--muted-foreground)" strokeWidth="0.6" strokeLinecap="round" />
        <circle cx="-0.7" cy="38.7" r="0.4" fill="var(--muted-foreground)" />
        <circle cx="0.7" cy="38.7" r="0.4" fill="var(--muted-foreground)" />

        <circle cx="0" cy="60" r="3.5" fill="none" stroke="var(--muted-foreground)" strokeWidth="0.6" />
        <path d="M -1.5 61 q 1.5 1.6 3 0" stroke="var(--muted-foreground)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <circle cx="-0.7" cy="58.7" r="0.4" fill="var(--muted-foreground)" />
        <circle cx="0.7" cy="58.7" r="0.4" fill="var(--muted-foreground)" />
      </g>

      {/* 折线 */}
      <polyline
        points={polyPoints}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 节点 */}
      {points.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.5"
          fill="var(--primary)"
        />
      ))}

      {/* x 轴标签 */}
      {xLabels.map((label, i) => (
        <text
          key={label}
          x={xPositions[i]}
          y="86"
          fontSize="7.5"
          fill="var(--muted-foreground)"
          letterSpacing="0.1"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
