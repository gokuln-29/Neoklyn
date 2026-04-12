import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";
import WorkGrid from "./WorkGrid";
import { projects } from "./projects";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio & Case Studies — NeoKlyn",
  },
  description:
    "See real results: enterprise web apps, ecommerce stores & AI integrations delivered for global clients. View our case studies.",
  openGraph: {
    title: "Portfolio & Case Studies — NeoKlyn",
    description:
      "See real results: enterprise web apps, ecommerce stores & AI integrations delivered for global clients. View our case studies.",
    url: "https://neoklyn.com/work",
    siteName: "NeoKlyn",
    type: "website",
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
          description="Case studies from web, 3D, travel, industrial, and manufacturing programs delivered for ambitious brands."
        />

        <WorkGrid projects={projects} />
      </section>
    </PageWrapper>
  );
}
