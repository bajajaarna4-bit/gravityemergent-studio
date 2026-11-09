import { ProjectSpec, VirtualFileMap, SiteGenre } from "../types";
import { quickCommerceSpec, quickCommerceFiles } from "./quick-commerce";
import { cinematicStreamSpec, cinematicStreamFiles } from "./cinematic-stream";
import { videoPlatformSpec, videoPlatformFiles } from "./video-platform";
import { socialFeedSpec, socialFeedFiles } from "./social-feed";
import { portfolioSpec, portfolioFiles } from "./portfolio";
import { saasModernSpec, saasModernFiles } from "./saas-modern";
import { virtualOfficeSpec, virtualOfficeFiles } from "./virtual-office";

export interface TemplateDefinition {
  id: string;
  genre: SiteGenre;
  name: string;
  description: string;
  badge: string;
  previewThumbnail: string;
  spec: ProjectSpec;
  files: VirtualFileMap;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "quick-commerce",
    genre: "quick-commerce",
    name: "ZapGrocer (Quick Commerce)",
    description: "10-minute grocery delivery app with category chips, live delivery countdown, and sticky cart.",
    badge: "10-Min Fast",
    previewThumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    spec: quickCommerceSpec,
    files: quickCommerceFiles,
  },
  {
    id: "cinematic-streaming",
    genre: "streaming",
    name: "CineVerse+ (Movie Streaming)",
    description: "Netflix/Prime style cinematic platform with 4K billboard hero, hover previews, and watchlist.",
    badge: "Cinematic 4K",
    previewThumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    spec: cinematicStreamSpec,
    files: cinematicStreamFiles,
  },
  {
    id: "video-platform",
    genre: "video",
    name: "PulseTube (Video Platform)",
    description: "YouTube-style video grid, watch theater view, comments thread, and subscriptions.",
    badge: "Creator Hub",
    previewThumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    spec: videoPlatformSpec,
    files: videoPlatformFiles,
  },
  {
    id: "social-feed",
    genre: "social",
    name: "Prism (Aesthetic Social App)",
    description: "Instagram-style photo journals, gradient stories rail, double-tap hearts, and profile portfolio.",
    badge: "Visual-First",
    previewThumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
    spec: socialFeedSpec,
    files: socialFeedFiles,
  },
  {
    id: "portfolio",
    genre: "portfolio",
    name: "Vance Visuals (Creative Portfolio)",
    description: "Editorial photography portfolio with Leica EXIF metadata, fullscreen lightbox, and commission inquiry.",
    badge: "Fine-Art",
    previewThumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
    spec: portfolioSpec,
    files: portfolioFiles,
  },
  {
    id: "saas-modern",
    genre: "saas",
    name: "NexusAI (Developer SaaS)",
    description: "Linear/Stripe style developer platform with interactive terminal demo and transparent pricing.",
    badge: "Linear Grade",
    previewThumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    spec: saasModernSpec,
    files: saasModernFiles,
  },
  {
    id: "virtual-office",
    genre: "saas",
    name: "GatherPulse AI (Virtual Office)",
    description: "Spatial remote headquarters with interactive floorplan, live audio huddle, screen-share preview, and presence.",
    badge: "Spatial AI",
    previewThumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    spec: virtualOfficeSpec,
    files: virtualOfficeFiles,
  },
];

export function getTemplateByGenre(genre: SiteGenre): TemplateDefinition {
  const match = TEMPLATES.find((t) => t.genre === genre);
  return match || TEMPLATES[0];
}

export function getTemplateByPrompt(prompt: string): TemplateDefinition {
  const lower = prompt.toLowerCase();
  if (lower.includes("virtual office") || lower.includes("office") || lower.includes("workspace") || lower.includes("remote team") || lower.includes("gather")) {
    const vo = TEMPLATES.find((t) => t.id === "virtual-office");
    if (vo) return vo;
  }
  const genre = detectGenreFromPrompt(prompt);
  return getTemplateByGenre(genre);
}

export function detectGenreFromPrompt(prompt: string): SiteGenre {
  const lower = prompt.toLowerCase();
  if (lower.includes("grocery") || lower.includes("blinkit") || lower.includes("zepto") || lower.includes("food delivery") || lower.includes("10 min")) {
    return "quick-commerce";
  }
  if (lower.includes("movie") || lower.includes("netflix") || lower.includes("stream") || lower.includes("cinema") || lower.includes("film") || lower.includes("series")) {
    return "streaming";
  }
  if (lower.includes("video") || lower.includes("youtube") || lower.includes("vlog") || lower.includes("channel") || lower.includes("watch")) {
    return "video";
  }
  if (lower.includes("social") || lower.includes("instagram") || lower.includes("photo sharing") || lower.includes("stories") || lower.includes("feed") || lower.includes("community")) {
    return "social";
  }
  if (lower.includes("portfolio") || lower.includes("photographer") || lower.includes("photography") || lower.includes("artist") || lower.includes("designer")) {
    return "portfolio";
  }
  return "saas";
}
