import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/packages")({
  component: AdminPackagesLayout,
});

function AdminPackagesLayout() {
  return <Outlet />;
}
