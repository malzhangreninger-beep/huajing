"use client";

import { useState } from "react";
import { JournalEntry } from "./journal-entry";
import { JournalForm } from "./journal-form";
import { JournalList } from "./journal-list";
import { Plus, BookOpen } from "lucide-react";

export interface JournalEntryData {
  id: string;
  content: string;
  tags: string[];
  mood: number;
  imageUrl?: string;
  createdAt: Date;
}

// 模拟数据，后续可以连接数据库
const mockEntries: JournalEntryData[] = [
  {
    id: "1",
    content: "今天在窗边看到一束光线穿过玻璃杯，折射出彩虹的颜色。让我想起莫奈画中的光影变化。",
    tags: ["光影", "窗", "静物"],
    mood: 4,
    createdAt: new Date("2024-04-23"),
  },
  {
    id: "2",
    content: "读了里尔克的《秋日》，那种孤独的氛围很打动我。想尝试用冷灰色调来表达这种感觉。",
    tags: ["诗歌", "孤独", "秋天"],
    mood: 3,
    createdAt: new Date("2024-04-22"),
  },
  {
    id: "3",
    content: "在公园散步时看到老人坐在长椅上，背影让我想到时间的流逝。也许可以画一个系列关于「等待」的主题。",
    tags: ["背影", "时间", "等待"],
    mood: 4,
    createdAt: new Date("2024-04-21"),
  },
];

export function JournalContent() {
  const [entries, setEntries] = useState<JournalEntryData[]>(mockEntries);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryData | null>(null);

  const handleAddEntry = (entry: Omit<JournalEntryData, "id" | "createdAt">) => {
    const newEntry: JournalEntryData = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setEntries([newEntry, ...entries]);
    setIsFormOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b-2 border-foreground">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-primary border-2 border-foreground">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">创作日志</h1>
              <p className="text-sm text-muted-foreground">记录每日灵感碎片</p>
            </div>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground border-2 border-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">新记录</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {isFormOpen && (
          <div className="mb-8 animate-slide-up">
            <JournalForm
              onSubmit={handleAddEntry}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        )}

        {entries.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary border-2 border-foreground flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              还没有任何记录
            </h3>
            <p className="text-muted-foreground mb-6">
              开始记录你的第一条创作灵感吧
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground border-2 border-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>写下第一条</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <JournalEntry
                  entry={entry}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {entries.length > 0 && (
        <div className="sticky bottom-0 bg-card border-t-2 border-foreground px-6 py-4">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-muted-foreground">
              共 <span className="text-foreground font-medium">{entries.length}</span> 条记录
            </div>
            <div className="text-muted-foreground">
              <span className="text-foreground font-medium">
                {new Set(entries.flatMap((e) => e.tags)).size}
              </span>{" "}
              个标签
            </div>
            <div className="text-muted-foreground">
              平均情绪{" "}
              <span className="text-foreground font-medium">
                {(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
