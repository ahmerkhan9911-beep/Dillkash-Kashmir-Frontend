import { useRef, useState, useCallback } from "react";
import { ImagePlus, Loader2, X, AlertCircle } from "lucide-react";
import { uploadImage } from "@/services/api";
import { resolveImageUrl } from "@/lib/resolveImage";

/* ─────────────────────────────────────────────────────────────────── *
 * Validation (mirrors server-side)                                     *
 * ─────────────────────────────────────────────────────────────────── */
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG, PNG, and WebP are allowed.";
  if (file.size > MAX_BYTES) return "File must be smaller than 5 MB.";
  return null;
}

/* ─────────────────────────────────────────────────────────────────── *
 * Internal state per in-flight upload                                  *
 * ─────────────────────────────────────────────────────────────────── */
interface PendingThumb {
  id: string;
  /**
   * Local blob URL created with URL.createObjectURL() for instant preview
   * while the upload is in progress. NOT revoked until the real <img>
   * fires onLoad to avoid a flash of a broken image.
   */
  preview: string;
  error: string | null;
}

/* ─────────────────────────────────────────────────────────────────── *
 * Props                                                                *
 * ─────────────────────────────────────────────────────────────────── */
interface GalleryUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

/* ─────────────────────────────────────────────────────────────────── *
 * Component                                                            *
 * ─────────────────────────────────────────────────────────────────── */
export function GalleryUploader({ value, onChange, onUploadingChange }: GalleryUploaderProps) {
  const [pending, setPending] = useState<PendingThumb[]>([]);
  const [dragging, setDragging] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const errorCls = "mt-1.5 text-xs font-medium text-destructive";

  /* ── track uploading count and notify parent ── */
  const pendingIdsRef = useRef<Set<string>>(new Set());
  const notifyParent = useCallback(
    (id: string, done: boolean) => {
      if (done) pendingIdsRef.current.delete(id);
      else pendingIdsRef.current.add(id);
      onUploadingChange?.(pendingIdsRef.current.size > 0);
    },
    [onUploadingChange]
  );

  /* ── process a batch of files ──────────────────────────────────── *
   *                                                                   *
   * FIX: stale closure on `value`                                     *
   *   Each parallel upload used `onChange([...value, url])` which     *
   *   captured the SAME stale snapshot of `value` — so 3 parallel    *
   *   uploads would each produce [url1], [url2], [url3] and only the  *
   *   last one would survive.                                          *
   *                                                                   *
   *   Fix: collect all resolved URLs into a local array, then call    *
   *   onChange ONCE at the end with the full accumulated list.         *
   *   We also use a ref to the latest `value` so subsequent batches   *
   *   don't overwrite earlier ones.                                    *
   * ─────────────────────────────────────────────────────────────── */
  // Keep a ref that always holds the latest gallery array
  const valueRef = useRef<string[]>(value);
  valueRef.current = value;

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setGlobalError(null);
      const fileArr = Array.from(files);

      // Client-side validation
      const errors: string[] = [];
      const valid: File[] = [];
      for (const f of fileArr) {
        const e = validateFile(f);
        if (e) errors.push(`"${f.name}": ${e}`);
        else valid.push(f);
      }
      if (errors.length) setGlobalError(errors.join(" · "));
      if (!valid.length) return;

      // Create placeholder thumbs for instant preview before upload completes
      const thumbs: PendingThumb[] = valid.map((f) => ({
        id: `${Date.now()}-${Math.random()}`,
        preview: URL.createObjectURL(f),
        error: null,
      }));
      setPending((prev) => [...prev, ...thumbs]);

      // Upload all valid files in parallel; accumulate URLs
      const resolvedUrls: string[] = [];

      await Promise.all(
        valid.map(async (file, i) => {
          const thumb = thumbs[i];
          if (!thumb) return;
          notifyParent(thumb.id, false);
          try {
            const url = await uploadImage(file);
            resolvedUrls.push(url);
            // Remove the pending thumb — the blob is kept alive until the
            // real <img> fires onLoad (handled in the thumb render below).
            setPending((prev) => prev.filter((t) => t.id !== thumb.id));
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            setPending((prev) =>
              prev.map((t) => (t.id === thumb.id ? { ...t, error: msg } : t))
            );
          } finally {
            notifyParent(thumb.id, true);
          }
        })
      );

      // Single onChange call with the full accumulated list — no stale snapshots
      if (resolvedUrls.length > 0) {
        onChange([...valueRef.current, ...resolvedUrls]);
      }
    },
    [onChange, notifyParent]
    // Note: `value` intentionally NOT in deps — we use valueRef.current to avoid stale closure
  );

  /* ── drag & drop ── */
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files);
    e.target.value = "";
  };

  /* ── remove an already-uploaded image ── */
  const removeUrl = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  /* ── dismiss a failed pending thumb ── */
  const dismissPending = (id: string) => {
    setPending((prev) => {
      const thumb = prev.find((t) => t.id === id);
      if (thumb) URL.revokeObjectURL(thumb.preview);
      return prev.filter((t) => t.id !== id);
    });
    notifyParent(id, true);
  };

  const hasThumbs = value.length > 0 || pending.length > 0;

  return (
    <div>
      {/* Thumbnail grid */}
      {hasThumbs && (
        <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {/* Already-uploaded images */}
          {value.map((url, idx) => (
            <UploadedThumb
              key={`uploaded-${idx}-${url}`}
              src={resolveImageUrl(url)}
              label={`Gallery image ${idx + 1}`}
              onRemove={() => removeUrl(idx)}
            />
          ))}

          {/* In-progress / failed pending thumbs */}
          {pending.map((thumb) => (
            <div
              key={thumb.id}
              className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
            >
              {/* Local blob preview — shown immediately without waiting for upload */}
              <img
                src={thumb.preview}
                alt="Uploading…"
                className={[
                  "h-full w-full object-cover",
                  thumb.error ? "opacity-30" : "opacity-60",
                ].join(" ")}
              />
              {/* Spinner / error overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                {thumb.error ? (
                  <>
                    <AlertCircle size={16} className="text-destructive" />
                    <p className="px-1 text-center text-[10px] font-semibold leading-tight text-destructive">
                      {thumb.error}
                    </p>
                    <button
                      type="button"
                      onClick={() => dismissPending(thumb.id)}
                      className="mt-0.5 rounded-full bg-destructive/80 p-0.5 text-destructive-foreground"
                      title="Dismiss"
                    >
                      <X size={10} />
                    </button>
                  </>
                ) : (
                  <Loader2 size={22} className="animate-spin text-primary drop-shadow" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / Add more */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={[
          "flex min-h-[6rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors outline-none",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/60 hover:bg-primary/5",
        ].join(" ")}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <ImagePlus size={18} className="text-primary" />
        </div>
        <p className="text-xs font-semibold text-foreground">
          {dragging
            ? "Drop images here"
            : hasThumbs
              ? "+ Add More Images"
              : "Drag & drop or click to browse"}
        </p>
        <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP — max 5 MB each</p>
      </div>

      {/* Hidden multi-file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={onFileChange}
      />

      {globalError && <p className={errorCls}>{globalError}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── *
 * Sub-component: a single already-uploaded gallery thumbnail           *
 * Shows a skeleton while the remote image is loading, and a retry     *
 * error state if it fails — no more silent blank squares.             *
 * ─────────────────────────────────────────────────────────────────── */
interface UploadedThumbProps {
  src: string;
  label: string;
  onRemove: () => void;
}

function UploadedThumb({ src, label, onRemove }: UploadedThumbProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
      {/* Skeleton */}
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Loader2 size={18} className="animate-spin text-primary/50" />
        </div>
      )}

      {/* Error */}
      {failed && (
        <div className="flex h-full flex-col items-center justify-center gap-1 px-1">
          <AlertCircle size={16} className="text-destructive/70" />
          <p className="text-center text-[10px] font-medium text-destructive leading-tight">
            Failed to load
          </p>
          <button
            type="button"
            onClick={() => { setFailed(false); setLoaded(false); }}
            className="mt-0.5 text-[10px] font-semibold text-primary underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Image */}
      <img
        ref={(el) => {
          if (el && el.complete && el.naturalWidth > 0 && !loaded) {
            setLoaded(true);
          }
        }}
        src={src}
        alt={label}
        className={[
          "h-full w-full object-cover transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
          failed ? "hidden" : "",
        ].join(" ")}
        onLoad={() => setLoaded(true)}
        onError={() => { setFailed(true); setLoaded(false); }}
      />

      {/* Remove button */}
      {!failed && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground opacity-0 shadow transition-opacity group-hover:opacity-100"
          title="Remove"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
