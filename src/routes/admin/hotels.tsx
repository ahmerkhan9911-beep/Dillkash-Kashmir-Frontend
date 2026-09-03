import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/hotels")({
  component: AdminHotelsLayout,
});

function AdminHotelsLayout() {
  return <Outlet />;
}
