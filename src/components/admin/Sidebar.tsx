"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Posts", href: "/admin/posts", icon: "📝" },
  { label: "Categories", href: "/admin/categories", icon: "📂" },
  { label: "Tags", href: "/admin/tags", icon: "🏷️" },
  { label: "Media", href: "/admin/media", icon: "🖼️" },
  { label: "Leads", href: "/admin/leads", icon: "📬" },
  { label: "Growth", href: "/admin/growth", icon: "📈" },
  { label: "Services", href: "/admin/services", icon: "⚙️" },
  { label: "Case Studies", href: "/admin/case-studies", icon: "📋" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "💬" },
  { label: "FAQs", href: "/admin/faqs", icon: "❓" },
  { label: "Team", href: "/admin/team", icon: "👥" },
  { label: "Settings", href: "/admin/settings", icon: "🔧" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <aside
        className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}
        data-sidebar
      >
        {/* Logo area */}
        <div className="sidebar-header">
          <Link href="/admin" className="sidebar-logo">
            <span className="sidebar-logo-icon">N</span>
            {!collapsed && <span className="sidebar-logo-text">NeoKlyn CMS</span>}
          </Link>
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${isActive(item.href) ? "active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link href="/" className="sidebar-nav-item" target="_blank">
            <span className="sidebar-nav-icon">🌐</span>
            {!collapsed && <span className="sidebar-nav-label">View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="admin-mobile-nav">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-item ${isActive(item.href) ? "active" : ""}`}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
