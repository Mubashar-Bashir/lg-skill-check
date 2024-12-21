"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createThread } from "@/lib/chatApi";
import { Loader2 } from 'lucide-react';

export function ChatForm() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [quarter, setQuarter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { thread_id } = await createThread({
        metadata: {
          name,
          roll_number: rollNumber,
          quarter,
        },
      });
      router.push(`/chat/${thread_id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white"
      />
      <Input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
        className="bg-white"
      />
      <Select value={quarter} onValueChange={setQuarter} required>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select Quarter" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6].map((q) => (
            <SelectItem key={q} value={q.toString()}>
              Quarter {q}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Starting Assessment...
          </>
        ) : (
          'Start Assessment'
        )}
      </Button>
    </form>
  );
}

