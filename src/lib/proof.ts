import { db } from "@/lib/db";
import type { Accent, TestimonialItem } from "@/data/testimonials";

const ACCENTS: Accent[] = ["cyan", "violet", "blue"];

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const letters = parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0];
  return letters.toUpperCase();
}

/**
 * Active testimonials from the CMS, in the order set in /admin/testimonials.
 * Returns [] when there are none or the database is unreachable, so callers
 * fall back to the built-in set and the page never fails because of this.
 */
export async function getCmsTestimonials(): Promise<TestimonialItem[]> {
  try {
    const rows = await db.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 12,
    });
    return rows.map((row, index) => ({
      id: row.id,
      quote: row.content,
      name: row.author,
      subtitle: [row.role, row.company].filter(Boolean).join(" · "),
      initials: initialsOf(row.author),
      accent: ACCENTS[index % ACCENTS.length],
      rating: row.rating,
    }));
  } catch (error) {
    console.error("Could not load testimonials from the CMS:", error);
    return [];
  }
}
