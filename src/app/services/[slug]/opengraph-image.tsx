import { ImageResponse } from "next/og";

type Props = {
  params: Promise<{ slug: string }>;
};

type ServiceOgData = {
  name: string;
  description: string;
  accent: string;
  tags: string[];
};

const serviceOgData: Record<string, ServiceOgData> = {
  web: {
    name: "WEB DEVELOPMENT",
    description: "Fast, scalable web apps with React, Next.js and TypeScript.",
    accent: "#06b6d4",
    tags: ["React", "Next.js", "TypeScript"],
  },
  mobile: {
    name: "MOBILE APPS",
    description: "Cross-platform and native iOS/Android apps from MVP to enterprise scale.",
    accent: "#3b82f6",
    tags: ["Flutter", "React Native", "Swift"],
  },
  ecommerce: {
    name: "ECOMMERCE SOLUTIONS",
    description: "Shopify Plus, WooCommerce and headless commerce built for conversions.",
    accent: "#8b5cf6",
    tags: ["Shopify Plus", "Headless", "WooCommerce"],
  },
  marketing: {
    name: "DIGITAL MARKETING",
    description: "Data-driven SEO and paid campaigns focused on measurable growth.",
    accent: "#06b6d4",
    tags: ["SEO", "Google Ads", "Meta Ads"],
  },
  "3d": {
    name: "3D & IMMERSIVE",
    description: "Immersive WebGL storytelling and 3D product experiences at 60fps.",
    accent: "#3b82f6",
    tags: ["Three.js", "WebGL", "R3F"],
  },
  branding: {
    name: "UI/UX & BRANDING",
    description: "Premium visual identity, UX systems, and conversion-focused interfaces.",
    accent: "#8b5cf6",
    tags: ["Figma", "Design System", "Brand"],
  },
  "ai-agents": {
    name: "AI AGENTS",
    description: "Autonomous workflow agents for CRM ops, automation and internal systems.",
    accent: "#06b6d4",
    tags: ["LangChain", "LangGraph", "OpenAI"],
  },
  "gen-ai": {
    name: "GENERATIVE AI",
    description: "LLM integration, generative UX, and enterprise-grade GenAI deployments.",
    accent: "#3b82f6",
    tags: ["LLM", "GPT", "Claude"],
  },
};

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const data = serviceOgData[slug] ?? {
    name: "DIGITAL SERVICE",
    description: "Advanced digital products and engineering services by NeoKlyn.",
    accent: "#06b6d4",
    tags: ["Web", "Mobile", "AI"],
  };

  return [
    {
      alt: `${data.name} by NeoKlyn`,
      size,
      contentType,
    },
  ];
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const data = serviceOgData[slug] ?? {
    name: "DIGITAL SERVICE",
    description: "Advanced digital products and engineering services by NeoKlyn.",
    accent: "#06b6d4",
    tags: ["Web", "Mobile", "AI"],
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080f",
          color: "#ffffff",
          padding: "56px 64px 46px",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 24%, rgba(255,255,255,0.06), transparent 34%), radial-gradient(circle at 76% 22%, rgba(124,58,237,0.18), transparent 42%), radial-gradient(circle at 18% 78%, rgba(6,182,212,0.16), transparent 40%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 58% 62%, ${data.accent}26, transparent 40%)`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          <div style={{ display: "flex", color: data.accent, fontSize: 22, letterSpacing: "0.16em" }}>
            SERVICE
          </div>
          <div style={{ display: "flex", maxWidth: 990, fontSize: 82, fontWeight: 700, lineHeight: 1.03 }}>
            {data.name}
          </div>
          <div style={{ display: "flex", maxWidth: 840, fontSize: 28, color: "rgba(255,255,255,0.74)", lineHeight: 1.35 }}>
            {data.description}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <div style={{ width: "100%", height: 2, background: data.accent }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "0.06em" }}>NEOKLYN</div>
            <div style={{ display: "flex", gap: 12 }}>
              {data.tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    border: `1px solid ${data.accent}66`,
                    borderRadius: 999,
                    color: data.accent,
                    fontSize: 20,
                    fontFamily: "JetBrains Mono, ui-monospace, monospace",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
