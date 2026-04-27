"use client";

import type { JournalEntryData } from "./journal-content";
import { JournalEntry } from "./journal-entry";

interface JournalListProps {
  entries: JournalEntryData[];
  onDelete: (id: string) => void;
}

export function JournalList({ entries, onDelete }: JournalListProps) {
  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    const dateKey = new Date(entry.created_at).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
    });
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(entry);
    return groups;
  }, {} as Record<string, JournalEntryData[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <section key={date}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {date}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dateEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onDelete={() => onDelete(entry.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
