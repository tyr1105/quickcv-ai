import {
  OPTIMIZE_SYSTEM_PROMPT,
  ANALYZE_SYSTEM_PROMPT,
  buildOptimizePrompt,
  buildAnalyzePrompt,
} from "./prompts";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("quickcv_api_key") || "";
}

export function setApiKey(key: string): void {
  localStorage.setItem("quickcv_api_key", key);
}

export function clearApiKey(): void {
  localStorage.removeItem("quickcv_api_key");
}

async function callDeepSeek(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  temperature: number,
  maxTokens: number
): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } })?.error?.message ||
        `API 请求失败 (${response.status})`
    );
  }

  const data = await response.json();
  return (
    (data as { choices?: { message?: { content?: string } }[] }).choices?.[0]
      ?.message?.content || ""
  );
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    await callDeepSeek(apiKey, "You are a helpful assistant.", "Hi", 0, 5);
    return true;
  } catch {
    return false;
  }
}

export interface AnalysisResult {
  matchScore: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export async function analyzeResume(
  apiKey: string,
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const content = await callDeepSeek(
    apiKey,
    ANALYZE_SYSTEM_PROMPT,
    buildAnalyzePrompt(resume, jobDescription),
    0.2,
    1500
  );

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {
      matchScore: 0,
      strengths: [],
      weaknesses: [],
      missingKeywords: [],
      suggestions: ["解析失败，请重试"],
    };
  }
}

export async function optimizeResume(
  apiKey: string,
  resume: string,
  jobDescription: string,
  language: string
): Promise<string> {
  const result = await callDeepSeek(
    apiKey,
    OPTIMIZE_SYSTEM_PROMPT,
    buildOptimizePrompt(resume, jobDescription, language),
    0.4,
    3000
  );
  return result || "未能生成，请重试";
}
