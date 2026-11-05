import { VirtualFileMap, ProjectSpec } from "../types";

export const quickCommerceSpec: ProjectSpec = {
  id: "quick-commerce-dash",
  name: "ZapGrocer",
  tagline: "Instant 10-Minute Farm-to-Table Quick Grocery Delivery",
  genre: "quick-commerce",
  summary: "A ultra-responsive instant grocery delivery application featuring lightning 10-minute delivery tracking, category quick-scroll, smart basket calculation, and flash sale countdowns.",
  pages: ["Home", "Categories", "Cart & Checkout", "Order Tracker"],
  components: [
    "QuickDeliveryHeader",
    "CategoryChipsRail",
    "FlashDealsCarousel",
    "ProductCardGrid",
    "StickyCartDrawer",
    "CartSummaryModal",
    "LiveCourierMap"
  ],
  features: [
    "10-minute real-time delivery ETA badge",
    "Dynamic category filtering & instant search",
    "Cart quantity counters with animated total pricing",
    "Free delivery milestone progress bar",
    "Simulated one-tap Apple Pay / UPI checkout"
  ],
  tokens: {
    primary: "#10b981", // emerald-500
    primaryForeground: "#ffffff",
    secondary: "#f59e0b", // amber-500
    accent: "#065f46",
    background: "#09090b",
    surface: "#18181b",
    cardBorder: "#27272a",
    fontHeading: "Plus Jakarta Sans, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",
    radius: "16px",
    mood: "Ultra-fast, vibrant, tactile, high-density"
  },
  databaseTables: [
    {
      name: "products",
      description: "Inventory items across grocery categories with real-time stock and discounts",
      columns: [
        { name: "id", type: "string", isPrimary: true },
        { name: "title", type: "string" },
        { name: "category", type: "string" },
        { name: "price", type: "number" },
        { name: "originalPrice", type: "number" },
        { name: "unit", type: "string" },
        { name: "etaMinutes", type: "number" },
        { name: "rating", type: "number" },
        { name: "image", type: "string" },
        { name: "inStock", type: "boolean" }
      ],
      rows: [
        {
          id: "prod-1",
          title: "Organic Hass Avocados (Pack of 3)",
          category: "Fresh Produce",
          price: 4.49,
          originalPrice: 5.99,
          unit: "3 pcs (~450g)",
          etaMinutes: 8,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
          inStock: true
        },
        {
          id: "prod-2",
          title: "A2 Jersey Whole Raw Milk",
          category: "Dairy & Eggs",
          price: 3.89,
          originalPrice: 4.29,
          unit: "1000 ml glass bottle",
          etaMinutes: 9,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
          inStock: true
        },
        {
          id: "prod-3",
          title: "Cold-Pressed Valencia Orange Juice",
          category: "Beverages",
          price: 5.25,
          originalPrice: 6.5,
          unit: "500 ml fresh chilled",
          etaMinutes: 10,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80",
          inStock: true
        },
        {
          id: "prod-4",
          title: "San Francisco Artisanal Sourdough",
          category: "Bakery",
          price: 4.95,
          originalPrice: 5.5,
          unit: "650g loaf",
          etaMinutes: 7,
          rating: 4.95,
          image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80",
          inStock: true
        },
        {
          id: "prod-5",
          title: "Madagascar Bourbon Vanilla Gelato",
          category: "Frozen & Ice Cream",
          price: 6.75,
          originalPrice: 7.99,
          unit: "475 ml tub",
          etaMinutes: 11,
          rating: 4.85,
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
          inStock: true
        },
        {
          id: "prod-6",
          title: "Single-Origin Ethiopian Cold Brew",
          category: "Beverages",
          price: 3.99,
          originalPrice: 4.5,
          unit: "330 ml can",
          etaMinutes: 9,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
          inStock: true
        }
      ]
    },
    {
      name: "orders",
      description: "Active customer deliveries and dispatch status",
      columns: [
        { name: "orderId", type: "string", isPrimary: true },
        { name: "customerName", type: "string" },
        { name: "totalAmount", type: "number" },
        { name: "status", type: "string" },
        { name: "courierName", type: "string" },
        { name: "estimatedArrival", type: "string" }
      ],
      rows: [
        {
          orderId: "ZP-88412",
          customerName: "Eleanor Vance",
          totalAmount: 23.47,
          status: "Out for Delivery (2 mins away)",
          courierName: "Marcus (Yamaha E-Bike #09)",
          estimatedArrival: "3 mins"
        }
      ]
    }
  ],
  approved: true
};

export const quickCommerceFiles: VirtualFileMap = {
  "/App.js": {
    path: "/App.js",
    language: "javascript",
    content: `import React, { useState } from 'react';
import { 
  Zap, ShoppingBag, Clock, MapPin, Search, Plus, Minus, 
  ChevronRight, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, X
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: '⚡ All Essentials' },
  { id: 'produce', name: '🥦 Fresh Veg & Fruits' },
  { id: 'dairy', name: '🥛 Dairy & Organic Eggs' },
  { id: 'bakery', name: '🥖 Warm Bakery' },
  { id: 'drinks', name: '🧃 Cold Beverages' },
  { id: 'icecream', name: '🍨 Gelato & Ice Cream' }
];

const PRODUCTS = [
  {
    id: 1,
    title: 'Organic Hass Avocados',
    category: 'produce',
    price: 4.49,
    originalPrice: 5.99,
    unit: 'Pack of 3 (~450g)',
    eta: '8 mins',
    rating: '4.9 ★',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'A2 Grass-Fed Whole Milk',
    category: 'dairy',
    price: 3.89,
    originalPrice: 4.50,
    unit: '1L Glass Carafe',
    eta: '9 mins',
    rating: '4.8 ★',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Artisanal Sourdough Boule',
    category: 'bakery',
    price: 4.95,
    originalPrice: 5.80,
    unit: '650g Fresh Baked',
    eta: '7 mins',
    rating: '4.95 ★',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Cold-Pressed Valencia Orange',
    category: 'drinks',
    price: 5.25,
    originalPrice: 6.20,
    unit: '500ml Chilled Bottle',
    eta: '9 mins',
    rating: '4.9 ★',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'Bourbon Vanilla Gelato',
    category: 'icecream',
    price: 6.75,
    originalPrice: 7.99,
    unit: '475ml Tub',
    eta: '10 mins',
    rating: '4.85 ★',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: 'Nitro Cold Brew Coffee',
    category: 'drinks',
    price: 3.99,
    originalPrice: 4.60,
    unit: '330ml Can',
    eta: '8 mins',
    rating: '4.7 ★',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({ 1: 2, 2: 1 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find(p => p.id === parseInt(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const freeDeliveryThreshold = 25.0;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-28 antialiased">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>⚡ Flash Hour: 15% off organic dairy with code <strong className="underline">FLASH15</strong></span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-5 h-5 text-zinc-950 fill-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-base tracking-tight text-white">
                ZapGrocer
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold">10 MIN</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span className="truncate max-w-[140px] sm:max-w-xs text-zinc-300">742 Evergreen Terrace, Unit 4B</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search avocados, sourdough, kombucha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Cart Pill */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-full font-semibold text-xs transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{cartItemCount} items</span>
            <span className="bg-zinc-950/20 px-1.5 py-0.5 rounded text-[11px] font-mono">
              \${cartSubtotal.toFixed(2)}
            </span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Delivery Guarantee Pill */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Instant Fulfillment Center #4 (0.6 miles away)</h2>
              <p className="text-xs text-zinc-400">Order now to receive by <span className="text-emerald-400 font-medium">10:14 PM</span> • Fresh temperature-controlled pods</p>
            </div>
          </div>
          <div className="w-full md:w-64 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>{cartSubtotal >= freeDeliveryThreshold ? '🎉 Free Delivery Unlocked!' : \`Add \$\${(freeDeliveryThreshold - cartSubtotal).toFixed(2)} for Free Delivery\`}</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500" 
                style={{ width: \`\${progressToFreeDelivery}%\` }}
              />
            </div>
          </div>
        </div>

        {/* Categories Rail */}
        <div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={\`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all \${
                  activeCategory === cat.id
                    ? 'bg-zinc-100 text-zinc-950 shadow-md font-semibold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/60'
                }\`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white tracking-tight">Available Right Now in Your Hub</h3>
            <span className="text-xs text-zinc-400 font-mono">{filteredProducts.length} items ready to pack</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => {
              const qty = cart[product.id] || 0;
              return (
                <div 
                  key={product.id}
                  className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                >
                  <div className="relative mb-3">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <span className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {product.eta}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-zinc-900/90 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {product.rating}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-zinc-100 line-clamp-1">{product.title}</h4>
                    <p className="text-[11px] text-zinc-500 mb-2">{product.unit}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                    <div>
                      <div className="font-bold text-sm text-white font-mono">\${product.price.toFixed(2)}</div>
                      <div className="text-[10px] text-zinc-500 line-through">\${product.originalPrice.toFixed(2)}</div>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 border border-emerald-500/30 hover:border-transparent px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> ADD
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-emerald-500 text-zinc-950 rounded-lg px-2 py-1 font-bold text-xs">
                        <button onClick={() => updateQuantity(product.id, -1)} className="hover:opacity-75">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-mono">{qty}</span>
                        <button onClick={() => updateQuantity(product.id, 1)} className="hover:opacity-75">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0e0e11] border-l border-zinc-800 h-full p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Your Delivery Basket</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="py-4 space-y-3">
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 text-sm">
                    Your cart is empty! Add farm-fresh goodies above.
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = PRODUCTS.find(p => p.id === parseInt(id));
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1 px-3">
                          <h5 className="text-xs font-semibold text-zinc-200 line-clamp-1">{item.title}</h5>
                          <span className="text-[11px] text-zinc-400 font-mono">\${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-lg text-xs">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-300 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-white">{qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-300 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">\${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fast Courier Delivery</span>
                  <span className="font-mono text-emerald-400">
                    {cartSubtotal >= freeDeliveryThreshold ? 'FREE' : '\$1.99'}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-zinc-800">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-400">
                    \${(cartSubtotal + (cartSubtotal >= freeDeliveryThreshold ? 0 : 1.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={cartItemCount === 0}
                onClick={() => {
                  setOrderPlaced(true);
                  setIsCartOpen(false);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
              >
                <span>Dispatch Order in 10 Mins</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmed Toast */}
      {orderPlaced && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-emerald-200">Order #ZP-88412 Confirmed!</div>
            <div className="text-emerald-400">Courier assigned: Marcus is packing your bag now. ETA 8 mins.</div>
          </div>
          <button onClick={() => setOrderPlaced(false)} className="text-emerald-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
`
  }
};

