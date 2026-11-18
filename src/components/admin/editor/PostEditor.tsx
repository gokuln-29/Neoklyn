"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useToast } from "@/components/admin/Toast";
import { generateSlug } from "@/lib/validation";

const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

type Category = { id: string; name: string };
type Tag = { id: string; name: string };

type SeoState = {
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  focusKeyword: string;
  keywords: string[];
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
};

type PostEditorProps = {
  postId?: string; // undefined = new post
};

const EMPTY_SEO: SeoState = {
  seoTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  focusKeyword: "",
  keywords: [],
  robots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "summary_large_image",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function computeSeoChecks(opts: {
  title: string;
  seo: SeoState;
  contentHtml: string;
  slug: string;
}) {
  const text = stripHtml(opts.contentHtml);
  const words = text.split(/\s+/).filter(Boolean);
  const seoTitle = opts.seo.seoTitle || opts.title;
  const kw = opts.seo.focusKeyword.toLowerCase().trim();
  const h1Count = (opts.contentHtml.match(/<h1/g) || []).length;
  const imgTags = opts.contentHtml.match(/<img[^>]*>/g) || [];
  const imgsMissingAlt = imgTags.filter((t) => !/alt="[^"]+"/.test(t)).length;
  const internalLinks = (opts.contentHtml.match(/href="(\/|https?:\/\/(www\.)?neoklyn\.com)/g) || []).length;
  const externalLinks = (opts.contentHtml.match(/href="https?:\/\//g) || []).length - internalLinks;
  const kwCount = kw ? (text.toLowerCase().split(kw).length - 1) : 0;
  const kwDensity = kw && words.length ? (kwCount * kw.split(" ").length * 100) / words.length : 0;

  const checks: { label: string; pass: boolean }[] = [
    { label: `SEO title set (${seoTitle.length}/60 chars)`, pass: seoTitle.length > 0 && seoTitle.length <= 60 },
    { label: `Meta description (${opts.seo.metaDescription.length}/160 chars)`, pass: opts.seo.metaDescription.length >= 50 && opts.seo.metaDescription.length <= 160 },
    { label: "Focus keyword set", pass: kw.length > 0 },
    { label: "Keyword in SEO title", pass: !!kw && seoTitle.toLowerCase().includes(kw) },
    { label: "Keyword in slug", pass: !!kw && opts.slug.includes(kw.replace(/\s+/g, "-")) },
    { label: `Keyword density ${kwDensity.toFixed(1)}% (0.5–2.5%)`, pass: kwDensity >= 0.5 && kwDensity <= 2.5 },
    { label: `Content length ${words.length} words (300+)`, pass: words.length >= 300 },
    { label: "No H1 in body (title is the H1)", pass: h1Count === 0 },
    { label: imgsMissingAlt ? `${imgsMissingAlt} image(s) missing ALT text` : "All images have ALT text", pass: imgsMissingAlt === 0 },
    { label: `Internal links (${internalLinks})`, pass: internalLinks >= 1 },
    { label: `External links (${Math.max(0, externalLinks)})`, pass: externalLinks >= 1 },
  ];

  const score = Math.round((checks.filter((c) => c.pass).length / checks.length) * 100);
  return { checks, score };
}

export default function PostEditor({ postId }: PostEditorProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentId, setCurrentId] = useState(postId || null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [scheduledAt, setScheduledAt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [content, setContent] = useState<object | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [seo, setSeo] = useState<SeoState>(EMPTY_SEO);
  // Rich-text JSON, or raw HTML for drafts created by the automation API (which has no JSON).
  const [initialContent, setInitialContent] = useState<object | string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tagQuery, setTagQuery] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  const [aiBusy, setAiBusy] = useState<string | null>(null);

  const dirtyRef = useRef(false);
  const stateRef = useRef<Record<string, unknown>>({});

  // Load categories
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => (r.ok ? r.json() : { categories: [] }))
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  // Load existing post
  useEffect(() => {
    if (!postId) return;
    fetch(`/api/admin/posts/${postId}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(({ post }) => {
        setTitle(post.title);
        setSlug(post.slug);
        setSlugTouched(true);
        setExcerpt(post.excerpt || "");
        setFeaturedImage(post.featuredImage || "");
        setStatus(post.status);
        setScheduledAt(post.scheduledAt ? post.scheduledAt.slice(0, 16) : "");
        setCategoryId(post.categoryId || "");
        setSelectedTags(post.tags.map((t: { tag: Tag }) => t.tag));
        setContent(post.content);
        setInitialContent(post.content ?? post.contentHtml ?? null);
        setContentHtml(post.contentHtml || "");
        if (post.seoMetadata) {
          setSeo({
            seoTitle: post.seoMetadata.seoTitle || "",
            metaDescription: post.seoMetadata.metaDescription || "",
            canonicalUrl: post.seoMetadata.canonicalUrl || "",
            focusKeyword: post.seoMetadata.focusKeyword || "",
            keywords: post.seoMetadata.keywords || [],
            robots: post.seoMetadata.robots || "index, follow",
            ogTitle: post.seoMetadata.ogTitle || "",
            ogDescription: post.seoMetadata.ogDescription || "",
            ogImage: post.seoMetadata.ogImage || "",
            twitterCard: post.seoMetadata.twitterCard || "summary_large_image",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        addToast("Failed to load post", "error");
        router.push("/admin/posts");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // Auto-generate slug from title until manually edited
  useEffect(() => {
    if (!slugTouched && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugTouched]);

  // Tag autocomplete
  useEffect(() => {
    if (!tagQuery.trim()) {
      setTagSuggestions([]);
      return;
    }
    const t = setTimeout(() => {
      fetch(`/api/admin/tags?search=${encodeURIComponent(tagQuery)}`)
        .then((r) => (r.ok ? r.json() : { tags: [] }))
        .then((d) => setTagSuggestions(
          (d.tags || []).filter((tg: Tag) => !selectedTags.some((s) => s.id === tg.id))
        ))
        .catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [tagQuery, selectedTags]);

  // Track state for autosave
  stateRef.current = { title, slug, excerpt, featuredImage, status, scheduledAt, categoryId, selectedTags, content, contentHtml, seo };

  const buildPayload = useCallback(() => {
    const s = stateRef.current;
    return {
      title: s.title as string,
      slug: s.slug as string,
      excerpt: (s.excerpt as string) || undefined,
      content: s.content || undefined,
      contentHtml: (s.contentHtml as string) || undefined,
      featuredImage: (s.featuredImage as string) || "",
      status: s.status as string,
      scheduledAt: s.scheduledAt ? new Date(s.scheduledAt as string).toISOString() : null,
      categoryId: (s.categoryId as string) || null,
      tagIds: (s.selectedTags as Tag[]).map((t) => t.id),
      seo: s.seo as SeoState,
    };
  }, []);

  const save = useCallback(async (opts?: { silent?: boolean; overrideStatus?: string }) => {
    const s = stateRef.current;
    if (!(s.title as string).trim() || !(s.slug as string).trim()) {
      if (!opts?.silent) addToast("Title and slug are required", "warning");
      return null;
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (opts?.overrideStatus) payload.status = opts.overrideStatus;

      const url = currentId ? `/api/admin/posts/${currentId}` : "/api/admin/posts";
      const method = currentId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Save failed");
      }
      const data = await res.json();
      dirtyRef.current = false;
      setLastSaved(new Date());
      if (!currentId) {
        setCurrentId(data.post.id);
        window.history.replaceState(null, "", `/admin/posts/${data.post.id}`);
      }
      if (opts?.overrideStatus) setStatus(opts.overrideStatus);
      if (!opts?.silent) addToast("Saved", "success");
      return data.post;
    } catch (e) {
      if (!opts?.silent) addToast(e instanceof Error ? e.message : "Save failed", "error");
      return null;
    } finally {
      setSaving(false);
    }
  }, [currentId, buildPayload, addToast]);

  // Autosave every 15s when dirty
  useEffect(() => {
    const interval = setInterval(() => {
      if (dirtyRef.current && !saving) {
        save({ silent: true });
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [save, saving]);

  const markDirty = () => { dirtyRef.current = true; };

  const onEditorChange = useCallback((json: object, html: string) => {
    setContent(json);
    setContentHtml(html);
    dirtyRef.current = true;
  }, []);

  async function handlePublish() {
    const post = await save({ overrideStatus: "PUBLISHED" });
    if (post) addToast("Post published 🎉", "success");
  }

  async function handleSchedule() {
    if (!scheduledAt) {
      addToast("Pick a schedule date first", "warning");
      return;
    }
    const post = await save({ overrideStatus: "SCHEDULED" });
    if (post) addToast("Post scheduled", "success");
  }

  // ─── AI assistant ───────────────────────────────────
  async function runAi(task: string) {
    setAiBusy(task);
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          title,
          contentText: stripHtml(contentHtml).slice(0, 6000),
          focusKeyword: seo.focusKeyword,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "AI request failed");
      const { result } = await res.json();

      if (task === "seo-title") setSeo((s) => ({ ...s, seoTitle: result }));
      else if (task === "meta-description") setSeo((s) => ({ ...s, metaDescription: result }));
      else if (task === "slug") { setSlug(generateSlug(result)); setSlugTouched(true); }
      else if (task === "excerpt") setExcerpt(result);
      else if (task === "tags") {
        const names: string[] = result.split(",").map((x: string) => x.trim()).filter(Boolean).slice(0, 6);
        for (const name of names) {
          const r = await fetch("/api/admin/tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          if (r.ok) {
            const { tag } = await r.json();
            setSelectedTags((prev) => prev.some((t) => t.id === tag.id) ? prev : [...prev, tag]);
          } else if (r.status === 409) {
            const sr = await fetch(`/api/admin/tags?search=${encodeURIComponent(name)}`);
            const sd = await sr.json();
            const found = (sd.tags || []).find((t: Tag) => t.name.toLowerCase() === name.toLowerCase());
            if (found) setSelectedTags((prev) => prev.some((t) => t.id === found.id) ? prev : [...prev, found]);
          }
        }
      }
      markDirty();
      addToast("AI suggestion applied", "success");
    } catch (e) {
      addToast(e instanceof Error ? e.message : "AI request failed", "error");
    } finally {
      setAiBusy(null);
    }
  }

  const seoAnalysis = useMemo(
    () => computeSeoChecks({ title, seo, contentHtml, slug }),
    [title, seo, contentHtml, slug]
  );

  if (loading) {
    return <div className="empty-state"><p className="empty-state-text">Loading post…</p></div>;
  }

  return (
    <div>
      {/* Header bar */}
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/posts" className="btn btn-ghost btn-sm">← Posts</Link>
          <span className="pe-autosave">
            {saving ? "Saving…" : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {currentId && status === "PUBLISHED" && (
            <a href={`/insights/${slug}`} target="_blank" rel="noreferrer" className="btn btn-ghost">Preview ↗</a>
          )}
          <button className="btn btn-ghost" disabled={saving} onClick={() => save()}>
            Save Draft
          </button>
          {status === "PUBLISHED" ? (
            <button className="btn btn-ghost" disabled={saving} onClick={async () => {
              const post = await save({ overrideStatus: "DRAFT" });
              if (post) addToast("Post unpublished", "info");
            }}>
              Unpublish
            </button>
          ) : (
            <button className="btn btn-primary" disabled={saving} onClick={handlePublish}>
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="pe-layout">
        {/* ─── Main column ─── */}
        <div className="pe-main">
          <input
            className="pe-title-input"
            placeholder="Post title…"
            value={title}
            onChange={(e) => { setTitle(e.target.value); markDirty(); }}
          />

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="table-meta">/insights/</span>
            <input
              className="form-input"
              style={{ flex: 1, fontFamily: "monospace", fontSize: 13 }}
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); markDirty(); }}
            />
            <button className="btn btn-ghost btn-sm" disabled={aiBusy !== null} onClick={() => runAi("slug")}>
              {aiBusy === "slug" ? "…" : "✨ AI"}
            </button>
          </div>

          <TiptapEditor content={initialContent} onChange={onEditorChange} />

          <div className="pe-panel">
            <h3 className="pe-panel-title">Excerpt</h3>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Short summary shown in blog cards and search results…"
              value={excerpt}
              onChange={(e) => { setExcerpt(e.target.value); markDirty(); }}
            />
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }} disabled={aiBusy !== null} onClick={() => runAi("excerpt")}>
              {aiBusy === "excerpt" ? "Generating…" : "✨ Generate with AI"}
            </button>
          </div>
        </div>

        {/* ─── Sidebar ─── */}
        <div className="pe-side">
          {/* Status */}
          <div className="pe-panel">
            <h3 className="pe-panel-title">Publish</h3>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={(e) => { setStatus(e.target.value); markDirty(); }}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Schedule for</label>
              <input
                type="datetime-local"
                className="form-input"
                value={scheduledAt}
                onChange={(e) => { setScheduledAt(e.target.value); markDirty(); }}
              />
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }} onClick={handleSchedule}>
                Schedule
              </button>
            </div>
          </div>

          {/* Category & tags */}
          <div className="pe-panel">
            <h3 className="pe-panel-title">Organization</h3>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={categoryId} onChange={(e) => { setCategoryId(e.target.value); markDirty(); }}>
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                className="form-input"
                placeholder="Type to search tags…"
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && tagQuery.trim()) {
                    e.preventDefault();
                    const r = await fetch("/api/admin/tags", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: tagQuery.trim() }),
                    });
                    if (r.ok) {
                      const { tag } = await r.json();
                      setSelectedTags((prev) => [...prev, tag]);
                      setTagQuery("");
                      markDirty();
                    }
                  }
                }}
              />
              {tagSuggestions.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                  {tagSuggestions.map((t) => (
                    <button
                      key={t.id}
                      className="btn btn-ghost btn-sm"
                      onClick={() => { setSelectedTags((prev) => [...prev, t]); setTagQuery(""); markDirty(); }}
                    >
                      + {t.name}
                    </button>
                  ))}
                </div>
              )}
              <div className="pe-tag-row">
                {selectedTags.map((t) => (
                  <span key={t.id} className="pe-tag">
                    {t.name}
                    <button onClick={() => { setSelectedTags((prev) => prev.filter((x) => x.id !== t.id)); markDirty(); }}>×</button>
                  </span>
                ))}
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} disabled={aiBusy !== null || !contentHtml} onClick={() => runAi("tags")}>
                {aiBusy === "tags" ? "Suggesting…" : "✨ Suggest tags"}
              </button>
            </div>
          </div>

          {/* Featured image */}
          <div className="pe-panel">
            <h3 className="pe-panel-title">Featured Image</h3>
            <input
              className="form-input"
              placeholder="https://…"
              value={featuredImage}
              onChange={(e) => { setFeaturedImage(e.target.value); markDirty(); }}
            />
            {featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={featuredImage} alt="Featured preview" style={{ width: "100%", borderRadius: 8, marginTop: 8 }} />
            )}
          </div>

          {/* SEO */}
          <div className="pe-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="pe-panel-title" style={{ margin: 0 }}>SEO</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSeoPanel(!showSeoPanel)}>
                {showSeoPanel ? "Hide" : "Edit"}
              </button>
            </div>

            <div className="seo-score-ring" style={{ marginTop: 10 }}>
              <span
                className="seo-score-value"
                style={{ color: seoAnalysis.score >= 80 ? "#10b981" : seoAnalysis.score >= 50 ? "#f59e0b" : "#ef4444" }}
              >
                {seoAnalysis.score}
              </span>
              <span className="table-meta">SEO score</span>
            </div>

            {seoAnalysis.checks.map((c, i) => (
              <div key={i} className="seo-check">
                <span className={c.pass ? "seo-check-pass" : "seo-check-fail"}>{c.pass ? "✓" : "•"}</span>
                <span>{c.label}</span>
              </div>
            ))}

            {showSeoPanel && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Focus keyword</label>
                  <input className="form-input" value={seo.focusKeyword}
                    onChange={(e) => { setSeo({ ...seo, focusKeyword: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO title <button className="btn btn-ghost btn-sm" disabled={aiBusy !== null} onClick={() => runAi("seo-title")}>{aiBusy === "seo-title" ? "…" : "✨"}</button></label>
                  <input className="form-input" value={seo.seoTitle} maxLength={70}
                    onChange={(e) => { setSeo({ ...seo, seoTitle: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Meta description <button className="btn btn-ghost btn-sm" disabled={aiBusy !== null} onClick={() => runAi("meta-description")}>{aiBusy === "meta-description" ? "…" : "✨"}</button></label>
                  <textarea className="form-textarea" rows={3} value={seo.metaDescription} maxLength={170}
                    onChange={(e) => { setSeo({ ...seo, metaDescription: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Canonical URL</label>
                  <input className="form-input" value={seo.canonicalUrl} placeholder={`https://neoklyn.com/insights/${slug}`}
                    onChange={(e) => { setSeo({ ...seo, canonicalUrl: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Robots</label>
                  <select className="form-select" value={seo.robots}
                    onChange={(e) => { setSeo({ ...seo, robots: e.target.value }); markDirty(); }}>
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">OG title</label>
                  <input className="form-input" value={seo.ogTitle}
                    onChange={(e) => { setSeo({ ...seo, ogTitle: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">OG description</label>
                  <textarea className="form-textarea" rows={2} value={seo.ogDescription}
                    onChange={(e) => { setSeo({ ...seo, ogDescription: e.target.value }); markDirty(); }} />
                </div>
                <div className="form-group">
                  <label className="form-label">OG image URL</label>
                  <input className="form-input" value={seo.ogImage}
                    onChange={(e) => { setSeo({ ...seo, ogImage: e.target.value }); markDirty(); }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
