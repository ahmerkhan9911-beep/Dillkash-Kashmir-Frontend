import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services/api";

export const Route = createFileRoute("/admin/blogs/")({
  component: AdminBlogsIndex,
});

function AdminBlogsIndex() {
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => api("/blogs"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api(`/blogs/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast.success("Blog post deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to delete blog post");
    },
  });

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Blogs & Updates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your articles and news updates.
          </p>
        </div>
        <Link
          to="/admin/blogs/create"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus size={18} />
          <span>New Blog</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid h-40 place-items-center rounded-2xl border border-dashed border-border bg-card">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      ) : !blogs || blogs.length === 0 ? (
        <div className="grid h-40 place-items-center rounded-2xl border border-dashed border-border bg-card">
          <div className="text-center">
            <p className="text-muted-foreground">No blog posts found.</p>
            <Link
              to="/admin/blogs/create"
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Create your first post
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Author</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-right font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogs.map((blog: any) => (
                  <tr key={blog.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{blog.title}</p>
                      <p className="text-xs text-muted-foreground">/{blog.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blogs/${blog.slug}`}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          title="View on site"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          to="/admin/blogs/$id/edit"
                          params={{ id: blog.id.toString() }}
                          className="rounded-lg p-2 text-primary hover:bg-primary/10"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="rounded-lg p-2 text-destructive hover:bg-destructive/10"
                          title="Delete"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
