import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Send, Car, Truck, Bus, LogIn, Shield } from "lucide-react";
import { destinations, whatsappLink, formatPKR } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";
import { submitCustomTour } from "@/services/custom-tours";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/custom-tour")({
  head: () => ({
    meta: [
      { title: "Plan a Custom Kashmir Tour — DillKash Kashmir" },
      {
        name: "description",
        content:
          "Design your own Kashmir itinerary from Lahore — perfect for families, private groups and corporate trips. Choose your dates, destinations and hotel standard.",
      },
      { property: "og:title", content: "Plan a Custom Kashmir Tour — DillKash Kashmir" },
      {
        property: "og:description",
        content:
          "Custom Kashmir itineraries from Lahore for families, private groups and corporate trips.",
      },
    ],
  }),
  component: CustomTourPage,
});

interface CustomForm {
  date: string;
  persons: number;
  hotel: string;
  transportPreference: string;
  destinations: string[];
  message: string;
}

const initial: CustomForm = {
  date: "",
  persons: 1,
  hotel: "3 Star",
  transportPreference: "Standard Car",
  destinations: [],
  message: "",
};

const TRANSPORT_OPTIONS = [
  { value: "Standard Car", subtitle: "Up to 3 persons", icon: Car },
  { value: "SUV / Prado", subtitle: "Best for off-roading", icon: Truck },
  { value: "Grand Cabin / Hiace", subtitle: "For families/groups", icon: Bus },
] as const;

function CustomTourPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomForm>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomForm, string>>>({});
  const [sent, setSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Dynamic estimated cost calculation ──
  const ADULT_BASE_COST = user?.city === "Islamabad" ? 18000 : 20000;
  const { totalEstimated } = useMemo(() => {
    const total = Number(form.persons) * ADULT_BASE_COST;
    return { totalEstimated: total };
  }, [form.persons, ADULT_BASE_COST]);

  const toggleDestination = (name: string) =>
    setForm((f) => ({
      ...f,
      destinations: f.destinations.includes(name)
        ? f.destinations.filter((d) => d !== name)
        : [...f.destinations, name],
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auth gate: redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/custom-tour" } });
      return;
    }

    const err: Partial<Record<keyof CustomForm, string>> = {};
    if (!form.date) err.date = "Please choose a preferred date";
    if (form.destinations.length === 0) err.destinations = "Pick at least one destination";
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await submitCustomTour({
        name: user?.full_name || "",
        phoneNumber: user?.phone || "",
        preferredDate: form.date,
        persons: form.persons,
        hotelPreference: form.hotel,
        transportPreference: form.transportPreference,
        preferredDestinations: form.destinations,
        message: form.message,
      });
      setSent(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={images.videoThumb}
          alt="4x4 jeeps heading into the Kashmir mountains"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl">
            Plan Your Own Kashmir Tour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            Perfect for families, private groups and corporate trips — your
            dates, your destinations, your pace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-10">
            <SectionHeader
              align="left"
              eyebrow="Custom Tour Request"
              title="Tell Us About Your Trip"
              subtitle="Fill this in and our tour planners will call you with a tailored itinerary and quote."
            />

            {isAdmin ? (
              <div className="mt-8 rounded-2xl bg-secondary p-8 text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
                  <Shield size={28} />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">Action Not Allowed</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Admins cannot request custom tours. Please log in as a regular user to submit a request.
                </p>
                <Link
                  to="/admin"
                  className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  Go to Admin Dashboard
                </Link>
              </div>
            ) : sent ? (
              <div className="mt-8 rounded-2xl bg-secondary p-8 text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check size={28} />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">Request Received!</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Thanks {user?.full_name?.split(" ")[0]} — a tour planner will call{" "}
                  <strong className="text-foreground">{user?.phone}</strong> within
                  a few hours with your custom itinerary.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Track your request status on{" "}
                  <Link to="/my-bookings" className="font-bold text-primary hover:underline">
                    My Bookings
                  </Link>
                </p>
                <a
                  href={whatsappLink(`Hi! I just submitted a custom tour request for ${form.destinations.join(", ")}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-xl bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
                {apiError && (
                  <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
                    {apiError}
                  </div>
                )}

                {/* Auth gate banner or user info */}
                {!isAuthenticated ? (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
                    <LogIn size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold text-foreground">Login required to submit</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your name and phone will be auto-filled from your account.
                    </p>
                    <Link
                      to="/login"
                      search={{ redirect: "/custom-tour" }}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
                    >
                      <LogIn size={14} />
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-secondary/50 px-4 py-3">
                    <p className="text-xs font-semibold text-muted-foreground">Requesting as</p>
                    <p className="mt-0.5 text-sm font-bold text-foreground">{user?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email} · {user?.phone}</p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-date" className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Date</label>
                    <input
                      id="c-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={inputCls(errors.date)}
                    />
                    {errors.date && <p className="mt-1 text-xs font-medium text-destructive">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-persons" className="mb-1.5 block text-sm font-semibold text-foreground">Travelers (Persons)</label>
                    <input
                      id="c-persons"
                      type="number"
                      min={1}
                      max={100}
                      value={form.persons}
                      onChange={(e) => setForm({ ...form, persons: Number(e.target.value) })}
                      className={inputCls()}
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Hotel Preference</span>
                  <div className="flex gap-2">
                    {["3 Star", "5 Star"].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setForm({ ...form, hotel: h })}
                        className={cn(
                          "flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition-colors",
                          form.hotel === h
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary",
                        )}
                        aria-pressed={form.hotel === h}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Transport Preference</span>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {TRANSPORT_OPTIONS.map((opt) => {
                      const active = form.transportPreference === opt.value;
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, transportPreference: opt.value })}
                          aria-pressed={active}
                          className={cn(
                            "relative flex flex-col items-center gap-1.5 rounded-xl border px-4 py-4 text-sm font-bold transition-all",
                            active
                              ? "border-[#059669] bg-[#059669] text-white shadow-md"
                              : "border-border bg-background text-foreground hover:bg-secondary hover:border-[#059669]/40",
                          )}
                        >
                          <Icon size={22} className={active ? "text-white" : "text-muted-foreground"} />
                          <span>{opt.value}</span>
                          <span className={cn("text-xs font-normal", active ? "text-white/80" : "text-muted-foreground")}>
                            {opt.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Destinations</span>
                  <div className="flex flex-wrap gap-2">
                    {destinations.map((d) => {
                      const active = form.destinations.includes(d.name);
                      return (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => toggleDestination(d.name)}
                          aria-pressed={active}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:bg-secondary",
                          )}
                        >
                          {d.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.destinations && (
                    <p className="mt-1 text-xs font-medium text-destructive">{errors.destinations}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-msg" className="mb-1.5 block text-sm font-semibold text-foreground">Message</label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Anything special — anniversary, wheelchair access, corporate branding, specific hotels…"
                    className={inputCls()}
                  />
                </div>

                {/* ── Total Estimated Cost Display ── */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-emerald-50/80 to-teal-50 p-4 dark:border-emerald-800/40 dark:from-emerald-950/40 dark:via-emerald-950/30 dark:to-teal-950/30"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/20 blur-2xl dark:bg-emerald-500/10" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70 dark:text-emerald-400/70">
                        Total Estimated Cost
                      </p>
                      <p className="mt-0.5 text-[11px] text-emerald-600/60 dark:text-emerald-500/50">
                        {Number(form.persons)} person{form.persons !== 1 ? "s" : ""} × {formatPKR(ADULT_BASE_COST)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-2xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-300">
                        {formatPKR(totalEstimated)}
                      </p>
                      <p className="mt-1 text-[10px] text-emerald-600/70 dark:text-emerald-400/60">
                        Estimated from {user?.city || "Lahore"}
                      </p>
                    </div>
                  </div>
                  <p className="relative mt-2.5 text-[11px] leading-relaxed text-emerald-600/70 dark:text-emerald-500/50">
                    *This is an estimated base cost. Final quote will be provided by our tour planners.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
