"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function TopBar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Admin Panel</h2>
      </div>

      <div className="topbar-right">
        {/* User menu */}
        <div className="topbar-user" ref={menuRef}>
          <button
            className="topbar-user-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <span className="topbar-avatar">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
            <span className="topbar-username">{session?.user?.name || "Admin"}</span>
            <span className="topbar-chevron">{menuOpen ? "▴" : "▾"}</span>
          </button>

          {menuOpen && (
            <div className="topbar-dropdown">
              <div className="topbar-dropdown-header">
                <span className="topbar-dropdown-name">{session?.user?.name}</span>
                <span className="topbar-dropdown-email">{session?.user?.email}</span>
              </div>
              <div className="topbar-dropdown-divider" />
              <a href="/admin/settings/profile" className="topbar-dropdown-item">
                Profile Settings
              </a>
              <button className="topbar-dropdown-item danger" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
