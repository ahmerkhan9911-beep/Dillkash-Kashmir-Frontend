import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Bus,
  Camera,
  ChevronLeft,
  ChevronRight,
  HandPlatter,
  HeartHandshake,
  MapPin,
  Mountain,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import {
  destinations,
  images,
  pickupPoints,
  reviews,
  site,
  tours,
  whatsappLink,
  type Tour,
} from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TourCard } from "@/components/site/TourCard";
import { StarRating } from "@/components/site/StarRating";
import { BookingModal } from "@/components/site/BookingModal";
import { WhatsAppIcon } from "@/components/site/Navbar";
import { DestinationGalleryModal } from "@/components/site/DestinationGalleryModal";
import { getDestinations, type DestinationItem } from "@/services/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Kareem Travel & Tours — Kashmir Tours from Lahore" },
      {
        name: "description",
        content:
          "Experience Majestic Kashmir — weekly tours from Lahore to Neelum Valley, Arang Kel, Ratti Gali & beyond. All-inclusive packages, luxury transport, verified hotels.",
      },
      { property: "og:title", content: "Al Kareem Travel & Tours — Kashmir Tours from Lahore" },
      {
        property: "og:description",
        content:
          "Weekly Lahore departures to Neelum Valley, Arang Kel, Ratti Gali & beyond. All-inclusive premium & budget packages.",
      },
    ],
  }),
  component: HomePage,
});

/* ------------------------------ Hero ------------------------------ */

function Hero({ onSearch }: { onSearch: (duration: string, type: string) => void }) {
  const [duration, setDuration] = useState("5 Days");
  const [type, setType] = useState("Family");

  return (
    <section className="relative">
      <div className="relative min-h-[92vh] overflow-hidden">
        <img
          src={images.heroKashmir}
          alt="Neelum Valley, Azad Kashmir — emerald river winding through green mountains"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-4 pb-40 pt-32 text-center sm:px-6">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
              <Mountain size={14} />
              Weekly Departures from Lahore
            </span>
            <h1 className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
              Experience Majestic Kashmir – Tours Departing Weekly from Lahore!
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Hassle-free, premium & budget-friendly tour packages to Neelum
              Valley, Arang Kel, Ratti Gali & beyond with Al Kareem Travel & Tours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105"
              >
                Explore Kashmir Tours
                <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-cta transition-transform hover:scale-105"
              >
                <WhatsAppIcon size={18} />
                Book on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Floating search panel */}
      <div className="relative mx-auto -mt-32 max-w-4xl px-4 sm:px-6">
        <Reveal delay={150}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(duration, type);
            }}
            className="grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-lift sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end sm:p-6"
          >
            <div>
              <label htmlFor="hs-duration" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Tour Duration
              </label>
              <select
                id="hs-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
              >
                <option>3 Days</option>
                <option>5 Days</option>
                <option>7 Days</option>
              </select>
            </div>
            <div>
              <label htmlFor="hs-type" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Package Type
              </label>
              <select
                id="hs-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Family</option>
                <option>Couples</option>
                <option>Group</option>
                <option>Corporate</option>
              </select>
            </div>
            <div>
              <label htmlFor="hs-city" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Departure City
              </label>
              <select
                id="hs-city"
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-input bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground"
              >
                <option>Lahore</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.03]"
            >
              <Search size={16} />
              Search Tours
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Why choose us --------------------------- */

const features = [
  {
    icon: MapPin,
    title: "Direct Pickup from Lahore",
    text: "Convenient departures from Thokar Niaz Baig, Kalma Chowk and Lahore Ring Road.",
  },
  {
    icon: Bus,
    title: "Luxury & Safe Transport",
    text: "AC Saloon Coasters plus 4x4 Jeeps for difficult terrain such as Ratti Gali and Taobat.",
  },
  {
    icon: HeartHandshake,
    title: "Family & Couple Friendly",
    text: "Separate rooms, verified hotels and professional tour guides on every trip.",
  },
  {
    icon: Wallet,
    title: "All-Inclusive Pricing",
    text: "Transport, meals, accommodation and required jeep rides included — no hidden costs.",
  },
];

function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Why Travel With Al Kareem Travel & Tours?"
          subtitle="We handle everything from Lahore pickup to Kashmir drop-off, so you can focus on the views."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-13 w-13 place-items-center rounded-2xl bg-secondary text-primary">
                <f.icon size={26} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Packages ----------------------------- */

function PopularPackages({ onBook }: { onBook: (t: Tour) => void }) {
  const [featured, setFeatured] = useState<Tour[]>(tours.filter((t) => t.featured));

  useEffect(() => {
    import("@/services/packages").then(({ getPackages }) => {
      getPackages()
        .then((pkgs) => {
          const feat = pkgs.filter((t) => t.featured);
          if (feat.length > 0) setFeatured(feat);
        })
        .catch(() => { /* keep static */ });
    });
  }, []);

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Best Sellers"
            title="Popular Kashmir Tour Packages"
            subtitle="Hand-crafted itineraries with weekly departures from Lahore — pick your perfect Kashmir escape."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.slug} delay={i * 80}>
              <TourCard tour={t} onBook={onBook} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All Kashmir Packages
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Destinations --------------------------- */

function Destinations() {
  const [destList, setDestList] = useState<DestinationItem[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);

  useEffect(() => {
    getDestinations()
      .then((data) => {
        if (data && data.length > 0) {
          setDestList(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load destinations from API, using fallback:", err);
      });
  }, []);

  // Use API destinations if available, otherwise map the fallback static list
  const displayDestinations: DestinationItem[] =
    destList.length > 0
      ? destList
      : destinations.map((d, idx) => ({
          id: idx + 1,
          name: d.name,
          slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: d.description,
          cover_image: d.image,
          gallery: [d.image],
          sort_order: idx + 1,
          is_active: true,
        }));

  return (
    <section id="destinations" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Destinations"
          title="Explore The Beauty of Kashmir"
          subtitle="From alpine lakes to thundering waterfalls — the real Azad Jammu & Kashmir, curated by locals."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayDestinations.map((d, i) => (
          <Reveal key={d.slug || d.name} delay={(i % 4) * 70}>
            <button
              type="button"
              onClick={() => setSelectedDestination(d)}
              className="card-hover group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-soft text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View photos and explore ${d.name}`}
            >
              <img
                src={d.cover_image}
                alt={`${d.name}, Azad Jammu & Kashmir`}
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white">{d.name}</h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 transition-all duration-500 group-hover:max-h-24">
                  {d.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                  <Camera size={12} />
                  View Gallery
                  <ArrowRight size={12} />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Destination Lightbox Gallery Modal */}
      <DestinationGalleryModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </section>
  );
}


/* ---------------------------- Inclusions ---------------------------- */

const inclusions = [
  { icon: Bus, title: "Transport", text: "Luxury Saloon Coaster / Grand Cabin from Lahore to Kashmir and back." },
  { icon: BedDouble, title: "Accommodation", text: "Hotel stays in destinations such as Keran, Sharda and Kutton." },
  { icon: HandPlatter, title: "Food & Refreshments", text: "Daily breakfast and quality dinners throughout the trip." },
  { icon: Mountain, title: "Off-Road Transfers", text: "4x4 Prado / Jeep transfers where the terrain demands it." },
  { icon: Users, title: "Tour Guidance", text: "An experienced tour manager with you at every step." },
  { icon: Camera, title: "Photography Support", text: "Photography assistance so you take home perfect memories." },
  { icon: ShieldCheck, title: "First Aid", text: "Basic medical kit available during all our tours." },
];

function Inclusions() {
  return (
    <section className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="All-Inclusive"
            title="Everything You Need For A Perfect Kashmir Trip"
            subtitle="One transparent price covers the journey, the stay, the food and the adventure."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {inclusions.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 70}>
              <div className="card-hover flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <f.icon size={22} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-bold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Video section --------------------------- */

function VideoSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={images.videoThumb}
        alt="4x4 jeeps on a mountain road in Azad Kashmir"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36">
        <Reveal>
          <h2 className="font-heading text-3xl font-extrabold text-white text-balance sm:text-4xl">
            Your Kashmir Adventure Starts Here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Dusty jeep trails, glassy alpine lakes, riverside bonfires — see the
            journey our travelers take every single week.
          </p>
          <button
            type="button"
            aria-label="Play Kashmir experience video"
            className="group mx-auto mt-8 grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-cta transition-transform hover:scale-110"
          >
            <Play size={30} className="ml-1 fill-current" />
          </button>
          <div className="mt-8">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105"
            >
              Explore Packages
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- Testimonials ---------------------------- */

function Testimonials() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = Math.max(0, reviews.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(max, i + 1));

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Travelers Say"
          subtitle="Real reviews from families, couples and groups who traveled with us from Lahore."
        />
      </Reveal>

      <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-soft">
          <BadgeCheck size={14} className="text-primary" />
          4.9 on Google Reviews
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-soft">
          <BadgeCheck size={14} className="text-sky-accent" />
          4.8 on Facebook Reviews
        </span>
      </Reveal>

      <div className="relative mt-10">
        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${index} * (100% / ${visible}) - ${index} * 1.25rem / ${visible}))` }}
          >
            {reviews.map((r) => (
              <article
                key={r.name}
                className="w-full shrink-0 rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-extrabold text-primary-foreground">
                    {r.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-bold text-foreground">{r.name}</p>
                    <StarRating rating={r.rating} size={13} />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">“{r.review}”</p>
                <p className="mt-4 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold text-secondary-foreground">
                  {r.trip}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= max}
            aria-label="Next reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Lahore departures ------------------------- */

function LahoreDepartures() {
  return (
    <section className="bg-foreground py-20 text-primary-foreground sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <SectionHeader
            align="left"
            dark
            eyebrow="Departures"
            title="Your Kashmir Journey Starts in Lahore"
            subtitle="Three convenient pickup points across the city — park your car safely and hop on. Our coasters leave on time, every time."
          />
          <div className="mt-8">
            <a
              href={whatsappLink("Hi Al Kareem Travel! Please share the next departure availability from Lahore.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105"
            >
              Check Departure Availability
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid gap-4">
            {pickupPoints.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-primary/50"
              >
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                  <MapPin size={22} />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-base font-bold">{p.name}</p>
                  <p className="mt-0.5 text-sm text-primary-foreground/60">{p.detail}</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- Custom tour ---------------------------- */

function CustomTourCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url(${images.arangKel})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold text-primary-foreground text-balance sm:text-4xl">
              Plan Your Own Kashmir Tour
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85">
              Perfect for families, private groups and corporate trips — tell us
              your dates and destinations, we'll build the itinerary.
            </p>
            <Link
              to="/custom-tour"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold text-foreground shadow-lift transition-transform hover:scale-105"
            >
              Request Custom Tour
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Page ------------------------------- */

function HomePage() {
  const navigate = useNavigate();
  const [bookingTour, setBookingTour] = useState<Tour | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const openBooking = (tour: Tour) => {
    setBookingTour(tour);
    setModalOpen(true);
  };

  const handleSearch = (duration: string, type: string) => {
    const dur = duration.split(" ")[0];
    navigate({
      to: "/packages",
      search: {
        ...(dur ? { duration: dur } : {}),
        ...(type ? { type } : {}),
      },
    });
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <WhyChooseUs />
      <PopularPackages onBook={openBooking} />
      <Destinations />
      <Inclusions />
      <VideoSection />
      <Testimonials />
      <LahoreDepartures />
      <CustomTourCTA />
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedTour={bookingTour}
      />
    </>
  );
}
