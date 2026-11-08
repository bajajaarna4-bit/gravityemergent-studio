"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Sliders, Play, Code, Folder, Database, Download, 
  Rocket, History, Bot, MessageSquare, ChevronLeft, Zap, GripVertical
} from "lucide-react";
import { 
  ProjectSpec, 
  VirtualFileMap, 
  WorkspaceTab, 
  DeviceViewport, 
  ClickToEditTarget, 
  ChatMessage, 
  AgentActivityItem, 
  ModelSettings, 
  VersionSnapshot 
} from "@/lib/types";
import { LivePreviewFrame } from "../preview/LivePreviewFrame";
import { ChatPanel } from "../chat/ChatPanel";
import { AgentActivityFeed } from "../agents/AgentActivityFeed";
import { CodeEditorViewer } from "../code/CodeEditorViewer";
import { FileTreeViewer } from "../code/FileTreeViewer";
import { DatabaseViewer } from "../database/DatabaseViewer";
import { AIStudioDrawer } from "../studio/AIStudioDrawer";
import { DeployModal } from "../modals/DeployModal";
import { ExportModal } from "../modals/ExportModal";
import { VersionHistoryModal } from "../modals/VersionHistoryModal";

interface StudioWorkspaceProps {
  spec: ProjectSpec;
  files: VirtualFileMap;
  onUpdateFiles: (newFiles: VirtualFileMap) => void;
  activities: AgentActivityItem[];
  messages: ChatMessage[];
  onSendMessage: (msg: string, target?: ClickToEditTarget) => void;
  isLoading: boolean;
  modelSettings: ModelSettings;
  onUpdateModelSettings: (settings: ModelSettings) => void;
  snapshots: VersionSnapshot[];
  onRestoreSnapshot: (snap: VersionSnapshot) => void;
  onBackToLanding: () => void;
}

export function StudioWorkspace({
  spec,
  files,
  onUpdateFiles,
  activities,
  messages,
  onSendMessage,
  isLoading,
  modelSettings,
  onUpdateModelSettings,
  snapshots,
  onRestoreSnapshot,
  onBackToLanding,
}: StudioWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("preview");
  const [leftTab, setLeftTab] = useState<"chat" | "agents">("chat");
  const [viewport, setViewport] = useState<DeviceViewport>("desktop");
  const [isClickToEditActive, setIsClickToEditActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<ClickToEditTarget | null>(null);

  // Resizable pane state
  const [leftWidth, setLeftWidth] = useState(430);
  const [isDragging, setIsDragging] = useState(false);

  // Modals
  const [isAIStudioOpen, setIsAIStudioOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // File explorer selection
  const [selectedFilePath, setSelectedFilePath] = useState<string>("/App.js");

  const handleSelectElement = (target: ClickToEditTarget) => {
    setSelectedElement(target);
    setLeftTab("chat"); // Switch left pane to chat so user can type modification
  };

  // Drag resizing logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const minWidth = 320;
      const maxWidth = window.innerWidth - 380;
      const newWidth = Math.max(minWidth, Math.min(e.clientX, maxWidth));
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`flex flex-col h-screen w-screen bg-[#08080a] text-zinc-100 font-sans overflow-hidden ${isDragging ? "select-none cursor-col-resize" : ""}`}>
      {/* Top Header Bar */}
      <header className="h-14 bg-[#0c0c10] border-b border-zinc-800 px-4 flex items-center justify-between shrink-0 z-30 gap-4">
        {/* Left: Back & Project Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBackToLanding}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Return to Landing"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white tracking-tight whitespace-nowrap">{spec.name}</span>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold">
                {spec.genre}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Stage Tabs (Preview / Code / Files / Database) */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "preview" ? "bg-zinc-800 text-white font-bold shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Play className="w-3.5 h-3.5 text-blue-400" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "code" ? "bg-zinc-800 text-white font-bold shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>Code</span>
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "files" ? "bg-zinc-800 text-white font-bold shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-amber-400" />
            <span>Files</span>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "database" ? "bg-zinc-800 text-white font-bold shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Database</span>
            <span className="text-[9px] bg-zinc-950 text-cyan-400 px-1 rounded font-mono">
              {spec.databaseTables?.length || 0}
            </span>
          </button>
        </div>

        {/* Right Tools (Credits, History, Export, Deploy) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Version history */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white transition-colors"
            title="Version Snapshots & Undo"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono text-[11px] whitespace-nowrap">{snapshots.length} Revs</span>
          </button>

          {/* Export ZIP */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-200 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export</span>
          </button>

          {/* One-click Deploy */}
          <button
            onClick={() => setIsDeployOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-1.5 rounded-lg text-xs transition-transform active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>
        </div>
      </header>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pane (Chat & Multi-Agent Activity) */}
        <div 
          style={{ width: `${leftWidth}px` }} 
          className="border-r border-zinc-800 flex flex-col shrink-0 bg-[#0c0c10] overflow-hidden"
        >
          {/* Left Sub-tabs: Chat vs Agent Activity */}
          <div className="h-10 border-b border-zinc-800 px-3 flex items-center gap-2 bg-[#09090c] shrink-0">
            <button
              onClick={() => setLeftTab("chat")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                leftTab === "chat" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat & Edit</span>
            </button>

            <button
              onClick={() => setLeftTab("agents")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                leftTab === "agents" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-blue-400" />
              <span>Agent Activity</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 rounded font-mono">
                {activities.length}
              </span>
            </button>
          </div>

          {/* Left Pane Body */}
          <div className="flex-1 overflow-hidden">
            {leftTab === "chat" ? (
              <ChatPanel
                messages={messages}
                onSendMessage={onSendMessage}
                isLoading={isLoading}
                modelSettings={modelSettings}
                onOpenAIStudio={() => setIsAIStudioOpen(true)}
                selectedElement={selectedElement}
                onClearSelectedElement={() => setSelectedElement(null)}
              />
            ) : (
              <div className="h-full overflow-y-auto">
                <AgentActivityFeed activities={activities} />
              </div>
            )}
          </div>
        </div>

        {/* Drag Resizer Divider */}
        <div
          onMouseDown={() => setIsDragging(true)}
          className={`w-2 hover:w-2.5 bg-[#09090c] hover:bg-blue-600/60 cursor-col-resize transition-all shrink-0 flex items-center justify-center border-r border-zinc-800 z-20 group ${
            isDragging ? "bg-blue-600" : ""
          }`}
          title="Drag to resize panels"
        >
          <GripVertical className="w-3 h-3 text-zinc-600 group-hover:text-white" />
        </div>

        {/* Right Pane (Stage) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#07070a]">
          {activeTab === "preview" && (
            <LivePreviewFrame
              files={files}
              viewport={viewport}
              onViewportChange={setViewport}
              isClickToEditActive={isClickToEditActive}
              onToggleClickToEdit={() => setIsClickToEditActive(!isClickToEditActive)}
              onSelectElement={handleSelectElement}
              selectedElement={selectedElement}
            />
          )}

          {activeTab === "code" && (
            <CodeEditorViewer
              files={files}
              activeFilePath={selectedFilePath}
              onSelectFile={setSelectedFilePath}
            />
          )}

          {activeTab === "files" && (
            <FileTreeViewer
              files={files}
              selectedFile={selectedFilePath}
              onSelectFile={setSelectedFilePath}
            />
          )}

          {activeTab === "database" && (
            <DatabaseViewer tables={spec.databaseTables || []} />
          )}
        </div>
      </div>

      {/* Floating Modals */}
      <AIStudioDrawer
        isOpen={isAIStudioOpen}
        onClose={() => setIsAIStudioOpen(false)}
        settings={modelSettings}
        onChange={onUpdateModelSettings}
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        projectName={spec.name}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        projectName={spec.name}
        files={files}
      />

      <VersionHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        snapshots={snapshots}
        onRestore={onRestoreSnapshot}
      />
    </div>
  );
}
