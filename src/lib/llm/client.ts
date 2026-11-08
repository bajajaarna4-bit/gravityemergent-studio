import { z } from "zod";

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMCallConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
}

export function getApiKey(provider?: "gemini" | "anthropic", customKey?: string): { key: string; provider: "gemini" | "anthropic" } | null {
  if (customKey && customKey.trim()) {
    if (customKey.startsWith("sk-ant-")) {
      return { key: customKey.trim(), provider: "anthropic" };
    }
    return { key: customKey.trim(), provider: provider || (customKey.startsWith("AIza") ? "gemini" : "gemini") };
  }

  const geminiEnv = process.env.GEMINI_API_KEY?.trim();
  const anthropicEnv = process.env.ANTHROPIC_API_KEY?.trim();

  if (provider === "anthropic" && anthropicEnv) {
    return { key: anthropicEnv, provider: "anthropic" };
  }
  if (provider === "gemini" && geminiEnv) {
    return { key: geminiEnv, provider: "gemini" };
  }

  // Fallback to whichever is configured
  if (geminiEnv) return { key: geminiEnv, provider: "gemini" };
  if (anthropicEnv) return { key: anthropicEnv, provider: "anthropic" };

  return null;
}

export async function callLLM(
  messages: LLMMessage[],
  config: LLMCallConfig = {}
): Promise<string> {
  const customKey = config.apiKey;
  const preferredProvider = config.model?.includes("claude") ? "anthropic" : "gemini";
  const auth = getApiKey(preferredProvider, customKey);

  if (!auth) {
    throw new Error(
      "API_KEY_MISSING: No Gemini or Anthropic API key found. Please set GEMINI_API_KEY or ANTHROPIC_API_KEY in your .env file or enter it in the AI Studio settings."
    );
  }

  if (auth.provider === "gemini") {
    return callGemini(messages, auth.key, config);
  } else {
    return callAnthropic(messages, auth.key, config);
  }
}

async function callGemini(
  messages: LLMMessage[],
  apiKey: string,
  config: LLMCallConfig
): Promise<string> {
  const modelName = config.model && config.model.includes("gemini")
    ? (config.model.includes("pro") ? "gemini-1.5-pro" : "gemini-2.0-flash")
    : "gemini-2.0-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  // Combine system prompt and chat history
  let systemInstruction = "";
  const contents: any[] = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      systemInstruction += (systemInstruction ? "\n\n" : "") + msg.content;
    } else {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      });
    }
  }

  const body: any = {
    contents: contents.length > 0 ? contents : [{ role: "user", parts: [{ text: "Hello" }] }],
    generationConfig: {
      temperature: config.temperature ?? 0.2,
      maxOutputTokens: config.maxTokens ?? 8192,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response or was filtered by safety policies.");
  }

  return text;
}

async function callAnthropic(
  messages: LLMMessage[],
  apiKey: string,
  config: LLMCallConfig
): Promise<string> {
  const modelName = config.model && config.model.includes("claude")
    ? (config.model.includes("3-7") ? "claude-3-7-sonnet-20250219" : "claude-3-5-sonnet-20241022")
    : "claude-3-5-sonnet-20241022";

  const url = "https://api.anthropic.com/v1/messages";

  let systemPrompt = "";
  const anthropicMessages: any[] = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      systemPrompt += (systemPrompt ? "\n\n" : "") + msg.content;
    } else {
      anthropicMessages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      });
    }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: modelName,
      system: systemPrompt || undefined,
      messages: anthropicMessages,
      temperature: config.temperature ?? 0.2,
      max_tokens: config.maxTokens ?? 8192,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;

  if (!text) {
    throw new Error("Anthropic returned an empty response.");
  }

  return text;
}

/**
 * Extracts and parses JSON from LLM response, stripping markdown blocks and repairing minor syntax errors.
 */
export function extractJSON<T>(rawText: string, schema?: z.ZodSchema<T>): T {
  let cleaned = rawText.trim();

  // Strip markdown code fences: ```json ... ``` or ``` ... ```
  if (cleaned.includes("```")) {
    const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      cleaned = match[1].trim();
    }
  }

  // If still contains leading/trailing text outside the outermost { ... } or [ ... ]
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err: any) {
    // Attempt minor repair: remove trailing commas before closing braces/brackets
    const repaired = cleaned
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/[\u201C\u201D]/g, '"');
    try {
      parsed = JSON.parse(repaired);
    } catch {
      throw new Error(`Failed to parse structured JSON from LLM output: ${err.message}\nRaw snippet: ${cleaned.substring(0, 200)}...`);
    }
  }

  if (schema) {
    return schema.parse(parsed);
  }

  return parsed as T;
}
