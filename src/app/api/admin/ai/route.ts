import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, isErrorResponse, handleApiError } from "@/lib/adminApi";
import { rateLimit } from "@/lib/rateLimit";
import { z } from "zod";

const aiRequestSchema = z.object({
  task: z.enum([
    "seo-title",
    "meta-description",
    "slug",
    "excerpt",
    "tags",
    "outline",
    "ideas",
    "improve",
    "grammar",
    "summarize",
    "faqs",
    "conclusion",
    "social-post",
    "linkedin-post",
    "twitter-post",
  ]),
  title: z.string().max(300).optional(),
  contentText: z.string().max(20000).optional(),
  focusKeyword: z.string().max(100).optional(),
  selection: z.string().max(8000).optional(),
  tone: z.string().max(50).optional(),
});

const PROMPTS: Record<string, (i: { title: string; contentText: string; focusKeyword: string; selection: string; tone: string }) => string> = {
  "seo-title": (i) =>
    `Write ONE SEO title (max 60 characters) for this blog article. Include the focus keyword "${i.focusKeyword}" naturally if provided. Article title: "${i.title}". Content summary: ${i.contentText.slice(0, 1500)}. Reply with ONLY the title, no quotes.`,
  "meta-description": (i) =>
    `Write ONE meta description (140-160 characters) for this blog article. Compelling, includes keyword "${i.focusKeyword}" if provided, ends with a subtle call to action. Title: "${i.title}". Content: ${i.contentText.slice(0, 1500)}. Reply with ONLY the description.`,
  slug: (i) =>
    `Suggest ONE short URL slug (3-6 words, lowercase, hyphen-separated) for: "${i.title}". Include keyword "${i.focusKeyword}" if natural. Reply with ONLY the slug.`,
  excerpt: (i) =>
    `Write a 1-2 sentence excerpt (max 200 characters) for this blog article that makes readers want to click. Title: "${i.title}". Content: ${i.contentText.slice(0, 2000)}. Reply with ONLY the excerpt.`,
  tags: (i) =>
    `Suggest 4-6 short tags for this article (e.g. "RAG", "Next.js", "AI Automation"). Title: "${i.title}". Content: ${i.contentText.slice(0, 1500)}. Reply with ONLY a comma-separated list.`,
  outline: (i) =>
    `Create a blog outline for "${i.title}" targeting keyword "${i.focusKeyword}". Return 6-8 H2 headings with 2-3 bullet points each. Use markdown.`,
  ideas: (i) =>
    `Generate 8 blog article ideas for an AI agency & web development studio (topics: AI agents, gen AI, web dev, mobile, ecommerce, 3D web, SEO). ${i.focusKeyword ? `Focus area: ${i.focusKeyword}.` : ""} For each: title + one-line angle. Use a numbered markdown list.`,
  improve: (i) =>
    `Improve this text: clearer, more engaging, active voice, keep the meaning and approximate length.${i.tone ? ` Tone: ${i.tone}.` : ""}\n\n${i.selection || i.contentText.slice(0, 4000)}\n\nReply with ONLY the improved text.`,
  grammar: (i) =>
    `Fix grammar, spelling, and punctuation. Change nothing else.\n\n${i.selection || i.contentText.slice(0, 4000)}\n\nReply with ONLY the corrected text.`,
  summarize: (i) =>
    `Summarize this article in 3-4 sentences:\n\n${i.contentText.slice(0, 8000)}\n\nReply with ONLY the summary.`,
  faqs: (i) =>
    `Generate 5 FAQs with concise answers (2-3 sentences each) for this article. Title: "${i.title}". Content: ${i.contentText.slice(0, 4000)}. Format as markdown: **Q: ...** then the answer.`,
  conclusion: (i) =>
    `Write a strong closing section (2 paragraphs) for this article, ending with a call to action to contact NeoKlyn (an AI agency & web studio). Title: "${i.title}". Content: ${i.contentText.slice(0, 3000)}. Reply with ONLY the conclusion text.`,
  "social-post": (i) =>
    `Write a short social media post (max 280 chars) promoting this article, with 2-3 hashtags. Title: "${i.title}". Key points: ${i.contentText.slice(0, 1000)}. Reply with ONLY the post.`,
  "linkedin-post": (i) =>
    `Write a LinkedIn post (150-220 words) promoting this article. Hook first line, 3-4 short paragraphs or bullets, end with a question + link placeholder {URL}. Title: "${i.title}". Content: ${i.contentText.slice(0, 2000)}. Reply with ONLY the post.`,
  "twitter-post": (i) =>
    `Write a Twitter/X thread (3 tweets, each max 270 chars, numbered 1/ 2/ 3/) promoting this article. Title: "${i.title}". Content: ${i.contentText.slice(0, 1500)}. Reply with ONLY the tweets.`,
};

async function callAnthropic(prompt: string): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  const block = msg.content[0];
  return block.type === "text" ? block.text.trim() : "";
}

async function callOpenAiCompatible(prompt: string, opts: { apiKey: string; baseURL?: string; model: string }): Promise<string> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: opts.apiKey, baseURL: opts.baseURL });
  const res = await client.chat.completions.create({
    model: opts.model,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  return res.choices[0]?.message?.content?.trim() || "";
}

// POST /api/admin/ai
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (isErrorResponse(session)) return session;

  const rl = rateLimit(`ai:${session.userId}`, { limit: 30, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many AI requests — slow down a little" }, { status: 429 });
  }

  try {
    const body = aiRequestSchema.parse(await req.json());
    const input = {
      title: body.title || "",
      contentText: body.contentText || "",
      focusKeyword: body.focusKeyword || "",
      selection: body.selection || "",
      tone: body.tone || "",
    };

    const prompt = PROMPTS[body.task](input);

    let result: string;
    if (process.env.ANTHROPIC_API_KEY) {
      result = await callAnthropic(prompt);
    } else if (process.env.OPENAI_API_KEY) {
      result = await callOpenAiCompatible(prompt, {
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini",
      });
    } else if (process.env.GROQ_API_KEY) {
      result = await callOpenAiCompatible(prompt, {
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        model: "llama-3.3-70b-versatile",
      });
    } else {
      return NextResponse.json(
        { error: "No AI provider configured. Set ANTHROPIC_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY in .env" },
        { status: 503 }
      );
    }

    if (!result) {
      return NextResponse.json({ error: "AI returned an empty response" }, { status: 502 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    return handleApiError(error);
  }
}
