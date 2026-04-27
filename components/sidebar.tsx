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
    href: "/journal",
    icon: BookOpen,
    description: "记录每日灵感碎片",
  },
  {
    name: "灵感转换",
    href: "/transform",
    icon: Sparkles,
    description: "跨媒介创作方案",
  },
  {
    name: "母题画廊",
    href: "/themes",
    icon: Palette,
    description: "发现你的艺术语言",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-sidebar border-2 border-sidebar text-sidebar-foreground hover:bg-sidebar/90 transition-colors"
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground
          flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b-2 border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-semibold">
                画
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground group-hover:text-primary transition-colors">
                画境
              </h1>
              <p className="text-xs text-sidebar-foreground/60">AI 创作伴侣</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded transition-all duration-200
                  ${
                    isActive
                      ? "bg-sidebar-foreground/5 text-sidebar-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
                  }
                `}
              >
                {/* 激活状态左侧绿色色条 */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-active rounded-r" />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs opacity-60 truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-sidebar-border">
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded transition-all duration-200
              ${
                pathname === "/settings"
                  ? "bg-sidebar-foreground/5 text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
              }
            `}
          >
            {pathname === "/settings" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-active rounded-r" />
            )}
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">设置</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
