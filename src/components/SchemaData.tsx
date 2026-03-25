export default function SchemaData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NeoKlyn",
    "url": "https://neoklyn.com",
    "logo": "https://neoklyn.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@neoklyn.com",
      "contactType": "customer inquiries"
    },
    "sameAs": [
      // Add real links later
      "https://www.linkedin.com/company/neoklyn",
      "https://twitter.com/neoklyn"
    ]
  };

  const localBusinessHubs = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "NeoKlyn Bangalore",
      "url": "https://neoklyn.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "NeoKlyn Singapore",
      "url": "https://neoklyn.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Singapore",
        "addressCountry": "SG"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "NeoKlyn London",
      "url": "https://neoklyn.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB"
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {localBusinessHubs.map((hub, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hub) }}
        />
      ))}
    </>
  );
}
