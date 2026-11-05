"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, Sparkles, Layout, Palette, Database, ShieldAlert, 
  ArrowRight, Edit3, X, Check, Code, Layers, Smartphone
} from "lucide-react";
import { ProjectSpec } from "@/lib/types";

interface PlanApprovalModalProps {
  isOpen: boolean;
  spec: ProjectSpec | null;
  onApprove: (finalSpec: ProjectSpec) => void;
  onClose: () => void;
}

export function PlanApprovalModal({ isOpen, spec, onApprove, onClose }: PlanApprovalModalProps) {
  if (!isOpen || !spec) return null;

  const [activeTab, setActiveTab] = useState<"overview" | "design" | "database">("overview");
  const [editableSpec, setEditableSpec] = useState<ProjectSpec>({ ...spec });
  const [isEditingName, setIsEditingName] = useState(false);

  const handleApprove = () => {
    onApprove({ ...editableSpec, approved: true });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#0c0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-[#0e0e14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                  Antigravity Planner & Designer Agents
                </span>
                <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
                  {editableSpec.genre}
                </span>
              </div>
              <h2 className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                {isEditingName ? (
                  <input
                    type="text"
                    value={editableSpec.name}
                    onChange={(e) => setEditableSpec({ ...editableSpec, name: e.target.value })}
                    className="bg-zinc-900 border border-blue-500 px-2 py-0.5 rounded text-white text-base font-bold focus:outline-none"
                    autoFocus
                    onBlur={() => setIsEditingName(false)}
                  />
                ) : (
                  <>
                    <span>{editableSpec.name}</span>
                    <button onClick={() => setIsEditingName(true)} className="text-zinc-500 hover:text-zinc-300">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                <span className="text-zinc-500 text-xs font-normal font-sans">
                  — {editableSpec.tagline}
                </span>
              </h2>
            </div>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-[#09090c] px-5 gap-6 text-xs font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "overview" ? "border-blue-500 text-white font-bold" : "border-transparent hover:text-zinc-200"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Pages & Components ({editableSpec.components.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("design")}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "design" ? "border-blue-500 text-white font-bold" : "border-transparent hover:text-zinc-200"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Design Tokens & Mood</span>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "database" ? "border-blue-500 text-white font-bold" : "border-transparent hover:text-zinc-200"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Schema ({editableSpec.databaseTables.length} tables)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Product Summary */}
              <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Architecture Scope</span>
                <p className="text-zinc-200 text-xs leading-relaxed">{editableSpec.summary}</p>
              </div>

              {/* Pages & Routes */}
              <div className="space-y-2">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Sitemap & Navigation Routes</span>
                <div className="flex flex-wrap gap-2">
                  {editableSpec.pages.map((page, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{page}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Components Tree */}
              <div className="space-y-2">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Modular Component Hierarchy</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {editableSpec.components.map((comp, idx) => (
                    <div key={idx} className="bg-zinc-900/80 border border-zinc-800/80 p-2.5 rounded-xl flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-zinc-200 font-mono text-[11px] truncate">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-2">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Key User Interactions & State Handlers</span>
                <div className="space-y-1.5">
                  {editableSpec.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300 bg-zinc-900/40 p-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div className="space-y-6">
              {/* Palette swatches */}
              <div className="space-y-3">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Palette & Color Tokens</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                    <div className="h-10 rounded-lg shadow-inner" style={{ backgroundColor: editableSpec.tokens.primary }} />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Primary</span>
                      <span className="font-mono text-zinc-300">{editableSpec.tokens.primary}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                    <div className="h-10 rounded-lg shadow-inner" style={{ backgroundColor: editableSpec.tokens.secondary }} />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Secondary</span>
                      <span className="font-mono text-zinc-300">{editableSpec.tokens.secondary}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                    <div className="h-10 rounded-lg shadow-inner" style={{ backgroundColor: editableSpec.tokens.accent }} />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Accent</span>
                      <span className="font-mono text-zinc-300">{editableSpec.tokens.accent}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                    <div className="h-10 rounded-lg shadow-inner border border-zinc-700" style={{ backgroundColor: editableSpec.tokens.surface }} />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Surface</span>
                      <span className="font-mono text-zinc-300">{editableSpec.tokens.surface}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography & Spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Typography System</span>
                  <div className="text-sm font-bold text-white">{editableSpec.tokens.fontHeading}</div>
                  <p className="text-xs text-zinc-400">Strict typographic scale: H1 (36-48px), H2 (24-30px), H3 (18-20px), Body (14px), Caption (11-12px).</p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Spacing & Curvature</span>
                  <div className="text-sm font-bold text-white">8pt Grid • Radius: {editableSpec.tokens.radius}</div>
                  <p className="text-xs text-zinc-400">Zero arbitrary margins. All gutters follow 8px, 16px, 24px, 32px standard rhythm.</p>
                </div>
              </div>

              {/* Mood */}
              <div className="bg-blue-950/20 border border-blue-500/30 p-4 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">Visual Mood Directive</span>
                <p className="text-zinc-200 mt-1 font-medium">{editableSpec.tokens.mood}</p>
              </div>
            </div>
          )}

          {activeTab === "database" && (
            <div className="space-y-4">
              <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Relational Database Collections</span>
              <div className="space-y-3">
                {editableSpec.databaseTables.map((table, idx) => (
                  <div key={idx} className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-sm text-white font-mono">{table.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                        {table.rows.length} seeded records
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{table.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {table.columns.map((col, cIdx) => (
                        <span key={cIdx} className="bg-zinc-950 border border-zinc-800/80 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300">
                          {col.name} <span className="text-zinc-500">({col.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-800 bg-[#09090c] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Ready for autonomous multi-agent compilation</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white px-4 py-2 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApprove}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95"
            >
              <span>Approve Plan & Launch Agents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

