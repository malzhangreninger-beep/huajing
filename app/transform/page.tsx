import { Sidebar } from "@/components/sidebar";
import { TransformContent } from "@/components/transform/transform-content";

export default function TransformPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TransformContent />
      </main>
    </div>
  );
}
