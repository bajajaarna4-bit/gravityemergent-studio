"use client";

import React, { useState } from "react";
import { Database, Table, Plus, Search, Filter, ShieldCheck, Key, Server } from "lucide-react";
import { DatabaseTable } from "@/lib/types";

interface DatabaseViewerProps {
  tables: DatabaseTable[];
}

export function DatabaseViewer({ tables }: DatabaseViewerProps) {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable>(tables[0] || null);
  const [search, setSearch] = useState("");

  if (!tables || tables.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500 text-xs">
        <Database className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p>No database models generated yet. Submit a prompt to synthesize full-stack schema.</p>
      </div>
    );
  }

  const currentTable = selectedTable || tables[0];

  const filteredRows = currentTable.rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="flex h-full bg-[#09090c] text-zinc-100 font-sans overflow-hidden">
      {/* Left sidebar: table list */}
      <div className="w-56 border-r border-zinc-800 bg-[#0c0c10] p-3 flex flex-col shrink-0">
        <div className="flex items-center gap-2 pb-3 mb-2 border-b border-zinc-800/80">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-xs text-white">Full-Stack Database</span>
        </div>

        <div className="space-y-1">
          {tables.map((t) => (
            <button
              key={t.name}
              onClick={() => setSelectedTable(t)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                currentTable.name === t.name
                  ? "bg-zinc-800 text-white font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Table className="w-3.5 h-3.5 text-zinc-500" />
                <span className="truncate">{t.name}</span>
              </div>
              <span className="text-[10px] text-zinc-500 bg-zinc-950 px-1.5 py-0.2 rounded">
                {t.rows.length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-1.5 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Server className="w-3.5 h-3.5" />
            <span>PostgreSQL Active</span>
          </div>
          <p className="text-[10px]">Embedded in-memory state engine connected to preview handlers.</p>
        </div>
      </div>

      {/* Main table view */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-4 border-b border-zinc-800 bg-[#0c0c10] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white font-mono">{currentTable.name}</h3>
              <span className="text-[10px] text-zinc-500 font-mono">
                {currentTable.columns.length} columns • {currentTable.rows.length} rows
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{currentTable.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search rows..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Rows Table */}
        <div className="flex-1 overflow-auto p-4">
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#101016] border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <tr>
                  {currentTable.columns.map((col) => (
                    <th key={col.name} className="px-4 py-3 font-semibold">
                      <div className="flex items-center gap-1.5">
                        {col.isPrimary && <Key className="w-3 h-3 text-amber-400" />}
                        <span>{col.name}</span>
                        <span className="text-zinc-600 font-normal">({col.type})</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-800/40 transition-colors">
                    {currentTable.columns.map((col) => {
                      const val = row[col.name];
                      return (
                        <td key={col.name} className="px-4 py-2.5 whitespace-nowrap text-zinc-200">
                          {typeof val === "boolean" ? (
                            <span className={val ? "text-emerald-400" : "text-rose-400"}>
                              {String(val)}
                            </span>
                          ) : Array.isArray(val) ? (
                            <span className="text-blue-300">[{val.join(", ")}]</span>
                          ) : typeof val === "string" && val.startsWith("http") ? (
                            <div className="flex items-center gap-2">
                              <img src={val} alt="" className="w-6 h-6 rounded object-cover" />
                              <span className="truncate max-w-[120px] text-zinc-400">{val}</span>
                            </div>
                          ) : (
                            String(val ?? "")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

