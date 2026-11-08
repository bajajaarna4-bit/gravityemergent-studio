export type SiteGenre =
  | "quick-commerce"
  | "streaming"
  | "video"
  | "social"
  | "saas"
  | "portfolio";

export type AgentType =
  | "planner"
  | "designer"
  | "frontend"
  | "backend"
  | "qa"
  | "reviewer"
  | "fixer";

export type AgentStatus = "idle" | "thinking" | "working" | "completed" | "flagged" | "fixing";

export interface AgentActivityItem {
  id: string;
  agent: AgentType;
  timestamp: number;
  status: AgentStatus;
  title: string;
  detail: string;
  codeSnippet?: string;
  durationMs?: number;
}

export interface DesignTokens {
  primary: string;
  primaryForeground: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  cardBorder: string;
  fontHeading: string;
  fontBody: string;
  radius: string;
  mood: string;
}

export interface DatabaseColumn {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "array" | "relation";
  isPrimary?: boolean;
  nullable?: boolean;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: DatabaseColumn[];
  rows: Record<string, any>[];
}

export interface ProjectSpec {
  id: string;
  name: string;
  tagline: string;
  genre: SiteGenre;
  summary: string;
  pages: string[];
  components: string[];
  features: string[];
  tokens: DesignTokens;
  databaseTables: DatabaseTable[];
  approved: boolean;
}

export interface VirtualFile {
  path: string;
  content: string;
  language: string;
  isModified?: boolean;
}

export type VirtualFileMap = Record<string, VirtualFile>;

export interface ModelSettings {
  modelId: "claude-3-7-sonnet" | "claude-3-5-sonnet" | "gemini-2-0-pro" | "gemini-2-0-flash" | "gpt-4o";
  temperature: number;
  topP: number;
  systemPrompt: string;
  creativityLevel: "balanced" | "strict" | "creative" | "experimental";
  tokenBudget: number;
  apiKey?: string;
}

export interface VersionSnapshot {
  id: string;
  timestamp: number;
  label: string;
  promptDescription: string;
  files: VirtualFileMap;
}

export interface ClickToEditTarget {
  selector: string;
  tagName: string;
  componentHint?: string;
  textSnippet?: string;
  domRect?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  affectedFiles?: string[];
  targetedElement?: ClickToEditTarget;
  agentSteps?: AgentActivityItem[];
}

export type DeviceViewport = "desktop" | "tablet" | "mobile";
export type WorkspaceTab = "preview" | "code" | "files" | "database";

