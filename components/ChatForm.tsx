"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createThread } from "@/lib/chatApi";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export function ChatForm() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [quarter, setQuarter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    rollNumber: "",
    githubLink: "",
    quarter: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Reset form errors when inputs change
    setFormErrors({
      name: "",
      rollNumber: "",
      githubLink: "",
      quarter: "",
    });
  }, [name, rollNumber, githubLink, quarter]);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      rollNumber: "",
      githubLink: "",
      quarter: "",
    };

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!rollNumber.trim()) {
      errors.rollNumber = "Roll number is required";
      isValid = false;
    }

    if (!githubLink.trim()) {
      errors.githubLink = "GitHub link is required";
      isValid = false;
    } else if (!/^https:\/\/github\.com\/[^/]+\/?$/.test(githubLink)) {
      errors.githubLink = "Invalid GitHub profile URL";
      isValid = false;
    }

    if (!quarter) {
      errors.quarter = "Quarter selection is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");
    try {
      const { thread_id } = await createThread({
        metadata: {
          name,
          roll_number: rollNumber,
          github_link: githubLink,
          quarter,
        },
      });
      router.push(`/chat/${thread_id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-200">
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="rollNumber"
          className="text-sm font-medium text-gray-200"
        >
          PIAIC Roll Number
        </Label>
        <Input
          id="rollNumber"
          type="text"
          placeholder="e.g., PIAIC12345"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
        />
        {formErrors.rollNumber && (
          <p className="text-red-500 text-xs mt-1">{formErrors.rollNumber}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="githubLink"
          className="text-sm font-medium text-gray-200"
        >
          GitHub Profile
        </Label>
        <Input
          id="githubLink"
          type="url"
          placeholder="https://github.com/yourusername"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
        />
        {formErrors.githubLink && (
          <p className="text-red-500 text-xs mt-1">{formErrors.githubLink}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="quarter" className="text-sm font-medium text-gray-200">
          Current Quarter
        </Label>
        <Select value={quarter} onValueChange={setQuarter} required>
          <SelectTrigger
            id="quarter"
            className="bg-white/10 border-white/20 text-white"
          >
            <SelectValue placeholder="Select your quarter" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-white/20">
            {[1, 2, 3, 4, 5, 6].map((q) => (
              <SelectItem
                key={q}
                value={q.toString()}
                className="text-white hover:bg-white/20"
              >
                Quarter {q}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formErrors.quarter && (
          <p className="text-red-500 text-xs mt-1">{formErrors.quarter}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
        disabled={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Starting Assessment...</span>
          </>
        ) : (
          "Start Assessment"
        )}
      </Button>
    </form>
  );
}
