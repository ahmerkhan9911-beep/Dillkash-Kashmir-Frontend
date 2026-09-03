import { useState, useCallback } from "react";
import { Loader2, Save, X, Star } from "lucide-react";
import { GalleryUploader } from "./GalleryUploader";
import { HOTEL_LOCATIONS, HOTEL_AMENITIES, type Hotel } from "@/data/hotels";

/* ─────────────────────── Types ─────────────────────── */

export interface HotelFormData {
  name: string;
  location: string;
  starRating: number;
  pricePerNight: number;
  description: string;
  images: string[];
  amenities: string[];
  is_active: boolean;
  featured: boolean;
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
  const [form, setForm] = useState<HotelFormData>({ ...emptyForm, ...initial });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Hotel name is required");
    if (!form.location) return setError("Please select a location");
    if (form.pricePerNight <= 0) return setError("Price must be greater than 0");
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
    <form onSubmit={handleSubmit} className="grid gap-6">
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </div>
      )}

      {/* ── Row 1: Name + Location ── */}
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

      {/* ── Row 2: Star Rating + Price ── */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="hotel-stars" className={labelCls}>
            Star Rating
          </label>
          <div className="flex items-center gap-3">
            <select
              id="hotel-stars"
              value={form.starRating}
              onChange={(e) => set("starRating", Number(e.target.value))}
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
            Price Per Night (PKR)
          </label>
          <input
            id="hotel-price"
            type="number"
            min={0}
            value={form.pricePerNight || ""}
            onChange={(e) => set("pricePerNight", Number(e.target.value))}
            placeholder="e.g. 15000"
            className={inputCls}
          />
        </div>
      </div>

      {/* ── Description ── */}
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

      {/* ── Images ── */}
      <div>
        <label className={labelCls}>Hotel Images</label>
        <GalleryUploader
          value={form.images}
          onChange={(imgs) => set("images", imgs)}
          onUploadingChange={handleUploadingChange}
        />
      </div>

      {/* ── Amenities ── */}
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

      {/* ── Toggles ── */}
      <div className="flex flex-wrap gap-6">
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
