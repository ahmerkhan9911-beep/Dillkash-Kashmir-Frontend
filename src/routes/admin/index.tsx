import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, Users, Star, Activity } from "lucide-react";
import { getAdminStats } from "@/services/packages";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activePackages: 0,
    featuredPackages: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Packages", value: stats.totalPackages, icon: Package, color: "bg-primary/10 text-primary" },
    { label: "Active Packages", value: stats.activePackages, icon: Activity, color: "bg-emerald-100 text-emerald-700" },
    { label: "Featured Packages", value: stats.featuredPackages, icon: Star, color: "bg-amber-100 text-amber-700" },
    { label: "Registered Users", value: stats.totalUsers, icon: Users, color: "bg-sky-100 text-sky-700" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your DillKash Kashmir tour packages and users.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${card.color}`}>
                <card.icon size={24} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {card.label}
                </p>
                <p className="font-heading text-2xl font-extrabold text-foreground">
                  {loading ? "—" : card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
