"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

type SkillLevel = "Green" | "Yellow" | "Red";

interface LangGraphSkillLevelProps {
  level: SkillLevel | string;
  timestamp: string;
}

export function LangGraphSkillLevel({ level, timestamp }: LangGraphSkillLevelProps) {
  const levelConfig: Record<SkillLevel, { color: string; icon: React.ReactNode; progress: number }> = {
    Green: { color: "bg-green-500", icon: <CheckCircle2 className="h-6 w-6 text-green-500" />, progress: 100 },
    Yellow: { color: "bg-yellow-500", icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />, progress: 50 },
    Red: { color: "bg-red-500", icon: <XCircle className="h-6 w-6 text-red-500" />, progress: 25 },
  };

  // Default fallback for unexpected level values
  const defaultConfig = { color: "bg-gray-500", icon: <HelpCircle className="h-6 w-6 text-gray-500" />, progress: 0 };

  const { color, icon, progress } = levelConfig[level as SkillLevel] || defaultConfig;

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-700">Agentic AI Level</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`text-sm px-2 py-1 ${color} text-white font-medium`}>{level}</Badge>
          {icon}
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <p className="text-sm text-gray-500 mt-2">
          Last evaluated: {new Date(timestamp).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}

