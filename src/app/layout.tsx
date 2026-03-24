import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import SchemaData from "@/components/SchemaData";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neoklyn.com"),
  title: {
    default: "NeoKlyn — Premium Digital Studio",
    template: "%s | NeoKlyn",
  },
  description: "Web apps, mobile, ecommerce, AI Agents, 3D experiences & performance marketing.",
  openGraph: {
    title: "NeoKlyn | Premium Digital Studio",
    description: "Web apps, mobile, ecommerce, AI Agents, 3D experiences & performance marketing engineered for scale and growth.",
    url: "https://neoklyn.com",
    siteName: "NeoKlyn",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630 image in public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "NeoKlyn Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoKlyn | Premium Digital Studio",
    description: "Web apps, mobile, ecommerce, AI Agents, 3D experiences & performance marketing engineered for scale.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        <SchemaData />
        <Effects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
