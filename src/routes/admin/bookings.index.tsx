import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type React from "react";
import { Loader2, Trash2, CheckCircle2, XCircle, Clock, CalendarDays, Users, BedDouble, Mail } from "lucide-react";
import { getAllBookings, updateBookingStatus, deleteBooking, type Booking } from "@/services/bookings";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

export const Route = createFileRoute("/admin/bookings/")({
  component: AdminBookings,
});

const STATUS_STYLES: Record<Booking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const STATUS_ICONS: Record<Booking["status"], React.ReactNode> = {
  Pending: <Clock size={12} />,
  Confirmed: <CheckCircle2 size={12} />,
  Cancelled: <XCircle size={12} />,
};

function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getAllBookings(filterStatus || undefined)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const flash = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3500);
  };

  const handleStatusChange = async (booking: Booking, status: Booking["status"]) => {
    setUpdatingId(booking.id);
    try {
      await updateBookingStatus(booking.id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status } : b))
      );
      flash(`Booking #${booking.id} marked as ${status}`);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteBooking(deleteTarget.id);
      flash(`Booking #${deleteTarget.id} deleted`);
      setDeleteTarget(null);
      load();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Booking Requests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and manage all incoming tour booking submissions.
          </p>
        </div>

        {/* Status filter */}
        <select
          id="bk-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Flash message */}
      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <p>No booking requests found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-start"
            >
              {/* Left: meta */}
              <div className="min-w-0 flex-1 grid gap-1.5">
                {/* Name + badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground truncate">
                    {b.full_name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[b.status]}`}
                  >
                    {STATUS_ICONS[b.status]}
                    {b.status}
                  </span>
                  <span className="text-xs text-muted-foreground">#{b.id}</span>
                </div>

                {/* Phone */}
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  📞{" "}
                  <a
                    href={`tel:${b.phone_number}`}
                    className="font-semibold text-foreground hover:underline"
                  >
                    {b.phone_number}
                  </a>
                </p>
                {b.email && (
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail size={14} className="shrink-0" />{" "}
                    <a
                      href={`mailto:${b.email}`}
                      className="font-semibold text-foreground hover:underline truncate"
                    >
                      {b.email}
                    </a>
                  </p>
                )}

                {/* Tour */}
                {b.selected_tour && (
                  <p className="text-sm text-muted-foreground truncate">
                    🗺️ <span className="text-foreground">{b.selected_tour}</span>
                  </p>
                )}

                {/* Stats row */}
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(b.travel_date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={12} />
                    {b.adults} adults{b.kids > 0 ? `, ${b.kids} kids` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BedDouble size={12} />
                    {b.room_type}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    🕒 {formatDate(b.created_at)}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {/* Status selector */}
                <select
                  value={b.status}
                  disabled={updatingId === b.id}
                  onChange={(e) =>
                    handleStatusChange(b, e.target.value as Booking["status"])
                  }
                  className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
                  aria-label={`Status for booking ${b.id}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {updatingId === b.id && (
                  <Loader2 size={16} className="animate-spin text-primary" />
                )}

                <button
                  onClick={() => setDeleteTarget(b)}
                  title="Delete booking"
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
        title={deleteTarget ? `Booking #${deleteTarget.id} — ${deleteTarget.full_name}` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </div>
  );
}
