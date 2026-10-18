import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Wifi,
  Flame,
  Eye,
  Car,
  Coffee,
  Sparkles,
  Check,
  CalendarDays,
  Users,
  BedDouble,
  Loader2,
  ArrowLeft,
  Shield,
  Info,
} from "lucide-react";
import { getHotelBySlug, submitHotelBooking } from "@/services/hotels";
import { mockHotels, type Hotel, type Room } from "@/data/hotels";
import { formatPKR } from "@/data/site";
import { resolveImageUrl } from "@/lib/resolveImage";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/hotels/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Hotel — DillKash Kashmir` },
      {
        name: "description",
        content: `Book your stay at this premium hotel in Kashmir with DillKash Kashmir.`,
      },
    ],
  }),
  component: HotelDetailPage,
});

/* ── Amenity Icons ── */
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

/* ─────────────────── Room type label colors ─────────────── */
const ROOM_COLORS: Record<string, string> = {
  Standard: "bg-slate-100 text-slate-700 border-slate-200",
  Deluxe: "bg-blue-50 text-blue-700 border-blue-200",
  Suite: "bg-amber-50 text-amber-700 border-amber-200",
};

/* ─────────────────── Helpers ─────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function diffDays(a: string, b: string) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86400000));
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0] ?? "";
}
function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0] ?? "";
}

/* ─────────────────── Main Component ──────────────────────── */
function HotelDetailPage() {
  const { slug } = Route.useParams();
  const { isAuthenticated, user } = useAuth();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Booking state
  const [checkIn, setCheckIn] = useState<string>(todayStr());
  const [checkOut, setCheckOut] = useState<string>(tomorrowStr());
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    getHotelBySlug(slug)
      .then((h) => {
        if (h) {
          setHotel(h);
          if (h.rooms && h.rooms.length > 0) {
            setSelectedRoom(h.rooms[0] ?? null);
          }
        } else {
          const fallback = mockHotels.find(
            (m) => m.slug === slug || String(m.id) === slug
          );
          if (fallback) {
            setHotel(fallback);
            if (fallback.rooms && fallback.rooms.length > 0) {
              setSelectedRoom(fallback.rooms[0] ?? null);
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching hotel by slug:", err);
        const fallback = mockHotels.find(
          (m) => m.slug === slug || String(m.id) === slug
        );
        if (fallback) {
          setHotel(fallback);
          if (fallback.rooms && fallback.rooms.length > 0) {
            setSelectedRoom(fallback.rooms[0] ?? null);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const nights = diffDays(checkIn, checkOut);
  const pricePerNight = selectedRoom?.pricePerNight ?? hotel?.pricePerNight ?? 0;
  const totalPrice = nights * rooms * pricePerNight;

  const handleBook = async () => {
    if (!hotel) return;
    setBookingError("");
    setBookingLoading(true);
    try {
      await submitHotelBooking({
        hotelId: hotel.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestsCount: guests,
        roomsCount: rooms,
        roomType: selectedRoom?.roomType ?? "Standard",
      });
      setBookingSuccess(true);
    } catch (err) {
      setBookingError(
        err instanceof Error ? err.message : "Booking failed. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Hotel Not Found</h1>
        <p className="text-sm text-muted-foreground">This hotel doesn't exist or has been removed.</p>
        <Link to="/hotels" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
          Browse Hotels
        </Link>
      </div>
    );
  }

  const images =
    hotel.images.length > 0
      ? hotel.images
      : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"];

  return (
    <>
      {/* ═══════════ Hero Gallery ═══════════ */}
      <HeroGallery
        images={images}
        hotelName={hotel.name}
        onImageClick={(idx) => setLightboxIdx(idx)}
      />

      {/* ═══════════ Content ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Link to="/hotels" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft size={13} /> Back to Hotels
          </Link>
          <span>/</span>
          <span className="text-foreground">{hotel.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ──────────────── Left Content ──────────────── */}
          <div className="space-y-10">
            {/* Hotel Header */}
            <Reveal>
              <div>
                {/* Star Rating */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: hotel.starRating }, (_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-600">
                    {hotel.starRating}-Star Hotel
                  </span>
                  {hotel.featured && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      FEATURED
                    </span>
                  )}
                </div>

                <h1 className="font-heading text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                  {hotel.name}
                </h1>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={15} className="shrink-0 text-primary" />
                  {hotel.location}, Azad Kashmir
                </div>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {hotel.description}
                </p>
              </div>
            </Reveal>

            {/* Amenities */}
            <Reveal>
              <div>
                <h2 className="mb-4 font-heading text-xl font-extrabold text-foreground">
                  Amenities & Facilities
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Sparkles;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 shadow-sm"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon size={16} />
                        </span>
                        <span className="text-sm font-semibold text-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Available Rooms */}
            {hotel.rooms && hotel.rooms.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="mb-4 font-heading text-xl font-extrabold text-foreground">
                    Available Rooms & Prices
                  </h2>
                  <div className="grid gap-4">
                    {hotel.rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={cn(
                          "cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md",
                          selectedRoom?.id === room.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary/40"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "rounded-full border px-2.5 py-0.5 text-xs font-bold",
                                  ROOM_COLORS[room.roomType] || ROOM_COLORS["Standard"]
                                )}
                              >
                                {room.roomType}
                              </span>
                              {selectedRoom?.id === room.id && (
                                <span className="flex items-center gap-1 text-xs font-bold text-primary">
                                  <Check size={12} /> Selected
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users size={13} /> Up to {room.maxGuests} guests
                              </span>
                              <span className="flex items-center gap-1">
                                <BedDouble size={13} /> {room.availableRooms} rooms available
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-heading text-xl font-extrabold text-foreground">
                              {formatPKR(room.pricePerNight)}
                            </p>
                            <p className="text-xs text-muted-foreground">/ night</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Hotel Policies */}
            <Reveal>
              <div>
                <h2 className="mb-4 font-heading text-xl font-extrabold text-foreground">
                  Hotel Policies
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Check-in / Check-out */}
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                        <Clock size={18} />
                      </span>
                      <p className="font-heading text-base font-bold text-foreground">Check-In / Check-Out</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Check-In:</span>
                        <span className="font-semibold text-foreground">{hotel.checkInTime ?? "2:00 PM"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-Out:</span>
                        <span className="font-semibold text-foreground">{hotel.checkOutTime ?? "12:00 PM"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation */}
                  {hotel.cancellationPolicy && (
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-600">
                          <Shield size={18} />
                        </span>
                        <p className="font-heading text-base font-bold text-foreground">Cancellation Policy</p>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {hotel.cancellationPolicy}
                      </p>
                    </div>
                  )}

                  {/* House Rules */}
                  {hotel.houseRules && (
                    <div className="sm:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-600">
                          <Info size={18} />
                        </span>
                        <p className="font-heading text-base font-bold text-foreground">House Rules</p>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {hotel.houseRules}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ──────────────── Booking Sidebar ──────────────── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card shadow-lg overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-br from-primary to-emerald-700 px-6 py-5 text-white">
                  <p className="text-sm font-semibold text-white/80">Starting from</p>
                  <p className="font-heading text-3xl font-extrabold">
                    {formatPKR(pricePerNight)}
                  </p>
                  <p className="text-sm text-white/70">per room / night</p>
                </div>

                <div className="p-6">
                  {bookingSuccess ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100">
                        <Check size={28} className="text-emerald-600" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">Booking Submitted!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your reservation is pending confirmation. Check your bookings page for updates.
                      </p>
                      <Link
                        to="/my-bookings"
                        className="mt-4 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
                      >
                        View My Bookings
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Check-in */}
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Check-In Date
                        </label>
                        <div className="relative">
                          <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="date"
                            min={todayStr()}
                            value={checkIn}
                            onChange={(e) => {
                              setCheckIn(e.target.value);
                              if (e.target.value >= checkOut) {
                                const d = new Date(e.target.value);
                                d.setDate(d.getDate() + 1);
                                setCheckOut(d.toISOString().split("T")[0] ?? "");
                              }
                            }}
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Check-out */}
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Check-Out Date
                        </label>
                        <div className="relative">
                          <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="date"
                            min={checkIn}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Rooms + Guests row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Rooms
                          </label>
                          <div className="relative">
                            <BedDouble size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <select
                              value={rooms}
                              onChange={(e) => setRooms(Number(e.target.value))}
                              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n} Room{n > 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Guests
                          </label>
                          <div className="relative">
                            <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <select
                              value={guests}
                              onChange={(e) => setGuests(Number(e.target.value))}
                              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <option key={n} value={n}>
                                  {n} Guest{n > 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Room selector (if available) */}
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Room Type
                          </label>
                          <select
                            value={selectedRoom?.id ?? ""}
                            onChange={(e) => {
                              const r = hotel.rooms!.find(
                                (r) => r.id === Number(e.target.value)
                              );
                              setSelectedRoom(r ?? null);
                            }}
                            className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          >
                            {hotel.rooms.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.roomType} — {formatPKR(r.pricePerNight)}/night
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Price breakdown */}
                      <div className="rounded-xl bg-secondary/60 p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formatPKR(pricePerNight)} × {nights} night{nights > 1 ? "s" : ""} × {rooms} room{rooms > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-border pt-2">
                          <span className="font-heading text-base font-bold text-foreground">Total</span>
                          <span className="font-heading text-xl font-extrabold text-primary">
                            {formatPKR(totalPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Error */}
                      {bookingError && (
                        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
                          {bookingError}
                        </p>
                      )}

                      {/* CTA */}
                      {isAuthenticated && user?.role === "user" ? (
                        <button
                          onClick={handleBook}
                          disabled={bookingLoading}
                          className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
                        >
                          {bookingLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 size={16} className="animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            "Book Now"
                          )}
                        </button>
                      ) : !isAuthenticated ? (
                        <Link
                          to="/login"
                          search={{ redirect: `/hotels/${slug}` }}
                          className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
                        >
                          Sign In to Book
                        </Link>
                      ) : (
                        <p className="text-center text-xs text-muted-foreground">
                          Admins cannot make bookings.
                        </p>
                      )}

                      <p className="text-center text-[11px] text-muted-foreground">
                        Free cancellation · No payment required now
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Gallery Lightbox ── */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          images={images}
          currentIdx={lightboxIdx}
          title={hotel.name}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((p) => (p! - 1 + images.length) % images.length)}
          onNext={() => setLightboxIdx((p) => (p! + 1) % images.length)}
        />
      )}
    </>
  );
}

/* ═════════════════════ Hero Gallery ═════════════════════ */
function HeroGallery({
  images,
  hotelName,
  onImageClick,
}: {
  images: string[];
  hotelName: string;
  onImageClick: (idx: number) => void;
}) {
  const [mainIdx, setMainIdx] = useState(0);

  return (
    <div className="grid h-[420px] gap-2 sm:h-[500px] lg:h-[560px] lg:grid-cols-[3fr_1fr]">
      {/* Main image */}
      <div
        className="group relative cursor-pointer overflow-hidden bg-muted"
        onClick={() => onImageClick(mainIdx)}
      >
        <img
          src={resolveImageUrl(images[mainIdx])}
          alt={`${hotelName} - Main`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm">
            <ZoomIn size={20} />
          </span>
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMainIdx((p) => (p - 1 + images.length) % images.length);
              }}
              className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black/80"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMainIdx((p) => (p + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black/80"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter */}
        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {mainIdx + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="hidden flex-col gap-2 overflow-hidden lg:flex">
          {images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              onClick={() => {
                if (i === 2 && images.length > 3) {
                  onImageClick(2);
                } else {
                  setMainIdx(i);
                }
              }}
              className={cn(
                "group relative flex-1 cursor-pointer overflow-hidden bg-muted",
                mainIdx === i && "ring-2 ring-primary ring-inset"
              )}
            >
              <img
                src={resolveImageUrl(img)}
                alt={`${hotelName} ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Show "All photos" overlay on last thumb */}
              {i === 2 && images.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white">
                  <span className="text-center text-sm font-bold">+{images.length - 3} Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═════════════════════ Lightbox ═════════════════════ */
function GalleryLightbox({
  images,
  currentIdx,
  title,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIdx: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
        {currentIdx + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 sm:right-6"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <img
        src={resolveImageUrl(images[currentIdx])}
        alt={`${title} — photo ${currentIdx + 1}`}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
