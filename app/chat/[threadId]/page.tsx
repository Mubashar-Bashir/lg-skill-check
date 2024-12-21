import { MyAssistant } from "@/components/MyAssistant";
import { Suspense } from "react";

export default function ChatPage({ params }: { params: { threadId: string } }) {
  const { threadId } = params;
  if (!threadId) {
    return null;
  }
  
  return (
    <main className="h-screen overflow-hidden">
      <Suspense>
        <MyAssistant threadId={threadId} />
      </Suspense>
    </main>
  );
}
