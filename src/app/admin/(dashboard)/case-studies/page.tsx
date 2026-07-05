import EntityManager from "@/components/admin/EntityManager";

export const metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <EntityManager
      title="Case Studies"
      subtitle="Manage portfolio case studies (public pages read from code until migrated)"
      endpoint="/api/admin/case-studies"
      titleField="title"
      metaField="client"
      fields={[
        { name: "title", label: "Title", type: "text", required: true, inTable: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "client", label: "Client", type: "text", required: true, inTable: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "featuredImage", label: "Featured Image URL", type: "text" },
        { name: "technologies", label: "Technologies", type: "tags", inTable: true },
        { name: "sortOrder", label: "Sort Order", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox", inTable: true },
      ]}
    />
  );
}
