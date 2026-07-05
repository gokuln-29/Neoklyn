"use client";

import { usePathname } from "next/navigation";

/**
 * Renders children (public-site chrome: Navbar, Footer, ChatWidget, Effects)
 * only outside the /admin area, where they would overlap the CMS UI.
 */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
