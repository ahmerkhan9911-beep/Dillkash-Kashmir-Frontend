import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type React from "react";
import {
  Loader2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarDays,
  Users,
  Mail,
  Phone,
  Building,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  getAllHotelBookings,
  updateHotelBookingStatus,
  deleteHotelBooking,
  type HotelBooking,
} from "@/services/hotels";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

export const Route = createFileRoute("/admin/hotel-bookings/")({
  component: AdminHotelBookings,
});

const STATUS_STYLES: Record<HotelBooking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-rose-400",
};

const STATUS_ICONS: Record<HotelBooking["status"], React.ReactNode> = {
  Pending: <Clock size={12} />,
  Confirmed: <CheckCircle2 size={12} />,
  Cancelled: <XCircle size={12} />,
};

function cleanPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "92" + cleaned.slice(1);
  }
  return cleaned;
}

function AdminHotelBookings() {
  const [bookings, setBookings] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<HotelBooking | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getAllHotelBookings(filterStatus || undefined)
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

  const handleStatusChange = async (booking: HotelBooking, status: HotelBooking["status"]) => {
    setUpdatingId(booking.id);
    try {
      await updateHotelBookingStatus(booking.id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status } : b))
      );
      flash(`Inquiry #${booking.id} marked as ${status}`);
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
      await deleteHotelBooking(deleteTarget.id);
      flash(`Inquiry #${deleteTarget.id} deleted`);
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

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Hotel Inquiries & Leads
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review room availability requests and follow up with guests and hotels directly via WhatsApp/Call.
          </p>
        </div>
      </div>

      {/* Flash message */}
      {message && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          {message}
        </div>
      )}

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { label: "All Leads", value: "", count: bookings.length },
          { label: "Pending", value: "Pending", count: pendingCount },
          { label: "Confirmed", value: "Confirmed", count: confirmedCount },
          { label: "Cancelled", value: "Cancelled", count: cancelledCount },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilterStatus(tab.value)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              filterStatus === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                filterStatus === tab.value
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table / List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <Building size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-base font-semibold">No hotel inquiries found</p>
          <p className="mt-1 text-xs">
            {filterStatus
              ? `No inquiries match the "${filterStatus}" status filter.`
              : "No guest has submitted a room availability inquiry yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5">Guest & Contact</th>
                  <th className="px-5 py-3.5">Requested Hotel</th>
                  <th className="px-5 py-3.5">Expected Dates</th>
                  <th className="px-5 py-3.5">Guests</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Follow Up / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => {
                  const waNumber = cleanPhoneForWhatsApp(booking.guest_phone);
                  const waText = encodeURIComponent(
                    `Hi ${booking.guest_name}, this is DillKash Kashmir regarding your room availability request for ${booking.hotel_name || "Hotel"}.`
                  );
                  const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : "";

                  return (
                    <tr key={booking.id} className="transition-colors hover:bg-muted/20">
                      {/* Guest details */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-foreground">{booking.guest_name}</div>
                        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${booking.guest_phone}`}
                              className="inline-flex items-center gap-1 hover:text-foreground font-medium"
                            >
                              <Phone size={12} className="shrink-0 text-primary" />
                              {booking.guest_phone}
                            </a>
                            {waUrl && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 hover:bg-emerald-500/20"
                                title="Open WhatsApp Chat"
                              >
                                <MessageCircle size={10} /> WhatsApp
                              </a>
                            )}
                          </div>
                          {booking.guest_email && (
                            <a
                              href={`mailto:${booking.guest_email}`}
                              className="inline-flex items-center gap-1 hover:text-foreground"
                            >
                              <Mail size={12} className="shrink-0 text-primary" />
                              {booking.guest_email}
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Hotel */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Building size={14} className="text-primary shrink-0" />
                          {booking.hotel_name || `Hotel #${booking.hotel_id}`}
                        </div>
                        {booking.hotel_location && (
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={11} className="shrink-0 text-muted-foreground" />
                            {booking.hotel_location}
                          </div>
                        )}
                      </td>

                      {/* Dates */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 font-medium text-foreground text-xs">
                          <CalendarDays size={14} className="shrink-0 text-primary" />
                          {formatDate(booking.check_in_date)} → {formatDate(booking.check_out_date)}
                        </div>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          Requested on {new Date(booking.created_at).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Guests */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
                          <Users size={12} className="text-primary" />
                          {booking.guests_count} Guest{booking.guests_count > 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            STATUS_STYLES[booking.status]
                          }`}
                        >
                          {STATUS_ICONS[booking.status]}
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg p-1.5 text-emerald-600 transition-colors hover:bg-emerald-500/10 hover:text-emerald-700"
                              title="Chat with Guest on WhatsApp"
                            >
                              <MessageCircle size={16} />
                            </a>
                          )}
                          {booking.status !== "Confirmed" && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => handleStatusChange(booking, "Confirmed")}
                              className="rounded-lg p-1.5 text-emerald-600 transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 disabled:opacity-40"
                              title="Mark as Confirmed"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}
                          {booking.status !== "Cancelled" && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => handleStatusChange(booking, "Cancelled")}
                              className="rounded-lg p-1.5 text-amber-600 transition-colors hover:bg-amber-500/10 hover:text-amber-700 disabled:opacity-40"
                              title="Mark as Cancelled"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(booking)}
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {deleteTarget && (
        <DeleteConfirmDialog
          open={!!deleteTarget}
          title="Delete Hotel Inquiry"
          description={`Are you sure you want to delete inquiry #${deleteTarget.id} from ${deleteTarget.guest_name}? This action cannot be undone.`}
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
