"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, trackEvent } from "@/lib/track";

/**
 * Site-wide tracking, mounted once in the root layout:
 *  - remembers where the visitor came from (UTM / referrer) for lead records
 *  - tracks clicks on WhatsApp, phone, email, Cal.com and the estimate/audit
 *    links wherever they appear, so no per-link handlers are needed.
 */
export default function SiteTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/admin")) captureAttribution();
  }, [pathname]);

  useEffect(() => {
    function locationOf(el: Element): string {
      const tagged = el.closest("[data-track-location]");
      if (tagged) return tagged.getAttribute("data-track-location") || "unknown";
      if (el.closest("nav, .public-nav, .mobile-nav")) return "nav";
      if (el.closest("footer")) return "footer";
      return window.location.pathname;
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor) return;
      if (window.location.pathname.startsWith("/admin")) return;

      const href = anchor.getAttribute("href") || "";
      const location = locationOf(anchor);

      if (href.includes("wa.me/")) trackEvent("whatsapp_click", { location });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { location });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { location });
      else if (href.includes("cal.com/")) trackEvent("calcom_click", { location });
      else if (href === "/estimate" || href.startsWith("/estimate?")) trackEvent("estimate_cta_click", { location });
      else if (href === "/website-audit" || href === "/audit") trackEvent("audit_cta_click", { location, target: href });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
