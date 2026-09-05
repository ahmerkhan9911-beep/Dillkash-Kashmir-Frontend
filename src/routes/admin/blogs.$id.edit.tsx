import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Loader2, Save, ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import "react-quill-new/dist/quill.snow.css";

export const Route = createFileRoute("/admin/blogs/$id/edit")({
  component: EditBlogPage,
});

/**
 * Safely parse gallery data from any format (JSON string, array of strings/objects, comma-separated list).
 */
function parseGallery(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          return (
            (item as any).url ||
            (item as any).image_url ||
            (item as any).src ||
            (item as any).image ||
            ""
          ).trim();
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      let parsed = JSON.parse(trimmed);
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // ignore
        }
      }
      if (Array.isArray(parsed)) {
        return parseGallery(parsed);
      }
      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim()];
      }
    } catch {
      return trimmed.includes(",")
        ? trimmed.split(",").map((s) => s.trim()).filter(Boolean)
        : [trimmed];
    }
  }
  return [];
}

/**
 * Resolve existing image filename/URL from DB to full preview URL.
 * Uses import.meta.env.VITE_API_URL + '/uploads/' + imageName.
 */
function getExistingImageUrl(imageName: string): string {
  if (!imageName) return "";
  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://") ||
    imageName.startsWith("blob:") ||
    imageName.startsWith("data:")
  ) {
    return imageName;
  }
  const rawApiUrl =
    typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"]
      ? String(import.meta.env["VITE_API_URL"]).trim().replace(/\/+$/, "")
      : "https://api.dillkashkashmir.com";
  const base = rawApiUrl.replace(/\/api$/, "");

  const clean = imageName.trim().replace(/^\/+/, "");
  if (clean.startsWith("uploads/")) {
    return `${base}/${clean}`;
  }
  return `${base}/uploads/${clean}`;
}

function EditBlogPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Existing gallery images saved in DB (string filenames/paths)
  const [existingGallery, setExistingGallery] = useState<string[]>([]);

  // Newly added files (JS File objects)
  const [newFiles, setNewFiles] = useState<File[]>([]);
  // Local blob previews for newly selected files
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [QuillEditor, setQuillEditor] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    import("react-quill-new").then((module) => {
      setQuillEditor(() => module.default || module);
    });
  }, []);

  // Clean up blob URLs for new previews on unmount
  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  const { data: blogs, isLoading: fetching } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => api<any[]>("/blogs"),
  });

  // Populate form state when blogs data is loaded
  useEffect(() => {
    if (blogs && Array.isArray(blogs)) {
      const blog = blogs.find((b: any) => b.id.toString() === id);
      if (blog) {
        setTitle(blog.title || "");
        setSlug(blog.slug || "");
        setAuthor(blog.author || "Admin");
        setCoverImage(blog.cover_image || "");

        // 1. Properly parse and extract gallery array into state
        const parsed = parseGallery(blog.gallery);
        setExistingGallery(parsed);

        // 2. Fetch full blog details by slug if content is missing from list query
        if (blog.content) {
          setContent(blog.content);
        } else if (blog.slug) {
          api<any>(`/blogs/${blog.slug}`)
            .then((fullPost) => {
              if (fullPost) {
                if (fullPost.content) setContent(fullPost.content);
                if (fullPost.gallery) {
                  const fullG = parseGallery(fullPost.gallery);
                  if (fullG.length > 0) setExistingGallery(fullG);
                }
              }
            })
            .catch(console.error);
        }
      }
    }
  }, [blogs, id]);

  const handleUploadingChange = useCallback((uploading: boolean) => {
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
  }, []);

  // Handle selecting new image files
  const handleNewFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    const validFiles: File[] = [];
    for (const f of fileList) {
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)) {
        toast.error(`"${f.name}" is not an allowed image format (JPG, PNG, WebP only).`);
        continue;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`"${f.name}" exceeds the 5 MB limit.`);
        continue;
      }
      validFiles.push(f);
    }

    if (validFiles.length === 0) return;

    const previews = validFiles.map((f) => URL.createObjectURL(f));
    setNewFiles((prev) => [...prev, ...validFiles]);
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  // Remove an existing gallery image from DB list
  const handleRemoveExisting = (indexToRemove: number) => {
    setExistingGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Remove a newly selected file before saving
  const handleRemoveNewFile = (indexToRemove: number) => {
    const previewToRevoke = newPreviews[indexToRemove];
    if (previewToRevoke) URL.revokeObjectURL(previewToRevoke);

    setNewFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setNewPreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("author", author);
      formData.append("content", content);
      formData.append("cover_image", coverImage);

      // Existing filenames sent back to server as a stringified array
      formData.append("existing_gallery", JSON.stringify(existingGallery));
      formData.append("gallery", JSON.stringify(existingGallery));

      // Append only the new File objects under the gallery key
      newFiles.forEach((file) => {
        formData.append("gallery", file);
      });

      await api(`/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["public-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["public-blog", slug] });
      navigate({ to: "/admin/blogs" });
    } catch (err: any) {
      toast.error(err.message || "Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring";
  const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
  ];

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const totalPhotosCount = existingGallery.length + newFiles.length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2">
            <Link
              to="/admin/blogs"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} /> Back to Blogs
            </Link>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Edit Blog Post
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8">
        <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <legend className="px-2 font-heading text-base font-bold text-foreground">
            Post Details
          </legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls}>Post Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>URL Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploader
                label="Cover Image"
                value={coverImage}
                onChange={(url) => setCoverImage(url)}
                onUploadingChange={handleUploadingChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Gallery Images Section */}
        <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <legend className="px-2 font-heading text-base font-bold text-foreground">
                Gallery Images
              </legend>
              <p className="px-2 mt-0.5 text-xs text-muted-foreground">
                Manage photos displayed in the gallery grid for this post.
              </p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {totalPhotosCount} photo{totalPhotosCount === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mt-4 space-y-5">
            {/* 1. Existing Gallery Images (from Database) */}
            {existingGallery.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Current Images in Database ({existingGallery.length})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {existingGallery.map((imageName, index) => {
                    const src = getExistingImageUrl(imageName);
                    return (
                      <div
                        key={`existing-${index}-${imageName}`}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted shadow-sm"
                      >
                        <img
                          src={src}
                          alt={`Gallery photo ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).style.opacity = "0.5";
                          }}
                        />
                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                          Saved
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExisting(index)}
                          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/90 text-destructive-foreground opacity-90 shadow-md backdrop-blur-sm transition-all hover:opacity-100 hover:scale-110 active:scale-95"
                          title="Remove this photo from blog"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Newly Added Files (Pending upload on save) */}
            {newFiles.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    New Photos to Add ({newFiles.length})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {newPreviews.map((previewUrl, index) => (
                    <div
                      key={`new-${index}-${previewUrl}`}
                      className="group relative aspect-square overflow-hidden rounded-xl border-2 border-primary/40 bg-muted shadow-sm"
                    >
                      <img
                        src={previewUrl}
                        alt={`New upload ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1.5 left-1.5 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground shadow">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewFile(index)}
                        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/90 text-destructive-foreground opacity-90 shadow-md backdrop-blur-sm transition-all hover:opacity-100 hover:scale-110 active:scale-95"
                        title="Remove new file"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Add Photos Dropzone / Picker */}
            <div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                className="flex min-h-[5.5rem] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/20 px-4 py-4 transition-colors hover:border-primary/60 hover:bg-primary/5 outline-none"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <ImagePlus size={18} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground">
                  {totalPhotosCount > 0 ? "+ Add More Photos" : "Click to browse or add photos"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  JPG, PNG, WebP (up to 5 MB each)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleNewFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <legend className="px-2 font-heading text-base font-bold text-foreground">
            Content *
          </legend>
          <div className="mt-2 text-foreground min-h-[300px]">
            {QuillEditor ? (
              <QuillEditor
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="bg-background"
              />
            ) : (
              <div className="flex h-40 items-center justify-center border border-dashed border-border bg-muted/30">
                <Loader2 className="animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || uploadingCount > 0}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Saving..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

