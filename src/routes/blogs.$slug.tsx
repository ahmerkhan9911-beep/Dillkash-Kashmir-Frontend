import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft, Calendar, User } from "lucide-react";
import { api } from "@/services/api";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ loaderData }: any) => ({
    meta: [
      { title: loaderData?.title ? `${loaderData.title} — DillKash Kashmir` : "Blog — DillKash Kashmir" },
      { name: "description", content: loaderData?.title || "Read our latest blog post." },
    ],
  }),
  loader: async ({ params: { slug } }) => {
    // Optionally fetch here for SSR, but we'll stick to client side query for simplicity if SSR isn't strict for this page
    return { slug };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const router = useRouter();

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

  return (
    <article className="pb-24 pt-32">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-4 text-sm font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-primary" />
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-primary" />
            {blog.author}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-5xl md:leading-tight">
          {blog.title}
        </h1>
      </header>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-soft">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <div
          className="prose prose-lg max-w-none text-foreground prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        <div className="mt-16 border-t border-border pt-8 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary/80"
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
