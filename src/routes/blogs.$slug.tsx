import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft, Calendar, User, Images, ZoomIn, X } from "lucide-react";
import { api } from "@/services/api";
import { resolveImageUrl } from "@/lib/resolveImage";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ loaderData }: any) => ({
    meta: [
      { title: loaderData?.title ? `${loaderData.title} — DillKash Kashmir` : "Blog — DillKash Kashmir" },
      { name: "description", content: loaderData?.title || "Read our latest blog post." },
    ],
  }),
  loader: async ({ params: { slug } }) => {
    return { slug };
  },
  component: BlogPostPage,
});

/**
 * Safely coerce the gallery field into a string[].
 * Handles:
 *   - Already-parsed array of strings (e.g. ["photo1.jpg", ...])
 *   - Array of objects (e.g. [{ url: "photo1.jpg" }, ...])
 *   - JSON string (e.g. '["photo1.jpg"]')
 *   - Comma-separated list or single filename/URL
 *   - null / undefined
 */
function parseGallery(raw: unknown): string[] {
  if (!raw) return [];
  let items: unknown[] = [];

  if (Array.isArray(raw)) {
    items = raw;
  } else if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      let parsed = JSON.parse(trimmed);
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // keep parsed as string
        }
      }
      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (typeof parsed === "string" && parsed.trim()) {
        items = [parsed.trim()];
      }
    } catch {
      items = trimmed.includes(",")
        ? trimmed.split(",").map((s) => s.trim())
        : [trimmed];
    }
  }

  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        return (
          (item as any).url ||
          (item as any).image_url ||
          (item as any).src ||
          (item as any).image ||
          ""
        );
      }
      return "";
    })
    .filter(Boolean);
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["public-blog", slug],
    queryFn: () => api(`/blogs/${slug}`),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-foreground">Blog Post Not Found</h1>
        <p className="mt-4 text-muted-foreground">The article you are looking for does not exist.</p>
        <button
          onClick={() => router.history.back()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const gallery = parseGallery((blog as any)?.gallery);

  return (
    <article className="pb-24 pt-32">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-4 text-sm font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-primary" />
            {new Date((blog as any).created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-primary" />
            {(blog as any).author}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-5xl md:leading-tight">
          {(blog as any).title}
        </h1>
      </header>

      {/* Cover Image */}
      {(blog as any).cover_image && (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-soft">
            <img
              src={resolveImageUrl((blog as any).cover_image)}
              alt={(blog as any).title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <div
          className="prose prose-lg max-w-none text-foreground prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: (blog as any).content }}
        />

        {/* ── Gallery Grid ─────────────────────────────────────────── */}
        {gallery && gallery.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Images size={18} className="text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">More Photos</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {gallery.map((imageName: string, index: number) => {
                const src = resolveImageUrl(imageName);
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(src)}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted shadow-soft ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-hover hover:ring-primary/40"
                  >
                    <img
                      src={src}
                      alt={`${(blog as any).title || "Blog photo"} - Photo ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* subtle dark overlay & zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <ZoomIn size={18} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary/80"
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage}
            alt="Full Preview"
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}


