import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import SchemaData from "@/components/SchemaData";
import ChatWidget from "@/components/ChatWidget";
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
    default: "AI Agency & Web Development Studio — NeoKlyn",
    template: "%s | NeoKlyn",
  },
  description:
    "Premium AI agents, web apps, mobile & ecommerce from Bengaluru. Trusted by 100+ global brands. Get a free consultation.",
  openGraph: {
    title: "AI Agency & Web Development Studio — NeoKlyn",
    description:
      "Premium AI agents, web apps, mobile & ecommerce from Bengaluru. Trusted by 100+ global brands. Get a free consultation.",
    url: "https://neoklyn.com",
    siteName: "NeoKlyn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@neoklyn",
    creator: "@neoklyn",
    title: "AI Agency & Web Development Studio — NeoKlyn",
    description:
      "Premium AI agents, web apps, mobile & ecommerce from Bengaluru. Trusted by 100+ global brands. Get a free consultation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        <SchemaData />
        <Effects />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
