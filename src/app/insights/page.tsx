import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import InsightsGrid from "@/components/InsightsGrid";
import { getAllInsightSummaries, getInsightFilterCategories } from "@/lib/insights";
import type { Metadata } from "next";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
  title: "Engineering Insights — AI, Web & Growth Blog",
  description:
    "Technical deep dives, strategic playbooks, and implementation notes from NeoKlyn engineering across AI agents, web development, mobile, and growth marketing.",
  alternates: { canonical: "https://neoklyn.com/insights" },
  openGraph: {
    title: "Engineering Insights — AI, Web & Growth Blog | NeoKlyn",
    description:
      "Technical deep dives, strategic playbooks, and implementation notes from NeoKlyn engineering across AI agents, web development, mobile, and growth marketing.",
    url: "https://neoklyn.com/insights",
    siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
    title: "Engineering Insights — AI, Web & Growth Blog | NeoKlyn",
    description:
      "Technical deep dives, strategic playbooks, and implementation notes from NeoKlyn engineering.",
  },
};

// Refresh the blog index every 5 minutes so newly published CMS posts appear
export const revalidate = 300;

export default async function InsightsPage() {
  const [posts, filters] = await Promise.all([
    getAllInsightSummaries(),
    getInsightFilterCategories(),
  ]);

  return (
    <PageWrapper>
      <section className="section">
        <PageHeader
          label="Engineering Blog"
          titleOutline="OUR"
          titleSolid="INSIGHTS"
          titleColorClass="title-cyan"
          description="Technical deep dives, strategic playbooks, and implementation notes from NeoKlyn engineering across AI, web, mobile, and growth."
        />

        <InsightsGrid posts={posts} filters={filters} />
      </section>
    </PageWrapper>
  );
}
