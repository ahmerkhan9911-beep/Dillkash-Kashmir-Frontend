import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, CalendarDays, Users, BedDouble, MapPin, Car, Hotel } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getMyBookings, type Booking } from "@/services/bookings";
import { getMyCustomTours, type CustomTourRequest } from "@/services/custom-tours";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-bookings")({
  beforeLoad: ({ context, location }) => {
    // Auth guard: if not authenticated, redirect to login
    // We can't access `isAuthenticated` directly from context here because context wasn't explicitly provided with it.
    // However, AuthContext provides user state. For simplicity, we check in the component, but we can also do a basic check here if we had access to the store.
  },
  head: () => ({
    meta: [
      { title: "My Bookings — DillKash Kashmir" },
      { name: "description", content: "Track your tour booking and custom tour request statuses." },
    ],
  }),
  component: MyBookingsPage,
});

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Rejected: "bg-rose-100 text-rose-700",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Pending: <Clock size={14} />,
  Confirmed: <CheckCircle size={14} />,
  Approved: <CheckCircle size={14} />,
  Cancelled: <XCircle size={14} />,
  Rejected: <XCircle size={14} />,
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Flexible Dates";
  return new Date(dateStr).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MyBookingsPage() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"bookings" | "custom">("bookings");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customTours, setCustomTours] = useState<CustomTourRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    try {
      const [bData, cData] = await Promise.all([
        getMyBookings(),
        getMyCustomTours(),
      ]);
      setBookings(bData);
      setCustomTours(cData);
    } catch (err) {
      console.error("Failed to fetch user requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Login Required</h1>
          <p className="mt-2 text-sm text-muted-foreground">Please sign in to view your bookings.</p>
          <Link
            to="/login"
            search={{ redirect: "/my-bookings" }}
            className="mt-6 inline-flex rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            align="left"
            title={`Welcome back, ${user?.full_name?.split(" ")[0]}!`}
            subtitle="Track your upcoming tours and custom requests in real-time."
          />
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex gap-2 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className={cn(
                "rounded-xl px-5 py-2.5 text-sm font-bold transition-all",
                activeTab === "bookings"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-secondary"
              )}
            >
              Tour Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={cn(
                "rounded-xl px-5 py-2.5 text-sm font-bold transition-all",
                activeTab === "custom"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-secondary"
              )}
            >
              Custom Requests ({customTours.length})
            </button>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.2}>
          <div className="mt-6">
            {loading ? (
              <div className="py-20 text-center">
                <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading your trips...</p>
              </div>
            ) : (
              <>
                {activeTab === "bookings" && (
                  <div className="grid gap-4">
                    {bookings.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
                        <p className="text-sm font-semibold text-muted-foreground">No bookings found.</p>
                        <Link to="/packages" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
                          Browse our packages
                        </Link>
                      </div>
                    ) : (
                      bookings.map((b) => (
                        <div key={b.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center">
                          <div className="flex-1 grid gap-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-heading text-lg font-bold text-foreground">
                                {b.selected_tour}
                              </h3>
                              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", STATUS_STYLES[b.status])}>
                                {STATUS_ICONS[b.status]}
                                {b.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5"><CalendarDays size={16} /> {formatDate(b.travel_date)}</span>
                              <span className="inline-flex items-center gap-1.5"><Users size={16} /> Total Persons: {b.persons}</span>
                              <span className="inline-flex items-center gap-1.5"><BedDouble size={16} /> {b.room_type}</span>
                            </div>
                          </div>
                          <div className="text-right sm:shrink-0">
                            <p className="text-xs text-muted-foreground">Booked on {new Date(b.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "custom" && (
                  <div className="grid gap-4">
                    {customTours.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
                        <p className="text-sm font-semibold text-muted-foreground">No custom tour requests found.</p>
                        <Link to="/custom-tour" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
                          Plan a custom tour
                        </Link>
                      </div>
                    ) : (
                      customTours.map((req) => (
                        <div key={req.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start">
                          <div className="flex-1 grid gap-3">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                              <h3 className="font-heading text-lg font-bold text-foreground">
                                Custom Itinerary Request
                              </h3>
                              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", STATUS_STYLES[req.status])}>
                                {STATUS_ICONS[req.status]}
                                {req.status}
                              </span>
                            </div>
                            
                            <div className="grid gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
                              <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> {formatDate(req.preferred_date)}</span>
                              <span className="inline-flex items-center gap-2"><Users size={16} className="text-primary" /> Total Persons: {req.persons}</span>
                              <span className="inline-flex items-center gap-2"><Hotel size={16} className="text-primary" /> {req.hotel_preference || "Any Hotel"}</span>
                              <span className="inline-flex items-center gap-2"><Car size={16} className="text-primary" /> {req.transport_preference || "Any Transport"}</span>
                            </div>

                            <div className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                              <span className="leading-snug">
                                {Array.isArray(req.preferred_destinations) && req.preferred_destinations.length > 0
                                  ? req.preferred_destinations.join(", ")
                                  : "No specific destinations"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right sm:shrink-0">
                            <p className="text-xs text-muted-foreground">Requested on {new Date(req.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
