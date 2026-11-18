import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const MODEL = process.env.AUTOMATION_MODEL || "claude-sonnet-5-5";
export const SITE_URL = (process.env.AUTOMATION_SITE_URL || "http://127.0.0.1:3001").replace(/\/$/, "");
export const STATE_DIR = path.join(process.cwd(), ".automation");

export async function ensureStateDir(sub = "") {
  const dir = path.join(STATE_DIR, sub);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
  return value;
}

export function getAnthropic() {
  return new Anthropic({ apiKey: requireEnv("ANTHROPIC_API_KEY") });
}

export async function askClaude(client: Anthropic, prompt: string, maxTokens = 8000): Promise<string> {
  const message = await client.messages.stream({
    model: MODEL,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  }).finalMessage();

  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

export function parseJsonObject<T>(text: string): T {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("Model response had no JSON object.");
  return JSON.parse(text.slice(start, end + 1)) as T;
}

// Facts that are already public on neoklyn.com. Prompts may only use these for
// NeoKlyn-specific claims — the site has a strict no-fabrication rule.
export const NEOKLYN_FACTS = `
- NeoKlyn is an AI-accelerated web and app development studio in Bengaluru, India.
- Every line of code is architected, reviewed and tested by a senior engineer with 10+ years of experience.
- Typical delivery is 2-5 weeks. Pricing is fixed. Clients own 100% of the code. 30 days of free post-launch fixes.
- Websites start from ₹50,000 / $600. Web apps typically ₹1-4 lakh. Mobile apps typically ₹1-4 lakh. AI agents start from ₹1 lakh.
- Services: web, mobile apps, ecommerce, AI agents, generative AI, 3D websites, marketing, branding.
- Tools: Next.js, Flutter, React Native, Swift, Kotlin, Firebase, Supabase, LangChain, LangGraph.
- Pages that exist: /services, /services/web, /services/mobile, /services/ecommerce, /services/marketing, /services/3d, /services/branding, /services/ai-agents, /services/gen-ai, /estimate, /audit, /contact, /how-we-work, /work.
`.trim();
