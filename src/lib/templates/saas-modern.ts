import { VirtualFileMap, ProjectSpec } from "../types";

export const saasModernSpec: ProjectSpec = {
  id: "saas-nexus-cloud",
  name: "NexusAI",
  tagline: "Autonomous Agent Orchestration Infrastructure for Modern Engineering Teams",
  genre: "saas",
  summary: "A Linear-grade dark developer platform landing page featuring interactive terminal benchmarks, live telemetry metrics, bento-grid feature displays, and transparent tier pricing.",
  pages: ["Home", "Features", "Pricing", "Documentation", "Changelog"],
  components: [
    "GlowingHeroSection",
    "InteractiveTerminalDemo",
    "TelemetryMetricCounters",
    "BentoFeaturesGrid",
    "PricingTierMatrix",
    "CustomerSocialProof"
  ],
  features: [
    "Interactive CLI terminal simulation with executable sub-commands",
    "Real-time animated telemetry metrics (latency, agent throughput, tokens)",
    "Bento feature cards with micro-hover glowing borders",
    "Monthly vs. Annual billing toggle with 20% discount calculator",
    "Enterprise customer logos and verified engineer reviews"
  ],
  tokens: {
    primary: "#6366f1", // indigo-500
    primaryForeground: "#ffffff",
    secondary: "#06b6d4", // cyan-500
    accent: "#3b82f6",
    background: "#08080b",
    surface: "#101017",
    cardBorder: "#1f1f2e",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "14px",
    mood: "Sophisticated, technical, ultra-clean, minimal, high-trust"
  },
  databaseTables: [
    {
      name: "plans",
      description: "Available subscription tiers with pricing and quotas",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "name", type: "string" },
        { name: "monthlyPrice", type: "number" },
        { name: "annualPrice", type: "number" },
        { name: "agentQuota", type: "string" },
        { name: "concurrency", type: "number" },
        { name: "features", type: "array" }
      ],
      rows: [
        {
          id: "plan-dev",
          name: "Developer",
          monthlyPrice: 29,
          annualPrice: 24,
          agentQuota: "50,000 runs/mo",
          concurrency: 5,
          features: ["Unlimited local preview", "Gemini & Claude routing", "GitHub sync", "Community Discord"]
        },
        {
          id: "plan-scale",
          name: "Scale Team",
          monthlyPrice: 99,
          annualPrice: 79,
          agentQuota: "500,000 runs/mo",
          concurrency: 50,
          features: ["Dedicated agent sandbox", "Sub-second cold starts", "Custom fine-tunes", "SOC2 compliance"]
        }
      ]
    }
  ],
  approved: true
};

export const saasModernFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Terminal, Sparkles, Cpu, Shield, ArrowRight, CheckCircle2, 
  Layers, Code2, Zap, Copy, Check, Users, Star, Github
} from 'lucide-react';

export default function App() {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [activeTab, setActiveTab] = useState('cli');
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-[#07070a]/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Nexus<span className="text-indigo-400">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-white transition-colors">Changelog</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-xs text-zinc-300 hover:text-white font-medium px-3 py-1.5">
              Sign In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg shadow-indigo-600/25 transition-all">
              Start Free Trial
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-medium text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Announcing Nexus 3.0: 10x faster agent orchestration</span>
          <ArrowRight className="w-3 h-3 text-indigo-400" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
          The autonomous agent infrastructure for <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">serious engineering.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Deploy fleets of specialized AI agents that write production code, run tests, debug AST breakages, and self-heal deployments — all within your secure VPC.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-white/10 transition-transform active:scale-95">
            Deploy in 60 Seconds <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-300">
            <span className="text-zinc-500 mr-2">$</span>
            <span>npx create-nexus-agent@latest</span>
            <button onClick={copyCommand} className="ml-3 text-zinc-400 hover:text-white p-1">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12 border-t border-zinc-800/80">
          <div>
            <div className="text-2xl font-black text-white font-mono">1.2B+</div>
            <div className="text-[11px] text-zinc-400">Tokens Processed / Day</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400 font-mono">&lt; 14ms</div>
            <div className="text-[11px] text-zinc-400">Agent Cold Start</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">99.99%</div>
            <div className="text-[11px] text-zinc-400">Uptime SLA Guaranteed</div>
          </div>
          <div>
            <div className="text-2xl font-black text-cyan-400 font-mono">14,200+</div>
            <div className="text-[11px] text-zinc-400">Production Deployments</div>
          </div>
        </div>
      </section>

      {/* Interactive Terminal Demo */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#0e0e14] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-zinc-900/80 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2">nexus-orchestrator — bash — 80x24</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ORCHESTRATING LIVE
            </div>
          </div>

          <div className="p-6 font-mono text-xs space-y-3 text-zinc-300">
            <div className="text-zinc-500">$ nexus swarm init --cluster=production-us-east</div>
            <div className="text-cyan-400">✔ Initialized 7 specialized subagent workers [Planner, Designer, Coder, QA, Fixer]</div>
            <div className="text-zinc-400">▶ Step 1: Synthesizing database migration & GraphQL resolver schemas...</div>
            <div className="text-emerald-400">✔ Schema verified against PostgreSQL AST (0 syntax errors, 14 relations established)</div>
            <div className="text-zinc-400">▶ Step 2: Running automated sandbox test suite against mobile breakpoint (375px)...</div>
            <div className="text-amber-400">⚠ Layout overflow detected in CartDrawer.tsx on line 42</div>
            <div className="text-indigo-400">⚙ Fixer Agent dispatched: patching responsive flex layout with clamp() tokens...</div>
            <div className="text-emerald-400">✔ All 38 unit & visual regression tests PASSED in 412ms</div>
            <div className="text-white bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60 mt-4">
              🚀 <strong className="text-white">Artifact ready to ship:</strong> https://app.nexus.build/deploy/nexus-v3-prod
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Predictable Pricing for High-Volume Teams</h2>
          <p className="text-xs sm:text-sm text-zinc-400">Start free for individual experiments. Upgrade as your agent usage scales.</p>

          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={\`px-3.5 py-1.5 rounded-lg font-medium transition-colors \${
                billingCycle === 'monthly' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
              }\`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={\`px-3.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 \${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400'
              }\`}
            >
              <span>Annual</span>
              <span className="bg-cyan-400 text-zinc-950 text-[10px] px-1.5 py-0.2 rounded font-bold">20% OFF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Developer Tier */}
          <div className="bg-[#0f0f15] border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="font-bold text-base text-white">Developer</h3>
              <p className="text-xs text-zinc-400 mt-1">For solo engineers and creators building agentic apps.</p>
            </div>
            <div className="font-mono">
              <span className="text-3xl font-black text-white">\${billingCycle === 'annual' ? 24 : 29}</span>
              <span className="text-xs text-zinc-500"> / month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 50,000 autonomous agent executions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 5 concurrent subagent workers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Live browser sandbox with click-to-edit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> GitHub 1-click synchronization</li>
            </ul>
            <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
              Get Started with Developer
            </button>
          </div>

          {/* Scale Tier */}
          <div className="bg-[#0f0f15] border-2 border-indigo-500/80 rounded-2xl p-6 space-y-5 relative shadow-xl shadow-indigo-500/10">
            <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h3 className="font-bold text-base text-white">Scale Team</h3>
              <p className="text-xs text-zinc-400 mt-1">For growing startups and teams shipping production software.</p>
            </div>
            <div className="font-mono">
              <span className="text-3xl font-black text-white">\${billingCycle === 'annual' ? 79 : 99}</span>
              <span className="text-xs text-zinc-500"> / month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 500,000 autonomous agent executions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 50 concurrent subagent workers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Claude 3.7 & Gemini 2.0 Pro high-speed access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Automated QA & Fixer self-healing loop</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Dedicated VPC sandbox isolated instances</li>
            </ul>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/30">
              Deploy Scale Team Plan
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 px-6 py-10 text-center text-xs text-zinc-500">
        <p>© 2026 NexusAI Systems, Inc. Engineered for autonomous software creation.</p>
      </footer>
    </div>
  );
}
`
  }
};

