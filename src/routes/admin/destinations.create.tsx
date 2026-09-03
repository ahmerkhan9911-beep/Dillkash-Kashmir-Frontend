import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  DestinationForm,
  type DestinationFormData,
} from "@/components/admin/DestinationForm";
import { createDestination } from "@/services/destinations";

export const Route = createFileRoute("/admin/destinations/create")({
  component: CreateDestinationPage,
});

function CreateDestinationPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: DestinationFormData) => {
    await createDestination(data);
    navigate({ to: "/admin/destinations" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Create Destination
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new destination card and its photo gallery to DillKash Kashmir.
        </p>
      </div>
      <DestinationForm onSubmit={handleSubmit} submitLabel="Create Destination" />
    </div>
  );
}
