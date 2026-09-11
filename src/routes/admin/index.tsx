import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Package, Users, Star, Activity, CalendarCheck, Bell, RefreshCw } from "lucide-react";
import { getAdminStats } from "@/services/packages";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

interface Stats {
  totalPackages: number;
  activePackages: number;
  featuredPackages: number;
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
}

const POLL_INTERVAL_MS = 30_000; // 30 seconds

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    activePackages: 0,
    featuredPackages: 0,
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStats = async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const data = await getAdminStats();
      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load + 30-second polling
  useEffect(() => {
    fetchStats();
    timerRef.current = setInterval(() => fetchStats(true), POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const cards = [
    {
      label: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Bell,
      color: "bg-orange-100 text-orange-600",
      ring: stats.pendingBookings > 0 ? "ring-2 ring-orange-300/60" : "",
      pulse: stats.pendingBookings > 0,
      link: "/admin/bookings?status=Pending",
      note: stats.pendingBookings > 0 ? "Needs attention" : "All clear",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "bg-violet-100 text-violet-700",
      ring: "",
      pulse: false,
      link: "/admin/bookings",
      note: "All submissions",
    },
    {
      label: "Total Packages",
      value: stats.totalPackages,
      icon: Package,
      color: "bg-primary/10 text-primary",
      ring: "",
      pulse: false,
      link: "/admin/packages",
      note: `${stats.activePackages} active`,
    },
    {
      label: "Active Packages",
      value: stats.activePackages,
      icon: Activity,
      color: "bg-emerald-100 text-emerald-700",
      ring: "",
      pulse: false,
      link: "/admin/packages",
      note: "Published tours",
    },
    {
      label: "Featured Packages",
      value: stats.featuredPackages,
      icon: Star,
      color: "bg-amber-100 text-amber-700",
      ring: "",
      pulse: false,
      link: "/admin/packages",
      note: "Highlighted tours",
    },
    {
      label: "Registered Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-sky-100 text-sky-700",
      ring: "",
      pulse: false,
      link: "#",
      note: "Total accounts",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your DillKash Kashmir tour packages, bookings, and users.
          </p>
        </div>

        {/* Refresh control */}
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
          )}
          <button
            onClick={() => fetchStats()}
            disabled={refreshing}
            title="Refresh stats"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground shadow-soft transition-colors hover:bg-secondary disabled:opacity-60"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Pending bookings alert banner */}
      {!loading && stats.pendingBookings > 0 && (
        <Link
          to="/admin/bookings"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 shadow-soft transition-colors hover:bg-orange-100"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              {stats.pendingBookings > 99 ? "99+" : stats.pendingBookings}
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-orange-800">
              {stats.pendingBookings} pending booking{stats.pendingBookings !== 1 ? "s" : ""} need your attention
            </p>
            <p className="text-xs text-orange-600">
              Click to review and confirm — auto-refreshes every 30s
            </p>
          </div>
          <span className="ml-auto text-xs font-semibold text-orange-600">Review →</span>
        </Link>
      )}

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link as "/admin/bookings"}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md ${card.ring}`}
          >
            {/* Pulse ring for pending bookings */}
            {card.pulse && (
              <span className="absolute right-4 top-4 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500" />
              </span>
            )}

            <div className="flex items-center gap-4">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${card.color}`}>
                <card.icon size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {card.label}
                </p>
                <p className="font-heading text-2xl font-extrabold text-foreground">
                  {loading ? "—" : card.value}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{card.note}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
