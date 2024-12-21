"use client";

import { useRef } from "react";
import { SuggestionConfig, Thread } from "@assistant-ui/react";
import { useLangGraphRuntime } from "@assistant-ui/react-langgraph";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import { getThreadState, sendMessage } from "@/lib/chatApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LangGraphSkillLevelTool } from "@/components/lang-graph-skill-level-tool";
import { ToolFallback } from "@/components/tools/ToolFallback";

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
        <h1 className="text-2xl font-bold text-zinc-800">
          LangGraph Level Check
        </h1>
      </header>
      <main className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <Thread
            tools={[LangGraphSkillLevelTool]}
            userMessage={{ allowEdit: false }}
            assistantAvatar={{
              src: "https://panaverse-dao-five.vercel.app/_next/image?url=%2Fpanaverse-logo.png&w=128&q=75",
            }}
            runtime={runtime}
            welcome={{
              message: "What is your current LangGraph level?",
              suggestions: [
                { prompt: "I am on red level", text: "RED LEVEL" },
                { prompt: "I am on yellow level", text: "YELLOW LEVEL" },
                { prompt: "I am on green level", text: "GREEN LEVEL" },
              ],
            }}
            assistantMessage={{ components: { Text: MarkdownText, ToolFallback } }}
          />
        </div>
      </main>
    </div>
  );
}
