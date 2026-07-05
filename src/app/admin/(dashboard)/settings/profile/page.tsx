"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

type Profile = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const { addToast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ user }) => {
        setProfile(user);
        setName(user.name || "");
        setBio(user.bio || "");
        setAvatar(user.avatar || "");
      })
      .catch(() => addToast("Failed to load profile", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProfile() {
    if (!name.trim()) {
      addToast("Name is required", "warning");
      return;
    }
    setSavingProfile(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), bio: bio || null, avatar: avatar || null }),
      });
      if (!res.ok) throw new Error();
      addToast("Profile updated", "success");
    } catch {
      addToast("Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      addToast("New passwords don't match", "warning");
      return;
    }
    if (newPassword.length < 8) {
      addToast("New password must be at least 8 characters", "warning");
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Password change failed");
      addToast("Password changed successfully", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Password change failed", "error");
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Profile</h1>
          <p className="admin-page-subtitle">
            {profile ? `${profile.email} · ${profile.role}` : "Loading…"}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", maxWidth: 900 }}>
        {/* Profile details */}
        <div className="pe-panel">
          <h3 className="pe-panel-title">Profile Details</h3>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea className="form-textarea" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short author bio shown on blog posts…" />
          </div>
          <div className="form-group">
            <label className="form-label">Avatar URL</label>
            <input className="form-input" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://… or /uploads/…" />
          </div>
          <button className="btn btn-primary" disabled={savingProfile} onClick={saveProfile}>
            {savingProfile ? "Saving…" : "Save Profile"}
          </button>
        </div>

        {/* Change password */}
        <div className="pe-panel">
          <h3 className="pe-panel-title">Change Password</h3>
          <div className="form-group">
            <label className="form-label">Current password</label>
            <input type="password" className="form-input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <div className="form-group">
            <label className="form-label">New password (min 8 characters)</label>
            <input type="password" className="form-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm new password</label>
            <input type="password" className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <button
            className="btn btn-primary"
            disabled={changingPassword || !currentPassword || !newPassword}
            onClick={changePassword}
          >
            {changingPassword ? "Changing…" : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
