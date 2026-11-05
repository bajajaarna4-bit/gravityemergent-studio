import { VirtualFileMap, ProjectSpec } from "../types";

export const socialFeedSpec: ProjectSpec = {
  id: "social-prism-feed",
  name: "PrismSocial",
  tagline: "Curated Visual Journal & Aesthetic Creator Community",
  genre: "social",
  summary: "An Instagram-inspired immersive visual feed featuring gradient animated stories, double-tap heart interactions, comments overlay, bookmark collections, and creator portfolios.",
  pages: ["Feed", "Explore", "Reels", "Messages", "Profile"],
  components: [
    "StoriesRail",
    "PostFeedCard",
    "DoubleTapHeartEffect",
    "CreatorProfileHeader",
    "MediaGridExplore",
    "CommentsSlideover",
    "BottomNavigationDock"
  ],
  features: [
    "Gradient glowing stories bar with unread status indicators",
    "Interactive double-tap heart animation & like counter updates",
    "Bookmark saving with instant collection feedback",
    "Explore grid with hover metrics (likes, comments)",
    "Creator bio with real follower metrics and highlight bubbles"
  ],
  tokens: {
    primary: "#ec4899", // pink-500
    primaryForeground: "#ffffff",
    secondary: "#8b5cf6", // purple-500
    accent: "#f43f5e",
    background: "#08080a",
    surface: "#121216",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "16px",
    mood: "Aesthetic, visual-first, intimate, high-engagement"
  },
  databaseTables: [
    {
      name: "posts",
      description: "User submitted photo journals and aesthetic captures",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "username", type: "string" },
        { name: "userAvatar", type: "string" },
        { name: "location", type: "string" },
        { name: "mediaUrl", type: "string" },
        { name: "caption", type: "string" },
        { name: "likes", type: "number" },
        { name: "commentsCount", type: "number" }
      ],
      rows: [
        {
          id: "post-101",
          username: "aurora.lens",
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          location: "Reykjavík, Iceland",
          mediaUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
          caption: "Chasing glacial auroras at 2 AM. The silence out here is tangible. Shot on 35mm f/1.4. ✨❄️",
          likes: 4210,
          commentsCount: 184
        },
        {
          id: "post-102",
          username: "kaito_minimal",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
          location: "Kyoto Botanical Sanctuaries",
          mediaUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
          caption: "Morning mist settling over bamboo groves. Architecture harmonizing with stone and water.",
          likes: 3105,
          commentsCount: 92
        }
      ]
    }
  ],
  approved: true
};

export const socialFeedFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, 
  Compass, PlusSquare, Home, User, Sparkles, Check, X
} from 'lucide-react';

const STORIES = [
  { id: 1, name: 'Your Story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', isUser: true, hasUnread: false },
  { id: 2, name: 'aurora.lens', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', hasUnread: true },
  { id: 3, name: 'kaito_arch', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', hasUnread: true },
  { id: 4, name: 'elena_sound', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', hasUnread: true },
  { id: 5, name: 'nordic_space', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80', hasUnread: false }
];

const INITIAL_POSTS = [
  {
    id: 'p1',
    user: 'aurora.lens',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    location: 'Reykjavík, Iceland',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    likes: 4210,
    caption: 'Chasing emerald auroras over dormant basalt valleys at 2 AM. The cold is piercing, but the stillness heals. 🌌❄️',
    time: '2 hours ago',
    comments: [
      { id: 1, author: 'kaito_arch', text: 'Unbelievable clarity on the horizon line!' },
      { id: 2, author: 'elena_sound', text: 'This looks like an album cover.' }
    ]
  },
  {
    id: 'p2',
    user: 'kaito_arch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    location: 'Kyoto Pavilion, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    likes: 3105,
    caption: 'Light gently carving geometry into cedar wood and raw tatami. Sustainable architectural balance.',
    time: '5 hours ago',
    comments: [
      { id: 1, author: 'aurora.lens', text: 'The natural shadows here are poetry.' }
    ]
  }
];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState({ p1: true });
  const [savedPosts, setSavedPosts] = useState({});
  const [activeStory, setActiveStory] = useState(null);
  const [viewMode, setViewMode] = useState('feed'); // 'feed' | 'profile'

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const isLiked = !!prev[postId];
      const updated = { ...prev, [postId]: !isLiked };
      setPosts(current => current.map(p => {
        if (p.id === postId) {
          return { ...p, likes: p.likes + (isLiked ? -1 : 1) };
        }
        return p;
      }));
      return updated;
    });
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased pb-20">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur border-b border-zinc-800/80 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Prism
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-zinc-300 hover:text-white">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-zinc-300 hover:text-white">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-lg mx-auto px-4 pt-4 space-y-6">
        {viewMode === 'feed' ? (
          <>
            {/* Stories Rail */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {STORIES.map(story => (
                <div 
                  key={story.id} 
                  onClick={() => setActiveStory(story)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <div className={\`p-0.5 rounded-full \${
                    story.hasUnread 
                      ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse'
                      : 'bg-zinc-800'
                  }\`}>
                    <div className="p-0.5 bg-[#08080a] rounded-full">
                      <img 
                        src={story.avatar} 
                        alt={story.name} 
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-300 truncate w-16 text-center font-medium">
                    {story.isUser ? 'Your Story' : story.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Posts Stream */}
            <div className="space-y-6">
              {posts.map(post => {
                const isLiked = !!likedPosts[post.id];
                const isSaved = !!savedPosts[post.id];

                return (
                  <article 
                    key={post.id} 
                    className="bg-[#0f0f14] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Post Header */}
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={post.avatar} 
                          alt={post.user} 
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-700" 
                        />
                        <div>
                          <div className="font-bold text-xs text-white">{post.user}</div>
                          <div className="text-[10px] text-zinc-400">{post.location}</div>
                        </div>
                      </div>
                      <button className="text-zinc-400 hover:text-white p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Media */}
                    <div 
                      onDoubleClick={() => toggleLike(post.id)}
                      className="relative aspect-square overflow-hidden bg-black select-none cursor-pointer"
                    >
                      <img 
                        src={post.image} 
                        alt={post.caption} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className="transition-transform active:scale-125"
                          >
                            <Heart className={\`w-5 h-5 \${
                              isLiked ? 'text-rose-500 fill-rose-500' : 'text-zinc-300 hover:text-white'
                            }\`} />
                          </button>
                          <button className="text-zinc-300 hover:text-white">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                          <button className="text-zinc-300 hover:text-white">
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => toggleSave(post.id)}
                          className="transition-transform active:scale-125"
                        >
                          <Bookmark className={\`w-5 h-5 \${
                            isSaved ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 hover:text-white'
                          }\`} />
                        </button>
                      </div>

                      {/* Likes count */}
                      <div className="font-bold text-xs text-white">
                        {post.likes.toLocaleString()} likes
                      </div>

                      {/* Caption */}
                      <p className="text-xs text-zinc-200 leading-relaxed">
                        <strong className="text-white mr-1.5">{post.user}</strong>
                        {post.caption}
                      </p>

                      {/* Comments preview */}
                      <div className="space-y-1 pt-1">
                        <button className="text-[11px] text-zinc-500 hover:text-zinc-300 font-medium">
                          View all {post.comments.length} comments
                        </button>
                        {post.comments.map(c => (
                          <div key={c.id} className="text-[11px] text-zinc-300">
                            <strong className="text-white mr-1">{c.author}</strong> {c.text}
                          </div>
                        ))}
                      </div>

                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider pt-1">
                        {post.time}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* CREATOR PROFILE VIEW */
          <div className="space-y-6">
            <div className="flex items-center gap-6 pt-2">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover ring-2 ring-rose-500/60 p-0.5"
              />
              <div className="space-y-2">
                <h2 className="font-black text-lg text-white">alex.studio</h2>
                <div className="flex gap-4 text-xs">
                  <div><strong className="text-white">124</strong> <span className="text-zinc-400">posts</span></div>
                  <div><strong className="text-white">48.2K</strong> <span className="text-zinc-400">followers</span></div>
                  <div><strong className="text-white">890</strong> <span className="text-zinc-400">following</span></div>
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-300 space-y-1">
              <div className="font-bold text-white">Alex Vance ✦ Visual Architect</div>
              <p>Designing digital artifacts & capturing Nordic landscapes. Tokyo & Oslo.</p>
              <a href="#" className="text-pink-400 hover:underline">alexvance.studio</a>
            </div>

            {/* Profile Gallery Grid */}
            <div className="grid grid-cols-3 gap-1 pt-4 border-t border-zinc-800">
              {[
                'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
              ].map((img, i) => (
                <div key={i} className="aspect-square bg-zinc-900 overflow-hidden group relative cursor-pointer">
                  <img src={img} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Dock Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0c0e]/95 backdrop-blur border-t border-zinc-800/80 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <button 
            onClick={() => setViewMode('feed')} 
            className={\`p-1.5 \${viewMode === 'feed' ? 'text-white' : 'text-zinc-500'}\`}
          >
            <Home className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-zinc-500 hover:text-white">
            <Compass className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-zinc-500 hover:text-white">
            <PlusSquare className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('profile')} 
            className={\`p-1.5 \${viewMode === 'profile' ? 'text-white' : 'text-zinc-500'}\`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-700 relative aspect-[9/16] shadow-2xl flex flex-col justify-between p-4">
            {/* Progress bar */}
            <div className="w-full bg-zinc-700/50 h-1 rounded-full overflow-hidden">
              <div className="bg-white h-full w-2/3 animate-pulse" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <img src={activeStory.avatar} alt={activeStory.name} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-xs font-bold text-white">{activeStory.name}</span>
                <span className="text-[10px] text-zinc-400">14m ago</span>
              </div>
              <button onClick={() => setActiveStory(null)} className="text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-auto text-center space-y-2">
              <img src={activeStory.avatar} alt="" className="w-32 h-32 rounded-2xl mx-auto object-cover ring-2 ring-rose-500/50 shadow-2xl" />
              <p className="text-xs font-medium text-zinc-200">Exploring Nordic fjord valleys today ✨</p>
            </div>

            <div className="text-center text-[11px] text-zinc-400 pb-2">
              Reply to story...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`
  }
};

