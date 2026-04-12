import { organizationSchema } from "@/lib/schema";

export default function SchemaData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://neoklyn.com/#website",
    name: "NeoKlyn",
    url: "https://neoklyn.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://neoklyn.com/insights?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const schemas = [organizationSchema(), websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
