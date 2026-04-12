import type { MetadataRoute } from "next";

const BASE_URL = "https://neoklyn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const services = [
    "web",
    "mobile",
    "ecommerce",
    "marketing",
    "3d",
    "branding",
    "ai-agents",
    "gen-ai",
  ];

  return [
    // ── Homepage ──
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Services index ──
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ── Individual service pages ──
    ...services.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // ── High-priority pages ──
    ...([
      { path: "/work", freq: "weekly" as const },
      { path: "/about", freq: "monthly" as const },
    ]).map(({ path, freq }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority: 0.8,
    })),

    // ── Standard pages ──
    ...([
      { path: "/markets", freq: "monthly" as const },
      { path: "/process", freq: "monthly" as const },
      { path: "/insights", freq: "weekly" as const },
      { path: "/estimate", freq: "monthly" as const },
      { path: "/contact", freq: "yearly" as const },
      { path: "/privacy", freq: "yearly" as const },
      { path: "/terms", freq: "yearly" as const },
    ]).map(({ path, freq }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority: path === "/estimate" ? 0.7 : 0.6,
    })),
  ];
}
