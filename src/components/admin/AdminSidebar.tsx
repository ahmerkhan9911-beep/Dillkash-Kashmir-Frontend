import { Link, useRouter } from "@tanstack/react-router";
import {
  Package,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Menu,
  MapPin,
  Hotel,
  UserCheck,
  FileText,
  CalendarCheck,
} from "lucide-react";
import logoHorizontal from "@/assets/dillkash-logo-horizontal.png";
import logoIcon from "@/assets/dillkash-logo-icon.png";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getAdminStats } from "@/services/packages";

const POLL_MS = 30_000;

const NAV_LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, badge: false },
  { to: "/admin/packages", label: "Packages", icon: Package, exact: false, badge: false },
  { to: "/admin/hotels", label: "Hotels", icon: Hotel, exact: false, badge: false },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin, exact: false, badge: false },
  { to: "/admin/guides", label: "Tour Guides", icon: UserCheck, exact: false, badge: false, badgeCount: 0 },
  { to: "/admin/blogs", label: "Blogs & Updates", icon: FileText, exact: false, badge: false, badgeCount: 0 },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck, exact: false, badge: true, badgeType: "pendingBookings" },
  { to: "/admin/custom-tours", label: "Custom Requests", icon: MapPin, exact: false, badge: true, badgeType: "pendingCustomTours" },
] as const;

export function AdminSidebar() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [pendingCustomTours, setPendingCustomTours] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll pending counts every 30 s
  const fetchPending = async () => {
    try {
      const data = await getAdminStats();
      setPendingBookings(data.pendingBookings ?? 0);
      setPendingCustomTours(data.pendingCustomTours ?? 0);
    } catch {
      // Silent — don't disrupt UI if stats fail
    }
  };

  useEffect(() => {
    fetchPending();
    timerRef.current = setInterval(fetchPending, POLL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  const currentPath = router.state.location.pathname;

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-5">
        {collapsed ? (
          <img src={logoIcon} alt="DillKash" className="h-9 w-auto" />
        ) : (
          <div className="flex items-center rounded-xl bg-white/90 px-3 py-1.5 shadow-sm">
            <img src={logoHorizontal} alt="DillKash Kashmir" className="h-9 w-auto object-contain" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden rounded-lg p-1.5 text-muted-foreground hover:bg-secondary lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={18} className={cn("transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
        {NAV_LINKS.map((l) => {
          const isActive = l.exact
            ? currentPath === l.to
            : currentPath.startsWith(l.to);

          const badgeCount = l.badgeType === "pendingBookings" ? pendingBookings : l.badgeType === "pendingCustomTours" ? pendingCustomTours : 0;
          const showBadge = l.badge && badgeCount > 0;

          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {/* Icon — with pulsing dot when there are pending bookings */}
              <span className="relative shrink-0">
                <l.icon size={20} />
                {showBadge && collapsed && (
                  <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-orange-500">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  </span>
                )}
              </span>

              {/* Label + badge (only when sidebar is expanded) */}
              {!collapsed && (
                <span className="flex flex-1 items-center justify-between">
                  {l.label}
                  {showBadge && (
                    <span
                      className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white shadow-sm"
                      aria-label={`${badgeCount} pending`}
                    >
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-border px-3 py-4">
        {!collapsed && user && (
          <div className="mb-3 px-4">
            <p className="truncate text-sm font-semibold text-foreground">{user.full_name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
        <Link
          to="/"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary"
        >
          <ChevronLeft size={20} />
          {!collapsed && <span>Back to Website</span>}
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-xl bg-card text-foreground shadow-soft lg:hidden"
        aria-label="Toggle admin menu"
      >
        <Menu size={20} />
        {/* Mobile badge dot */}
        {(pendingBookings > 0 || pendingCustomTours > 0) && (
          <span className="absolute right-1.5 top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-orange-500">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
