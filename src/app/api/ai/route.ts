import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { world, context, messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        role: "ai", 
        content: `[FALLBACK] I noticed you haven't configured a Gemini API key yet. In the real STEMVerse, I'd analyze your ${world} simulation where variables are currently: ${JSON.stringify(context)}. Keep exploring!` 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const systemPrompt = SYSTEM_PROMPTS[world as keyof typeof SYSTEM_PROMPTS] || "You are a STEM tutor.";
    
    const chat = model.startChat({
      history: messages.map((m: any) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(`
      CONTEXT: The current simulation variables are: ${JSON.stringify(context)}.
      USER REQUEST: ${messages[messages.length - 1].content}
      
      INSTRUCTION: Provide a helpful, concise explanation based on your persona.
    `);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ role: "ai", content: text });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ 
      role: "ai", 
      content: "I'm having a bit of trouble processing that. Let's keep experimenting with the variables!" 
    }, { status: 500 });
  }
}
