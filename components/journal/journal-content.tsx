"use client";

import { useEffect, useState, useTransition } from "react";
import { createJournal } from "@/app/actions/journal";
import { createClient } from "@/lib/supabase/client";
import { JournalEntry } from "./journal-entry";
import { JournalForm } from "./journal-form";
import { Plus, BookOpen } from "lucide-react";

export interface JournalEntryData {
  id: string;
  content: string;
  tags: string[];
  mood: number | null;
  image_urls: string[];
  created_at: string;
  journal_feedbacks?: Array<{
    id: string;
    type: string;
    content: string;
    metadata: Record<string, unknown>;
  }>;
}

export function JournalContent() {
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryData | null>(null);

  const fetchEntries = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("journals")
      .select("*, journal_feedbacks(*)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("读取日志失败:", error.message);
      setEntries([]);
    } else {
      setEntries((data ?? []) as JournalEntryData[]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchEntries();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleAddEntry = (entry: { content: string }) => {
    startTransition(async () => {
      try {
        await createJournal(entry.content);
        await fetchEntries();
        setIsFormOpen(false);
      } catch (error) {
        console.error("保存日志失败:", error);
      }
    });
  };

  const handleDeleteEntry = (id: string) => {
    console.log("删除功能待认证后完善");
    setEntries(entries.filter((entry) => entry.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  const tagCount = new Set(entries.flatMap((entry) => entry.tags ?? [])).size;
  const moodEntries = entries.filter((entry) => typeof entry.mood === "number");
  const averageMood =
    moodEntries.length > 0
      ? (
          moodEntries.reduce((sum, entry) => sum + (entry.mood ?? 0), 0) /
          moodEntries.length
        ).toFixed(1)
      : "-";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">创作日志</h1>
              <p className="text-sm text-muted-foreground">记录每日灵感碎片</p>
            </div>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">新记录</span>
          </button>
        </div>
      </header>

      <div className="p-6 lg:p-8">
        {isFormOpen && (
          <div className="mb-8 animate-slide-up">
            <JournalForm
              onSubmit={handleAddEntry}
              onCancel={() => setIsFormOpen(false)}
              isSubmitting={isPending}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">加载中...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              还没有任何记录
            </h3>
            <p className="text-muted-foreground mb-6">
              开始记录你的第一条创作灵感吧
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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

      {entries.length > 0 && (
        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-muted-foreground">
              共 <span className="text-foreground font-medium">{entries.length}</span>{" "}
              条记录
            </div>
            <div className="text-muted-foreground">
              <span className="text-foreground font-medium">{tagCount}</span> 个标签
            </div>
            <div className="text-muted-foreground">
              平均情绪{" "}
              <span className="text-foreground font-medium">{averageMood}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
