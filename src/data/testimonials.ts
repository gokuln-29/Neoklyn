export type Accent = "cyan" | "violet" | "blue";

export type TestimonialItem = {
  id: string;
  quote: string;
  /** Person or company shown as the source. */
  name: string;
  /** Role, company, location line. */
  subtitle: string;
  initials: string;
  accent: Accent;
  rating: number;
  /** Optional link to the client's live site. */
  href?: string;
};

/**
 * Shown only while the Testimonials table in the CMS (/admin/testimonials) has
 * no active entries. As soon as one real testimonial is added there, these are
 * replaced by the CMS entries.
 *
 * These quotes are attributed to companies, not named people. Confirm each one
 * was approved by the client, or replace it with a named, approved quote.
 */
export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "dwarka",
    quote:
      "They didn't just rebuild our website; they re-architected our entire B2B trading platform. Our mobile engagement jumped 45% in the first quarter, and the Next.js headless setup means our content team deploys 5x faster.",
    name: "Dwarka Gen. Trading",
    subtitle: "Corporate Platform · Middle East",
    initials: "DG",
    accent: "cyan",
    rating: 5,
    href: "http://dwarkageneraltrading.ae/",
  },
  {
    id: "aathithyan",
    quote:
      "As a premium brand, we needed a portal that exuded luxury and functioned flawlessly. NeoKlyn delivered a pixel-perfect application that loads instantly and positions us as an undisputed leader in our market sector.",
    name: "Aathithyan",
    subtitle: "Brand Website · India 🇮🇳",
    initials: "AA",
    accent: "violet",
    rating: 5,
    href: "https://aathithyan.com/",
  },
  {
    id: "zinad",
    quote:
      "For an industrial supplier, digital trust is everything. NeoKlyn built an enterprise-grade platform that perfectly handles international RFPs and drives high-value B2B contractors straight into our funnel.",
    name: "Zinad Concrete Works",
    subtitle: "Industrial Web · Middle East",
    initials: "ZC",
    accent: "blue",
    rating: 5,
    href: "https://zinadconcreteworks.com/",
  },
  {
    id: "travex",
    quote:
      "The visual aesthetic is absolutely world-class. Taking our venture online with NeoKlyn resulted in an immediate 110% increase in luxury booking inquiries. Their GSAP 3D animations set us apart globally.",
    name: "Travex Ventures",
    subtitle: "Travel Agency Site · India 🇮🇳",
    initials: "TV",
    accent: "cyan",
    rating: 5,
    href: "https://travexventures.com/",
  },
  {
    id: "lpsm",
    quote:
      "Total digital transformation. We moved from legacy monolithic systems to a highly performant, serverless Next.js edge network. The results? Zero downtime and an incredibly modern operational interface.",
    name: "LPSM Pvt. Ltd.",
    subtitle: "Manufacturing Hub · India 🇮🇳",
    initials: "LP",
    accent: "violet",
    rating: 5,
    href: "http://lpsmpvtltd.com/",
  },
  {
    id: "sharon",
    quote:
      "Patients used to struggle just to find our services online, let alone book an appointment. NeoKlyn rebuilt our website around simplicity and trust, and we saw a 30% increase in booking inquiries almost immediately.",
    name: "Sharon Physio",
    subtitle: "Physiotherapy Clinic · Madurai, India 🇮🇳",
    initials: "SP",
    accent: "blue",
    rating: 5,
    href: "https://sharonphysio.com/",
  },
];
