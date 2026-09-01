import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PackageForm, type PackageFormData } from "@/components/admin/PackageForm";
import { createPackage } from "@/services/packages";

export const Route = createFileRoute("/admin/packages/create")({
  component: CreatePackagePage,
});

function CreatePackagePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: PackageFormData) => {
    await createPackage(data as any);
    navigate({ to: "/admin/packages" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Create Package
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new tour package to DillKash Kashmir.
        </p>
      </div>
      <PackageForm onSubmit={handleSubmit} submitLabel="Create Package" />
    </div>
  );
}
