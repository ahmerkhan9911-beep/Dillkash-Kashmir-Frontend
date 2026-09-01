import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { formatPKR, whatsappLink, type Tour } from "@/data/site";
import { StarRating } from "./StarRating";
import { WhatsAppIcon } from "./Navbar";

interface TourCardProps {
  tour: Tour;
  onBook?: (tour: Tour) => void;
}

export function TourCard({ tour, onBook }: TourCardProps) {
  // Collect all gallery images with fallback to main image
  const galleryImages = (tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : [tour.image]
  ).filter(Boolean);

  const imagesList = galleryImages.length > 0 ? galleryImages : [tour.image];
  const hasMultipleImages = imagesList.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (diff > minSwipeDistance) {
      // Swiped left -> next
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      {/* Thumbnail Carousel */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-muted select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagesList.map((imgSrc, idx) => (
            <div key={`${tour.slug}-img-${idx}`} className="relative h-full w-full flex-shrink-0">
              <img
                src={imgSrc}
                alt={`${tour.title} - Photo ${idx + 1}`}
                width={1280}
                height={720}
                loading={idx === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Gradient shadow for text & buttons clarity */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

        {/* Badges (Top-Left) */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur shadow-sm">
            <Clock size={12} className="mr-1 inline-block" />
            {tour.durationDays} Days
          </span>
          {tour.type?.[0] && (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur shadow-sm">
              {tour.type[0]}
            </span>
          )}
        </div>

        {/* Image count pill (Top-Right) */}
        {hasMultipleImages && (
          <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur shadow-sm">
            <Images size={11} />
            <span>
              {currentIndex + 1}/{imagesList.length}
            </span>
          </div>
        )}

        {/* Prev / Next Arrows */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-200 hover:bg-black/80 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-0 focus:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-200 hover:bg-black/80 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-0 focus:opacity-100"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots / Indicators (Bottom-Center) */}
            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
              {imagesList.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  type="button"
                  onClick={(e) => handleDotClick(dotIdx, e)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? "h-1.5 w-5 bg-white shadow-md"
                      : "h-1.5 w-1.5 bg-white/55 hover:bg-white/90 hover:scale-125"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <StarRating rating={tour.rating} size={14} />
          <span className="text-xs font-semibold text-muted-foreground">
            {tour.rating} ({tour.reviews} reviews)
          </span>
        </div>

        <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground">
          {tour.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{tour.short}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tour.destinations.slice(0, 4).map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"
            >
              <MapPin size={10} />
              {d}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Starting from
            </p>
            <p className="font-heading text-xl font-extrabold text-primary">
              {formatPKR(tour.price)}
            </p>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Calendar size={13} className="text-primary" />
            {tour.nextDeparture}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link
            to="/packages/$slug"
            params={{ slug: tour.slug }}
            className="rounded-xl border border-primary py-2.5 text-center text-sm font-bold text-primary transition-colors hover:bg-secondary"
          >
            View Itinerary
          </Link>
          <button
            type="button"
            onClick={() =>
              onBook
                ? onBook(tour)
                : window.open(
                    whatsappLink(`Hi Al Kareem Travel! I want to book: ${tour.title}`),
                    "_blank",
                    "noopener",
                  )
            }
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp py-2.5 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon size={15} />
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
