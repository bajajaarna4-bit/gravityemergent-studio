"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Play, Eye } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hand-Crafted Genre Engines</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineered for distinct visual genres.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Every site type has its own distinct typography, energy, card density, and motion patterns. No generic cookie-cutter templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="group bg-[#0e0e14] border border-zinc-800/80 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-zinc-950">
                <img
                  src={tmpl.previewThumbnail}
                  alt={tmpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur border border-zinc-700 text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {tmpl.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/80 font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded">
                  {tmpl.spec.pages.length} Pages • {tmpl.spec.databaseTables.length} Tables
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{tmpl.description}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {tmpl.spec.components.slice(0, 3).map((c, i) => (
                    <span
                      key={i}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onSelectTemplate(tmpl.id)}
                className="w-full bg-zinc-900 hover:bg-blue-600 text-zinc-200 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors border border-zinc-800 hover:border-blue-500 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-600/20"
              >
                <span>Launch in Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

