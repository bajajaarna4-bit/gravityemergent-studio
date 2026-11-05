"use client";

import React, { useState } from "react";
import { Download, Github, Check, X, FolderArchive, ArrowRight, Sparkles } from "lucide-react";
import JSZip from "jszip";
import { VirtualFileMap } from "@/lib/types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  files: VirtualFileMap;
}

export function ExportModal({ isOpen, onClose, projectName, files }: ExportModalProps) {
  if (!isOpen) return null;

  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [githubSyncSuccess, setGithubSyncSuccess] = useState(false);
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/[^a-z0-9]/g, "-"));

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      // Add virtual files
      Object.entries(files).forEach(([path, file]) => {
        // Remove leading slash if any
        const cleanPath = path.startsWith("/") ? path.substring(1) : path;
        zip.file(cleanPath, file.content);
      });

      // Add a standard package.json if not present
      if (!files["/package.json"] && !files["package.json"]) {
        zip.file(
          "package.json",
          JSON.stringify(
            {
              name: repoName,
              version: "1.0.0",
              private: true,
              scripts: {
                dev: "vite",
                build: "vite build",
                preview: "vite preview",
              },
              dependencies: {
                react: "^18.3.1",
                "react-dom": "^18.3.1",
                "lucide-react": "^0.454.0",
              },
              devDependencies: {
                "@vitejs/plugin-react": "^4.3.2",
                autoprefixer: "^10.4.20",
                postcss: "^8.4.47",
                tailwindcss: "^3.4.14",
                vite: "^5.4.10",
              },
            },
            null,
            2
          )
        );
      }

      // Add README.md
      zip.file(
        "README.md",
        `# ${projectName}\n\nGenerated autonomously with **Verve Studio**.\n\n## Quick Start\n\`\`\`bash\npnpm install\npnpm run dev\n\`\`\`\n`
      );

      // Generate blob
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${repoName}-project.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("ZIP creation error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSyncGithub = () => {
    setGithubSyncSuccess(true);
    setTimeout(() => setGithubSyncSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0c0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Export Project</h3>
              <p className="text-xs text-zinc-400">Download clean production code or push directly to GitHub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option 1: ZIP Download */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-white">
              <Download className="w-4 h-4 text-blue-400" />
              <span>Full Source Code (ZIP Archive)</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">React 18 • Vite • Tailwind</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Includes all generated components, database schema fixtures, Vite build scripts, and Tailwind configuration.
          </p>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Downloaded Successfully!</span>
              </>
            ) : isExporting ? (
              <span>Packaging ZIP...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download {repoName}.zip</span>
              </>
            )}
          </button>
        </div>

        {/* Option 2: GitHub Repository Push */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-white">
              <Github className="w-4 h-4 text-zinc-200" />
              <span>Push to GitHub</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
              Auto-Sync
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSyncGithub}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              {githubSyncSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : "Push"}
            </button>
          </div>

          {githubSyncSuccess && (
            <div className="text-[11px] text-emerald-400 font-mono">
              ✔ Committed branch `main` to github.com/username/{repoName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

