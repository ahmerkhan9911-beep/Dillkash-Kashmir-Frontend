import { useState, useCallback } from "react";
import { Loader2, Save, Upload } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { GalleryUploader } from "./GalleryUploader";

export interface DestinationFormData {
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  gallery: string[];
  sort_order: number;
  is_active: boolean;
}

const emptyForm: DestinationFormData = {
  name: "",
  slug: "",
  description: "",
  cover_image: "",
  gallery: [],
  sort_order: 0,
  is_active: true,
};

interface DestinationFormProps {
  initial?: Partial<DestinationFormData>;
  onSubmit: (data: DestinationFormData) => Promise<void>;
  submitLabel?: string;
}

export function DestinationForm({
  initial,
  onSubmit,
  submitLabel = "Save Destination",
}: DestinationFormProps) {
  const [form, setForm] = useState<DestinationFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCount, setUploadingCount] = useState(0);

  /** Increment or decrement the in-progress upload counter */
  const handleUploadingChange = useCallback((uploading: boolean) => {
    setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
  }, []);

  const set = <K extends keyof DestinationFormData>(key: K, value: DestinationFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Destination name is required");
      return;
    }
    if (!form.cover_image.trim()) {
      setError("Cover image is required");
      return;
    }

    const cleaned: DestinationFormData = {
      ...form,
      name: form.name.trim(),
      slug:
        form.slug.trim() ||
        form.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      description: form.description.trim(),
      cover_image: form.cover_image.trim(),
      gallery: form.gallery.filter((g) => g && g.trim()),
      sort_order: Number(form.sort_order) || 0,
    };

    setLoading(true);
    try {
      await onSubmit(cleaned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save destination");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring";
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
        <legend className="px-2 font-heading text-base font-bold text-foreground">
          Basic Details
        </legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Destination Name *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
              placeholder="e.g. Arang Kel"
            />
          </div>
          <div>
            <label className={labelCls}>URL Slug</label>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className={inputCls}
              placeholder="auto-generated from name (e.g. arang-kel)"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Short Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className={inputCls}
              placeholder="Brief description of this destination"
            />
          </div>
          <div>
            <label className={labelCls}>Display Order</label>
            <input
              type="number"
              min={0}
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className={inputCls}
              placeholder="0 (Lower numbers appear first)"
            />
          </div>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              Active on Website
            </label>
          </div>
        </div>
      </fieldset>

      {/* Cover Image */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">
          Card Cover Image *
        </legend>
        <p className="mb-4 text-xs text-muted-foreground">
          The main photo shown on the homepage destination card.
        </p>
        <ImageUploader
          label="Destination Cover Photo"
          value={form.cover_image}
          onChange={(url) => set("cover_image", url)}
          onUploadingChange={handleUploadingChange}
        />
      </fieldset>

      {/* Gallery Images */}
      <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <legend className="px-2 font-heading text-base font-bold text-foreground">
          Destination Gallery
        </legend>
        <p className="mb-4 text-xs text-muted-foreground">
          Photos displayed in the interactive lightbox when visitors click this destination card.
        </p>
        <GalleryUploader
          value={form.gallery}
          onChange={(urls) => set("gallery", urls)}
          onUploadingChange={handleUploadingChange}
        />
      </fieldset>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || uploadingCount > 0}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : uploadingCount > 0 ? (
            <Upload size={18} className="animate-bounce" />
          ) : (
            <Save size={18} />
          )}
          {loading ? "Saving..." : uploadingCount > 0 ? `Uploading (${uploadingCount})…` : submitLabel}
        </button>
      </div>
    </form>
  );
}
