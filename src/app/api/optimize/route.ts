import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OPTIMIZE_SYSTEM_PROMPT, buildOptimizePrompt } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription, language } = await request.json();
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
        { role: "system", content: OPTIMIZE_SYSTEM_PROMPT },
        { role: "user", content: buildOptimizePrompt(resume, jobDescription, language) },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });
    const result = response.choices[0]?.message?.content || "未能生成，请重试";
    return NextResponse.json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "服务器错误";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
