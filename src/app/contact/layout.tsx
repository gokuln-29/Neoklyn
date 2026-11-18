import type { Metadata } from "next";
import type { ReactNode } from "react";
import { localBusinessSchema } from "@/lib/schema";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo";
export const metadata: Metadata = {
    title: {
        absolute: "Contact NeoKlyn — Start Your Project",
    },
    description:
        "Get a free consultation with our engineering team. WhatsApp, email or form — we respond within 4 hours. Let's build together.",
    openGraph: {
        title: "Contact NeoKlyn — Start Your Project",
        description:
            "Get a free consultation with our engineering team. WhatsApp, email or form — we respond within 4 hours. Let's build together.",
        url: "https://neoklyn.com/contact",
        siteName: "NeoKlyn",
        images: DEFAULT_OG_IMAGES,
        type: "website",
    },
    alternates: { canonical: "https://neoklyn.com/contact" },
    twitter: {
        card: "summary_large_image",
        images: DEFAULT_TWITTER_IMAGES,
        title: "Contact NeoKlyn — Start Your Project",
        description:
            "Get a free consultation with our engineering team. WhatsApp, email or form — we respond within 4 hours. Let's build together.",
    },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
    const localBusinessStructuredData = localBusinessSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
            />
            {children}
        </>
    );
}
