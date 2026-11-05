"use client";

import React, { useState } from "react";
import { FileCode, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { VirtualFileMap } from "@/lib/types";

interface CodeEditorViewerProps {
  files: VirtualFileMap;
  activeFilePath?: string;
  onSelectFile?: (path: string) => void;
}

export function CodeEditorViewer({ files, activeFilePath, onSelectFile }: CodeEditorViewerProps) {
  const filePaths = Object.keys(files);
  const currentPath = activeFilePath || filePaths[0] || "/App.js";
  const currentFile = files[currentPath] || { content: "", language: "javascript" };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#09090c] text-zinc-100 font-mono text-xs overflow-hidden">
      {/* File Tabs Bar */}
      <div className="h-10 bg-[#0c0c10] border-b border-zinc-800 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {filePaths.map((path) => (
            <button
              key={path}
              onClick={() => onSelectFile && onSelectFile(path)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                currentPath === path
                  ? "bg-zinc-800 text-white font-bold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span>{path}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded text-zinc-300 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="flex-1 p-4 overflow-auto bg-[#0a0a0e] leading-relaxed">
        <pre className="text-zinc-300">
          <code>{currentFile.content}</code>
        </pre>
      </div>
    </div>
  );
}

