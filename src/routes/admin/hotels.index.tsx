import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Loader2,
  MapPin,
  Hotel,
} from "lucide-react";
import {
  getAllHotelsAdmin,
  deleteHotel as deleteHotelApi,
  toggleHotelStatus,
} from "@/services/hotels";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { formatPKR } from "@/data/site";
import type { Hotel as HotelType } from "@/data/hotels";

export const Route = createFileRoute("/admin/hotels/")({
  component: AdminHotels,
});

function AdminHotels() {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<HotelType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    getAllHotelsAdmin()
      .then(setHotels)
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
      await deleteHotelApi(deleteTarget.id);
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

  const handleToggle = async (hotel: HotelType) => {
    try {
      await toggleHotelStatus(hotel.id);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Hotels
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage standalone hotel listings for DillKash Kashmir.
          </p>
        </div>
        <Link
          to="/admin/hotels/create"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus size={18} /> Add New Hotel
        </Link>
      </div>

      {/* ── Success message ── */}
      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted">
            <Hotel size={24} className="text-muted-foreground" />
          </div>
          <p className="font-heading text-base font-bold text-foreground">
            No hotels yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first hotel to get started.
          </p>
          <Link
            to="/admin/hotels/create"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
          >
            <Plus size={16} /> Add Hotel
          </Link>
        </div>
      ) : (
        /* ── Hotel List ── */
        <div className="grid gap-4">
          {/* Desktop table header */}
          <div className="hidden rounded-xl bg-muted/50 px-4 py-2.5 md:grid md:grid-cols-[80px_1fr_120px_100px_100px_100px_120px] md:items-center md:gap-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Image
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Hotel
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Location
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Rating
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Price/Night
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Status
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right">
              Actions
            </span>
          </div>

          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center md:grid md:grid-cols-[80px_1fr_120px_100px_100px_100px_120px] md:gap-4 md:p-3"
            >
              {/* Thumbnail */}
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                {hotel.images[0] && (
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Name */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-heading text-sm font-bold text-foreground">
                  {hotel.name}
                </h3>
                {hotel.featured && (
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    <Star size={10} className="fill-amber-500" /> Featured
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground md:text-sm">
                <MapPin size={13} className="shrink-0 text-primary sm:hidden md:block" />
                <span className="truncate">{hotel.location}</span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.starRating }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-foreground">
                {formatPKR(hotel.pricePerNight)}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    hotel.is_active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {hotel.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center justify-end gap-2">
                <button
                  onClick={() => handleToggle(hotel)}
                  title={hotel.is_active ? "Deactivate" : "Activate"}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                >
                  {hotel.is_active ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
                <Link
                  to="/admin/hotels/$id/edit"
                  params={{ id: String(hotel.id) }}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(hotel)}
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

      {/* ── Delete Dialog ── */}
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
