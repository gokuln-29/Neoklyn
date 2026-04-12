import { ImageResponse } from "next/og";
import { getInsightBySlug } from "@/lib/insights";

type Props = {
  params: Promise<{ slug: string }>;
};

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const colorMap: Record<string, string> = {
  "var(--cyan)": "#06b6d4",
  "var(--violet)": "#8b5cf6",
  "var(--blue)": "#3b82f6",
};

function getAccentColor(colorVar: string): string {
  return colorMap[colorVar] || "#06b6d4";
}

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  const post = insight?.post;

  return [
    {
      id: "main",
      alt: post?.title ?? "NeoKlyn Insight",
      size,
      contentType,
    },
  ];
}

export default async function OpenGraphImage({ id, params }: { id: string } & Props) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  const post = insight?.post;

  const title = post?.title ?? "NeoKlyn Insight";
  const category = post?.category ?? "INSIGHT";
  const readTime = post?.readTime ?? "";
  const accent = getAccentColor(post?.color ?? "var(--cyan)");

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
          padding: "52px 64px 44px",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.05), transparent 42%), radial-gradient(circle at 82% 18%, rgba(124,58,237,0.2), transparent 38%), radial-gradient(circle at 62% 72%, rgba(59,130,246,0.14), transparent 44%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 60% 60%, ${accent}22, transparent 40%)`,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                color: accent,
                fontSize: 22,
                letterSpacing: "0.14em",
                fontFamily: "JetBrains Mono, ui-monospace, monospace",
              }}
            >
              {category.toUpperCase()}
            </div>
            {readTime && (
              <>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 22 }}>•</div>
                <div
                  style={{
                    display: "flex",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 20,
                    fontFamily: "JetBrains Mono, ui-monospace, monospace",
                  }}
                >
                  {readTime}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <div style={{ width: "100%", height: 2, background: accent }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              NEOKLYN
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: accent,
                fontSize: 22,
                letterSpacing: "0.04em",
              }}
            >
              neoklyn.com
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
