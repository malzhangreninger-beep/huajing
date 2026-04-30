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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground hover:bg-secondary transition-colors"
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#E8E2D5] border-r border-r-[#C8C2B8]
          flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b-[3px] border-b-[#1A1208]">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 bg-[#B5A898] flex items-center justify-center">
              <span className="text-[#F0ECD8] text-xl font-semibold">画</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#2C2620] transition-colors">
                画境
              </h1>
              <p className="text-xs text-[rgba(240,236,216,0.6)]">AI 创作伴侣</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 border-l-4 transition-all duration-200
                  ${
                    isActive
                      ? "border-l-[#8E8478] bg-[rgba(196,132,60,0.15)] text-[#2C2620] font-medium"
                      : "border-l-transparent text-[#5C5448] hover:text-[#2C2620]"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-base truncate">{item.name}</p>
                  <p className="text-xs opacity-60 truncate">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-t-[#1A1208]">
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className={`
              flex items-center gap-3 px-4 py-3 border-l-4 transition-all duration-200
              ${
                pathname === "/settings"
                  ? "border-l-[#8E8478] bg-[rgba(196,132,60,0.15)] text-[#2C2620] font-medium"
                  : "border-l-transparent text-[#5C5448] hover:text-[#2C2620]"
              }
            `}
          >
            <Settings className="w-5 h-5" />
            <span className="text-base">设置</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
