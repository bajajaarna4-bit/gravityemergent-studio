"use client";

import React from "react";
import { History, RotateCcw, Check, X, Clock, FileCode } from "lucide-react";
import { VersionSnapshot } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshots: VersionSnapshot[];
  onRestore: (snapshot: VersionSnapshot) => void;
}

export function VersionHistoryModal({
  isOpen,
  onClose,
  snapshots,
  onRestore,
}: VersionHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0c0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Version History</h3>
              <p className="text-xs text-zinc-400">Time-travel and restore previous agent revisions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshots List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {snapshots.map((snap, idx) => (
            <div
              key={snap.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-zinc-200">{snap.label}</span>
                  {idx === 0 && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] px-1.5 py-0.2 rounded font-mono">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(snap.timestamp)}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400">{snap.promptDescription}</p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {Object.keys(snap.files).length} files in snapshot
                </span>
                {idx !== 0 && (
                  <button
                    onClick={() => {
                      onRestore(snap);
                      onClose();
                    }}
                    className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Restore
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

