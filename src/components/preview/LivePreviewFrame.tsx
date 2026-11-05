"use client";

import React, { useState } from "react";
import { 
  Monitor, Tablet, Smartphone, RotateCcw, ExternalLink, 
  MousePointer2, Eye, ShieldCheck, Sparkles, Layers
} from "lucide-react";
import { DeviceViewport, ClickToEditTarget, VirtualFileMap } from "@/lib/types";

interface LivePreviewFrameProps {
  files: VirtualFileMap;
  viewport: DeviceViewport;
  onViewportChange: (vp: DeviceViewport) => void;
  isClickToEditActive: boolean;
  onToggleClickToEdit: () => void;
  onSelectElement: (target: ClickToEditTarget) => void;
  selectedElement: ClickToEditTarget | null;
}

export function LivePreviewFrame({
  files,
  viewport,
  onViewportChange,
  isClickToEditActive,
  onToggleClickToEdit,
  onSelectElement,
  selectedElement,
}: LivePreviewFrameProps) {
  const [key, setKey] = useState(0);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "ENABLE_CLICK_TO_EDIT",
      enabled: isClickToEditActive,
    }, "*");
  }, [isClickToEditActive]);

  const reloadPreview = () => {
    setKey((prev) => prev + 1);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "w-[375px] h-[720px] rounded-[36px] border-[10px] border-zinc-800 shadow-2xl";
      case "tablet":
        return "w-[768px] h-[820px] rounded-2xl border-4 border-zinc-800 shadow-2xl";
      case "desktop":
      default:
        return "w-full h-full rounded-xl border border-zinc-800";
    }
  };

  // Compile app code from virtual files into a self-contained HTML bundle with Tailwind & Lucide
  const appCode = files["/App.js"]?.content || files["/App.tsx"]?.content || "";

  // Prepare iframe source doc with Babel standalone, React 18, and Tailwind CDN
  const iframeSrcDoc = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '#3b82f6',
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #09090b;
      color: #fafafa;
    }
    .click-hover-target {
      outline: 2px dashed #3b82f6 !important;
      outline-offset: 2px;
      cursor: crosshair !important;
    }
    .click-selected-target {
      outline: 2px solid #10b981 !important;
      outline-offset: 2px;
    }
  </style>

  <!-- React 18 & ReactDOM UMD -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <!-- Lucide icons bundle -->
  <script src="https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js"></script>
  <script src="https://unpkg.com/lucide-react@0.454.0/dist/umd/lucide-react.min.js"></script>
  <!-- Babel for runtime JSX transpilation -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    // Map Lucide icons safely to window
    const LucideIcons = window.LucideReact || {};
    
    // Fallback proxy for any missing icon
    const iconHandler = {
      get: (target, prop) => {
        if (prop in target) return target[prop];
        return (props) => (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="m10 15 5-3-5-3v6Z" />
          </svg>
        );
      }
    };
    const SafeIcons = new Proxy(LucideIcons, iconHandler);

    // Destructure commonly used icons
    const {
      Zap, ShoppingBag, Clock, MapPin, Search, Plus, Minus, ChevronRight, 
      ArrowRight, ShieldCheck, Sparkles, CheckCircle2, X, Play, Info, 
      Volume2, VolumeX, ChevronLeft, Bell, Film, Flame, Award, Heart, 
      Star, Check, Menu, ThumbsUp, ThumbsDown, Share2, Bookmark, 
      MessageSquare, Home, Compass, Tv, ArrowLeft, Send, MessageCircle, 
      MoreHorizontal, PlusSquare, User, Terminal, Cpu, Shield, Layers, 
      Code2, Copy, Users, Github
    } = SafeIcons;

    try {
      ${appCode.replace(/import\s+.*?from\s+['"].*?['"];?/g, "")}

      const rootElement = document.getElementById('root');
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    } catch (err) {
      console.error("Runtime compilation error:", err);
      document.getElementById('root').innerHTML = \`
        <div style="padding: 24px; color: #f87171; font-family: monospace; background: #1c1917; margin: 16px; border-radius: 12px; border: 1px solid #7f1d1d;">
          <h3 style="margin-top: 0; color: #ef4444;">Live Sandbox Render Notice</h3>
          <p>\${err.message}</p>
        </div>
      \`;
    }

    // Bi-directional click-to-edit listener
    window.__clickToEdit = ${isClickToEditActive ? "true" : "false"};
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'ENABLE_CLICK_TO_EDIT') {
        window.__clickToEdit = event.data.enabled;
      }
    });

    document.addEventListener('mouseover', (e) => {
      if (!window.__clickToEdit) return;
      const el = e.target.closest('button, h1, h2, h3, h4, p, img, a, [class*="card"], [class*="badge"]');
      if (el) {
        el.classList.add('click-hover-target');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (!window.__clickToEdit) return;
      const el = e.target.closest('.click-hover-target');
      if (el) {
        el.classList.remove('click-hover-target');
      }
    });

    document.addEventListener('click', (e) => {
      if (!window.__clickToEdit) return;
      const el = e.target.closest('button, h1, h2, h3, h4, p, img, a, [class*="card"], [class*="badge"]');
      if (el) {
        e.preventDefault();
        e.stopPropagation();
        
        document.querySelectorAll('.click-selected-target').forEach(n => n.classList.remove('click-selected-target'));
        el.classList.add('click-selected-target');

        const rect = el.getBoundingClientRect();
        window.parent.postMessage({
          type: 'ELEMENT_SELECTED',
          payload: {
            tagName: el.tagName.toLowerCase(),
            selector: el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : el.tagName.toLowerCase(),
            textSnippet: (el.innerText || el.alt || '').substring(0, 60),
            componentHint: el.tagName,
            domRect: {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            }
          }
        }, '*');
      }
    }, true);
  </script>
</body>
</html>`;

  // Listen to messages from the sandbox iframe
  React.useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "ELEMENT_SELECTED" && e.data?.payload) {
        onSelectElement(e.data.payload);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSelectElement]);

  return (
    <div className="flex flex-col h-full bg-[#07070a] overflow-hidden">
      {/* Top Preview Control Bar */}
      <div className="h-12 border-b border-zinc-800 bg-[#0c0c10] px-4 flex items-center justify-between shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg">
          <button
            onClick={() => onViewportChange("desktop")}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Desktop View (Full Screen)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewportChange("tablet")}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === "tablet" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewportChange("mobile")}
            className={`p-1.5 rounded-md transition-colors ${
              viewport === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Browser Mock URL bar */}
        <div className="hidden sm:flex items-center gap-2 bg-zinc-950 border border-zinc-800/80 px-3 py-1 rounded-full text-xs text-zinc-400 font-mono max-w-sm w-full mx-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="truncate text-zinc-300">https://preview.verve.studio/live</span>
          <span className="ml-auto text-[10px] text-zinc-600">Sandpack</span>
        </div>

        {/* Tools (Click-to-Edit, Reload) */}
        <div className="flex items-center gap-2">
          {/* Click to edit button */}
          <button
            onClick={onToggleClickToEdit}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-medium border transition-all ${
              isClickToEditActive
                ? "bg-blue-600/20 text-blue-400 border-blue-500/50 shadow-sm"
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <MousePointer2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Click-to-Edit</span>
          </button>

          <button
            onClick={reloadPreview}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Refresh Preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selected Element Pill Toast (if any) */}
      {selectedElement && (
        <div className="bg-blue-950/60 border-b border-blue-500/30 px-4 py-2 flex items-center justify-between text-xs text-blue-300">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-zinc-950 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
              {selectedElement.tagName}
            </span>
            <span className="truncate max-w-md font-mono text-[11px] text-zinc-300">
              "{selectedElement.textSnippet}"
            </span>
          </div>
          <span className="text-[10px] text-blue-400">Target selected for chat edit</span>
        </div>
      )}

      {/* Viewport Frame Stage */}
      <div className="flex-1 bg-[#09090c] p-2 sm:p-4 flex items-center justify-center overflow-auto">
        <div className={`transition-all duration-300 overflow-hidden relative ${getViewportWidth()}`}>
          <iframe
            ref={iframeRef}
            key={key}
            srcDoc={iframeSrcDoc}
            title="Verve Studio Live Preview"
            className="w-full h-full border-0 bg-black"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}

