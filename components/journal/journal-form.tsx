"use client";

import { useState } from "react";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import type { JournalEntryData } from "./journal-content";

interface JournalFormProps {
  onSubmit: (entry: Pick<JournalEntryData, "content" | "tags" | "mood">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const moodOptions = [
  { value: 1, label: "低落", emoji: "1" },
  { value: 2, label: "一般", emoji: "2" },
  { value: 3, label: "平静", emoji: "3" },
  { value: 4, label: "愉悦", emoji: "4" },
  { value: 5, label: "兴奋", emoji: "5" },
];

const suggestedTags = [
  "光影", "色彩", "构图", "静物", "人物", "风景",
  "情绪", "孤独", "温暖", "时间", "记忆", "梦境",
];

export function JournalForm({ onSubmit, onCancel, isSubmitting = false }: JournalFormProps) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [mood, setMood] = useState(3);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      tags,
      mood,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">新的灵感记录</h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          今天有什么灵感想记录？
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="看到的、想到的、感受到的...任何创作相关的碎片都可以"
          className="w-full h-32 px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Mood Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          当前创作状态
        </label>
        <div className="flex items-center gap-2">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMood(option.value)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${
                  mood === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          标签
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(tagInput);
              }
            }}
            placeholder="输入标签后按回车"
            className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
          <button
            type="button"
            onClick={() => handleAddTag(tagInput)}
            disabled={!tagInput.trim()}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Tags */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">快速添加：</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedTags
              .filter((tag) => !tags.includes(tag))
              .slice(0, 8)
              .map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="px-2.5 py-1 text-xs bg-secondary text-muted-foreground rounded-full hover:text-foreground hover:bg-secondary/80 transition-colors"
                >
                  + {tag}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "保存中..." : "保存记录"}
        </button>
      </div>
    </form>
  );
}
