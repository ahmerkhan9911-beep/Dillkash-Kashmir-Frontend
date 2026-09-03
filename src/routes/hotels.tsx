import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  Star,
  MapPin,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Wifi,
  Flame,
  Eye,
  Car,
  Coffee,
  Sparkles,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { getHotels } from "@/services/hotels";
import {
  HOTEL_LOCATIONS,
  HOTEL_AMENITIES,
  STAR_OPTIONS,
  type Hotel,
} from "@/data/hotels";
import { formatPKR, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-kashmir.jpg";

/* ─────────────────────── Route ─────────────────────── */

export const Route = createFileRoute("/hotels")(  {
  head: () => ({
    meta: [
      { title: "Kashmir Hotels — Luxury to Budget Stays | DillKash Kashmir" },
      {
        name: "description",
        content:
          "Browse and book standalone hotels across Kashmir — from 5-star luxury resorts in Muzaffarabad to cozy guest houses in Arang Kel. Filter by star rating, location, price & amenities.",
      },
      {
        property: "og:title",
        content: "Kashmir Hotels — Luxury to Budget Stays | DillKash Kashmir",
      },
      {
        property: "og:description",
        content:
          "Find your perfect stay in Kashmir. 5-star luxury resorts, riverside hotels, and budget-friendly guest houses.",
      },
    ],
  }),
  component: HotelsPage,
});

/* ─────────────────── Amenity Icons ─────────────────── */

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Heater: Flame,
  "River View": Eye,
  Parking: Car,
  "Complimentary Breakfast": Coffee,
  "Room Service": Coffee,
  "Hot Water": Flame,
  "Generator Backup": Sparkles,
};

/* ─────────────────── Component ─────────────────────── */

function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  /* ── Filter state ── */
  const [starFilters, setStarFilters] = useState<number[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* ── Fetch hotels ── */
  useEffect(() => {
    setLoading(true);
    getHotels()
      .then(setHotels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ── Toggle helpers ── */
  const toggleStar = (star: number) =>
    setStarFilters((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );

  const toggleAmenity = (amenity: string) =>
    setAmenityFilters((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );

  const activeFilterCount =
    starFilters.length +
    (locationFilter ? 1 : 0) +
    (priceMin !== "" ? 1 : 0) +
    (priceMax !== "" ? 1 : 0) +
    amenityFilters.length +
    (searchQuery ? 1 : 0);

  const clearAllFilters = () => {
    setStarFilters([]);
    setLocationFilter("");
    setPriceMin("");
    setPriceMax("");
    setAmenityFilters([]);
    setSearchQuery("");
  };

  /* ── Filtered results ── */
  const filtered = useMemo(() => {
    return hotels.filter((hotel) => {
      if (starFilters.length > 0 && !starFilters.includes(hotel.starRating))
        return false;
      if (locationFilter && hotel.location !== locationFilter) return false;
      if (priceMin !== "" && hotel.pricePerNight < priceMin) return false;
      if (priceMax !== "" && hotel.pricePerNight > priceMax) return false;
      if (
        amenityFilters.length > 0 &&
        !amenityFilters.every((a) => hotel.amenities.includes(a))
      )
        return false;
      if (
        searchQuery &&
        !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [hotels, starFilters, locationFilter, priceMin, priceMax, amenityFilters, searchQuery]);

  /* ── Empty state message ── */
  const emptyMessage = useMemo(() => {
    const parts: string[] = [];
    if (starFilters.length === 1) parts.push(`${starFilters[0]}-star`);
    else if (starFilters.length > 1) parts.push("selected rating");
    parts.push("hotels");
    if (locationFilter) parts.push(`in ${locationFilter}`);
    if (priceMin !== "" || priceMax !== "") parts.push("in this price range");
    return `No ${parts.join(" ")} found`;
  }, [starFilters, locationFilter, priceMin, priceMax]);

  return (
    <>
      {/* ═══════════ Hero Banner ═══════════ */}
      <section className="relative flex min-h-[340px] items-end overflow-hidden bg-[#064E3B] sm:min-h-[400px]">
        <img
          src={heroImg}
          alt="Kashmir mountains"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-[#064E3B]/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-32 sm:px-6 sm:pb-14 sm:pt-36">
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-sm">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              Luxury to Budget — Every Traveler Welcome
            </span>
            <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Find Your Perfect Stay
              <br />
              <span className="text-emerald-300">in Kashmir</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-100/80 sm:text-base">
              From world-class 5-star resorts to authentic Kashmiri guest houses —
              discover and book standalone hotels across the valley.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ Filters + Grid ═══════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ── Search + Filter Toggle ── */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotels or locations..."
              className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X size={14} />
                Clear All ({activeFilterCount})
              </button>
            )}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors lg:hidden",
                filtersOpen
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:bg-secondary"
              )}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  filtersOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ═══════════ Filter Sidebar ═══════════ */}
          <aside
            className={cn(
              "w-full shrink-0 overflow-hidden transition-all duration-300 lg:block lg:w-72 lg:overflow-visible",
              filtersOpen
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
            )}
          >
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-heading text-sm font-bold text-foreground">
                Filters
              </h3>

              {/* Star Rating */}
              <div className="mb-5">
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Star Rating
                </h4>
                <div className="grid gap-1.5">
                  {STAR_OPTIONS.map((star) => {
                    const checked = starFilters.includes(star);
                    const is5Star = star === 5;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => toggleStar(star)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                          checked
                            ? is5Star
                              ? "bg-amber-50 text-amber-800 ring-1 ring-amber-300"
                              : "bg-primary/10 text-primary ring-1 ring-primary/30"
                            : "text-foreground hover:bg-secondary",
                          is5Star && !checked && "bg-amber-50/50"
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px]",
                            checked
                              ? is5Star
                                ? "border-amber-500 bg-amber-500 text-white"
                                : "border-primary bg-primary text-white"
                              : "border-border bg-background"
                          )}
                        >
                          {checked && "✓"}
                        </span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: star }, (_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-amber-400 text-amber-400"
                            />
                          ))}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {star}-Star
                        </span>
                        {is5Star && (
                          <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
                            LUXURY
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="mb-5">
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Location
                </h4>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All Locations</option>
                  {HOTEL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price Range (Per Night)
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={priceMin}
                    onChange={(e) =>
                      setPriceMin(e.target.value ? Number(e.target.value) : "")
                    }
                    placeholder="Min"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                  <span className="text-xs text-muted-foreground">–</span>
                  <input
                    type="number"
                    min={0}
                    value={priceMax}
                    onChange={(e) =>
                      setPriceMax(e.target.value ? Number(e.target.value) : "")
                    }
                    placeholder="Max"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {HOTEL_AMENITIES.map((amenity) => {
                    const checked = amenityFilters.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                          checked
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-5 w-full rounded-xl border border-border py-2.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* ═══════════ Hotel Grid ═══════════ */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading
                  ? "Loading hotels..."
                  : `${filtered.length} hotel${filtered.length !== 1 ? "s" : ""} found`}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : filtered.length === 0 ? (
              /* ── Empty State ── */
              <Reveal>
                <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-muted">
                    <Search size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {emptyMessage}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters or clearing them to see all
                    available hotels.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02]"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              </Reveal>
            ) : (
              /* ── Grid ── */
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((hotel, index) => (
                  <Reveal key={hotel.id} delay={index * 60}>
                    <HotelCard hotel={hotel} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═════════════════════ Hotel Card ═════════════════════ */

function HotelCard({ hotel }: { hotel: Hotel }) {
  const is5Star = hotel.starRating === 5;
  const waMsg = `Hi DillKash Kashmir, I'm interested in booking a stay at "${hotel.name}" in ${hotel.location}. Please share availability and rates.`;

  const imagesList = (hotel.images && hotel.images.length > 0
    ? hotel.images
    : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"]
  ).filter(Boolean);

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
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    } else if (diff < -minSwipeDistance) {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
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
            <div key={`${hotel.slug}-img-${idx}`} className="relative h-full w-full flex-shrink-0">
              <img
                src={imgSrc}
                alt={`${hotel.name} - Photo ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Gradient shadow for text & badges clarity */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

        {/* Top-Left: Star / Luxury Badge + Featured badge */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md backdrop-blur-sm",
              is5Star
                ? "bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950"
                : "bg-white/90 text-slate-800"
            )}
          >
            {Array.from({ length: hotel.starRating }, (_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  is5Star
                    ? "fill-amber-900 text-amber-900"
                    : "fill-amber-400 text-amber-400"
                }
              />
            ))}
            {is5Star && <span className="ml-0.5">LUXURY</span>}
          </div>

          {hotel.featured && (
            <div className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
              FEATURED
            </div>
          )}
        </div>

        {/* Top-Right: Photo count pill */}
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
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
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

        {/* Price overlay (Bottom-Left) */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-2.5 pt-8">
          <span className="text-lg font-extrabold text-white">
            {formatPKR(hotel.pricePerNight)}
          </span>
          <span className="text-xs text-white/70"> / night</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-bold leading-snug text-foreground line-clamp-1">
          {hotel.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={13} className="shrink-0 text-primary" />
          {hotel.location}
        </div>

        {/* Amenity chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || Sparkles;
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                <Icon size={10} />
                {amenity}
              </span>
            );
          })}
          {hotel.amenities.length > 4 && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {hotel.description}
        </p>

        {/* CTA */}
        <a
          href={whatsappLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-[0.98]"
        >
          <MessageCircle size={16} />
          Book via WhatsApp
        </a>
      </div>
    </div>
  );
}
