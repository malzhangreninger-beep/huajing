import { Sidebar } from "@/components/sidebar";
import { HomeContent } from "@/components/home-content";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <HomeContent />
      </main>
    </div>
  );
}
