"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "创作日志", href: "/journal" },
  { label: "灵感转换", href: "/transform" },
  { label: "母题画廊", href: "/themes" },
  { label: "关于", href: "/settings" },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav
      className="relative z-20 w-full"
      style={{ borderBottom: "1px solid rgba(58, 48, 37, 0.12)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 group">
          <span
            className="text-2xl font-semibold tracking-[0.18em]"
            style={{ color: "var(--foreground)" }}
          >
            画
          </span>
          <span
            className="text-2xl font-semibold tracking-[0.18em]"
            style={{ color: "var(--foreground)" }}
          >
            境
          </span>
        </Link>

        {/* 中部菜单 */}
        <div className="hidden md:flex items-center gap-9 lg:gap-12">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] tracking-[0.12em] transition-opacity"
                style={{
                  color: isActive ? "var(--accent)" : "var(--foreground)",
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* 主 CTA */}
        <Link href="/journal" className="btn-primary py-2.5 px-5 text-[14px]">
          开始创作
        </Link>
      </div>
    </nav>
  );
}
