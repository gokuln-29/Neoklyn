import type { MetadataRoute } from "next";
import { getAllInsightSummaries } from "@/lib/insights";
import { projects } from "@/app/work/projects";
import { solutions } from "@/data/solutions";
import { REMOVED_INSIGHTS } from "@/data/removedInsights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://neoklyn.com";

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/how-we-work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/web`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/mobile`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/ecommerce`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/marketing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/3d`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/branding`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/ai-agents`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/gen-ai`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/process`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/markets`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/estimate`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/audit`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/website-audit`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const removed = new Set(REMOVED_INSIGHTS.map(([slug]) => slug));
  const insights = (await getAllInsightSummaries()).filter((post) => !removed.has(post.slug));
  const insightEntries: MetadataRoute.Sitemap = insights.map((post) => {
    const parsed = Date.parse(post.date);
    return {
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: Number.isNaN(parsed) ? undefined : new Date(parsed),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const solutionEntries: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...solutionEntries, ...insightEntries, ...workEntries];
}
