/**
 * Posts that were removed or merged. Each one was published and indexed, so
 * the old address forwards (permanent redirect, see next.config.ts) to the
 * closest live page instead of returning 404, and is left out of the sitemap.
 * Keep entries for at least a year.
 */
export const REMOVED_INSIGHTS: ReadonlyArray<readonly [slug: string, destination: string]> = [
  // duplicate of the website cost guide, created in the CMS
  ["website-development-cost-in-2026-a-real-pricing-breakdown", "/insights/website-development-cost-guide"],
  // legacy posts removed from the codebase
  ["ai-agents-and-automation-evolved", "/insights/shipping-production-ai-agents"],
  ["ai-agents-business-operations-india", "/solutions/ai-agent-for-small-business"],
  ["ai-web-design-trends", "/services/web"],
  ["headless-shopify-vs-woocommerce-d2c", "/services/ecommerce"],
  ["uae-custom-web-platform-2025", "/markets"],
];
