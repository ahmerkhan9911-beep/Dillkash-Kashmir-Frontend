import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Star,
  MapPin,
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
  Loader2,
  ArrowLeft,
  Phone,
  Mail,
  User,
  MessageCircle,
  Send,
} from "lucide-react";
import { getHotelBySlug, submitHotelBooking } from "@/services/hotels";
import { mockHotels, type Hotel } from "@/data/hotels";
import { formatPKR, whatsappLink } from "@/data/site";
import { resolveImageUrl } from "@/lib/resolveImage";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/hotels/$slug")({
  head: () => ({
    meta: [
      { title: `Hotel — DillKash Kashmir` },
      {
        name: "description",
        content: `Request hotel booking and room availability in Kashmir with DillKash Kashmir.`,
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
  const { user } = useAuth();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Inquiry / Booking state
  const [guestName, setGuestName] = useState(user?.full_name || "");
  const [guestPhone, setGuestPhone] = useState(user?.phone || "");
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [checkIn, setCheckIn] = useState<string>(todayStr());
  const [checkOut, setCheckOut] = useState<string>(tomorrowStr());
  const [guests, setGuests] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (user) {
      if (!guestName && user.full_name) setGuestName(user.full_name);
      if (!guestPhone && user.phone) setGuestPhone(user.phone);
      if (!guestEmail && user.email) setGuestEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    getHotelBySlug(slug)
      .then((h) => {
        if (h) {
          setHotel(h);
        } else {
          const fallback = mockHotels.find(
            (m) => m.slug === slug || String(m.id) === slug
          );
          if (fallback) setHotel(fallback);
        }
      })
      .catch((err) => {
        console.error("Error fetching hotel by slug:", err);
        const fallback = mockHotels.find(
          (m) => m.slug === slug || String(m.id) === slug
        );
        if (fallback) setHotel(fallback);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotel) return;

    if (!guestName.trim()) {
      setSubmitError("Please enter your name");
      return;
    }
    if (!guestPhone.trim()) {
      setSubmitError("Please provide your phone / WhatsApp number");
      return;
    }

    setSubmitError("");
    setSubmitting(true);
    try {
      await submitHotelBooking({
        hotelId: hotel.id,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        guestEmail: guestEmail.trim() || undefined,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestsCount: guests,
      });
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to submit request. Please try again or reach out on WhatsApp."
      );
    } finally {
      setSubmitting(false);
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

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
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

            {/* Hassle-Free Assistance Banner */}
            <Reveal>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Direct Kashmir Desk Booking Assistance
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                      DillKash Kashmir coordinates directly with the management of {hotel.name} to secure the best available rooms, seasonal rates, and special family arrangements.
                    </p>
                  </div>
                  <a
                    href={whatsappLink(`Hi DillKash Kashmir, I am interested in booking ${hotel.name} in ${hotel.location}. Could you share current room availability?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-cta hover:bg-emerald-700 transition-colors shrink-0"
                  >
                    <MessageCircle size={16} /> WhatsApp Desk
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ──────────────── Inquiry / Booking Sidebar ──────────────── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card shadow-lg overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-br from-primary to-emerald-700 px-6 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Estimated Rate
                  </p>
                  <p className="font-heading text-3xl font-extrabold">
                    {formatPKR(hotel.pricePerNight)}
                  </p>
                  <p className="text-xs text-white/70">
                    Starting price / night (room allocation confirmed by hotel)
                  </p>
                </div>

                <div className="p-6">
                  {submitSuccess ? (
                    <div className="py-6 text-center space-y-4">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
                        <Check size={32} />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        Request Sent!
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Your request has been sent! Our team will confirm room availability with the hotel and contact you shortly.
                      </p>
                      <div className="pt-2">
                        <a
                          href={whatsappLink(`Hi DillKash Kashmir, I just requested room availability for ${hotel.name}. My name is ${guestName}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-cta hover:bg-emerald-700 transition-colors"
                        >
                          <MessageCircle size={18} /> Chat on WhatsApp Now
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitInquiry} className="space-y-4">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          Hotel Inquiry
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Tell us your travel details and we'll check room availability with {hotel.name}.
                        </p>
                      </div>

                      {/* Guest Name */}
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Your Name
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Full name"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Contact Phone / WhatsApp */}
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Phone / WhatsApp Number
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="tel"
                            required
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="e.g. 0300 1234567"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Email (Optional) */}
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Email Address <span className="font-normal lowercase text-muted-foreground/80">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Expected Dates */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Check-In
                          </label>
                          <div className="relative">
                            <CalendarDays size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="w-full rounded-xl border border-border bg-background py-2 pl-8 pr-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Check-Out
                          </label>
                          <div className="relative">
                            <CalendarDays size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="w-full rounded-xl border border-border bg-background py-2 pl-8 pr-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Number of Guests
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
                            <option value={15}>10+ Guests (Group)</option>
                          </select>
                        </div>
                      </div>

                      {/* Error Banner */}
                      {submitError && (
                        <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-xs font-semibold text-destructive">
                          {submitError}
                        </p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.01] disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Request Room Availability
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-muted-foreground">
                        No advance payment required · Quick response via WhatsApp or Phone
                      </p>
                    </form>
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
