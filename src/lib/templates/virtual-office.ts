import { VirtualFileMap, ProjectSpec } from "../types";

export const virtualOfficeSpec: ProjectSpec = {
  id: "virtual-office-dash",
  name: "GatherPulse AI",
  tagline: "The Spatial Virtual Headquarters for Remote & Autonomous Teams",
  genre: "saas",
  summary: "A spatial virtual office platform featuring interactive floorplan rooms, live audio huddles, screen-share previews, team presence indicators, and synchronous channels.",
  pages: ["Floorplan", "War Room", "Design Studio", "Focus Pods", "Team Lounge"],
  components: [
    "VirtualFloorplanNav",
    "RoomPresenceRoster",
    "LiveAudioHuddleBar",
    "InteractiveScreenViewer",
    "TeamChannelChat",
    "AmbientAudioControls",
    "StickyNotesBoard"
  ],
  features: [
    "Spatial room navigation (War Room, Lounge, Townhall, Focus Pods)",
    "Live audio huddle toggle with animated sound frequency waveforms",
    "Teammate presence avatars with active activity badges",
    "Integrated channel chat with real-time message posting",
    "Ambient soundscape player (Lofi Chords, Rain on Glass, Tokyo Cafe)"
  ],
  approved: true,
  tokens: {
    primary: "#6366f1", // indigo-500
    primaryForeground: "#ffffff",
    secondary: "#10b981", // emerald-500
    accent: "#8b5cf6",
    background: "#09090b",
    surface: "#121217",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "16px",
    mood: "Spatial, collaborative, futuristic, calm focus"
  },
  databaseTables: [
    {
      name: "office_rooms",
      description: "Virtual spaces with active occupancy, capacity, and current topic",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "name", type: "string" },
        { name: "category", type: "string" },
        { name: "occupancy", type: "number" },
        { name: "activeTopic", type: "string" },
        { name: "isHuddleActive", type: "boolean" }
      ],
      rows: [
        { id: "room-1", name: "AI War Room", category: "engineering", occupancy: 4, activeTopic: "Agentic Loop v3 Architecture Review", isHuddleActive: true },
        { id: "room-2", name: "Design Studio", category: "creative", occupancy: 3, activeTopic: "Spatial UI & Motion Specs", isHuddleActive: true },
        { id: "room-3", name: "Executive Townhall", category: "all-hands", occupancy: 12, activeTopic: "Q4 Roadmap All-Hands", isHuddleActive: false },
        { id: "room-4", name: "Lofi Coffee Bar", category: "social", occupancy: 2, activeTopic: "Casual catch-up & music", isHuddleActive: false },
        { id: "room-5", name: "Focus Pod #4", category: "focus", occupancy: 1, activeTopic: "Deep coding (Do Not Disturb)", isHuddleActive: false }
      ]
    },
    {
      name: "teammates",
      description: "Team members with real-time status and presence location",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "name", type: "string" },
        { name: "role", type: "string" },
        { name: "avatar", type: "string" },
        { name: "status", type: "string" },
        { name: "currentRoom", type: "string" },
        { name: "isMuted", type: "boolean" },
        { name: "isScreenSharing", type: "boolean" }
      ],
      rows: [
        { id: "user-1", name: "Elena Rostova", role: "Principal AI Architect", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", status: "In War Room", currentRoom: "AI War Room", isMuted: false, isScreenSharing: true },
        { id: "user-2", name: "Marcus Chen", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", status: "Pair Programming", currentRoom: "AI War Room", isMuted: true, isScreenSharing: false },
        { id: "user-3", name: "Aria Sterling", role: "Head of Product", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80", status: "In Design Review", currentRoom: "Design Studio", isMuted: false, isScreenSharing: false },
        { id: "user-4", name: "Devon Vance", role: "Staff DevOps Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", status: "Focus Mode", currentRoom: "Focus Pod #4", isMuted: true, isScreenSharing: false }
      ]
    }
  ]
};

export const virtualOfficeFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState, useEffect } from 'react';
import { 
  Users, Volume2, VolumeX, Radio, Sparkles, MessageSquare, 
  Share2, Shield, Settings, Mic, MicOff, Monitor, PhoneOff, 
  Send, Compass, Plus, Heart, Search, CheckCircle2, ChevronRight
} from 'lucide-react';

const ROOMS = [
  { 
    id: 'war-room', 
    name: 'AI War Room', 
    type: 'Engineering', 
    badge: 'LIVE HUDDLE', 
    topic: 'Agentic Loop AST & Latency Optimization', 
    members: 4, 
    ambient: 'Server Room Hum',
    screenshare: true 
  },
  { 
    id: 'design-studio', 
    name: 'Design Studio', 
    type: 'Design', 
    badge: 'ACTIVE REVIEW', 
    topic: 'Spatial UI Dark Gradients & 8pt Tokens', 
    members: 3, 
    ambient: 'Coffee Shop Chatter',
    screenshare: false 
  },
  { 
    id: 'townhall', 
    name: 'Executive Townhall', 
    type: 'All-Hands', 
    badge: 'OPEN SPACE', 
    topic: 'Q4 Product Roadmap & Team Sync', 
    members: 12, 
    ambient: 'Auditorium Ambient',
    screenshare: false 
  },
  { 
    id: 'lofi-cafe', 
    name: 'Lofi Coffee Lounge', 
    type: 'Social', 
    badge: 'CASUAL', 
    topic: 'Chill beats, afternoon coffee & tech chatter', 
    members: 2, 
    ambient: 'Lofi Hip Hop Beats',
    screenshare: false 
  },
  { 
    id: 'focus-pod', 
    name: 'Deep Focus Pod #4', 
    type: 'Deep Work', 
    badge: 'DND', 
    topic: 'Headphones on. Autonomous code synthesis.', 
    members: 1, 
    ambient: 'Brown Noise',
    screenshare: false 
  }
];

const TEAMMATES = [
  { id: 1, name: 'Elena Rostova', role: 'Principal AI Architect', room: 'war-room', status: 'Speaking', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', isSpeaking: true },
  { id: 2, name: 'Marcus Chen', role: 'Staff Frontend Lead', room: 'war-room', status: 'Listening', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', isSpeaking: false },
  { id: 3, name: 'Aria Sterling', role: 'Head of Product', room: 'design-studio', status: 'Reviewing', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', isSpeaking: false },
  { id: 4, name: 'Devon Vance', role: 'DevOps & Infrastructure', room: 'focus-pod', status: 'Deep Focus', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', isSpeaking: false },
  { id: 5, name: 'Kiran Patel', role: 'Systems Architect', room: 'war-room', status: 'Presenting', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', isSpeaking: true }
];

export default function App() {
  const [activeRoomId, setActiveRoomId] = useState('war-room');
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [ambientSound, setAmbientSound] = useState('Lofi Chords');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, author: 'Elena Rostova', time: '14:02', text: 'Hey team, I just pushed the new AST transformer patch to main branch.' },
    { id: 2, author: 'Marcus Chen', time: '14:05', text: 'Checked the live preview, rendering latency dropped from 240ms to 48ms!' },
    { id: 3, author: 'Aria Sterling', time: '14:08', text: 'Love the spatial room layout. Joining the War Room huddle now.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [huddleActive, setHuddleActive] = useState(true);

  const activeRoom = ROOMS.find(r => r.id === activeRoomId) || ROOMS[0];
  const roomTeammates = TEAMMATES.filter(t => t.room === activeRoomId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: 'You (Alex)',
      time: 'Just now',
      text: inputMsg.trim()
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="min-h-screen bg-[#09090d] text-zinc-100 font-sans flex flex-col antialiased selection:bg-indigo-500/30">
      {/* Top Spatial Bar */}
      <header className="h-16 border-b border-zinc-800/80 bg-[#0d0d14]/90 backdrop-blur-xl px-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">GatherPulse</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Spatial Office
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Headquarters • 18 teammates online</p>
          </div>
        </div>

        {/* Ambient Soundscape Controller */}
        <div className="hidden md:flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-full">
          <button 
            onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
            className="text-zinc-400 hover:text-indigo-400 transition-colors"
          >
            {isAmbientPlaying ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
          </button>
          <span className="text-xs text-zinc-300 font-medium">Ambient: {ambientSound}</span>
          <div className="flex gap-1 items-end h-3">
            {[40, 70, 100, 60, 30].map((h, i) => (
              <span 
                key={i} 
                className={\`w-0.5 rounded-full bg-indigo-500/70 \${isAmbientPlaying ? 'animate-pulse' : 'opacity-20'}\`} 
                style={{ height: \`\${h}%\` }}
              />
            ))}
          </div>
        </div>

        {/* User Presence & Huddle Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-medium text-emerald-400">In {activeRoom.name}</span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
            alt="User" 
            className="w-8 h-8 rounded-full ring-2 ring-indigo-500 object-cover"
          />
        </div>
      </header>

      {/* Main Spatial Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Office Floorplan Navigation */}
        <aside className="w-64 border-r border-zinc-800/80 bg-[#0c0c12] p-4 flex flex-col gap-4 hidden lg:flex">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
            <span>Spatial Floorplan</span>
            <span className="text-[11px] font-mono text-indigo-400 font-bold">5 Rooms</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
            {ROOMS.map(room => {
              const isActive = room.id === activeRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={\`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1.5 \${
                    isActive
                      ? 'bg-indigo-600/15 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800/60 text-zinc-300'
                  }\`}
                >
                  <div className="flex items-center justify-between">
                    <span className={\`text-sm font-semibold \${isActive ? 'text-white' : 'text-zinc-200'}\`}>
                      {room.name}
                    </span>
                    <span className={\`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold \${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'
                    }\`}>
                      {room.members} present
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">{room.topic}</p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{room.type}</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-medium">{room.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Audio Huddle Control */}
          <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Room Audio Huddle</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={\`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all \${
                  isMicOn ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }\`}
              >
                {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5 text-zinc-500" />}
                {isMicOn ? 'Mic Live' : 'Muted'}
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={\`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all \${
                  isScreenSharing ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }\`}
              >
                <Monitor className="w-3.5 h-3.5" />
                {isScreenSharing ? 'Sharing' : 'Share Screen'}
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Active Room Stage & Collaboration Canvas */}
        <main className="flex-1 flex flex-col p-5 overflow-y-auto space-y-5">
          {/* Room Banner */}
          <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-zinc-900/60 border border-indigo-500/20 p-6 overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeRoom.badge}
                  </span>
                  <span className="text-xs text-zinc-400">Channel #{activeRoom.id}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{activeRoom.name}</h1>
                <p className="text-sm text-zinc-300 mt-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  {activeRoom.topic}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHuddleActive(!huddleActive)}
                  className={\`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg \${
                    huddleActive 
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                  }\`}
                >
                  {huddleActive ? <PhoneOff className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
                  {huddleActive ? 'Leave Huddle' : 'Join Live Huddle'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen Share / Canvas Stage */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0c12] p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-zinc-200">Elena's Live Canvas • Screen Share</span>
                <span className="text-[11px] text-zinc-500 font-mono">(1920x1080 60FPS)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-[11px] font-mono">AST Debugger Active</span>
              </div>
            </div>

            {/* Simulated Live IDE / Canvas View */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#08080c] aspect-video max-h-[340px] flex flex-col font-mono text-xs">
              <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-zinc-300 font-medium">orchestrator.ts — Verve Engine</span>
                </div>
                <span className="text-emerald-400 font-bold">● Streaming changes</span>
              </div>
              <div className="p-4 space-y-1 text-zinc-300 overflow-y-auto">
                <div className="text-zinc-500">// Real-time AST code transformation pipeline</div>
                <div><span className="text-purple-400">export async function</span> <span className="text-blue-400">synthesizeProject</span>(spec: <span className="text-amber-300">ProjectSpec</span>) &#123;</div>
                <div className="pl-4 text-zinc-400"><span className="text-purple-400">const</span> [planner, designer, frontend] = <span className="text-purple-400">await</span> Promise.all([</div>
                <div className="pl-8 text-emerald-400">runPlannerAgent(spec.prompt),</div>
                <div className="pl-8 text-emerald-400">runDesignerAgent(spec.tokens),</div>
                <div className="pl-8 text-emerald-400">runFrontendAgent(spec.components)</div>
                <div className="pl-4 text-zinc-400">]);</div>
                <div className="pl-4 text-indigo-300">return &#123; success: true, latencyMs: 38 &#125;;</div>
                <div>&#125;</div>
              </div>
            </div>
          </div>

          {/* Active Teammates in This Room */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Teammates in {activeRoom.name}</h2>
              <span className="text-xs text-zinc-500">{roomTeammates.length} active now</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {roomTeammates.map(t => (
                <div 
                  key={t.id} 
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40" />
                      {t.isSpeaking && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-[#0c0c12] flex items-center justify-center">
                          <Mic className="w-2 h-2 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white leading-tight">{t.name}</h3>
                      <p className="text-[11px] text-zinc-400">{t.role}</p>
                      <span className="inline-block mt-0.5 text-[10px] text-emerald-400 font-medium">{t.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {t.isSpeaking && (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
                        TALKING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right: Room Chat Stream */}
        <aside className="w-80 border-l border-zinc-800/80 bg-[#0c0c12] flex flex-col hidden xl:flex">
          <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-zinc-200">Room Live Chat</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">#{activeRoom.id}</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {chatMessages.map(msg => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-zinc-300">{msg.author}</span>
                  <span className="text-zinc-600 font-mono">{msg.time}</span>
                </div>
                <p className="text-xs text-zinc-300 bg-zinc-900/70 border border-zinc-800/60 rounded-xl p-2.5 leading-relaxed">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800/80 bg-[#09090d]">
            <div className="relative">
              <input 
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={\`Message #\${activeRoom.id}...\`}
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 pr-9"
              />
              <button 
                type="submit"
                disabled={!inputMsg.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600 disabled:opacity-30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
`
  }
};
