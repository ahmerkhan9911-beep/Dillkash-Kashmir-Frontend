import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminCustomTours, updateCustomTourStatus, CustomTourRequest, deleteCustomTour } from "@/services/custom-tours";
import { MapPin, Calendar, Users, Hotel, Car, CheckCircle, XCircle, Trash2, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/custom-tours/")({
  component: AdminCustomTours,
});

function AdminCustomTours() {
  const [requests, setRequests] = useState<CustomTourRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getAdminCustomTours(filter !== "All" ? filter : undefined);
      setRequests(data.requests);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleStatusChange = async (id: number, status: "Pending" | "Approved" | "Rejected") => {
    try {
      await updateCustomTourStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteCustomTour(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete request");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Custom Tour Requests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and respond to user-submitted custom itineraries.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 rounded-xl border border-border bg-card p-1">
          {["All", "Pending", "Approved", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-sm font-semibold text-muted-foreground">No requests found for this filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {requests.map((req) => (
            <div key={req.id} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-md">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{req.name}</h3>
                  <div className="mt-1 flex flex-col gap-0.5">
                    <a href={`tel:${req.phone_number}`} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      📞 {req.phone_number}
                    </a>
                    {req.email && (
                      <a href={`mailto:${req.email}`} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                        <Mail size={14} />
                        {req.email}
                      </a>
                    )}
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                  req.status === "Pending" && "bg-orange-100 text-orange-700",
                  req.status === "Approved" && "bg-emerald-100 text-emerald-700",
                  req.status === "Rejected" && "bg-rose-100 text-rose-700"
                )}>
                  {req.status === "Pending" && <Clock size={12} />}
                  {req.status === "Approved" && <CheckCircle size={12} />}
                  {req.status === "Rejected" && <XCircle size={12} />}
                  {req.status}
                </div>
              </div>

              {/* Details grid */}
              <div className="mb-5 grid gap-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {req.preferred_date ? new Date(req.preferred_date).toLocaleDateString() : "Flexible Dates"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {req.adults} Adults, {req.kids} Kids
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Hotel size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {req.hotel_preference || "Any Hotel"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Car size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {req.transport_preference || "Any Transport"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {Array.isArray(req.preferred_destinations) && req.preferred_destinations.length > 0
                      ? req.preferred_destinations.join(", ")
                      : "No specific destinations"}
                  </span>
                </div>
              </div>

              {/* Message block */}
              {req.message && (
                <div className="mb-6 rounded-xl bg-secondary/50 p-4 text-sm italic text-muted-foreground">
                  "{req.message}"
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex items-center gap-2 border-t border-border pt-4">
                <div className="flex flex-1 gap-2">
                  <button
                    onClick={() => handleStatusChange(req.id, "Approved")}
                    disabled={req.status === "Approved"}
                    className="flex-1 rounded-xl bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(req.id, "Rejected")}
                    disabled={req.status === "Rejected"}
                    className="flex-1 rounded-xl bg-rose-50 py-2.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(req.id)}
                  title="Delete request"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
