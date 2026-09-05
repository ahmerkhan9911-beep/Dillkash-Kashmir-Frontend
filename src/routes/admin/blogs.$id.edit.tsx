import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Loader2, Save, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import "react-quill-new/dist/quill.snow.css";

export const Route = createFileRoute("/admin/blogs/$id/edit")({
  component: EditBlogPage,
});

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
  const [QuillEditor, setQuillEditor] = useState<any>(null);

  useEffect(() => {
    import("react-quill-new").then((module) => {
      setQuillEditor(() => module.default || module);
    });
  }, []);

  const { data: blogs, isLoading: fetching } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => api("/blogs"),
  });

  useEffect(() => {
    if (blogs) {
      const blog = blogs.find((b: any) => b.id.toString() === id);
      if (blog) {
        setTitle(blog.title);
        setSlug(blog.slug);
        setAuthor(blog.author);
        setContent(blog.content);
        setCoverImage(blog.cover_image || "");
      }
    }
  }, [blogs, id]);

  const handleUploadingChange = useCallback((uploading: boolean) => {
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      await api(`/api/blogs/${id}`, {
        method: "PUT",
        body: {
          title,
          slug,
          author,
          content,
          cover_image: coverImage,
        },
      });
      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      navigate({ to: "/admin/blogs" });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to update blog.");
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
            ) : uploadingCount > 0 ? (
              <Upload size={18} className="animate-bounce" />
            ) : (
              <Save size={18} />
            )}
            {loading
              ? "Saving..."
              : uploadingCount > 0
                ? `Uploading (${uploadingCount})…`
                : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
