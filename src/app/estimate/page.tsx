import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import EstimateWizard from "@/components/EstimateWizard";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
  title: "AI Project Cost Estimator",
  description:
    "Get a free AI-powered project estimate from NeoKlyn. Share your scope, features, and timeline to receive budget and delivery guidance.",
  openGraph: {
    title: "AI Project Cost Estimator — NeoKlyn",
    description:
      "Get a free AI-powered project estimate from NeoKlyn. Share your scope, features, and timeline to receive budget and delivery guidance.",
    url: "https://neoklyn.com/estimate",
    siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
    type: "website",
  },
  alternates: { canonical: "https://neoklyn.com/estimate" },
  twitter: {
    card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
    title: "AI Project Cost Estimator — NeoKlyn",
    description:
      "Get a free AI-powered project estimate from NeoKlyn. Share your scope, features, and timeline to receive budget and delivery guidance.",
  },
};

export default function EstimatePage() {
  return (
    <PageWrapper includeCTA={false}>
      <section className="section">
        <PageHeader
          label="AI Estimator"
          titleOutline="PROJECT"
          titleSolid="ESTIMATE"
          titleColorClass="title-cyan"
          description="Answer a few quick questions and receive an AI-powered budget and timeline estimate tailored to your project scope."
        />

        <EstimateWizard />
      </section>
    </PageWrapper>
  );
}
