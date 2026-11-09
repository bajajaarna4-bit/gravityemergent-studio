"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Monitor, Tablet, Smartphone, RotateCcw, 
  MousePointer2, AlertCircle, RefreshCw
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reloadPreview = () => {
    setLoadError(null);
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
  const rawCode = files["/App.js"]?.content || files["/App.tsx"]?.content || "";

  // Transform raw React code: strip all imports and export default
  const cleanCode = React.useMemo(() => {
    if (!rawCode) return "";
    let code = rawCode;
    // Strip multi-line and single-line import statements across all lines
    code = code.replace(/import[\s\S]*?from\s+['"][^'"]*?['"];?/g, "");
    code = code.replace(/import\s+['"][^'"]*?['"];?/g, "");

    // Transform export default function [Name]
    code = code.replace(/export\s+default\s+function(?:\s+([A-Za-z0-9_$]+))?\s*\(/g, (_match, name) => {
      const fnName = name || '__AnonymousApp';
      return `window.__DefaultExport = ${fnName};\nfunction ${fnName}(`;
    });

    // Transform export default class [Name]
    code = code.replace(/export\s+default\s+class(?:\s+([A-Za-z0-9_$]+))?/g, (_match, name) => {
      const clsName = name || '__AnonymousClass';
      return `window.__DefaultExport = ${clsName};\nclass ${clsName}`;
    });

    // Transform export default <identifier>;
    code = code.replace(/export\s+default\s+([A-Za-z0-9_$]+)\s*;?/g, "window.__DefaultExport = $1;");

    // Catch any remaining export default ...
    code = code.replace(/export\s+default\s+/g, "window.__DefaultExport = ");

    // Replace export const / let / var / function / class
    code = code.replace(/export\s+(const|let|var|function|class)/g, "$1");

    // Replace any remaining standalone exports
    code = code.replace(/export\s*\{[\s\S]*?\};?/g, "");
    return code;
  }, [rawCode]);

  // Bi-directional click-to-edit listener
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "ENABLE_CLICK_TO_EDIT",
      enabled: isClickToEditActive,
    }, "*");
  }, [isClickToEditActive]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "ELEMENT_SELECTED" && e.data?.payload) {
        onSelectElement(e.data.payload);
      }
      if (e.data?.type === "RENDER_ERROR" && e.data?.error) {
        setLoadError(e.data.error);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSelectElement]);

  // Serialized code for iframe
  const encodedCode = React.useMemo(() => {
    try {
      return encodeURIComponent(cleanCode);
    } catch {
      return "";
    }
  }, [cleanCode]);

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
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

  <!-- React 18 & ReactDOM UMD (with dual CDN fallbacks) -->
  <script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <!-- Babel standalone for runtime JSX compilation -->
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.4/babel.min.js"></script>
</head>
<body>
  <div id="root">
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; color: #a1a1aa; font-family: sans-serif; font-size: 13px;">
      <div style="text-align: center;">
        <div style="display: inline-block; width: 24px; height: 24px; border: 2px solid #3b82f6; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 8px;"></div>
        <div>Loading live interactive prototype...</div>
      </div>
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    </div>
  </div>

  <script>
    // Universal icon component factory with standard SVG paths
    const SVG_PATHS = {
      Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      ShoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
      Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      MapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
      Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
      Minus: '<path d="M5 12h14"/>',
      Play: '<polygon points="6 3 20 12 6 21 6 3"/>',
      Check: '<polyline points="20 6 9 17 4 12"/>',
      CheckCircle2: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
      X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      Heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
      Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      ChevronRight: '<path d="m9 18 6-6-6-6"/>',
      ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
      ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
      ArrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
      Sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
      Bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
      Menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
      Send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
      Volume2: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
      VolumeX: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
      ThumbsUp: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3"/>',
      ThumbsDown: '<path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3"/>',
      Share2: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
      Bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
      MessageSquare: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      MessageCircle: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
      Compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
      Home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
      Terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
      Cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
      Copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
      Info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
      MoreHorizontal: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
      PlusSquare: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
      Tv: '<rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/>',
      Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
      Award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.747.544l-4.245-2.23-4.245 2.23a.5.5 0 0 1-.747-.544l1.515-8.526"/><circle cx="12" cy="8" r="6"/>',
      Film: '<rect width="20" height="20" x="2" y="2" rx="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/>',
      Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      Github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>',
      Shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
      Layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5"/><path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5"/>',
      Code2: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'
    };

    function makeIcon(name) {
      return function IconComp(props) {
        var size = props && props.size || 18;
        var className = props && props.className || "";
        var path = SVG_PATHS[name] || '<circle cx="12" cy="12" r="9"/>';
        return React.createElement('svg', {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          className: className,
          dangerouslySetInnerHTML: { __html: path }
        });
      };
    }

    var IconProxy = new Proxy({}, {
      get: function(target, prop) {
        return makeIcon(prop);
      }
    });

    window.React = window.React || {};
    window.ReactDOM = window.ReactDOM || {};

    // Execute application code
    function run() {
      if (!window.React || !window.ReactDOM || !window.Babel) {
        setTimeout(run, 50);
        return;
      }

      var useState = React.useState;
      var useEffect = React.useEffect;
      var useRef = React.useRef;
      var useMemo = React.useMemo;

      // Make all icons available as globals
      for (var iconKey in SVG_PATHS) {
        window[iconKey] = makeIcon(iconKey);
      }

      var codeToRun = decodeURIComponent("${encodedCode}");

      // If code is empty or loading
      if (!codeToRun || !codeToRun.trim()) {
        var rootEl = document.getElementById('root');
        if (rootEl) {
          rootEl.innerHTML = 
            '<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; color: #a1a1aa; font-family: sans-serif; font-size: 13px;">' +
              '<div style="text-align: center;">' +
                '<div style="display: inline-block; width: 28px; height: 28px; border: 2px solid #3b82f6; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 12px;"></div>' +
                '<div style="font-weight: 500; color: #f4f4f5; margin-bottom: 4px;">Synthesizing Prototype...</div>' +
                '<div style="font-size: 12px; color: #71717a;">Multi-agent pipeline is generating component hierarchy & Tailwind classes</div>' +
              '</div>' +
              '<style>@keyframes spin { to { transform: rotate(360deg); } }</style>' +
            '</div>';
        }
        return;
      }

      try {
        var transformed = Babel.transform(codeToRun, {
          presets: ['react']
        }).code;

        var exports = {};
        var module = { exports: {} };
        window.exports = exports;
        window.module = module;

        // Evaluate transformed code
        var fn = new Function('React', 'ReactDOM', 'useState', 'useEffect', 'useRef', 'useMemo', 'IconProxy', 'window', 'exports', 'module', 
          transformed + '\\n return window.__DefaultExport || (typeof App !== "undefined" ? App : null) || (exports && exports.default ? exports.default : null);'
        );
        var AppComp = fn(React, ReactDOM, useState, useEffect, useRef, useMemo, IconProxy, window, exports, module);

        // Fallback: check window for any defined capitalized component
        if (!AppComp && typeof window !== 'undefined') {
          for (var candidate of ['App', 'Main', 'Home', 'Component', 'Page', 'Workspace', 'Feed', 'ZapGrocer', 'CineVerse', 'PulseTube', 'Prism', 'NexusAI']) {
            if (typeof window[candidate] === 'function') {
              AppComp = window[candidate];
              break;
            }
          }
        }

        if (AppComp) {
          var rootEl = document.getElementById('root');
          var root = ReactDOM.createRoot(rootEl);
          root.render(React.createElement(AppComp));
        } else {
          throw new Error('App component was not defined in the generated code.');
        }
      } catch (err) {
        console.error('Preview execution error:', err);
        window.parent.postMessage({ type: 'RENDER_ERROR', error: err.message }, '*');
        document.getElementById('root').innerHTML = 
          '<div style="padding: 24px; color: #f87171; font-family: monospace; background: #18181b; margin: 20px; border-radius: 12px; border: 1px solid #7f1d1d;">' +
            '<h3 style="margin-top: 0; color: #ef4444; font-size: 14px;">Preview Compilation Notice</h3>' +
            '<p style="font-size: 12px; color: #fca5a5;">' + err.message + '</p>' +
            '<p style="font-size: 11px; color: #71717a; margin-top: 12px;">The multi-agent loop can heal this automatically. Try sending an edit instruction in chat.</p>' +
          '</div>';
      }
    }

    // Initialize run once scripts are ready
    if (document.readyState === 'complete') {
      run();
    } else {
      window.addEventListener('load', run);
    }

    // Bi-directional click-to-edit listener
    window.__clickToEdit = ${isClickToEditActive ? "true" : "false"};
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'ENABLE_CLICK_TO_EDIT') {
        window.__clickToEdit = event.data.enabled;
      }
    });

    document.addEventListener('mouseover', function(e) {
      if (!window.__clickToEdit) return;
      var el = e.target.closest('button, h1, h2, h3, h4, p, img, a, [class*="card"], [class*="badge"]');
      if (el) el.classList.add('click-hover-target');
    });

    document.addEventListener('mouseout', function(e) {
      if (!window.__clickToEdit) return;
      var el = e.target.closest('.click-hover-target');
      if (el) el.classList.remove('click-hover-target');
    });

    document.addEventListener('click', function(e) {
      if (!window.__clickToEdit) return;
      var el = e.target.closest('button, h1, h2, h3, h4, p, img, a, [class*="card"], [class*="badge"]');
      if (el) {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll('.click-selected-target').forEach(function(n) {
          n.classList.remove('click-selected-target');
        });
        el.classList.add('click-selected-target');

        var rect = el.getBoundingClientRect();
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
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span className="truncate text-zinc-300">http://localhost:3001/preview</span>
          <span className="ml-auto text-[10px] text-emerald-400 font-semibold">Live Sandbox</span>
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

      {/* Error alert if any */}
      {loadError && (
        <div className="bg-rose-950/60 border-b border-rose-500/40 px-4 py-2 flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Notice: {loadError}</span>
          </div>
          <button onClick={reloadPreview} className="text-[11px] underline hover:text-white">
            Reload
          </button>
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
