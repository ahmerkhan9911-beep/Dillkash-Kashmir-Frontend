import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Images } from "lucide-react";
import {
  getAllDestinationsAdmin,
  deleteDestination as deleteDest,
  toggleDestinationStatus,
  type DestinationItem,
} from "@/services/destinations";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

export const Route = createFileRoute("/admin/destinations/")({
  component: AdminDestinations,
});

function AdminDestinations() {
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<DestinationItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    getAllDestinationsAdmin()
      .then(setDestinations)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteDest(deleteTarget.id);
      setMessage(`"${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      load();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (dest: DestinationItem) => {
    try {
      await toggleDestinationStatus(dest.id);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Destinations & Galleries
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage Kashmir destination cards and their interactive photo galleries.
          </p>
        </div>
        <Link
          to="/admin/destinations/create"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus size={18} /> Create Destination
        </Link>
      </div>

      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : destinations.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <p>No destinations found. Create your first destination!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
            >
              {/* Cover Image */}
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                {dest.cover_image && (
                  <img
                    src={dest.cover_image}
                    alt={dest.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-heading text-base font-bold text-foreground">
                    {dest.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      dest.is_active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dest.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    <Images size={10} /> {dest.gallery?.length || 1} Photos
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {dest.description || "No description"}
                </p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Slug: {dest.slug}</span>
                  <span>Order: {dest.sort_order}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => handleToggle(dest)}
                  title={dest.is_active ? "Deactivate" : "Activate"}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                >
                  {dest.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <Link
                  to="/admin/destinations/$id/edit"
                  params={{ id: String(dest.id) }}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(dest)}
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deleteTarget}
        title={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </div>
  );
}
