"use client";

import React from "react";
import { Folder, FileCode, ChevronRight, FileJson, FileText, CheckCircle2 } from "lucide-react";
import { VirtualFileMap } from "@/lib/types";

interface FileTreeViewerProps {
  files: VirtualFileMap;
  selectedFile: string;
  onSelectFile: (path: string) => void;
}

export function FileTreeViewer({ files, selectedFile, onSelectFile }: FileTreeViewerProps) {
  const fileEntries = Object.entries(files);

  const getFileIcon = (path: string) => {
    if (path.endsWith(".json")) return <FileJson className="w-4 h-4 text-amber-400" />;
    if (path.endsWith(".md")) return <FileText className="w-4 h-4 text-emerald-400" />;
    return <FileCode className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="flex h-full bg-[#09090c] text-zinc-100 font-sans text-xs overflow-hidden">
      {/* Tree panel */}
      <div className="w-64 border-r border-zinc-800 bg-[#0c0c10] p-4 flex flex-col shrink-0">
        <div className="font-bold text-xs text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-400" />
          <span>Project Root</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px] py-1 px-2">
            <ChevronRight className="w-3.5 h-3.5" />
            <Folder className="w-3.5 h-3.5 text-yellow-500" />
            <span>src/</span>
          </div>

          <div className="pl-4 space-y-1">
            {fileEntries.map(([path, file]) => (
              <button
                key={path}
                onClick={() => onSelectFile(path)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg font-mono text-xs flex items-center justify-between transition-colors ${
                  selectedFile === path
                    ? "bg-zinc-800 text-white font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {getFileIcon(path)}
                  <span className="truncate">{path}</span>
                </div>
                {file.isModified && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl text-[11px] text-zinc-400 space-y-1">
          <div className="font-bold text-zinc-200">VFS Status</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> In-Memory Virtual File System
          </div>
        </div>
      </div>

      {/* File Content Preview */}
      <div className="flex-1 p-6 overflow-auto bg-[#0a0a0e] font-mono text-xs">
        <div className="pb-3 mb-4 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-300 font-bold">{selectedFile}</span>
          <span className="text-zinc-500 text-[10px]">
            {files[selectedFile]?.content.length || 0} characters
          </span>
        </div>
        <pre className="text-zinc-300 leading-relaxed">
          <code>{files[selectedFile]?.content}</code>
        </pre>
      </div>
    </div>
  );
}

