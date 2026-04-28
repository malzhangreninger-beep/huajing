"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Sparkles,
  Palette,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    name: "创作日志",
    subtitle: "Journal",
    href: "/journal",
    icon: BookOpen,
  },
  {
    name: "灵感转换",
    subtitle: "Transform",
    href: "/transform",
    icon: Sparkles,
  },
  {
    name: "母题画廊",
    subtitle: "Themes",
    href: "/themes",
    icon: Palette,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 移动端按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-sm text-sidebar-foreground transition-colors"
        style={{
          background: "var(--sidebar)",
          border: "1.5px solid rgba(232, 224, 204, 0.2)",
        }}
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: "rgba(44, 32, 16, 0.5)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar —— 像画里左侧的深色颜料块 */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 z-40 transition-transform duration-700
          flex flex-col text-sidebar-foreground
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          /* 顶部和底部有微妙的颜料涂抹边界 */
          background: `
            linear-gradient(180deg,
              rgba(60, 44, 24, 1) 0%,
              rgba(44, 32, 16, 1) 12%,
              rgba(44, 32, 16, 1) 88%,
              rgba(36, 26, 12, 1) 100%
            ),
            radial-gradient(circle at 20% 30%, rgba(176, 114, 70, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(201, 176, 90, 0.05) 0%, transparent 60%)
          `,
          backgroundBlendMode: "overlay, normal, normal",
        }}
      >
        {/* 颜料肌理层 */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(232, 224, 204, 0.015) 0px,
                rgba(232, 224, 204, 0.015) 1px,
                transparent 1px,
                transparent 3px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(232, 224, 204, 0.015) 0px,
                rgba(232, 224, 204, 0.015) 1px,
                transparent 1px,
                transparent 3px
              )
            `,
          }}
        />

        {/* 右侧颜料涂抹边 —— 不是完美的矩形 */}
        <div
          className="absolute top-0 right-0 w-[2px] h-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: `linear-gradient(180deg,
              rgba(176, 114, 70, 0.4) 0%,
              rgba(44, 32, 16, 0.6) 30%,
              rgba(44, 32, 16, 0.6) 70%,
              rgba(201, 176, 90, 0.3) 100%
            )`,
          }}
        />

        {/* Logo */}
        <div
          className="relative p-6"
          style={{
            borderBottom: "2px solid rgba(232, 224, 204, 0.15)",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-11 h-11 flex items-center justify-center"
              style={{
                background: "var(--accent)",
                border: "1.5px solid rgba(232, 224, 204, 0.25)",
                borderRadius: "2px",
              }}
            >
              <span
                className="text-xl font-semibold"
                style={{ color: "var(--accent-foreground)" }}
              >
                画
              </span>
            </div>
            <div>
              <h1
                className="text-lg font-semibold transition-colors"
                style={{ color: "var(--sidebar-foreground)", letterSpacing: "0.05em" }}
              >
                画境
              </h1>
              <p
                className="text-[10px] uppercase tracking-[0.3em] italic mt-0.5"
                style={{ color: "rgba(232, 224, 204, 0.5)" }}
              >
                Atelier
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 p-4 space-y-1 overflow-y-auto">
          <p
            className="px-4 mb-3 text-[10px] uppercase tracking-[0.32em] italic"
            style={{ color: "rgba(232, 224, 204, 0.4)" }}
          >
            — Sections
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="relative flex items-center gap-3 px-4 py-3 transition-all duration-300"
                style={{
                  background: isActive
                    ? "rgba(232, 224, 204, 0.06)"
                    : "transparent",
                  color: isActive
                    ? "var(--sidebar-foreground)"
                    : "rgba(232, 224, 204, 0.7)",
                  borderRadius: "2px",
                }}
              >
                {/* 激活状态左侧颜料色条 */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-9"
                    style={{
                      background: "var(--sidebar-active)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.4} />
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-sm truncate"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-[10px] italic truncate uppercase tracking-[0.25em] mt-0.5"
                    style={{ color: "rgba(232, 224, 204, 0.45)" }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="relative p-4"
          style={{
            borderTop: "2px solid rgba(232, 224, 204, 0.15)",
          }}
        >
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="relative flex items-center gap-3 px-4 py-3 transition-all duration-300"
            style={{
              background: pathname === "/settings"
                ? "rgba(232, 224, 204, 0.06)"
                : "transparent",
              color: pathname === "/settings"
                ? "var(--sidebar-foreground)"
                : "rgba(232, 224, 204, 0.7)",
              borderRadius: "2px",
            }}
          >
            {pathname === "/settings" && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-9"
                style={{
                  background: "var(--sidebar-active)",
                  borderRadius: "0 2px 2px 0",
                }}
              />
            )}
            <Settings className="w-5 h-5" strokeWidth={1.4} />
            <span
              className="text-sm font-medium"
              style={{ letterSpacing: "0.05em" }}
            >
              设置
            </span>
          </Link>

          {/* 罗马数字签名 */}
          <p
            className="mt-4 px-4 text-[10px] uppercase tracking-[0.4em] italic text-center"
            style={{ color: "rgba(232, 224, 204, 0.3)" }}
          >
            — MMXXVI —
          </p>
        </div>
      </aside>
    </>
  );
}
