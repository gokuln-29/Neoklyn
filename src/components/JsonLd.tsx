export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NeoKlyn",
    "url": "https://neoklyn.com",
    "description": "AI Agency & Web Development Studio",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressCountry": "India"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 120
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "NeoKlyn Services",
      "itemListElement": [
        "Web Development",
        "Mobile Apps",
        "Ecommerce",
        "AI Agents",
        "Generative AI",
        "3D Websites",
        "Digital Marketing",
        "UI/UX Design"
      ].map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}