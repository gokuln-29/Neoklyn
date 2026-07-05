"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/admin/Toast";
import Badge from "@/components/admin/Badge";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  publicId?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText?: string;
  folder: string;
  createdAt: string;
}

const folders = ["general", "blogs", "services", "case-studies", "testimonials", "team"];

export default function MediaLibraryPage() {
  const { addToast } = useToast();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("general");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [altText, setAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedFolder) params.append("folder", selectedFolder);
      if (search) params.append("search", search);
      if (filterType !== "all") params.append("type", filterType);

      const res = await fetch(`/api/admin/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      } else {
        addToast("Failed to fetch media assets", "error");
      }
    } catch {
      addToast("Failed to fetch media assets", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [selectedFolder, filterType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", selectedFolder);
      formData.append("altText", altText);

      try {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          successCount++;
        } else {
          const err = await res.json();
          addToast(`Upload failed for ${file.name}: ${err.error}`, "error");
        }
      } catch {
        addToast(`Upload failed for ${file.name}`, "error");
      }
    }

    if (successCount > 0) {
      addToast(`Successfully uploaded ${successCount} asset(s)`, "success");
      setAltText("");
      fetchMedia();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        addToast("Media asset deleted", "success");
        setMediaList((prev) => prev.filter((item) => item.id !== id));
      } else {
        addToast("Failed to delete media asset", "error");
      }
    } catch {
      addToast("Failed to delete media asset", "error");
    }
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    addToast("Copied URL to clipboard!", "success");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Library</h1>
          <p className="admin-page-subtitle">Upload, search, and manage your website assets</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "24px",
          marginTop: "16px",
        }}
      >
        {/* Sidebar Folder Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--admin-text-muted)",
              marginBottom: "8px",
            }}
          >
            Folders
          </h3>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className="btn btn-ghost"
              style={{
                justifyContent: "flex-start",
                padding: "8px 12px",
                fontSize: "13px",
                background: selectedFolder === folder ? "var(--admin-accent-glow)" : "transparent",
                borderColor: selectedFolder === folder ? "var(--admin-accent)" : "var(--admin-border)",
                color: selectedFolder === folder ? "var(--admin-accent)" : "var(--admin-text)",
              }}
            >
              📁 {folder.charAt(0).toUpperCase() + folder.slice(1)}
            </button>
          ))}
        </div>

        {/* Media Grid & Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Drag & Drop Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragActive ? "var(--admin-accent)" : "var(--admin-border)"}`,
              borderRadius: "var(--admin-radius)",
              background: dragActive ? "rgba(6, 182, 212, 0.05)" : "var(--admin-surface)",
              padding: "32px 24px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              position: "relative",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
            />
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>
              {uploading ? "⏳" : "📤"}
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
              {uploading ? "Uploading assets..." : "Drag & drop files here to upload"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--admin-text-muted)", marginBottom: "16px" }}>
              or click to browse from computer (supports WebP, PNG, JPG, MP4, PDF)
            </p>

            <div
              style={{
                maxWidth: "320px",
                margin: "0 auto",
                display: "flex",
                gap: "8px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Alt Text / Description (optional)"
                className="form-input"
                style={{ padding: "8px 12px", fontSize: "13px" }}
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
            </div>
          </div>

          {/* Filtering and Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "8px", flex: 1 }}>
              <input
                type="text"
                placeholder="Search files..."
                className="form-input"
                style={{ maxWidth: "300px", padding: "8px 12px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-ghost btn-sm">
                Search
              </button>
            </form>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                className="form-select"
                style={{ padding: "8px 12px", fontSize: "13px" }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
              </select>

              <button
                className={`btn btn-ghost btn-sm ${viewMode === "grid" ? "btn-primary" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`btn btn-ghost btn-sm ${viewMode === "list" ? "btn-primary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>

          {/* Media Items Container */}
          {loading ? (
            <div className="empty-state">
              <div className="login-spinner" />
              <p style={{ marginTop: "12px" }}>Loading assets...</p>
            </div>
          ) : mediaList.length === 0 ? (
            <div className="empty-state" style={{ background: "var(--admin-surface)" }}>
              <div className="empty-state-icon">🖼️</div>
              <h3 className="empty-state-title">No assets found</h3>
              <p className="empty-state-text">
                This folder is empty or matches no search results. Upload some files to start.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "var(--admin-surface)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "var(--admin-radius-sm)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "120px",
                      background: "rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {item.mimeType.startsWith("image/") ? (
                      <img
                        src={item.url}
                        alt={item.altText || item.filename}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : item.mimeType.startsWith("video/") ? (
                      <span style={{ fontSize: "28px" }}>🎥</span>
                    ) : (
                      <span style={{ fontSize: "28px" }}>📄</span>
                    )}
                  </div>
                  <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={item.filename}
                    >
                      {item.filename}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--admin-text-muted)" }}>
                      {formatBytes(item.size)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "8px",
                      }}
                    >
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "4px 8px", fontSize: "11px" }}
                        onClick={() => copyUrlToClipboard(item.url)}
                      >
                        Copy URL
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ padding: "4px 8px", fontSize: "11px", background: "rgba(239,68,68,0.1)", color: "var(--admin-red)" }}
                        onClick={() => handleDelete(item.id, item.filename)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Uploaded</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaList.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: "60px" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "4px",
                            background: "rgba(0,0,0,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          {item.mimeType.startsWith("image/") ? (
                            <img
                              src={item.url}
                              alt={item.altText || item.filename}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <span>📄</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="table-title">{item.filename}</div>
                        <div style={{ fontSize: "11px", color: "var(--admin-text-muted)" }}>
                          {item.altText || "No alt text"}
                        </div>
                      </td>
                      <td className="table-meta">{formatBytes(item.size)}</td>
                      <td className="table-meta">
                        <Badge label={item.mimeType.split("/")[1]?.toUpperCase() || "FILE"} />
                      </td>
                      <td className="table-meta">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => copyUrlToClipboard(item.url)}
                          >
                            Copy URL
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ background: "rgba(239,68,68,0.1)", color: "var(--admin-red)" }}
                            onClick={() => handleDelete(item.id, item.filename)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
