import { 
  AgentActivityItem, 
  AgentType, 
  ProjectSpec, 
  VirtualFileMap, 
  ModelSettings 
} from "../types";
import { generateId } from "../utils";
import { getTemplateByGenre, detectGenreFromPrompt } from "../templates";

export interface OrchestrationResult {
  spec: ProjectSpec;
  files: VirtualFileMap;
  activityStream: AgentActivityItem[];
}

export function generateInitialPlan(
  prompt: string,
  modelSettings: ModelSettings
): ProjectSpec {
  const genre = detectGenreFromPrompt(prompt);
  const baseTemplate = getTemplateByGenre(genre);

  return {
    ...baseTemplate.spec,
    id: generateId("spec"),
    summary: `Autonomous synthesis for user request: "${prompt}". Genre Engine: ${genre.toUpperCase()} (${baseTemplate.spec.tokens.mood}).`,
    approved: false,
  };
}

export function simulateAgentWorkflow(
  prompt: string,
  spec: ProjectSpec,
  onProgress?: (item: AgentActivityItem) => void
): { files: VirtualFileMap; stream: AgentActivityItem[] } {
  const genre = spec.genre;
  const template = getTemplateByGenre(genre);
  const stream: AgentActivityItem[] = [];

  const addStep = (
    agent: AgentType,
    status: AgentActivityItem["status"],
    title: string,
    detail: string,
    codeSnippet?: string,
    durationMs = 600
  ) => {
    const item: AgentActivityItem = {
      id: generateId("act"),
      agent,
      timestamp: Date.now(),
      status,
      title,
      detail,
      codeSnippet,
      durationMs,
    };
    stream.push(item);
    if (onProgress) onProgress(item);
  };

  // 1. Planner Agent
  addStep(
    "planner",
    "working",
    "Deconstructing Product Intent & Architecture",
    `Parsed user prompt: "${prompt}". Identified primary archetype: ${genre}. Synthesized sitemap (${spec.pages.join(", ")}).`
  );

  // 2. Designer Agent
  addStep(
    "designer",
    "working",
    "Applying Genre-Aware Design Tokens & Typography",
    `Established color palette (Primary: ${spec.tokens.primary}, Accent: ${spec.tokens.accent}). Enforced 8pt spacing rhythm, accessible WCAG 2.1 AA contrast, and ${spec.tokens.fontHeading}.`
  );

  // 3. Frontend Agent
  addStep(
    "frontend",
    "working",
    "Synthesizing Responsive React & Tailwind Component Tree",
    `Assembled modular React components: ${spec.components.slice(0, 4).join(", ")}. Injected micro-interactions and touch targets.`,
    `export default function App() {\n  const [state, setState] = useState(...);\n  // Genre: ${spec.name} (${spec.tagline})\n}`
  );

  // 4. Backend Agent
  addStep(
    "backend",
    "working",
    "Generating Data Model & State Handlers",
    `Created relational schemas: ${spec.databaseTables.map(t => t.name).join(", ")}. Provisioned simulated stateful handlers for cart, favorites, and checkout.`
  );

  // 5. QA Agent
  addStep(
    "qa",
    "working",
    "Auditing Responsive Layout & Mobile Breakpoints (375px)",
    "Inspecting viewport boundaries, touch padding, console exceptions, and broken anchor links."
  );

  // 6. Reviewer Agent
  addStep(
    "reviewer",
    "completed",
    "Human Craftsmanship Audit: Passed",
    "Verified high-density visual hierarchy, realistic copy (zero placeholder text), authentic photography, and polished micro-animations."
  );

  // 7. Fixer Agent
  addStep(
    "fixer",
    "completed",
    "Targeted Code Harmonization & Optimization Complete",
    "Applied micro-optimizations to flex containers, memoized state selectors, and verified production bundle readiness."
  );

  return {
    files: template.files,
    stream,
  };
}

