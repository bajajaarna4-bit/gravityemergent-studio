import { NextRequest, NextResponse } from "next/server";
import { callLLM, getApiKey } from "@/lib/llm/client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userPrompt, currentCode, targetedElement, model = "gemini-2.0-flash", apiKey } = body;

    if (!userPrompt || !currentCode) {
      return NextResponse.json(
        { error: "userPrompt and currentCode are required." },
        { status: 400 }
      );
    }

    const keyInfo = getApiKey(model.includes("claude") ? "anthropic" : "gemini", apiKey);
    if (!keyInfo) {
      return NextResponse.json(
        { error: "API_KEY_MISSING: Please configure your API key in .env or AI Studio drawer." },
        { status: 400 }
      );
    }

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
  } catch (err: any) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process chat edit." },
      { status: 500 }
    );
  }
}
