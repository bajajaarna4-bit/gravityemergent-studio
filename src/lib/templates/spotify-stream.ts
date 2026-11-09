import { VirtualFileMap, ProjectSpec } from "../types";

export const spotifySpec: ProjectSpec = {
  id: "spotify-audio-stream",
  name: "AuraBeat",
  tagline: "Lossless Spatial Audio & Artist Streaming Platform",
  genre: "streaming",
  summary: "A high-fidelity music streaming application inspired by Spotify with real-time playback control, persistent bottom player, album carousels, playlist management, and responsive queue.",
  pages: ["Home", "Search & Explore", "Your Library", "Artist Detail", "Now Playing"],
  components: [
    "PersistentAudioPlayerBar",
    "SidebarLibraryNav",
    "GreetingQuickPlayGrid",
    "FeaturedPlaylistsCarousel",
    "TrackRankingTable",
    "VolumeAndDeviceController",
    "QueueModal"
  ],
  features: [
    "Persistent bottom player with working Play/Pause, Next/Prev, and seeking bar",
    "Real-time track search with instant filtering",
    "Interactive heart/favorite button with persistent state",
    "Volume control slider with mute toggle",
    "Curated playlist grids with hover play shortcuts"
  ],
  approved: true,
  tokens: {
    primary: "#1db954", // Spotify neon emerald
    primaryForeground: "#000000",
    secondary: "#1ed760",
    accent: "#3be477",
    background: "#000000",
    surface: "#121212",
    cardBorder: "#282828",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "8px",
    mood: "Nocturnal, immersive, energetic, tactile music player"
  },
  databaseTables: [
    {
      name: "tracks",
      description: "Lossless audio library tracks with metadata, duration, and stream counts",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "title", type: "string" },
        { name: "artist", type: "string" },
        { name: "album", type: "string" },
        { name: "duration", type: "string" },
        { name: "durationSec", type: "number" },
        { name: "plays", type: "number" },
        { name: "cover", type: "string" },
        { name: "liked", type: "boolean" }
      ],
      rows: [
        {
          id: "trk-1",
          title: "Midnight City Lights",
          artist: "Solaris & Neon Dream",
          album: "Cyber Resonance 2088",
          duration: "3:42",
          durationSec: 222,
          plays: 48210340,
          cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
          liked: true
        },
        {
          id: "trk-2",
          title: "Echoes in the Rain",
          artist: "Kira Thorne",
          album: "Nordic Atmosphere",
          duration: "4:15",
          durationSec: 255,
          plays: 29401200,
          cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
          liked: false
        },
        {
          id: "trk-3",
          title: "Deep Focus State",
          artist: "Aether Void",
          album: "Alpha Wave Synthetics",
          duration: "2:58",
          durationSec: 178,
          plays: 67320490,
          cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
          liked: true
        },
        {
          id: "trk-4",
          title: "Analog Horizon",
          artist: "Vance Stellar",
          album: "Tape Saturation Vol. 1",
          duration: "3:20",
          durationSec: 200,
          plays: 18940300,
          cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=400&q=80",
          liked: false
        },
        {
          id: "trk-5",
          title: "Tokyo Shinjuku Drift",
          artist: "Kenji Sato",
          album: "Neon Asphalt EP",
          duration: "3:11",
          durationSec: 191,
          plays: 84120900,
          cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
          liked: true
        }
      ]
    },
    {
      name: "playlists",
      description: "User and editorial curated playlist collections",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "curator", type: "string" },
        { name: "tracksCount", type: "number" },
        { name: "cover", type: "string" }
      ],
      rows: [
        {
          id: "pl-1",
          name: "Deep Code & Flow State",
          description: "Hypnotic instrumental synthwave and ambient techno for deep work sessions.",
          curator: "AuraBeat Editorial",
          tracksCount: 64,
          cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
        },
        {
          id: "pl-2",
          name: "Tokyo Midnight Drives",
          description: "Nostalgic future funk, lo-fi hip hop, and city-pop gems.",
          curator: "Kenji Sato",
          tracksCount: 42,
          cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
        },
        {
          id: "pl-3",
          name: "Organic Coffeehouse Acoustic",
          description: "Warm guitars, soulful vocals, and morning rain vibrations.",
          curator: "AuraBeat Acoustic",
          tracksCount: 50,
          cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80"
        }
      ]
    }
  ]
};

export const spotifyFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Heart, Repeat, Shuffle, Search, Home, Compass, Bookmark, 
  Sparkles, Clock, Music, ListMusic, User, Share2, MoreHorizontal,
  Plus, Check, Radio, Disc
} from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Midnight City Lights",
    artist: "Solaris & Neon Dream",
    album: "Cyber Resonance 2088",
    duration: "3:42",
    durationSec: 222,
    plays: "48,210,340",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Echoes in the Rain",
    artist: "Kira Thorne",
    album: "Nordic Atmosphere",
    duration: "4:15",
    durationSec: 255,
    plays: "29,401,200",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Deep Focus State",
    artist: "Aether Void",
    album: "Alpha Wave Synthetics",
    duration: "2:58",
    durationSec: 178,
    plays: "67,320,490",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Analog Horizon",
    artist: "Vance Stellar",
    album: "Tape Saturation Vol. 1",
    duration: "3:20",
    durationSec: 200,
    plays: "18,940,300",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "Tokyo Shinjuku Drift",
    artist: "Kenji Sato",
    album: "Neon Asphalt EP",
    duration: "3:11",
    durationSec: 191,
    plays: "84,120,900",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    title: "Quantum Reverie",
    artist: "Elena Rostova",
    album: "Synthetic Dreams",
    duration: "3:50",
    durationSec: 230,
    plays: "32,809,110",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
  }
];

const PLAYLISTS = [
  {
    id: 1,
    name: "Deep Code & Flow State",
    desc: "Hypnotic instrumental synthwave and ambient techno for 10x coding sessions.",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    color: "from-emerald-900/60"
  },
  {
    id: 2,
    name: "Tokyo Midnight Drives",
    desc: "Nostalgic future funk, lo-fi hip hop, and midnight city-pop.",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    color: "from-purple-900/60"
  },
  {
    id: 3,
    name: "Coffeehouse Acoustics",
    desc: "Warm acoustic guitars, soft vocal harmonies, and gentle morning rain.",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80",
    color: "from-amber-900/60"
  },
  {
    id: 4,
    name: "Cyberpunk 2088 Basslines",
    desc: "Heavy industrial bass, dark electro synth, and driving dystopian rhythms.",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
    color: "from-rose-900/60"
  }
];

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(48);
  const [likedMap, setLikedMap] = useState({ 1: true, 3: true, 5: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(82);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];

  // Playback timer simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            // Auto advance next track
            setCurrentTrackIndex((idx) => (idx + 1) % TRACKS.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSec]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setCurrentTimeSec(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * TRACKS.length);
      playTrack(nextIdx);
    } else {
      playTrack((currentTrackIndex + 1) % TRACKS.length);
    }
  };

  const prevTrack = () => {
    if (currentTimeSec > 3) {
      setCurrentTimeSec(0);
    } else {
      const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
      playTrack(prevIdx);
    }
  };

  const toggleLike = (id) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return \`\${mins}:\${remainder < 10 ? '0' : ''}\${remainder}\`;
  };

  const filteredTracks = TRACKS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const progressPercent = Math.min(100, (currentTimeSec / currentTrack.durationSec) * 100);

  return (
    <div className="h-screen bg-black text-white font-sans flex flex-col antialiased selection:bg-[#1db954]/30 select-none overflow-hidden">
      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        {/* Left Sidebar: Library & Navigation */}
        <aside className="w-64 bg-[#121212] rounded-xl flex flex-col overflow-hidden border border-zinc-800/40 hidden md:flex">
          {/* Brand & Main Nav */}
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-[#1db954] flex items-center justify-center text-black shadow-lg shadow-[#1db954]/20">
                <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: isPlaying ? '3s' : '0s' }} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">AuraBeat</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#1db954]/10 text-[#1db954] font-bold rounded border border-[#1db954]/30">
                  HI-FI
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab("home"); setSearchQuery(""); }}
                className={\`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all \${
                  activeTab === "home" ? "bg-zinc-800/80 text-white" : "text-zinc-400 hover:text-white"
                }\`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={\`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all \${
                  activeTab === "search" ? "bg-zinc-800/80 text-white" : "text-zinc-400 hover:text-white"
                }\`}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </nav>
          </div>

          {/* User Library Section */}
          <div className="flex-1 bg-[#121212] flex flex-col overflow-hidden px-4 pt-2">
            <div className="flex items-center justify-between py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-zinc-400" />
                <span>Your Library</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">4 Playlists</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pt-2 pr-1">
              <div 
                onClick={() => setActiveTab("liked")}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/60 cursor-pointer group transition-all"
              >
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#1db954] transition-colors">Liked Songs</h4>
                  <p className="text-[11px] text-zinc-400">Playlist • 3 songs</p>
                </div>
              </div>

              {PLAYLISTS.map((pl) => (
                <div 
                  key={pl.id}
                  onClick={() => playTrack(pl.id - 1)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/60 cursor-pointer group transition-all"
                >
                  <img src={pl.cover} alt={pl.name} className="w-10 h-10 rounded-md object-cover" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-[#1db954] truncate transition-colors">
                      {pl.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 truncate">Curated Collection</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center / Right: Main Content Area */}
        <main className="flex-1 bg-[#121212] rounded-xl flex flex-col overflow-hidden border border-zinc-800/40 relative">
          {/* Top Sticky Bar */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-zinc-800/40 bg-[#121212]/90 backdrop-blur-md sticky top-0 z-20">
            {/* Search Input */}
            <div className="relative w-72 sm:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to play? (e.g. Solaris, Tokyo, Cyber)"
                className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] text-xs text-white placeholder-zinc-500 rounded-full pl-9 pr-4 py-2 border border-transparent focus:border-zinc-500 focus:outline-none transition-all"
              />
            </div>

            {/* Profile & Premium Pill */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] font-bold text-black bg-white hover:bg-zinc-200 px-3.5 py-1.5 rounded-full transition-all">
                Explore Premium
              </span>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-[#1db954] ring-2 ring-[#1db954]/20">
                AB
              </div>
            </div>
          </div>

          {/* Main Scrollable View */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Dynamic Greeting & Quick Access Grid */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Good evening
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRACKS.slice(0, 6).map((track, i) => {
                  const isThisPlaying = isPlaying && currentTrackIndex === i;
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(i)}
                      className="group flex items-center bg-[#242424]/70 hover:bg-[#2a2a2a] rounded-md overflow-hidden cursor-pointer transition-all border border-transparent hover:border-zinc-700 relative"
                    >
                      <img src={track.cover} alt={track.title} className="w-16 h-16 object-cover flex-shrink-0" />
                      <div className="px-3 min-w-0 flex-1">
                        <h3 className="text-xs font-bold text-white truncate">{track.title}</h3>
                        <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTrackIndex === i) {
                            togglePlay();
                          } else {
                            playTrack(i);
                          }
                        }}
                        className={\`w-10 h-10 rounded-full bg-[#1db954] text-black flex items-center justify-center mr-3 shadow-xl transition-all \${
                          isThisPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                        }\`}
                      >
                        {isThisPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Playlists Carousel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Featured For You</h2>
                  <p className="text-xs text-zinc-400">Algorithmic mixes personalized to your acoustic preferences</p>
                </div>
                <span className="text-xs font-bold text-zinc-400 hover:text-white cursor-pointer">Show all</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PLAYLISTS.map((pl, idx) => (
                  <div
                    key={pl.id}
                    onClick={() => playTrack(idx % TRACKS.length)}
                    className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-900 shadow-lg">
                      <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(idx % TRACKS.length);
                        }}
                        className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1db954] text-black flex items-center justify-center shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                      >
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white truncate">{pl.name}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{pl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tracks Table */}
            <div className="space-y-4 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-white">Trending Worldwide</h2>
                <span className="text-xs font-bold text-zinc-400">Top Lossless Streams</span>
              </div>

              <div className="rounded-xl border border-zinc-800/50 bg-[#151515] overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800/60">
                  <span className="col-span-1 text-center">#</span>
                  <span className="col-span-6 sm:col-span-5">Title</span>
                  <span className="hidden sm:inline-block sm:col-span-4">Album</span>
                  <span className="col-span-5 sm:col-span-2 text-right pr-2">Duration</span>
                </div>

                <div className="divide-y divide-zinc-800/30">
                  {filteredTracks.map((t, idx) => {
                    const isSelected = currentTrackIndex === idx;
                    const isThisPlaying = isPlaying && isSelected;
                    return (
                      <div
                        key={t.id}
                        onClick={() => playTrack(idx)}
                        className={\`grid grid-cols-12 items-center px-4 py-2.5 hover:bg-zinc-800/50 cursor-pointer group transition-colors \${
                          isSelected ? 'bg-zinc-800/40' : ''
                        }\`}
                      >
                        <div className="col-span-1 flex items-center justify-center text-xs font-mono">
                          {isThisPlaying ? (
                            <span className="w-3.5 h-3.5 text-[#1db954]">
                              <Volume2 className="w-4 h-4 animate-pulse text-[#1db954]" />
                            </span>
                          ) : (
                            <span className="group-hover:hidden text-zinc-400">{idx + 1}</span>
                          )}
                          <Play className="w-3.5 h-3.5 text-white fill-white hidden group-hover:inline-block ml-0.5" />
                        </div>

                        <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                          <img src={t.cover} alt={t.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <h4 className={\`text-xs font-bold truncate \${isSelected ? 'text-[#1db954]' : 'text-white'}\`}>
                              {t.title}
                            </h4>
                            <p className="text-[11px] text-zinc-400 truncate">{t.artist}</p>
                          </div>
                        </div>

                        <div className="hidden sm:inline-block sm:col-span-4 text-xs text-zinc-400 truncate">
                          {t.album}
                        </div>

                        <div className="col-span-5 sm:col-span-2 flex items-center justify-end gap-3 pr-2 text-xs text-zinc-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(t.id);
                            }}
                            className="text-zinc-500 hover:text-white transition-colors"
                          >
                            <Heart className={\`w-4 h-4 \${likedMap[t.id] ? 'fill-[#1db954] text-[#1db954]' : ''}\`} />
                          </button>
                          <span className="font-mono text-[11px]">{t.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Persistent Bottom Player Bar (Spotify-Grade) */}
      <footer className="h-24 bg-[#000000] border-t border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between z-30 select-none">
        {/* Left: Current Track Thumbnail & Info */}
        <div className="flex items-center gap-3.5 w-1/4 min-w-[180px]">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-14 h-14 rounded-md object-cover shadow-lg border border-zinc-800 flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate hover:underline cursor-pointer">
              {currentTrack.artist}
            </p>
          </div>
          <button 
            onClick={() => toggleLike(currentTrack.id)}
            className="text-zinc-400 hover:text-white transition-colors ml-1"
          >
            <Heart className={\`w-4 h-4 \${likedMap[currentTrack.id] ? 'fill-[#1db954] text-[#1db954]' : ''}\`} />
          </button>
        </div>

        {/* Center: Playback Controls & Progress Scrubber */}
        <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={\`text-xs transition-colors \${isShuffle ? 'text-[#1db954]' : 'text-zinc-400 hover:text-white'}\`}
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={prevTrack}
              className="text-zinc-300 hover:text-white transition-colors"
              title="Previous"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-all shadow-md"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-zinc-300 hover:text-white transition-colors"
              title="Next"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={() => setIsRepeat(!isRepeat)}
              className={\`text-xs transition-colors \${isRepeat ? 'text-[#1db954]' : 'text-zinc-400 hover:text-white'}\`}
              title="Repeat"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span>{formatTime(currentTimeSec)}</span>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setCurrentTimeSec(Math.floor(ratio * currentTrack.durationSec));
              }}
              className="flex-1 h-1 bg-zinc-800 hover:h-1.5 rounded-full cursor-pointer relative group transition-all"
            >
              <div 
                className="h-full bg-white group-hover:bg-[#1db954] rounded-full relative transition-colors"
                style={{ width: \`\${progressPercent}%\` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 shadow-md" />
              </div>
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Right: Volume & Speaker Options */}
        <div className="flex items-center justify-end gap-3 w-1/4 min-w-[140px]">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input 
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 h-1 bg-zinc-800 accent-[#1db954] rounded-lg cursor-pointer"
          />
        </div>
      </footer>
    </div>
  );
}
`
  }
};
