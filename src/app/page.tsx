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
import { TEMPLATES } from "@/lib/templates";
import { generateInitialPlan } from "@/lib/agents/orchestrator";
import { classifyGenre } from "@/lib/llm/agents";
import { generateId } from "@/lib/utils";

export default function Home() {
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

  // Real Multi-Agent Generator via Server-Sent Events (POST /api/generate)
  const generateWithRealAI = async (promptText: string, planOverride?: ProjectSpec) => {
    setIsLoading(true);
    setView("workspace");

    const genre = classifyGenre(promptText);
    const baseTemplate = TEMPLATES.find((t) => t.genre === genre) || TEMPLATES[0];
    const placeholderPlan = planOverride || generateInitialPlan(promptText, modelSettings);
    setActiveSpec(placeholderPlan);
    // Immediately prime virtual files with genre template so preview is responsive instantly
    setFiles(baseTemplate.files);

    // Initial chat message
    setMessages([
      {
        id: generateId("msg"),
        sender: "assistant",
        content: `Initializing 5 autonomous AI agents for: **"${promptText}"**...\n- Archetype: **${genre.toUpperCase()}**\n- Model: **${modelSettings.modelId}**`,
        timestamp: Date.now(),
      },
    ]);

    setActivities([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(modelSettings.apiKey ? { "x-api-key": modelSettings.apiKey } : {}),
        },
        body: JSON.stringify({
          prompt: promptText,
          model: modelSettings.modelId,
          temperature: modelSettings.temperature,
          apiKey: modelSettings.apiKey,
        }),
      });

      if (!response.ok && !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;
            const jsonStr = trimmed.replace(/^data: /, "");

            try {
              const data = JSON.parse(jsonStr);

              if (data.type === "agent_activity" && data.event) {
                const actItem: AgentActivityItem = {
                  id: generateId("act"),
                  agent: data.event.agent,
                  timestamp: Date.now(),
                  status: data.event.type === "agent_done" ? "completed" : "working",
                  title: data.event.title,
                  detail: data.event.detail,
                };
                setActivities((prev) => [actItem, ...prev]);
              }

              if (data.type === "complete" && data.result) {
                const { plan, designTokens, databaseTables, files: genFiles } = data.result;

                const fileMap: VirtualFileMap = {};
                for (const f of genFiles) {
                  fileMap[f.path] = {
                    path: f.path,
                    content: f.content,
                    language: f.path.endsWith(".json") ? "json" : "javascript",
                  };
                }

                const finalSpec: ProjectSpec = {
                  id: generateId("spec"),
                  name: plan.name,
                  tagline: plan.tagline,
                  genre: plan.genre,
                  summary: plan.summary,
                  pages: plan.pages,
                  components: plan.components,
                  features: plan.features,
                  tokens: designTokens,
                  databaseTables: databaseTables || [],
                  approved: true,
                };

                setActiveSpec(finalSpec);
                setFiles(fileMap);

                setMessages((prev) => [
                  ...prev,
                  {
                    id: generateId("msg"),
                    sender: "assistant",
                    content: `🎉 **${plan.name}** is live!\n- **Sitemap**: ${plan.pages.join(", ")}\n- **Components**: ${plan.components.slice(0, 4).join(", ")}\n- **Database**: ${databaseTables?.length || 0} collections seeded.\nClick any element in the preview with **Click-to-Edit** or chat to refine!`,
                    timestamp: Date.now(),
                    affectedFiles: ["/App.js"],
                  },
                ]);

                setSnapshots([
                  {
                    id: generateId("snap"),
                    timestamp: Date.now(),
                    label: "v1.0 — Real AI Generation",
                    promptDescription: promptText,
                    files: fileMap,
                  },
                ]);
              }

              if (data.type === "error") {
                throw new Error(data.error);
              }
            } catch (err: any) {
              console.warn("SSE event parsing:", err);
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Real AI generation error:", err);

      const errorMessage = err.message || "Failed to complete AI synthesis.";
      const isMissingKey = errorMessage.includes("API_KEY_MISSING");

      setMessages((prev) => [
        ...prev,
        {
          id: generateId("msg"),
          sender: "assistant",
          content: isMissingKey
            ? `⚠️ **API Key Missing**: To enable real LLM generation, please set \`GEMINI_API_KEY\` or \`ANTHROPIC_API_KEY\` in your \`.env\` file, or enter it in the **AI Studio Settings** drawer. Loaded genre template as fallback.`
            : `⚠️ **Notice**: ${errorMessage}. Loaded fallback engine so you can continue building.`,
          timestamp: Date.now(),
        },
      ]);

      // Fallback to genre-aware template if API key is not configured yet
      const baseTemplate = TEMPLATES.find((t) => t.genre === genre) || TEMPLATES[0];
      setActiveSpec({ ...baseTemplate.spec, approved: true });
      setFiles(baseTemplate.files);
      setSnapshots([
        {
          id: generateId("snap"),
          timestamp: Date.now(),
          label: "v1.0 — Fallback Generation",
          promptDescription: promptText,
          files: baseTemplate.files,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle prompt submission from landing page
  const handleStartBuild = (prompt: string, instant = false) => {
    if (instant) {
      generateWithRealAI(prompt);
      return;
    }
    const initialPlan = generateInitialPlan(prompt, modelSettings);
    setActiveSpec(initialPlan);
    setIsPlanApprovalOpen(true);
  };

  // Handle template selection from gallery
  const handleSelectTemplate = (templateId: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
    const initialPlan = { ...tmpl.spec, approved: true };
    setActiveSpec(initialPlan);
    setFiles(tmpl.files);

    setMessages([
      {
        id: generateId("msg"),
        sender: "assistant",
        content: `Loaded **${tmpl.name}** (${tmpl.genre} engine). Click any element with **Click-to-Edit** or chat to customize!`,
        timestamp: Date.now(),
        affectedFiles: ["/App.js"],
      },
    ]);

    setSnapshots([
      {
        id: generateId("snap"),
        timestamp: Date.now(),
        label: `v1.0 — ${tmpl.name}`,
        promptDescription: tmpl.description,
        files: tmpl.files,
      },
    ]);

    setView("workspace");
  };

  // Handle Plan Approval
  const handleApprovePlan = (approvedSpec: ProjectSpec) => {
    setIsPlanApprovalOpen(false);
    generateWithRealAI(approvedSpec.summary, approvedSpec);
  };

  // Handle Chat Edits & Click-to-Edit from Studio (POST /api/chat)
  const handleSendMessage = async (userPrompt: string, targetedElement?: ClickToEditTarget) => {
    const userMsg: ChatMessage = {
      id: generateId("msg"),
      sender: "user",
      content: userPrompt,
      timestamp: Date.now(),
      targetedElement,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const currentCode = files["/App.js"]?.content || "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(modelSettings.apiKey ? { "x-api-key": modelSettings.apiKey } : {}),
        },
        body: JSON.stringify({
          userPrompt,
          currentCode,
          targetedElement,
          model: modelSettings.modelId,
          apiKey: modelSettings.apiKey,
        }),
      });

      const data = await res.json();

      if (data.success && data.updatedCode) {
        const updatedFiles: VirtualFileMap = {
          ...files,
          "/App.js": {
            path: "/App.js",
            language: "javascript",
            content: data.updatedCode,
            isModified: true,
          },
        };

        setFiles(updatedFiles);

        // Add QA/Fixer activity
        const fixActivity: AgentActivityItem = {
          id: generateId("act"),
          agent: "fixer",
          timestamp: Date.now(),
          status: "completed",
          title: targetedElement
            ? `Fixer Patched <${targetedElement.tagName}>`
            : "Differential Update Applied to /App.js",
          detail: data.summary || `Updated code responding to: "${userPrompt}"`,
        };
        setActivities((prev) => [fixActivity, ...prev]);

        setMessages((prev) => [
          ...prev,
          {
            id: generateId("msg"),
            sender: "assistant",
            content: targetedElement
              ? `I've updated the <${targetedElement.tagName}> component according to your instruction. Live in preview!`
              : `Applied updates for "${userPrompt}". /App.js re-compiled.`,
            timestamp: Date.now(),
            affectedFiles: ["/App.js"],
            targetedElement,
          },
        ]);

        // Add version snapshot
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
      } else {
        throw new Error(data.error || "Failed to patch code.");
      }
    } catch (err: any) {
      console.warn("Real chat edit fallback:", err);

      // Client-side targeted fallback if API key is not yet set
      let currentApp = files["/App.js"]?.content || "";
      const lower = userPrompt.toLowerCase();

      if (lower.includes("darker") || lower.includes("dark")) {
        currentApp = currentApp.replace(/bg-\[#.*?\]/g, "bg-[#050507]");
      }
      if (lower.includes("emerald") || lower.includes("green")) {
        currentApp = currentApp.replace(/from-red-600/g, "from-emerald-600").replace(/bg-red-600/g, "bg-emerald-500").replace(/text-red-500/g, "text-emerald-400");
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

      setMessages((prev) => [
        ...prev,
        {
          id: generateId("msg"),
          sender: "assistant",
          content: `Notice: ${err.message}. To use real LLM code patching, configure your GEMINI_API_KEY or ANTHROPIC_API_KEY in AI Studio drawer.`,
          timestamp: Date.now(),
          affectedFiles: ["/App.js"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
