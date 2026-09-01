import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, SlidersHorizontal, Loader2 } from "lucide-react";
import { images, tours as staticTours, type Tour } from "@/data/site";
import { getPackages } from "@/services/packages";
import { TourCard } from "@/components/site/TourCard";
import { BookingModal } from "@/components/site/BookingModal";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

interface PackagesSearch {
  duration?: string | undefined;
  type?: string | undefined;
}

export const Route = createFileRoute("/packages/")({
  validateSearch: (search: Record<string, unknown>): PackagesSearch => ({
    duration: typeof search["duration"] === "string" ? search["duration"] : undefined,
    type: typeof search["type"] === "string" ? search["type"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kashmir Tour Packages from Lahore — Al Kareem Travel & Tours" },
      {
        name: "description",
        content:
          "Browse all Kashmir tour packages: 3, 5 & 7-day trips from Lahore to Neelum Valley, Arang Kel, Ratti Gali, Sharda & Taobat. Family, honeymoon, corporate & budget options.",
      },
      { property: "og:title", content: "Kashmir Tour Packages from Lahore — Al Kareem Travel & Tours" },
      {
        property: "og:description",
        content:
          "3, 5 & 7-day all-inclusive Kashmir packages departing weekly from Lahore.",
      },
    ],
  }),
  component: PackagesPage,
});

const durations = ["All", "3", "5", "7"] as const;
const types = ["All", "Family", "Couples", "Honeymoon", "Corporate", "Budget"] as const;
const budgets = ["All", "Under 20k", "20k – 30k", "Above 30k"] as const;
const sorts = ["Popular", "Price: Low to High", "Price: High to Low"] as const;

function PackagesPage() {
  const search = Route.useSearch();
  const [tours, setTours] = useState<Tour[]>(staticTours);
  const [apiLoading, setApiLoading] = useState(true);

  // Fetch packages from API, fall back to static data
  useEffect(() => {
    getPackages()
      .then((pkgs) => { if (pkgs.length > 0) setTours(pkgs); })
      .catch(() => { /* keep static data */ })
      .finally(() => setApiLoading(false));
  }, []);

  const [duration, setDuration] = useState<string>(
    search.duration && ["3", "5", "7"].includes(search.duration) ? search.duration : "All",
  );
  const [type, setType] = useState<string>(
    search.type && (types as readonly string[]).includes(search.type) ? search.type : "All",
  );
  const [budget, setBudget] = useState<string>("All");
  const [sort, setSort] = useState<string>("Popular");
  const [bookingTour, setBookingTour] = useState<Tour | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = tours.slice();
    if (duration !== "All") list = list.filter((t) => t.durationDays === Number(duration));
    if (type !== "All") list = list.filter((t) => t.type.includes(type as Tour["type"][number]));
    if (budget === "Under 20k") list = list.filter((t) => t.price < 20000);
    if (budget === "20k – 30k") list = list.filter((t) => t.price >= 20000 && t.price <= 30000);
    if (budget === "Above 30k") list = list.filter((t) => t.price > 30000);
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Popular") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [duration, type, budget, sort, tours]);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground hover:bg-secondary",
    );

  const filterGroup = (
    label: string,
    options: readonly string[],
    value: string,
    onChange: (v: string) => void,
    suffix?: string,
  ) => (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)} className={chip(value === o)}>
            {o}{suffix && o !== "All" ? suffix : ""}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden">
        <img
          src={images.rattiGali}
          alt="Ratti Gali Lake, Azad Kashmir"
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl">
            Kashmir Tour Packages
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            Every package departs from Lahore with all-inclusive pricing. Filter
            by duration, type and budget to find your perfect trip.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
            <SlidersHorizontal size={16} className="text-primary" />
            Filter Packages
          </p>
          <div className="grid gap-5">
            {filterGroup("Duration", durations, duration, setDuration, " Days")}
            {filterGroup("Package Type", types, type, setType)}
            {filterGroup("Budget", budgets, budget, setBudget)}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <p className="text-sm font-semibold text-muted-foreground">
              {filtered.length} package{filtered.length === 1 ? "" : "s"} found
            </p>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ArrowUpDown size={15} className="text-primary" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort packages"
                className="rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 70}>
              <TourCard
                tour={t}
                onBook={(tour) => {
                  setBookingTour(tour);
                  setModalOpen(true);
                }}
              />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              No packages match these filters — try widening your search or
              request a custom tour.
            </p>
          )}
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedTour={bookingTour}
      />
    </>
  );
}
