import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Loader2 } from "lucide-react";
import { getAllPackagesAdmin, deletePackage as deletePkg, togglePackageStatus } from "@/services/packages";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { formatPKR, type Tour } from "@/data/site";

export const Route = createFileRoute("/admin/packages/")({
  component: AdminPackages,
});

type AdminTour = Tour & { id: number; is_active: boolean; created_at: string };

function AdminPackages() {
  const [packages, setPackages] = useState<AdminTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<AdminTour | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    getAllPackagesAdmin()
      .then(setPackages)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deletePkg(deleteTarget.id);
      setMessage(`"${deleteTarget.title}" deleted successfully`);
      setDeleteTarget(null);
      load();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (pkg: AdminTour) => {
    try {
      await togglePackageStatus(pkg.id);
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
            Tour Packages
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all DillKash Kashmir tour packages.
          </p>
        </div>
        <Link
          to="/admin/packages/create"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus size={18} /> Create Package
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
      ) : packages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <p>No packages yet. Create your first tour package!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
            >
              {/* Image */}
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                {pkg.image && (
                  <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-heading text-base font-bold text-foreground">
                    {pkg.title}
                  </h3>
                  {pkg.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      <Star size={10} /> Featured
                    </span>
                  )}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    pkg.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {pkg.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>{pkg.durationDays} Days</span>
                  <span>{formatPKR(pkg.price)}</span>
                  <span>★ {pkg.rating}</span>
                  <span>{pkg.type?.join(", ")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => handleToggle(pkg)}
                  title={pkg.is_active ? "Deactivate" : "Activate"}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                >
                  {pkg.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <Link
                  to="/admin/packages/$id/edit"
                  params={{ id: String(pkg.id) }}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(pkg)}
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
        title={deleteTarget?.title || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </div>
  );
}
