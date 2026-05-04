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
      "Premium AI agents, web apps, mobile, ecommerce, 3D experiences, and digital marketing services from Bengaluru.",
    telephone: "+916380202766",
    email: "hello.neoklyn@gmail.com",
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
      jobTitle: "Founder & CEO",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+916380202766",
        email: "hello.neoklyn@gmail.com",
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://github.com/neoklyn",
      "https://www.linkedin.com/company/neoklyn",
      "https://twitter.com/neoklyn",
      "https://dribbble.com/neoklyn",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "47",
    },
  };
}

export function aggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    ...organizationBase,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "47",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: "Dwarka Gen. Trading",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "They didn't just rebuild our website; they re-architected our entire B2B trading platform. Our mobile engagement jumped 45% in the first quarter.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: "Aathithyan",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "As a premium brand, we needed a portal that exuded luxury and functioned flawlessly. NeoKlyn delivered a pixel-perfect application that loads instantly.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: "Zinad Concrete Works",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "NeoKlyn built an enterprise-grade platform that perfectly handles international RFPs and drives high-value B2B contractors straight into our funnel.",
      },
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
      "NeoKlyn helps global brands with AI agents, web engineering, mobile products, ecommerce, and growth marketing.",
    telephone: "+916380202766",
    email: "hello.neoklyn@gmail.com",
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
      "https://github.com/neoklyn",
      "https://www.linkedin.com/company/neoklyn",
      "https://twitter.com/neoklyn",
      "https://dribbble.com/neoklyn",
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
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Singapore" },
      { "@type": "City", name: "London" },
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
