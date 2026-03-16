import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
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
  title: "NeoKlyn — Digital Studio",
  description: "Web apps, mobile, ecommerce, 3D experiences & performance marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        <Effects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
