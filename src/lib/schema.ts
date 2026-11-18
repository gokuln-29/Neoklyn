type BreadcrumbItem = {
  name: string;
  url: string;
};

const organizationBase = {
  "@type": "Organization",
  "@id": "https://neoklyn.com/#organization",
  name: "NeoKlyn",
  url: "https://neoklyn.com",
  logo: "https://neoklyn.com/logo.png",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...organizationBase,
    description:
      "AI-accelerated web and app development studio in Bengaluru, India. Websites, mobile apps, ecommerce and AI agents built with AI tools and reviewed line-by-line by a senior engineer with 10+ years of experience. Serving clients worldwide.",
    telephone: "+916380202766",
    email: "hello@neoklyn.com",
    foundingDate: "2026-01",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bengaluru, Karnataka",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: "Gokulnath N",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+916380202766",
        email: "hello@neoklyn.com",
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
    // Only real, live profiles — no placeholders. AggregateRating/Review schema
    // is intentionally omitted until a real, linkable review profile (Google
    // Business Profile or Clutch) exists; fabricated review markup violates
    // Google's review-snippet policy and risks a manual action on the domain.
    sameAs: [
      "https://www.instagram.com/neo_klyn/",
      "https://x.com/neoklyn",
      "https://youtube.com/@neoklyn",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://neoklyn.com/contact#localbusiness",
    name: "NeoKlyn",
    url: "https://neoklyn.com/contact",
    image: "https://neoklyn.com/opengraph-image",
    description:
      "AI-accelerated web and app development studio in Bengaluru, India. Websites, mobile apps, ecommerce and AI agents built with AI tools and reviewed line-by-line by a senior engineer with 10+ years of experience. Serving clients worldwide.",
    telephone: "+916380202766",
    email: "hello@neoklyn.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bengaluru, Karnataka",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-14:00"],
    sameAs: [
      "https://www.instagram.com/neo_klyn/",
      "https://x.com/neoklyn",
      "https://youtube.com/@neoklyn",
    ],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    provider: {
      "@type": "Organization",
      name: "NeoKlyn",
      url: "https://neoklyn.com",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Singapore" },
    ],
  };
}

type FAQItem = {
  question: string;
  answer: string;
};

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
