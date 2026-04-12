import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "NeoKlyn - Engineering Intelligent Digital Systems";

export default function OpenGraphImage() {
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
              "radial-gradient(circle at 18% 22%, rgba(6,182,212,0.24), transparent 42%), radial-gradient(circle at 82% 18%, rgba(124,58,237,0.2), transparent 38%), radial-gradient(circle at 62% 72%, rgba(59,130,246,0.14), transparent 44%)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "0.08em" }}>
            NEOKLYN
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#67e8f9",
              fontSize: 24,
              letterSpacing: "0.04em",
            }}
          >
            neoklyn.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", marginTop: 14 }}>
          <div style={{ display: "flex", maxWidth: 900, fontSize: 64, fontWeight: 700, lineHeight: 1.08 }}>
            Engineering Intelligent Digital Systems
          </div>
          <div style={{ display: "flex", maxWidth: 760, fontSize: 28, color: "rgba(255,255,255,0.74)", lineHeight: 1.35 }}>
            Premium AI agents, web apps, mobile and ecommerce from Bengaluru
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <div style={{ width: "100%", height: 2, background: "#06b6d4" }} />
          <div
            style={{
              display: "flex",
              color: "#67e8f9",
              fontSize: 27,
              fontFamily: "JetBrains Mono, ui-monospace, monospace",
              letterSpacing: "0.03em",
            }}
          >
            120+ PROJECTS · 98% RETENTION · 3 GLOBAL HUBS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
