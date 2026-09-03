import { useState, useCallback } from "react";
import { Plus, Trash2, Loader2, Save, Upload } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { GalleryUploader } from "./GalleryUploader";

export interface PackageFormData {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  duration_days: number;
  package_type: string;
  price: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  departure_city: string;
  departure_day: string;
  transport: string;
  accommodation: string;
  meals: string;
  featured: boolean;
  is_active: boolean;
  next_departure: string;
  destinations: string[];
  itinerary: { day: number; title: string; details: string[] }[];
  included: string[];
  notIncluded: string[];
  gallery: string[];
}

const emptyForm: PackageFormData = {
  title: "", slug: "", short_description: "", full_description: "",
  duration_days: 3, package_type: "Family", price: 0, rating: 0,
  reviews_count: 0, image_url: "", departure_city: "Lahore",
  departure_day: "", transport: "", accommodation: "", meals: "",
  featured: false, is_active: true, next_departure: "",
  destinations: [""], itinerary: [{ day: 1, title: "", details: [""] }],
  included: [""], notIncluded: [""], gallery: [],
};

interface PackageFormProps {
  initial?: Partial<PackageFormData>;
  onSubmit: (data: PackageFormData) => Promise<void>;
  submitLabel?: string;
}

export function PackageForm({ initial, onSubmit, submitLabel = "Save Package" }: PackageFormProps) {
  const [form, setForm] = useState<PackageFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCount, setUploadingCount] = useState(0);

  /** Increment or decrement the in-progress upload counter */
  const handleUploadingChange = useCallback((uploading: boolean) => {
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
  }, []);

  const set = <K extends keyof PackageFormData>(key: K, value: PackageFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Dynamic array helpers
  const addToArray = (key: "destinations" | "included" | "notIncluded" | "gallery") =>
    set(key, [...form[key], ""]);

  const removeFromArray = (key: "destinations" | "included" | "notIncluded" | "gallery", idx: number) =>
    set(key, form[key].filter((_, i) => i !== idx));

  const updateArray = (key: "destinations" | "included" | "notIncluded" | "gallery", idx: number, val: string) =>
    set(key, form[key].map((v, i) => (i === idx ? val : v)));

  // Itinerary helpers
  const addDay = () =>
    set("itinerary", [...form.itinerary, { day: form.itinerary.length + 1, title: "", details: [""] }]);

  const removeDay = (idx: number) =>
    set("itinerary", form.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })));

  const updateDay = (idx: number, key: "title", val: string) =>
    set("itinerary", form.itinerary.map((d, i) => (i === idx ? { ...d, [key]: val } : d)));

  const addDetail = (dayIdx: number) =>
    set("itinerary", form.itinerary.map((d, i) => (i === dayIdx ? { ...d, details: [...d.details, ""] } : d)));

  const removeDetail = (dayIdx: number, detIdx: number) =>
    set("itinerary", form.itinerary.map((d, i) =>
      i === dayIdx ? { ...d, details: d.details.filter((_, j) => j !== detIdx) } : d
    ));

  const updateDetail = (dayIdx: number, detIdx: number, val: string) =>
    set("itinerary", form.itinerary.map((d, i) =>
      i === dayIdx ? { ...d, details: d.details.map((v, j) => (j === detIdx ? val : v)) } : d
    ));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.title.trim()) { setError("Package title is required"); return; }
    if (!form.short_description.trim()) { setError("Short description is required"); return; }
    if (form.duration_days < 1) { setError("Duration must be at least 1 day"); return; }
    if (form.price <= 0) { setError("Price must be greater than 0"); return; }

    // Clean arrays (remove empty strings)
    const cleaned: PackageFormData = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      destinations: form.destinations.filter((d) => d.trim()),
      included: form.included.filter((i) => i.trim()),
      notIncluded: form.notIncluded.filter((n) => n.trim()),
      gallery: form.gallery.filter((g) => g.trim()),
      itinerary: form.itinerary
        .filter((d) => d.title.trim())
        .map((d) => ({ ...d, details: d.details.filter((det) => det.trim()) })),
    };

    setLoading(true);
    try {
      await onSubmit(cleaned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring";
  const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">Basic Information</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Package Title *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="e.g. 5-Day Complete Kashmir Exploration" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>URL Slug</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="auto-generated from title" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Short Description *</label>
            <input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} className={inputCls} placeholder="Brief one-liner" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Full Description</label>
            <textarea value={form.full_description} onChange={(e) => set("full_description", e.target.value)} rows={3} className={inputCls} placeholder="Detailed description" />
          </div>
          <div>
            <label className={labelCls}>Duration (Days) *</label>
            <input type="number" min={1} max={30} value={form.duration_days} onChange={(e) => set("duration_days", Number(e.target.value))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Package Type</label>
            <input value={form.package_type} onChange={(e) => set("package_type", e.target.value)} className={inputCls} placeholder="Family,Couples,Budget" />
          </div>
          <div>
            <label className={labelCls}>Price (PKR) *</label>
            <input type="number" min={0} value={form.price} onChange={(e) => set("price", Number(e.target.value))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Rating</label>
            <input type="number" min={0} max={5} step={0.1} value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Reviews Count</label>
            <input type="number" min={0} value={form.reviews_count} onChange={(e) => set("reviews_count", Number(e.target.value))} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <ImageUploader
              label="Package Thumbnail Image"
              value={form.image_url}
              onChange={(url) => set("image_url", url)}
              onUploadingChange={handleUploadingChange}
            />
          </div>
        </div>
      </fieldset>

      {/* Departure & Logistics */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">Departure & Logistics</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Departure City</label>
            <input value={form.departure_city} onChange={(e) => set("departure_city", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Departure Day</label>
            <input value={form.departure_day} onChange={(e) => set("departure_day", e.target.value)} className={inputCls} placeholder="e.g. Friday" />
          </div>
          <div>
            <label className={labelCls}>Next Departure</label>
            <input value={form.next_departure} onChange={(e) => set("next_departure", e.target.value)} className={inputCls} placeholder="e.g. Fri, 28 Aug 2026" />
          </div>
          <div>
            <label className={labelCls}>Transport</label>
            <input value={form.transport} onChange={(e) => set("transport", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Accommodation</label>
            <input value={form.accommodation} onChange={(e) => set("accommodation", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Meals</label>
            <input value={form.meals} onChange={(e) => set("meals", e.target.value)} className={inputCls} />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 rounded accent-primary" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="h-4 w-4 rounded accent-primary" />
              Active
            </label>
          </div>
        </div>
      </fieldset>

      {/* Destinations */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">Destinations</legend>
        <div className="mt-2 grid gap-2">
          {form.destinations.map((d, i) => (
            <div key={i} className="flex gap-2">
              <input value={d} onChange={(e) => updateArray("destinations", i, e.target.value)} className={inputCls} placeholder="e.g. Muzaffarabad" />
              {form.destinations.length > 1 && (
                <button type="button" onClick={() => removeFromArray("destinations", i)} className="shrink-0 rounded-xl p-2.5 text-destructive hover:bg-destructive/10">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addToArray("destinations")} className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Plus size={16} /> Add Destination
          </button>
        </div>
      </fieldset>

      {/* Itinerary */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">Day-by-Day Itinerary</legend>
        <div className="mt-2 grid gap-5">
          {form.itinerary.map((day, di) => (
            <div key={di} className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  Day {day.day}
                </span>
                {form.itinerary.length > 1 && (
                  <button type="button" onClick={() => removeDay(di)} className="text-destructive hover:underline text-xs font-semibold">
                    Remove Day
                  </button>
                )}
              </div>
              <div className="mb-3">
                <label className={labelCls}>Day Title</label>
                <input value={day.title} onChange={(e) => updateDay(di, "title", e.target.value)} className={inputCls} placeholder="e.g. Lahore to Muzaffarabad" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Details</label>
                {day.details.map((det, detI) => (
                  <div key={detI} className="flex gap-2">
                    <input value={det} onChange={(e) => updateDetail(di, detI, e.target.value)} className={inputCls} placeholder="Activity / point" />
                    {day.details.length > 1 && (
                      <button type="button" onClick={() => removeDetail(di, detI)} className="shrink-0 rounded-xl p-2.5 text-destructive hover:bg-destructive/10">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addDetail(di)} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  <Plus size={14} /> Add Detail
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addDay} className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Plus size={16} /> Add Day
          </button>
        </div>
      </fieldset>

      {/* Inclusions & Exclusions */}
      <div className="grid gap-8 lg:grid-cols-2">
        <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <legend className="px-2 font-heading text-base font-bold text-foreground">What's Included</legend>
          <div className="mt-2 grid gap-2">
            {form.included.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input value={item} onChange={(e) => updateArray("included", i, e.target.value)} className={inputCls} placeholder="Included item" />
                {form.included.length > 1 && (
                  <button type="button" onClick={() => removeFromArray("included", i)} className="shrink-0 rounded-xl p-2.5 text-destructive hover:bg-destructive/10">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addToArray("included")} className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </fieldset>

        <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <legend className="px-2 font-heading text-base font-bold text-foreground">What's Not Included</legend>
          <div className="mt-2 grid gap-2">
            {form.notIncluded.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input value={item} onChange={(e) => updateArray("notIncluded", i, e.target.value)} className={inputCls} placeholder="Excluded item" />
                {form.notIncluded.length > 1 && (
                  <button type="button" onClick={() => removeFromArray("notIncluded", i)} className="shrink-0 rounded-xl p-2.5 text-destructive hover:bg-destructive/10">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addToArray("notIncluded")} className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </fieldset>
      </div>

      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">Gallery</legend>
        <div className="mt-2">
          <GalleryUploader
            value={form.gallery}
            onChange={(urls) => set("gallery", urls)}
            onUploadingChange={handleUploadingChange}
          />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || uploadingCount > 0}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : uploadingCount > 0 ? <Upload size={18} className="animate-bounce" /> : <Save size={18} />}
          {loading ? "Saving..." : uploadingCount > 0 ? `Uploading (${uploadingCount})…` : submitLabel}
        </button>
      </div>
    </form>
  );
}
