import EntityManager from "@/components/admin/EntityManager";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <EntityManager
      title="Services"
      subtitle="Manage the service catalog (public pages read from code until migrated)"
      endpoint="/api/admin/services"
      titleField="title"
      metaField="slug"
      fields={[
        { name: "title", label: "Title", type: "text", required: true, inTable: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon (emoji)", type: "text" },
        { name: "color", label: "Color", type: "color" },
        { name: "features", label: "Features", type: "tags", inTable: true },
        { name: "sortOrder", label: "Sort Order", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox", inTable: true },
      ]}
    />
  );
}
