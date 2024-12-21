"use client";

import { useRef, useState } from "react";
import { Thread } from "@assistant-ui/react";
import { useLangGraphRuntime } from "@assistant-ui/react-langgraph";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { getThreadState, sendMessage } from "@/lib/chatApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MarkdownText = makeMarkdownText();

interface MyAssistantProps {
  threadId: string;
}

export function MyAssistant({ threadId }: MyAssistantProps) {
  const threadIdRef = useRef<string>(threadId);

  const runtime = useLangGraphRuntime({
    threadId: threadIdRef.current,
    stream: async (messages) => {
      return sendMessage({
        threadId: threadIdRef.current,
        messages,
      });
    },
    onSwitchToNewThread: async () => {
      console.warn("Unexpected call to onSwitchToNewThread");
    },
    onSwitchToThread: async (newThreadId) => {
      const state = await getThreadState(newThreadId);
      threadIdRef.current = newThreadId;
      return { messages: state.values.messages };
    },
  });

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white shadow-md p-4 flex items-center">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          LangGraph Assistant
        </h1>
      </header>
      <main className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <Thread
            runtime={runtime}
            assistantMessage={{ components: { Text: MarkdownText } }}
          />
        </div>
      </main>
    </div>
  );
}
