import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BedDouble,
  Bus,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  HandPlatter,
  MapPin,
  Phone,
  Users,
  X,
  Loader2,
} from "lucide-react";
import { formatPKR, pickupPoints, site, tours as staticTours, whatsappLink, type Tour } from "@/data/site";
import { getPackageBySlug } from "@/services/packages";
import { StarRating } from "@/components/site/StarRating";
import { BookingModal } from "@/components/site/BookingModal";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/Navbar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    // Static fallback for SSR — actual data loaded client-side from API
    const tour = staticTours.find((t) => t.slug === params.slug);
    return { tour: tour || null, slug: params.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.tour
      ? [
          { title: `${loaderData.tour.title} — DillKash Kashmir` },
          {
            name: "description",
            content: `${loaderData.tour.short} ${loaderData.tour.durationDays}-day all-inclusive tour from Lahore starting at ${formatPKR(loaderData.tour.price)}.`,
          },
          { property: "og:title", content: `${loaderData.tour.title} — DillKash Kashmir` },
          { property: "og:description", content: loaderData.tour.short },
        ]
      : [{ title: "Tour Package — DillKash Kashmir" }],
  }),
  component: TourDetailPage,
});

const quickInfo = (tour: Tour) => [
  { icon: Clock, label: "Duration", value: `${tour.durationDays} Days / ${tour.durationDays - 1} Nights` },
  { icon: MapPin, label: "Departure", value: "Lahore (Thokar, Kalma Chowk, Ring Road)" },
  { icon: Bus, label: "Transportation", value: tour.transport },
  { icon: BedDouble, label: "Accommodation", value: tour.accommodation },
  { icon: HandPlatter, label: "Meals", value: tour.meals },
  { icon: Users, label: "Tour Type", value: tour.type.join(", ") },
];

function ItineraryAccordion({ itinerary }: { itinerary: Tour["itinerary"] }) {
  const [openDay, setOpenDay] = useState<number>(1);

  return (
    <div className="grid gap-3">
      {itinerary.map((day) => {
        const isOpen = openDay === day.day;
        return (
          <div
            key={day.day}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              isOpen ? "border-primary/40 bg-card shadow-soft" : "border-border bg-card",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenDay(isOpen ? 0 : day.day)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full font-heading text-sm font-extrabold transition-colors",
                  isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                )}
              >
                D{day.day}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Day {day.day}
                </span>
                <span className="block truncate font-heading text-base font-bold text-foreground">
                  {day.title}
                </span>
              </span>
              <ChevronDown
                size={20}
                className={cn("shrink-0 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2.5 px-5 pb-5 pl-[4.75rem]">
                  {day.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TourDetailPage() {
  const loaderData = Route.useLoaderData();
  const [tour, setTour] = useState<Tour | null>(loaderData.tour);
  const [loading, setLoading] = useState(!loaderData.tour);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch from API (richer data with itinerary details)
  useEffect(() => {
    getPackageBySlug(loaderData.slug)
      .then((apiTour) => setTour(apiTour))
      .catch(() => { /* keep static data if API fails */ })
      .finally(() => setLoading(false));
  }, [loaderData.slug]);

  if (loading || !tour) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* Tour header */}
      <section className="relative overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-36 sm:px-6">
          <nav className="mb-4 text-xs font-semibold text-white/70" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/packages" className="hover:text-white">Packages</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{tour.title}</span>
          </nav>
          <h1 className="max-w-3xl font-heading text-3xl font-extrabold text-white text-balance sm:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur">
              <Clock size={14} /> {tour.durationDays} Days
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur">
              <MapPin size={14} /> Departs Lahore
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur">
              <Calendar size={14} /> Next: {tour.nextDeparture}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur">
              <StarRating rating={tour.rating} size={13} /> {tour.rating} ({tour.reviews})
            </span>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <p className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <span className="block text-[11px] font-bold uppercase tracking-wide text-white/70">
                Starting from
              </span>
              <span className="font-heading text-2xl font-extrabold text-white">
                {formatPKR(tour.price)}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105"
            >
              Book Now
            </button>
            <a
              href={whatsappLink(`Hi DillKash Kashmir! I want to book: ${tour.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-105"
            >
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* Quick info */}
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-3">
            {quickInfo(tour).map((q) => (
              <div key={q.label} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <q.icon size={19} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {q.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{q.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Itinerary */}
        <Reveal className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Day-by-Day Itinerary
          </h2>
          <div className="mt-6">
            <ItineraryAccordion itinerary={tour.itinerary} />
          </div>
        </Reveal>

        {/* Included / not included */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-extrabold text-foreground">What's Included</h2>
              <ul className="mt-4 space-y-3">
                {tour.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                      <Check size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-extrabold text-foreground">What's Not Included</h2>
              <ul className="mt-4 space-y-3">
                {tour.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                      <X size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Pickup points */}
        <Reveal className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Lahore Pickup Points
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {pickupPoints.map((p) => (
              <div key={p.name} className="card-hover rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                  <MapPin size={20} />
                </span>
                <p className="mt-3 font-heading text-base font-bold text-foreground">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                <p className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                  Pickup {p.time}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Gallery */}
        <Reveal className="mt-14">
          <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {tour.gallery.map((img, i) => (
              <div key={i} className="img-zoom aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <img
                  src={img}
                  alt={`${tour.title} — photo ${i + 1}`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Booking strip */}
        <Reveal className="mt-14 pb-8">
          <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-primary px-6 py-10 text-center shadow-lift sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-primary-foreground">
                Ready for {tour.destinations[0]}?
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/85">
                Seats fill fast for the {tour.nextDeparture} departure. Reserve yours today.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-background px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105"
              >
                Book This Tour
              </button>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-white/10"
              >
                <Phone size={16} />
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} preselectedTour={tour} />
    </>
  );
}
