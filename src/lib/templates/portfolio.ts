import { VirtualFileMap, ProjectSpec } from "../types";

export const portfolioSpec: ProjectSpec = {
  id: "portfolio-elena-vance",
  name: "Vance Visuals",
  tagline: "Editorial, Architectural & Fine-Art Photography",
  genre: "portfolio",
  summary: "A high-end editorial photography portfolio featuring curated series, Leica camera metadata overlays, fullscreen lightbox view, and an interactive commission inquiry drawer.",
  pages: ["Gallery", "Editorial Series", "Exhibitions", "About", "Inquiries"],
  components: [
    "EditorialHero",
    "FilterCategoryTabs",
    "MasonryPhotoGrid",
    "LightboxPhotoModal",
    "GearExifMetadata",
    "CommissionInquiryDrawer"
  ],
  features: [
    "Dynamic filter tabs (All, Architecture, Editorial, Nordic Landscapes, Portraits)",
    "Interactive photo lightbox with EXIF metadata (Focal length, aperture, shutter speed, camera)",
    "Like and bookmark fine-art prints",
    "Commission inquiry slide-over modal with date selection"
  ],
  tokens: {
    primary: "#d4af37", // soft editorial gold
    primaryForeground: "#09090b",
    secondary: "#71717a", // zinc-500
    accent: "#f4f4f5",
    background: "#08080a",
    surface: "#121215",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "8px",
    mood: "Bespoke, editorial, minimalist, high-craft, fine-art"
  },
  databaseTables: [
    {
      name: "photographs",
      description: "Curated fine-art photographs and editorial captures",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "title", type: "string" },
        { name: "category", type: "string" },
        { name: "location", type: "string" },
        { name: "camera", type: "string" },
        { name: "lens", type: "string" },
        { name: "year", type: "string" },
        { name: "imageUrl", type: "string" }
      ],
      rows: [
        {
          id: "photo-1",
          title: "Glacial Solitude #04",
          category: "Nordic Landscapes",
          location: "Jökulsárlón, Iceland",
          camera: "Hasselblad H6D-100c",
          lens: "HC 35mm f/3.5",
          year: "2026",
          imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "photo-2",
          title: "Concrete Cantilever III",
          category: "Architecture",
          location: "Copenhagen, Denmark",
          camera: "Leica M11-P",
          lens: "Summilux-M 35mm f/1.4",
          year: "2026",
          imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "photo-3",
          title: "Subtle Monolith",
          category: "Editorial",
          location: "Kyoto Botanical, Japan",
          camera: "Fujifilm GFX 100 II",
          lens: "GF 110mm f/2 R LM WR",
          year: "2025",
          imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "photo-4",
          title: "Basalt Monoliths at Twilight",
          category: "Nordic Landscapes",
          location: "Vik Coastline, Iceland",
          camera: "Hasselblad H6D-100c",
          lens: "HC 50mm f/3.5 II",
          year: "2026",
          imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    }
  ],
  approved: true
};

export const portfolioFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Camera, Eye, Heart, Mail, Compass, ArrowRight, X, 
  Check, Info, Sparkles, MapPin, Sliders, ChevronRight
} from 'lucide-react';

const CATEGORIES = ['All Works', 'Architecture', 'Nordic Landscapes', 'Editorial', 'Portraits'];

const WORKS = [
  {
    id: 1,
    title: 'Glacial Solitude #04',
    category: 'Nordic Landscapes',
    location: 'Jökulsárlón, Iceland',
    camera: 'Hasselblad H6D-100c',
    exif: '35mm • f/5.6 • 1/250s • ISO 64',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 2,
    title: 'Brutalist Cantilever III',
    category: 'Architecture',
    location: 'Copenhagen, Denmark',
    camera: 'Leica M11 Monochrom',
    exif: '28mm • f/8.0 • 1/500s • ISO 125',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-square'
  },
  {
    id: 3,
    title: 'Subtle Bamboo Shadows',
    category: 'Editorial',
    location: 'Kyoto Sanctuary, Japan',
    camera: 'Fujifilm GFX 100 II',
    exif: '110mm • f/2.8 • 1/320s • ISO 100',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 4,
    title: 'Basalt Horizon at Dawn',
    category: 'Nordic Landscapes',
    location: 'Vik Basalt Pillars, Iceland',
    camera: 'Hasselblad H6D-100c',
    exif: '50mm • f/11 • 2.5s • ISO 32',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 5,
    title: 'Tokyo Neon Solitude',
    category: 'Portraits',
    location: 'Shinjuku Alleyways, Japan',
    camera: 'Leica M11-P',
    exif: '50mm • f/1.4 • 1/160s • ISO 800',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 6,
    title: 'Nordic Fjord Refraction',
    category: 'Nordic Landscapes',
    location: 'Lofoten Islands, Norway',
    camera: 'Fujifilm GFX 100 II',
    exif: '45mm • f/8 • 1/125s • ISO 100',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[3/2]'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredWorks = WORKS.filter(w => 
    activeCategory === 'All Works' || w.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur border-b border-zinc-800/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center font-serif text-sm tracking-widest text-amber-300">
            V
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wider uppercase text-white">Vance Visuals</h1>
            <p className="text-[10px] text-zinc-400 font-mono">Fine-Art & Editorial Photography</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400">
          <a href="#gallery" className="text-white font-medium">Gallery</a>
          <a href="#series" className="hover:text-white transition-colors">Exhibitions</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <button 
            onClick={() => setIsInquiryOpen(true)}
            className="text-amber-300 hover:text-amber-200 transition-colors"
          >
            Inquire
          </button>
        </nav>

        <button 
          onClick={() => setIsInquiryOpen(true)}
          className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-4 py-1.5 rounded-full text-xs transition-transform active:scale-95 shadow-md"
        >
          Book Commission
        </button>
      </header>

      {/* Hero Showcase */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 space-y-4">
        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/60 px-3 py-1 rounded-full text-[11px] text-zinc-400 font-mono">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Shot on Medium Format & 35mm Prime Optics</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-3xl leading-[1.1]">
          Capturing the fragile poetry between <span className="font-serif italic text-amber-200">light, basalt & silence.</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed pt-2">
          Elena Vance is an editorial photographer based in Reykjavik and Tokyo, exploring architectural geometry and untouched sub-arctic territories.
        </p>
      </section>

      {/* Filter Tabs */}
      <div id="gallery" className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={\`text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap \${
                activeCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Image Gallery */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map(work => {
            const isFav = !!favorites[work.id];
            return (
              <div 
                key={work.id}
                onClick={() => setLightboxItem(work)}
                className="group relative bg-[#0e0e13] rounded-2xl overflow-hidden border border-zinc-800/60 hover:border-zinc-600 transition-all duration-300 cursor-pointer shadow-xl"
              >
                <div className={\`relative \${work.aspect} overflow-hidden bg-black\`}>
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <button 
                        onClick={(e) => toggleFavorite(work.id, e)}
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white"
                      >
                        <Heart className={\`w-4 h-4 \${isFav ? 'text-rose-500 fill-rose-500' : ''}\`} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-300 font-mono uppercase tracking-wider">{work.category}</span>
                      <h3 className="font-bold text-sm text-white">{work.title}</h3>
                      <p className="text-[11px] text-zinc-400">{work.location}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs border-t border-zinc-800/60 bg-[#0b0b10]">
                  <div>
                    <div className="font-semibold text-zinc-200">{work.title}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{work.camera}</div>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                    Inspect
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-[#0e0e13] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 bg-black flex items-center justify-center max-h-[70vh] md:max-h-[80vh]">
              <img src={lightboxItem.image} alt={lightboxItem.title} className="w-full h-full object-contain" />
            </div>

            <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] text-amber-300 font-mono uppercase tracking-widest">{lightboxItem.category}</span>
                <h3 className="text-xl font-bold text-white">{lightboxItem.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{lightboxItem.location}</span>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-xl space-y-2 text-xs font-mono">
                  <div className="text-zinc-400 font-bold text-[10px] uppercase">EXIF Metadata</div>
                  <div className="text-zinc-300">{lightboxItem.camera}</div>
                  <div className="text-amber-200 text-[11px]">{lightboxItem.exif}</div>
                </div>
              </div>

              <button 
                onClick={() => { setLightboxItem(null); setIsInquiryOpen(true); }}
                className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Acquire Archival Print</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Slide-Over Drawer */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0d0d12] border-l border-zinc-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="font-bold text-base text-white">Commission Inquiries</h3>
                  <p className="text-xs text-zinc-400">Editorial assignments & gallery acquisitions</p>
                </div>
                <button onClick={() => setIsInquiryOpen(false)} className="text-zinc-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {inquirySent ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-white">Inquiry Received</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Elena's studio will review your project brief and reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} 
                  className="py-6 space-y-4 text-xs"
                >
                  <div className="space-y-1">
                    <label className="font-medium text-zinc-300">Your Name / Agency</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Kinfolk Editorial" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-zinc-300">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="editorial@publication.com" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-zinc-300">Assignment Scope</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe your location, creative direction, print sizes, or shoot dates..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-300 hover:bg-amber-200 text-zinc-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-300/10 flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Send Commission Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <footer className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex justify-between">
              <span>Studio: Reykjavik / Tokyo</span>
              <span>© 2026 Elena Vance</span>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
`
  }
};
