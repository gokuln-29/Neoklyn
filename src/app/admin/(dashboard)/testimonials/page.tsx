import EntityManager from "@/components/admin/EntityManager";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <EntityManager
      title="Testimonials"
      endpoint="/api/admin/testimonials"
      titleField="author"
      metaField="company"
      fields={[
        { name: "author", label: "Author", type: "text", required: true, inTable: true },
        { name: "role", label: "Role", type: "text", inTable: true },
        { name: "company", label: "Company", type: "text" },
        { name: "content", label: "Testimonial", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number", inTable: true },
        { name: "avatar", label: "Avatar URL", type: "text" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox", inTable: true },
      ]}
    />
  );
}
