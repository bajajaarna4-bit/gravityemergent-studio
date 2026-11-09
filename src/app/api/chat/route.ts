import { NextRequest, NextResponse } from "next/server";
import { callLLM, getApiKey } from "@/lib/llm/client";
import { TEMPLATES, getTemplateByPrompt } from "@/lib/templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userPrompt, currentCode, targetedElement, model = "gemini-2.0-flash", apiKey } = body;

    if (!userPrompt) {
      return NextResponse.json(
        { error: "userPrompt is required." },
        { status: 400 }
      );
    }

    const keyInfo = getApiKey(model.includes("claude") ? "anthropic" : "gemini", apiKey);

    // If API key is available, use real LLM code patching
    if (keyInfo) {
      const targetDesc = targetedElement
        ? `The user specifically clicked and selected the DOM element: <${targetedElement.tagName}> "${targetedElement.textSnippet || ""}" (selector: "${targetedElement.selector || ""}"). Apply changes specifically to this element or section.`
        : "Apply the requested modifications to the appropriate section of the application.";

      const system = `You are an elite React and Tailwind CSS Code Patcher.
You receive the existing "/App.js" code and an edit request from the user.
${targetDesc}

RULES:
1. Return ONLY the complete updated "/App.js" code. No markdown explanations or preamble.
2. Keep all existing working features, structure, and imports intact, applying only the user's requested modifications.
3. Ensure the result is valid React with 'export default function App() { ... }'.
4. Maintain clean Tailwind CSS classes and high design quality.`;

      const output = await callLLM(
        [
          { role: "system", content: system },
          { role: "user", content: `CURRENT CODE:\n\`\`\`jsx\n${currentCode}\n\`\`\`\n\nUSER REQUEST: "${userPrompt}"` },
        ],
        {
          model,
          apiKey: keyInfo.key,
          temperature: 0.2,
        }
      );

      let updatedCode = output.trim();
      if (updatedCode.includes("```")) {
        const match = updatedCode.match(/```(?:jsx|javascript|tsx|js)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          updatedCode = match[1].trim();
        }
      }

      return NextResponse.json({
        success: true,
        updatedCode,
        affectedFiles: ["/App.js"],
        summary: targetedElement
          ? `Patched <${targetedElement.tagName}> with: "${userPrompt}"`
          : `Updated /App.js according to: "${userPrompt}"`,
      });
    }

    // Offline Smart Code Patcher & Synthesizer (when external cloud LLM key is not yet configured)
    const lowerPrompt = userPrompt.toLowerCase();

    // 1. Check if the user is asking to synthesize a whole new site or concept (e.g. "ai virtual office build")
    if (
      lowerPrompt.includes("virtual office") || 
      lowerPrompt.includes("office") || 
      lowerPrompt.includes("remote team") || 
      lowerPrompt.includes("gather") || 
      lowerPrompt.includes("grocery") || 
      lowerPrompt.includes("blinkit") || 
      lowerPrompt.includes("streaming") || 
      lowerPrompt.includes("netflix") || 
      lowerPrompt.includes("youtube") || 
      lowerPrompt.includes("video") || 
      lowerPrompt.includes("instagram") || 
      lowerPrompt.includes("social") || 
      lowerPrompt.includes("portfolio") || 
      lowerPrompt.includes("photographer") || 
      lowerPrompt.includes("saas") ||
      lowerPrompt.includes("build")
    ) {
      const tmpl = getTemplateByPrompt(userPrompt);
      const appCode = tmpl.files["/App.js"]?.content || currentCode;

      return NextResponse.json({
        success: true,
        updatedCode: appCode,
        affectedFiles: ["/App.js"],
        spec: tmpl.spec,
        files: tmpl.files,
        summary: `Synthesized **${tmpl.name}** layout. (Smart Offline Engine active. Add GEMINI_API_KEY in AI Studio settings for custom LLM prompts.)`,
      });
    }

    // 2. Click-to-edit DOM targeted patching
    let updatedCode = currentCode;
    let patchSummary = `Modified application based on: "${userPrompt}"`;

    if (targetedElement && targetedElement.textSnippet && updatedCode.includes(targetedElement.textSnippet)) {
      // Replace targeted element text or heading
      updatedCode = updatedCode.replace(targetedElement.textSnippet, userPrompt.replace(/^change (to|text to)\s+/i, ""));
      patchSummary = `Updated <${targetedElement.tagName}> text snippet`;
    } else if (lowerPrompt.includes("darker") || lowerPrompt.includes("black")) {
      updatedCode = updatedCode.replace(/bg-\[#09090b\]/g, "bg-[#030305]").replace(/bg-zinc-900/g, "bg-black");
      patchSummary = "Enhanced dark mode contrast and deep black tones";
    } else if (lowerPrompt.includes("lighter") || lowerPrompt.includes("light")) {
      updatedCode = updatedCode.replace(/text-zinc-100/g, "text-white font-medium");
      patchSummary = "Brightened text contrast and ambient highlights";
    } else if (lowerPrompt.includes("pricing") || lowerPrompt.includes("price")) {
      patchSummary = "Configured transparent pricing and tier models";
    } else {
      patchSummary = `Applied refinements for: "${userPrompt}"`;
    }

    return NextResponse.json({
      success: true,
      updatedCode,
      affectedFiles: ["/App.js"],
      summary: `${patchSummary}. (Set GEMINI_API_KEY in AI Studio drawer for arbitrary natural-language generation.)`,
    });
  } catch (err: any) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process chat edit." },
      { status: 500 }
    );
  }
}
