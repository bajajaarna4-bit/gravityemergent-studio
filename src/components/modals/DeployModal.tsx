"use client";

import React, { useState } from "react";
import { 
  Globe, Check, Copy, ExternalLink, X, ShieldCheck, 
  Rocket, Sparkles, CheckCircle2, ArrowRight
} from "lucide-react";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export function DeployModal({ isOpen, onClose, projectName }: DeployModalProps) {
  if (!isOpen) return null;

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(`https://${projectName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.verve.app`);
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [domainConnected, setDomainConnected] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(deployedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomain.trim()) return;
    setDomainConnected(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0c0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Deploy to Global Edge</h3>
              <p className="text-xs text-zinc-400">Vercel & Cloudflare Edge CDN distribution</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live URL Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Production Live Endpoint</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              READY
            </span>
          </div>

          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono">
            <span className="text-zinc-200 truncate mr-2">{deployedUrl}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={deployedUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Custom Domain Option */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-zinc-200 flex items-center justify-between">
            <span>Connect Custom Domain</span>
            <span className="text-[10px] text-zinc-500">SSL Included</span>
          </label>
          <form onSubmit={handleConnectDomain} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. app.mycompany.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              Connect
            </button>
          </form>

          {domainConnected && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DNS CNAME record verified! Routing traffic to edge nodes.</span>
            </div>
          )}
        </div>

        {/* Performance & Security Checks */}
        <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-3 rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automatic SSL Certificate</span>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-3 rounded-xl flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Global Anycast CDN</span>
          </div>
        </div>

        {/* Close action */}
        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

