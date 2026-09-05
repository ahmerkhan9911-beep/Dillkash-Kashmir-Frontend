import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { Reveal } from "@/components/site/Reveal";
import { images } from "@/data/site";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs & Updates — DillKash Kashmir" },
      { name: "description", content: "Read the latest news, travel guides, and updates from DillKash Kashmir." },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: () => api("/blogs"),
  });

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={images.rattiGali}
          alt="Kashmir"
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl">
            Blogs & Updates
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            Discover travel tips, destination guides, and the latest news from DillKash Kashmir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : !blogs || blogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
            No blog posts available at the moment. Please check back later!
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any, i: number) => (
              <Reveal key={blog.id} delay={(i % 3) * 70}>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-hover"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {blog.cover_image ? (
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      <span>By {blog.author}</span>
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                      {blog.title}
                    </h3>
                    {/* We can extract plain text from HTML content for a snippet, but for now we'll just show a generic Read More */}
                    <p className="mt-4 text-sm font-bold text-primary group-hover:underline">
                      Read Article &rarr;
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
