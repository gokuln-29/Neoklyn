import React from "react";
import CTASection from "@/components/CTASection";

interface PageWrapperProps {
    children: React.ReactNode;
    includeCTA?: boolean;
}

export default function PageWrapper({
    children,
    includeCTA = true,
}: PageWrapperProps) {
    return (
        <main style={{ paddingTop: "8rem", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
            </div>
            {includeCTA && <CTASection />}
        </main>
    );
}
