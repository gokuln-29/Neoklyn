import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import EstimateWizard from "@/components/EstimateWizard";

export const metadata: Metadata = {
  title: "AI Project Cost Estimator — NeoKlyn",
  description:
    "Get a free AI-powered project estimate from NeoKlyn. Share your scope, features, and timeline to receive budget and delivery guidance.",
  openGraph: {
    title: "AI Project Cost Estimator — NeoKlyn",
    description:
      "Get a free AI-powered project estimate from NeoKlyn. Share your scope, features, and timeline to receive budget and delivery guidance.",
    url: "https://neoklyn.com/estimate",
    siteName: "NeoKlyn",
    type: "website",
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
