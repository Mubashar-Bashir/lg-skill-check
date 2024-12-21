import { MyAssistant } from "@/components/MyAssistant";
import { Suspense } from "react";

export default async function ChatPage(props: { params: Promise<{ threadId: string }> }) {
  const params = await props.params;
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
