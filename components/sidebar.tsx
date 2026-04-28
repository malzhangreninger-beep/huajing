"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sparkles, Palette, Home, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "首页", href: "/", icon: Home },
  { name: "创作日志", href: "/journal", icon: BookOpen },
  { name: "灵感转换", href: "/transform", icon: Sparkles },
  { name: "母题画廊", href: "/themes", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2"
        style={{
          background: "var(--sidebar)",
          color: "var(--sidebar-foreground)",
          border: "1px solid var(--sidebar-border)",
          borderRadius: "3px",
        }}
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 移动端遮罩 */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ background: "rgba(58, 52, 40, 0.4)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-[200px] h-screen
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "var(--sidebar)",
          color: "var(--sidebar-foreground)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        {/* Logo */}
        <div
          className="px-6 py-7"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <Link href="/" className="block" onClick={() => setIsOpen(false)}>
            <h1
              className="text-2xl font-semibold"
              style={{
                color: "var(--sidebar-foreground)",
                letterSpacing: "0.08em",
              }}
            >
              画境
            </h1>
            <p
              className="text-[10px] mt-1.5 italic"
              style={{
                color: "var(--muted-foreground)",
                letterSpacing: "0.2em",
              }}
            >
              huà jìng
            </p>
          </Link>
        </div>

        {/* 导航 */}
        <nav className="flex-1 px-3 py-6">
          <p
            className="px-3 mb-3 text-[10px] uppercase"
            style={{
              color: "var(--muted-foreground)",
              letterSpacing: "0.22em",
            }}
          >
            目录
          </p>
          <div className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm transition-colors"
                  style={{
                    background: isActive
                      ? "rgba(58, 52, 40, 0.08)"
                      : "transparent",
                    color: isActive
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                    borderLeft: isActive
                      ? "2px solid var(--foreground)"
                      : "2px solid transparent",
                    paddingLeft: "10px",
                    borderRadius: "2px",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  <span style={{ letterSpacing: "0.08em" }}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* 设置 + 签名 */}
        <div
          className="px-3 py-4"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-sm transition-colors"
            style={{
              color:
                pathname === "/settings"
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
              background:
                pathname === "/settings"
                  ? "rgba(58, 52, 40, 0.08)"
                  : "transparent",
              borderLeft:
                pathname === "/settings"
                  ? "2px solid var(--foreground)"
                  : "2px solid transparent",
              paddingLeft: "10px",
              borderRadius: "2px",
            }}
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            <span style={{ letterSpacing: "0.08em" }}>设置</span>
          </Link>

          <div
            className="mt-4 pt-4 px-3"
            style={{ borderTop: "1px solid var(--sidebar-border)" }}
          >
            <p
              className="text-[10px] italic"
              style={{
                color: "var(--muted-foreground)",
                letterSpacing: "0.18em",
              }}
            >
              Atelier · MMXXVI
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
