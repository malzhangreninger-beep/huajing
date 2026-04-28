import { Sidebar } from "@/components/sidebar";
import { ThemesContent } from "@/components/themes/themes-content";

export default function ThemesPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <ThemesContent />
      </main>
    </div>
  );
}
