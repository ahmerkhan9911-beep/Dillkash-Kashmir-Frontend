import { useState, useCallback } from "react";
import { Loader2, Save, X, Star, Plus, Trash2, BedDouble, Shield, FileText } from "lucide-react";
import { GalleryUploader } from "./GalleryUploader";
import { HOTEL_LOCATIONS, HOTEL_AMENITIES, type Hotel, type Room } from "@/data/hotels";

/* ─────────────────────── Types ─────────────────────── */

export interface RoomFormData {
  id?: number;
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
  availableRooms: number;
}

export interface HotelFormData {
  name: string;
  location: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  pricePerNight: number;
  description: string;
  images: string[];
  amenities: string[];
  is_active: boolean;
  featured: boolean;
  checkInTime?: string | undefined;
  checkOutTime?: string | undefined;
  cancellationPolicy?: string | undefined;
  houseRules?: string | undefined;
  rooms: RoomFormData[];
}

const emptyForm: HotelFormData = {
  name: "",
  location: "",
  starRating: 3,
  pricePerNight: 0,
  description: "",
  images: [],
  amenities: [],
  is_active: true,
  featured: false,
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  cancellationPolicy: "Free cancellation up to 48 hours before check-in. Non-refundable after that.",
  houseRules: "• Valid CNIC/Passport required at check-in\n• No smoking inside rooms\n• Quiet hours after 10:00 PM",
  rooms: [
    { roomType: "Standard", pricePerNight: 8000, maxGuests: 2, availableRooms: 5 },
    { roomType: "Deluxe", pricePerNight: 14000, maxGuests: 3, availableRooms: 3 },
  ],
};

interface HotelFormProps {
  initial?: Partial<HotelFormData>;
  onSubmit: (data: HotelFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

/* ─────────────────────── Component ─────────────────── */

export function HotelForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save Hotel",
}: HotelFormProps) {
  const [form, setForm] = useState<HotelFormData>({
    ...emptyForm,
    ...initial,
    starRating: (initial?.starRating ?? 3) as 1 | 2 | 3 | 4 | 5,
    rooms: initial?.rooms && initial.rooms.length > 0 ? initial.rooms : emptyForm.rooms,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleUploadingChange = useCallback((uploading: boolean) => {
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
  }, []);

  const set = <K extends keyof HotelFormData>(key: K, value: HotelFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAmenity = (amenity: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a) => a !== amenity)
        : [...f.amenities, amenity],
    }));
  };

  /* ── Room Helpers ── */
  const addRoom = () => {
    setForm((f) => ({
      ...f,
      rooms: [
        ...f.rooms,
        {
          roomType: "Suite",
          pricePerNight: f.pricePerNight || 15000,
          maxGuests: 4,
          availableRooms: 2,
        },
      ],
    }));
  };

  const removeRoom = (index: number) => {
    setForm((f) => ({
      ...f,
      rooms: f.rooms.filter((_, idx) => idx !== index),
    }));
  };

  const updateRoom = (index: number, patch: Partial<RoomFormData>) => {
    setForm((f) => ({
      ...f,
      rooms: f.rooms.map((r, idx) => (idx === index ? { ...r, ...patch } : r)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Hotel name is required");
    if (!form.location) return setError("Please select a location");
    if (form.pricePerNight <= 0) return setError("Base price must be greater than 0");
    if (!form.description.trim()) return setError("Description is required");

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
  const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </div>
      )}

      {/* ── Section: Basic Info ── */}
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-foreground">Basic Information</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="hotel-name" className={labelCls}>
              Hotel Name
            </label>
            <input
              id="hotel-name"
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Pearl Continental Muzaffarabad"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="hotel-location" className={labelCls}>
              Location / City
            </label>
            <select
              id="hotel-location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputCls}
            >
              <option value="">Select location...</option>
              {HOTEL_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="hotel-stars" className={labelCls}>
              Star Rating
            </label>
            <div className="flex items-center gap-3">
              <select
                id="hotel-stars"
                value={form.starRating}
                onChange={(e) => set("starRating", Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                className={inputCls + " max-w-[140px]"}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i <= form.starRating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }
                  />
                ))}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="hotel-price" className={labelCls}>
              Base Price Per Night (PKR)
            </label>
            <input
              id="hotel-price"
              type="number"
              min={0}
              value={form.pricePerNight || ""}
              onChange={(e) => set("pricePerNight", e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              placeholder="e.g. 15000"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="hotel-desc" className={labelCls}>
            Description
          </label>
          <textarea
            id="hotel-desc"
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the hotel, its unique features, location highlights..."
            className={inputCls + " resize-y"}
          />
        </div>
      </div>

      {/* ── Section: Rooms & Inventory ── */}
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
              <BedDouble size={20} className="text-primary" />
              Room Types & Pricing
            </h2>
            <p className="text-xs text-muted-foreground">
              Configure room options for guests to select on the hotel detail page.
            </p>
          </div>
          <button
            type="button"
            onClick={addRoom}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
          >
            <Plus size={15} />
            Add Room
          </button>
        </div>

        <div className="space-y-3">
          {form.rooms.map((room, idx) => (
            <div
              key={idx}
              className="grid gap-3 rounded-xl border border-border bg-secondary/30 p-4 sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto] sm:items-center"
            >
              <div>
                <label className="mb-1 block text-[11px] font-bold text-muted-foreground uppercase">
                  Room Type
                </label>
                <input
                  type="text"
                  value={room.roomType}
                  onChange={(e) => updateRoom(idx, { roomType: e.target.value })}
                  placeholder="e.g. Deluxe Room"
                  className={inputCls + " py-2 text-xs"}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-bold text-muted-foreground uppercase">
                  Price / Night (PKR)
                </label>
                <input
                  type="number"
                  min={0}
                  value={room.pricePerNight || ""}
                  onChange={(e) =>
                    updateRoom(idx, {
                      pricePerNight: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  className={inputCls + " py-2 text-xs"}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-bold text-muted-foreground uppercase">
                  Max Guests
                </label>
                <input
                  type="number"
                  min={1}
                  value={room.maxGuests || 2}
                  onChange={(e) =>
                    updateRoom(idx, { maxGuests: Math.max(1, Number(e.target.value)) })
                  }
                  className={inputCls + " py-2 text-xs"}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-bold text-muted-foreground uppercase">
                  Available Rooms
                </label>
                <input
                  type="number"
                  min={1}
                  value={room.availableRooms || 1}
                  onChange={(e) =>
                    updateRoom(idx, { availableRooms: Math.max(1, Number(e.target.value)) })
                  }
                  className={inputCls + " py-2 text-xs"}
                />
              </div>
              <div className="flex items-end justify-end pt-5 sm:pt-0">
                <button
                  type="button"
                  onClick={() => removeRoom(idx)}
                  className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                  title="Remove Room"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {form.rooms.length === 0 && (
            <p className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-xl">
              No specific rooms added. The base price per night will be used as standard.
            </p>
          )}
        </div>
      </div>

      {/* ── Section: Check-In/Out & Policies ── */}
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          <Shield size={20} className="text-primary" />
          Policies & Timings
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="check-in-time" className={labelCls}>
              Check-In Time
            </label>
            <input
              id="check-in-time"
              type="text"
              value={form.checkInTime}
              onChange={(e) => set("checkInTime", e.target.value)}
              placeholder="e.g. 2:00 PM"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="check-out-time" className={labelCls}>
              Check-Out Time
            </label>
            <input
              id="check-out-time"
              type="text"
              value={form.checkOutTime}
              onChange={(e) => set("checkOutTime", e.target.value)}
              placeholder="e.g. 12:00 PM"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cancellation-policy" className={labelCls}>
            Cancellation Policy
          </label>
          <textarea
            id="cancellation-policy"
            rows={2}
            value={form.cancellationPolicy}
            onChange={(e) => set("cancellationPolicy", e.target.value)}
            placeholder="Cancellation conditions, refund timeline..."
            className={inputCls + " resize-y"}
          />
        </div>

        <div>
          <label htmlFor="house-rules" className={labelCls}>
            House Rules
          </label>
          <textarea
            id="house-rules"
            rows={3}
            value={form.houseRules}
            onChange={(e) => set("houseRules", e.target.value)}
            placeholder="Guest guidelines, ID requirements, restrictions..."
            className={inputCls + " resize-y"}
          />
        </div>
      </div>

      {/* ── Section: Media & Amenities ── */}
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-foreground">Media & Amenities</h2>

        {/* Images */}
        <div>
          <label className={labelCls}>Hotel Images (Gallery)</label>
          <GalleryUploader
            value={form.images}
            onChange={(imgs) => set("images", imgs)}
            onUploadingChange={handleUploadingChange}
          />
        </div>

        {/* Amenities */}
        <div>
          <label className={labelCls}>Amenities</label>
          <div className="flex flex-wrap gap-2">
            {HOTEL_AMENITIES.map((amenity) => {
              const checked = form.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    checked
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 place-items-center rounded border text-[10px] ${
                      checked
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-background"
                    }`}
                  >
                    {checked && "✓"}
                  </span>
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section: Visibility ── */}
      <div className="flex flex-wrap gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          Active (visible on website)
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          Featured Hotel
        </label>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={loading || uploadingCount > 0}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {loading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <X size={18} />
            Cancel
          </button>
        )}
        {uploadingCount > 0 && (
          <span className="text-xs text-muted-foreground">
            Uploading {uploadingCount} image{uploadingCount > 1 ? "s" : ""}…
          </span>
        )}
      </div>
    </form>
  );
}
