import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — DillKash Kashmir" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert size={32} />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground">Access Denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access the admin area.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 pt-16 sm:px-6 lg:pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
