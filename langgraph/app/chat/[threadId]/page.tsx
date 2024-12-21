import { MyAssistant } from "@/components/MyAssistant";

export default function ChatPage({ params }: { params: { threadId: string } }) {
  return (
    <main className="h-screen overflow-hidden">
      <MyAssistant threadId={params.threadId} />
    </main>
  );
}
