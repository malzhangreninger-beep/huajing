"use client";

import { Trash2, Tag, Heart } from "lucide-react";
import type { JournalEntryData } from "./journal-content";

interface JournalEntryProps {
  entry: JournalEntryData;
  onDelete: () => void;
}

const moodLabels = ["", "低落", "一般", "平静", "愉悦", "兴奋"];
const moodColors = [
  "",
  "bg-gray-500",
  "bg-blue-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-rose-500",
];

export function JournalEntry({ entry, onDelete }: JournalEntryProps) {
  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(date));
  };

  const mood = entry.mood ?? 0;
  const firstFeedback = entry.journal_feedbacks?.[0];

  return (
    <article className="group canvas-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <time className="text-sm text-muted-foreground">
            {formatTime(entry.created_at)}
          </time>
          {entry.mood && (
            <>
              <span className="text-border">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 ${moodColors[mood]} text-white rounded-full p-0.5`} />
                <span className="text-xs text-muted-foreground">
                  {moodLabels[mood]}
                </span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
          aria-label="删除记录"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-foreground leading-relaxed mb-4 text-sm">
        {entry.content}
      </p>

      {firstFeedback && (
        <p className="mt-2 mb-4 text-[0.85rem] italic leading-relaxed text-[#a09173]">
          ✦ {firstFeedback.content}
        </p>
      )}

      {entry.image_urls?.[0] && (
        <div className="mb-4 rounded-lg overflow-hidden border border-border">
          <img
            src={entry.image_urls[0]}
            alt="附图"
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      {entry.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
