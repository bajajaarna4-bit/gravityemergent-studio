import { VirtualFileMap, ProjectSpec } from "../types";

export const cinematicStreamSpec: ProjectSpec = {
  id: "cinematic-aether-stream",
  name: "CineVerse+",
  tagline: "4K HDR Cinematic Streaming Platform with Spatial Audio",
  genre: "streaming",
  summary: "A premiere dark-themed entertainment streaming platform featuring dynamic billboard hero spotlights, horizontal scroll rails with hover video cards, watchlist bookmarks, and genre deep-dives.",
  pages: ["Browse", "TV Shows", "Movies", "New & Popular", "My Watchlist"],
  components: [
    "BillboardHeroSpotlight",
    "GenreNavigationHeader",
    "HorizontalMediaRail",
    "MediaCardWithHoverPreview",
    "EpisodeSelectorDrawer",
    "ProfileSwitcherModal",
    "VideoPlaybackModal"
  ],
  features: [
    "Dynamic billboard hero with sound toggle & playback simulation",
    "Interactive media card preview with rating, maturity badge & genre tags",
    "Persistent 'My Watchlist' bookmarking with instant feedback",
    "Fluid horizontal rail scrolling with left/right scroll controls",
    "High-fidelity modal with full synopsis, cast details and trailer player"
  ],
  tokens: {
    primary: "#e50914", // cinematic red
    primaryForeground: "#ffffff",
    secondary: "#6366f1", // indigo
    accent: "#8b5cf6",
    background: "#08080a",
    surface: "#121216",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "12px",
    mood: "Cinematic, dark, immersive, high-contrast, atmospheric"
  },
  databaseTables: [
    {
      name: "titles",
      description: "Curated cinematic movies and episodic series",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "title", type: "string" },
        { name: "type", type: "string" },
        { name: "matchRate", type: "number" },
        { name: "maturityRating", type: "string" },
        { name: "duration", type: "string" },
        { name: "genres", type: "array" },
        { name: "backdropUrl", type: "string" },
        { name: "posterUrl", type: "string" },
        { name: "synopsis", type: "string" }
      ],
      rows: [
        {
          id: "cv-101",
          title: "Chrono Drift: Continuum",
          type: "Movie",
          matchRate: 98,
          maturityRating: "PG-13",
          duration: "2h 18m",
          genres: ["Sci-Fi", "Cyberpunk", "Mind-Bending"],
          backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
          posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
          synopsis: "In Neo-Kyoto 2088, an ex-quantum navigator discovers rogue temporal fractures erasing historic events from collective memory."
        },
        {
          id: "cv-102",
          title: "Solaris Odyssey",
          type: "Original Series",
          matchRate: 95,
          maturityRating: "TV-MA",
          duration: "3 Seasons",
          genres: ["Space Exploration", "Psychological Thriller"],
          backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
          posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
          synopsis: "A rogue deep-space orbital platform encounters an ocean world possessing sentient mimicry abilities."
        },
        {
          id: "cv-103",
          title: "The Obsidian Heist",
          type: "Movie",
          matchRate: 92,
          maturityRating: "R",
          duration: "1h 54m",
          genres: ["Action", "Crime Drama", "Adrenaline"],
          backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
          posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
          synopsis: "An international syndicate infiltrates a private orbital vault suspended over Monaco's coastline during the Grand Prix."
        }
      ]
    },
    {
      name: "watchlist",
      description: "User bookmarked movies and serials",
      columns: [
        { name: "userId", type: "string" },
        { name: "titleId", type: "string" },
        { name: "addedAt", type: "date" }
      ],
      rows: [
        { userId: "usr-401", titleId: "cv-101", addedAt: "2026-11-04" },
        { userId: "usr-401", titleId: "cv-102", addedAt: "2026-11-05" }
      ]
    }
  ],
  approved: true
};

export const cinematicStreamFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Play, Plus, Check, Info, Volume2, VolumeX, ChevronRight, 
  ChevronLeft, Search, Bell, Film, Flame, Award, Heart, X, Star
} from 'lucide-react';

const HERO_TITLE = {
  id: 'hero-1',
  title: 'CHRONO DRIFT: CONTINUUM',
  tagline: 'Time isn\\'t a straight line. It\\'s a collapsing labyrinth.',
  match: '98% Match',
  year: '2026',
  rating: 'PG-13',
  duration: '2h 18m',
  badges: ['4K Ultra HD', 'Dolby Atmos', 'Spatial Audio'],
  synopsis: 'In Neo-Kyoto 2088, an ex-quantum navigator and an outlaw synthetics engineer discover rogue temporal fractures that are systematically erasing core historical milestones from human memory.',
  genres: ['Mind-Bending', 'Cyberpunk', 'Hard Sci-Fi'],
  backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80'
};

const SECTIONS = [
  {
    id: 'trending',
    title: '🔥 Trending Worldwide',
    items: [
      {
        id: 'm1',
        title: 'Solaris Odyssey',
        match: '96% Match',
        rating: 'TV-MA',
        duration: 'Season 3',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        genres: ['Deep Space', 'Psychological']
      },
      {
        id: 'm2',
        title: 'The Obsidian Heist',
        match: '93% Match',
        rating: 'R',
        duration: '1h 54m',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
        genres: ['Action', 'Thriller']
      },
      {
        id: 'm3',
        title: 'Midnight in Kyoto',
        match: '91% Match',
        rating: 'PG-13',
        duration: '2h 04m',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
        genres: ['Neo-Noir', 'Mystery']
      },
      {
        id: 'm4',
        title: 'Aetherial Echoes',
        match: '99% Match',
        rating: 'TV-14',
        duration: 'Miniseries',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        genres: ['Fantasy', 'Cinematic']
      }
    ]
  },
  {
    id: 'critics',
    title: '🏆 Award-Winning & Critically Acclaimed',
    items: [
      {
        id: 'm5',
        title: 'The Silent Biosphere',
        match: '97% Match',
        rating: 'PG-13',
        duration: '1h 48m',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        genres: ['Docuseries', 'Nature']
      },
      {
        id: 'm6',
        title: 'Velocity Syndicate',
        match: '90% Match',
        rating: 'TV-MA',
        duration: 'Season 1',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
        genres: ['Motorsport', 'Drama']
      },
      {
        id: 'm7',
        title: 'Sub-Zero Protocol',
        match: '94% Match',
        rating: 'PG-13',
        duration: '2h 12m',
        image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=600&q=80',
        genres: ['Survival', 'Arctic']
      },
      {
        id: 'm8',
        title: 'Neural Mirage',
        match: '95% Match',
        rating: 'TV-MA',
        duration: '2 Seasons',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        genres: ['AI Singularity', 'Sci-Fi']
      }
    ]
  }
];

export default function App() {
  const [watchlist, setWatchlist] = useState(['hero-1', 'm1']);
  const [isMuted, setIsMuted] = useState(true);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const toggleWatchlist = (id) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans antialiased overflow-x-hidden pb-20">
      {/* Navigation Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm transition-all px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-lg shadow-red-600/30">
              CV
            </div>
            <span className="font-black text-lg tracking-wider text-white">
              CINE<span className="text-red-500">VERSE+</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-zinc-300">
            {['Browse', 'Originals', 'Movies', 'Series', 'My Watchlist'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={\`hover:text-white transition-colors \${
                  activeTab === tab.toLowerCase() ? 'text-white font-bold' : ''
                }\`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-300 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 text-zinc-300 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
              alt="Profile" 
              className="w-7 h-7 rounded-lg object-cover ring-2 ring-red-500/50 group-hover:ring-red-500 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Billboard Hero */}
      <div className="relative w-full h-[75vh] min-h-[520px] max-h-[760px] flex items-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_TITLE.backdrop} 
            alt={HERO_TITLE.title} 
            className="w-full h-full object-cover object-top opacity-60 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
              Spotlight Premiere
            </span>
            <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-400" /> {HERO_TITLE.match}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none max-w-2xl">
            {HERO_TITLE.title}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed line-clamp-3">
            {HERO_TITLE.synopsis}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => setIsPlaying(true)}
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm transition-transform active:scale-95 shadow-xl shadow-white/10"
            >
              <Play className="w-4 h-4 fill-zinc-950" /> Play Now
            </button>

            <button 
              onClick={() => toggleWatchlist(HERO_TITLE.id)}
              className={\`border px-5 py-2.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all \${
                watchlist.includes(HERO_TITLE.id)
                  ? 'bg-zinc-800/90 text-emerald-400 border-emerald-500/50'
                  : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-100 border-zinc-700/80'
              }\`}
            >
              {watchlist.includes(HERO_TITLE.id) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> In Watchlist
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add to List
                </>
              )}
            </button>

            <button 
              onClick={() => setActiveModalItem(HERO_TITLE)}
              className="bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 p-2.5 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>

            <div className="ml-auto">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-9 h-9 rounded-full border border-zinc-700/70 bg-zinc-950/60 backdrop-blur flex items-center justify-center text-zinc-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Carousels */}
      <main className="max-w-6xl mx-auto px-6 space-y-10 relative z-20 -mt-6">
        {SECTIONS.map(section => (
          <div key={section.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {section.title}
              </h2>
              <button className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 font-medium">
                See All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {section.items.map(item => {
                const isBookmarked = watchlist.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="group relative bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-800/60 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
                    onClick={() => setActiveModalItem(item)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">{item.match}</span>
                        <span className="text-[10px] text-zinc-400 border border-zinc-700 px-1 py-0.2 rounded">{item.rating}</span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-100 truncate">{item.title}</h3>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-zinc-500">{item.duration}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatchlist(item.id);
                          }}
                          className={\`p-1 rounded-full border transition-colors \${
                            isBookmarked 
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                              : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white'
                          }\`}
                        >
                          {isBookmarked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      {/* Info / Player Modal */}
      {(activeModalItem || isPlaying) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0f0f14] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => { setActiveModalItem(null); setIsPlaying(false); }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-zinc-300 hover:text-white flex items-center justify-center border border-zinc-700"
            >
              <X className="w-4 h-4" />
            </button>

            {isPlaying ? (
              <div className="aspect-video bg-black flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 animate-pulse">
                  <Play className="w-8 h-8 fill-red-500 translate-x-0.5" />
                </div>
                <h4 className="font-bold text-base text-white">Streaming 4K Master Feed...</h4>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Audio configured for Dolby Atmos Spatial Engine. Simulation active.
                </p>
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs px-4 py-2 rounded-lg font-medium text-zinc-200 mt-2"
                >
                  Return to Overview
                </button>
              </div>
            ) : (
              <div>
                <img 
                  src={activeModalItem?.backdrop || activeModalItem?.image} 
                  alt={activeModalItem?.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">{activeModalItem?.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 font-mono">
                        <span className="text-emerald-400 font-bold">{activeModalItem?.match}</span>
                        <span>•</span>
                        <span>{activeModalItem?.duration}</span>
                        <span>•</span>
                        <span className="border border-zinc-700 px-1.5 py-0.5 rounded text-[10px]">{activeModalItem?.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs transition-transform active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-white" /> Play
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeModalItem?.synopsis || 'An elite production crafted exclusively for CineVerse+ featuring ground-breaking visual effects, an original orchestral score, and an award-winning ensemble cast.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
`
  }
};

