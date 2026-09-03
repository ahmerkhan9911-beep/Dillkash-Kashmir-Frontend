import { useRef, useState, useCallback, useEffect } from "react";
import { ImageIcon, Loader2, Trash2, RefreshCw, Link, AlertCircle } from "lucide-react";
import { uploadImage } from "@/services/api";
import { resolveImageUrl } from "@/lib/resolveImage";

/* ─────────────────────────────────────────────────────────────────── *
 * Allowed types / size limit (mirrors server-side validation)         *
 * ─────────────────────────────────────────────────────────────────── */
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }
  if (file.size > MAX_BYTES) {
    return "File must be smaller than 5 MB.";
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────────── *
 * Props                                                                *
 * ─────────────────────────────────────────────────────────────────── */
interface ImageUploaderProps {
  /** Current URL value (from form state) */
  value: string;
  /** Called when the URL should be updated */
  onChange: (url: string) => void;
  /** Notify parent whether an upload is in progress (for disabling submit) */
  onUploadingChange?: (uploading: boolean) => void;
  /** Label shown above the uploader */
  label?: string;
}

/* ─────────────────────────────────────────────────────────────────── *
 * Component                                                            *
 * ─────────────────────────────────────────────────────────────────── */
export function ImageUploader({
  value,
  onChange,
  onUploadingChange,
  label = "Image",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [localBlob, setLocalBlob] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";
  const errorCls = "mt-1.5 text-xs font-medium text-destructive";

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (localBlob) {
        URL.revokeObjectURL(localBlob);
      }
    };
  }, [localBlob]);

  const setUploadingState = useCallback(
    (v: boolean) => {
      setUploading(v);
      onUploadingChange?.(v);
    },
    [onUploadingChange]
  );

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setImgError(false);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Create instant local preview
      const blob = URL.createObjectURL(file);
      setLocalBlob(blob);
      setUploadingState(true);

      try {
        const uploadedUrl = await uploadImage(file);
        onChange(uploadedUrl);
        // Clear the temporary blob now that the parent has the real URL
        setLocalBlob(null);
        URL.revokeObjectURL(blob);
      } catch (err) {
        setLocalBlob(null);
        URL.revokeObjectURL(blob);
        setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      } finally {
        setUploadingState(false);
      }
    },
    [onChange, setUploadingState]
  );

  /* ── drag & drop ── */
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      // reset so the same file can be re-selected
      e.target.value = "";
    },
    [handleFile]
  );

  /* ── remove / replace ── */
  const handleRemove = () => {
    if (localBlob) {
      URL.revokeObjectURL(localBlob);
      setLocalBlob(null);
    }
    onChange("");
    setError(null);
    setImgError(false);
  };

  /* ─────── Paste-URL mode ─────── */
  if (pasteMode) {
    return (
      <div>
        <label className={labelCls}>{label}</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={value}
            onChange={(e) => {
              setImgError(false);
              onChange(e.target.value);
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setPasteMode(false)}
            className="shrink-0 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent"
          >
            Upload instead
          </button>
        </div>
        {error && <p className={errorCls}>{error}</p>}
      </div>
    );
  }

  /* ─────── Preview mode (image picked or already uploaded) ─────── */
  const displaySrc = localBlob ?? (value ? resolveImageUrl(value) : null);

  if (displaySrc) {
    return (
      <div>
        <label className={labelCls}>{label}</label>
        <div className="relative mt-1 overflow-hidden rounded-2xl border border-border bg-muted">
          {/* Error state */}
          {imgError && (
            <div className="flex h-48 flex-col items-center justify-center gap-2 bg-muted p-4 text-center">
              <AlertCircle size={24} className="text-destructive/70" />
              <p className="text-xs font-medium text-destructive">Failed to load image preview</p>
              <button
                type="button"
                onClick={() => setImgError(false)}
                className="rounded-lg border border-destructive/30 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
              >
                Retry
              </button>
            </div>
          )}

          {/* Actual image */}
          <img
            key={displaySrc}
            src={displaySrc}
            alt="Thumbnail"
            className={[
              "h-48 w-full object-cover transition-opacity duration-200",
              imgError ? "hidden" : "opacity-100",
            ].join(" ")}
            onError={() => setImgError(true)}
          />

          {/* Uploading overlay */}
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white backdrop-blur-sm">
              <Loader2 size={28} className="animate-spin text-white" />
              <p className="text-xs font-semibold">Uploading new image…</p>
            </div>
          )}

          {/* Action buttons (Replace / Remove) */}
          {!uploading && (
            <div className="absolute right-2 top-2 flex gap-1.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg bg-background/90 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow backdrop-blur-sm hover:bg-background transition-transform active:scale-95"
                title="Replace image"
              >
                <RefreshCw size={12} />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 rounded-lg bg-destructive/90 px-2.5 py-1.5 text-xs font-semibold text-destructive-foreground shadow backdrop-blur-sm hover:bg-destructive transition-transform active:scale-95"
                title="Remove image"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Hidden file input for "Replace" */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={onFileChange}
        />
        {error && <p className={errorCls}>{error}</p>}
      </div>
    );
  }

  /* ─────── Drop-zone mode (nothing selected yet) ─────── */
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div
        role="button"
        tabIndex={0}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        className={[
          "relative mt-1 flex min-h-[10rem] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors outline-none",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/60 hover:bg-primary/5",
          uploading ? "pointer-events-none" : "",
        ].join(" ")}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <ImageIcon size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            {dragging ? "Drop image here" : "Drag & drop or click to browse"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">JPG, PNG, WebP — max 5 MB</p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={onFileChange}
      />

      {error && <p className={errorCls}>{error}</p>}

      {/* "paste URL instead" fallback */}
      <button
        type="button"
        onClick={() => setPasteMode(true)}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <Link size={12} />
        or paste image URL instead
      </button>
    </div>
  );
}
