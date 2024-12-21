"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { LangGraphSkillLevel } from "./lang-graph-skill-level";

type LangGraphSkillLevelToolArgs = {
  user_langgraph_skill_level: "Green" | "Yellow" | "Red";
};

export const LangGraphSkillLevelTool = makeAssistantToolUI<
  LangGraphSkillLevelToolArgs,
  undefined
>({
  toolName: "save_final_langgraph_skill_level",
  render: function LangGraphSkillLevelUI({ args }) {
    console.log("FOR DEBUGGING:", args);
    return (
      <div className="my-2 flex flex-col items-center gap-2">
        <p className="text-sm">
          Identified Level: <strong>{args.user_langgraph_skill_level}</strong>
        </p>
        <LangGraphSkillLevel
          level={args.user_langgraph_skill_level}
          timestamp={new Date().toISOString()}
        />
      </div>
    );
  },
});
