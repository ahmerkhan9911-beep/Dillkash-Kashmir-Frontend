import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { HotelForm, type HotelFormData } from "@/components/admin/HotelForm";
import { getHotelById, updateHotel } from "@/services/hotels";
import type { Hotel } from "@/data/hotels";

export const Route = createFileRoute("/admin/hotels/$id/edit")({
  component: EditHotelPage,
});

function EditHotelPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getHotelById(Number(id))
      .then((h) => {
        if (!h) setError("Hotel not found");
        else setHotel(h);
      })
      .catch(() => setError("Failed to load hotel"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: HotelFormData) => {
    await updateHotel(Number(id), data);
    navigate({ to: "/admin/hotels" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
        <p>{error || "Hotel not found"}</p>
        <button
          onClick={() => navigate({ to: "/admin/hotels" })}
          className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Back to Hotels
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Edit Hotel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editing: <strong>{hotel.name}</strong>
        </p>
      </div>
      <HotelForm
        initial={{
          name: hotel.name,
          location: hotel.location,
          starRating: hotel.starRating,
          pricePerNight: hotel.pricePerNight,
          description: hotel.description,
          images: hotel.images,
          amenities: hotel.amenities,
          is_active: hotel.is_active,
          featured: hotel.featured,
        }}
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/admin/hotels" })}
        submitLabel="Update Hotel"
      />
    </div>
  );
}
