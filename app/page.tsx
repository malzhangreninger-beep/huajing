import { Header } from "@/components/header";
import { ChatContainer } from "@/components/chat-container";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <ChatContainer />
    </main>
  );
}
