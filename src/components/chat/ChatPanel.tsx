"use client";

import React, { useState } from "react";
import { 
  Send, Sparkles, Sliders, MousePointer2, X, Bot, User, 
  CheckCircle2, FileCode2, ArrowRight
} from "lucide-react";
import { ChatMessage, ClickToEditTarget, ModelSettings } from "@/lib/types";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (content: string, target?: ClickToEditTarget) => void;
  isLoading: boolean;
  modelSettings: ModelSettings;
  onOpenAIStudio: () => void;
  selectedElement: ClickToEditTarget | null;
  onClearSelectedElement: () => void;
}

const QUICK_SUGGESTIONS = [
  "Make the hero banner darker & cinematic",
  "Add a sticky cart checkout drawer",
  "Change accent colors to vibrant emerald",
  "Add search filter with live chips",
];

export function ChatPanel({
  messages,
  onSendMessage,
  isLoading,
  modelSettings,
  onOpenAIStudio,
  selectedElement,
  onClearSelectedElement,
}: ChatPanelProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input, selectedElement || undefined);
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion, selectedElement || undefined);
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c10] border-r border-zinc-800">
      {/* Header */}
      <div className="h-12 border-b border-zinc-800 px-4 flex items-center justify-between shrink-0 bg-[#0e0e14]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-xs text-white">Agent Collaboration</span>
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            {modelSettings.modelId.replace("-", " ").toUpperCase()}
          </span>
        </div>

        {/* AI Studio button */}
        <button
          onClick={onOpenAIStudio}
          className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded-lg transition-colors"
          title="AI Studio Model Settings"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium text-[11px]">AI Studio</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs space-y-2 leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-xs shadow-md"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-200 rounded-bl-xs shadow-sm"
              }`}
            >
              {/* If targeted element was attached */}
              {msg.targetedElement && (
                <div className="bg-black/30 border border-white/20 px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 mb-1.5">
                  <MousePointer2 className="w-3 h-3 text-cyan-300" />
                  <span>Target: {msg.targetedElement.tagName}</span>
                  <span className="truncate max-w-[140px] opacity-80">"{msg.targetedElement.textSnippet}"</span>
                </div>
              )}

              <div>{msg.content}</div>

              {/* Affected files pill */}
              {msg.affectedFiles && msg.affectedFiles.length > 0 && (
                <div className="pt-1.5 border-t border-zinc-800/80 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <FileCode2 className="w-3 h-3" />
                  <span>Updated: {msg.affectedFiles.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 max-w-[85%] text-xs text-zinc-400 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
            <span>Multi-Agent loop synthesizing diffs & verifying layout...</span>
          </div>
        )}
      </div>

      {/* Quick suggestions rail */}
      <div className="px-3 py-2 border-t border-zinc-800/60 bg-[#09090c] overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {QUICK_SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(sug)}
            className="text-[10px] whitespace-nowrap bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 px-2.5 py-1 rounded-full transition-colors shrink-0"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Selected DOM Element Chip (Attached to Input) */}
      {selectedElement && (
        <div className="mx-3 mt-2 bg-blue-950/80 border border-blue-500/40 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs text-blue-300">
          <div className="flex items-center gap-2">
            <MousePointer2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono font-bold text-[10px] bg-blue-500 text-zinc-950 px-1 rounded">
              {selectedElement.tagName}
            </span>
            <span className="truncate max-w-[180px] text-[11px] text-zinc-300 font-mono">
              "{selectedElement.textSnippet}"
            </span>
          </div>
          <button onClick={onClearSelectedElement} className="text-zinc-400 hover:text-white p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#0c0c10] border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          placeholder={
            selectedElement
              ? `Describe change for <${selectedElement.tagName}>...`
              : "Chat to edit (e.g., 'make the hero darker', 'add pricing')..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

