"use client";

import { Brush, Mountain, Flower2, Moon, Waves, Palette } from "lucide-react";

interface InspirationCard {
  icon: React.ReactNode;
  title: string;
  prompt: string;
  gradient: string;
}

const inspirations: InspirationCard[] = [
  {
    icon: <Mountain className="w-6 h-6" />,
    title: "山水意境",
    prompt:
      "我想创作一幅山水画，希望表达空灵、悠远的意境，请给我一些创作建议和参考",
    gradient: "from-emerald-900/20 to-teal-900/10",
  },
  {
    icon: <Flower2 className="w-6 h-6" />,
    title: "花卉静物",
    prompt:
      "我想画一组花卉静物，希望有一种古典油画的质感，请推荐合适的构图和色彩搭配",
    gradient: "from-rose-900/20 to-pink-900/10",
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "夜景氛围",
    prompt: "我想描绘一个充满诗意的夜景场景，请帮我构思画面元素和光影效果",
    gradient: "from-indigo-900/20 to-violet-900/10",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "抽象表达",
    prompt: "我想尝试抽象表现主义风格，用色彩和线条表达情绪，请给我一些创作思路",
    gradient: "from-blue-900/20 to-cyan-900/10",
  },
  {
    icon: <Brush className="w-6 h-6" />,
    title: "人物肖像",
    prompt:
      "我想创作一幅富有表现力的人物肖像画，请给我一些关于构图、光影和表情捕捉的建议",
    gradient: "from-amber-900/20 to-orange-900/10",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "色彩实验",
    prompt:
      "我想进行一次大胆的色彩实验，探索非传统的配色方案，请给我一些灵感和参考艺术家",
    gradient: "from-fuchsia-900/20 to-purple-900/10",
  },
];

interface InspirationCardsProps {
  onSelect: (prompt: string) => void;
}

export function InspirationCards({ onSelect }: InspirationCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inspirations.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item.prompt)}
          className={`group relative p-6 rounded-xl border border-border/50 bg-gradient-to-br ${item.gradient} hover:border-primary/30 transition-all duration-300 text-left overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-card/80 border border-border/50 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              点击获取{item.title}相关的创作灵感
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
