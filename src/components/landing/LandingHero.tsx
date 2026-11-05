"use client";

import React, { useState } from "react";
import { 
  Sparkles, ArrowRight, Sliders, Bot, Zap, Film, 
  Tv, Heart, Shield, Code, ChevronRight, Play, CheckCircle2
} from "lucide-react";
import { SiteGenre, ModelSettings } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";

interface LandingHeroProps {
  onStartBuild: (prompt: string) => void;
  onSelectTemplate: (templateId: string) => void;
  onOpenAIStudio: () => void;
  modelSettings: ModelSettings;
}

const EXAMPLE_CHIPS = [
  { label: "🥦 10-Min Grocery Delivery", prompt: "A Blinkit-style ultra-fast 10-minute grocery delivery app with category chips, sticky cart, and live courier map" },
  { label: "🎬 Movie Streaming Platform", prompt: "A Netflix-style 4K cinematic streaming platform with billboard hero, sound toggle, horizontal rails, and watchlist" },
  { label: "📹 Creator Video Platform", prompt: "A YouTube-style high-bitrate video platform with watch theater, real comments, like button, and channel subscriptions" },
  { label: "📸 Aesthetic Photo Feed", prompt: "An Instagram-style aesthetic social journal with stories rail, double-tap hearts, and creator portfolio grid" },
  { label: "⚡ Autonomous Developer SaaS", prompt: "A Linear-style developer SaaS platform with interactive terminal demo, bento-grid features, and transparent pricing" },
];

export function LandingHero({
  onStartBuild,
  onSelectTemplate,
  onOpenAIStudio,
  modelSettings,
}: LandingHeroProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onStartBuild(prompt);
  };

  const handleChipClick = (chipPrompt: string) => {
    setPrompt(chipPrompt);
    onStartBuild(chipPrompt);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Antigravity Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 shadow-xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-zinc-200">Autonomous Multi-Agent Web Synthesis</span>
          <span className="text-zinc-600">•</span>
          <span className="text-blue-400 font-mono text-[11px] font-semibold">Lovable + AI Studio + Emergent</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-3xl mx-auto">
            Build premium software at the speed of <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">thought.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Describe any web app in plain English. Specialized AI agents plan, design, write clean React code, wire full-stack databases, test layouts, and ship human-grade experiences.
          </p>
        </div>

        {/* Big Prompt Box */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative bg-[#0d0d12]/90 border border-zinc-700/80 hover:border-zinc-500/80 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl transition-all glow-blue group">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website or full-stack application you want to build... (e.g., 'A 10-minute grocery delivery app with category chips, sticky cart, and live rider dispatch')"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 px-3 py-2 resize-none focus:outline-none leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 px-2">
              <button
                type="button"
                onClick={onOpenAIStudio}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium font-mono text-[11px]">{modelSettings.modelId}</span>
              </button>

              <button
                type="submit"
                disabled={!prompt.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <span>Generate Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Example Prompt Chips */}
        <div className="space-y-2">
          <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
            Inspiration Starters
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {EXAMPLE_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.prompt)}
                className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs px-3.5 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Agent Pill Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8 border-t border-zinc-800/80 text-left">
          <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl space-y-1">
            <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Planner & Designer
            </div>
            <p className="text-[11px] text-zinc-400">PRD specifications, 8pt spacing tokens, original branding.</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl space-y-1">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Full-Stack Synthesis
            </div>
            <p className="text-[11px] text-zinc-400">PostgreSQL schema, seeded records, and stateful handlers.</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl space-y-1">
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Click-to-Edit
            </div>
            <p className="text-[11px] text-zinc-400">Select any DOM element in live preview to contextually chat.</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl space-y-1">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Autonomous QA & Fixer
            </div>
            <p className="text-[11px] text-zinc-400">Audits responsive viewports & heals broken layouts automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

