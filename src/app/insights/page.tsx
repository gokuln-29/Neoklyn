import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import InsightsGrid from "@/components/InsightsGrid";
import { getAllInsightSummaries, getInsightFilterCategories } from "@/lib/insights";

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
