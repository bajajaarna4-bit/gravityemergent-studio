import { NextRequest } from "next/server";
import { 
  classifyGenre, 
  runPlannerAgent, 
  runDesignerAgent, 
  runFrontendAgent, 
  runBackendAgent, 
  runQAAgent 
} from "@/lib/llm/agents";
import { getApiKey } from "@/lib/llm/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();

  // Create stream
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const sendEvent = async (data: any) => {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    await writer.write(encoder.encode(payload));
  };

  // Run in background without awaiting before returning response
  (async () => {
    try {
      const body = await req.json();
      const prompt = body.prompt;
      const model = body.model || "gemini-2.0-flash";
      const temperature = body.temperature ?? 0.2;
      const customApiKey = body.apiKey || req.headers.get("x-api-key") || undefined;

      if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
        await sendEvent({
          type: "error",
          error: "A valid prompt is required.",
        });
        await writer.close();
        return;
      }

      // Check API Key
      const keyInfo = getApiKey(model.includes("claude") ? "anthropic" : "gemini", customApiKey);
      if (!keyInfo) {
        await sendEvent({
          type: "error",
          error: "API_KEY_MISSING: No Gemini or Anthropic API key configured. Please set GEMINI_API_KEY or ANTHROPIC_API_KEY in your .env file or input your key in the AI Studio settings drawer.",
        });
        await writer.close();
        return;
      }

      const config = {
        model,
        temperature,
        apiKey: keyInfo.key,
      };

      const genre = classifyGenre(prompt);

      await sendEvent({
        type: "init",
        genre,
        provider: keyInfo.provider,
        message: `Initialized autonomous multi-agent pipeline using ${keyInfo.provider.toUpperCase()} (${model}). Archetype detected: ${genre.toUpperCase()}.`,
      });

      // 1. Planner Agent
      const plan = await runPlannerAgent(prompt, genre, config, async (evt) => {
        await sendEvent({ type: "agent_activity", event: evt });
      });

      // 2. Designer Agent
      const tokens = await runDesignerAgent(plan, genre, config, async (evt) => {
        await sendEvent({ type: "agent_activity", event: evt });
      });

      // 3. Frontend Agent
      const code = await runFrontendAgent(plan, tokens, genre, config, async (evt) => {
        await sendEvent({ type: "agent_activity", event: evt });
      });

      // 4. Backend Agent
      const databaseTables = await runBackendAgent(plan, genre, config, async (evt) => {
        await sendEvent({ type: "agent_activity", event: evt });
      });

      // 5. QA & Fixer Agent
      const qaResult = await runQAAgent(code, plan, config, async (evt) => {
        await sendEvent({ type: "agent_activity", event: evt });
      });

      const finalCode = qaResult.approvedCode;

      // Assembled virtual files
      const files = [
        {
          path: "/App.js",
          content: finalCode,
        },
        {
          path: "/package.json",
          content: JSON.stringify(
            {
              name: plan.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
              version: "1.0.0",
              dependencies: {
                react: "^18.3.1",
                "react-dom": "^18.3.1",
                "lucide-react": "^0.454.0",
              },
            },
            null,
            2
          ),
        },
      ];

      // Final completion payload
      await sendEvent({
        type: "complete",
        result: {
          plan: {
            name: plan.name,
            tagline: plan.tagline,
            genre,
            summary: plan.summary,
            pages: plan.pages || ["Home"],
            components: plan.components || [],
            features: plan.features || [],
          },
          designTokens: tokens,
          databaseTables,
          files,
        },
      });

      await writer.close();
    } catch (err: any) {
      console.error("API /api/generate error:", err);
      try {
        await sendEvent({
          type: "error",
          error: err.message || "An unexpected error occurred during multi-agent synthesis.",
        });
        await writer.close();
      } catch {
        // stream might already be closed
      }
    }
  })();

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
