"use client";

import React from "react";
import { 
  Bot, CheckCircle2, Clock, AlertTriangle, ShieldCheck, 
  Wrench, Palette, Layout, Code, Sparkles, Terminal
} from "lucide-react";
import { AgentActivityItem, AgentType } from "@/lib/types";

interface AgentActivityFeedProps {
  activities: AgentActivityItem[];
}

const AGENT_CONFIGS: Record<AgentType, { name: string; color: string; icon: React.ElementType }> = {
  planner: { name: "Planner Agent", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Layout },
  designer: { name: "Designer Agent", color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: Palette },
  frontend: { name: "Frontend Agent", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Code },
  backend: { name: "Backend Agent", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: Terminal },
  qa: { name: "QA Agent", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: AlertTriangle },
  reviewer: { name: "Reviewer Agent", color: "text-rose-400 bg-rose-500/10 border-rose-500/20", icon: ShieldCheck },
  fixer: { name: "Fixer Agent", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", icon: Wrench },
};

export function AgentActivityFeed({ activities }: AgentActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500 text-xs">
        <Bot className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p>Agents standing by. Submit a prompt or plan to initialize the autonomous loop.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Autonomous Multi-Agent Activity Log
        </span>
        <span className="text-[10px] font-mono text-zinc-500">
          {activities.length} steps executed
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => {
          const config = AGENT_CONFIGS[act.agent] || AGENT_CONFIGS.planner;
          const Icon = config.icon;

          return (
            <div
              key={act.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 space-y-1.5 transition-all hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-md border ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-bold text-xs text-zinc-200">{config.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {act.status === "completed" && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  )}
                  {act.status === "working" && (
                    <span className="text-[10px] text-blue-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 animate-spin" /> Active
                    </span>
                  )}
                </div>
              </div>

              <div className="font-semibold text-xs text-zinc-100">{act.title}</div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">{act.detail}</p>

              {act.codeSnippet && (
                <div className="mt-2 p-2 bg-black/60 rounded-lg border border-zinc-800/80 font-mono text-[10px] text-emerald-300 overflow-x-auto">
                  <pre>{act.codeSnippet}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

