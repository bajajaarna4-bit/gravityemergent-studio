"use client";

import React from "react";
import { Sliders, Sparkles, Cpu, X, HelpCircle, Check, RefreshCw, Key } from "lucide-react";
import { ModelSettings } from "@/lib/types";

interface AIStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ModelSettings;
  onChange: (updated: ModelSettings) => void;
}

const MODELS = [
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash (Fast & Fluid)",
    provider: "Google AI Studio",
    badge: "Ultra Low Latency",
    description: "Sub-second response speed for real-time iterative preview and multi-agent synthesis.",
  },
  {
    id: "gemini-2-0-pro",
    name: "Gemini 2.0 Pro Experimental",
    provider: "Google AI Studio",
    badge: "2M Context",
    description: "Deep full-stack architectural reasoning with massive context window.",
  },
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet (Hybrid Reasoning)",
    provider: "Anthropic",
    badge: "Multi-Agent Power",
    description: "Deep thinking + instant code generation with superior architectural coherence.",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    badge: "Fast Code",
    description: "Benchmark leader for React component generation and agency-level UI aesthetics.",
  },
];

export const defaultModelSettings: ModelSettings = {
  modelId: "gemini-2-0-flash",
  temperature: 0.2,
  topP: 0.95,
  systemPrompt: `You are an elite design agency architect and senior full-stack engineer.
- Enforce strict 8px spacing rhythm, accessible contrast ratios, and cohesive typography.
- Never use placeholder text like "Lorem ipsum" or "Product 1". Provide authentic realistic copy.
- Structure responsive mobile-first layouts with subtle shadows, rounded borders, and micro-interactions.
- Return clean, modular React components with Tailwind CSS.`,
  creativityLevel: "balanced",
  tokenBudget: 8192,
  apiKey: "",
};

export function AIStudioDrawer({ isOpen, onClose, settings, onChange }: AIStudioDrawerProps) {
  if (!isOpen) return null;

  const handleModelChange = (id: ModelSettings["modelId"]) => {
    onChange({ ...settings, modelId: id });
  };

  const handleTemperatureChange = (val: number) => {
    onChange({ ...settings, temperature: val });
  };

  const handlePromptChange = (val: string) => {
    onChange({ ...settings, systemPrompt: val });
  };

  const handleReset = () => {
    onChange(defaultModelSettings);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-[#0c0c10] border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl overflow-y-auto">
        {/* Header */}
        <div>
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  AI Studio Controls
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono">
                    Playground
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">Configure model runtime, temperature, and API keys</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form controls */}
          <div className="p-5 space-y-6">
            {/* API Key Configuration */}
            <div className="space-y-2 bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  <span>API Key (Gemini or Anthropic)</span>
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">Optional Override</span>
              </div>
              <input
                type="password"
                placeholder="sk-ant-... or AIzaSy... (reads from .env by default)"
                value={settings.apiKey || ""}
                onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono placeholder-zinc-600 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-zinc-400 leading-tight">
                Leave blank to automatically use <code className="text-zinc-300">GEMINI_API_KEY</code> or <code className="text-zinc-300">ANTHROPIC_API_KEY</code> from your server's <code className="text-zinc-300">.env</code>.
              </p>
            </div>

            {/* Model Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-zinc-200 flex items-center justify-between">
                <span>Model Selector</span>
                <span className="text-[10px] text-zinc-500 font-mono">Google AI Studio & Claude</span>
              </label>

              <div className="space-y-2">
                {MODELS.map((m) => {
                  const isSelected = settings.modelId === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => handleModelChange(m.id as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-blue-600/10 border-blue-500/60 shadow-md"
                          : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Cpu className={`w-3.5 h-3.5 ${isSelected ? "text-blue-400" : "text-zinc-500"}`} />
                          <span className="text-xs font-bold text-zinc-100">{m.name}</span>
                        </div>
                        <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">{m.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2 bg-zinc-900/40 border border-zinc-800/80 p-3.5 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <span>Temperature</span>
                  <HelpCircle className="w-3 h-3 text-zinc-500" />
                </label>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {settings.temperature.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={settings.temperature}
                onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0.0 (Strict Code)</span>
                <span>0.5 (Balanced)</span>
                <span>1.0 (Creative UI)</span>
              </div>
            </div>

            {/* Token Budget */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-200">Max Output Token Budget</label>
              <div className="grid grid-cols-3 gap-2">
                {[4096, 8192, 16384].map((tokens) => (
                  <button
                    key={tokens}
                    onClick={() => onChange({ ...settings, tokenBudget: tokens })}
                    className={`py-1.5 text-xs font-mono rounded-lg border transition-all ${
                      settings.tokenBudget === tokens
                        ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tokens.toLocaleString()} tokens
                  </button>
                ))}
              </div>
            </div>

            {/* System Instructions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-200">System Directives</label>
                <span className="text-[10px] text-zinc-500">Autonomous Prompt Engineering</span>
              </div>
              <textarea
                rows={5}
                value={settings.systemPrompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 font-mono placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-all leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/70 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
