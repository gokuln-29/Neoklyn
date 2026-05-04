import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neoklyn.com";
  const now = new Date();

  const paths = [
    "",
    "/services",
    "/services/web",
    "/services/mobile",
    "/services/ecommerce",
    "/services/marketing",
    "/services/3d",
    "/services/branding",
    "/services/ai-agents",
    "/services/gen-ai",
    "/work",
    "/about",
    "/process",
    "/markets",
    "/insights",
    "/contact",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}