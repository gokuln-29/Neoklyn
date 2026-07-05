import EntityManager from "@/components/admin/EntityManager";

export const metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <EntityManager
      title="Team Members"
      endpoint="/api/admin/team"
      titleField="name"
      metaField="role"
      fields={[
        { name: "name", label: "Name", type: "text", required: true, inTable: true },
        { name: "role", label: "Role", type: "text", required: true, inTable: true },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "avatar", label: "Avatar URL", type: "text" },
        { name: "sortOrder", label: "Sort Order", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox", inTable: true },
      ]}
    />
  );
}
