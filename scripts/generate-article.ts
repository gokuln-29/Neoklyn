import Anthropic from "@anthropic-ai/sdk";
import { promises as fs } from "fs";
import path from "path";
import { articleOutlineSeeds } from "../src/data/articleOutlines";

type GeneratedArticlePayload = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  outline: string[];
  article: {
    intro: string;
    sections: { heading: string; body: string }[];
    callout?: { title: string; body: string };
    conclusion: string;
  };
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function toCamelVar(slug: string) {
  const parts = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return `generated${parts.join("")}Post`;
}

function wordCount(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function computeReadTime(payload: GeneratedArticlePayload) {
  const articleText = [
    payload.article.intro,
    ...payload.article.sections.map((section) => section.body),
    payload.article.callout?.body || "",
    payload.article.conclusion,
  ].join(" ");

  const minutes = Math.max(6, Math.round(wordCount(articleText) / 190));
  return `${minutes} min read`;
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

async function loadEnvLocalIfNeeded() {
  if (process.env.ANTHROPIC_API_KEY) return;

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const raw = await fs.readFile(envPath, "utf-8");
    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (!key || !rest.length) continue;
      const value = rest.join("=").trim();
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env file and fail later with explicit key message.
  }
}

function parseJsonFromModel(text: string): GeneratedArticlePayload {
  const clean = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(clean) as GeneratedArticlePayload;
  } catch {
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Model response did not contain valid JSON.");
    }

    return JSON.parse(clean.slice(start, end + 1)) as GeneratedArticlePayload;
  }
}

function buildPrompt(topic: string) {
  return `
You are NeoKlyn's senior content strategist and technical editor.

Task:
Generate one complete long-form technical article draft for topic: "${topic}".

Brand voice guide:
- Confident, practical, engineering-first.
- No vague hype. Explain with clear implementation details.
- Tone: premium consulting + hands-on execution.
- Use concise, readable paragraphs.

SEO requirements:
- SEO title length: 50-60 characters.
- Meta description length: 120-155 characters.
- Include one primary keyword and 2-4 secondary keywords.
- Article target length: around 1500 words.
- Use 6-8 major sections.
- Each section body: 150-250 words.

Internal links to include naturally where relevant:
- https://neoklyn.com/services
- https://neoklyn.com/services/web
- https://neoklyn.com/services/mobile
- https://neoklyn.com/services/ecommerce
- https://neoklyn.com/services/ai-agents
- https://neoklyn.com/services/gen-ai
- https://neoklyn.com/services/3d
- https://neoklyn.com/services/marketing
- https://neoklyn.com/services/branding
- https://neoklyn.com/contact

Formatting and output rules:
1) Return VALID JSON only. No markdown wrappers.
2) Use this exact JSON schema:
{
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "category": "...",
  "categorySlug": "...",
  "excerpt": "...",
  "primaryKeyword": "...",
  "secondaryKeywords": ["..."],
  "outline": ["..."],
  "article": {
    "intro": "...",
    "sections": [{ "heading": "...", "body": "..." }],
    "callout": { "title": "...", "body": "..." },
    "conclusion": "..."
  }
}
3) categorySlug must be one of:
- web-development
- ai-agents
- gen-ai
- mobile-apps
- ecommerce
- 3d-immersive
- digital-marketing
- ui-ux-branding

4) slug should be lowercase-hyphen format.
5) Add one short practical code block inside one section body when relevant.
6) Include a CTA paragraph in the conclusion pointing to /contact.

Reference high-priority article concepts and structure style:
${articleOutlineSeeds
  .map(
    (seed, index) =>
      `${index + 1}. ${seed.title} | keyword: ${seed.primaryKeyword} | sections: ${seed.targetSections.join(" ; ")}`
  )
  .join("\n")}
`.trim();
}

async function main() {
  const topic = process.argv.slice(2).join(" ").trim();
  if (!topic) {
    console.error('Usage: npx tsx scripts/generate-article.ts "Your topic here"');
    process.exit(1);
  }

  await loadEnvLocalIfNeeded();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-ant-...")) {
    console.error("Missing valid ANTHROPIC_API_KEY in environment or .env.local");
    process.exit(1);
  }

  const anthropic = new Anthropic({ apiKey });

  console.log(`Generating article for topic: ${topic}`);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 5000,
    temperature: 0.6,
    messages: [{ role: "user", content: buildPrompt(topic) }],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  const parsed = parseJsonFromModel(text);

  const slug = slugify(parsed.slug || parsed.seoTitle || topic);
  const variableName = toCamelVar(slug);

  const normalizedPost = {
    title: parsed.seoTitle,
    slug,
    category: parsed.category,
    categorySlug: parsed.categorySlug,
    date: formatDate(),
    readTime: computeReadTime(parsed),
    author: "NeoKlyn Editorial",
    color:
      parsed.categorySlug === "gen-ai"
        ? "var(--violet)"
        : parsed.categorySlug === "3d-immersive"
          ? "var(--blue)"
          : "var(--cyan)",
    excerpt: parsed.excerpt,
    metaDescription: parsed.metaDescription,
    primaryKeyword: parsed.primaryKeyword,
    secondaryKeywords: parsed.secondaryKeywords,
    outline: parsed.outline,
    content: {
      intro: parsed.article.intro,
      sections: parsed.article.sections,
      callout: parsed.article.callout,
      conclusion: parsed.article.conclusion,
    },
  };

  const outputDir = path.join(process.cwd(), "src", "data", "blogs", "generated");
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${slug}.ts`);
  const fileContent = `import type { BlogPost } from "../../blogPosts";\n\nexport const ${variableName}: BlogPost = ${JSON.stringify(
    normalizedPost,
    null,
    2
  )};\n`;

  await fs.writeFile(outputPath, fileContent, "utf-8");

  console.log("\nArticle generated successfully.");
  console.log(`File: src/data/blogs/generated/${slug}.ts`);
  console.log("\nNext steps:");
  console.log(`1) Review and edit content in src/data/blogs/generated/${slug}.ts`);
  console.log(
    `2) Import it in src/data/blogPosts.ts as: import { ${variableName} } from './blogs/generated/${slug}';`
  );
  console.log(`3) Add ...${variableName} inside the blogPosts array`);
}

main().catch((error) => {
  console.error("Failed to generate article:", error);
  process.exit(1);
});
