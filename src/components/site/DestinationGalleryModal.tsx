import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Images } from "lucide-react";
import type { DestinationItem } from "@/services/destinations";

interface DestinationGalleryModalProps {
  destination: DestinationItem | null;
  onClose: () => void;
}

export function DestinationGalleryModal({
  destination,
  onClose,
}: DestinationGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index whenever opened or destination changes
  useEffect(() => {
    setActiveIndex(0);
  }, [destination]);

  const images = destination?.gallery && destination.gallery.length > 0
    ? destination.gallery
    : destination?.cover_image
    ? [destination.cover_image]
    : [];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!destination) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [destination, onClose, handlePrev, handleNext]);

  if (!destination) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${destination.name} Gallery`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar: Title, Description, Close */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              <MapPin size={12} />
              Azad Kashmir
            </span>
            <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              {destination.name}
            </h2>
            {images.length > 1 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80">
                <Images size={12} />
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </div>
          {destination.description && (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/70">
              {destination.description}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          aria-label="Close gallery"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main View Area */}
      <div className="relative my-4 flex flex-1 items-center justify-center overflow-hidden">
        {images.length > 0 ? (
          <div className="relative flex h-full max-h-[70vh] w-full max-w-5xl items-center justify-center">
            <img
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={`${destination.name} - Photo ${activeIndex + 1}`}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
            />
          </div>
        ) : (
          <div className="text-center text-white/60">
            <p>No photos available for this destination.</p>
          </div>
        )}

        {/* Prev / Next navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex justify-center pb-2">
          <div className="flex max-w-full gap-2.5 overflow-x-auto rounded-2xl bg-white/5 p-2 backdrop-blur-md border border-white/10 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-xl transition-all ${
                  idx === activeIndex
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-black scale-105 opacity-100 shadow-md"
                    : "opacity-50 hover:opacity-90 hover:scale-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
