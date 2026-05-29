import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ANALYZE_SYSTEM_PROMPT, buildAnalyzePrompt } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json();
    if (!resume || !jobDescription) {
      return NextResponse.json({ error: "请提供简历和职位描述" }, { status: 400 });
    }
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "服务暂不可用" }, { status: 503 });
    }
    const client = new OpenAI({ apiKey, baseURL: "https://api.deepseek.com" });
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: ANALYZE_SYSTEM_PROMPT },
        { role: "user", content: buildAnalyzePrompt(resume, jobDescription) },
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });
    const content = response.choices[0]?.message?.content || "{}";
    // Try to extract JSON from the response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { matchScore: 0, strengths: [], weaknesses: [], missingKeywords: [], suggestions: ["解析失败，请重试"] };
    }
    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "服务器错误";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
