/**
 * Posts that were removed or merged. Each one was published and indexed, so
 * the old address forwards (permanent redirect, see next.config.ts) to the
 * closest live page instead of returning 404, and is hidden from every list
 * (insights index, related posts, home page, sitemap) even if the CMS still has
 * the post published.
 * Keep entries for at least a year.
 */
export const REMOVED_INSIGHTS: ReadonlyArray<readonly [slug: string, destination: string]> = [
  // duplicate of the website cost guide, created in the CMS
  ["website-development-cost-in-2026-a-real-pricing-breakdown", "/insights/website-development-cost-guide"],
  // duplicate of the file-based native vs cross-platform article (same title and keyword, 0 views)
  ["native-vs-cross-platform-app-development-cost-timeline-guide", "/insights/native-vs-cross-platform-app-development"],
  // legacy posts removed from the codebase
  ["ai-agents-and-automation-evolved", "/insights/shipping-production-ai-agents"],
  ["ai-agents-business-operations-india", "/solutions/ai-agent-for-small-business"],
  ["ai-web-design-trends", "/services/web"],
  ["headless-shopify-vs-woocommerce-d2c", "/services/ecommerce"],
  ["uae-custom-web-platform-2025", "/markets"],
];
