import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";
import WorkGrid from "./WorkGrid";
import { projects } from "./projects";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
  title: {
    absolute: "Portfolio & Case Studies — NeoKlyn",
  },
  description:
    "Real websites built for clinics, traders, manufacturers and brands in India and the Middle East. See the problem, what we built and the results.",
  openGraph: {
    title: "Portfolio & Case Studies — NeoKlyn",
    description:
      "Real websites built for clinics, traders, manufacturers and brands in India and the Middle East. See the problem, what we built and the results.",
    url: "https://neoklyn.com/work",
    siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
    type: "website",
  },
  alternates: { canonical: "https://neoklyn.com/work" },
  twitter: {
    card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
    title: "Portfolio & Case Studies — NeoKlyn",
    description:
      "Real websites built for clinics, traders, manufacturers and brands in India and the Middle East. See the problem, what we built and the results.",
  },
};

export default function WorkPage() {
  return (
    <PageWrapper>
      <section className="section">
        <PageHeader
          label="Featured Portfolio"
          titleOutline="OUR"
          titleSolid="WORK"
          titleColorClass="title-cyan"
          description="Case studies from clinics, traders, manufacturers, travel and premium brands: what the problem was, what we built, and what changed."
        />

        <WorkGrid projects={projects} />
      </section>
    </PageWrapper>
  );
}
