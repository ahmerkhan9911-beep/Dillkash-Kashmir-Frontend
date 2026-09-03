import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HotelForm, type HotelFormData } from "@/components/admin/HotelForm";
import { createHotel } from "@/services/hotels";

export const Route = createFileRoute("/admin/hotels/create")({
  component: CreateHotelPage,
});

function CreateHotelPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: HotelFormData) => {
    await createHotel(data as any);
    navigate({ to: "/admin/hotels" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Add New Hotel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new hotel to DillKash Kashmir.
        </p>
      </div>
      <HotelForm
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/admin/hotels" })}
        submitLabel="Create Hotel"
      />
    </div>
  );
}
