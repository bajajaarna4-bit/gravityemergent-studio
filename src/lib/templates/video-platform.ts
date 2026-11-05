import { VirtualFileMap, ProjectSpec } from "../types";

export const videoPlatformSpec: ProjectSpec = {
  id: "video-pulse-tube",
  name: "PulseTube",
  tagline: "High-Bitrate Creator-First Video Platform",
  genre: "video",
  summary: "A YouTube-caliber video streaming and community hub with responsive video feeds, channel subscriptions, instant watch theatre view, live comment threads, and algorithmic recommendation rails.",
  pages: ["Home", "Subscriptions", "Trending", "Watch View", "Channel Profile"],
  components: [
    "VideoGridFeed",
    "CollapsibleSidebar",
    "WatchTheaterView",
    "ChannelSubscriptionPill",
    "InteractiveCommentSection",
    "RecommendedVideoRail",
    "CategoryChipsBar"
  ],
  features: [
    "Full watch-page transition with expandable description and timestamp chapters",
    "Interactive Like, Dislike, Share and Save to Playlist actions",
    "Subscribers toggle with toast feedback",
    "Nested comment thread simulation with upvoting",
    "Sidebar quick-collapse for expanded cinema view"
  ],
  tokens: {
    primary: "#ef4444", // red-500
    primaryForeground: "#ffffff",
    secondary: "#3b82f6", // blue-500
    accent: "#64748b",
    background: "#09090b",
    surface: "#121215",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "12px",
    mood: "Creator-focused, dynamic, high-engagement, responsive"
  },
  databaseTables: [
    {
      name: "videos",
      description: "Uploaded creator content with metrics and metadata",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "title", type: "string" },
        { name: "channelName", type: "string" },
        { name: "channelAvatar", type: "string" },
        { name: "views", type: "string" },
        { name: "uploadedAt", type: "string" },
        { name: "duration", type: "string" },
        { name: "thumbnail", type: "string" },
        { name: "likes", type: "number" }
      ],
      rows: [
        {
          id: "vid-1",
          title: "Building an Autonomous AI Agent Cluster in Rust & CUDA from Scratch",
          channelName: "Synthex Labs",
          channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
          views: "342K views",
          uploadedAt: "3 days ago",
          duration: "42:15",
          thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
          likes: 24500
        },
        {
          id: "vid-2",
          title: "Tokyo 4K Cyberpunk Night Walk in Heavy Rain (Binaural 3D Audio)",
          channelName: "Nomad Visuals",
          channelAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
          views: "1.2M views",
          uploadedAt: "2 weeks ago",
          duration: "1:14:02",
          thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
          likes: 89000
        },
        {
          id: "vid-3",
          title: "Why Modern Web Architectures are Moving Back to Single Binaries",
          channelName: "DevEngine Radio",
          channelAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          views: "185K views",
          uploadedAt: "1 day ago",
          duration: "18:40",
          thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          likes: 14200
        }
      ]
    },
    {
      name: "comments",
      description: "Community discussion on videos",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "videoId", type: "string" },
        { name: "author", type: "string" },
        { name: "text", type: "string" },
        { name: "likes", type: "number" }
      ],
      rows: [
        {
          id: "c-1",
          videoId: "vid-1",
          author: "Elena Rostova",
          text: "The zero-copy memory mapping diagram at 14:20 completely clarified how low-latency IPC works here. Masterclass!",
          likes: 412
        }
      ]
    }
  ],
  approved: true
};

export const videoPlatformFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Menu, Search, Bell, ThumbsUp, ThumbsDown, Share2, Bookmark, 
  MessageSquare, Play, CheckCircle2, Home, Compass, Flame, 
  Clock, Tv, ArrowLeft, Send
} from 'lucide-react';

const CATEGORIES = ['All', 'Systems Programming', 'Cyberpunk Ambience', 'Next.js 15', 'Space Tech', 'GPU Kernels', 'Lo-Fi Chill'];

const VIDEOS = [
  {
    id: 'v1',
    title: 'Building an Autonomous AI Agent Cluster in Rust & CUDA from Scratch',
    channel: 'Synthex Labs',
    subscribers: '624K',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    views: '342K views',
    time: '3 days ago',
    duration: '42:15',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    likes: 24500,
    description: 'In this complete engineering walkthrough, we dive into building a distributed multi-agent coordinator using Rust, async Tokio runtimes, and direct CUDA kernel bindings for sub-millisecond local tensor inferences.'
  },
  {
    id: 'v2',
    title: 'Tokyo 4K Cyberpunk Night Walk in Heavy Rain (Binaural 3D Audio)',
    channel: 'Nomad Visuals',
    subscribers: '1.4M',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    views: '1.2M views',
    time: '2 weeks ago',
    duration: '1:14:02',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    likes: 89000,
    description: 'Immerse yourself in neon reflections through the alleyways of Shinjuku and Akihabara. Mastered with 3D binaural microphones for optimal headphone listening.'
  },
  {
    id: 'v3',
    title: 'Why Modern Web Architectures are Moving Back to Single Binaries',
    channel: 'DevEngine Radio',
    subscribers: '280K',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    views: '185K views',
    time: '1 day ago',
    duration: '18:40',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    likes: 14200,
    description: 'Microservice fatigue has led top engineering teams to re-evaluate single-binary deployments with embedded SQLite and distributed Raft replication.'
  },
  {
    id: 'v4',
    title: 'Orbital Assembly of Modular Space Habitats in 2026',
    channel: 'CosmoDynamics',
    subscribers: '890K',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    views: '520K views',
    time: '4 days ago',
    duration: '27:08',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    likes: 41800,
    description: 'A deep dive into robotic autonomous docking mechanisms and carbon-nanotube tensile rings engineered for centrifugal gravity modules.'
  }
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likedVideos, setLikedVideos] = useState({});
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      text: 'The explanation on zero-copy ring buffers blew my mind. Outstanding video quality as always!',
      time: '2 hours ago',
      likes: 142
    },
    {
      id: 2,
      author: 'Sophia Sterling',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      text: 'Can you please make a follow-up on deploying this on heterogeneous edge devices?',
      time: '5 hours ago',
      likes: 67
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const toggleLike = (vidId) => {
    setLikedVideos(prev => ({ ...prev, [vidId]: !prev[vidId] }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        author: 'You (Alex Vance)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        text: newComment,
        time: 'Just now',
        likes: 0
      },
      ...comments
    ]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400">
            <Menu className="w-5 h-5" />
          </button>
          <div 
            onClick={() => setActiveVideo(null)} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Pulse<span className="text-red-500">Tube</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center flex-1 max-w-lg mx-6">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search high-bitrate creator videos..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-l-full py-2 pl-4 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
          </div>
          <button className="bg-zinc-800 hover:bg-zinc-700 border border-l-0 border-zinc-800 px-4 py-2 rounded-r-full text-zinc-400 hover:text-white">
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800">
            <Bell className="w-4 h-4" />
          </button>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="You" 
            className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700"
          />
        </div>
      </header>

      {/* Main Content Area */}
      {activeVideo ? (
        /* WATCH THEATER VIEW */
        <div className="max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Back button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Feed
            </button>

            {/* Video Player Mock */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center group">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl shadow-red-600/40 hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono bg-black/60 px-2 py-0.5 rounded">04:12 / {activeVideo.duration}</span>
                <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold">1440p60 HDR</span>
              </div>
            </div>

            {/* Video Meta */}
            <div className="space-y-3">
              <h1 className="text-base sm:text-xl font-bold text-white tracking-tight">{activeVideo.title}</h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <img src={activeVideo.avatar} alt={activeVideo.channel} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-zinc-100 flex items-center gap-1">
                      {activeVideo.channel}
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400/20" />
                    </div>
                    <span className="text-[11px] text-zinc-400">{activeVideo.subscribers} subscribers</span>
                  </div>
                  <button 
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={\`ml-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all \${
                      isSubscribed
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-md'
                    }\`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleLike(activeVideo.id)}
                    className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border \${
                      likedVideos[activeVideo.id]
                        ? 'bg-red-500/10 text-red-400 border-red-500/40'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                    }\`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{(activeVideo.likes + (likedVideos[activeVideo.id] ? 1 : 0)).toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-full text-xs text-zinc-300">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>

              {/* Description box */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 text-xs text-zinc-300 space-y-2">
                <div className="font-semibold text-zinc-200 flex items-center gap-2">
                  <span>{activeVideo.views}</span>
                  <span>•</span>
                  <span>{activeVideo.time}</span>
                </div>
                <p className="leading-relaxed">{activeVideo.description}</p>
              </div>

              {/* Comment Thread */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-zinc-400" />
                  <h3 className="font-bold text-sm text-white">{comments.length} Comments</h3>
                </div>

                <form onSubmit={handleAddComment} className="flex gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                    alt="You" 
                    className="w-8 h-8 rounded-full object-cover shrink-0" 
                  />
                  <div className="flex-1 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a constructive comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {comments.map(c => (
                    <div key={c.id} className="flex gap-3 text-xs">
                      <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-200">{c.author}</span>
                          <span className="text-[10px] text-zinc-500">{c.time}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Up Next Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-wider">Up Next</h4>
            {VIDEOS.filter(v => v.id !== activeVideo.id).map(v => (
              <div 
                key={v.id} 
                onClick={() => setActiveVideo(v)}
                className="flex gap-3 group cursor-pointer p-2 rounded-xl hover:bg-zinc-900/60 transition-colors"
              >
                <div className="relative w-36 aspect-video rounded-lg overflow-hidden shrink-0">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/80 font-mono text-[9px] px-1 rounded text-white font-medium">
                    {v.duration}
                  </span>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-zinc-200 group-hover:text-red-400 line-clamp-2 transition-colors">
                    {v.title}
                  </h5>
                  <div className="text-[10px] text-zinc-500">{v.channel}</div>
                  <div className="text-[10px] text-zinc-500">{v.views}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* HOME FEED VIEW */
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors \${
                  activeCategory === cat 
                    ? 'bg-zinc-100 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {VIDEOS.map(video => (
              <div 
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group cursor-pointer space-y-2.5"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="flex gap-3">
                  <img src={video.avatar} alt={video.channel} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-red-400 line-clamp-2 leading-snug transition-colors">
                      {video.title}
                    </h3>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <span>{video.channel}</span>
                      <CheckCircle2 className="w-3 h-3 text-zinc-500" />
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {video.views} • {video.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`
  }
};

