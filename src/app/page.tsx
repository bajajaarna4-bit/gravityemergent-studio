"use client";

import React, { useState } from "react";
import { LandingHero } from "@/components/landing/LandingHero";
import { TemplateGallery } from "@/components/landing/TemplateGallery";
import { PlanApprovalModal } from "@/components/modals/PlanApprovalModal";
import { StudioWorkspace } from "@/components/workspace/StudioWorkspace";
import { AIStudioDrawer, defaultModelSettings } from "@/components/studio/AIStudioDrawer";
import { 
  ProjectSpec, 
  VirtualFileMap, 
  ChatMessage, 
  AgentActivityItem, 
  ModelSettings, 
  VersionSnapshot, 
  ClickToEditTarget 
} from "@/lib/types";
import { TEMPLATES, getTemplateByGenre, detectGenreFromPrompt } from "@/lib/templates";
import { generateInitialPlan, simulateAgentWorkflow } from "@/lib/agents/orchestrator";
import { generateId } from "@/lib/utils";

export default function Home() {
  // App views: "landing" | "workspace"
  const [view, setView] = useState<"landing" | "workspace">("landing");

  // State
  const [modelSettings, setModelSettings] = useState<ModelSettings>(defaultModelSettings);
  const [isAIStudioOpen, setIsAIStudioOpen] = useState(false);
  const [activeSpec, setActiveSpec] = useState<ProjectSpec | null>(null);
  const [isPlanApprovalOpen, setIsPlanApprovalOpen] = useState(false);

  // Active workspace state
  const [files, setFiles] = useState<VirtualFileMap>({});
  const [activities, setActivities] = useState<AgentActivityItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle prompt submission from landing page
  const handleStartBuild = (prompt: string) => {
    const initialPlan = generateInitialPlan(prompt, modelSettings);
    setActiveSpec(initialPlan);
    setIsPlanApprovalOpen(true);
  };

  // Handle template selection from gallery
  const handleSelectTemplate = (templateId: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
    const initialPlan = { ...tmpl.spec, approved: true };
    setActiveSpec(initialPlan);

    // Run agents
    const { files: initialFiles, stream } = simulateAgentWorkflow(
      `Generate ${tmpl.name}`,
      initialPlan
    );

    setFiles(initialFiles);
    setActivities(stream);
    setMessages([
      {
        id: generateId("msg"),
        sender: "assistant",
        content: `I've initialized **${initialPlan.name}** with the **${initialPlan.genre}** genre engine. All pages, data fixtures, and components are live in the preview. Try clicking any element with Click-to-Edit or tell me what to refine!`,
        timestamp: Date.now(),
        affectedFiles: ["/App.js"],
        agentSteps: stream,
      },
    ]);

    setSnapshots([
      {
        id: generateId("snap"),
        timestamp: Date.now(),
        label: "v1.0 — Initial Generation",
        promptDescription: `Autonomous synthesis for ${initialPlan.name}`,
        files: initialFiles,
      },
    ]);

    setView("workspace");
  };

  // Handle Plan Approval
  const handleApprovePlan = (approvedSpec: ProjectSpec) => {
    setIsPlanApprovalOpen(false);
    setActiveSpec(approvedSpec);
    setIsLoading(true);

    const { files: initialFiles, stream } = simulateAgentWorkflow(
      approvedSpec.summary,
      approvedSpec
    );

    setFiles(initialFiles);
    setActivities(stream);
    setMessages([
      {
        id: generateId("msg"),
        sender: "assistant",
        content: `🚀 All 6 subagents have completed execution for **${approvedSpec.name}**!\n- **Planner**: Scaffolded ${approvedSpec.pages.length} pages\n- **Designer**: Tokens applied (${approvedSpec.tokens.mood})\n- **Frontend**: Responsive React & Tailwind compiled\n- **Backend**: ${approvedSpec.databaseTables.length} relational tables seeded\n- **QA & Fixer**: Layout verified across mobile & desktop.`,
        timestamp: Date.now(),
        affectedFiles: ["/App.js"],
        agentSteps: stream,
      },
    ]);

    setSnapshots([
      {
        id: generateId("snap"),
        timestamp: Date.now(),
        label: "v1.0 — Approved Plan Build",
        promptDescription: `Plan approved: ${approvedSpec.name}`,
        files: initialFiles,
      },
    ]);

    setIsLoading(false);
    setView("workspace");
  };

  // Handle Chat Edits from Studio
  const handleSendMessage = (userPrompt: string, targetedElement?: ClickToEditTarget) => {
    const userMsg: ChatMessage = {
      id: generateId("msg"),
      sender: "user",
      content: userPrompt,
      timestamp: Date.now(),
      targetedElement,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Autonomous agent patching simulation
    setTimeout(() => {
      let currentApp = files["/App.js"]?.content || "";
      const lower = userPrompt.toLowerCase();

      // Apply realistic code modifications
      if (lower.includes("darker") || lower.includes("dark")) {
        currentApp = currentApp.replace(/bg-\[#.*?\]/g, "bg-[#050507]");
        currentApp = currentApp.replace(/from-black\/[0-9]+/g, "from-black/95");
      }
      if (lower.includes("emerald") || lower.includes("green")) {
        currentApp = currentApp.replace(/from-red-600/g, "from-emerald-600");
        currentApp = currentApp.replace(/bg-red-600/g, "bg-emerald-500");
        currentApp = currentApp.replace(/text-red-500/g, "text-emerald-400");
        currentApp = currentApp.replace(/border-red-500/g, "border-emerald-500");
      }
      if (lower.includes("indigo") || lower.includes("purple") || lower.includes("blue")) {
        currentApp = currentApp.replace(/bg-emerald-500/g, "bg-indigo-600");
        currentApp = currentApp.replace(/text-emerald-400/g, "text-indigo-400");
      }
      if (targetedElement && lower.includes("badge")) {
        currentApp = currentApp.replace(/10 MIN/g, "PRIORITY 10 MIN");
      }

      const updatedFiles: VirtualFileMap = {
        ...files,
        "/App.js": {
          path: "/App.js",
          language: "javascript",
          content: currentApp,
          isModified: true,
        },
      };

      setFiles(updatedFiles);

      // Add agent activity item
      const fixActivity: AgentActivityItem = {
        id: generateId("act"),
        agent: "fixer",
        timestamp: Date.now(),
        status: "completed",
        title: targetedElement
          ? `Targeted Patch Applied to <${targetedElement.tagName}>`
          : "Differential Update Applied to /App.js",
        detail: `Updated styling tokens and state handlers responding to prompt: "${userPrompt}". Verified responsive bounds.`,
      };
      setActivities((prev) => [fixActivity, ...prev]);

      // Add assistant response
      const assistantMsg: ChatMessage = {
        id: generateId("msg"),
        sender: "assistant",
        content: targetedElement
          ? `I've updated the <${targetedElement.tagName}> component according to your instruction. The changes are immediately live in the preview!`
          : `I've updated the design and components to match "${userPrompt}". The differential patch has been applied to **/App.js**.`,
        timestamp: Date.now(),
        affectedFiles: ["/App.js"],
        targetedElement,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Create snapshot
      setSnapshots((prev) => [
        {
          id: generateId("snap"),
          timestamp: Date.now(),
          label: `v1.${prev.length} — ${userPrompt.slice(0, 24)}...`,
          promptDescription: userPrompt,
          files: updatedFiles,
        },
        ...prev,
      ]);

      setIsLoading(false);
    }, 800);
  };

  // Restore snapshot
  const handleRestoreSnapshot = (snap: VersionSnapshot) => {
    setFiles(snap.files);
    setMessages((prev) => [
      ...prev,
      {
        id: generateId("msg"),
        sender: "assistant",
        content: `Restored workspace to **${snap.label}** (${snap.promptDescription}).`,
        timestamp: Date.now(),
        affectedFiles: Object.keys(snap.files),
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-[#08080a] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      {view === "landing" ? (
        <div className="flex flex-col min-h-screen bg-grid-pattern">
          {/* Top Navbar */}
          <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="font-black text-white text-base">V</span>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Verve <span className="text-blue-400">Studio</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAIStudioOpen(true)}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>AI Studio Settings</span>
              </button>
              <button
                onClick={() => handleSelectTemplate("quick-commerce")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md shadow-blue-600/25 transition-all"
              >
                Open Studio
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <LandingHero
            onStartBuild={handleStartBuild}
            onSelectTemplate={handleSelectTemplate}
            onOpenAIStudio={() => setIsAIStudioOpen(true)}
            modelSettings={modelSettings}
          />

          {/* Template Gallery */}
          <TemplateGallery onSelectTemplate={handleSelectTemplate} />

          {/* Footer */}
          <footer className="border-t border-zinc-800/80 px-6 py-8 text-center text-xs text-zinc-500">
            <p>© 2026 Verve Studio. Combining Lovable, Google AI Studio, Emergent, and Antigravity multi-agent systems.</p>
          </footer>

          {/* Floating Plan Approval Modal */}
          <PlanApprovalModal
            isOpen={isPlanApprovalOpen}
            spec={activeSpec}
            onApprove={handleApprovePlan}
            onClose={() => setIsPlanApprovalOpen(false)}
          />

          {/* Floating AI Studio Drawer */}
          <AIStudioDrawer
            isOpen={isAIStudioOpen}
            onClose={() => setIsAIStudioOpen(false)}
            settings={modelSettings}
            onChange={setModelSettings}
          />
        </div>
      ) : (
        /* Workspace Screen */
        activeSpec && (
          <StudioWorkspace
            spec={activeSpec}
            files={files}
            onUpdateFiles={setFiles}
            activities={activities}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            modelSettings={modelSettings}
            onUpdateModelSettings={setModelSettings}
            snapshots={snapshots}
            onRestoreSnapshot={handleRestoreSnapshot}
            onBackToLanding={() => setView("landing")}
          />
        )
      )}
    </main>
  );
}

