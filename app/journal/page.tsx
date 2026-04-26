import { Sidebar } from "@/components/sidebar";
import { JournalContent } from "@/components/journal/journal-content";

export default function JournalPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <JournalContent />
      </main>
    </div>
  );
}
