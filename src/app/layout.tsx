import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import SchemaData from "@/components/SchemaData";
import PublicChrome from "@/components/PublicChrome";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neoklyn.com"),
  title: {
    default: "AI Agency & Web Development Studio — NeoKlyn",
    template: "%s | NeoKlyn",
  },
  description:
    "Web apps, AI Agents, Ecommerce & 3D experiences engineered for conversion. Based in Bengaluru.",
  alternates: {
    canonical: "https://neoklyn.com",
  },
  openGraph: {
    title: "AI Agency & Web Development Studio — NeoKlyn",
    description:
      "Web apps, AI Agents, Ecommerce & 3D experiences engineered for conversion. Based in Bengaluru.",
    url: "https://neoklyn.com",
    siteName: "NeoKlyn",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "NeoKlyn - AI Agency & Web Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@neoklyn",
    creator: "@neoklyn",
    title: "AI Agency & Web Development Studio — NeoKlyn",
    description:
      "Web apps, AI Agents, Ecommerce & 3D experiences engineered for conversion. Based in Bengaluru.",
    images: ["/opengraph-image"],
  },
  // Replace with your actual code from Google Search Console > Settings > Ownership verification > HTML tag method
  verification: {
    google: "eae07f2fdc2af551",
    other: {
      "msvalidate.01": "F4C64E2701668A1315B564F7902724B9",
    },
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
        {/* Google Tag Manager noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K4425M6M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K4425M6M');
          `}
        </Script>

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C9FYRR791J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C9FYRR791J');
          `}
        </Script>

        {/* External Chat Widget Placeholder (Intercom, Crisp, Zendesk, etc.) */}
        {/* TODO: Uncomment and replace with your chat widget script */}
        {/* <Script strategy="lazyOnload">
          {`
            (function(){ var w=window; var ic=w.Intercom; if(typeof ic==="function"){ ic('reattach_activator'); ic('update',w.intercomSettings); } else{ var d=document; var i=function(){ i.c(arguments); }; i.q=[]; i.c=function(args){ i.q.push(args); }; w.Intercom=i; var l=function(){ var s=d.createElement('script'); s.type='text/javascript'; s.async=true; s.src='https://widget.intercom.io/widget/YOUR_APP_ID'; var x=d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s,x); }; if(w.attachEvent){ w.attachEvent('onload',l); } else{ w.addEventListener('load',l,false); } } })();
          `}
        </Script> */}

        <SchemaData />
        <PublicChrome>
          <Effects />
          <Navbar />
        </PublicChrome>
        {children}
        <PublicChrome>
          <Footer />
          <ChatWidget />
        </PublicChrome>
      </body>
    </html>
  );
}
