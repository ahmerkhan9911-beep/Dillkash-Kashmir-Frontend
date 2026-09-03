import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  DestinationForm,
  type DestinationFormData,
} from "@/components/admin/DestinationForm";
import {
  getDestinationForEdit,
  updateDestination,
} from "@/services/destinations";

export const Route = createFileRoute("/admin/destinations/$id/edit")({
  component: EditDestinationPage,
});

function EditDestinationPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState<Partial<DestinationFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const destId = parseInt(id, 10);
    if (isNaN(destId)) {
      setError("Invalid destination ID");
      setLoading(false);
      return;
    }

    getDestinationForEdit(destId)
      .then((dest) => {
        setInitial({
          name: dest.name,
          slug: dest.slug,
          description: dest.description || "",
          cover_image: dest.cover_image || "",
          gallery: dest.gallery?.length ? dest.gallery : [],
          sort_order: dest.sort_order || 0,
          is_active: dest.is_active !== undefined ? !!dest.is_active : true,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load destination"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: DestinationFormData) => {
    await updateDestination(parseInt(id, 10), data);
    navigate({ to: "/admin/destinations" });
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
          Edit Destination
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update destination card and photo gallery.
        </p>
      </div>
      {initial && (
        <DestinationForm
          initial={initial}
          onSubmit={handleSubmit}
          submitLabel="Update Destination"
        />
      )}
    </div>
  );
}
