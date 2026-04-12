import type { Metadata } from "next";
import type { ReactNode } from "react";
import { localBusinessSchema } from "@/lib/schema";

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
        type: "website",
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
