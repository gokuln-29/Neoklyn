import EntityManager from "@/components/admin/EntityManager";

export const metadata = { title: "FAQs" };

export default function FAQsPage() {
  return (
    <EntityManager
      title="FAQs"
      endpoint="/api/admin/faqs"
      titleField="question"
      fields={[
        { name: "question", label: "Question", type: "text", required: true, inTable: true },
        { name: "answer", label: "Answer", type: "textarea", required: true },
        { name: "sortOrder", label: "Sort Order", type: "number", inTable: true },
        { name: "isActive", label: "Active", type: "checkbox", inTable: true },
      ]}
    />
  );
}
