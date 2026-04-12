import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  ESTIMATE_FEATURES,
  PROJECT_TYPES,
  SCALE_OPTIONS,
  TIMELINE_OPTIONS,
  type ProjectType,
  type ScaleOption,
  type TimelineOption,
} from "@/data/estimateFeatures";

export const runtime = "nodejs";

type EstimateRequestBody = {
  projectType: string;
  features: string[];
  scale: string;
  timeline: string;
  name: string;
  email: string;
  company?: string;
};

type EstimateResponse = {
  estimated_timeline: string;
  estimated_budget_range: string;
  key_assumptions: string[];
  what_increases_cost: string[];
  recommended_stack: string[];
  next_steps: string;
};

const PROJECT_TYPE_VALUES = new Set(PROJECT_TYPES.map((item) => item.value));
const SCALE_VALUES = new Set(SCALE_OPTIONS.map((item) => item.value));
const TIMELINE_VALUES = new Set(TIMELINE_OPTIONS.map((item) => item.value));

const USD_BASE_MATRIX: Record<ProjectType, Record<ScaleOption, [number, number]>> = {
  "Web App": {
    MVP: [12000, 24000],
    "Growth Stage": [28000, 55000],
    Enterprise: [70000, 140000],
  },
  "Mobile App": {
    MVP: [15000, 30000],
    "Growth Stage": [35000, 70000],
    Enterprise: [85000, 165000],
  },
  Ecommerce: {
    MVP: [14000, 28000],
    "Growth Stage": [32000, 65000],
    Enterprise: [80000, 155000],
  },
  "AI Agent": {
    MVP: [18000, 36000],
    "Growth Stage": [42000, 90000],
    Enterprise: [100000, 220000],
  },
  "3D Website": {
    MVP: [16000, 32000],
    "Growth Stage": [38000, 76000],
    Enterprise: [95000, 190000],
  },
  "Full Brand + Web": {
    MVP: [20000, 38000],
    "Growth Stage": [45000, 85000],
    Enterprise: [110000, 210000],
  },
};

const TIMELINE_BASE: Record<ScaleOption, [number, number]> = {
  MVP: [4, 8],
  "Growth Stage": [8, 14],
  Enterprise: [14, 24],
};

function parseEstimateJson(text: string): Partial<EstimateResponse> | null {
  try {
    return JSON.parse(text) as Partial<EstimateResponse>;
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;

    try {
      return JSON.parse(text.slice(start, end + 1)) as Partial<EstimateResponse>;
    } catch {
      return null;
    }
  }
}

function formatUsd(value: number) {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${Math.round(value)}`;
}

function formatInr(value: number) {
  const lakhs = value / 100000;
  if (lakhs >= 1) return `₹${Math.round(lakhs)}L`;
  return `₹${Math.round(value / 1000)}K`;
}

function buildFallbackEstimate(input: {
  projectType: ProjectType;
  features: string[];
  scale: ScaleOption;
  timeline: TimelineOption;
  email: string;
}): EstimateResponse {
  const baseRange = USD_BASE_MATRIX[input.projectType][input.scale];
  const includedFeatures = 3;
  const extraFeatureCount = Math.max(0, input.features.length - includedFeatures);
  const featureMultiplier = 1 + Math.min(extraFeatureCount * 0.08, 0.64);

  let timelineMultiplier = 1;
  if (input.timeline === "ASAP <4 weeks") timelineMultiplier = 1.15;
  if (input.timeline === "Flexible (no rush)") timelineMultiplier = 0.95;

  const lowUsd = baseRange[0] * featureMultiplier * timelineMultiplier;
  const highUsd = baseRange[1] * featureMultiplier * timelineMultiplier;

  const [timelineMin, timelineMax] = TIMELINE_BASE[input.scale];
  const timelineText =
    input.timeline === "ASAP <4 weeks"
      ? `${Math.max(3, timelineMin - 1)}-${Math.max(6, timelineMin + 2)} weeks (accelerated)`
      : input.timeline === "Flexible (no rush)"
        ? `${timelineMin + 2}-${timelineMax + 4} weeks (phased)`
        : `${timelineMin}-${timelineMax} weeks`;

  const useInr = input.email.toLowerCase().endsWith(".in");
  const exchangeRate = 83;
  const budgetRange = useInr
    ? `${formatInr(lowUsd * exchangeRate)} - ${formatInr(highUsd * exchangeRate)}`
    : `${formatUsd(lowUsd)} - ${formatUsd(highUsd)}`;

  return {
    estimated_timeline: timelineText,
    estimated_budget_range: budgetRange,
    key_assumptions: [
      "Estimate assumes one primary platform release with agreed scope freeze before development.",
      "Third-party API and infra subscriptions are not included in this range.",
      "Design, engineering, QA, and launch support are included for the selected feature set.",
    ],
    what_increases_cost: [
      "Frequent scope changes or adding new modules mid-sprint.",
      "Enterprise compliance needs, SSO, audit logs, or region-specific data controls.",
      "Complex external integrations, custom AI training, or heavy data migration.",
    ],
    recommended_stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Vercel"],
    next_steps:
      "Book a 30-minute solution call to validate scope, confirm integrations, and receive a precise milestone-based proposal.",
  };
}

function normalizeEstimate(candidate: Partial<EstimateResponse> | null, fallback: EstimateResponse): EstimateResponse {
  const assumptions = candidate?.key_assumptions?.filter(Boolean).slice(0, 3);
  const costIncreases = candidate?.what_increases_cost?.filter(Boolean).slice(0, 3);
  const stack = candidate?.recommended_stack?.filter(Boolean).slice(0, 8);

  return {
    estimated_timeline: candidate?.estimated_timeline?.trim() || fallback.estimated_timeline,
    estimated_budget_range:
      candidate?.estimated_budget_range?.trim() || fallback.estimated_budget_range,
    key_assumptions: assumptions && assumptions.length ? assumptions : fallback.key_assumptions,
    what_increases_cost: costIncreases && costIncreases.length ? costIncreases : fallback.what_increases_cost,
    recommended_stack: stack && stack.length ? stack : fallback.recommended_stack,
    next_steps: candidate?.next_steps?.trim() || fallback.next_steps,
  };
}

function buildEstimatorPrompt(input: {
  projectType: ProjectType;
  features: string[];
  scale: ScaleOption;
  timeline: TimelineOption;
  name: string;
  email: string;
  company?: string;
}) {
  return `
You are a senior solutions estimator at NeoKlyn.

User input:
- Name: ${input.name}
- Email: ${input.email}
- Company: ${input.company || "Not specified"}
- Project type: ${input.projectType}
- Scale: ${input.scale}
- Timeline preference: ${input.timeline}
- Features selected (${input.features.length}): ${input.features.join(", ") || "None"}

Pricing rules:
1) Use base USD pricing by project type and scale:
- Web App: MVP 12k-24k, Growth 28k-55k, Enterprise 70k-140k
- Mobile App: MVP 15k-30k, Growth 35k-70k, Enterprise 85k-165k
- Ecommerce: MVP 14k-28k, Growth 32k-65k, Enterprise 80k-155k
- AI Agent: MVP 18k-36k, Growth 42k-90k, Enterprise 100k-220k
- 3D Website: MVP 16k-32k, Growth 38k-76k, Enterprise 95k-190k
- Full Brand + Web: MVP 20k-38k, Growth 45k-85k, Enterprise 110k-210k

2) Complexity multiplier:
- First 3 features are included in base complexity.
- For each feature above 3, increase range by +8%.
- Cap total increase at +64%.

3) Timeline influence:
- ASAP <4 weeks: +15% budget due to acceleration.
- Flexible (no rush): -5% budget possible.
- Standard 6-12 weeks: no timeline premium.

4) Currency:
- If email ends with .in, return INR in lakhs format.
- Otherwise return USD in K format.

Output requirements:
- Return valid JSON only.
- No markdown, no commentary.
- Use this exact shape:
{
  "estimated_timeline": "8-12 weeks",
  "estimated_budget_range": "$30K - $55K",
  "key_assumptions": ["...", "...", "..."],
  "what_increases_cost": ["...", "...", "..."],
  "recommended_stack": ["...", "...", "..."],
  "next_steps": "..."
}
- Keep assumptions and cost drivers specific to the selected type/features/scale.
`.trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EstimateRequestBody;
    const projectType = body.projectType as ProjectType;
    const scale = body.scale as ScaleOption;
    const timeline = body.timeline as TimelineOption;
    const rawFeatures = Array.isArray(body.features) ? body.features.slice(0, 20) : [];
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const company = body.company?.trim();

    if (!PROJECT_TYPE_VALUES.has(projectType)) {
      return NextResponse.json({ error: "Invalid project type." }, { status: 400 });
    }
    if (!SCALE_VALUES.has(scale)) {
      return NextResponse.json({ error: "Invalid scale selection." }, { status: 400 });
    }
    if (!TIMELINE_VALUES.has(timeline)) {
      return NextResponse.json({ error: "Invalid timeline selection." }, { status: 400 });
    }
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const allowedFeatures = new Set(ESTIMATE_FEATURES[projectType]);
    const features = rawFeatures.filter((feature): feature is string => allowedFeatures.has(feature));

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!anthropicKey) {
      return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY." }, { status: 500 });
    }
    if (!resendKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY." }, { status: 500 });
    }

    const fallback = buildFallbackEstimate({
      projectType,
      features,
      scale,
      timeline,
      email,
    });

    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 800,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: buildEstimatorPrompt({
            projectType,
            features,
            scale,
            timeline,
            name,
            email,
            company,
          }),
        },
      ],
    });

    const raw = completion.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    const parsed = parseEstimateJson(raw);
    const estimate = normalizeEstimate(parsed, fallback);

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "NeoKlyn Estimator <onboarding@resend.dev>",
      to: [email],
      subject: `Your NeoKlyn estimate for ${projectType}`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;background:#0c0c12;color:#f4f4f5;border-radius:14px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
          <div style="padding:24px 28px;border-bottom:1px solid rgba(6,182,212,0.35);background:linear-gradient(90deg,rgba(6,182,212,0.08),rgba(59,130,246,0.08));">
            <h1 style="margin:0;font-size:22px;">Your Project Estimate is Ready</h1>
            <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Hi ${name}, here is your AI-generated NeoKlyn estimate.</p>
          </div>
          <div style="padding:24px 28px;">
            <p style="margin:0 0 12px;font-size:13px;color:#a1a1aa;">Project Type</p>
            <p style="margin:0 0 18px;font-size:18px;color:#e2e8f0;">${projectType}</p>
            <p style="margin:0 0 12px;font-size:13px;color:#a1a1aa;">Estimated Budget Range</p>
            <p style="margin:0 0 18px;font-size:28px;color:#67e8f9;font-weight:700;">${estimate.estimated_budget_range}</p>
            <p style="margin:0 0 12px;font-size:13px;color:#a1a1aa;">Estimated Timeline</p>
            <p style="margin:0 0 18px;font-size:17px;color:#f8fafc;">${estimate.estimated_timeline}</p>
            <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;">Top Assumptions</p>
            <ul style="margin:0 0 18px;padding-left:18px;color:#e4e4e7;line-height:1.7;">
              ${estimate.key_assumptions.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;">Next Steps</p>
            <p style="margin:0 0 22px;line-height:1.7;color:#e4e4e7;">${estimate.next_steps}</p>
            <a href="https://cal.com/neoklyn" style="display:inline-block;padding:12px 18px;border-radius:9px;background:#06b6d4;color:#032028;text-decoration:none;font-weight:700;">
              Book a Strategy Call
            </a>
          </div>
          <div style="padding:14px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#71717a;">
            NeoKlyn • Bengaluru • hello.neoklyn@gmail.com
          </div>
        </div>
      `,
    });

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error("Estimate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate estimate. Please try again." },
      { status: 500 }
    );
  }
}
