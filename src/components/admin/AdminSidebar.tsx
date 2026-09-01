import { Link, useRouter } from "@tanstack/react-router";
import { BarChart3, Package, LayoutDashboard, LogOut, ChevronLeft, Menu } from "lucide-react";
import logoHorizontal from "@/assets/dillkash-logo-horizontal.png";
import logoIcon from "@/assets/dillkash-logo-icon.png";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/packages", label: "Packages", icon: Package, exact: false },
] as const;

export function AdminSidebar() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {links.map((l) => {
          const isActive = l.exact
            ? currentPath === l.to
            : currentPath.startsWith(l.to);
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
              <l.icon size={20} />
              {!collapsed && <span>{l.label}</span>}
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
