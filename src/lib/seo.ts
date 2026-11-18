/**
 * Shared SEO helpers.
 *
 * Next.js does not merge a page's `openGraph` with the root layout's: a page
 * that sets its own `openGraph` loses the default image. Pages that define
 * `openGraph` or `twitter` should spread these so link previews on WhatsApp,
 * LinkedIn, Facebook and X always have an image.
 */
export const OG_IMAGE_URL = "https://neoklyn.com/opengraph-image";

export const DEFAULT_OG_IMAGES = [
  { url: OG_IMAGE_URL, width: 1200, height: 630, alt: "NeoKlyn - AI-Accelerated Development Studio" },
];

export const DEFAULT_TWITTER_IMAGES = [OG_IMAGE_URL];

const SUFFIX = " | NeoKlyn";

/**
 * Page title with the brand suffix, kept short enough for search results.
 * The suffix is dropped when it would push the title past 65 characters.
 */
export function buildTitle(base: string, maxLength = 65): string {
  const title = base.trim();
  return title.length + SUFFIX.length <= maxLength ? `${title}${SUFFIX}` : title;
}
