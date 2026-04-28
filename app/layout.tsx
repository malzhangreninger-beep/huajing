import type { Metadata, Viewport } from "next";
import { Noto_Serif_SC, Geist_Mono } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "画境 - AI 创作伴侣",
  description:
    "一个为艺术创作者服务的 AI 创作伴侣，通过向内挖掘个人母题和向外转化跨媒介输入，帮助创作者找回和深化自己的艺术语言。",
  keywords: ["AI", "艺术", "创作", "灵感", "绘画", "油画", "创作伴侣"],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSerifSC.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex font-sans">{children}</body>
    </html>
  );
}
