import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PackageForm, type PackageFormData } from "@/components/admin/PackageForm";
import { getPackageForEdit, updatePackage } from "@/services/packages";

export const Route = createFileRoute("/admin/packages/$id/edit")({
  component: EditPackagePage,
});

function EditPackagePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState<Partial<PackageFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const pkgId = parseInt(id, 10);
    if (isNaN(pkgId)) {
      setError("Invalid package ID");
      setLoading(false);
      return;
    }

    getPackageForEdit(pkgId)
      .then((pkg) => {
        // Map API data to form shape
        setInitial({
          title: pkg.title,
          slug: pkg.slug,
          short_description: pkg.short_description || "",
          full_description: pkg.full_description || "",
          duration_days: pkg.duration_days,
          package_type: pkg.package_type || "",
          price: Number(pkg.price),
          rating: Number(pkg.rating),
          reviews_count: pkg.reviews_count,
          image_url: pkg.image_url || "",
          departure_city: pkg.departure_city || "Lahore",
          departure_day: pkg.departure_day || "",
          transport: pkg.transport || "",
          accommodation: pkg.accommodation || "",
          meals: pkg.meals || "",
          featured: !!pkg.featured,
          is_active: pkg.is_active !== undefined ? !!pkg.is_active : true,
          next_departure: pkg.next_departure || "",
          destinations: pkg.destinations?.length ? pkg.destinations : [""],
          itinerary: pkg.itinerary?.length
            ? pkg.itinerary.map((d) => ({
                day: d.day,
                title: d.title,
                details: d.details?.length ? d.details : [""],
              }))
            : [{ day: 1, title: "", details: [""] }],
          included: pkg.included?.length ? pkg.included : [""],
          notIncluded: pkg.notIncluded?.length ? pkg.notIncluded : [""],
          gallery: pkg.gallery?.length ? pkg.gallery : [""],
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: PackageFormData) => {
    await updatePackage(parseInt(id, 10), data as any);
    navigate({ to: "/admin/packages" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center">
        <p className="text-sm font-medium text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Edit Package
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update tour package details.
        </p>
      </div>
      {initial && <PackageForm initial={initial} onSubmit={handleSubmit} submitLabel="Update Package" />}
    </div>
  );
}
